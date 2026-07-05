const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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
    if (
      fs.existsSync(path.join(current, "game", "bin", "win64", "resourcecompiler.exe")) &&
      fs.existsSync(path.join(current, "content", "csgo_addons"))
    ) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  throw new Error("Could not find CS2 root. Pass --cs2-root explicitly.");
}

function readConfig(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const required = ["contentAddon", "communityAddon", "baseMapName", "mapName", "defaultPlayerStart"];
  for (const key of required) {
    if (!config[key]) throw new Error(`Missing config key: ${key}`);
  }
  config.loaderName = config.loaderName || `${config.mapName}_loader`;
  config.landmarkName = config.landmarkName || `${config.mapName}_landmark`;
  config.groupLabelCount = Number(config.groupLabelCount || 32);
  config.ctSpawnPoints = Array.isArray(config.ctSpawnPoints) ? config.ctSpawnPoints : [config.defaultPlayerStart];
  config.tSpawnPoints = Array.isArray(config.tSpawnPoints) ? config.tSpawnPoints : [];
  config.wrapperSpawnPlatforms = Array.isArray(config.wrapperSpawnPlatforms) ? config.wrapperSpawnPlatforms : [];
  config.addonTitle = config.addonTitle || `${config.baseMapName} Holding Training Map`;
  config.addonDescription = config.addonDescription || `${config.baseMapName} holding training map.`;
  config.addonVersion = config.addonVersion || "0.1.0";
  return config;
}

function parseVectorString(value, label) {
  const parts = String(value || "").trim().split(/\s+/).map(Number);
  if (parts.length < 3 || parts.slice(0, 3).some((part) => !Number.isFinite(part))) {
    throw new Error(`Invalid vector for ${label}: ${value}`);
  }
  return parts.slice(0, 3);
}

function jsNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return Number.isInteger(value) ? `${value}.0` : String(value);
}

function jsVectorArray(value, label) {
  return `[${parseVectorString(value, label).map(jsNumber).join(", ")}]`;
}

function emptyRelay(id) {
  return `				"relayPlugData" "DmePlugList"
				{
					"id" "elementid" "${id}"
					"names" "string_array"
					[
					]
					"dataTypes" "int_array"
					[
					]
					"plugTypes" "int_array"
					[
					]
					"descriptions" "string_array"
					[
					]
				}`;
}

function connection(id, outputName, targetName, inputName, overrideParam, delay = "0") {
  return `					"DmeConnectionData"
					{
						"id" "elementid" "${id}"
						"outputName" "string" "${outputName}"
						"targetType" "int" "7"
						"targetName" "string" "${targetName}"
						"inputName" "string" "${inputName}"
						"overrideParam" "string" "${overrideParam}"
						"delay" "float" "${delay}"
						"timesToFire" "int" "-1"
					}`;
}

function entity({ id, nodeID, referenceID, relayID, propsID, classname, props, origin, angles = "0 0 0", connections = "" }) {
  const propLines = Object.entries(props || {})
    .map(([key, value]) => `					"${key}" "string" "${String(value).replace(/"/g, '\\"')}"`)
    .join("\n");

  return `			"CMapEntity"
			{
				"id" "elementid" "${id}"
				"nodeID" "int" "${nodeID}"
				"referenceID" "uint64" "${referenceID}"
				"children" "element_array"
				[
				]
				"variableTargetKeys" "string_array"
				[
				]
				"variableNames" "string_array"
				[
				]
${emptyRelay(relayID)}

				"connectionsData" "element_array"
				[
${connections}
				]
				"entity_properties" "EditGameClassProps"
				{
					"id" "elementid" "${propsID}"
					"classname" "string" "${classname}"
${propLines ? `${propLines}\n` : ""}				}

				"hitNormal" "vector3" "0 0 1"
				"isProceduralEntity" "bool" "0"
				"origin" "vector3" "${origin}"
				"angles" "qangle" "${angles}"
				"scales" "vector3" "1 1 1"
				"transformLocked" "bool" "0"
				"force_hidden" "bool" "0"
				"editorOnly" "bool" "0"
			}`;
}

