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
    if (fs.existsSync(path.join(current, "content", "csgo_addons"))) return current;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  throw new Error("Could not find CS2 root. Pass --cs2-root explicitly.");
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = path.resolve(__dirname, "..");
  const configPath = path.resolve(args.config || path.join(repoRoot, "examples", "CodexAIGC.nuke.config.json"));
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  if (!args.save) throw new Error("Pass --save <path-to-save_local.txt>");
  const cs2Root = path.resolve(args["cs2-root"] || findCs2Root(process.cwd()));
  const savePath = path.resolve(args.save);
  const scriptPath = path.join(cs2Root, "content", "csgo_addons", config.contentAddon, "scripts", "autopeek_training.js");
  const dataDir = path.join(cs2Root, "content", "csgo_addons", config.contentAddon, "data");
  const dataPath = path.join(dataDir, `CodexAIGC.${config.mapName}_groups_store.json`);

  const save = JSON.parse(fs.readFileSync(savePath, "utf8"));
  if (!save.settings || typeof save.settings !== "object") save.settings = {};
  delete save.settings.language;
  const encoded = Buffer.from(JSON.stringify(save), "utf8").toString("base64");
  const chunks = [];
  for (let i = 0; i < encoded.length; i += 16384) chunks.push(encoded.slice(i, i + 16384));

  let script = fs.readFileSync(scriptPath, "utf8");
  const block = script.match(/const BUILTIN_SAVE_CHUNKS = \[\r?\n[\s\S]*?\r?\n\];/);
  if (!block) throw new Error(`BUILTIN_SAVE_CHUNKS block not found in ${scriptPath}`);
  const replacement = `const BUILTIN_SAVE_CHUNKS = [\n${chunks.map((chunk) => `  ${JSON.stringify(chunk)},`).join("\n")}\n];`;
  script = script.replace(block[0], replacement);
  fs.writeFileSync(scriptPath, script, "utf8");

  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dataPath, JSON.stringify(save, null, 2) + "\n", "utf8");
  console.log(`Embedded ${savePath}`);
  console.log(`Updated ${scriptPath}`);
  console.log(`Wrote ${dataPath}`);
}

main();

