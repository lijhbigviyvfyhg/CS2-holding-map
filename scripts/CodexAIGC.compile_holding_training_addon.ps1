param(
  [string]$ConfigPath = "examples\CodexAIGC.nuke.config.json",
  [string]$Cs2Root = ""
)

$ErrorActionPreference = "Stop"

function Resolve-Cs2Root {
  param([string]$Start)
  if ($Start -and (Test-Path -LiteralPath (Join-Path $Start "game\bin\win64\resourcecompiler.exe"))) {
    return (Resolve-Path -LiteralPath $Start).Path
  }
  $dir = (Resolve-Path -LiteralPath ".").Path
  for ($i = 0; $i -lt 8; $i++) {
    if (Test-Path -LiteralPath (Join-Path $dir "game\bin\win64\resourcecompiler.exe")) {
      return $dir
    }
    $parent = Split-Path -Parent $dir
    if ($parent -eq $dir) { break }
    $dir = $parent
  }
  throw "Could not find CS2 root. Pass -Cs2Root."
}

$root = Resolve-Cs2Root $Cs2Root
$configFull = (Resolve-Path -LiteralPath $ConfigPath).Path
$config = Get-Content -LiteralPath $configFull -Raw | ConvertFrom-Json
$addon = $config.contentAddon
$map = $config.mapName

$compiler = Join-Path $root "game\bin\win64\resourcecompiler.exe"
$contentAddon = Join-Path $root "content\csgo_addons\$addon"
$gameAddon = Join-Path $root "game\csgo_addons\$addon"

$inputs = @(
  (Join-Path $contentAddon "maps\$map.vmap"),
  (Join-Path $contentAddon "scripts\autopeek_training.js"),
  (Join-Path $contentAddon "scripts\autopeek_training_builtin_data.js")
)

foreach ($input in $inputs) {
  if (!(Test-Path -LiteralPath $input)) {
    throw "Missing input: $input"
  }
}

& $compiler -f -i $inputs
if ($LASTEXITCODE -ne 0) {
  throw "resourcecompiler failed with exit code $LASTEXITCODE"
}

$cfgSource = Join-Path $contentAddon "cfg"
$cfgTarget = Join-Path $gameAddon "cfg"
if (Test-Path -LiteralPath $cfgSource) {
  New-Item -ItemType Directory -Force -Path $cfgTarget | Out-Null
  Copy-Item -Path (Join-Path $cfgSource "*") -Destination $cfgTarget -Recurse -Force
}

Write-Host "Compiled addon: $addon"
Write-Host "Game addon output: $gameAddon"