function padded(index) {
  return String(index).padStart(2, "0");
}

function spawnIds(team, index) {
  const family = team === "ct" ? "020" : "030";
  const suffix = padded(index + 1);
  return {
    id: `17000000-0000-4000-8000-000000${family}${suffix}1`,
    props: `17000000-0000-4000-8000-000000${family}${suffix}2`,
    relay: `17000000-0000-4000-8000-000000${family}${suffix}3`,
    referenceID: `0x1700000000${family}${suffix}1`,
  };
}

function spawnEntity(team, point, index) {
  const ids = spawnIds(team, index);
  const isCt = team === "ct";
  return entity({
    id: ids.id,
    nodeID: String((isCt ? 9200 : 9300) + index + 1),
    referenceID: ids.referenceID,
    relayID: ids.relay,
    propsID: ids.props,
    classname: isCt ? "info_player_counterterrorist" : "info_player_terrorist",
    props: { targetname: "spawnpoints.standard", enabled: "1", priority: "0" },
    origin: point.origin,
    angles: point.angles || "0 0 0",
  });
}

function labelIds(index) {
  const suffix = padded(index);
  return {
    id: `17000000-0000-4000-8000-000000010${suffix}1`,
    props: `17000000-0000-4000-8000-000000010${suffix}2`,
    relay: `17000000-0000-4000-8000-000000010${suffix}3`,
  };
}

function labelEntity(index) {
  const ids = labelIds(index);
  return entity({
    id: ids.id,
    nodeID: String(9100 + index),
    referenceID: `0x1700000000001${padded(index)}1`,
    relayID: ids.relay,
    propsID: ids.props,
    classname: "point_worldtext",
    props: {
      targetname: `autopeek_group_label_${padded(index)}`,
      message: "",
      font_name: "Arial Black",
      font_size: "30",
      world_units_per_pixel: "0.25",
      color: "255 220 80 255",
      fullbright: "1",
      reorient_mode: "1",
      justify_horizontal: "1",
      justify_vertical: "1",
      depth_render_offset: "0.125",
    },
    origin: `0 0 ${-12000 - index * 16}`,
  });
}

function findMatchingBracket(text, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < text.length; i += 1) {
    if (text[i] === "[") depth += 1;
    if (text[i] === "]") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error("Could not find matching array bracket");
}

function replaceElementArrayAfter(text, anchor, replacement) {
  const anchorIndex = text.indexOf(anchor);
  if (anchorIndex < 0) throw new Error(`Could not find anchor: ${anchor}`);
  const openIndex = text.indexOf("[", anchorIndex);
  if (openIndex < 0) throw new Error(`Could not find array after anchor: ${anchor}`);
  const closeIndex = findMatchingBracket(text, openIndex);
  return `${text.slice(0, openIndex + 1)}\n${replacement}\n${text.slice(closeIndex)}`;
}

function extractFirstMapMesh(text) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line.includes('"CMapMesh"'));
  if (start < 0) {
    throw new Error("No CMapMesh template found");
  }

  let depth = 0;
  let sawOpen = false;
  for (let i = start; i < lines.length; i += 1) {
    for (const ch of lines[i]) {
      if (ch === "{") {
        depth += 1;
        sawOpen = true;
      } else if (ch === "}") {
        depth -= 1;
      }
    }
    if (sawOpen && depth === 0) {
      return lines.slice(start, i + 1).join("\n").replace(/,\s*$/, "");
    }
  }
  throw new Error("Unterminated CMapMesh template");
}

function replaceElementIds(block) {
  return block.replace(/"id" "elementid" "[0-9a-f-]{36}"/gi, () => `"id" "elementid" "${crypto.randomUUID()}"`);
}

