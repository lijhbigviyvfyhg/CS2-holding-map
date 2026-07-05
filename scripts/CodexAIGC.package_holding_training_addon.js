const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    args[key.slice(2)] = argv[i + 1];
    i += 1;
  }
  return args;
}

function findCs2Root(start) {
  let current = path.resolve(start);
  for (let i = 0; i < 8; i += 1) {
    if (fs.existsSync(path.join(current, "game", "csgo_addons")) && fs.existsSync(path.join(current, "game", "csgo_community_addons"))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  throw new Error("Could not find CS2 root. Pass --cs2-root explicitly.");
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let j = 0; j < 8; j += 1) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const b of buffer) {
    crc = crcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function zstr(text) {
  return Buffer.from(`${text}\0`, "utf8");
}

function writeUInt16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value);
  return buffer;
}

function writeUInt32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0);
  return buffer;
}

function splitVpkPath(rel) {
  const normalized = rel.replace(/\\/g, "/");
  const dir = path.posix.dirname(normalized);
  const base = path.posix.basename(normalized);
  const dot = base.lastIndexOf(".");
  if (dot < 0) return { ext: "", dir: dir === "." ? "" : dir, name: base };
  return { ext: base.slice(dot + 1), dir: dir === "." ? "" : dir, name: base.slice(0, dot) };
}

function pushGrouped(groups, entry) {
  if (!groups.has(entry.ext)) groups.set(entry.ext, new Map());
  const byDir = groups.get(entry.ext);
  if (!byDir.has(entry.dir)) byDir.set(entry.dir, []);
  byDir.get(entry.dir).push(entry);
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = path.resolve(__dirname, "..");
  const configPath = path.resolve(args.config || path.join(repoRoot, "examples", "CodexAIGC.nuke.config.json"));
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const cs2Root = path.resolve(args["cs2-root"] || findCs2Root(process.cwd()));
  const addonName = config.communityAddon;
  const sourceAddon = path.join(cs2Root, "game", "csgo_addons", config.contentAddon);
  const outDir = path.join(cs2Root, "game", "csgo_community_addons", addonName);
  const mapName = config.mapName;
  const files = [
    { rel: `maps/${mapName}.vpk` },
    { rel: "scripts/autopeek_training.vjs_c" },
    { rel: "scripts/autopeek_training_builtin_data.vjs_c" },
    { rel: "cfg/autopeek_training_binds.cfg" },
    { rel: "cfg/autopeek_training_recover.cfg" },
    { rel: `cfg/maps/${mapName}.cfg` },
  ];

  if (!addonName || path.basename(outDir) !== addonName || !outDir.includes(`csgo_community_addons${path.sep}`)) {
    throw new Error(`Refusing to clean unexpected output directory: ${outDir}`);
  }
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const archiveChunks = [];
  const groups = new Map();
  let offset = 0;

  for (const file of files) {
    const rel = file.rel.replace(/\\/g, "/");
    const full = path.join(sourceAddon, rel);
    if (!fs.existsSync(full)) throw new Error(`Missing input file: ${full}`);
    const data = fs.readFileSync(full);
    const looseTarget = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(looseTarget), { recursive: true });
    fs.writeFileSync(looseTarget, data);
    const entry = { ...splitVpkPath(rel), crc: crc32(data), offset, length: data.length };
    archiveChunks.push(data);
    pushGrouped(groups, entry);
    offset += data.length;
  }

  const tree = [];
  for (const ext of [...groups.keys()].sort()) {
    tree.push(zstr(ext));
    const byDir = groups.get(ext);
    for (const dir of [...byDir.keys()].sort()) {
      tree.push(zstr(dir));
      for (const entry of byDir.get(dir).sort((a, b) => a.name.localeCompare(b.name))) {
        tree.push(zstr(entry.name));
        tree.push(writeUInt32(entry.crc));
        tree.push(writeUInt16(0));
        tree.push(writeUInt16(0));
        tree.push(writeUInt32(entry.offset));
        tree.push(writeUInt32(entry.length));
        tree.push(writeUInt16(0xffff));
      }
      tree.push(zstr(""));
    }
    tree.push(zstr(""));
  }
  tree.push(zstr(""));

  const treeBuffer = Buffer.concat(tree);
  const header = Buffer.alloc(28);
  header.writeUInt32LE(0x55aa1234, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(treeBuffer.length, 8);

  fs.writeFileSync(path.join(outDir, `${addonName}_dir.vpk`), Buffer.concat([header, treeBuffer]));
  fs.writeFileSync(path.join(outDir, `${addonName}_000.vpk`), Buffer.concat(archiveChunks));
  fs.writeFileSync(
    path.join(outDir, "addoninfo.txt"),
    `"AddonInfo"\n{\n\t"addonSteamAppID" "730"\n\t"addonTitle" "${config.addonTitle || `${mapName} Holding Training Map`}"\n\t"addonDescription" "${config.addonDescription || "Holding and autopeek training map."}"\n\t"addonContent_CounterStrike" "1"\n\t"addonVersion" "${config.addonVersion || "0.1.0"}"\n}\n`,
  );
  fs.writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify({ name: addonName, map: mapName, baseMapName: config.baseMapName, contentAddon: config.contentAddon }, null, 2),
  );

  console.log(`Packed ${files.length} files into ${outDir}`);
  console.log(`Wrote ${addonName}_dir.vpk (${header.length + treeBuffer.length} bytes)`);
  console.log(`Wrote ${addonName}_000.vpk (${offset} bytes)`);
}

main();

