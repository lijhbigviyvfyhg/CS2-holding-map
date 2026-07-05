# CodexAIGC Holding Training Map Template

This repository turns an official CS2 map into a holding/autopeek training addon by generating a small wrapper map that loads the official map as a spawn group and runs the training script.

The Mirage release used the same pattern:

- wrapper map: a tiny generated `.vmap`
- loader entity: `info_spawngroup_load_unload` with `mapname = de_mirage`
- script entity: `point_script` loading `scripts/autopeek_training.vjs`
- map cfg: installs aliases and runs `Setup`
- package step: copies compiled resources into `game/csgo_community_addons/<publish-addon>` and writes VPK files

The template is meant for making new maps such as Nuke without hand-editing Hammer files.

## Quick Start

Run these commands from the cloned repository. If the repository is not inside the CS2 root, pass `--cs2-root` / `-Cs2Root`.

```powershell
$cs2 = "F:\steam\steamapps\common\Counter-Strike Global Offensive"
$config = "examples\CodexAIGC.nuke.config.json"

node scripts\CodexAIGC.generate_holding_training_addon.js --config $config --cs2-root $cs2
powershell -ExecutionPolicy Bypass -File scripts\CodexAIGC.compile_holding_training_addon.ps1 -ConfigPath $config -Cs2Root $cs2
node scripts\CodexAIGC.package_holding_training_addon.js --config $config --cs2-root $cs2
```

Launch the local addon:

```powershell
$steam = "F:\steam\steam.exe"
Start-Process $steam -ArgumentList @(
  "-applaunch","730",
  "-insecure","-console","-condebug",
  "-addon","nuke_holding_training",
  "+map","de_nuke_holding_training"
)
```

## Repository Files

- `scripts/CodexAIGC.generate_holding_training_addon.js`: creates the wrapper addon source under `content/csgo_addons`.
- `scripts/CodexAIGC.compile_holding_training_addon.ps1`: compiles the generated map and scripts with CS2 `resourcecompiler.exe`.
- `scripts/CodexAIGC.package_holding_training_addon.js`: creates the publishable community addon under `game/csgo_community_addons`.
- `scripts/CodexAIGC.embed_builtin_save.js`: embeds a recorded `save_local.txt` into the training script for Workshop release.
- `templates/CodexAIGC.autopeek_training.js`: route playback and recording script, with built-in data removed.
- `templates/CodexAIGC.flat_empty.vmap`: minimal wrapper map source.
- `examples/CodexAIGC.nuke.config.json`: starting config for a Nuke version.
- `CodexAIGC.GUIDE.make-nuke.md`: step-by-step Nuke workflow.

## Release Flow

1. Generate the addon source from config.
2. Compile it.
3. Launch locally and record holding groups/routes.
4. Embed the recorded save into `autopeek_training.js`.
5. Compile again.
6. Package to `game/csgo_community_addons`.
7. Open CS2 Workshop Manager and publish.

## Important Limits

The loader can load an official map without you copying that map, but spawn points still need usable world coordinates. If you do not know them, launch the official map first and use `getpos_exact` in the CS2 console. The Nuke guide explains the exact workflow.