function replacePositionVertices(block, vertices) {
  const marker = '"name" "string" "position:0"';
  const markerAt = block.indexOf(marker);
  if (markerAt < 0) throw new Error("Template lacks position stream");
  const dataAt = block.indexOf('"data" "vector3_array"', markerAt);
  if (dataAt < 0) throw new Error("Template lacks position vector data");
  const openAt = block.indexOf("[", dataAt);
  const closeAt = block.indexOf("]", openAt);
  if (openAt < 0 || closeAt < 0) throw new Error("Malformed position vector array");
  const vertexLines = vertices
    .map((v, index) => `\t\t\t\t\t\t\t\t\t"${v}"${index === vertices.length - 1 ? "" : ","}`)
    .join("\n");
  return `${block.slice(0, openAt + 1)}\n${vertexLines}\n\t\t\t\t\t\t\t\t]${block.slice(closeAt + 1)}`;
}

function makePlatformMesh(template, platform, index) {
  const required = ["xmin", "xmax", "ymin", "ymax", "top", "bottom"];
  for (const key of required) {
    if (platform[key] === undefined) {
      throw new Error(`Missing wrapperSpawnPlatforms[${index}].${key}`);
    }
  }

  const nodeID = String(platform.nodeID || 9901 + index);
  const referenceID = String(platform.referenceID || `0x17000000000f1${String(index + 1).padStart(3, "0")}`);
  let block = replaceElementIds(template);
  block = block.replace(/"nodeID" "int" "\d+"/, `"nodeID" "int" "${nodeID}"`);
  block = block.replace(/"referenceID" "uint64" "0x[0-9a-f]+"/i, `"referenceID" "uint64" "${referenceID}"`);
  block = block.replaceAll("materials/dev/dev_measuregeneric01.vmat", "materials/tools/toolsclip.vmat");
  return replacePositionVertices(block, [
    `${platform.xmin} ${platform.ymin} ${platform.top}`,
    `${platform.xmax} ${platform.ymin} ${platform.top}`,
    `${platform.xmin} ${platform.ymax} ${platform.top}`,
    `${platform.xmax} ${platform.ymax} ${platform.bottom}`,
    `${platform.xmin} ${platform.ymax} ${platform.bottom}`,
    `${platform.xmax} ${platform.ymax} ${platform.top}`,
    `${platform.xmax} ${platform.ymin} ${platform.bottom}`,
    `${platform.xmin} ${platform.ymin} ${platform.bottom}`,
  ]);
}

function makePlatformMeshes(mapTemplate, config) {
  if (!config.wrapperSpawnPlatforms.length) {
    return "";
  }
  const meshTemplate = extractFirstMapMesh(mapTemplate);
  return config.wrapperSpawnPlatforms
    .map((platform, index) => makePlatformMesh(meshTemplate, platform, index))
    .join(",\n");
}

function addPlatformMaterialReference(text, config) {
  if (!config.wrapperSpawnPlatforms.length || text.includes('"materials/tools/toolsclip.vmat"')) {
    return text;
  }
  return text.replace(
    /(\t\t"materials\/dev\/dev_measuregeneric01\.vmat",\r?\n)/,
    `$1\t\t"materials/tools/toolsclip.vmat",\n`,
  );
}

