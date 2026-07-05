# CodexAIGC Guide: Build A Nuke Holding Training Map

This guide assumes you do not know Nuke coordinates yet.

## 1. Clone Or Place The Template

Recommended location:

```powershell
cd "F:\steam\steamapps\common\Counter-Strike Global Offensive"
git clone https://github.com/lijhbigviyvfyhg/CodexAIGC.holding-training-map-template.git
cd CodexAIGC.holding-training-map-template
```

If you clone somewhere else, pass `--cs2-root` / `-Cs2Root` to every command.

## 2. Collect Basic Nuke Coordinates

Launch official Nuke:

```powershell
$cs2 = "F:\steam\steamapps\common\Counter-Strike Global Offensive"
Start-Process "F:\steam\steam.exe" -ArgumentList @(
  "-applaunch","730",
  "-insecure","-console","-condebug",
  "+map","de_nuke"
)
```

Open the CS2 console and stand at locations you want to use as safe spawns. Run:

```text
getpos_exact
```

Copy the printed `setpos_exact X Y Z; setang_exact P Y R` values into `examples/CodexAIGC.nuke.config.json`.

Minimum recommended points:

- `defaultPlayerStart`: one safe CT/player location.
- `ctSpawnPoints`: 4 to 8 nearby CT/player spawn points.
- `tSpawnPoints`: 8 to 16 target/bot spawn points. These do not need to be the official T spawn if you prefer practice-specific starts.

The generated wrapper map loads official `de_nuke` at world origin, so `getpos_exact` coordinates from official Nuke should be usable in the wrapper.

## 3. Generate The Addon Source

```powershell
$cs2 = "F:\steam\steamapps\common\Counter-Strike Global Offensive"
$config = "examples\CodexAIGC.nuke.config.json"

node scripts\CodexAIGC.generate_holding_training_addon.js --config $config --cs2-root $cs2
```

Expected output:

- `content/csgo_addons/nuke_holding_training/maps/de_nuke_holding_training.vmap`
- `content/csgo_addons/nuke_holding_training/scripts/autopeek_training.js`
- `content/csgo_addons/nuke_holding_training/cfg/maps/de_nuke_holding_training.cfg`

## 4. Compile

```powershell
powershell -ExecutionPolicy Bypass -File scripts\CodexAIGC.compile_holding_training_addon.ps1 -ConfigPath $config -Cs2Root $cs2
```

Expected output:

- `game/csgo_addons/nuke_holding_training/maps/de_nuke_holding_training.vpk`
- `game/csgo_addons/nuke_holding_training/scripts/autopeek_training.vjs_c`

## 5. Launch And Record Routes

```powershell
Start-Process "F:\steam\steam.exe" -ArgumentList @(
  "-applaunch","730",
  "-insecure","-console","-condebug",
  "-addon","nuke_holding_training",
  "+map","de_nuke_holding_training"
)
```

In game:

- Type `OK` in chat to install training binds.
- Use `E` on a blue marker to select a holding group.
- Use `Y` to start/stop group recording.
- Use `MOUSE4` or `MOUSE5` to start/stop route recording.
- Use `8` to save the player spawn for the current group.
- Use `delay 300` or `delay_kill 300` to adjust kill delay.
- Use `recover_cfg` to restore common binds.

Record a few groups first, then verify playback before recording the full map.

## 6. Embed The Recorded Save For Workshop

By default, CS2 stores the local training save here:

```text
F:\steam\userdata\<your_steam_user_id>\730\remote\cfg\workshop_saves\save_local.txt
```

Embed it:

```powershell
node scripts\CodexAIGC.embed_builtin_save.js --config $config --cs2-root $cs2 --save "F:\steam\userdata\<your_steam_user_id>\730\remote\cfg\workshop_saves\save_local.txt"
```

Then compile again:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\CodexAIGC.compile_holding_training_addon.ps1 -ConfigPath $config -Cs2Root $cs2
```

## 7. Package

```powershell
node scripts\CodexAIGC.package_holding_training_addon.js --config $config --cs2-root $cs2
```

Expected publish directory:

```text
game\csgo_community_addons\de_nuke_holding_training
```

## 8. Publish

Open Workshop Manager:

```powershell
Start-Process "F:\steam\steam.exe" -ArgumentList @(
  "-applaunch","730",
  "-tools",
  "-addon","nuke_holding_training"
)
```

Use CS2 Workshop Manager to publish/update the map. The package directory is:

```text
F:\steam\steamapps\common\Counter-Strike Global Offensive\game\csgo_community_addons\de_nuke_holding_training
```

## Troubleshooting

- If the player falls forever, your `defaultPlayerStart` is not on playable Nuke geometry. Recollect it with `getpos_exact`.
- If bots spawn out of world, fix `tSpawnPoints`.
- If the official map does not appear, verify `baseMapName` is exactly `de_nuke`.
- If chat is noisy, set `hideMessages` in your save or use the in-game settings commands supported by the script.
- If the map compiles but package fails, check that `game/csgo_addons/<contentAddon>/maps/<mapName>.vpk` exists.