function makeInsertedEntities(config) {
  const ids = {
    logic: "17000000-0000-4000-8000-000000000001",
    logicProps: "17000000-0000-4000-8000-000000000002",
    logicRelay: "17000000-0000-4000-8000-000000000003",
    logicConn1: "17000000-0000-4000-8000-000000000004",
    logicConn2: "17000000-0000-4000-8000-000000000005",
    logicConn3: "17000000-0000-4000-8000-000000000006",
    logicConn4: "17000000-0000-4000-8000-000000000007",
    logicConn5: "17000000-0000-4000-8000-000000000008",
    loader: "17000000-0000-4000-8000-000000000011",
    loaderProps: "17000000-0000-4000-8000-000000000012",
    loaderRelay: "17000000-0000-4000-8000-000000000013",
    landmark: "17000000-0000-4000-8000-000000000021",
    landmarkProps: "17000000-0000-4000-8000-000000000022",
    landmarkRelay: "17000000-0000-4000-8000-000000000023",
    script: "17000000-0000-4000-8000-000000000031",
    scriptProps: "17000000-0000-4000-8000-000000000032",
    scriptRelay: "17000000-0000-4000-8000-000000000033",
    dataScript: "17000000-0000-4000-8000-000000000034",
    dataScriptProps: "17000000-0000-4000-8000-000000000035",
    dataScriptRelay: "17000000-0000-4000-8000-000000000036",
    start: "17000000-0000-4000-8000-000000000041",
    startProps: "17000000-0000-4000-8000-000000000042",
    startRelay: "17000000-0000-4000-8000-000000000043",
    nav: "17000000-0000-4000-8000-000000000071",
    navProps: "17000000-0000-4000-8000-000000000072",
    navRelay: "17000000-0000-4000-8000-000000000073",
  };

  const entities = [
    entity({
      id: ids.logic,
      nodeID: "9001",
      referenceID: "0x1700000000000001",
      relayID: ids.logicRelay,
      propsID: ids.logicProps,
      classname: "logic_auto",
      props: { spawnflags: "1" },
      origin: "0 0 0",
      connections: [
        connection(ids.logicConn1, "OnMapSpawn", config.loaderName, "StartSpawnGroupLoad", "", "8"),
        connection(ids.logicConn2, "OnMapSpawn", "autopeek_training_script", "RunScriptInput", "Setup", "10"),
        connection(ids.logicConn3, "OnMapSpawn", "autopeek_training_script", "RunScriptInput", "Setup", "14"),
        connection(ids.logicConn4, "OnMapSpawn", "autopeek_training_script", "RunScriptInput", "RequestBuiltinData", "11"),
        connection(ids.logicConn5, "OnMapSpawn", "autopeek_training_script", "RunScriptInput", "RequestBuiltinData", "15"),
      ].join(",\n"),
    }),
    entity({
      id: ids.loader,
      nodeID: "9002",
      referenceID: "0x1700000000000002",
      relayID: ids.loaderRelay,
      propsID: ids.loaderProps,
      classname: "info_spawngroup_load_unload",
      props: {
        targetname: config.loaderName,
        mapname: config.baseMapName,
        landmark: config.landmarkName,
        timeoutInterval: "0",
        autoactivate: "1",
      },
      origin: "0 0 0",
    }),
    entity({
      id: ids.landmark,
      nodeID: "9003",
      referenceID: "0x1700000000000003",
      relayID: ids.landmarkRelay,
      propsID: ids.landmarkProps,
      classname: "info_spawngroup_landmark",
      props: { targetname: config.landmarkName },
      origin: "0 0 0",
    }),
    entity({
      id: ids.script,
      nodeID: "9004",
      referenceID: "0x1700000000000004",
      relayID: ids.scriptRelay,
      propsID: ids.scriptProps,
      classname: "point_script",
      props: { targetname: "autopeek_training_script", cs_script: "scripts/autopeek_training.vjs", vscripts: "" },
      origin: "0 0 64",
    }),
    entity({
      id: ids.dataScript,
      nodeID: "9006",
      referenceID: "0x1700000000000006",
      relayID: ids.dataScriptRelay,
      propsID: ids.dataScriptProps,
      classname: "point_script",
      props: { targetname: "autopeek_training_data_script", cs_script: "scripts/autopeek_training_builtin_data.vjs", vscripts: "" },
      origin: "0 0 96",
    }),
    entity({
      id: ids.start,
      nodeID: "9005",
      referenceID: "0x1700000000000005",
      relayID: ids.startRelay,
      propsID: ids.startProps,
      classname: "info_player_start",
      props: { IsMaster: "0", StartDisabled: "0" },
      origin: config.defaultPlayerStart.origin,
      angles: config.defaultPlayerStart.angles || "0 0 0",
    }),
    ...config.ctSpawnPoints.map((point, index) => spawnEntity("ct", point, index)),
    ...config.tSpawnPoints.map((point, index) => spawnEntity("t", point, index)),
    entity({
      id: ids.nav,
      nodeID: "9008",
      referenceID: "0x1700000000000008",
      relayID: ids.navRelay,
      propsID: ids.navProps,
      classname: "point_nav_walkable",
      props: {},
      origin: config.defaultPlayerStart.origin,
    }),
    ...Array.from({ length: config.groupLabelCount }, (_, index) => labelEntity(index + 1)),
  ];

  const nodeIds = [
    ids.logic,
    ids.loader,
    ids.landmark,
    ids.script,
    ids.dataScript,
    ids.start,
    ...config.ctSpawnPoints.map((_, index) => spawnIds("ct", index).id),
    ...config.tSpawnPoints.map((_, index) => spawnIds("t", index).id),
    ids.nav,
    ...Array.from({ length: config.groupLabelCount }, (_, index) => labelIds(index + 1).id),
  ];

  return { entities: entities.join(",\n"), nodeIds };
}

function writeMapConfig(config, targetPath) {
  const text = `sv_cheats 1
mp_warmup_end
mp_limitteams 0
mp_autoteambalance 0
mp_ignore_round_win_conditions 1
mp_freezetime 0
mp_roundtime 60
mp_roundtime_defuse 60
mp_respawn_on_death_ct 1
mp_respawn_on_death_t 1
mp_buytime 9999
mp_buy_anywhere 1
sv_infinite_ammo 1
bot_quota 1
bot_quota_mode normal
bot_join_after_player 0
bot_join_team any
bot_chatter off
bot_difficulty 4
custom_bot_difficulty 4
sv_auto_adjust_bot_difficulty 0
bot_defer_to_human_goals 0
bot_defer_to_human_items 0
bot_mimic 0
bot_stop 1
bot_dont_shoot 1

alias "autopeek_select_group" "ent_fire *autopeek_training_script RunScriptInput SelectGroup"
alias "autopeek_append_group" "ent_fire *autopeek_training_script RunScriptInput AppendGroup"
alias "autopeek_add_t" "ent_fire *autopeek_training_script RunScriptInput AddT"
alias "autopeek_add_ct" "ent_fire *autopeek_training_script RunScriptInput AddCT"
alias "autopeek_place_bot" "ent_fire *autopeek_training_script RunScriptInput PlaceBot"
alias "autopeek_face_bot" "ent_fire *autopeek_training_script RunScriptInput FaceBot"
alias "autopeek_select_left" "ent_fire *autopeek_training_script RunScriptInput SelectLeft"
alias "autopeek_select_right" "ent_fire *autopeek_training_script RunScriptInput SelectRight"
alias "autopeek_start_peek" "ent_fire *autopeek_training_script RunScriptInput StartPeek"
alias "autopeek_stop_peek" "ent_fire *autopeek_training_script RunScriptInput StopPeek"
alias "autopeek_freeze_bot" "ent_fire *autopeek_training_script RunScriptInput FreezeBot"
alias "autopeek_toggle_ffa" "ent_fire *autopeek_training_script RunScriptInput ToggleFFA"
alias "autopeek_set_anchor" "ent_fire *autopeek_training_script RunScriptInput SetAnchor"
alias "autopeek_prev_route_slot" "ent_fire *autopeek_training_script RunScriptInput PrevRouteSlot"
alias "autopeek_next_route_slot" "ent_fire *autopeek_training_script RunScriptInput NextRouteSlot"
alias "autopeek_toggle_record_fire" "ent_fire *autopeek_training_script RunScriptInput ToggleRecordFire"
alias "autopeek_play_route" "ent_fire *autopeek_training_script RunScriptInput PlayRoute"
alias "autopeek_toggle_group_record" "ent_fire *autopeek_training_script RunScriptInput ToggleGroupRecord"
alias "autopeek_set_group_spawn" "ent_fire *autopeek_training_script RunScriptInput SetGroupSpawn"
alias "autopeek_toggle_record" "ent_fire *autopeek_training_script RunScriptInput ToggleRecord"
alias "autopeek_toggle_los_stop" "ent_fire *autopeek_training_script RunScriptInput ToggleLosStop"
alias "autopeek_stop_playback" "ent_fire *autopeek_training_script RunScriptInput StopPlayback"
alias "autopeek_cycle_difficulty" "ent_fire *autopeek_training_script RunScriptInput CycleShootDifficulty"
alias "autopeek_attack_probe" "ent_fire *autopeek_training_script RunScriptInput AttackProbe"
alias "autopeek_aim_probe" "ent_fire *autopeek_training_script RunScriptInput AimProbe"
alias "autopeek_drive_probe" "ent_fire *autopeek_training_script RunScriptInput DriveProbe"

alias "autopeek_install_binds_1" "bind e autopeek_select_group; bind v autopeek_append_group; bind o autopeek_add_t; bind p autopeek_add_ct; bind m autopeek_place_bot; bind i autopeek_face_bot; bind j autopeek_select_left; bind l autopeek_select_right"
alias "autopeek_install_binds_2" "bind k autopeek_start_peek; bind , autopeek_stop_peek; bind . autopeek_freeze_bot; bind / autopeek_toggle_ffa; bind n autopeek_set_anchor; bind [ autopeek_prev_route_slot; bind ] autopeek_next_route_slot; bind - autopeek_toggle_record_fire"
alias "autopeek_install_binds_3" "bind = autopeek_play_route; bind y autopeek_toggle_group_record; bind 8 autopeek_set_group_spawn; unbind SEMICOLON; bind MOUSE4 autopeek_toggle_record; bind MOUSE5 autopeek_toggle_record"
alias "autopeek_install_binds_4" "bind scancode49 autopeek_toggle_los_stop; bind BACKSPACE autopeek_stop_playback; bind 6 autopeek_cycle_difficulty; bind 7 autopeek_attack_probe; bind 9 autopeek_aim_probe; bind 0 autopeek_drive_probe"
alias "autopeek_install_binds" "autopeek_install_binds_1; autopeek_install_binds_2; autopeek_install_binds_3; autopeek_install_binds_4; host_writeconfig"

alias "OK" "autopeek_install_binds; ent_fire *autopeek_training_script RunScriptInput ConfirmAndInstallBinds"
alias "ok" "autopeek_install_binds; ent_fire *autopeek_training_script RunScriptInput ConfirmAndInstallBinds"
alias "binds" "ent_fire *autopeek_training_script RunScriptInput PrintBinds"
alias "manual_binds" "ent_fire *autopeek_training_script RunScriptInput PrintBinds"
alias "recover_cfg" "exec autopeek_training_recover; ent_fire *autopeek_training_script RunScriptInput RecoverCfg"
alias "restore_cfg" "recover_cfg"
alias "autopeek_rebind_cfg" "exec autopeek_training_binds; ent_fire *autopeek_training_script RunScriptInput InstallBinds"

ent_fire *autopeek_training_script RunScriptInput Setup
echo "[autopeek_training] ${config.mapName} cfg loaded."
echo "[autopeek_training] type OK in chat, or type say OK in console. recover_cfg restores common defaults."
`;
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, text, "utf8");
}

function copyTemplate(repoRoot, templateName, targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(path.join(repoRoot, "templates", templateName), targetPath);
}

function writeTrainingScript(repoRoot, config, targetPath) {
  const templatePath = path.join(repoRoot, "templates", "CodexAIGC.autopeek_training.js");
  let text = fs.readFileSync(templatePath, "utf8");
  const position = jsVectorArray(config.defaultPlayerStart.origin, "defaultPlayerStart.origin");
  const angles = jsVectorArray(config.defaultPlayerStart.angles || "0 0 0", "defaultPlayerStart.angles");
  const replacement = `const DEFAULT_PLAYER_SPAWN = {\n  position: ${position},\n  angles: ${angles},\n};`;
  text = text.replace(
    /const DEFAULT_PLAYER_SPAWN = \{\r?\n\s*position: \[[^\]]+\],\r?\n\s*angles: \[[^\]]+\],\r?\n\};/,
    replacement,
  );
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, text, "utf8");
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = path.resolve(__dirname, "..");
  const configPath = path.resolve(args.config || path.join(repoRoot, "examples", "CodexAIGC.nuke.config.json"));
  const config = readConfig(configPath);
  const cs2Root = path.resolve(args["cs2-root"] || findCs2Root(process.cwd()));
  const contentAddon = path.join(cs2Root, "content", "csgo_addons", config.contentAddon);

  const sourceMap = path.join(repoRoot, "templates", "CodexAIGC.flat_empty.vmap");
  const targetMap = path.join(contentAddon, "maps", `${config.mapName}.vmap`);
  const mapTemplate = fs.readFileSync(sourceMap, "utf8");
  let text = mapTemplate;
  text = text.replace(/flat_empty/g, config.mapName);
  text = text.replace('"fixupEntityNames" "bool" "1"', '"fixupEntityNames" "bool" "0"');
  text = addPlatformMaterialReference(text, config);

  const inserted = makeInsertedEntities(config);
  const platformMeshes = makePlatformMeshes(mapTemplate, config);
  const worldChildren = [platformMeshes, inserted.entities].filter(Boolean).join(",\n");
  text = replaceElementArrayAfter(text, '\t\t"children" "element_array"', worldChildren);
  text = replaceElementArrayAfter(
    text,
    '\t\t"nodes" "element_array"',
    inserted.nodeIds.map((id, index) => `\t\t\t"element" "${id}"${index === inserted.nodeIds.length - 1 ? "" : ","}`).join("\n"),
  );
  text = replaceElementArrayAfter(
    text,
    '\t\t"hiddenFlags" "int_array"',
    inserted.nodeIds.map((_, index) => `\t\t\t"0"${index === inserted.nodeIds.length - 1 ? "" : ","}`).join("\n"),
  );

  fs.mkdirSync(path.dirname(targetMap), { recursive: true });
  fs.writeFileSync(targetMap, text, "utf8");
  writeTrainingScript(repoRoot, config, path.join(contentAddon, "scripts", "autopeek_training.js"));
  copyTemplate(repoRoot, "CodexAIGC.autopeek_training_builtin_data.js", path.join(contentAddon, "scripts", "autopeek_training_builtin_data.js"));
  copyTemplate(repoRoot, "CodexAIGC.autopeek_training_binds.cfg", path.join(contentAddon, "cfg", "autopeek_training_binds.cfg"));
  copyTemplate(repoRoot, "CodexAIGC.autopeek_training_recover.cfg", path.join(contentAddon, "cfg", "autopeek_training_recover.cfg"));
  writeMapConfig(config, path.join(contentAddon, "cfg", "maps", `${config.mapName}.cfg`));

  const manifest = {
    contentAddon: config.contentAddon,
    communityAddon: config.communityAddon,
    baseMapName: config.baseMapName,
    mapName: config.mapName,
    method: `wrapper-spawngroup-loads-official-${config.baseMapName}`,
  };
  fs.writeFileSync(path.join(contentAddon, "CodexAIGC.generated_manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Generated ${contentAddon}`);
  console.log(`Wrapper map: ${targetMap}`);
}

main();

