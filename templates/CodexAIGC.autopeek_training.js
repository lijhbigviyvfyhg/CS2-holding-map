import { CSDamageFlags, CSDamageTypes, CSInputs, Instance } from "cs_script/point_script";
const SCRIPT_ENTITY_NAME = "autopeek_training_script";
const CHAT_PREFIX = "autopeek_training";
const ADMIN_EVENT_PREFIX = "autopeek_admin_event";
const CHAT_COLOR_DEFAULT = "\x01";
const CHAT_COLOR_RED = "\x02";
const CHAT_LANGUAGE_ZH = "zh";
const CHAT_LANGUAGE_EN = "en";
const CHAT_LANGUAGE_BILINGUAL = "bilingual";
const CHAT_LANGUAGE_DEFAULT = CHAT_LANGUAGE_BILINGUAL;
const START_MESSAGE_ZH = "Holding Training??????????? delay 300ms?";
const START_MESSAGE_EN = "Holding Training: practice holding real-route peeks, default delay 300 ms.";
const START_LANGUAGE_TIP_DELAY_SECONDS = 4.0;
const START_LANGUAGE_TIP_ZH = "语言切换：中文切换聊天框输入 ZH。";
const START_LANGUAGE_TIP_EN = "Language switch: for English, enter EN in chat.";
const STARTUP_PROMPT_REPEAT_DELAY_SECONDS = 3.0;
const STARTUP_PROMPT_ATTEMPT_LIMIT = 1;
const STARTUP_LANGUAGE_TIP_ATTEMPT_LIMIT = 1;
const GROUP_IDS_TO_PRUNE_ON_LOAD = [];
const START_DIFFICULTY_TIP_DELAY_SECONDS = 10.0;
const START_DIFFICULTY_TIP_EN_DELAY_SECONDS = 1.0;
const START_DIFFICULTY_TIP_CN = "聊天框输入 delay xxx（0-10000的数字）来设置击杀延迟。推荐：0ms喜欢被育苗大拉提前枪的，50ms高手，300ms一般玩家，1000ms萌新。";
const START_DIFFICULTY_TIP_EN = "Type delay xxx (a number from 0 to 10000) in chat to set the kill delay. Recommended: 0 ms if you enjoy being wide-peek pre-fired, 50 ms for experts, 300 ms for average players, 1000 ms for beginners.";
const START_REMIND_TIP_DELAY_SECONDS = 12.5;
const START_REMIND_TIP_CN = "no_remind 取消位置提示，remind 开启位置提示。";
const START_REMIND_TIP_EN = "Use no_remind to hide position markers, and remind to show position markers again.";
const SAVE_SCHEMA = 1;
const USER_SAVE_SCHEMA = 2;
const MAX_SLOTS = 64;
const ROUTE_SLOT_COUNT = 8;
const ROUTE_NAME_WINDOW_SECONDS = 15;
const MAX_ROUTE_NAME_LENGTH = 32;
const THINK_INTERVAL = 0.015625;
const RECORD_INTERVAL = 0.015625;
const RECORD_PREP_SECONDS = 2;
const REPLAY_SETTLE_SECONDS = 1.0;
const REPLAY_RANDOM_START_DELAY_MAX_SECONDS = 1.0;
const HUMAN_DEATH_REPLAY_DELAY_SECONDS = 3.0;
const VIEW_LOCK_INTERVAL = 0.05;
const OPPONENT_BOT_CHECK_INTERVAL = 1.0;
const ECONOMY_MONEY = 16000;
const ECONOMY_ENFORCE_INTERVAL = 0.35;
const DROPPED_WEAPON_CLEANUP_INTERVAL = 0.25;
const DRIVE_PROBE_SECONDS = 1.0;
const AIM_PROBE_SECONDS = 0.45;
const ATTACK_PROBE_SECONDS = 1.0;
const MAX_RECORD_SECONDS = 20;
const MAX_ROUTE_BYTES = 900000;
const NODATA_DISABLE_GROUP_DATA = false;
const NODATA_DISABLE_CHALLENGE_DATA = true;
const BUILTIN_SAVE_CHUNKS = [
];

// Runtime copy of CodexAIGC.mirage_hidden_challenge_data.js.
// Keep the standalone hidden data script as the source of record; do not edit chunks by hand.
const CHALLENGE_SAVE_METADATA = {
  "generatedAt": "2026-06-11T17:05:21.103Z",
  "source": "ordinary builtin groups restored; challenge data intentionally omitted",
  "hiddenSummary": {
    "groups": 0,
    "playableGroups": 0,
    "routes": 0,
    "referencedRoutes": 0,
    "verifiedRoutes": 0,
    "nextGroupId": 1
  },
  "restoredNormalSummary": {
    "groups": 36,
    "playableGroups": 36,
    "routes": 147,
    "referencedRoutes": 147
  }
};
const CHALLENGE_SAVE_CHUNKS = [];
const VISIBLE_FRACTION = 0.985;
const MAP_SPAWNGROUP_READY_DELAY_SECONDS = 8.0;
const HUMAN_WEAPON_SAMPLE_INTERVAL = 0.25;
const HUMAN_WEAPON_REMEMBER_SECONDS = 3.0;
const DEFAULT_HUMAN_PRIMARY_WEAPON = "weapon_ak47";
const DEFAULT_HUMAN_PISTOL_WEAPON = "weapon_deagle";
const DEFAULT_HUMAN_WEAPON = DEFAULT_HUMAN_PISTOL_WEAPON;
const DEFAULT_HUMAN_ARMOR_ITEM = "item_assaultsuit";
const DEFAULT_PLAYER_SPAWN_TELEPORT_ENABLED = false;
const HUMAN_SPAWN_INVULNERABLE_SECONDS = 1.0;
const HUMAN_SPAWN_STATUS_DELAYS = [0.1, 0.25, 0.5];
const FALLING_RESCUE_Z = -1000;
const WORLD_MIN_VALID_Z = FALLING_RESCUE_Z;
const WORLD_MAX_VALID_Z = 2000;
const WORLD_MAX_ABS_XY = 12000;
const ROUTE_LOCAL_MAX_ABS = 5000;
const DEFAULT_PLAYER_SPAWN = {
  position: [-1830.0, -1896.0, -240.0],
  angles: [0, 0.0, 0],
};
const GROUP_SELECTOR_LABEL_PREFIX = "autopeek_group_label_";
const GROUP_SELECTOR_MAX_LABELS = 32;
const GROUP_SELECTOR_REFRESH_INTERVAL = 0.25;
const GROUP_SELECTOR_MARKER_DURATION = 0.35;
const GROUP_SELECTOR_LABEL_HEIGHT = 82;
const GROUP_SELECTOR_SHADOW_Z_OFFSET = 1.5;
const GROUP_SELECTOR_SHADOW_SEGMENTS = 12;
const GROUP_SELECTOR_USE_DOT = 0.985;
const GROUP_SELECTOR_AIM_RADIUS = 32;
const GROUP_SELECTOR_AIM_CENTER_Z = 18;
const GROUP_SELECTOR_AIM_NEAR_DISTANCE = 96;
const GROUP_SELECTOR_INPUT_ARM_DELAY = 1.5;
const GROUP_SELECTOR_BOT_MARKER_HEIGHT = 74;
const TELEPORT_RECORD_SETTLE_RAISE = 20;
const TELEPORT_RUNTIME_RAISE = 4;
const TELEPORT_SETTLE_SECONDS = 1.0;
const TELEPORT_SAFE_RADIUS = 26;
const TELEPORT_SAFE_EXTRA = 2;
const TELEPORT_SAFE_MAX_STEP = 18;
const TELEPORT_SAFE_ITERATIONS = 3;
const TELEPORT_SAFE_HEIGHTS = [18, 42, 64];
const ANIMATED_REPLAY_ENABLED = false;
const REPLAY_CORRECTION_INTERVAL = 0.35;
const REPLAY_CORRECTION_DISTANCE = 96;
const REPLAY_CORRECTION_Z_DISTANCE = 128;
const REPLAY_SYNTHETIC_INPUT_MIN_SPEED = 8.0;
const REPLAY_SYNTHETIC_INPUT_DOT = 0.35;
const REPLAY_HEADLOCK_MAX_ANGLE_DEGREES = 75;
const CROUCH_EYE_HEIGHT_THRESHOLD = 58.0;
const CHALLENGE_ROUND_COUNT = 30;
const CHALLENGE_NEXT_DELAY_SECONDS = 0.65;
const CHALLENGE_ROUTE_TIMEOUT_PAD_SECONDS = 1.25;
const SCRIPT_CHAT_NAME_PREFIXES = [
  "按键触发：",
  "这是 Mirage / 荒漠迷城",
  "脚本Setup",
  "已开始群记录",
  "已结束群记录",
  "已停止并保存录制",
  "路线槽",
  "正在稳定",
  "已设置录制锚点",
  "已设置群",
  "已放置 bot",
];

const TELEPORT_SAFE_DIRECTIONS = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0.7071, y: 0.7071, z: 0 },
  { x: -0.7071, y: 0.7071, z: 0 },
  { x: 0.7071, y: -0.7071, z: 0 },
  { x: -0.7071, y: -0.7071, z: 0 },
];

const MOVEMENT = {
  rifle: { peekSpeed: 250 },
  pistol: { peekSpeed: 260 },
  awp: { peekSpeed: 200 },
};

const STOPPING = {
  decelPerSecond: 1800,
  speedThreshold: 24,
  minTicks: 4,
  attackPulse: 0.16,
};

const TEAM_T = 2;
const TEAM_CT = 3;

const SHOOTING = {
  defaultDifficulty: 1,
  attackPulse: 0.18,
  aiWindow: 0.45,
  bodyDamage: 38,
  headDamage: 130,
  predictionLeadSeconds: 0.12,
  predictionMaxHorizontal: 42,
  predictionMaxVertical: 18,
  aiFireAssistSeconds: 0.20,
  modes: [
    { name: "纯 bot AI", aim: "none", maintain: false, forceAttack: false, scriptedHit: "none" },
    { name: "起手瞄准，不压枪", aim: "head", maintain: false, forceAttack: true, scriptedHit: "head" },
    { name: "瞄身体", aim: "body", maintain: true, forceAttack: true, scriptedHit: "body" },
    { name: "难度3", aim: "head", maintain: true, forceAttack: true, scriptedHit: "head" },
  ],
};

SHOOTING.modes[0].name = "纯 bot AI";
SHOOTING.modes[1].name = "全时锁头，基础开枪";
SHOOTING.modes[2].name = "瞄身体，持续压枪";
SHOOTING.modes[3].name = "难度3";

const KILL_DELAY_MIN_MS = 0;
const KILL_DELAY_MAX_MS = 10000;
const DIFFICULTY_KILL_DELAYS_MS = [1000, 300, 50, 0];
const DEFAULT_KILL_DELAY_MS = 300;
const KILL_DELAY_REMINDER_INTERVAL_SECONDS = 300.0;

const BINDINGS = [
  { key: "e", input: "SelectGroup", label: "E 选择群并随机回放" },
  { key: "v", input: "AppendGroup", label: "V 为准星群追加录制" },
  { key: "o", input: "AddT", label: "O 添加 T bot" },
  { key: "p", input: "AddCT", label: "P 添加 CT bot" },
  { key: "m", input: "PlaceBot", label: "M 放置 bot 到准星" },
  { key: "i", input: "FaceBot", label: "I bot 面向玩家" },
  { key: "j", input: "SelectLeft", label: "J 选择向左横拉" },
  { key: "l", input: "SelectRight", label: "L 选择向右横拉" },
  { key: "k", input: "StartPeek", label: "K 开始架枪 peek" },
  { key: ",", input: "StopPeek", label: ", 停止 peek / hold" },
  { key: ".", input: "FreezeBot", label: ". 定住 bot" },
  { key: "/", input: "ToggleFFA", label: "/ 切换 FFA" },
  { key: "n", input: "SetAnchor", label: "N 设置录制锚点" },
  { key: "[", input: "PrevRouteSlot", label: "[ 上一个路线槽" },
  { key: "]", input: "NextRouteSlot", label: "] 下一个路线槽" },
  { key: "-", input: "ToggleRecordFire", label: "- 切换记录开枪" },
  { key: "=", input: "PlayRoute", label: "= 展示当前路线" },
  { key: "y", input: "ToggleGroupRecord", label: "Y 开始/结束群记录" },
  { key: "8", input: "SetGroupSpawn", label: "8 设置群玩家出生点" },
  { key: "MOUSE4", input: "ToggleRecord", label: "MOUSE4/MOUSE5 开始/停止录制" },
  { key: "BACKSLASH", input: "ToggleLosStop", label: "\\ 切换看到人急停开枪" },
  { key: "BACKSPACE", input: "StopPlayback", label: "BACKSPACE 停止播放" },
  { key: "6", input: "CycleShootDifficulty", label: "6 切换射击难度" },
  { key: "7", input: "AttackProbe", label: "7 原始 bot +attack 测试" },
  { key: "9", input: "AimProbe", label: "9 测试 bot 视角输入" },
  { key: "0", input: "DriveProbe", label: "0 测试 bot 输入驱动" },
];

const HELP_BINDING_LINES = [
  "按键1：使用键(默认E)=选择准星指向的群并随机回放；V=给准星群追加录制；Y=开始/结束群记录；8=设置群玩家出生点",
  "按键2：MOUSE4/MOUSE5=开始/停止单路线录制；N=设置录制锚点；[ / ]=切换路线槽；-=是否记录开枪；==播放当前路线",
  "按键3：O=添加T bot；P=添加CT bot；M=放置bot到准星；I=让bot面向玩家；J/L=选择左/右横拉；K=开始架枪；,=停止架枪",
  "按键4：.=定住bot；/=切换FFA；BACKSPACE=停止播放；\\=切换看到人急停开枪；6=切换射击难度",
  "按键5：7=原始bot开枪测试；9=bot视角输入测试；0=bot输入驱动测试",
];

const HELP_COMMAND_LINES = [
  "Workshop binds: type OK in chat, or type say OK in console. Direct console OK may be blocked by Workshop cfg alias limits.",
  "Initial position markers: type show_initial position or hide_initial position.",
  "指令0：首次进入不会自动改键；聊天框OK=安装训练按键；控制台 say OK=同样安装；binds/manual_binds=只输出命令",
  "指令1：help=显示本帮助；no_remind=隐藏提示圆球；remind/show_remind=恢复提示圆球；check_bot=切换只保留1个敌方bot",
  "指令2：recover_cfg/restore_cfg=清理训练按键并恢复常用默认",
  "指令2b：聊天框输入 ZH 切换中文；输入 EN 切换英文，语言设置会保存",
  "指令3：按6可循环预设；建议直接使用 delay_kill 0-10000 调整击杀延迟",
  "指令3b：推荐延迟：0ms喜欢被育苗大拉提前枪的，50ms高手，300ms一般玩家，1000ms萌新；控制台可输入 say delay_kill 300",
  "指令4：del 群名称 路线名称/编号=删除该群中的一条路线，例如 del 群14 6",
  "指令5：经济自动锁定16000；群回放中输入路线名或路线序号，可让下两次固定使用该路线",
];

const CLIENT_BIND_COMMANDS = [
  "bind \"e\" \"ent_fire *autopeek_training_script RunScriptInput SelectGroup\"",
  "bind \"v\" \"ent_fire *autopeek_training_script RunScriptInput AppendGroup\"",
  "bind \"o\" \"ent_fire *autopeek_training_script RunScriptInput AddT\"",
  "bind \"p\" \"ent_fire *autopeek_training_script RunScriptInput AddCT\"",
  "bind \"m\" \"ent_fire *autopeek_training_script RunScriptInput PlaceBot\"",
  "bind \"i\" \"ent_fire *autopeek_training_script RunScriptInput FaceBot\"",
  "bind \"j\" \"ent_fire *autopeek_training_script RunScriptInput SelectLeft\"",
  "bind \"l\" \"ent_fire *autopeek_training_script RunScriptInput SelectRight\"",
  "bind \"k\" \"ent_fire *autopeek_training_script RunScriptInput StartPeek\"",
  "bind \",\" \"ent_fire *autopeek_training_script RunScriptInput StopPeek\"",
  "bind \".\" \"ent_fire *autopeek_training_script RunScriptInput FreezeBot\"",
  "bind \"/\" \"ent_fire *autopeek_training_script RunScriptInput ToggleFFA\"",
  "bind \"n\" \"ent_fire *autopeek_training_script RunScriptInput SetAnchor\"",
  "bind \"[\" \"ent_fire *autopeek_training_script RunScriptInput PrevRouteSlot\"",
  "bind \"]\" \"ent_fire *autopeek_training_script RunScriptInput NextRouteSlot\"",
  "bind \"-\" \"ent_fire *autopeek_training_script RunScriptInput ToggleRecordFire\"",
  "bind \"=\" \"ent_fire *autopeek_training_script RunScriptInput PlayRoute\"",
  "bind \"y\" \"ent_fire *autopeek_training_script RunScriptInput ToggleGroupRecord\"",
  "bind \"8\" \"ent_fire *autopeek_training_script RunScriptInput SetGroupSpawn\"",
  "unbind SEMICOLON",
  "bind \"MOUSE4\" \"ent_fire *autopeek_training_script RunScriptInput ToggleRecord\"",
  "bind \"MOUSE5\" \"ent_fire *autopeek_training_script RunScriptInput ToggleRecord\"",
  "bind \"scancode49\" \"ent_fire *autopeek_training_script RunScriptInput ToggleLosStop\"",
  "bind \"BACKSPACE\" \"ent_fire *autopeek_training_script RunScriptInput StopPlayback\"",
  "bind \"6\" \"ent_fire *autopeek_training_script RunScriptInput CycleShootDifficulty\"",
  "bind \"7\" \"ent_fire *autopeek_training_script RunScriptInput AttackProbe\"",
  "bind \"9\" \"ent_fire *autopeek_training_script RunScriptInput AimProbe\"",
  "bind \"0\" \"ent_fire *autopeek_training_script RunScriptInput DriveProbe\"",
];

const CLIENT_RECOVER_COMMANDS = [
  "bind \"e\" \"+use\"",
  "bind \"y\" \"messagemode\"",
  "bind \"u\" \"messagemode2\"",
  "bind \"0\" \"slot10\"",
  "bind \"6\" \"slot6\"",
  "bind \"7\" \"slot7\"",
  "bind \"8\" \"slot8\"",
  "bind \"9\" \"slot9\"",
  "unbind \"v\"",
  "unbind \"o\"",
  "unbind \"p\"",
  "unbind \"m\"",
  "unbind \"i\"",
  "unbind \"j\"",
  "unbind \"k\"",
  "unbind \"l\"",
  "unbind \"n\"",
  "unbind \"[\"",
  "unbind \"]\"",
  "unbind \"-\"",
  "unbind \"=\"",
  "unbind \",\"",
  "unbind \".\"",
  "unbind \"/\"",
  "unbind \"BACKSPACE\"",
  "unbind \"MOUSE4\"",
  "unbind \"MOUSE5\"",
  "unbind scancode49",
  "host_writeconfig",
];

const MANUAL_BIND_CONSOLE_LINES = [
  "===== Mirage Holding training / autopeek manual binds =====",
  "Important: CS2 console bind commands must use double quotes, not single quotes.",
  "Example: bind y \"ent_fire *autopeek_training_script RunScriptInput ToggleGroupRecord\"",
  "OK/binds are chat commands. From console, use: say OK  or  say binds",
  "Paste the following commands into console if you want the recommended keys.",
  "You can skip or edit any line before running it.",
  ...CLIENT_BIND_COMMANDS,
  "===== End manual binds. Type recover_cfg in chat to restore common defaults. =====",
];

const INPUT_LABEL_OVERRIDES = {
  SelectGroup: "E 选择群并随机回放",
  AppendGroup: "V 为准星群追加录制",
  AddT: "O 添加 T bot",
  AddCT: "P 添加 CT bot",
  PlaceBot: "M 放置 bot 到准星",
  FaceBot: "I bot 面向玩家",
  SelectLeft: "J 选择向左横拉",
  SelectRight: "L 选择向右横拉",
  StartPeek: "K 开始架枪 peek",
  StopPeek: ", 停止 peek / hold",
  FreezeBot: ". 定住 bot",
  ToggleFFA: "/ 切换 FFA",
  SetAnchor: "N 设置录制锚点",
  PrevRouteSlot: "[ 上一个路线槽",
  NextRouteSlot: "] 下一个路线槽",
  ToggleRecordFire: "- 切换记录开枪",
  PlayRoute: "= 播放当前路线",
  ToggleGroupRecord: "Y 开始/结束群记录",
  SetGroupSpawn: "8 设置群玩家出生点",
  ToggleRecord: "MOUSE4/MOUSE5 开始/停止录制",
  ToggleLosStop: "\\ 切换看到人急停开枪",
  StopPlayback: "BACKSPACE 停止播放",
  CycleShootDifficulty: "6 切换射击难度",
  AttackProbe: "7 原始 bot +attack 测试",
  AimProbe: "9 测试 bot 视角输入",
  DriveProbe: "0 测试 bot 输入驱动",
};

const INPUT_FLAGS = [
  CSInputs.FORWARD,
  CSInputs.BACK,
  CSInputs.LEFT,
  CSInputs.RIGHT,
  CSInputs.WALK,
  CSInputs.DUCK,
  CSInputs.JUMP,
  CSInputs.USE,
  CSInputs.RELOAD,
];

const REPLAY_INPUT_COMMANDS = [
  { flag: CSInputs.FORWARD, down: "+forward", up: "-forward", fire: false },
  { flag: CSInputs.BACK, down: "+back", up: "-back", fire: false },
  { flag: CSInputs.LEFT, down: "+moveleft", up: "-moveleft", fire: false },
  { flag: CSInputs.RIGHT, down: "+moveright", up: "-moveright", fire: false },
  { flag: CSInputs.WALK, down: "+sprint", up: "-sprint", fire: false },
  { flag: CSInputs.DUCK, down: "+duck", up: "-duck", fire: false },
  { flag: CSInputs.JUMP, down: "+jump", up: "-jump", fire: false },
  { flag: CSInputs.USE, down: "+use", up: "-use", fire: false },
  { flag: CSInputs.RELOAD, down: "+reload", up: "-reload", fire: false },
  { flag: CSInputs.ATTACK, down: "+attack", up: "-attack", fire: true },
  { flag: CSInputs.ATTACK2, down: "+attack2", up: "-attack2", fire: true },
];

const DROPPED_WEAPON_CLASSES = [
  "weapon_ak47",
  "weapon_aug",
  "weapon_awp",
  "weapon_bizon",
  "weapon_cz75a",
  "weapon_deagle",
  "weapon_elite",
  "weapon_famas",
  "weapon_fiveseven",
  "weapon_g3sg1",
  "weapon_galilar",
  "weapon_glock",
  "weapon_hkp2000",
  "weapon_usp_silencer",
  "weapon_m249",
  "weapon_m4a1",
  "weapon_m4a1_silencer",
  "weapon_mac10",
  "weapon_mag7",
  "weapon_mp5sd",
  "weapon_mp7",
  "weapon_mp9",
  "weapon_negev",
  "weapon_nova",
  "weapon_p250",
  "weapon_p90",
  "weapon_revolver",
  "weapon_sawedoff",
  "weapon_scar20",
  "weapon_sg556",
  "weapon_ssg08",
  "weapon_taser",
  "weapon_tec9",
  "weapon_ump45",
  "weapon_xm1014",
  "weapon_hegrenade",
  "weapon_flashbang",
  "weapon_smokegrenade",
  "weapon_molotov",
  "weapon_incgrenade",
  "weapon_decoy",
];

const HUMAN_DEFAULT_WEAPON_ALIASES = {
  ak: { className: "weapon_ak47", displayName: "AK-47" },
  ak47: { className: "weapon_ak47", displayName: "AK-47" },
  aug: { className: "weapon_aug", displayName: "AUG" },
  awp: { className: "weapon_awp", displayName: "AWP" },
  bizon: { className: "weapon_bizon", displayName: "PP-Bizon" },
  ppbizon: { className: "weapon_bizon", displayName: "PP-Bizon" },
  deagle: { className: "weapon_deagle", displayName: "Desert Eagle" },
  deserteagle: { className: "weapon_deagle", displayName: "Desert Eagle" },
  eagle: { className: "weapon_deagle", displayName: "Desert Eagle" },
  dualberettas: { className: "weapon_elite", displayName: "Dual Berettas" },
  elite: { className: "weapon_elite", displayName: "Dual Berettas" },
  famas: { className: "weapon_famas", displayName: "FAMAS" },
  fiveseven: { className: "weapon_fiveseven", displayName: "Five-SeveN" },
  five7: { className: "weapon_fiveseven", displayName: "Five-SeveN" },
  cz: { className: "weapon_cz75a", displayName: "CZ75-Auto" },
  cz75: { className: "weapon_cz75a", displayName: "CZ75-Auto" },
  cz75a: { className: "weapon_cz75a", displayName: "CZ75-Auto" },
  g3sg1: { className: "weapon_g3sg1", displayName: "G3SG1" },
  galil: { className: "weapon_galilar", displayName: "Galil AR" },
  galilar: { className: "weapon_galilar", displayName: "Galil AR" },
  glock: { className: "weapon_glock", displayName: "Glock-18" },
  hkp2000: { className: "weapon_hkp2000", displayName: "P2000" },
  p2000: { className: "weapon_hkp2000", displayName: "P2000" },
  m249: { className: "weapon_m249", displayName: "M249" },
  m4: { className: "weapon_m4a1", displayName: "M4A4" },
  m4a1: { className: "weapon_m4a1", displayName: "M4A4" },
  m4a4: { className: "weapon_m4a1", displayName: "M4A4" },
  m4a1s: { className: "weapon_m4a1_silencer", displayName: "M4A1-S" },
  m4a1silencer: { className: "weapon_m4a1_silencer", displayName: "M4A1-S" },
  m4silencer: { className: "weapon_m4a1_silencer", displayName: "M4A1-S" },
  mac10: { className: "weapon_mac10", displayName: "MAC-10" },
  mag7: { className: "weapon_mag7", displayName: "MAG-7" },
  mp5: { className: "weapon_mp5sd", displayName: "MP5-SD" },
  mp5sd: { className: "weapon_mp5sd", displayName: "MP5-SD" },
  mp7: { className: "weapon_mp7", displayName: "MP7" },
  mp9: { className: "weapon_mp9", displayName: "MP9" },
  negev: { className: "weapon_negev", displayName: "Negev" },
  nova: { className: "weapon_nova", displayName: "Nova" },
  p250: { className: "weapon_p250", displayName: "P250" },
  p90: { className: "weapon_p90", displayName: "P90" },
  r8: { className: "weapon_revolver", displayName: "R8 Revolver" },
  revolver: { className: "weapon_revolver", displayName: "R8 Revolver" },
  sawedoff: { className: "weapon_sawedoff", displayName: "Sawed-Off" },
  scar20: { className: "weapon_scar20", displayName: "SCAR-20" },
  scout: { className: "weapon_ssg08", displayName: "SSG 08" },
  sg: { className: "weapon_sg556", displayName: "SG 553" },
  sg553: { className: "weapon_sg556", displayName: "SG 553" },
  sg556: { className: "weapon_sg556", displayName: "SG 553" },
  ssg: { className: "weapon_ssg08", displayName: "SSG 08" },
  ssg08: { className: "weapon_ssg08", displayName: "SSG 08" },
  taser: { className: "weapon_taser", displayName: "Zeus x27" },
  tec9: { className: "weapon_tec9", displayName: "Tec-9" },
  ump: { className: "weapon_ump45", displayName: "UMP-45" },
  ump45: { className: "weapon_ump45", displayName: "UMP-45" },
  usp: { className: "weapon_usp_silencer", displayName: "USP-S" },
  usps: { className: "weapon_usp_silencer", displayName: "USP-S" },
  uspsilencer: { className: "weapon_usp_silencer", displayName: "USP-S" },
  xm1014: { className: "weapon_xm1014", displayName: "XM1014" },
  zeus: { className: "weapon_taser", displayName: "Zeus x27" },
};

const PRIMARY_WEAPON_CLASSES = {
  weapon_ak47: true,
  weapon_aug: true,
  weapon_awp: true,
  weapon_bizon: true,
  weapon_famas: true,
  weapon_g3sg1: true,
  weapon_galilar: true,
  weapon_m249: true,
  weapon_m4a1: true,
  weapon_m4a1_silencer: true,
  weapon_mac10: true,
  weapon_mag7: true,
  weapon_mp5sd: true,
  weapon_mp7: true,
  weapon_mp9: true,
  weapon_negev: true,
  weapon_nova: true,
  weapon_p90: true,
  weapon_sawedoff: true,
  weapon_scar20: true,
  weapon_sg556: true,
  weapon_ssg08: true,
  weapon_ump45: true,
  weapon_xm1014: true,
};

const PISTOL_WEAPON_CLASSES = {
  weapon_cz75a: true,
  weapon_deagle: true,
  weapon_elite: true,
  weapon_fiveseven: true,
  weapon_glock: true,
  weapon_hkp2000: true,
  weapon_p250: true,
  weapon_revolver: true,
  weapon_tec9: true,
  weapon_usp_silencer: true,
};

const SERVER_SETUP_COMMANDS = [
  "sv_cheats 1",
  "mp_maxmoney 16000",
  "mp_startmoney 16000",
  "mp_afterroundmoney 16000",
  "mp_playercashawards 0",
  "mp_teamcashawards 0",
  "mp_warmup_end",
  "mp_limitteams 0",
  "mp_autoteambalance 0",
  "mp_ignore_round_win_conditions 1",
  "mp_freezetime 0",
  "mp_roundtime 60",
  "mp_roundtime_defuse 60",
  "mp_respawn_on_death_ct 1",
  "mp_respawn_on_death_t 1",
  "mp_respawn_immunitytime 1",
  "mp_free_armor 2",
  "mp_ct_default_primary \"\"",
  "mp_t_default_primary \"\"",
  "mp_ct_default_secondary \"\"",
  "mp_t_default_secondary \"\"",
  "mp_force_pick_time 1",
  "mp_buytime 9999",
  "mp_buy_anywhere 1",
  "sv_infinite_ammo 1",
  "bot_quota_mode normal",
  "bot_join_after_player 0",
  "bot_join_team any",
  "bot_chatter off",
  "bot_difficulty 4",
  "custom_bot_difficulty 4",
  "sv_auto_adjust_bot_difficulty 0",
  "bot_defer_to_human_goals 0",
  "bot_defer_to_human_items 0",
  "bot_zombie 0",
  "bot_mimic 0",
];

let lastHumanSlot = -1;
let lastBotSlot = -1;
let selectedBotSlot = -1;
let lastLoadedMessageAt = -999;
let loadedAnnouncementShown = false;
let chatLanguage = CHAT_LANGUAGE_DEFAULT;
let startupUseInstructionShown = false;
let startupUseInstructionReadyAt = -1;
let startupUseInstructionAttempts = 0;
let startupLanguageTipShown = false;
let startupLanguageTipReadyAt = -1;
let startupLanguageTipAttempts = 0;
let startupLanguageTipEnglishPending = false;
let startupLanguageTipEnglishReadyAt = -1;
let startupDifficultyTipShown = false;
let startupDifficultyTipReadyAt = -1;
let startupDifficultyTipEnglishPending = false;
let startupDifficultyTipEnglishReadyAt = -1;
let startupRemindTipShown = false;
let startupRemindTipReadyAt = -1;
let nextKillDelayReminderAt = -1;
let killDelayReminderEnglishPending = false;
let killDelayReminderEnglishReadyAt = -1;
let pendingKillDelayReminderEnglish = "";
let lastLoadDiagnostic = {
  rawLength: -1,
  parsed: false,
  groupCount: 0,
  nonEmptyGroupCount: 0,
  spawnGroupCount: 0,
  routeCount: 0,
  source: "",
  error: "",
};
let ffaEnabled = false;
let store = { schema: SAVE_SCHEMA, userSaveSchema: USER_SAVE_SCHEMA, routes: {}, groups: {}, settings: {}, nextGroupId: 1 };
let builtinStore = null;
let builtinRouteKeys = {};
let builtinGroupKeys = {};
let externalBuiltinChunks = [];
let externalBuiltinTransferActive = false;
let externalBuiltinDataLoaded = false;
let externalBuiltinChunkCount = 0;
let storeLoaded = false;
let challengeStore = null;
let challengeStoreLoaded = false;
let challengeSession = null;
let selectedAnchor = null;
let placementDraft = null;
let activeRouteSlot = 1;
let activeGroupId = -1;
let recordFire = false;
let losStopAndShoot = false;
let shootDifficulty = SHOOTING.defaultDifficulty;
let killDelayMs = DEFAULT_KILL_DELAY_MS;
let defaultHumanWeapon = DEFAULT_HUMAN_WEAPON;
let recording = null;
let playback = null;
let pendingFinishKill = null;
let pendingReplay = null;
let activePlaybackGroupId = -1;
let pendingGroupReplay = null;
let lastReplayRouteKeyByGroup = {};
let groupRouteShuffleBags = {};
let preferredGroupRoute = null;
let pendingRouteNaming = null;
let pendingGroupNaming = null;
let noRemindMode = false;
let activeInitialPositionVisible = true;
let opponentBotGuardMode = true;
let cfgBackupOkConfirmedRuntime = false;
let pendingInitialBotKickAt = -1;
let pendingOpponentBot = null;
let pendingBotSpawn = null;
let pendingBotConfirm = null;
let pendingDefaultHumanSpawn = null;
let pendingSettledPoint = null;
let scriptChatEchoes = [];
let botViewLock = null;
let driveProbe = null;
let aimProbe = null;
let attackProbe = null;
let botFireAssist = null;
let scriptDrivenBotSlot = -1;
let botPressedMask = 0;
let forcedAttack = null;
let headlockSmoothingBySlot = {};
let stopping = null;
let initialBotKickDone = false;
let mapReadyAt = -1;
let nextOpponentBotCheckAt = -1;
let nextEconomyEnforceAt = -1;
let nextDroppedWeaponCleanupAt = -1;
let lastCfgBackupGateWarningAt = -999;
let groupSelectorUseHeld = false;
let groupSelectorNeedsRelease = true;
let groupSelectorReadyAt = -1;
let groupSelectorNextDrawAt = -1;
let groupSelectorLabels = null;
let groupSelectorLastDiagnosticAt = -999;
let nextHumanSpawnAssistAt = -1;
let lastHumanSpawnAssistMessageAt = -999;
let humanRememberedLoadouts = {};
let humanWeaponMemoryCandidates = {};
let pendingHumanLoadouts = {};
let humanInvulnerableUntilBySlot = {};
let nextHumanWeaponSampleAt = -1;

function now() {
  return Instance.GetGameTime();
}

function server(command) {
  Instance.ServerCommand(command);
}

function setupServer() {
  for (const command of SERVER_SETUP_COMMANDS) {
    server(command);
  }
}

function tryMoneySetter(target, amount) {
  if (!target) {
    return false;
  }

  for (const method of ["SetMoney", "SetAccount", "SetCash", "SetAccountMoney"]) {
    if (typeof target[method] === "function") {
      try {
        target[method](amount);
        return true;
      } catch {
      }
    }
  }
  return false;
}

function moneyServiceForController(controller) {
  if (!controller) {
    return null;
  }

  for (const method of ["GetInGameMoneyServices", "GetMoneyServices", "InGameMoneyServices"]) {
    if (typeof controller[method] !== "function") {
      continue;
    }
    try {
      const service = controller[method]();
      if (service) {
        return service;
      }
    } catch {
    }
  }
  return null;
}

function setPlayerMoney(controller, amount) {
  if (!controller || controller.IsBot()) {
    return false;
  }

  if (tryMoneySetter(controller, amount)) {
    return true;
  }

  const service = moneyServiceForController(controller);
  if (tryMoneySetter(service, amount)) {
    return true;
  }

  const pawn = pawnOf(controller);
  if (tryMoneySetter(pawn, amount)) {
    return true;
  }

  try {
    Instance.ClientCommand(controller.GetPlayerSlot(), "impulse 101");
    return true;
  } catch {
    return false;
  }
}

function enforceEconomy(force = false) {
  const current = now();
  if (!force && current < nextEconomyEnforceAt) {
    return false;
  }

  nextEconomyEnforceAt = current + ECONOMY_ENFORCE_INTERVAL;
  server(`mp_maxmoney ${ECONOMY_MONEY}`);
  server(`mp_startmoney ${ECONOMY_MONEY}`);
  server(`mp_afterroundmoney ${ECONOMY_MONEY}`);
  server("mp_playercashawards 0");
  server("mp_teamcashawards 0");
  server("mp_buytime 9999");
  server("mp_buy_anywhere 1");

  let changed = false;
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && controller.IsConnected && controller.IsConnected() && !controller.IsBot()) {
      changed = setPlayerMoney(controller, ECONOMY_MONEY) || changed;
    }
  }
  return changed;
}

function requestInitialBotKickOnce(delay = 0.35) {
  if (initialBotKickDone || pendingInitialBotKickAt >= 0) {
    return;
  }
  pendingInitialBotKickAt = now() + delay;
  scheduleThink(delay);
}

function handleInitialBotKick() {
  if (initialBotKickDone || pendingInitialBotKickAt < 0 || now() < pendingInitialBotKickAt) {
    return;
  }

  pendingInitialBotKickAt = -1;
  initialBotKickDone = true;
  server("bot_kick");
  server("bot_quota 0");
  lastBotSlot = -1;
  selectedBotSlot = -1;
  placementDraft = null;
  botViewLock = null;
  chat("开场清理：已踢掉初始 bot（仅一次）");
  requestOpponentBotForExistingHuman(0.35);
}

function sanitizeChat(text) {
  return String(text).replace(/"/g, "'").replace(/\n/g, " ");
}

function hasCjk(text) {
  return /[\u3400-\u9fff]/.test(String(text));
}

function englishControlLabel(text) {
  const key = String(text).split(/\s+/)[0] || "";
  if (text.indexOf("选择群并随机回放") >= 0) return `${key} select a spawn group and play a random route`;
  if (text.indexOf("为准星群追加录制") >= 0) return `${key} append a recording to the aimed group`;
  if (text.indexOf("添加 T bot") >= 0) return `${key} add a T bot`;
  if (text.indexOf("添加 CT bot") >= 0) return `${key} add a CT bot`;
  if (text.indexOf("放置 bot") >= 0) return `${key} place the bot at your crosshair`;
  if (text.indexOf("面向玩家") >= 0 || text.indexOf("面向你") >= 0) return `${key} make the bot face you`;
  if (text.indexOf("向左横拉") >= 0) return `${key} choose left wide-swing direction`;
  if (text.indexOf("向右横拉") >= 0) return `${key} choose right wide-swing direction`;
  if (text.indexOf("开始架枪") >= 0) return `${key} start angle-hold practice`;
  if (text.indexOf("停止") >= 0 && text.indexOf("peek") >= 0) return `${key} stop peek / hold playback`;
  if (text.indexOf("定住") >= 0) return `${key} freeze / unfreeze the bot`;
  if (text.indexOf("切换 FFA") >= 0) return `${key} toggle FFA`;
  if (text.indexOf("录制锚点") >= 0) return `${key} set the recording anchor`;
  if (text.indexOf("上一个路线槽") >= 0) return `${key} previous route slot`;
  if (text.indexOf("下一个路线槽") >= 0) return `${key} next route slot`;
  if (text.indexOf("记录开枪") >= 0) return `${key} toggle recording shots`;
  if (text.indexOf("展示当前路线") >= 0 || text.indexOf("播放当前路线") >= 0) return `${key} play the current route`;
  if (text.indexOf("群记录") >= 0) return `${key} start / stop group recording`;
  if (text.indexOf("群玩家出生点") >= 0 || text.indexOf("群出生点") >= 0) return `${key} set the group player spawn`;
  if (text.indexOf("开始/停止录制") >= 0) return `${key} start / stop route recording`;
  if (text.indexOf("看到人急停开枪") >= 0) return `${key} toggle stop-and-shoot on line of sight`;
  if (text.indexOf("切换射击难度") >= 0) return `${key} cycle shooting difficulty`;
  if (text.indexOf("开枪测试") >= 0 || text.indexOf("+attack") >= 0) return `${key} run raw bot attack test`;
  if (text.indexOf("视角输入") >= 0) return `${key} run bot view-input test`;
  if (text.indexOf("输入驱动") >= 0) return `${key} run bot movement-input test`;
  return text;
}

function englishForMessage(text) {
  const safe = String(text);
  if (!hasCjk(safe)) return "";
  if (safe.indexOf("这是 Mirage / 荒漠迷城") >= 0) return "Mirage bot-route recording map. Aim at a blue sphere and press E, or your use key, to start angle-holding practice.";
  if (safe.indexOf("首次进入不会自动修改") >= 0) return "First launch will not automatically change your CS2 cfg or key binds.";
  if (safe.indexOf("cfg常见位置") >= 0) return "Common cfg paths are Steam/userdata/<SteamID>/730/local/cfg/ and Steam/userdata/<SteamID>/730/remote/cs2_user_keys.vcfg.";
  if (safe.indexOf("对准蓝色球体") >= 0) return "Aim at a blue sphere and press E, or any other +use / use key, to start angle-holding practice.";
  if (safe.indexOf("若未绑键") >= 0) return "If keys are not bound, type OK in chat, or type say OK in console. This may cause key conflicts, so back up your cfg first.";
  if (safe.indexOf("请先备份cfg") >= 0) return "Back up cfg first. To install recommended training binds in Workshop, type OK in chat or say OK in console.";
  if (safe.indexOf("恢复指令 recover_cfg") >= 0) return "The map provides recover_cfg, but it only restores common default practice keys.";
  if (safe.indexOf("聊天框 OK 不能直接绑键") >= 0) return "Chat OK cannot bind keys directly because CS2 blocks script-side exec/bind.";
  if (safe.indexOf("请打开控制台输入 OK") >= 0) return "For Workshop builds, type OK in chat or type say OK in console.";
  if (safe.indexOf("控制台执行 exec autopeek_training_binds") >= 0) return "For Workshop builds, type OK in chat or type say OK in console to install training binds.";
  if (safe.indexOf("推荐绑键已输出到控制台") >= 0) return "Recommended bind commands were printed to the console.";
  if (safe.indexOf("完整按键与指令") >= 0) return "Full controls and commands are listed below.";
  if (safe.indexOf("聊天框 OK") >= 0 && safe.indexOf("binds/manual_binds") >= 0) return "Tip: type OK in chat, or say OK in console, to install training binds; binds/manual_binds only prints recommended bind commands.";
  if (safe.indexOf("按键触发：") >= 0) return `Key triggered: ${englishControlLabel(safe.replace("按键触发：", ""))}`;
  if (safe.indexOf("按键1") >= 0) return "Controls 1: use key (default E) selects a group and random route; V appends a recording; Y starts/stops group recording; 8 sets group player spawn.";
  if (safe.indexOf("按键2") >= 0) return "Controls 2: MOUSE4/MOUSE5 record; N sets anchor; [/] switch route slot; - toggles shot recording; = plays current route.";
  if (safe.indexOf("按键3") >= 0) return "Controls 3: O/P add T/CT bot; M places bot; I faces bot to you; J/L choose direction; K starts hold; comma stops.";
  if (safe.indexOf("按键4") >= 0) return "Controls 4: . freezes bot; / toggles FFA; BACKSPACE stops playback; backslash toggles stop-and-shoot; 6 cycles difficulty.";
  if (safe.indexOf("按键5") >= 0) return "Controls 5: 7 tests bot attack; 9 tests bot view input; 0 tests bot movement input.";
  if (safe.indexOf("指令0") >= 0) return "Command 0: first launch does not auto-bind; console exec installs binds; chat OK only confirms; binds prints commands.";
  if (safe.indexOf("指令1") >= 0) return "Command 1: help shows help; no_remind hides markers; remind/show_remind restores markers; check_bot toggles one-enemy-bot guard.";
  if (safe.indexOf("指令2b") >= 0) return "Command 2b: type ZH in chat to switch to Chinese; type EN to switch to English. The language setting is saved.";
  if (safe.indexOf("指令2") >= 0) return "Command 2: recover_cfg / restore_cfg clears training binds and restores common defaults.";
  if (safe.indexOf("指令3b") >= 0) return "Command 3b: recommended delay is 0 ms if you enjoy being wide-peek pre-fired, 50 ms for experts, 300 ms for average players, and 1000 ms for beginners; from console use say delay_kill 300.";
  if (safe.indexOf("指令3") >= 0) return "Command 3: press 6 to cycle presets; recommended direct command is delay_kill 0-10000.";
  if (safe.indexOf("指令4") >= 0) return "Command 4: del <group name> <route name/number> deletes one route from a group.";
  if (safe.indexOf("指令5") >= 0) return "Command 5: economy is locked at 16000; typing a route name during group replay locks the next two plays.";
  if (safe.indexOf("开场清理") >= 0) return "Initial cleanup: default bots were kicked once.";
  if (safe.indexOf("已自动加入") >= 0) return "Auto-joined a team; if still spectating, wait one second or reconnect.";
  if (safe.indexOf("Mirage 仍在加载") >= 0) return "Mirage is still loading; the bot request has been queued.";
  if (safe.indexOf("已根据你的阵营") >= 0) return "Requested an opponent bot based on your current team.";
  if (safe.indexOf("已确认") >= 0 && safe.indexOf("bot 存活") >= 0) return "Opponent bot confirmed alive.";
  if (safe.indexOf("check_bot") >= 0) return "check_bot: strict one-enemy-bot guard status changed.";
  if (safe.indexOf("未精确对准") >= 0) return "No exact target group; using the nearest group.";
  if (safe.indexOf("选中群") >= 0 && safe.indexOf("随机回放") >= 0) return "Group selected; starting a random route replay.";
  if (safe.indexOf("bot站稳中") >= 0) return "Bot is settling; route playback will start after the delay.";
  if (safe.indexOf("bot已站稳") >= 0) return "Bot settled; route playback started.";
  if (safe.indexOf("已停止群循环回放") >= 0) return "Group loop replay stopped.";
  if (safe.indexOf("已开始群记录") >= 0) return "Group recording started.";
  if (safe.indexOf("已结束群记录") >= 0) return "Group recording ended.";
  if (safe.indexOf("未设置玩家出生点") >= 0) return "Player spawn for this group is not set.";
  if (safe.indexOf("路线名") >= 0 || safe.indexOf("路线名称") >= 0) return "Route-name command or route selection updated.";
  if (safe.indexOf("删除失败") >= 0) return "Delete failed; check the group name and route name/number.";
  if (safe.indexOf("删除路线") >= 0 || safe.indexOf("已删除") >= 0) return "Route delete command processed.";
  if (safe.indexOf("kill_delay=") >= 0 && safe.indexOf("bot已完成") >= 0) return "kill_delay elapsed: the bot completed the delayed kill.";
  if (safe.indexOf("路线播放完毕") >= 0 && safe.indexOf("kill_delay") >= 0) return "Route ended; the delayed kill will be resolved after the configured kill_delay.";
  if (safe.indexOf("kill_delay结束") >= 0) return "kill_delay ended; the bot cannot see the player, so the next route will start after one second.";
  if (safe.indexOf("kill_delay") >= 0 || safe.indexOf("delay_kill") >= 0) return "kill_delay changed or displayed.";
  if (safe.indexOf("难度切换") >= 0 || safe.indexOf("当前难度") >= 0 || safe.indexOf("难度指令") >= 0) return "Shooting difficulty changed or displayed; press 6 to cycle.";
  if (safe.indexOf("恢复cfg失败") >= 0) return "Cfg recovery failed: no player was available for client commands.";
  if (safe.indexOf("已恢复常用默认按键") >= 0) return "Common default keys restored.";
  if (safe.indexOf("无提示") >= 0 || safe.indexOf("提示圆球") >= 0) return "Hint-marker display mode changed.";
  if (safe.indexOf("语言") >= 0 && (safe.indexOf("ZH") >= 0 || safe.indexOf("EN") >= 0)) return "Language: type ZH in chat to switch to Chinese; type EN to switch to English. The language setting is saved.";
  if (safe.indexOf("经济") >= 0 || safe.indexOf("16000") >= 0) return "Practice economy is locked to 16000 money.";
  if (safe.indexOf("录制") >= 0) return "Recording state updated.";
  if (safe.indexOf("播放") >= 0 || safe.indexOf("回放") >= 0) return "Playback state updated.";
  if (safe.indexOf("bot") >= 0) return "Bot state updated.";
  if (safe.indexOf("失败") >= 0 || safe.indexOf("无法") >= 0 || safe.indexOf("没有") >= 0) return "Action could not be completed; see the Chinese line for exact details.";
  if (safe.indexOf("已") >= 0) return "Action completed; see the Chinese line for exact details.";
  return "Map notice; see the Chinese line for exact details.";
}

function normalizeChatLanguage(value) {
  const text = String(value || "").trim().toLowerCase();
  if (text === "en" || text === "english") {
    return CHAT_LANGUAGE_EN;
  }
  if (text === "zh" || text === "cn" || text === "chinese" || text === "中文") {
    return CHAT_LANGUAGE_ZH;
  }
  if (text === "bilingual" || text === "auto" || text === "both") {
    return CHAT_LANGUAGE_BILINGUAL;
  }
  return CHAT_LANGUAGE_DEFAULT;
}

function isBilingualChatLanguage(language = chatLanguage) {
  return normalizeChatLanguage(language) === CHAT_LANGUAGE_BILINGUAL;
}

function languageName(language = chatLanguage) {
  return normalizeChatLanguage(language) === CHAT_LANGUAGE_EN ? "English" : "中文";
}

function englishReasonText(reason) {
  const safe = String(reason || "");
  if (!safe) {
    return "";
  }
  if (safe === "手动设置") {
    return "manual setting";
  }
  if (safe.indexOf("难度") === 0) {
    return safe.replace("难度", "difficulty ");
  }
  if (safe === "路线播放完毕") {
    return "route finished";
  }
  if (!hasCjk(safe)) {
    return safe;
  }
  return "setting";
}

function chineseForEnglishMessage(text) {
  const safe = String(text || "").trim();
  const lower = safe.toLowerCase();
  if (!safe) {
    return "";
  }
  if (lower.indexOf("en:") === 0) {
    return "";
  }
  if (safe.indexOf("Workshop binds:") === 0) return "Workshop 绑键：聊天框输入 OK，或控制台输入 say OK。控制台直接 OK 可能受 Workshop cfg alias 限制。";
  if (safe.indexOf("Workshop install:") === 0) return "Workshop 版安装：聊天框输入 OK，或控制台输入 say OK。控制台直接 OK 可能被阻止。";
  if (safe.indexOf("Type OK in chat") === 0) return "聊天框输入 OK，或控制台输入 say OK，以安装推荐训练按键。";
  if (safe.indexOf("Direct console OK") === 0) return "Workshop 版中控制台直接 OK 可能被阻止，因为地图 cfg alias 不可靠。";
  if (safe.indexOf("Use recover_cfg") === 0) return "使用 recover_cfg 可恢复常用默认按键。";
  if (safe.indexOf("Bind install failed: no human") === 0) return "绑键安装失败：没有找到真人玩家。";
  if (safe.indexOf("Bind install failed: CS2 refused") === 0) return "绑键安装失败：CS2 拒绝执行客户端命令。";
  if (safe.indexOf("Training binds installed") === 0) return "训练按键已安装：对准蓝色球体按 E 开始训练，M 放置 bot，Y 群录制，MOUSE4/MOUSE5 录路线。";
  if (safe.indexOf("Recommended bind commands were printed") === 0) return "推荐绑键已输出到控制台。Workshop 版请在聊天框输入 OK，或在控制台输入 say OK 自动安装。";
  if (safe.indexOf("Manual binds need double quotes") === 0) return "手动 bind 必须使用双引号，不要使用单引号。";
  if (safe.indexOf("Notice: save data is not safe") === 0) return "注意：当前地图存档不可安全写入，本次 OK 只对当前会话生效，不会覆盖本地记录。";
  if (safe.indexOf("IMPORTANT: first launch") === 0) return "重要：首次进入不会自动修改你的 CS2 cfg / 按键配置。";
  if (safe.indexOf("Common cfg paths:") === 0) return "cfg 常见位置：Steam\\userdata\\<你的SteamID>\\730\\local\\cfg\\ 和 Steam\\userdata\\<你的SteamID>\\730\\remote\\cs2_user_keys.vcfg";
  if (safe.indexOf("Bind note:") === 0) return "绑键说明：聊天框输入 OK，或控制台输入 say OK，以安装推荐按键。";
  if (safe.indexOf("Manual bind note:") === 0) return "手动 bind 说明：请使用双引号，不要使用单引号。";
  if (safe.indexOf("recover_cfg restores") === 0) return "recover_cfg 只能恢复常用默认按键，复杂自定义 cfg 无法完整恢复。";
  if (safe.indexOf("Difficulty changed.") === 0) return `难度切换，当前难度：${shootDifficultyLabel()}，按 6 继续切换。`;
  if (safe.indexOf("Use delay_kill") === 0) return "使用 delay_kill 0-10000 手动设置延迟击杀毫秒；控制台可输入 say delay_kill 300。按 6 仍可循环预设。";
  if (safe.indexOf("Recommended delay:") === 0) return "推荐延迟：0ms 喜欢被育苗大拉提前枪的，50ms 高手，300ms 一般玩家，1000ms 萌新。";
  if (safe.indexOf("Current kill_delay=") === 0) return `当前 kill_delay=${killDelayMs}ms；聊天框输入 delay xxx（0-10000的数字）来设置击杀延迟。`;
  if (safe.indexOf("Delayed-kill setup:") === 0) return "延迟击杀设置：建议使用 delay_kill 0-10000；按 6 仍可循环预设。";
  if (safe.indexOf("kill_delay usage:") === 0) return "kill_delay 用法：delay_kill 0-10000 / kill_delay 0-10000。";
  if (safe.indexOf("Console usage:") === 0) return "控制台用法：输入 say OK / say binds。手动 bind 必须使用双引号。";
  if (safe.indexOf("Delay: use delay_kill") === 0) return "延迟：delay_kill 0-10000 可手动设置延迟击杀；推荐：0ms 喜欢被育苗大拉提前枪的，50ms 高手，300ms 一般玩家，1000ms 萌新。";
  if (safe.indexOf("Press E again") === 0) return "再次按 E 退出当前群架枪训练。";
  if (safe.indexOf("Language changed to English") === 0) return "语言已切换为英文。";
  if (safe.indexOf("Language changed to Chinese") === 0) return "语言已切换为中文。";
  return "";
}

function localizedChatText(text, language = chatLanguage) {
  const safe = sanitizeChat(text);
  const normalizedLanguage = normalizeChatLanguage(language);
  if (normalizedLanguage === CHAT_LANGUAGE_EN) {
    if (safe.trim().toLowerCase().indexOf("en:") === 0) {
      return safe.replace(/^EN:\s*/i, "");
    }
    if (hasCjk(safe)) {
      return englishForMessage(safe) || safe;
    }
    return safe;
  }

  const zh = chineseForEnglishMessage(safe);
  if (zh !== "") {
    return zh;
  }
  if (safe.trim().toLowerCase().indexOf("en:") === 0) {
    return "";
  }
  return safe;
}

function rememberScriptChatEcho(text) {
  const current = now();
  scriptChatEchoes = scriptChatEchoes.filter((entry) => entry.until > current).slice(-96);
  scriptChatEchoes.push({ text: String(text).trim(), until: current + 1.5 });
}

function isScriptChatEcho(text) {
  const current = now();
  const safe = sanitizeChat(text).trim();
  scriptChatEchoes = scriptChatEchoes.filter((entry) => entry.until > current);
  const index = scriptChatEchoes.findIndex((entry) => entry.text === safe);
  if (index < 0) {
    return false;
  }
  scriptChatEchoes.splice(index, 1);
  return true;
}

function emitChatWithColor(text, colorCode = "", sayToChat = true) {
  const safe = sanitizeChat(text);
  if (!safe) {
    return;
  }
  Instance.Msg(`[${CHAT_PREFIX}] ${safe}`);
  if (!sayToChat) {
    return;
  }
  rememberScriptChatEcho(safe);
  const prefix = colorCode || "";
  const suffix = colorCode ? CHAT_COLOR_DEFAULT : "";
  server(`say "${prefix}${safe}${suffix}"`);
}

function routineChatVisible(force = false) {
  return force || !settingFlag("hideMessages", false);
}

function chatWithColor(text, colorCode = "", localize = true, force = false) {
  const sayToChat = routineChatVisible(force);
  if (!localize) {
    emitChatWithColor(text, colorCode, sayToChat);
    return;
  }
  if (isBilingualChatLanguage()) {
    const zhText = localizedChatText(text, CHAT_LANGUAGE_ZH);
    const enText = localizedChatText(text, CHAT_LANGUAGE_EN).replace(/^EN:\s*/i, "");
    if (zhText) {
      emitChatWithColor(zhText, colorCode, sayToChat);
    }
    if (enText && enText !== zhText) {
      emitChatWithColor(`EN: ${enText}`, colorCode, sayToChat);
    }
    return;
  }
  emitChatWithColor(localizedChatText(text), colorCode, sayToChat);
}

function chat(text, force = false) {
  chatWithColor(text, "", true, force);
}

function chatRed(text, force = false) {
  // CS2 workshop chat can drop lines that start with color control bytes.
  // Keep critical startup/cfg warnings visible as plain chat.
  chatWithColor(text, "", true, force);
}

function chatManualBilingualLine(text) {
  chatWithColor(text, "", false);
}

function chatLocalized(zhText, enText, colorCode = "", force = false) {
  const sayToChat = routineChatVisible(force);
  if (isBilingualChatLanguage()) {
    chatForcedBilingual(zhText, enText, colorCode, force);
    return;
  }
  emitChatWithColor(chatLanguage === CHAT_LANGUAGE_EN ? enText : zhText, colorCode, sayToChat);
}

function chatLocalizedRed(zhText, enText) {
  chatForcedBilingual(zhText, enText);
}

function chatForcedBilingual(zhText, enText, colorCode = "", force = false) {
  const sayToChat = routineChatVisible(force);
  emitChatWithColor(zhText, colorCode, sayToChat);
  emitChatWithColor(`EN: ${enText}`, colorCode, sayToChat);
}

function announceLoaded(force = false) {
  if (loadedAnnouncementShown && !force) {
    return;
  }
  if (!force && now() - lastLoadedMessageAt < 2) {
    return;
  }
  lastLoadedMessageAt = now();
  loadedAnnouncementShown = true;
  chatForcedBilingual(START_MESSAGE_ZH, START_MESSAGE_EN, "", true);
}

function canPersistSettingsSafely() {
  return !!(lastLoadDiagnostic.parsed && !lastLoadDiagnostic.error && lastLoadDiagnostic.source !== "builtin_parse_error");
}

function cfgBackupOkConfirmed() {
  ensureStoreShape();
  return !!(cfgBackupOkConfirmedRuntime || store.settings.cfgBackupOkConfirmed);
}

function hasConnectedHumanController() {
  const cached = lastHumanSlot >= 0 ? controllerAtSlot(lastHumanSlot) : null;
  if (cached && !cached.IsBot()) {
    return true;
  }
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && !controller.IsBot() && (!controller.IsConnected || controller.IsConnected())) {
      return true;
    }
  }
  return false;
}

function resetStartupUseInstruction(delay = 1.0, force = false) {
  if (startupUseInstructionShown && !force) {
    return;
  }
  startupUseInstructionShown = false;
  startupUseInstructionReadyAt = now() + delay;
  startupUseInstructionAttempts = 0;
}

function maybeShowStartupUseInstruction(force = false) {
  if (startupUseInstructionShown) {
    return false;
  }
  if (!force && now() < startupUseInstructionReadyAt) {
    return false;
  }
  if (!force && !hasConnectedHumanController()) {
    return false;
  }
  startupUseInstructionAttempts += 1;
  emitChatWithColor("对准蓝色球体摁 E（或其它 +use / 使用键）开始架枪训练 / Aim at a blue sphere and press E or your use key to start angle-holding practice.");
  if (startupUseInstructionAttempts >= STARTUP_PROMPT_ATTEMPT_LIMIT) {
    startupUseInstructionShown = true;
  } else {
    startupUseInstructionReadyAt = now() + STARTUP_PROMPT_REPEAT_DELAY_SECONDS;
  }
  return true;
}

function resetStartupLanguageTip(delay = START_LANGUAGE_TIP_DELAY_SECONDS, force = false) {
  if (startupLanguageTipShown || startupLanguageTipEnglishPending) {
    return;
  }
  startupLanguageTipShown = false;
  startupLanguageTipReadyAt = now() + delay;
  startupLanguageTipAttempts = 0;
  startupLanguageTipEnglishPending = false;
  startupLanguageTipEnglishReadyAt = -1;
}

function maybeShowStartupLanguageTip(force = false) {
  if (startupLanguageTipShown) {
    return false;
  }
  if (startupLanguageTipEnglishPending) {
    return false;
  }
  if (!force && now() < startupLanguageTipReadyAt) {
    return false;
  }
  if (!force && !hasConnectedHumanController()) {
    return false;
  }
  startupLanguageTipAttempts += 1;
  emitChatWithColor(START_LANGUAGE_TIP_ZH);
  startupLanguageTipEnglishPending = true;
  startupLanguageTipEnglishReadyAt = now() + 1.0;
  return true;
}

function maybeShowStartupLanguageTipEnglish() {
  if (!startupLanguageTipEnglishPending || now() < startupLanguageTipEnglishReadyAt) {
    return false;
  }
  startupLanguageTipEnglishPending = false;
  emitChatWithColor(`EN: ${START_LANGUAGE_TIP_EN}`);
  if (startupLanguageTipAttempts >= STARTUP_LANGUAGE_TIP_ATTEMPT_LIMIT) {
    startupLanguageTipShown = true;
  } else {
    startupLanguageTipReadyAt = now() + STARTUP_PROMPT_REPEAT_DELAY_SECONDS;
  }
  return true;
}

function resetStartupDifficultyTip(delay = START_DIFFICULTY_TIP_DELAY_SECONDS, force = false) {
  if (startupDifficultyTipShown && !force) {
    return;
  }
  startupDifficultyTipShown = false;
  startupDifficultyTipReadyAt = now() + delay;
  startupDifficultyTipEnglishPending = false;
  startupDifficultyTipEnglishReadyAt = -1;
}

function maybeShowStartupDifficultyTip(force = false) {
  if (startupDifficultyTipShown) {
    return false;
  }
  if (!force && now() < startupDifficultyTipReadyAt) {
    return false;
  }
  if (!force && !hasConnectedHumanController()) {
    return false;
  }
  startupDifficultyTipShown = true;
  startupDifficultyTipEnglishPending = false;
  startupDifficultyTipEnglishReadyAt = -1;
  announceKillDelayReminder();
  resetKillDelayReminder();
  return true;
}

function maybeShowStartupDifficultyTipEnglish(force = false) {
  if (!startupDifficultyTipEnglishPending) {
    return false;
  }
  if (!force && now() < startupDifficultyTipEnglishReadyAt) {
    return false;
  }
  if (!force && !hasConnectedHumanController()) {
    return false;
  }
  startupDifficultyTipEnglishPending = false;
  emitChatWithColor(`EN: ${START_DIFFICULTY_TIP_EN}`);
  return true;
}

function resetStartupRemindTip(delay = START_REMIND_TIP_DELAY_SECONDS, force = false) {
  if (startupRemindTipShown && !force) {
    return;
  }
  startupRemindTipShown = false;
  startupRemindTipReadyAt = now() + delay;
}

function maybeShowStartupRemindTip(force = false) {
  if (startupRemindTipShown) {
    return false;
  }
  if (!force && now() < startupRemindTipReadyAt) {
    return false;
  }
  if (!force && !hasConnectedHumanController()) {
    return false;
  }
  startupRemindTipShown = true;
  chatForcedBilingual(START_REMIND_TIP_CN, START_REMIND_TIP_EN);
  return true;
}

function showCfgBackupGateWarning(force = false) {
  if (!force && !hasConnectedHumanController()) {
    return;
  }
  if (!force && now() - lastCfgBackupGateWarningAt < 6) {
    return;
  }
  lastCfgBackupGateWarningAt = now();
  if (cfgBackupOkConfirmed() && !force) {
    chatLocalizedRed(
      "若未绑键，请在聊天框输入 OK，或在控制台输入 say OK 绑键；这可能会导致键位冲突，因此请先备份自己的 cfg。",
      "If keys are not bound, type OK in chat or say OK in console. This may cause key conflicts, so back up your cfg first.",
    );
    return;
  }
  chatLocalizedRed("重要：首次进入不会自动修改你的CS2 cfg/按键配置。", "IMPORTANT: first launch will not auto-modify your CS2 cfg / key config.");
  chatLocalizedRed("cfg常见位置：Steam\\userdata\\<你的SteamID>\\730\\local\\cfg\\ 和 Steam\\userdata\\<你的SteamID>\\730\\remote\\cs2_user_keys.vcfg", "Common cfg paths: Steam\\userdata\\<your SteamID>\\730\\local\\cfg\\ and Steam\\userdata\\<your SteamID>\\730\\remote\\cs2_user_keys.vcfg");
  chatLocalizedRed("若未绑键，请在聊天框输入 OK，或在控制台输入 say OK 绑键；这可能会导致键位冲突，因此请先备份自己的 cfg。", "Bind note: type OK in chat, or type say OK in console, to install recommended keys. This may cause key conflicts, so back up your cfg first.");
  chatLocalizedRed("手动 bind 必须使用双引号，不要使用单引号。", "Manual bind note: use double quotes, not single quotes.");
  chatLocalizedRed("地图提供恢复指令 recover_cfg，但只能恢复常用默认训练按键；复杂自定义cfg无法完整恢复。", "recover_cfg restores only common defaults; complex custom cfgs cannot be fully recovered.");
}

function showConsoleBindInstallNotice() {
  chatLocalized("聊天框输入 OK，或控制台输入 say OK，以安装推荐训练按键。", "Type OK in chat, or type say OK in console, to install the recommended training binds.");
  chatLocalized("Workshop 版中控制台直接 OK 可能被阻止，因为地图 cfg alias 不可靠。", "Direct console OK may be blocked in Workshop builds because map cfg aliases are not reliable there.");
  chatLocalized("使用 recover_cfg 可恢复常用默认按键。", "Use recover_cfg to restore common defaults.");
}

function installRecommendedBindsDirect(player, reason = "OK") {
  const target = player && !player.IsBot() ? player : findHuman();
  if (!target || target.IsBot()) {
    chat("Bind install failed: no human player controller was found.");
    return false;
  }
  if (!clientCommandsForPlayer(target, CLIENT_BIND_COMMANDS)) {
    chat("Bind install failed: CS2 refused the client command batch.");
    return false;
  }
  clientCommandForPlayer(target, "host_writeconfig");
  chatLocalized(
    `训练按键已由 ${reason} 安装：对准蓝色球体按 E 开始训练，M 放置 bot，Y 群录制，MOUSE4/MOUSE5 录路线。`,
    `Training binds installed by ${reason}. Press E on a blue sphere, M to place bot, Y for group recording, MOUSE4/MOUSE5 for route recording.`,
  );
  chatLocalized("输入 recover_cfg 可恢复常用默认按键。", "Type recover_cfg to restore common defaults.");
  echoToPlayerConsole(target, "[autopeek_training] Training binds installed. Type recover_cfg to restore common defaults.");
  return true;
}

function confirmCfgBackupGate(player) {
  ensureStoreShape();
  cfgBackupOkConfirmedRuntime = true;
  if (canPersistSettingsSafely()) {
    store.settings.cfgBackupOkConfirmed = true;
    store.settings.cfgBackupWarningShown = true;
    saveStore();
  } else {
    chatLocalizedRed(
      "注意：当前地图存档不可安全写入，本次OK只对当前会话生效，不会覆盖本地记录。",
      "Notice: save data is not safe to write, so OK applies only to this session and local records are not overwritten.",
    );
  }
  showConsoleBindInstallNotice();
  return;
}

function scheduleThink(delay = THINK_INTERVAL) {
  Instance.SetNextThink(now() + delay);
}

function resetGroupSelectorInputGate(delay = GROUP_SELECTOR_INPUT_ARM_DELAY) {
  groupSelectorUseHeld = true;
  groupSelectorNeedsRelease = true;
  groupSelectorReadyAt = now() + delay;
}

function q(value, digits = 3) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function randomReplayStartDelaySeconds() {
  return Math.floor(Math.random() * REPLAY_RANDOM_START_DELAY_MAX_SECONDS * 1000) / 1000;
}

function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function scale(v, amount) {
  return { x: v.x * amount, y: v.y * amount, z: v.z * amount };
}

function len2D(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function len3D(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

function norm2D(v) {
  const length = len2D(v);
  if (length <= 0.001) {
    return { x: 1, y: 0, z: 0 };
  }
  return { x: v.x / length, y: v.y / length, z: 0 };
}

function norm3D(v) {
  const length = len3D(v);
  if (length <= 0.001) {
    return { x: 1, y: 0, z: 0 };
  }
  return { x: v.x / length, y: v.y / length, z: v.z / length };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function normalizeYaw(yaw) {
  let value = yaw;
  while (value > 180) value -= 360;
  while (value < -180) value += 360;
  return value;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpYaw(a, b, t) {
  return normalizeYaw(a + normalizeYaw(b - a) * t);
}

function yawFromTo(from, to) {
  const delta = sub(to, from);
  return Math.atan2(delta.y, delta.x) * 180 / Math.PI;
}

function anglesFromTo(from, to) {
  const delta = sub(to, from);
  const flat = Math.max(0.001, Math.sqrt(delta.x * delta.x + delta.y * delta.y));
  return {
    pitch: -Math.atan2(delta.z, flat) * 180 / Math.PI,
    yaw: Math.atan2(delta.y, delta.x) * 180 / Math.PI,
    roll: 0,
  };
}

function yawSinCos(yawDegrees) {
  const radians = yawDegrees * Math.PI / 180;
  return { sin: Math.sin(radians), cos: Math.cos(radians) };
}

function getForward(angles) {
  const pitch = angles.pitch * Math.PI / 180;
  const yaw = angles.yaw * Math.PI / 180;
  const h = Math.cos(pitch);
  return {
    x: Math.cos(yaw) * h,
    y: Math.sin(yaw) * h,
    z: -Math.sin(pitch),
  };
}

function viewAngleToPoint(pawn, point) {
  if (!pawn || !point) {
    return 180;
  }
  const eye = pawn.GetEyePosition();
  const toPoint = norm3D(sub(point, eye));
  const forward = norm3D(getForward(pawn.GetEyeAngles()));
  return Math.acos(clamp(dot(forward, toPoint), -1, 1)) * 180 / Math.PI;
}

function botViewAngleToHuman(botPawn, humanPawn, target = "head") {
  if (!botPawn || !humanPawn) {
    return 180;
  }
  return viewAngleToPoint(botPawn, humanAimPoint(humanPawn, target));
}

function replayHeadlockAllowed(botSlot, botPawn, humanPawn, target = "head") {
  return botViewAngleToHuman(botPawn, humanPawn, target) <= REPLAY_HEADLOCK_MAX_ANGLE_DEGREES;
}

function vecArray(v, digits = 3) {
  return [q(v.x, digits), q(v.y, digits), q(v.z, digits)];
}

function raisedPosition(position, units) {
  return { x: position.x, y: position.y, z: position.z + units };
}

function runtimeTeleportPosition(position) {
  return raisedPosition(position, TELEPORT_RUNTIME_RAISE);
}

function safeHorizontalTeleportPosition(position, ignoreEntity) {
  let current = { x: position.x, y: position.y, z: position.z };
  for (let iteration = 0; iteration < TELEPORT_SAFE_ITERATIONS; iteration += 1) {
    let push = { x: 0, y: 0, z: 0 };
    for (const height of TELEPORT_SAFE_HEIGHTS) {
      const start = add(current, { x: 0, y: 0, z: height });
      for (const direction of TELEPORT_SAFE_DIRECTIONS) {
        const end = add(start, scale(direction, TELEPORT_SAFE_RADIUS));
        const trace = Instance.TraceLine({
          start,
          end,
          ignoreEntity,
          ignorePlayers: true,
          traceHitboxes: false,
        });
        if (!trace.didHit) {
          continue;
        }

        const fraction = typeof trace.fraction === "number" && isFinite(trace.fraction) ? trace.fraction : 0;
        const distance = TELEPORT_SAFE_RADIUS * clamp(fraction, 0, 1);
        const amount = Math.max(0, TELEPORT_SAFE_RADIUS - distance + TELEPORT_SAFE_EXTRA);
        push.x -= direction.x * amount;
        push.y -= direction.y * amount;
      }
    }

    push = scale(push, 1 / TELEPORT_SAFE_HEIGHTS.length);
    const length = len2D(push);
    if (length < 0.1) {
      break;
    }

    const step = length > TELEPORT_SAFE_MAX_STEP
      ? scale(norm2D(push), TELEPORT_SAFE_MAX_STEP)
      : push;
    current = add(current, { x: step.x, y: step.y, z: 0 });
  }
  return current;
}

function safeRuntimeTeleportPosition(position, ignoreEntity) {
  const target = worldPositionIsUsable(position) ? vectorOrNull(position) : ctHomePosition();
  return safeHorizontalTeleportPosition(runtimeTeleportPosition(target), ignoreEntity);
}

function settleTeleportPosition(position) {
  const target = worldPositionIsUsable(position) ? vectorOrNull(position) : ctHomePosition();
  return raisedPosition(target, TELEPORT_RECORD_SETTLE_RAISE);
}

function arrVec(a) {
  return { x: a[0], y: a[1], z: a[2] };
}

function finiteNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function vectorOrNull(value) {
  if (!value) {
    return null;
  }
  if (Array.isArray(value)) {
    if (value.length < 3) {
      return null;
    }
    return { x: value[0], y: value[1], z: value[2] };
  }
  return { x: value.x, y: value.y, z: value.z };
}

function ctHomePosition() {
  return arrVec(DEFAULT_PLAYER_SPAWN.position);
}

function invalidWorldPositionReason(position) {
  const p = vectorOrNull(position);
  if (!p || !finiteNumber(p.x) || !finiteNumber(p.y) || !finiteNumber(p.z)) {
    return "nonfinite";
  }
  if (Math.abs(p.x) > WORLD_MAX_ABS_XY || Math.abs(p.y) > WORLD_MAX_ABS_XY) {
    return "xy_out_of_bounds";
  }
  if (p.z < WORLD_MIN_VALID_Z) {
    return "below_world";
  }
  if (p.z > WORLD_MAX_VALID_Z) {
    return "above_world";
  }
  return "";
}

function worldPositionIsUsable(position) {
  return invalidWorldPositionReason(position) === "";
}

function routeLocalPositionIsUsable(position) {
  const p = vectorOrNull(position);
  return !!(p
    && finiteNumber(p.x)
    && finiteNumber(p.y)
    && finiteNumber(p.z)
    && Math.abs(p.x) <= ROUTE_LOCAL_MAX_ABS
    && Math.abs(p.y) <= ROUTE_LOCAL_MAX_ABS
    && Math.abs(p.z) <= ROUTE_LOCAL_MAX_ABS);
}

function arrAngle(a) {
  return { pitch: a[0] || 0, yaw: a[1] || 0, roll: 0 };
}

function yawOnlyAngles(angles) {
  return { pitch: 0, yaw: angles && angles.yaw ? angles.yaw : 0, roll: 0 };
}

function yawOnlyArrayAngles(a) {
  return { pitch: 0, yaw: a && a.length > 1 ? (a[1] || 0) : 0, roll: 0 };
}

function toLocal2D(anchor, world) {
  const { sin, cos } = yawSinCos(anchor.yaw);
  const dx = world.x - anchor.position[0];
  const dy = world.y - anchor.position[1];
  return {
    x: cos * dx + sin * dy,
    y: -sin * dx + cos * dy,
    z: world.z - anchor.position[2],
  };
}

function fromLocal2D(anchor, local) {
  const { sin, cos } = yawSinCos(anchor.yaw);
  return {
    x: anchor.position[0] + cos * local.x - sin * local.y,
    y: anchor.position[1] + sin * local.x + cos * local.y,
    z: anchor.position[2] + local.z,
  };
}

function velocityToLocal(anchor, velocity) {
  const { sin, cos } = yawSinCos(anchor.yaw);
  return {
    x: cos * velocity.x + sin * velocity.y,
    y: -sin * velocity.x + cos * velocity.y,
    z: velocity.z,
  };
}

function velocityFromLocal(anchor, velocity) {
  const { sin, cos } = yawSinCos(anchor.yaw);
  return {
    x: cos * velocity.x - sin * velocity.y,
    y: sin * velocity.x + cos * velocity.y,
    z: velocity.z,
  };
}

function controllerAtSlot(slot) {
  if (slot < 0) {
    return undefined;
  }
  try {
    return Instance.GetPlayerController(slot);
  } catch {
    return undefined;
  }
}

function pawnOf(controller) {
  if (!controller || !controller.IsConnected()) {
    return undefined;
  }
  const pawn = controller.GetPlayerPawn();
  if (!pawn || !pawn.IsValid() || !pawn.IsAlive()) {
    return undefined;
  }
  return pawn;
}

function callFirstMethod(target, methodNames, args = []) {
  if (!target) {
    return false;
  }
  for (const method of methodNames) {
    if (typeof target[method] !== "function") {
      continue;
    }
    try {
      target[method](...args);
      return true;
    } catch {
    }
  }
  return false;
}

function callFirstGetter(target, methodNames, args = []) {
  if (!target) {
    return undefined;
  }
  for (const method of methodNames) {
    if (typeof target[method] !== "function") {
      continue;
    }
    try {
      return target[method](...args);
    } catch {
    }
  }
  return undefined;
}

function controllerFromEventEntity(entity) {
  if (!entity) {
    return undefined;
  }
  try {
    if (entity.GetPlayerController) {
      return entity.GetPlayerController();
    }
  } catch {
    // Fall through to controller-like handling.
  }
  try {
    if (entity.GetPlayerSlot && entity.IsConnected) {
      return entity;
    }
  } catch {
    // Ignore malformed event payloads.
  }
  return undefined;
}

function findController(predicate) {
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && controller.IsConnected() && predicate(controller)) {
      return controller;
    }
  }
  for (let slot = 0; slot < MAX_SLOTS; slot += 1) {
    const controller = controllerAtSlot(slot);
    if (controller && controller.IsConnected() && predicate(controller)) {
      return controller;
    }
  }
  return undefined;
}

function findHumanController() {
  const cached = controllerAtSlot(lastHumanSlot);
  if (cached && cached.IsConnected() && !cached.IsBot()) {
    return cached;
  }

  const controller = findController((candidate) => !candidate.IsBot());
  if (controller) {
    lastHumanSlot = controller.GetPlayerSlot();
  }
  return controller;
}

function findHuman() {
  const cached = findHumanController();
  if (pawnOf(cached)) {
    return cached;
  }
  const controller = findController((candidate) => !candidate.IsBot() && !!pawnOf(candidate));
  if (controller) {
    lastHumanSlot = controller.GetPlayerSlot();
    return controller;
  }
  return cached;
}

function findBot() {
  const preferredTeam = desiredOpponentBotTeam();
  const selected = controllerAtSlot(selectedBotSlot);
  if (pawnOf(selected) && selected.IsBot() && (!playableTeam(preferredTeam) || teamOfController(selected) === preferredTeam)) {
    lastBotSlot = selectedBotSlot;
    return selected;
  }
  const cached = controllerAtSlot(lastBotSlot);
  if (pawnOf(cached) && cached.IsBot() && (!playableTeam(preferredTeam) || teamOfController(cached) === preferredTeam)) {
    return cached;
  }
  if (playableTeam(preferredTeam)) {
    const opponentBot = findBotOnTeam(preferredTeam);
    if (opponentBot) {
      lastBotSlot = opponentBot.GetPlayerSlot();
      selectedBotSlot = lastBotSlot;
      return opponentBot;
    }
    return undefined;
  }
  const controller = findController((candidate) => candidate.IsBot() && !!pawnOf(candidate));
  if (controller) {
    lastBotSlot = controller.GetPlayerSlot();
  }
  return controller;
}

function playableTeam(team) {
  return team === TEAM_T || team === TEAM_CT;
}

function opponentTeam(team) {
  if (team === TEAM_T) {
    return TEAM_CT;
  }
  if (team === TEAM_CT) {
    return TEAM_T;
  }
  return 0;
}

function teamName(team) {
  if (team === TEAM_T) {
    return "T";
  }
  if (team === TEAM_CT) {
    return "CT";
  }
  return "未知";
}

function teamOfController(controller) {
  if (!controller || !controller.IsConnected()) {
    return 0;
  }
  try {
    const team = controller.GetTeamNumber();
    if (playableTeam(team)) {
      return team;
    }
  } catch {
  }
  const pawn = pawnOf(controller);
  return pawn ? pawn.GetTeamNumber() : 0;
}

function desiredOpponentBotTeam() {
  const human = findHuman();
  if (!human) {
    return 0;
  }
  return opponentTeam(teamOfController(human));
}

function countBotsOnTeam(team) {
  return botsOnTeam(team).length;
}

function botsOnTeam(team) {
  const bots = [];
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && controller.IsConnected() && controller.IsBot() && teamOfController(controller) === team) {
      bots.push(controller);
    }
  }
  return bots;
}

function countBots() {
  let count = 0;
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && controller.IsConnected() && controller.IsBot()) {
      count += 1;
    }
  }
  return count;
}

function botJoinTeamValue(team) {
  if (team === TEAM_CT) {
    return "CT";
  }
  if (team === TEAM_T) {
    return "T";
  }
  return "any";
}

function reserveBotQuota(team, extra = 1) {
  server(`bot_join_team ${botJoinTeamValue(team)}`);
  server(`bot_quota ${Math.min(10, Math.max(1, countBots() + extra))}`);
}

function kickBot(controller) {
  if (!controller || !controller.IsConnected() || !controller.IsBot()) {
    return;
  }
  try {
    server(`bot_kick "${sanitizeChat(controller.GetPlayerName())}"`);
  } catch {
  }
}

function pruneExtraBots(keepSlot) {
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (!controller || !controller.IsConnected() || !controller.IsBot()) {
      continue;
    }
    if (controller.GetPlayerSlot() !== keepSlot) {
      kickBot(controller);
    }
  }
  server("bot_quota 1");
}

function botKeepPriority(controller) {
  if (!controller || !controller.IsConnected() || !controller.IsBot()) {
    return -1;
  }
  const slot = controller.GetPlayerSlot();
  if (playback && playback.botSlot === slot) {
    return 100;
  }
  if (scriptDrivenBotSlot === slot) {
    return 95;
  }
  if (selectedBotSlot === slot) {
    return 90;
  }
  if (lastBotSlot === slot) {
    return 80;
  }
  return pawnOf(controller) ? 10 : 0;
}

function chooseEnemyBotToKeep(bots) {
  let best = null;
  let bestScore = -1;
  for (const bot of bots) {
    const score = botKeepPriority(bot);
    if (!best || score > bestScore) {
      best = bot;
      bestScore = score;
    }
  }
  return best;
}

function enforceSingleOpponentBot(enemyTeam) {
  const enemyBots = botsOnTeam(enemyTeam);
  if (enemyBots.length === 0) {
    return null;
  }

  const keep = chooseEnemyBotToKeep(enemyBots);
  if (!keep) {
    return null;
  }

  const keepSlot = keep.GetPlayerSlot();
  lastBotSlot = keepSlot;
  selectedBotSlot = keepSlot;
  const botCountBeforePrune = countBots();
  const extraBots = Math.max(0, botCountBeforePrune - 1);
  if (extraBots > 0) {
    pruneExtraBots(keepSlot);
    chat(`check_bot：只保留1个敌方${teamName(enemyTeam)} bot，已清理${extraBots}个其它bot`);
  } else {
    server("bot_quota 1");
  }
  return keep;
}

function ensureOpponentBot(force = false) {
  const current = now();
  if (!force && current < nextOpponentBotCheckAt) {
    return;
  }
  nextOpponentBotCheckAt = current + OPPONENT_BOT_CHECK_INTERVAL;
  if (pendingOpponentBot || pendingBotSpawn || pendingBotConfirm || pendingInitialBotKickAt >= 0) {
    return;
  }

  const human = findHuman();
  if (!human) {
    return;
  }
  const enemyTeam = opponentTeam(teamOfController(human));
  if (!playableTeam(enemyTeam)) {
    return;
  }

  if (opponentBotGuardMode) {
    if (enforceSingleOpponentBot(enemyTeam)) {
      return;
    }
  } else {
    const enemyBot = findBotOnTeam(enemyTeam);
    if (enemyBot || countBotsOnTeam(enemyTeam) > 0) {
      if (enemyBot) {
        lastBotSlot = enemyBot.GetPlayerSlot();
        selectedBotSlot = lastBotSlot;
      }
      return;
    }
  }

  requestBotSpawn(enemyTeam, `检测到敌方 ${teamName(enemyTeam)} bot 不存在，正在补一个`);
}

function findBotOnTeam(team) {
  return findController((candidate) => candidate.IsBot() && teamOfController(candidate) === team && !!pawnOf(candidate));
}

function findConnectedBotOnTeam(team) {
  return findController((candidate) => candidate.IsBot() && teamOfController(candidate) === team);
}

function botAddCommand(team) {
  if (team === TEAM_T) {
    return "bot_add_t";
  }
  if (team === TEAM_CT) {
    return "bot_add_ct";
  }
  return "";
}

function mapReadyDelay(delay = 0) {
  if (mapReadyAt < 0) {
    return delay;
  }
  return Math.max(delay, mapReadyAt - now());
}

function queueBotSpawn(team, message, confirmDelay) {
  pendingBotSpawn = {
    team,
    message,
    confirmDelay,
    at: now() + mapReadyDelay(0.1),
  };
  chat(`Mirage 仍在加载，已排队添加 ${teamName(team)} bot`);
  scheduleThink(Math.max(0.1, pendingBotSpawn.at - now()));
}

function handlePendingBotSpawn() {
  if (!pendingBotSpawn || now() < pendingBotSpawn.at) {
    return;
  }

  const request = pendingBotSpawn;
  pendingBotSpawn = null;
  requestBotSpawn(request.team, request.message, request.confirmDelay);
}

function requestBotSpawn(team, message, delay = 0.75) {
  const command = botAddCommand(team);
  if (!command) {
    return;
  }
  if (mapReadyDelay() > 0.1) {
    queueBotSpawn(team, message, delay);
    return;
  }
  setupServer();
  reserveBotQuota(team, 1);
  server(command);
  pendingBotConfirm = {
    team,
    command,
    at: now() + delay,
    attempts: 0,
  };
  chat(message);
  scheduleThink(delay);
}

function handlePendingBotConfirm() {
  if (!pendingBotConfirm || now() < pendingBotConfirm.at) {
    return;
  }

  const bot = findBotOnTeam(pendingBotConfirm.team);
  if (bot) {
    lastBotSlot = bot.GetPlayerSlot();
    if (selectedBotSlot < 0) {
      selectedBotSlot = lastBotSlot;
    }
    server(`bot_quota ${Math.min(10, Math.max(1, countBots()))}`);
    chat(`已确认 ${teamName(pendingBotConfirm.team)} bot 存活`);
    pendingBotConfirm = null;
    return;
  }

  const connectedBot = findConnectedBotOnTeam(pendingBotConfirm.team);
  if (connectedBot) {
    server("mp_respawn_on_death_t 1");
    server("mp_respawn_on_death_ct 1");
    reserveBotQuota(pendingBotConfirm.team, 1);
  }

  pendingBotConfirm.attempts += 1;
  if (pendingBotConfirm.attempts >= 5) {
    chat(`未能确认 ${teamName(pendingBotConfirm.team)} bot 生成；请再按 O/P 手动添加`);
    pendingBotConfirm = null;
    return;
  }

  setupServer();
  reserveBotQuota(pendingBotConfirm.team, 1);
  server(pendingBotConfirm.command || botAddCommand(pendingBotConfirm.team));
  pendingBotConfirm.at = now() + 0.75;
  chat(`正在重试添加 ${teamName(pendingBotConfirm.team)} bot`);
  scheduleThink(0.75);
}

function requestOpponentBotForTeam(humanTeam, humanSlot, delay = 0.6) {
  if (!playableTeam(humanTeam)) {
    return;
  }
  const botTeam = opponentTeam(humanTeam);
  if (!playableTeam(botTeam) || countBotsOnTeam(botTeam) > 0) {
    return;
  }
  pendingOpponentBot = {
    team: botTeam,
    humanSlot,
    at: now() + delay,
  };
  scheduleThink(delay);
}

function requestOpponentBotForController(controller, delay = 0.6) {
  if (!controller || controller.IsBot()) {
    return;
  }
  lastHumanSlot = controller.GetPlayerSlot();
  requestOpponentBotForTeam(teamOfController(controller), lastHumanSlot, delay);
}

function requestOpponentBotForExistingHuman(delay = 0.6) {
  const human = findHuman();
  if (human) {
    requestOpponentBotForController(human, delay);
  }
}

function handlePendingOpponentBot() {
  if (!pendingOpponentBot || now() < pendingOpponentBot.at) {
    return;
  }
  if (pendingInitialBotKickAt >= 0) {
    pendingOpponentBot.at = pendingInitialBotKickAt + 0.3;
    scheduleThink(0.3);
    return;
  }

  const human = controllerAtSlot(pendingOpponentBot.humanSlot) || findHuman();
  if (!human || human.IsBot()) {
    pendingOpponentBot = null;
    return;
  }

  const currentHumanTeam = teamOfController(human);
  if (playableTeam(currentHumanTeam)) {
    pendingOpponentBot.team = opponentTeam(currentHumanTeam);
  }

  const botTeam = pendingOpponentBot.team;
  pendingOpponentBot = null;
  if (!playableTeam(botTeam) || countBotsOnTeam(botTeam) > 0) {
    return;
  }

  requestBotSpawn(botTeam, `已根据你的阵营在对面请求加入 ${teamName(botTeam)} bot`);
}

function playerSlotForClientCommand(player) {
  if (player && !player.IsBot()) {
    return player.GetPlayerSlot();
  }
  const human = findHuman();
  return human ? human.GetPlayerSlot() : -1;
}

function clientCommandForPlayer(player, command) {
  const slot = playerSlotForClientCommand(player);
  if (slot < 0) {
    return false;
  }
  Instance.ClientCommand(slot, command);
  return true;
}

function clientCommandsForPlayer(player, commands) {
  const slot = playerSlotForClientCommand(player);
  if (slot < 0) {
    return false;
  }
  for (const command of commands) {
    Instance.ClientCommand(slot, command);
  }
  return true;
}

function echoToPlayerConsole(player, text) {
  return clientCommandForPlayer(player, `echo "${sanitizeChat(text)}"`);
}

function echoToAllHumanConsoles(text) {
  let sent = false;
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && controller.IsConnected && controller.IsConnected() && !controller.IsBot()) {
      sent = echoToPlayerConsole(controller, text) || sent;
    }
  }
  if (!sent) {
    echoToPlayerConsole(findHuman(), text);
  }
}

function showManualBindCommands(player) {
  const slot = playerSlotForClientCommand(player);
  if (slot < 0) {
    chat("无法输出绑键：没有找到玩家。");
    return false;
  }
  chatLocalized(
    "推荐绑键已输出到控制台。Workshop版请在聊天框输入 OK，或在控制台输入 say OK 自动安装。",
    "Recommended bind commands were printed to console. For Workshop, type OK in chat or say OK in console to install.",
  );
  chatLocalized("手动 bind 必须使用双引号，不要使用单引号。", "Manual binds need double quotes, not single quotes.");
  for (const line of MANUAL_BIND_CONSOLE_LINES) {
    Instance.ClientCommand(slot, `echo "${sanitizeChat(line)}"`);
  }
  return true;
}

function installClientBinds(player) {
  if (!player || player.IsBot()) {
    return false;
  }
  if (!cfgBackupOkConfirmed()) {
    return false;
  }
  return installRecommendedBindsDirect(player, "auto");
}

function installClientBindsForAllHumans() {
  if (!cfgBackupOkConfirmed()) {
    return false;
  }
  for (const controller of Instance.GetAllPlayerControllers()) {
    installClientBinds(controller);
  }
  return true;
}

function assistHumanSpawn(controller, reason = "") {
  if (!controller || controller.IsBot() || !controller.IsConnected()) {
    return false;
  }

  const slot = controller.GetPlayerSlot();
  lastHumanSlot = slot;
  const pawn = pawnOf(controller);
  if (pawn) {
    nextHumanSpawnAssistAt = -1;
    return false;
  }

  const currentTeam = teamOfController(controller);
  const targetTeam = playableTeam(currentTeam) ? currentTeam : TEAM_T;
  try {
    controller.JoinTeam(targetTeam);
  } catch {
  }
  try {
    Instance.ClientCommand(slot, `jointeam ${targetTeam}`);
  } catch {
  }

  const current = now();
  if (current >= lastHumanSpawnAssistMessageAt + 8) {
    lastHumanSpawnAssistMessageAt = current;
    Instance.Msg(`[${CHAT_PREFIX}] spawn assist slot=${slot} targetTeam=${teamName(targetTeam)} reason=${reason}`);
    chat(`已自动加入 ${teamName(targetTeam)}，如果仍在旁观请等待一秒或重新连接`);
  }
  nextHumanSpawnAssistAt = current + 0.5;
  return true;
}

function assistAllHumansSpawn() {
  const current = now();
  if (nextHumanSpawnAssistAt >= 0 && current < nextHumanSpawnAssistAt) {
    scheduleThink(Math.max(0.05, nextHumanSpawnAssistAt - current));
    return true;
  }

  nextHumanSpawnAssistAt = current + 1.0;
  let pending = false;
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (assistHumanSpawn(controller, "tick")) {
      pending = true;
    }
  }

  if (!pending) {
    const human = findHumanController();
    if (human && !pawnOf(human)) {
      pending = assistHumanSpawn(human, "cached");
    }
  }

  if (pending) {
    scheduleThink(0.5);
    return true;
  }
  nextHumanSpawnAssistAt = -1;
  return false;
}

function teleportHumanToDefaultSpawn(controller, reason = "") {
  if (!DEFAULT_PLAYER_SPAWN_TELEPORT_ENABLED && reason !== "falling") {
    return false;
  }
  if (!controller || controller.IsBot()) {
    return false;
  }
  const pawn = pawnOf(controller);
  if (!pawn) {
    return false;
  }
  pawn.Teleport({
    position: safeRuntimeTeleportPosition(arrVec(DEFAULT_PLAYER_SPAWN.position), pawn),
    angles: yawOnlyArrayAngles(DEFAULT_PLAYER_SPAWN.angles),
    velocity: { x: 0, y: 0, z: 0 },
    angularVelocity: { x: 0, y: 0, z: 0 },
  });
  Instance.Msg(`[${CHAT_PREFIX}] rescued human slot=${controller.GetPlayerSlot()} to default spawn reason=${reason}`);
  return true;
}

function abortUnsafeHumanActivity(controller, origin, reason) {
  const slot = controller && controller.GetPlayerSlot ? controller.GetPlayerSlot() : -1;
  const p = vectorOrNull(origin);
  const zText = p && finiteNumber(p.z) ? p.z.toFixed(1) : "nan";
  Instance.Msg(`[${CHAT_PREFIX}] unsafe human position slot=${slot} z=${zText} reason=${reason}; aborting active training state and returning to CT spawn`);
  if (recording) {
    Recorder.stop(true);
  }
  if (playback || pendingReplay || pendingGroupReplay || pendingFinishKill || activePlaybackGroupId >= 0) {
    Replay.stop(false, true);
    GroupPlayback.stop(false);
    clearPendingFinishKill();
    stopping = null;
  }
  Autopeek.stop(false);
  return true;
}

function shouldTeleportHumanToDefaultSpawn() {
  return activePlaybackGroupId < 0 && !recording && !pendingReplay && !pendingGroupReplay;
}

function requestDefaultHumanSpawn(controller, reason = "pending", delay = 0.5) {
  if (!controller || controller.IsBot() || !shouldTeleportHumanToDefaultSpawn()) {
    return false;
  }
  const readyAt = mapReadyAt >= 0 ? mapReadyAt + 0.25 : now() + delay;
  pendingDefaultHumanSpawn = {
    slot: controller.GetPlayerSlot(),
    at: Math.max(now() + delay, readyAt),
    reason,
  };
  scheduleThink(Math.max(0.05, pendingDefaultHumanSpawn.at - now()));
  return true;
}

function handlePendingDefaultHumanSpawn() {
  if (!pendingDefaultHumanSpawn) {
    return false;
  }
  if (!shouldTeleportHumanToDefaultSpawn()) {
    pendingDefaultHumanSpawn = null;
    return false;
  }
  if (now() < pendingDefaultHumanSpawn.at) {
    return true;
  }

  const request = pendingDefaultHumanSpawn;
  const controller = controllerAtSlot(request.slot) || findHumanController();
  if (!controller || controller.IsBot() || !controller.IsConnected()) {
    pendingDefaultHumanSpawn = null;
    return false;
  }
  if (!pawnOf(controller)) {
    pendingDefaultHumanSpawn.at = now() + 0.25;
    return true;
  }

  pendingDefaultHumanSpawn = null;
  return teleportHumanToDefaultSpawn(controller, request.reason);
}

function rescueFallingHumans() {
  let rescued = false;
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (!controller || controller.IsBot() || !controller.IsConnected()) {
      continue;
    }
    const pawn = pawnOf(controller);
    if (!pawn) {
      continue;
    }
    const origin = pawn.GetAbsOrigin();
    if (origin && !worldPositionIsUsable(origin)) {
      const reason = invalidWorldPositionReason(origin) || "invalid_world_position";
      abortUnsafeHumanActivity(controller, origin, reason);
      rescued = teleportHumanToDefaultSpawn(controller, "falling") || rescued;
    }
  }
  return rescued;
}

function stopPawn(pawn) {
  if (!pawn || !pawn.IsValid()) {
    return;
  }
  const velocity = pawn.GetAbsVelocity() || { x: 0, y: 0, z: 0 };
  pawn.Teleport({ velocity: { x: 0, y: 0, z: velocity.z || 0 } });
}

function faceBotToHuman(botPawn, humanPawn) {
  const yaw = yawFromTo(botPawn.GetEyePosition(), humanPawn.GetEyePosition());
  botPawn.Teleport({ angles: { pitch: 0, yaw, roll: 0 }, angularVelocity: { x: 0, y: 0, z: 0 } });
}

function humanHeadPosition(humanPawn) {
  return humanPawn.GetEyePosition();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function predictedHumanPoint(humanPawn, point) {
  const velocity = humanPawn.GetAbsVelocity ? (humanPawn.GetAbsVelocity() || { x: 0, y: 0, z: 0 }) : { x: 0, y: 0, z: 0 };
  const lead = scale(velocity, SHOOTING.predictionLeadSeconds);
  const horizontal = len2D(lead);
  if (horizontal > SHOOTING.predictionMaxHorizontal) {
    const factor = SHOOTING.predictionMaxHorizontal / horizontal;
    lead.x *= factor;
    lead.y *= factor;
  }
  lead.z = clamp(lead.z, -SHOOTING.predictionMaxVertical, SHOOTING.predictionMaxVertical);
  return add(point, lead);
}

function humanPredictedHeadPosition(humanPawn) {
  return predictedHumanPoint(humanPawn, humanHeadPosition(humanPawn));
}

function humanBodyPosition(humanPawn) {
  const origin = humanPawn.GetAbsOrigin();
  const head = humanPawn.GetEyePosition();
  return {
    x: head.x,
    y: head.y,
    z: origin.z + Math.max(36, (head.z - origin.z) * 0.58),
  };
}

function humanAimPoint(humanPawn, target) {
  if (target === "body") {
    return predictedHumanPoint(humanPawn, humanBodyPosition(humanPawn));
  }
  return humanPredictedHeadPosition(humanPawn);
}

function hasClearHeadLine(botPawn, humanPawn) {
  const trace = Instance.TraceLine({
    start: botPawn.GetEyePosition(),
    end: humanHeadPosition(humanPawn),
    ignoreEntity: botPawn,
    ignorePlayers: true,
    traceHitboxes: false,
  });

  return !trace.didHit || trace.fraction >= VISIBLE_FRACTION;
}

function slotOfPawn(pawn) {
  try {
    const controller = pawn && pawn.GetPlayerController ? pawn.GetPlayerController() : undefined;
    return controller ? controller.GetPlayerSlot() : -1;
  } catch {
    return -1;
  }
}

function clearHeadlockSmoothing(botSlot = -1) {
  if (botSlot < 0) {
    headlockSmoothingBySlot = {};
    return;
  }
  delete headlockSmoothingBySlot[botSlot];
}

function aimBotAtHuman(botPawn, humanPawn, target = "head", options = {}) {
  const aimAngles = anglesFromTo(botPawn.GetEyePosition(), humanAimPoint(humanPawn, target));
  const botSlot = options.botSlot !== undefined ? options.botSlot : slotOfPawn(botPawn);
  clearHeadlockSmoothing(botSlot);
  const targetAngles = yawOnlyAngles(aimAngles);
  botPawn.Teleport({
    // Pawn pitch tilts the whole model in CS2; keep the body upright and only rotate yaw.
    angles: targetAngles,
    angularVelocity: { x: 0, y: 0, z: 0 },
  });
  return true;
}

function activeWeaponOf(pawn) {
  try {
    return pawn.GetActiveWeapon ? pawn.GetActiveWeapon() : undefined;
  } catch {
    return undefined;
  }
}

function weaponBaseDamage(weapon) {
  try {
    const data = weapon && weapon.GetData ? weapon.GetData() : undefined;
    return data && data.GetDamage ? data.GetDamage() : 0;
  } catch {
    return 0;
  }
}

function applyScriptedShotDamage(botPawn, humanPawn, hitZone) {
  if (hitZone !== "head" && hitZone !== "body") {
    return 0;
  }

  const weapon = activeWeaponOf(botPawn);
  const baseDamage = weaponBaseDamage(weapon);
  const damage = hitZone === "head"
    ? Math.max(SHOOTING.headDamage, baseDamage * 4)
    : Math.max(SHOOTING.bodyDamage, baseDamage);
  const damageTypes = CSDamageTypes.BULLET | (hitZone === "head" ? CSDamageTypes.HEADSHOT : 0);
  const damageFlags = hitZone === "head" ? CSDamageFlags.IGNORE_ARMOR : CSDamageFlags.NONE;

  return humanPawn.TakeDamage({
    damage,
    damageTypes,
    damageFlags,
    attacker: botPawn,
    inflictor: weapon || botPawn,
    weapon,
  });
}

function currentShootMode() {
  const index = Math.max(0, Math.min(SHOOTING.modes.length - 1, Math.floor(shootDifficulty)));
  return SHOOTING.modes[index];
}

function finishKillEnabled() {
  return shootDifficulty > 0;
}

function finishKillLabel() {
  return finishKillEnabled() ? `kill_delay=${killDelayMs}ms` : "finish_kill=off";
}

function shootDifficultyLabel() {
  return `${shootDifficulty}:${currentShootMode().name} / ${finishKillLabel()}`;
}

function shootDifficultyOptionsText() {
  return SHOOTING.modes.map((mode, index) => {
    const finishText = index > 0 ? `kill_delay=${DIFFICULTY_KILL_DELAYS_MS[index]}ms` : "finish_kill=off";
    return `${index}=${mode.name}, ${finishText}`;
  }).join("；");
}

function announceKillDelayChanged(reason = "") {
  const reasonText = reason ? `${reason}，` : "";
  const englishReason = englishReasonText(reason);
  const cn = `${reasonText}kill_delay 已更改为 ${killDelayMs}ms`;
  const en = `${englishReason ? `${englishReason}: ` : ""}kill_delay changed to ${killDelayMs} ms`;
  chatLocalized(cn, en, "", true);
  echoToAllHumanConsoles(`[autopeek_training] ${cn}`);
  echoToAllHumanConsoles(`[autopeek_training] ${en}`);
}

function setKillDelayMs(value, options = {}) {
  const nextValue = clampKillDelayMs(value);
  killDelayMs = nextValue;
  if (options.persist === true) {
    ensureStoreShape();
    store.settings.killDelayMs = killDelayMs;
    saveStore();
  }
  if (options.verbose !== false) {
    announceKillDelayChanged(options.reason || "");
  }
  resetKillDelayReminder();
  scheduleThink();
  return killDelayMs;
}

function setShootDifficulty(value, options = {}) {
  shootDifficulty = clampShootDifficulty(value);
  clearHeadlockSmoothing();
  setKillDelayMs(killDelayForDifficulty(shootDifficulty), { verbose: false, persist: false });
  if (options.persist !== false) {
    ensureStoreShape();
    store.settings.shootDifficulty = shootDifficulty;
    store.settings.killDelayMs = killDelayMs;
    saveStore();
  }
  if (options.verbose !== false) {
    chatLocalized(
      `难度切换，当前难度：${shootDifficultyLabel()}，按6继续切换`,
      `Difficulty changed. Current difficulty: ${shootDifficultyLabel()}. Press 6 to switch again.`,
    );
    announceKillDelayChanged(`难度${shootDifficulty}`);
  }
  scheduleThink();
}

function showShootDifficultyHelp() {
  chatLocalized(`当前 kill_delay=${killDelayMs}ms。`, `Current kill_delay=${killDelayMs} ms.`);
  chatLocalized(
    "使用 delay_kill 0-10000 手动设置延迟击杀毫秒；控制台可输入 say delay_kill 300。按6仍可循环预设。",
    "Use delay_kill 0-10000 to manually set delayed-kill milliseconds; from console type say delay_kill 300. Key 6 still cycles presets.",
  );
  chatLocalized(
    "推荐延迟：0ms喜欢被育苗大拉提前枪的，50ms高手，300ms一般玩家，1000ms萌新。",
    "Recommended delay: 0 ms if you enjoy being wide-peek pre-fired, 50 ms for experts, 300 ms for average players, 1000 ms for beginners.",
  );
}

function resetKillDelayReminder(delay = KILL_DELAY_REMINDER_INTERVAL_SECONDS) {
  nextKillDelayReminderAt = now() + delay;
}

function announceKillDelayReminder() {
  const cn = `当前 kill_delay=${killDelayMs}ms；聊天框输入 delay xxx（0-10000的数字）来设置击杀延迟。推荐：0ms喜欢被育苗大拉提前枪的，50ms高手，300ms一般玩家，1000ms萌新。`;
  const en = `Current kill_delay=${killDelayMs} ms. Type delay xxx (a number from 0 to 10000) in chat to set the kill delay. Recommended: 0 ms if you enjoy being wide-peek pre-fired, 50 ms experts, 300 ms average, 1000 ms beginners.`;
  chatLocalized(cn, en, "", true);
  echoToAllHumanConsoles(`[autopeek_training] ${cn}`);
  echoToAllHumanConsoles(`[autopeek_training] ${en}`);
  pendingKillDelayReminderEnglish = "";
  killDelayReminderEnglishPending = false;
  killDelayReminderEnglishReadyAt = -1;
}

function maybeShowKillDelayReminderEnglish(force = false) {
  if (!killDelayReminderEnglishPending) {
    return false;
  }
  if (!force && now() < killDelayReminderEnglishReadyAt) {
    return false;
  }
  if (!force && !hasConnectedHumanController()) {
    return false;
  }
  killDelayReminderEnglishPending = false;
  pendingKillDelayReminderEnglish = "";
  return false;
}

function maybeShowKillDelayReminder(force = false) {
  if (nextKillDelayReminderAt < 0) {
    resetKillDelayReminder();
    return false;
  }
  if (!force && now() < nextKillDelayReminderAt) {
    return false;
  }
  if (!force && !hasConnectedHumanController()) {
    return false;
  }
  announceKillDelayReminder();
  resetKillDelayReminder();
  return true;
}

function lockBotView(botSlot, anchor, duration = Infinity) {
  if (botSlot < 0 || !anchor) {
    return;
  }
  clearHeadlockSmoothing(botSlot);
  botViewLock = {
    botSlot,
    anchor,
    until: duration === Infinity ? Infinity : now() + duration,
  };
  scheduleThink(VIEW_LOCK_INTERVAL);
}

function clearBotViewLock(botSlot = -1) {
  if (!botViewLock) {
    return;
  }
  if (botSlot < 0 || botViewLock.botSlot === botSlot) {
    botViewLock = null;
  }
}

function enforceBotViewLock() {
  if (!botViewLock) {
    return;
  }
  if (botViewLock.until !== Infinity && now() > botViewLock.until) {
    botViewLock = null;
    return;
  }
  const bot = controllerAtSlot(botViewLock.botSlot);
  const botPawn = pawnOf(bot);
  if (!botPawn) {
    botViewLock = null;
    return;
  }
  botPawn.Teleport({
    angles: anchorAngles(botViewLock.anchor),
    angularVelocity: { x: 0, y: 0, z: 0 },
  });
}

function hasLineOfSight(botPawn, humanPawn) {
  const trace = Instance.TraceLine({
    start: botPawn.GetEyePosition(),
    end: humanPawn.GetEyePosition(),
    ignoreEntity: botPawn,
    ignorePlayers: true,
    traceHitboxes: false,
  });

  return !trace.didHit || trace.fraction >= VISIBLE_FRACTION;
}

function aimTracePoint(humanPawn) {
  const start = humanPawn.GetEyePosition();
  const end = add(start, scale(getForward(humanPawn.GetEyeAngles()), 4096));
  const trace = Instance.TraceLine({
    start,
    end,
    ignoreEntity: humanPawn,
    ignorePlayers: true,
    traceHitboxes: false,
  });

  const point = trace.didHit ? trace.end : end;
  return { x: point.x, y: point.y, z: point.z + 2 };
}

function teleportPawnForSettle(pawn, position, angles) {
  const payload = {
    position: settleTeleportPosition(position),
    velocity: { x: 0, y: 0, z: 0 },
    angularVelocity: { x: 0, y: 0, z: 0 },
  };
  if (angles) {
    payload.angles = angles;
  }
  pawn.Teleport(payload);
}

function releaseBotInputs(botSlot) {
  if (botSlot < 0) {
    return;
  }
  for (const command of [
    "-forward",
    "-back",
    "-moveleft",
    "-moveright",
    "-left",
    "-right",
    "-attack",
    "-attack2",
    "-duck",
    "-jump",
    "-sprint",
    "-speed",
    "-walk",
  ]) {
    Instance.ClientCommand(botSlot, command);
  }
}

function beginScriptBotControl(botSlot) {
  if (botSlot < 0) {
    return;
  }
  scriptDrivenBotSlot = botSlot;
  server("bot_mimic 0");
  server("bot_zombie 1");
  server("bot_stop 0");
  server("bot_dont_shoot 1");
}

function beginTrajectoryReplayControl(botSlot) {
  if (botSlot < 0) {
    return;
  }
  scriptDrivenBotSlot = botSlot;
  releaseBotInputs(botSlot);
  server("bot_mimic 0");
  server("bot_zombie 1");
  server("bot_stop 1");
  server("bot_dont_shoot 1");
}

function endScriptBotControl(botSlot = -1, releaseAi = true) {
  const targetSlot = botSlot >= 0 ? botSlot : scriptDrivenBotSlot;
  releaseBotInputs(targetSlot);
  clearHeadlockSmoothing(targetSlot);
  if (scriptDrivenBotSlot >= 0 && targetSlot !== scriptDrivenBotSlot) {
    return;
  }
  scriptDrivenBotSlot = -1;
  server("bot_mimic 0");
  server("bot_zombie 0");
  server(releaseAi ? "bot_stop 0" : "bot_stop 1");
  server(releaseAi ? "bot_dont_shoot 0" : "bot_dont_shoot 1");
}

function triggerAttackPulse(botSlot, duration = STOPPING.attackPulse, returnMode = "release", options = {}) {
  server("bot_zombie 0");
  server("bot_stop 0");
  server("bot_dont_shoot 0");
  if (!options.skipClientAttack) {
    Instance.ClientCommand(botSlot, "+attack");
  }
  const releaseAt = now() + duration;
  if (!forcedAttack || forcedAttack.botSlot !== botSlot || forcedAttack.releaseAt < releaseAt) {
    forcedAttack = { botSlot, releaseAt, returnMode, ...options };
  } else if (returnMode === "trajectory") {
    forcedAttack.returnMode = returnMode;
    forcedAttack = { ...forcedAttack, ...options, releaseAt };
  }
  scheduleThink();
}

function handleForcedAttack() {
  if (!forcedAttack || now() < forcedAttack.releaseAt) {
    return;
  }
  const attack = forcedAttack;
  forcedAttack = null;
  Instance.ClientCommand(attack.botSlot, "-attack");
  if (attack.returnMode === "trajectory" && playback && playback.botSlot === attack.botSlot) {
    beginTrajectoryReplayControl(attack.botSlot);
  } else {
    endScriptBotControl(attack.botSlot, true);
  }
}

function maintainForcedAttackAim() {
  if (!forcedAttack || !forcedAttack.maintainAim || forcedAttack.humanSlot < 0) {
    return;
  }

  const bot = controllerAtSlot(forcedAttack.botSlot);
  const human = controllerAtSlot(forcedAttack.humanSlot) || findHuman();
  const botPawn = pawnOf(bot);
  const humanPawn = pawnOf(human);
  if (!botPawn || !humanPawn || !hasClearHeadLine(botPawn, humanPawn)) {
    return;
  }

  aimBotAtHuman(botPawn, humanPawn, forcedAttack.aimTarget || "head");
}

function maintainBotFireAssist() {
  if (!botFireAssist) {
    return;
  }
  if (now() > botFireAssist.until) {
    botFireAssist = null;
    return;
  }

  const bot = controllerAtSlot(botFireAssist.botSlot);
  const human = controllerAtSlot(botFireAssist.humanSlot) || findHuman();
  const botPawn = pawnOf(bot);
  const humanPawn = pawnOf(human);
  if (!botPawn || !humanPawn || !hasClearHeadLine(botPawn, humanPawn)) {
    return;
  }

  aimBotAtHuman(botPawn, humanPawn, "head");
}

function highestShootDifficultyActive() {
  return shootDifficulty >= SHOOTING.modes.length - 1;
}

function headlockShootDifficultyActive() {
  return shootDifficulty > 0;
}

function tryHeadlockBotAtHuman(botSlot, botPawn, humanPawn, target = "head") {
  if (!headlockShootDifficultyActive() || botSlot < 0 || !botPawn || !humanPawn) {
    clearHeadlockSmoothing(botSlot);
    return false;
  }
  if (!hasClearHeadLine(botPawn, humanPawn)) {
    clearHeadlockSmoothing(botSlot);
    return false;
  }
  if (!replayHeadlockAllowed(botSlot, botPawn, humanPawn, target)) {
    clearHeadlockSmoothing(botSlot);
    return false;
  }
  clearBotViewLock(botSlot);
  return aimBotAtHuman(botPawn, humanPawn, target, { botSlot });
}

function maintainFullTimeHeadlock() {
  if (!headlockShootDifficultyActive() || recording || pendingFinishKill) {
    return false;
  }

  const bot = findBot();
  const human = findHuman();
  const botPawn = pawnOf(bot);
  const humanPawn = pawnOf(human);
  if (!bot || !botPawn || !human || !humanPawn) {
    return false;
  }

  const botSlot = bot.GetPlayerSlot();
  tryHeadlockBotAtHuman(botSlot, botPawn, humanPawn, "head");
  return true;
}

function startBotFireAssistFromWeapon(weapon) {
  if (!weapon) {
    return false;
  }

  const shooter = weapon.GetOwner();
  const bot = shooter && shooter.GetPlayerController ? shooter.GetPlayerController() : undefined;
  if (!shooter || !bot || !bot.IsBot()) {
    return false;
  }

  const human = findHuman();
  const humanPawn = pawnOf(human);
  if (!humanPawn || !hasClearHeadLine(shooter, humanPawn)) {
    return false;
  }

  const botSlot = bot.GetPlayerSlot();
  clearBotViewLock(botSlot);
  botFireAssist = {
    botSlot,
    humanSlot: human.GetPlayerSlot(),
    until: now() + SHOOTING.aiFireAssistSeconds,
  };
  maintainBotFireAssist();
  scheduleThink();
  return true;
}

function tryShootAtHuman(botSlot, botPawn, humanPawn, reason = "shot", returnMode = "trajectory") {
  if (botSlot < 0 || !botPawn || !humanPawn) {
    return false;
  }
  if (!hasClearHeadLine(botPawn, humanPawn)) {
    return false;
  }
  if (!replayHeadlockAllowed(botSlot, botPawn, humanPawn, "head")) {
    return false;
  }

  clearBotViewLock(botSlot);
  releaseBotInputs(botSlot);
  const mode = currentShootMode();
  const humanController = humanPawn.GetPlayerController ? humanPawn.GetPlayerController() : findHuman();
  const humanSlot = humanController ? humanController.GetPlayerSlot() : -1;
  if (mode.aim !== "none") {
    aimBotAtHuman(botPawn, humanPawn, mode.aim);
  }
  applyScriptedShotDamage(botPawn, humanPawn, mode.scriptedHit);

  triggerAttackPulse(botSlot, mode.forceAttack ? SHOOTING.attackPulse : SHOOTING.aiWindow, returnMode, {
    humanSlot,
    aimTarget: mode.aim,
    maintainAim: mode.maintain,
    reason,
    skipClientAttack: !mode.forceAttack,
  });
  return true;
}

function tryScriptedKillHuman(botSlot, botPawn, humanPawn, reason = "finish_kill", returnMode = "release") {
  if (botSlot < 0 || !botPawn || !humanPawn) {
    return false;
  }
  if (!finishKillEnabled()) {
    return false;
  }
  if (!hasClearHeadLine(botPawn, humanPawn)) {
    return false;
  }
  if (!replayHeadlockAllowed(botSlot, botPawn, humanPawn, "head")) {
    return false;
  }

  clearBotViewLock(botSlot);
  releaseBotInputs(botSlot);
  const humanController = humanPawn.GetPlayerController ? humanPawn.GetPlayerController() : findHuman();
  const humanSlot = humanController ? humanController.GetPlayerSlot() : -1;
  aimBotAtHuman(botPawn, humanPawn, "head");
  applyScriptedShotDamage(botPawn, humanPawn, "head");
  triggerAttackPulse(botSlot, SHOOTING.attackPulse, returnMode, {
    humanSlot,
    aimTarget: "head",
    maintainAim: true,
    reason,
    skipClientAttack: false,
  });
  return true;
}

function scheduleGroupReplayAfterFinish(groupId, delaySeconds, reason) {
  if (groupId >= 0 && activePlaybackGroupId === groupId) {
    GroupPlayback.scheduleNext(delaySeconds, reason, false);
    return true;
  }
  return false;
}

function clearPendingFinishKill() {
  pendingFinishKill = null;
}

function maintainPendingFinishKillAim() {
  if (!pendingFinishKill || !headlockShootDifficultyActive()) {
    return false;
  }

  const request = pendingFinishKill;
  const bot = controllerAtSlot(request.botSlot);
  const human = controllerAtSlot(request.humanSlot) || findHuman();
  const botPawn = pawnOf(bot);
  const humanPawn = pawnOf(human);
  if (!bot || !bot.IsBot() || !botPawn || !humanPawn) {
    clearHeadlockSmoothing(request.botSlot);
    return false;
  }
  if (!hasClearHeadLine(botPawn, humanPawn)) {
    clearHeadlockSmoothing(request.botSlot);
    return false;
  }
  if (!replayHeadlockAllowed(request.botSlot, botPawn, humanPawn, "head")) {
    clearHeadlockSmoothing(request.botSlot);
    return false;
  }

  clearBotViewLock(request.botSlot);
  stopPawn(botPawn);
  return aimBotAtHuman(botPawn, humanPawn, "head", { botSlot: request.botSlot });
}

function scheduleFinishKill(botSlot, humanSlot, groupId, delayMs, reason = "路线播放完毕") {
  pendingFinishKill = {
    botSlot,
    humanSlot,
    groupId,
    at: now() + clampKillDelayMs(delayMs) / 1000,
    delayMs: clampKillDelayMs(delayMs),
    reason,
  };
  beginTrajectoryReplayControl(botSlot);
  maintainPendingFinishKillAim();
  scheduleThink(Math.max(0.01, pendingFinishKill.delayMs / 1000));
  tryPendingFinishKill();
}

function tryPendingFinishKill() {
  if (!pendingFinishKill || now() + 0.0001 < pendingFinishKill.at) {
    return false;
  }

  const request = pendingFinishKill;
  pendingFinishKill = null;
  const bot = controllerAtSlot(request.botSlot);
  const human = controllerAtSlot(request.humanSlot) || findHuman();
  const botPawn = pawnOf(bot);
  const humanPawn = pawnOf(human);
  if (!bot || !bot.IsBot() || !botPawn || !humanPawn) {
    scheduleGroupReplayAfterFinish(request.groupId, 1.0, "延迟击杀取消");
    return false;
  }

  if (!finishKillEnabled()) {
    lockBotView(request.botSlot, makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0));
    beginTrajectoryReplayControl(request.botSlot);
    scheduleGroupReplayAfterFinish(request.groupId, 1.0, "difficulty0_no_finish_kill");
    chat("路线播放完毕：难度0不执行收尾击杀，1秒后播放下一轮");
    return false;
  }

  const killed = tryScriptedKillHuman(request.botSlot, botPawn, humanPawn, "finish_delay", "release");
  if (killed) {
    chat(`kill_delay=${request.delayMs}ms：bot已完成延迟击杀`);
    return true;
  }

  lockBotView(request.botSlot, makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0));
  beginTrajectoryReplayControl(request.botSlot);
  scheduleGroupReplayAfterFinish(request.groupId, 1.0, "bot未看到玩家");
  chat("kill_delay结束：bot看不到玩家，1秒后播放下一轮");
  return false;
}

const BotManager = {
  add(team) {
    requestBotSpawn(team === "T" ? TEAM_T : TEAM_CT, team === "T" ? "已请求添加 T bot" : "已请求添加 CT bot");
  },

  placeAtCrosshair() {
    const human = findHuman();
    const bot = findBot();
    const humanPawn = pawnOf(human);
    const botPawn = pawnOf(bot);
    if (!humanPawn) {
      chat("放置失败：需要一个存活玩家");
      return;
    }
    if (!botPawn) {
      const team = desiredOpponentBotTeam() || TEAM_T;
      requestBotSpawn(team, `未找到敌方bot，已请求添加 ${teamName(team)} bot；生成后再按一次放置起点`);
      return;
    }

    const target = aimTracePoint(humanPawn);
    selectedBotSlot = bot.GetPlayerSlot();
    lastBotSlot = selectedBotSlot;
    setupServer();
    server("bot_stop 1");
    server("bot_dont_shoot 1");

    if (!placementDraft || placementDraft.botSlot !== selectedBotSlot || placementDraft.directionSet) {
      const provisionalYaw = humanPawn.GetEyeAngles().yaw;
      const anchor = makeAnchor(target, provisionalYaw, 0, 0);
      pendingSettledPoint = {
        kind: "botPlacement",
        botSlot: selectedBotSlot,
        yaw: provisionalYaw,
        at: now() + TELEPORT_SETTLE_SECONDS,
      };
      placementDraft = null;
      teleportPawnForSettle(botPawn, target, anchorAngles(anchor));
      lockBotView(selectedBotSlot, anchor);
      drawAnchor(anchor);
      chat("正在稳定 bot 起点：已先抬高约0.5m，1秒后保存落稳位置");
      scheduleThink(TELEPORT_SETTLE_SECONDS);
      return;
    }

    const origin = anchorPosition(placementDraft.anchor);
    const yaw = yawFromTo(origin, target);
    const anchor = makeAnchor(origin, yaw, 0, 0);
    placementDraft = { botSlot: selectedBotSlot, anchor, directionSet: true };
    selectedAnchor = anchor;
    teleportPawnToAnchor(botPawn, anchor);
    lockBotView(selectedBotSlot, anchor);
    drawAnchor(anchor);
    if (!noRemindMode) {
      Instance.DebugSphere({
        center: target,
        radius: 12,
        duration: 4,
        color: { r: 255, g: 180, b: 80, a: 255 },
      });
    }
    chat("已设置bot朝向；现在可以按 MOUSE4/MOUSE5 开始录制");
  },

  faceHuman() {
    const human = findHuman();
    const bot = findBot();
    const humanPawn = pawnOf(human);
    const botPawn = pawnOf(bot);
    if (!humanPawn || !botPawn) {
      chat("面向失败：需要一个存活玩家和一个 bot");
      return;
    }
    faceBotToHuman(botPawn, humanPawn);
    selectedBotSlot = bot.GetPlayerSlot();
    lastBotSlot = selectedBotSlot;
    selectedAnchor = makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0);
    lockBotView(selectedBotSlot, selectedAnchor);
    stopPawn(botPawn);
    chat("已让bot面向玩家");
  },

  freeze() {
    Autopeek.stop(false);
    Replay.stop(false);
    stopping = null;
    const bot = findBot();
    const botPawn = pawnOf(bot);
    if (botPawn) {
      stopPawn(botPawn);
    }
    server("bot_stop 1");
    server("bot_dont_shoot 1");
    chat("已定住bot");
  },

  toggleFFA() {
    ffaEnabled = !ffaEnabled;
    server(`mp_teammates_are_enemies ${ffaEnabled ? 1 : 0}`);
    server(`mp_friendlyfire ${ffaEnabled ? 1 : 0}`);
    chat(ffaEnabled ? "已切换FFA：所有人互为敌人" : "已关闭FFA：恢复队伍阵营");
  },
};

const ShootingControl = {
  cycleDifficulty() {
    setShootDifficulty((shootDifficulty + 1) % SHOOTING.modes.length);
  },
};

const AttackProbe = {
  start() {
    const bot = findBot();
    const botPawn = pawnOf(bot);
    if (!botPawn) {
      chat("原始开火测试失败：需要一个存活 bot");
      return;
    }

    if (attackProbe) {
      Instance.ClientCommand(attackProbe.botSlot, "-attack");
    }

    const botSlot = bot.GetPlayerSlot();
    selectedBotSlot = botSlot;
    lastBotSlot = botSlot;
    Instance.ClientCommand(botSlot, "+attack");
    attackProbe = {
      botSlot,
      shots: 0,
      releaseAt: now() + ATTACK_PROBE_SECONDS,
    };
    chat(`原始开火测试：已向 bot slot ${botSlot} 发送 +attack；${ATTACK_PROBE_SECONDS.toFixed(1)} 秒后自动 -attack`);
    scheduleThink();
  },

  noteShot(weapon) {
    if (!attackProbe || !weapon) {
      return;
    }
    try {
      const shooter = weapon.GetOwner();
      const controller = shooter && shooter.GetPlayerController ? shooter.GetPlayerController() : undefined;
      if (controller && controller.GetPlayerSlot() === attackProbe.botSlot) {
        attackProbe.shots += 1;
        chat(`原始开火测试：OnGunFire 已捕获 bot 真实开枪 ${attackProbe.shots} 次`);
      }
    } catch (error) {
      Instance.Msg(`[${CHAT_PREFIX}] Attack probe shot check failed: ${error}`);
    }
  },

  tick() {
    if (!attackProbe || now() < attackProbe.releaseAt) {
      return;
    }
    Instance.ClientCommand(attackProbe.botSlot, "-attack");
    chat(`原始开火测试结束：已发送 -attack；真实开枪次数 ${attackProbe.shots}`);
    attackProbe = null;
  },

  stop() {
    if (!attackProbe) {
      return;
    }
    Instance.ClientCommand(attackProbe.botSlot, "-attack");
    attackProbe = null;
  },
};

const Autopeek = {
  direction: "left",
  active: false,
  distance: 0,

  select(direction) {
    this.direction = direction;
    chat(direction === "left" ? "已选择向左横拉" : "已选择向右横拉");
  },

  start() {
    const human = findHuman();
    const bot = findBot();
    const humanPawn = pawnOf(human);
    const botPawn = pawnOf(bot);
    if (!humanPawn || !botPawn) {
      chat("开始失败：需要一个存活玩家和一个 bot");
      return;
    }

    Replay.stop(false);
    setupServer();
    selectedBotSlot = bot.GetPlayerSlot();
    lastBotSlot = selectedBotSlot;
    const lockAnchor = selectedAnchor
      ? selectedAnchor
      : makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0);
    beginScriptBotControl(selectedBotSlot);
    lockBotView(selectedBotSlot, lockAnchor);
    this.active = true;
    this.distance = 0;
    chat("已开始架枪peek");
    scheduleThink();
  },

  stop(verbose = true) {
    if (!this.active && !stopping) {
      if (verbose) {
        chat("当前没有正在进行的peek");
      }
      return;
    }
    this.active = false;
    const bot = findBot();
    const botPawn = pawnOf(bot);
    if (botPawn) {
      stopPawn(botPawn);
    }
    endScriptBotControl(bot ? bot.GetPlayerSlot() : -1, true);
    if (verbose) {
      chat("已停止peek，bot AI 已释放");
    }
  },

  tick(dt) {
    if (!this.active) {
      return;
    }

    const human = findHuman();
    const bot = findBot();
    const humanPawn = pawnOf(human);
    const botPawn = pawnOf(bot);
    if (!humanPawn || !botPawn) {
      this.stop(false);
      chat("peek已停止：玩家或 bot 不存在");
      return;
    }

    if (hasLineOfSight(botPawn, humanPawn)) {
      this.active = false;
      Stopping.start(bot.GetPlayerSlot(), human.GetPlayerSlot(), "架枪模式看到玩家，进入拟真急停", () => {
        chat("已急停并开枪");
      });
      return;
    }

    const toHuman = norm2D(sub(humanPawn.GetAbsOrigin(), botPawn.GetAbsOrigin()));
    const left = { x: toHuman.y, y: -toHuman.x, z: 0 };
    const right = { x: -toHuman.y, y: toHuman.x, z: 0 };
    const side = this.direction === "left" ? left : right;
    const speed = MOVEMENT.rifle.peekSpeed;
    const oldVelocity = botPawn.GetAbsVelocity() || { x: 0, y: 0, z: 0 };
    botPawn.Teleport({
      velocity: { x: side.x * speed, y: side.y * speed, z: oldVelocity.z || 0 },
    });
    this.distance += speed * dt;
    if (this.distance > 900) {
      this.stop(false);
      chat("peek已停止：横拉距离达到上限");
    }
  },
};

const Stopping = {
  start(botSlot, humanSlot, reason, onComplete) {
    const bot = controllerAtSlot(botSlot);
    const botPawn = pawnOf(bot);
    if (!botPawn) {
      chat("急停失败：bot 不存在");
      return;
    }

    stopping = {
      botSlot,
      humanSlot,
      ticks: 0,
      anchor: botViewLock && botViewLock.botSlot === botSlot
        ? botViewLock.anchor
        : makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0),
      onComplete,
    };
    beginScriptBotControl(botSlot);
    lockBotView(botSlot, stopping.anchor);
    chat(reason);
    scheduleThink();
  },

  tick(dt) {
    if (!stopping) {
      return;
    }

    const bot = controllerAtSlot(stopping.botSlot);
    const human = controllerAtSlot(stopping.humanSlot) || findHuman();
    const botPawn = pawnOf(bot);
    const humanPawn = pawnOf(human);
    if (!botPawn || !humanPawn) {
      stopping = null;
      return;
    }

    const velocity = botPawn.GetAbsVelocity() || { x: 0, y: 0, z: 0 };
    const horizontal = { x: velocity.x, y: velocity.y, z: 0 };
    const speed = len2D(horizontal);
    const drop = STOPPING.decelPerSecond * dt;
    const nextSpeed = Math.max(0, speed - drop);
    stopping.ticks += 1;

    if (speed > STOPPING.speedThreshold || stopping.ticks < STOPPING.minTicks) {
      const factor = speed <= 0.001 ? 0 : nextSpeed / speed;
      botPawn.Teleport({
        velocity: {
          x: horizontal.x * factor,
          y: horizontal.y * factor,
          z: velocity.z || 0,
        },
      });
      return;
    }

    stopPawn(botPawn);
    server("bot_stop 1");
    triggerAttackPulse(stopping.botSlot);
    const complete = stopping.onComplete;
    stopping = null;
    if (complete) {
      complete();
    }
  },
};

function makeAnchor(position, yaw, pitch = 0, roll = 0) {
  void roll;
  return {
    position: vecArray(position),
    pitch: q(pitch, 3),
    yaw: q(normalizeYaw(yaw), 3),
    roll: 0,
  };
}

function drawAnchor(anchor) {
  if (noRemindMode) {
    return;
  }
  drawGroundShadow(arrVec(anchor.position), 20, 4, { r: 0, g: 0, b: 0, a: 190 });
  Instance.DebugSphere({
    center: arrVec(anchor.position),
    radius: 18,
    duration: 4,
    color: { r: 80, g: 220, b: 255, a: 255 },
  });
}

function drawGroundShadow(position, radius, duration, color = { r: 0, g: 0, b: 0, a: 170 }) {
  if (!position) {
    return;
  }
  const center = {
    x: position.x,
    y: position.y,
    z: position.z + GROUP_SELECTOR_SHADOW_Z_OFFSET,
  };
  const ringRadius = Math.max(8, radius);
  for (let i = 0; i < GROUP_SELECTOR_SHADOW_SEGMENTS; i += 1) {
    const a0 = i * Math.PI * 2 / GROUP_SELECTOR_SHADOW_SEGMENTS;
    const a1 = (i + 1) * Math.PI * 2 / GROUP_SELECTOR_SHADOW_SEGMENTS;
    const start = {
      x: center.x + Math.cos(a0) * ringRadius,
      y: center.y + Math.sin(a0) * ringRadius,
      z: center.z,
    };
    const end = {
      x: center.x + Math.cos(a1) * ringRadius,
      y: center.y + Math.sin(a1) * ringRadius,
      z: center.z,
    };
    Instance.DebugLine({ start, end, duration, color });
  }
  Instance.DebugLine({
    start: { x: center.x - ringRadius, y: center.y, z: center.z },
    end: { x: center.x + ringRadius, y: center.y, z: center.z },
    duration,
    color,
  });
  Instance.DebugLine({
    start: { x: center.x, y: center.y - ringRadius, z: center.z },
    end: { x: center.x, y: center.y + ringRadius, z: center.z },
    duration,
    color,
  });
}

function anchorPosition(anchor) {
  return arrVec(anchor.position);
}

function anchorAngles(anchor) {
  return {
    pitch: 0,
    yaw: anchor.yaw,
    roll: 0,
  };
}

function replayPawnAngles(anchor, localAngles) {
  return {
    pitch: 0,
    yaw: normalizeYaw(anchor.yaw + localAngles.yaw),
    roll: 0,
  };
}

function teleportPawnToAnchor(pawn, anchor) {
  pawn.Teleport({
    position: safeRuntimeTeleportPosition(anchorPosition(anchor), pawn),
    angles: anchorAngles(anchor),
    velocity: { x: 0, y: 0, z: 0 },
    angularVelocity: { x: 0, y: 0, z: 0 },
  });
}

function parkPositionForAnchor(anchor) {
  return fromLocal2D(anchor, { x: 0, y: 160, z: 0 });
}

function restoreBotToAnchor(route) {
  if (!route || route.botSlot === undefined) {
    return;
  }
  const bot = controllerAtSlot(route.botSlot);
  const botPawn = pawnOf(bot);
  if (!botPawn) {
    return;
  }
  teleportPawnToAnchor(botPawn, route.anchor);
  lockBotView(route.botSlot, route.anchor);
}

function routeKey(slot = activeRouteSlot) {
  return `slot_${slot}`;
}

function routeForActiveSlot() {
  return store.routes[routeKey()];
}

function groupKey(groupId) {
  return `group_${groupId}`;
}

function groupRouteKey(groupId, order, savedAt) {
  return `group_${groupId}_route_${order}_${savedAt}`;
}

function createEmptyStore() {
  return { schema: SAVE_SCHEMA, userSaveSchema: USER_SAVE_SCHEMA, routes: {}, groups: {}, settings: {}, nextGroupId: 1 };
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function nextGroupIdFromGroups(groups) {
  let nextId = 1;
  if (!groups) {
    return nextId;
  }
  for (const group of Object.values(groups)) {
    if (group && Number.isFinite(group.id)) {
      nextId = Math.max(nextId, group.id + 1);
    }
  }
  return nextId;
}

function nextGroupIdFromStore() {
  return nextGroupIdFromGroups(store.groups);
}

function ensureStoreShape() {
  if (!store || typeof store !== "object") {
    store = createEmptyStore();
  }
  store.schema = SAVE_SCHEMA;
  store.userSaveSchema = USER_SAVE_SCHEMA;
  if (!store.routes || typeof store.routes !== "object") {
    store.routes = {};
  }
  if (!store.groups || typeof store.groups !== "object") {
    store.groups = {};
  }
  if (!store.settings || typeof store.settings !== "object") {
    store.settings = {};
  }
  if (!Number.isFinite(store.nextGroupId) || store.nextGroupId < 1) {
    store.nextGroupId = nextGroupIdFromStore();
  }
}

function pruneEmptySpawnOnlyGroups() {
  ensureStoreShape();
  let removed = 0;
  for (const [key, group] of Object.entries(store.groups || {})) {
    const hasSpawn = !!(group && group.playerSpawn && group.playerSpawn.position);
    const routeCount = group && Array.isArray(group.routes) ? group.routes.length : 0;
    if (hasSpawn && routeCount === 0) {
      delete store.groups[key];
      removed += 1;
    }
  }
  if (removed > 0) {
    store.nextGroupId = Math.max(store.nextGroupId || 1, nextGroupIdFromStore());
  }
  return removed;
}

function pruneConfiguredGroupsOnLoad() {
  ensureStoreShape();
  const ids = {};
  for (const id of GROUP_IDS_TO_PRUNE_ON_LOAD) {
    ids[id] = true;
  }

  let removedGroups = 0;
  let removedRoutes = 0;
  for (const [key, group] of Object.entries(store.groups || {})) {
    if (group && ids[group.id]) {
      delete store.groups[key];
      removedGroups += 1;
    }
  }
  for (const [key, route] of Object.entries(store.routes || {})) {
    if (route && ids[route.groupId]) {
      delete store.routes[key];
      removedRoutes += 1;
    }
  }
  if (removedGroups > 0 || removedRoutes > 0) {
    store.nextGroupId = Math.max(store.nextGroupId || 1, nextGroupIdFromStore());
    updateLoadDiagnosticCounts();
  }
  return { groups: removedGroups, routes: removedRoutes };
}

function settingFlag(name, defaultValue = false) {
  const settings = store && typeof store === "object" && store.settings && typeof store.settings === "object" ? store.settings : {};
  if (settings[name] === undefined) {
    return defaultValue;
  }
  return !!settings[name];
}

function settingNumber(name, defaultValue = 0) {
  const settings = store && typeof store === "object" && store.settings && typeof store.settings === "object" ? store.settings : {};
  const value = Number(settings[name]);
  return Number.isFinite(value) ? value : defaultValue;
}

function settingString(name, defaultValue = "") {
  const settings = store && typeof store === "object" && store.settings && typeof store.settings === "object" ? store.settings : {};
  const value = settings[name];
  return typeof value === "string" ? value : defaultValue;
}

function clampShootDifficulty(value) {
  return Math.max(0, Math.min(SHOOTING.modes.length - 1, Math.floor(Number(value))));
}

function clampKillDelayMs(value) {
  return Math.max(KILL_DELAY_MIN_MS, Math.min(KILL_DELAY_MAX_MS, Math.floor(Number(value))));
}

function killDelayForDifficulty(value) {
  return DIFFICULTY_KILL_DELAYS_MS[clampShootDifficulty(value)];
}

function syncSettingModes() {
  noRemindMode = settingFlag("noRemind", false);
  activeInitialPositionVisible = settingFlag("showInitialPosition", true);
  opponentBotGuardMode = settingFlag("checkBot", true);
  chatLanguage = normalizeChatLanguage(store && store.settings ? store.settings.language : CHAT_LANGUAGE_DEFAULT);
  shootDifficulty = SHOOTING.defaultDifficulty;
  killDelayMs = DEFAULT_KILL_DELAY_MS;
  const savedDefaultWeapon = resolveHumanDefaultWeapon(settingString("defaultHumanWeapon", DEFAULT_HUMAN_WEAPON));
  defaultHumanWeapon = savedDefaultWeapon ? savedDefaultWeapon.className : DEFAULT_HUMAN_WEAPON;
  if (store && store.settings && store.settings.shootDifficulty !== undefined) {
    shootDifficulty = clampShootDifficulty(store.settings.shootDifficulty);
  }
  killDelayMs = killDelayForDifficulty(shootDifficulty);
  if (store && store.settings && store.settings.killDelayMs !== undefined) {
    killDelayMs = clampKillDelayMs(store.settings.killDelayMs);
  }
}

function defaultRouteName(slot) {
  return `路线${slot}`;
}

function defaultGroupName(groupId) {
  return `群${groupId}`;
}

function routeDisplayName(route, slot = activeRouteSlot) {
  if (route && route.name) {
    return route.name;
  }
  return defaultRouteName(slot);
}

function groupForId(groupId) {
  if (groupId < 0) {
    return null;
  }
  ensureStoreShape();
  return store.groups[groupKey(groupId)] || null;
}

function activeGroup() {
  return groupForId(activeGroupId);
}

function groupDisplayName(group) {
  return group && group.name ? group.name : defaultGroupName(group ? group.id : 0);
}

function groupLabelText(group) {
  return `${groupDisplayName(group)} (${playableRoutesForGroup(group).length})`;
}

function groupSpawnPosition(group, zOffset = 0) {
  if (!group || !group.playerSpawn || !group.playerSpawn.position) {
    return null;
  }
  return add(arrVec(group.playerSpawn.position), { x: 0, y: 0, z: zOffset });
}

function savedGroupsWithSpawn() {
  ensureStoreShape();
  return Object.values(store.groups)
    .filter((group) => group && group.playerSpawn && group.playerSpawn.position && group.routes && group.routes.length > 0)
    .sort((a, b) => (a.id || 0) - (b.id || 0));
}

function routeFromGroupEntry(entry) {
  if (!entry) {
    return null;
  }
  return store.routes[entry.routeKey || routeKey(entry.routeSlot)] || null;
}

function playableRoutesForGroup(group) {
  if (!group || !group.routes) {
    return [];
  }
  const routes = [];
  for (const entry of group.routes) {
    const route = routeFromGroupEntry(entry);
    if (routeIsPlayable(route)) {
      routes.push({ entry, route });
    }
  }
  return routes;
}

function routeKeyForGroupChoice(choice) {
  return choice && choice.entry
    ? (choice.entry.routeKey || routeKey(choice.entry.routeSlot || (choice.route && choice.route.slot) || activeRouteSlot))
    : "";
}

function routeDisplayNameForGroupChoice(choice) {
  const order = choice && choice.entry ? (choice.entry.order || choice.route.groupOrder || 0) : 0;
  const routeSlot = choice && choice.entry ? (choice.entry.routeSlot || choice.route.slot || activeRouteSlot) : activeRouteSlot;
  const baseName = choice && choice.route ? routeDisplayName(choice.route, routeSlot) : defaultRouteName(routeSlot);
  return order > 0 ? `第${order}条「${baseName}」` : `「${baseName}」`;
}

function emitAdminRouteEvent(eventType, group, choice, extra = {}) {
  if (!group || !choice || !choice.route) {
    return;
  }
  const entry = choice.entry || {};
  const route = choice.route;
  const routeSlot = entry.routeSlot || route.slot || activeRouteSlot;
  const routeOrder = entry.order || route.groupOrder || 0;
  const routeKeyValue = routeKeyForGroupChoice(choice);
  const payload = {
    type: eventType,
    map: "holding_training_map",
    groupId: group.id || route.groupId || 0,
    groupName: groupDisplayName(group),
    adminGroupId: group.adminGroupId || group.id || 0,
    adminGroupLabel: group.adminGroupLabel || "",
    routeKey: routeKeyValue,
    routeOrder,
    routeSlot,
    routeName: route.name || entry.name || defaultRouteName(routeSlot),
    routeDisplayName: routeDisplayNameForGroupChoice(choice),
    verified: !!route.verified,
    verificationStatus: route.verificationStatus || (route.verified ? "verified" : ""),
    savedAt: route.savedAt || entry.savedAt || 0,
    duration: route.duration || entry.duration || 0,
    reason: extra.reason || "",
    mode: extra.mode || "",
    eventTime: Math.floor(Date.now() / 1000),
  };
  Instance.Msg(`[${ADMIN_EVENT_PREFIX}] ${JSON.stringify(payload)}`);
}

function defaultGroupRouteName(group, order) {
  return `${groupDisplayName(group)} 第${order}条`;
}

function routeNameLooksDefault(name, slot) {
  return !name || name === defaultRouteName(slot);
}

function randomPlayableRouteForGroup(group, avoidRouteKey = "") {
  const routes = playableRoutesForGroup(group);
  if (routes.length === 0) {
    return null;
  }
  const pool = routes.length > 1
    ? routes.filter((choice) => routeKeyForGroupChoice(choice) !== avoidRouteKey)
    : routes;
  const choices = pool.length > 0 ? pool : routes;
  return choices[Math.floor(Math.random() * choices.length)];
}

function shuffleRouteKeys(keys) {
  const shuffled = keys.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

function balancedPlayableRouteForGroup(group, avoidRouteKey = "") {
  const routes = playableRoutesForGroup(group);
  if (routes.length === 0) {
    return null;
  }

  const choicesByKey = {};
  const keys = [];
  for (const choice of routes) {
    const key = routeKeyForGroupChoice(choice);
    if (!key) {
      continue;
    }
    choicesByKey[key] = choice;
    keys.push(key);
  }

  if (keys.length === 0) {
    return randomPlayableRouteForGroup(group, avoidRouteKey);
  }

  const groupId = group.id || 0;
  let bag = groupRouteShuffleBags[groupId] || [];
  bag = bag.filter((key) => choicesByKey[key] && (keys.length <= 1 || key !== avoidRouteKey));
  if (bag.length === 0) {
    const pool = keys.length > 1 ? keys.filter((key) => key !== avoidRouteKey) : keys;
    bag = shuffleRouteKeys(pool.length > 0 ? pool : keys);
  }

  const selectedKey = bag.shift();
  groupRouteShuffleBags[groupId] = bag;
  return choicesByKey[selectedKey] || randomPlayableRouteForGroup(group, avoidRouteKey);
}

function builtinSaveText() {
  if (NODATA_DISABLE_GROUP_DATA) {
    return "";
  }
  const text = BUILTIN_SAVE_CHUNKS.join("");
  const trimmed = text.trim();
  if (!trimmed || trimmed[0] === "{" || trimmed[0] === "[") {
    return text;
  }
  return decodeBase64Utf8(text);
}

function utf8BytesToString(bytes) {
  let text = "";
  for (let index = 0; index < bytes.length; index++) {
    const first = bytes[index];
    if (first < 0x80) {
      text += String.fromCharCode(first);
    } else if ((first & 0xe0) === 0xc0 && index + 1 < bytes.length) {
      const second = bytes[++index];
      text += String.fromCharCode(((first & 0x1f) << 6) | (second & 0x3f));
    } else if ((first & 0xf0) === 0xe0 && index + 2 < bytes.length) {
      const second = bytes[++index];
      const third = bytes[++index];
      text += String.fromCharCode(((first & 0x0f) << 12) | ((second & 0x3f) << 6) | (third & 0x3f));
    } else if ((first & 0xf8) === 0xf0 && index + 3 < bytes.length) {
      const second = bytes[++index];
      const third = bytes[++index];
      const fourth = bytes[++index];
      let codePoint = ((first & 0x07) << 18) | ((second & 0x3f) << 12) | ((third & 0x3f) << 6) | (fourth & 0x3f);
      codePoint -= 0x10000;
      text += String.fromCharCode(0xd800 + (codePoint >> 10), 0xdc00 + (codePoint & 0x3ff));
    } else {
      text += "?";
    }
  }
  return text;
}

function decodeBase64Utf8(input) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const bytes = [];
  let buffer = 0;
  let bits = 0;
  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    if (char === "=") {
      break;
    }
    const value = alphabet.indexOf(char);
    if (value < 0) {
      continue;
    }
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }
  return utf8BytesToString(bytes);
}

function installBuiltinDataText(text, source) {
  if (NODATA_DISABLE_GROUP_DATA) {
    markBuiltinStore(createEmptyStore());
    externalBuiltinDataLoaded = true;
    externalBuiltinChunkCount = 0;
    return true;
  }
  try {
    const parsed = JSON.parse(text);
    if (!parsed || parsed.schema !== SAVE_SCHEMA || !parsed.routes) {
      throw new Error("invalid builtin save schema");
    }
    markBuiltinStore(parsed);
    externalBuiltinDataLoaded = true;
    externalBuiltinChunkCount = externalBuiltinChunks.length;
    if (storeLoaded) {
      loadStore();
    }
    updateLoadDiagnosticCounts();
    scheduleThink(0.25);
    Instance.Msg(`[${CHAT_PREFIX}] External builtin data loaded from ${source}: groups=${Object.keys(builtinStore.groups || {}).length}, routes=${Object.keys(builtinStore.routes || {}).length}`);
    return true;
  } catch (error) {
    Instance.Msg(`[${CHAT_PREFIX}] External builtin data failed from ${source}: ${error}`);
    return false;
  }
}

function beginExternalBuiltinData() {
  if (NODATA_DISABLE_GROUP_DATA) {
    externalBuiltinChunks = [];
    externalBuiltinTransferActive = false;
    externalBuiltinDataLoaded = true;
    return;
  }
  externalBuiltinChunks = [];
  externalBuiltinTransferActive = true;
}

function receiveExternalBuiltinChunk(args) {
  if (NODATA_DISABLE_GROUP_DATA) {
    return;
  }
  const chunk = String(args || "").trim();
  if (!chunk) {
    return;
  }
  if (!externalBuiltinTransferActive) {
    beginExternalBuiltinData();
  }
  externalBuiltinChunks.push(chunk);
}

function finishExternalBuiltinData() {
  if (NODATA_DISABLE_GROUP_DATA) {
    externalBuiltinChunks = [];
    externalBuiltinTransferActive = false;
    externalBuiltinDataLoaded = true;
    return;
  }
  if (!externalBuiltinTransferActive && externalBuiltinChunks.length === 0) {
    return;
  }
  externalBuiltinTransferActive = false;
  const chunks = externalBuiltinChunks.slice();
  const text = decodeBase64Utf8(chunks.join(""));
  externalBuiltinChunks = chunks;
  installBuiltinDataText(text, `chunks=${chunks.length}`);
  externalBuiltinChunks = [];
}

function requestExternalBuiltinData() {
  if (NODATA_DISABLE_GROUP_DATA) {
    externalBuiltinDataLoaded = true;
    externalBuiltinChunkCount = 0;
    return;
  }
  if (externalBuiltinDataLoaded || BUILTIN_SAVE_CHUNKS.length > 0) {
    return;
  }
  try {
    server("autopeek_builtin_request");
  } catch (error) {
    Instance.Msg(`[${CHAT_PREFIX}] Builtin data request failed: ${error}`);
  }
}

function routeKeyFromGroupEntry(entry) {
  return entry ? (entry.routeKey || routeKey(entry.routeSlot)) : "";
}

function routeFrameWorldPosition(route, frame) {
  if (!route || !route.anchor || !route.anchor.position || !frame) {
    return null;
  }
  const local = vectorOrNull(frame.p);
  if (!local) {
    return null;
  }
  return fromLocal2D(route.anchor, local);
}

function routeFrameIsUsable(route, frame) {
  const local = frame ? vectorOrNull(frame.p) : null;
  if (!routeLocalPositionIsUsable(local)) {
    return false;
  }
  return worldPositionIsUsable(routeFrameWorldPosition(route, frame));
}

function routeGeometryIsPlayable(route) {
  if (!route || !route.anchor || !worldPositionIsUsable(route.anchor.position)) {
    return false;
  }
  const frames = route.frames || [];
  if (frames.length < 2) {
    return false;
  }
  const sampleIndices = [0, Math.floor(frames.length / 2), frames.length - 1];
  for (const index of sampleIndices) {
    if (!routeFrameIsUsable(route, frames[index])) {
      return false;
    }
  }
  return true;
}

function routeIsPlayable(route) {
  return !!(route && route.frames && route.frames.length >= 2 && routeGeometryIsPlayable(route));
}

function compactGroupEntries(group, routes) {
  const entries = [];
  const seen = {};
  for (const entry of group && group.routes ? group.routes : []) {
    const key = routeKeyFromGroupEntry(entry);
    if (!key || seen[key] || !routeIsPlayable(routes[key])) {
      continue;
    }
    seen[key] = true;
    entries.push(cloneData(entry));
  }
  return entries;
}

function groupIsPlayableWithRoutes(group, routes) {
  return !!(group && group.playerSpawn && group.playerSpawn.position && compactGroupEntries(group, routes).length > 0);
}

function cleanTrainingStore(rawStore) {
  const cleaned = createEmptyStore();
  if (!rawStore || typeof rawStore !== "object") {
    return cleaned;
  }

  const rawRoutes = rawStore.routes || {};
  cleaned.settings = cloneData(rawStore.settings || {});
  cleaned.nextGroupId = Math.max(rawStore.nextGroupId || 1, nextGroupIdFromGroups(rawStore.groups || {}));
  for (const rawGroup of Object.values(rawStore.groups || {})) {
    if (!rawGroup || !rawGroup.playerSpawn || !rawGroup.playerSpawn.position) {
      continue;
    }

    const entries = compactGroupEntries(rawGroup, rawRoutes);
    if (entries.length === 0) {
      continue;
    }

    const group = cloneData(rawGroup);
    group.routes = entries;
    cleaned.groups[groupKey(group.id)] = group;
    for (const entry of entries) {
      const key = routeKeyFromGroupEntry(entry);
      cleaned.routes[key] = cloneData(rawRoutes[key]);
      cleaned.routes[key].routeKey = key;
    }
  }
  return cleaned;
}

function markBuiltinStore(rawStore) {
  builtinStore = cleanTrainingStore(rawStore);
  builtinRouteKeys = {};
  builtinGroupKeys = {};
  for (const key of Object.keys(builtinStore.routes || {})) {
    builtinRouteKeys[key] = true;
  }
  for (const key of Object.keys(builtinStore.groups || {})) {
    builtinGroupKeys[key] = true;
  }
}

function ensureBuiltinStore() {
  if (builtinStore) {
    return true;
  }

  const text = builtinSaveText();
  if (!text) {
    markBuiltinStore(createEmptyStore());
    return true;
  }

  try {
    const parsed = JSON.parse(text);
    if (!parsed || parsed.schema !== SAVE_SCHEMA || !parsed.routes) {
      markBuiltinStore(createEmptyStore());
    } else {
      markBuiltinStore(parsed);
    }
    return true;
  } catch (error) {
    Instance.Msg(`[${CHAT_PREFIX}] Builtin save data failed: ${error}`);
    markBuiltinStore(createEmptyStore());
    return false;
  }
}

function sameJson(a, b) {
  return JSON.stringify(a || null) === JSON.stringify(b || null);
}

function applyBaseStore(source) {
  ensureBuiltinStore();
  store = cloneData(builtinStore || createEmptyStore());
  ensureStoreShape();
  syncSettingModes();
  lastLoadDiagnostic.parsed = true;
  lastLoadDiagnostic.source = source;
  updateLoadDiagnosticCounts();
  return true;
}

function updateLoadDiagnosticCounts() {
  ensureStoreShape();
  const groups = Object.values(store.groups || {});
  lastLoadDiagnostic.groupCount = groups.length;
  lastLoadDiagnostic.nonEmptyGroupCount = groups.filter((group) => group && group.routes && group.routes.length > 0).length;
  lastLoadDiagnostic.spawnGroupCount = groups.filter((group) => groupIsPlayableWithRoutes(group, store.routes || {})).length;
  lastLoadDiagnostic.routeCount = Object.keys(store.routes || {}).length;
}

function mergeUserSave(userSave) {
  ensureStoreShape();
  if (!userSave || typeof userSave !== "object") {
    return;
  }

  if (userSave.settings && typeof userSave.settings === "object") {
    store.settings = { ...store.settings, ...cloneData(userSave.settings) };
  }

  for (const [key, route] of Object.entries(userSave.routes || {})) {
    if (routeIsPlayable(route)) {
      store.routes[key] = cloneData(route);
    }
  }

  for (const [key, group] of Object.entries(userSave.groups || {})) {
    if (group && group.id !== undefined) {
      const merged = cloneData(group);
      merged.routes = compactGroupEntries(merged, store.routes || {});
      const overridesBuiltinGroup = !!builtinGroupKeys[key] && group.routes && group.routes.length === 0;
      if (merged.routes.length > 0 || !builtinGroupKeys[key] || overridesBuiltinGroup) {
        store.groups[key] = merged;
      }
    }
  }

  store.nextGroupId = Math.max(store.nextGroupId || 1, userSave.nextGroupId || 1, nextGroupIdFromStore());
  syncSettingModes();
  updateLoadDiagnosticCounts();
}

function buildLegacyUserSave(rawStore) {
  const migrated = createEmptyStore();
  migrated.settings = cloneData(rawStore && rawStore.settings ? rawStore.settings : {});
  migrated.nextGroupId = Math.max(rawStore && rawStore.nextGroupId ? rawStore.nextGroupId : 1, builtinStore && builtinStore.nextGroupId ? builtinStore.nextGroupId : 1);
  const rawRoutes = rawStore && rawStore.routes ? rawStore.routes : {};
  const rawGroups = rawStore && rawStore.groups ? rawStore.groups : {};

  for (const rawGroup of Object.values(rawGroups)) {
    if (!groupIsPlayableWithRoutes(rawGroup, rawRoutes)) {
      continue;
    }

    const group = cloneData(rawGroup);
    group.routes = compactGroupEntries(group, rawRoutes);
    const key = groupKey(group.id);
    const builtinGroup = builtinStore && builtinStore.groups ? builtinStore.groups[key] : null;
    let needsGroupSave = !builtinGroup || !sameJson(group, builtinGroup);

    for (const entry of group.routes) {
      const routeKeyValue = routeKeyFromGroupEntry(entry);
      const route = rawRoutes[routeKeyValue];
      const builtinRoute = builtinStore && builtinStore.routes ? builtinStore.routes[routeKeyValue] : null;
      if (!builtinRoute || !sameJson(route, builtinRoute)) {
        migrated.routes[routeKeyValue] = cloneData(route);
        needsGroupSave = true;
      }
    }

    if (needsGroupSave) {
      migrated.groups[key] = group;
    }
  }

  return migrated;
}

function routeReferencedByExportedGroup(key, exportedGroups) {
  for (const group of Object.values(exportedGroups || {})) {
    for (const entry of group.routes || []) {
      if (routeKeyFromGroupEntry(entry) === key) {
        return true;
      }
    }
  }
  return false;
}

function routeIsSlotAlias(key, route) {
  return key.indexOf("slot_") === 0 && route && route.routeKey && route.routeKey !== key;
}

function buildUserSave() {
  ensureStoreShape();
  ensureBuiltinStore();
  const userSave = createEmptyStore();
  userSave.settings = cloneData(store.settings || {});
  userSave.nextGroupId = Math.max(store.nextGroupId || 1, nextGroupIdFromStore(), builtinStore && builtinStore.nextGroupId ? builtinStore.nextGroupId : 1);

  for (const [key, group] of Object.entries(store.groups || {})) {
    const builtinGroup = builtinStore && builtinStore.groups ? builtinStore.groups[key] : null;
    const playableGroup = groupIsPlayableWithRoutes(group, store.routes || {});
    if (!playableGroup && !builtinGroup) {
      continue;
    }
    if (!builtinGroup || !sameJson(group, builtinGroup)) {
      const compactGroup = cloneData(group);
      compactGroup.routes = compactGroupEntries(compactGroup, store.routes || {});
      userSave.groups[key] = compactGroup;
    }
  }

  for (const [key, route] of Object.entries(store.routes || {})) {
    if (!routeIsPlayable(route) || routeIsSlotAlias(key, route)) {
      continue;
    }
    const builtinRoute = builtinStore && builtinStore.routes ? builtinStore.routes[key] : null;
    const changed = !builtinRoute || !sameJson(route, builtinRoute);
    const referenced = routeReferencedByExportedGroup(key, userSave.groups);
    const soloRoute = route.groupId === undefined || route.groupId < 0;
    if (changed && (referenced || soloRoute)) {
      userSave.routes[key] = cloneData(route);
    }
  }

  return userSave;
}

function applyLoadedStore(parsed, source) {
  if (!parsed || parsed.schema !== SAVE_SCHEMA) {
    return false;
  }

  applyBaseStore(source.indexOf("builtin") === 0 ? source : `${source}+builtin`);
  if (NODATA_DISABLE_GROUP_DATA) {
    lastLoadDiagnostic.source = "nodata_empty";
    syncSettingModes();
    updateLoadDiagnosticCounts();
    return true;
  }
  if (parsed.userSaveSchema === USER_SAVE_SCHEMA) {
    mergeUserSave(parsed);
  } else if (parsed.routes || parsed.groups || parsed.settings) {
    mergeUserSave(buildLegacyUserSave(parsed));
    lastLoadDiagnostic.source = `${source}_legacy_compacted+builtin`;
  }
  syncSettingModes();
  updateLoadDiagnosticCounts();
  return true;
}

function normalizeRouteMatchText(value) {
  return sanitizeChat(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function routePreferenceCandidates(choice) {
  if (!choice || !choice.entry || !choice.route) {
    return [];
  }

  const order = choice.entry.order || choice.route.groupOrder || 0;
  const routeSlot = choice.entry.routeSlot || choice.route.slot || activeRouteSlot;
  const candidates = [
    choice.entry.name,
    choice.route.name,
    routeDisplayName(choice.route, routeSlot),
    routeDisplayNameForGroupChoice(choice),
  ];
  if (order > 0) {
    candidates.push(String(order));
    candidates.push(`#${order}`);
    candidates.push(`第${order}`);
    candidates.push(`第${order}条`);
    candidates.push(`路线${order}`);
    candidates.push(`route${order}`);
    candidates.push(`route ${order}`);
  }

  const seen = {};
  return candidates
    .map(normalizeRouteMatchText)
    .filter((name) => {
      if (!name || seen[name]) {
        return false;
      }
      seen[name] = true;
      return true;
    });
}

function findGroupRouteChoiceByChat(group, text) {
  const query = normalizeRouteMatchText(text);
  if (!query) {
    return null;
  }

  const choices = playableRoutesForGroup(group);
  for (const choice of choices) {
    if (routePreferenceCandidates(choice).indexOf(query) >= 0) {
      return choice;
    }
  }

  if (query.length < 2) {
    return null;
  }

  const fuzzy = [];
  for (const choice of choices) {
    const matched = routePreferenceCandidates(choice).some((candidate) => {
      return candidate.length >= 2 && (candidate.indexOf(query) >= 0 || query.indexOf(candidate) >= 0);
    });
    if (matched) {
      fuzzy.push(choice);
    }
  }
  return fuzzy.length === 1 ? fuzzy[0] : null;
}

function groupCommandCandidates(group) {
  if (!group || group.id === undefined) {
    return [];
  }

  return [
    groupDisplayName(group),
    defaultGroupName(group.id),
    String(group.id),
    `群${group.id}`,
    `group${group.id}`,
    `group_${group.id}`,
  ];
}

function groupMatchesCommandText(group, text) {
  const query = normalizeRouteMatchText(text);
  if (!query) {
    return false;
  }

  return groupCommandCandidates(group).some((candidate) => normalizeRouteMatchText(candidate) === query);
}

function allGroupsForCommand() {
  ensureStoreShape();
  return Object.values(store.groups || {})
    .filter((group) => group && group.id !== undefined)
    .sort((a, b) => (a.id || 0) - (b.id || 0));
}

function parseDeleteRouteTarget(text) {
  const commandText = sanitizeChat(text).trim().replace(/\s+/g, " ");
  const match = commandText.match(/^(del|delete|删除)\s+(.+)$/i);
  if (!match) {
    return null;
  }

  const rest = (match[2] || "").trim();
  const words = rest ? rest.split(/\s+/) : [];
  if (words.length < 2) {
    return { error: "usage" };
  }

  const matches = [];
  const groups = allGroupsForCommand();
  for (let split = 1; split < words.length; split += 1) {
    const groupText = words.slice(0, split).join(" ");
    const routeText = words.slice(split).join(" ");
    for (const group of groups) {
      if (groupMatchesCommandText(group, groupText)) {
        matches.push({ group, routeText, groupText });
      }
    }
  }

  if (matches.length === 0) {
    return { error: "group" };
  }

  matches.sort((a, b) => b.groupText.length - a.groupText.length);
  const bestLength = matches[0].groupText.length;
  const best = matches.filter((candidate) => candidate.groupText.length === bestLength);
  const groupIds = {};
  for (const candidate of best) {
    groupIds[candidate.group.id] = true;
  }
  if (Object.keys(groupIds).length > 1) {
    return { error: "group_ambiguous" };
  }

  return best[0];
}

function routeVisibleNumberCandidates(index) {
  const number = index + 1;
  return [
    String(number),
    `#${number}`,
    `第${number}`,
    `第${number}条`,
    `路线${number}`,
    `route${number}`,
    `route ${number}`,
  ].map(normalizeRouteMatchText);
}

function findGroupRouteChoiceForDelete(group, text) {
  const query = normalizeRouteMatchText(text);
  if (!query) {
    return { error: "usage" };
  }

  const choices = playableRoutesForGroup(group);
  if (choices.length === 0) {
    return { error: "empty" };
  }

  const exact = choices.filter((choice) => routePreferenceCandidates(choice).indexOf(query) >= 0);
  if (exact.length === 1) {
    return { choice: exact[0] };
  }
  if (exact.length > 1) {
    return { error: "ambiguous" };
  }

  const visible = choices.filter((choice, index) => routeVisibleNumberCandidates(index).indexOf(query) >= 0);
  if (visible.length === 1) {
    return { choice: visible[0] };
  }
  if (visible.length > 1) {
    return { error: "ambiguous" };
  }

  if (query.length < 2) {
    return { error: "route" };
  }

  const fuzzy = choices.filter((choice) => {
    return routePreferenceCandidates(choice).some((candidate) => {
      return candidate.length >= 2 && (candidate.indexOf(query) >= 0 || query.indexOf(candidate) >= 0);
    });
  });
  if (fuzzy.length === 1) {
    return { choice: fuzzy[0] };
  }
  return { error: fuzzy.length > 1 ? "ambiguous" : "route" };
}

function deleteRouteAliasesForGroupChoice(routeKeyValue, group, route) {
  if (!store.routes) {
    return;
  }

  delete store.routes[routeKeyValue];
  for (const key of Object.keys(store.routes)) {
    const candidate = store.routes[key];
    if (key.indexOf("slot_") !== 0 || !candidate) {
      continue;
    }
    if (candidate.routeKey === routeKeyValue
      || (route && candidate.savedAt === route.savedAt && candidate.groupId === group.id)) {
      delete store.routes[key];
    }
  }
}

function deleteGroupRouteChoice(group, choice) {
  const routeKeyValue = routeKeyForGroupChoice(choice);
  if (!group || !choice || !routeKeyValue || !group.routes) {
    return false;
  }

  const routeName = routeDisplayNameForGroupChoice(choice);
  const before = group.routes.length;
  group.routes = group.routes.filter((entry) => routeKeyFromGroupEntry(entry) !== routeKeyValue);
  if (group.routes.length === before) {
    return false;
  }

  const route = choice.route || store.routes[routeKeyValue];
  deleteRouteAliasesForGroupChoice(routeKeyValue, group, route);
  group.updatedAt = Math.floor(Date.now() / 1000);
  store.groups[groupKey(group.id)] = group;
  if (preferredGroupRoute && preferredGroupRoute.groupId === group.id && preferredGroupRoute.routeKey === routeKeyValue) {
    preferredGroupRoute = null;
  }
  if (lastReplayRouteKeyByGroup[group.id] === routeKeyValue) {
    lastReplayRouteKeyByGroup[group.id] = "";
  }
  const saved = saveStore();
  updateLoadDiagnosticCounts();
  GroupSelector.resetLabels();
  scheduleThink();
  chat(`已删除「${groupDisplayName(group)}」中的路线 ${routeName}；剩余${playableRoutesForGroup(group).length}条${saved ? "" : "（内存）"}`);
  return true;
}

function handleDeleteRouteCommand(text) {
  const target = parseDeleteRouteTarget(text);
  if (!target) {
    return false;
  }
  if (target.error === "usage") {
    chat("删除路线用法：del 群名称 路线名称/编号；例如 del 群14 6 或 del T对狙 T对狙 第2条");
    return true;
  }
  if (target.error === "group") {
    chat("删除失败：没有找到这个群。请输入 help 查看用法，群名称要完整匹配。");
    return true;
  }
  if (target.error === "group_ambiguous") {
    chat("删除失败：群名称不唯一，请改用群编号，例如 del 群14 6");
    return true;
  }

  const match = findGroupRouteChoiceForDelete(target.group, target.routeText);
  if (match.error === "empty") {
    chat(`删除失败：「${groupDisplayName(target.group)}」没有可删除路线`);
    return true;
  }
  if (match.error === "ambiguous") {
    chat("删除失败：路线名称/编号匹配到多条，请输入更完整的路线名称");
    return true;
  }
  if (!match.choice) {
    chat(`删除失败：「${groupDisplayName(target.group)}」中没有找到路线「${target.routeText}」`);
    return true;
  }

  deleteGroupRouteChoice(target.group, match.choice);
  return true;
}

function preferredRouteChoiceForGroup(group) {
  if (!preferredGroupRoute || !group || preferredGroupRoute.groupId !== group.id || preferredGroupRoute.usesLeft <= 0) {
    return null;
  }

  const targetRouteKey = preferredGroupRoute.routeKey;
  const choice = playableRoutesForGroup(group).find((candidate) => routeKeyForGroupChoice(candidate) === targetRouteKey);
  if (!choice) {
    preferredGroupRoute = null;
    return null;
  }
  return choice;
}

function consumePreferredRouteChoice(group, choice) {
  if (!preferredGroupRoute || !group || !choice) {
    return false;
  }
  if (preferredGroupRoute.groupId !== group.id || preferredGroupRoute.routeKey !== routeKeyForGroupChoice(choice)) {
    return false;
  }

  preferredGroupRoute.usesLeft -= 1;
  if (preferredGroupRoute.usesLeft <= 0) {
    preferredGroupRoute = null;
  }
  return true;
}

function isScriptGeneratedName(text) {
  const trimmed = sanitizeChat(text).trim();
  return SCRIPT_CHAT_NAME_PREFIXES.some((prefix) => trimmed.indexOf(prefix) === 0);
}

function cleanRouteName(text) {
  if (isScriptGeneratedName(text)) {
    return "";
  }
  return sanitizeChat(text).trim().replace(/\s+/g, " ").slice(0, MAX_ROUTE_NAME_LENGTH);
}

function setChatLanguage(language, options = {}) {
  chatLanguage = normalizeChatLanguage(language);
  if (options.persist !== false) {
    ensureStoreShape();
    store.settings.language = chatLanguage;
    const saved = saveStore();
    if (!saved) {
      chatLocalized(
        "语言已在本次会话切换，但保存失败；下次进入可能恢复默认语言。",
        "Language changed for this session, but saving failed; the next launch may return to the default language.",
      );
    }
  }
  if (options.verbose !== false) {
    chatLocalized(
      `语言已切换为${languageName(CHAT_LANGUAGE_ZH)}。以后可在聊天框输入 EN 切换英文。`,
      `Language changed to ${languageName(CHAT_LANGUAGE_EN)}. Type ZH in chat to switch to Chinese.`,
    );
  }
  return chatLanguage;
}

function weaponAliasKey(value) {
  let text = String(value || "").trim().toLowerCase();
  if (text.indexOf("weapon_") === 0) {
    text = text.slice("weapon_".length);
  }
  return text.replace(/[^a-z0-9]/g, "");
}

function resolveHumanDefaultWeapon(value) {
  const key = weaponAliasKey(value);
  const info = HUMAN_DEFAULT_WEAPON_ALIASES[key];
  if (!info || !info.className) {
    return null;
  }
  return { className: info.className, displayName: info.displayName || info.className };
}

function currentHumanDefaultWeaponInfo() {
  return resolveHumanDefaultWeapon(defaultHumanWeapon)
    || resolveHumanDefaultWeapon(DEFAULT_HUMAN_WEAPON)
    || { className: DEFAULT_HUMAN_WEAPON, displayName: DEFAULT_HUMAN_WEAPON };
}

function currentHumanDefaultLoadoutInfo() {
  const selected = currentHumanDefaultWeaponInfo();
  const fallbackPrimary = resolveHumanDefaultWeapon(DEFAULT_HUMAN_PRIMARY_WEAPON)
    || { className: DEFAULT_HUMAN_PRIMARY_WEAPON, displayName: DEFAULT_HUMAN_PRIMARY_WEAPON };
  const fallbackPistol = resolveHumanDefaultWeapon(DEFAULT_HUMAN_PISTOL_WEAPON)
    || { className: DEFAULT_HUMAN_PISTOL_WEAPON, displayName: DEFAULT_HUMAN_PISTOL_WEAPON };
  return {
    primary: PRIMARY_WEAPON_CLASSES[selected.className] ? selected : fallbackPrimary,
    pistol: PISTOL_WEAPON_CLASSES[selected.className] ? selected : fallbackPistol,
  };
}

function defaultWeaponCommandArgument(rawCommand) {
  const text = String(rawCommand || "").trim();
  const explicit = text.match(/^(default_weapon|spawn_weapon|weapon|gun)(?:\s+|=)(.+)$/i);
  if (explicit) {
    return explicit[2].trim();
  }
  if (/^(default_weapon|spawn_weapon|weapon|gun)$/i.test(text)) {
    return "";
  }
  return text;
}

function setHumanDefaultWeapon(info, options = {}) {
  if (!info || !info.className) {
    return false;
  }
  defaultHumanWeapon = info.className;
  if (options.persist === true) {
    ensureStoreShape();
    store.settings.defaultHumanWeapon = defaultHumanWeapon;
    saveStore();
  }
  if (options.verbose !== false) {
    chat(`Default spawn weapon: ${info.displayName}. Type another weapon name in chat to change it.`, true);
  }
  if (options.controller) {
    const slot = options.controller.GetPlayerSlot();
    delete humanRememberedLoadouts[slot];
    delete humanWeaponMemoryCandidates[`${slot}:primary`];
    delete humanWeaponMemoryCandidates[`${slot}:pistol`];
    scheduleHumanSpawnLoadout(options.controller, "default_weapon_changed");
  }
  scheduleThink(0.05);
  return true;
}

function handleDefaultWeaponCommand(player, rawCommand) {
  const arg = defaultWeaponCommandArgument(rawCommand);
  if (arg === "") {
    const current = currentHumanDefaultWeaponInfo();
    chat(`Current default spawn weapon: ${current.displayName}. Examples: deagle, ak47, m4a1s, awp, ssg08.`, true);
    return true;
  }
  const info = resolveHumanDefaultWeapon(arg);
  if (!info) {
    return false;
  }
  setHumanDefaultWeapon(info, { persist: true, controller: player });
  return true;
}

function recoverCfgForPlayer(player) {
  if (!clientCommandsForPlayer(player, CLIENT_RECOVER_COMMANDS)) {
    chat("恢复cfg失败：没有找到可执行命令的玩家");
    return false;
  }
  chat("已恢复常用默认按键；若要查看推荐训练按键，请在聊天框输入 binds");
  return true;
}

function showFullHelp() {
  chat("HELP：完整按键与指令如下");
  for (const line of HELP_BINDING_LINES) {
    chat(line);
  }
  for (const line of HELP_COMMAND_LINES) {
    chat(line);
  }
  chat("Console usage: type say OK / say binds. Manual bind syntax must use double quotes, for example bind y \"ent_fire *autopeek_training_script RunScriptInput ToggleGroupRecord\".");
  chat("提示：聊天框 OK 或控制台 say OK 可安装训练按键；binds/manual_binds 只输出推荐 bind 命令。");
  showShootDifficultyHelp();
}

function handleDifficultyCommand(command) {
  const match = String(command).trim().match(/^(?:chat\s+)?(difficulty|difficult|diff|难度)(?:\s+|=)?(.*)$/i);
  if (!match) {
    return false;
  }

  const arg = (match[2] || "").trim();
  if (!arg) {
    showShootDifficultyHelp();
    return true;
  }

  if (arg === "next" || arg === "cycle" || arg === "+" || arg === "循环") {
    ShootingControl.cycleDifficulty();
    return true;
  }

  const value = Number(arg);
  if (Number.isFinite(value)) {
    setShootDifficulty(value);
    return true;
  }

  chatLocalized(
    "延迟击杀设置：建议使用 delay_kill 0-10000；按6仍可循环预设。",
    "Delayed-kill setup: recommended command is delay_kill 0-10000; key 6 still cycles presets.",
  );
  showShootDifficultyHelp();
  return true;
}

function handleKillDelayCommand(rawCommand) {
  const match = String(rawCommand).trim().match(/^(kill_delay|delay_kill|delay)(?:\s+|=)?(.*)$/i);
  if (!match) {
    return false;
  }

  const arg = (match[2] || "").trim();
  if (!arg) {
    chatLocalized(
      `当前 kill_delay=${killDelayMs}ms；用法：delay_kill 0-10000 / kill_delay 0-10000`,
      `Current kill_delay=${killDelayMs} ms; usage: delay_kill 0-10000 / kill_delay 0-10000.`,
    );
    chatLocalized(
      "推荐延迟：0ms喜欢被育苗大拉提前枪的，50ms高手，300ms一般玩家，1000ms萌新。",
      "Recommended delay: 0 ms if you enjoy being wide-peek pre-fired, 50 ms for experts, 300 ms for average players, 1000 ms for beginners.",
    );
    echoToAllHumanConsoles(`[autopeek_training] current kill_delay=${killDelayMs}ms; usage: say delay_kill 300`);
    return true;
  }

  const value = Number(arg);
  if (!Number.isFinite(value)) {
    chatLocalized(
      "kill_delay 用法：delay_kill 0-10000 / kill_delay 0-10000",
      "kill_delay usage: delay_kill 0-10000 / kill_delay 0-10000.",
    );
    echoToAllHumanConsoles("[autopeek_training] kill_delay usage: say delay_kill 300");
    return true;
  }

  setKillDelayMs(value, { persist: true, reason: "手动设置" });
  return true;
}

function showHelp() {
  chat("Initial position markers: type show_initial position or hide_initial position.");
  chat("指令：check_bot切换严格bot守卫（默认开启：只保留1个敌方bot，友方bot也会清理）");
  chat("绑键：首次进入不自动改键；聊天框 OK 或控制台 say OK 安装训练按键；binds/manual_binds只输出绑定命令");
  chat("HELP：使用键(默认E)选群随机回放，V给准星群追加录制，Y开始/结束群记录，8设置群出生点");
  chat("录制：MOUSE4/MOUSE5开始/停止录制，N设锚点，[ ]切路线槽，-切换记录开枪，=播放当前路线");
  chat("bot：O/P加T/CT bot，M放置bot，I让bot面向你，J/L选左右横拉，K开始架枪，,停止");
  chat("其它：BACKSPACE停止播放，.定住bot，/切FFA，6切射击难度，7/9/0运行bot输入测试");
  chat("指令：help显示本帮助；binds输出推荐绑键；no_remind隐藏提示圆球；recover_cfg恢复常用默认");
  chat("语言：聊天框输入 ZH 切换中文；输入 EN 切换英文，语言设置会永久保存");
  chatLocalized(
    "延迟：delay_kill 0-10000 可手动设置延迟击杀；推荐：0ms喜欢被育苗大拉提前枪的，50ms高手，300ms一般玩家，1000ms萌新",
    "Delay: use delay_kill 0-10000 to set delayed kill; recommended: 0 ms if you enjoy being wide-peek pre-fired, 50 ms experts, 300 ms average, 1000 ms beginners.",
  );
  chat("删除路线：del 群名称 路线名称/编号，例如 del 群14 6");
  chat("经济：自动锁定16000，买枪后会循环补满");
  chat("群回放中输入路线名可固定下两次；聊天框 recover_cfg 可恢复常用默认按键");
}

function confirmOrInstallBinds(player) {
  if (!cfgBackupOkConfirmed()) {
    confirmCfgBackupGate(player);
  }
  installRecommendedBindsDirect(player, "OK");
}

function handleInitialPositionVisibilityCommand(commandText) {
  const normalized = String(commandText || "").toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  const hasPosition = /\bposition\b/.test(normalized);
  const wantsShow = /\bshow\b/.test(normalized);
  const wantsHide = /\bhide\b/.test(normalized);
  if (!hasPosition || wantsShow === wantsHide) {
    return false;
  }

  activeInitialPositionVisible = wantsShow;
  ensureStoreShape();
  store.settings.showInitialPosition = activeInitialPositionVisible;
  saveStore();
  groupSelectorNextDrawAt = 0;
  if (!activeInitialPositionVisible && GroupPlayback.activeGroup()) {
    GroupSelector.hideUnusedLabels(0);
  }
  chat(activeInitialPositionVisible
    ? "Active initial position marker is shown."
    : "Active initial position marker is hidden.");
  return true;
}

function handlePlayerChatCommand(player, text) {
  const rawCommand = sanitizeChat(text).trim();
  const command = rawCommand.toLowerCase();
  if (command === "zh" || command === "cn" || command === "中文") {
    setChatLanguage(CHAT_LANGUAGE_ZH);
    return true;
  }
  if (command === "en" || command === "english") {
    setChatLanguage(CHAT_LANGUAGE_EN);
    return true;
  }
  if (command === "ok") {
    confirmOrInstallBinds(player);
    return true;
  }
  if (command === "binds" || command === "manual_binds" || command === "bind_help" || command === "绑键") {
    showManualBindCommands(player);
    return true;
  }
  if (command === "help" || command === "?" || command === "帮助") {
    showFullHelp();
    return true;
  }
  if (command === "challenge" || command === "challenge start") {
    ChallengePlayback.start(player);
    return true;
  }
  if (command === "challenge stop" || command === "stop challenge" || command === "challenge_cancel") {
    ChallengePlayback.stop(true);
    return true;
  }
  if (command === "recover_cfg" || command === "restore_cfg") {
    recoverCfgForPlayer(player);
    return true;
  }
  if (handleInitialPositionVisibilityCommand(rawCommand)) {
    return true;
  }
  if (handleDeleteRouteCommand(rawCommand)) {
    return true;
  }
  if (handleKillDelayCommand(rawCommand)) {
    return true;
  }
  if (handleDifficultyCommand(command)) {
    return true;
  }
  if (handleDefaultWeaponCommand(player, rawCommand)) {
    return true;
  }
  if (command === "check_bot") {
    ensureStoreShape();
    opponentBotGuardMode = !opponentBotGuardMode;
    store.settings.checkBot = opponentBotGuardMode;
    saveStore();
    nextOpponentBotCheckAt = -1;
    if (opponentBotGuardMode) {
      chat("check_bot已开启：循环确认只保留1个敌方bot，友方bot和额外敌方bot都会清理");
      ensureOpponentBot(true);
    } else {
      chat("check_bot已关闭：不再清理额外bot");
    }
    scheduleThink(0.05);
    return true;
  }
  if (command === "no_remind") {
    noRemindMode = true;
    ensureStoreShape();
    store.settings.noRemind = true;
    saveStore();
    chat("no_remind已开启：放置/播放bot时不再显示圆球提示");
    return true;
  }
  if (command === "remind" || command === "show_remind") {
    noRemindMode = false;
    ensureStoreShape();
    store.settings.noRemind = false;
    saveStore();
    chat("提示圆球已恢复");
    return true;
  }
  return false;
}

function handlePlayerChatForGroupRoutePreference(player, text) {
  if (activePlaybackGroupId < 0 || !player || player.IsBot()) {
    return false;
  }

  const group = groupForId(activePlaybackGroupId);
  if (!group) {
    return false;
  }

  const choice = findGroupRouteChoiceByChat(group, text);
  if (!choice) {
    return false;
  }

  preferredGroupRoute = {
    groupId: group.id,
    routeKey: routeKeyForGroupChoice(choice),
    usesLeft: 2,
  };
  chat(`已指定「${routeDisplayNameForGroupChoice(choice)}」：接下来2次会固定播放这条路线`);
  return true;
}

function beginGroupNaming(groupId, playerSlot) {
  pendingGroupNaming = {
    groupId,
    playerSlot,
  };
}

function cancelGroupNamingFor(groupId) {
  if (pendingGroupNaming && pendingGroupNaming.groupId === groupId) {
    pendingGroupNaming = null;
  }
}

function handlePlayerChatForGroupName(player, text) {
  if (!pendingGroupNaming || !player || player.IsBot()) {
    return false;
  }

  const playerSlot = player.GetPlayerSlot();
  if (pendingGroupNaming.playerSlot >= 0 && playerSlot !== pendingGroupNaming.playerSlot) {
    return false;
  }

  const name = cleanRouteName(text);
  if (!name) {
    return false;
  }

  const groupId = pendingGroupNaming.groupId;
  const group = groupForId(groupId);
  pendingGroupNaming = null;
  if (!group) {
    return true;
  }

  group.name = name;
  group.namedAt = Math.floor(Date.now() / 1000);
  if (group.routes) {
    for (let i = 0; i < group.routes.length; i += 1) {
      const entry = group.routes[i];
      entry.groupName = name;
      const route = store.routes[entry.routeKey || routeKey(entry.routeSlot)];
      if (route) {
        route.groupName = name;
        if (entry.autoName || route.autoName) {
          const order = entry.order || route.groupOrder || i + 1;
          const generatedName = defaultGroupRouteName(group, order);
          entry.name = generatedName;
          entry.autoName = true;
          route.name = generatedName;
          route.autoName = true;
        }
      }
    }
  }
  store.groups[groupKey(groupId)] = group;
  const saved = saveStore();
  GroupSelector.resetLabels();
  scheduleThink();
  chat(`群记录已命名为「${name}」${saved ? "" : "（内存）"}`);
  return true;
}

function beginRouteNaming(routeSlot, playerSlot, targetRouteKey = routeKey(routeSlot)) {
  pendingRouteNaming = {
    routeSlot,
    routeKey: targetRouteKey,
    playerSlot,
    expiresAt: now() + ROUTE_NAME_WINDOW_SECONDS,
  };
  scheduleThink();
}

function handleRouteNamingTimeout() {
  if (pendingRouteNaming && now() >= pendingRouteNaming.expiresAt) {
    pendingRouteNaming = null;
  }
}

function handlePlayerChatForRouteName(player, text) {
  if (!pendingRouteNaming || !player || player.IsBot()) {
    return false;
  }

  const playerSlot = player.GetPlayerSlot();
  if (pendingRouteNaming.playerSlot >= 0 && playerSlot !== pendingRouteNaming.playerSlot) {
    return false;
  }

  const name = cleanRouteName(text);
  if (!name) {
    return false;
  }

  const routeSlot = pendingRouteNaming.routeSlot;
  const targetRouteKey = pendingRouteNaming.routeKey || routeKey(routeSlot);
  const slotRouteKey = routeKey(routeSlot);
  const route = store.routes[targetRouteKey] || store.routes[slotRouteKey];
  pendingRouteNaming = null;
  if (!route) {
    return true;
  }

  route.name = name;
  route.autoName = false;
  route.namedAt = Math.floor(Date.now() / 1000);
  store.routes[targetRouteKey] = route;
  if (targetRouteKey !== slotRouteKey && store.routes[slotRouteKey] && store.routes[slotRouteKey].savedAt === route.savedAt) {
    store.routes[slotRouteKey].name = name;
    store.routes[slotRouteKey].autoName = false;
    store.routes[slotRouteKey].namedAt = route.namedAt;
  }
  if (route.groupId >= 0) {
    const group = groupForId(route.groupId);
    if (group && group.routes) {
      for (const entry of group.routes) {
        if (entry.routeKey === targetRouteKey || (!entry.routeKey && entry.routeSlot === routeSlot)) {
          entry.name = name;
          entry.autoName = false;
          const groupedRoute = entry.routeKey ? store.routes[entry.routeKey] : null;
          if (groupedRoute) {
            groupedRoute.name = name;
            groupedRoute.autoName = false;
            groupedRoute.namedAt = route.namedAt;
          }
        }
      }
    }
  }
  const saved = saveStore();
  chat(`路线槽${routeSlot}已命名为「${name}」${saved ? "" : "（内存）"}`);
  return true;
}

function playerSpawnSnapshot(pawn) {
  const rawOrigin = pawn.GetAbsOrigin();
  const origin = worldPositionIsUsable(rawOrigin) ? rawOrigin : ctHomePosition();
  const angles = pawn.GetEyeAngles();
  return {
    position: vecArray(origin),
    angles: [q(angles.pitch, 3), q(angles.yaw, 3), 0],
    savedAt: Math.floor(Date.now() / 1000),
  };
}

function completeSettledGroupSpawn(request) {
  const group = groupForId(request.groupId);
  const human = controllerAtSlot(request.humanSlot) || findHuman();
  const pawn = pawnOf(human);
  if (!group || !pawn) {
    chat("稳定记录失败：群或玩家不存在");
    return;
  }

  const origin = pawn.GetAbsOrigin();
  if (!worldPositionIsUsable(origin)) {
    abortUnsafeHumanActivity(human, origin, "invalid_group_spawn");
    teleportHumanToDefaultSpawn(human, "invalid_group_spawn");
    chat("Group spawn was outside the playable world; reset to CT spawn instead of saving it.");
    return;
  }

  group.playerSpawn = playerSpawnSnapshot(pawn);
  group.updatedAt = group.playerSpawn.savedAt;
  store.groups[groupKey(group.id)] = group;
  Instance.DebugSphere({
    center: pawn.GetAbsOrigin(),
    radius: 24,
    duration: 6,
    color: { r: 120, g: 255, b: 120, a: 255 },
  });
  const saved = saveStore();
  GroupSelector.resetLabels();
  scheduleThink();
  chat(`已设置「${group.name}」的玩家出生点（落稳后）${saved ? "" : "（内存）"}`);
}

function completeSettledAnchor(request) {
  const human = controllerAtSlot(request.humanSlot) || findHuman();
  const pawn = pawnOf(human);
  if (!pawn) {
    chat("稳定记录失败：玩家不存在");
    return;
  }

  selectedAnchor = makeAnchor(pawn.GetAbsOrigin(), pawn.GetEyeAngles().yaw);
  drawAnchor(selectedAnchor);
  chat("已设置录制锚点（落稳后）");
}

function completeSettledBotPlacement(request) {
  const bot = controllerAtSlot(request.botSlot);
  const botPawn = pawnOf(bot);
  if (!botPawn) {
    chat("稳定放置失败：bot 不存在");
    return;
  }

  const anchor = makeAnchor(botPawn.GetAbsOrigin(), request.yaw, 0, 0);
  placementDraft = { botSlot: request.botSlot, anchor, directionSet: false };
  selectedAnchor = anchor;
  teleportPawnToAnchor(botPawn, anchor);
  lockBotView(request.botSlot, anchor);
  drawAnchor(anchor);
  chat("已放置 bot 起点（落稳后）；再次按 M，在准星位置指定朝向");
}

function handlePendingSettledPoint() {
  if (!pendingSettledPoint || now() < pendingSettledPoint.at) {
    return;
  }

  const request = pendingSettledPoint;
  pendingSettledPoint = null;
  if (request.kind === "groupSpawn") {
    completeSettledGroupSpawn(request);
  } else if (request.kind === "anchor") {
    completeSettledAnchor(request);
  } else if (request.kind === "botPlacement") {
    completeSettledBotPlacement(request);
  }
}

function attachRouteToGroup(savedRoute, groupId) {
  const group = groupForId(groupId);
  if (!group) {
    return "";
  }

  if (!group.routes) {
    group.routes = [];
  }

  const order = group.routes.length + 1;
  const key = groupRouteKey(group.id, order, savedRoute.savedAt);
  const autoName = routeNameLooksDefault(savedRoute.name, savedRoute.slot) || savedRoute.autoName;
  if (autoName) {
    savedRoute.name = defaultGroupRouteName(group, order);
    savedRoute.autoName = true;
  }
  savedRoute.groupId = group.id;
  savedRoute.groupName = group.name || defaultGroupName(group.id);
  savedRoute.groupOrder = order;
  savedRoute.routeKey = key;
  group.routes.push({
    routeSlot: savedRoute.slot,
    routeKey: key,
    name: savedRoute.name,
    autoName: !!savedRoute.autoName,
    savedAt: savedRoute.savedAt,
    duration: savedRoute.duration,
    order,
  });
  store.routes[key] = savedRoute;
  group.updatedAt = savedRoute.savedAt;
  store.groups[groupKey(group.id)] = group;
  scheduleThink();
  return `，${group.name || defaultGroupName(group.id)} 第${order}条`;
}

const GroupRecorder = {
  toggle() {
    if (activeGroupId >= 0) {
      this.stop();
    } else {
      this.start();
    }
  },

  start() {
    ensureStoreShape();
    const groupId = store.nextGroupId;
    store.nextGroupId += 1;
    const group = {
      schema: SAVE_SCHEMA,
      id: groupId,
      name: defaultGroupName(groupId),
      startedAt: Math.floor(Date.now() / 1000),
      endedAt: null,
      routes: [],
      playerSpawn: null,
    };
    store.groups[groupKey(groupId)] = group;
    activeGroupId = groupId;
    const human = findHuman();
    beginGroupNaming(groupId, human ? human.GetPlayerSlot() : -1);
    const saved = saveStore();
    chat(`已开始群记录「${group.name}」；下一条聊天可命名，直接开始录制则保留默认名${saved ? "" : "（内存）"}`);
  },

  stop() {
    const group = activeGroup();
    if (!group) {
      activeGroupId = -1;
      chat("当前没有群记录");
      return;
    }

    cancelGroupNamingFor(group.id);
    group.endedAt = Math.floor(Date.now() / 1000);
    store.groups[groupKey(group.id)] = group;
    activeGroupId = -1;
    const saved = saveStore();
    const spawnText = group.playerSpawn ? "，已记录玩家出生点" : "，未设置玩家出生点";
    chat(`已结束群记录「${group.name}」：${group.routes.length}条路线${spawnText}${saved ? "" : "（内存）"}`);
  },

  appendAimed() {
    const groups = savedGroupsWithSpawn();
    if (groups.length === 0) {
      chat("追加失败：没有带出生点和路线的群");
      return;
    }

    const human = findHuman();
    const pawn = pawnOf(human);
    const group = GroupSelector.aimedGroup(pawn, groups);
    if (!group) {
      chat("追加失败：准星没有对准群出生点");
      return;
    }

    Replay.stop(false, true);
    Autopeek.stop(false);
    stopping = null;
    activeGroupId = group.id;
    group.endedAt = null;
    store.groups[groupKey(group.id)] = group;
    const saved = saveStore();
    chat(`已进入「${groupDisplayName(group)}」追加录制：用 MOUSE4/MOUSE5 录路线，Y 结束追加${saved ? "" : "（内存）"}`);
  },

  setPlayerSpawn() {
    const group = activeGroup();
    if (!group) {
      chat("设置失败：先按 Y 开始群记录");
      return;
    }

    const human = findHuman();
    const pawn = pawnOf(human);
    if (!pawn) {
      chat("设置失败：需要一个存活玩家");
      return;
    }

    pendingSettledPoint = {
      kind: "groupSpawn",
      groupId: group.id,
      humanSlot: human.GetPlayerSlot(),
      at: now() + TELEPORT_SETTLE_SECONDS,
    };
    teleportPawnForSettle(pawn, pawn.GetAbsOrigin(), yawOnlyAngles(pawn.GetEyeAngles()));
    chat("正在稳定群出生点：已先抬高约0.5m，1秒后保存落稳位置");
    scheduleThink(TELEPORT_SETTLE_SECONDS);
  },
};

const GroupSelector = {
  shouldThink() {
    return savedGroupsWithSpawn().length > 0;
  },

  resetLabels() {
    groupSelectorLabels = null;
  },

  resetInputGate(delay = GROUP_SELECTOR_INPUT_ARM_DELAY) {
    resetGroupSelectorInputGate(delay);
  },

  labels() {
    if (groupSelectorLabels) {
      return groupSelectorLabels;
    }

    const labels = [];
    for (let i = 1; i <= GROUP_SELECTOR_MAX_LABELS; i += 1) {
      const name = `${GROUP_SELECTOR_LABEL_PREFIX}${String(i).padStart(2, "0")}`;
      try {
        const label = Instance.FindEntityByName(name);
        if (label) {
          labels.push(label);
        }
      } catch {
      }
    }
    if (labels.length > 0) {
      groupSelectorLabels = labels;
      return groupSelectorLabels;
    }

    try {
      groupSelectorLabels = Instance.FindEntitiesByClass("point_worldtext")
        .filter((entity) => {
          try {
            return entity.GetEntityName().indexOf(GROUP_SELECTOR_LABEL_PREFIX) >= 0;
          } catch {
            return false;
          }
        })
        .sort((a, b) => a.GetEntityName().localeCompare(b.GetEntityName()))
        .slice(0, GROUP_SELECTOR_MAX_LABELS);
    } catch {
      groupSelectorLabels = [];
    }

    return groupSelectorLabels;
  },

  diagnostic(groups, human, pawn, hoveredGroup) {
    const current = now();
    if (current < groupSelectorLastDiagnosticAt + 10) {
      return;
    }
    groupSelectorLastDiagnosticAt = current;
    const labels = this.labels();
    Instance.Msg(`[${CHAT_PREFIX}] selector groups=${groups.length} labels=${labels.length} human=${human ? "yes" : "no"} pawn=${pawn ? "yes" : "no"} hovered=${hoveredGroup ? groupDisplayName(hoveredGroup) : "none"}`);
  },

  hideUnusedLabels(usedCount) {
    const labels = this.labels();
    for (let i = usedCount; i < labels.length; i += 1) {
      try {
        labels[i].Teleport({
          position: { x: 0, y: 0, z: -12000 - i * 16 },
          angles: { pitch: 0, yaw: 0, roll: 0 },
          velocity: { x: 0, y: 0, z: 0 },
          angularVelocity: { x: 0, y: 0, z: 0 },
        });
        Instance.EntFireAtTarget({ target: labels[i], input: "SetMessage", value: "" });
      } catch {
      }
    }
  },

  labelText(group, hovered) {
    const routeCount = playableRoutesForGroup(group).length;
    const prefix = hovered ? ">> E" : "E";
    return `${prefix} ${groupDisplayName(group)} (${routeCount})`;
  },

  updateLabels(groups, hoveredGroup) {
    const labels = this.labels();
    const count = Math.min(labels.length, groups.length);
    for (let i = 0; i < count; i += 1) {
      const group = groups[i];
      const label = labels[i];
      const hovered = hoveredGroup && hoveredGroup.id === group.id;
      const labelPosition = groupSpawnPosition(group, hovered ? GROUP_SELECTOR_LABEL_HEIGHT + 12 : GROUP_SELECTOR_LABEL_HEIGHT);
      if (!labelPosition) {
        continue;
      }
      try {
        label.Teleport({
          position: labelPosition,
          angles: { pitch: 0, yaw: 0, roll: 0 },
          velocity: { x: 0, y: 0, z: 0 },
          angularVelocity: { x: 0, y: 0, z: 0 },
        });
        Instance.EntFireAtTarget({ target: label, input: "SetMessage", value: this.labelText(group, hovered) });
      } catch {
      }
    }
    this.hideUnusedLabels(count);
  },

  drawMarkers(groups, hoveredGroup) {
    for (const group of groups) {
      const position = groupSpawnPosition(group);
      if (!position) {
        continue;
      }
      const hovered = hoveredGroup && hoveredGroup.id === group.id;
      const color = hovered
        ? { r: 255, g: 220, b: 80, a: 255 }
        : { r: 80, g: 220, b: 255, a: 220 };
      drawGroundShadow(
        position,
        hovered ? 38 : 28,
        GROUP_SELECTOR_MARKER_DURATION,
        hovered ? { r: 80, g: 60, b: 0, a: 210 } : { r: 0, g: 0, b: 0, a: 165 },
      );
      Instance.DebugSphere({
        center: position,
        radius: hovered ? 34 : 24,
        duration: GROUP_SELECTOR_MARKER_DURATION,
        color,
      });
      Instance.DebugLine({
        start: position,
        end: add(position, { x: 0, y: 0, z: GROUP_SELECTOR_LABEL_HEIGHT - 14 }),
        duration: GROUP_SELECTOR_MARKER_DURATION,
        color,
      });
    }
  },

  visibleBotSpawnRoute(activeGroup) {
    if (!activeGroup) {
      return null;
    }
    if (playback && playback.loopGroupId === activeGroup.id && playback.route && playback.route.anchor) {
      return playback.route;
    }
    if (pendingReplay && pendingReplay.loopGroupId === activeGroup.id) {
      const route = store.routes[pendingReplay.routeKey || routeKey(pendingReplay.routeSlot)];
      if (route && route.anchor) {
        return route;
      }
    }
    return null;
  },

  drawBotSpawnMarker(activeGroup) {
    if (noRemindMode) {
      return;
    }
    const route = this.visibleBotSpawnRoute(activeGroup);
    if (!route || !route.anchor || !route.anchor.position) {
      return;
    }
    const position = anchorPosition(route.anchor);
    const color = { r: 255, g: 90, b: 40, a: 255 };
    drawGroundShadow(position, 26, GROUP_SELECTOR_MARKER_DURATION, { r: 90, g: 0, b: 0, a: 190 });
    Instance.DebugSphere({
      center: position,
      radius: 22,
      duration: GROUP_SELECTOR_MARKER_DURATION,
      color,
    });
    Instance.DebugLine({
      start: position,
      end: add(position, { x: 0, y: 0, z: GROUP_SELECTOR_BOT_MARKER_HEIGHT }),
      duration: GROUP_SELECTOR_MARKER_DURATION,
      color,
    });
  },

  aimedGroup(pawn, groups) {
    if (!pawn) {
      return null;
    }
    const eye = pawn.GetEyePosition();
    const forward = norm3D(getForward(pawn.GetEyeAngles()));
    let bestHit = null;
    let bestHitMiss = Infinity;
    let bestHitAlong = Infinity;
    let bestNear = null;
    let bestNearDistance = Infinity;

    for (const group of groups) {
      const target = groupSpawnPosition(group, GROUP_SELECTOR_AIM_CENTER_Z);
      if (!target) {
        continue;
      }
      const delta = sub(target, eye);
      const distance = len3D(delta);
      if (distance < bestNearDistance) {
        bestNear = group;
        bestNearDistance = distance;
      }

      const along = dot(delta, forward);
      if (along <= 0) {
        continue;
      }

      const closestPoint = add(eye, scale(forward, along));
      const missDistance = len3D(sub(target, closestPoint));
      if (
        missDistance <= GROUP_SELECTOR_AIM_RADIUS
        && (
          missDistance < bestHitMiss - 0.001
          || (Math.abs(missDistance - bestHitMiss) <= 0.001 && along < bestHitAlong)
        )
      ) {
        bestHit = group;
        bestHitMiss = missDistance;
        bestHitAlong = along;
      }
    }

    if (bestHit) {
      return bestHit;
    }
    return bestNearDistance < GROUP_SELECTOR_AIM_NEAR_DISTANCE ? bestNear : null;
  },

  nearestGroup(pawn, groups) {
    if (!pawn || groups.length === 0) {
      return groups[0] || null;
    }
    const origin = pawn.GetAbsOrigin();
    let best = null;
    let bestDistance = Infinity;
    for (const group of groups) {
      const target = groupSpawnPosition(group);
      if (!target) {
        continue;
      }
      const distance = len3D(sub(target, origin));
      if (distance < bestDistance) {
        best = group;
        bestDistance = distance;
      }
    }
    return best || groups[0] || null;
  },

  groupForUse(pawn, groups, hoveredGroup) {
    return hoveredGroup || this.nearestGroup(pawn, groups);
  },

  teleportHumanToSpawn(group) {
    const human = findHuman();
    const pawn = pawnOf(human);
    if (!pawn || !group || !group.playerSpawn) {
      return false;
    }
    const spawnPosition = vectorOrNull(group.playerSpawn.position);
    const targetPosition = worldPositionIsUsable(spawnPosition) ? spawnPosition : ctHomePosition();
    if (!worldPositionIsUsable(spawnPosition)) {
      Instance.Msg(`[${CHAT_PREFIX}] group ${group.id || -1} has invalid player spawn; using CT spawn fallback`);
    }
    pawn.Teleport({
      position: safeRuntimeTeleportPosition(targetPosition, pawn),
      angles: yawOnlyArrayAngles(group.playerSpawn.angles || [0, 0, 0]),
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
    });
    return true;
  },

  startRandomRoute(group) {
    GroupPlayback.start(group);
  },

  exitActiveGroup() {
    if (activePlaybackGroupId < 0) {
      return false;
    }
    Replay.stop(false);
    GroupPlayback.stop(true);
    this.hideUnusedLabels(0);
    groupSelectorNextDrawAt = 0;
    this.resetInputGate(0.35);
    return true;
  },

  selectAimed() {
    if (this.exitActiveGroup()) {
      return;
    }

    const groups = savedGroupsWithSpawn();
    if (groups.length === 0) {
      chat("选择失败：没有带出生点和路线的群");
      return;
    }

    const human = findHuman();
    const pawn = pawnOf(human);
    const aimed = this.aimedGroup(pawn, groups);
    const group = this.groupForUse(pawn, groups, aimed);
    if (!group) {
      chat("选择失败：没有可用群");
      return;
    }
    if (!aimed) {
      chat(`未精确对准，使用最近群：${groupDisplayName(group)}`);
    }

    this.startRandomRoute(group);
  },

  handleUseInput(pawn, groups, hoveredGroup) {
    const pressed = pawn ? safeInputPressed(pawn, CSInputs.USE) : false;
    const current = now();

    if (!pressed) {
      groupSelectorUseHeld = false;
      if (current >= groupSelectorReadyAt) {
        groupSelectorNeedsRelease = false;
      }
      return;
    }

    if (groupSelectorUseHeld) {
      return;
    }

    groupSelectorUseHeld = true;
    if (groupSelectorNeedsRelease || current < groupSelectorReadyAt || !hoveredGroup) {
      if (groupSelectorNeedsRelease || current < groupSelectorReadyAt) {
        return;
      }
    }

    if (activePlaybackGroupId >= 0) {
      this.exitActiveGroup();
      return;
    }

    const group = this.groupForUse(pawn, groups, hoveredGroup);
    if (!group) {
      return;
    }
    chat(hoveredGroup
      ? "按键触发：E 选择群并随机回放；再摁一次 E 键退出"
      : `按键触发：E 使用最近群 ${groupDisplayName(group)}；再摁一次 E 键退出`);
    chat("Press E again to exit the active spawn-group practice.");
    this.startRandomRoute(group);
    this.resetInputGate(0.4);
  },

  tick() {
    const groups = savedGroupsWithSpawn();
    if (groups.length === 0) {
      this.hideUnusedLabels(0);
      return;
    }

    const human = findHuman();
    const pawn = pawnOf(human);
    const activeGroup = GroupPlayback.activeGroup();
    const visibleGroups = activeGroup ? [activeGroup] : groups;
    const aimedGroup = this.aimedGroup(pawn, groups);
    const hoveredGroup = activeGroup || aimedGroup;
    const showInitialMarkers = !activeGroup || activeInitialPositionVisible;
    this.diagnostic(groups, human, pawn, hoveredGroup);
    this.handleUseInput(pawn, groups, hoveredGroup);
    if (now() >= groupSelectorNextDrawAt) {
      if (showInitialMarkers) {
        this.updateLabels(visibleGroups, hoveredGroup);
        this.drawMarkers(visibleGroups, hoveredGroup);
      } else {
        this.hideUnusedLabels(0);
      }
      this.drawBotSpawnMarker(activeGroup);
      groupSelectorNextDrawAt = now() + GROUP_SELECTOR_REFRESH_INTERVAL;
    }

    if (activeGroup) {
      Instance.DebugScreenText({
        text: `E 退出 ${groupDisplayName(activeGroup)}`,
        x: 0.42,
        y: 0.58,
        duration: 0.08,
        color: { r: 255, g: 120, b: 120, a: 255 },
      });
    } else if (hoveredGroup) {
      const routeCount = playableRoutesForGroup(hoveredGroup).length;
      Instance.DebugScreenText({
        text: `E 选择 ${groupDisplayName(hoveredGroup)} (${routeCount}条)；再摁一次 E 键退出`,
        x: 0.42,
        y: 0.58,
        duration: 0.08,
        color: { r: 255, g: 220, b: 80, a: 255 },
      });
    }

  },
};

const GroupPlayback = {
  activeGroup() {
    return activePlaybackGroupId >= 0 ? groupForId(activePlaybackGroupId) : null;
  },

  stop(verbose = false) {
    activePlaybackGroupId = -1;
    pendingGroupReplay = null;
    preferredGroupRoute = null;
    clearPendingFinishKill();
    if (verbose) {
      chat("已停止群循环回放");
    }
  },

  start(group) {
    if (recording) {
      chat("选择失败：正在录制，先停止录制");
      return;
    }
    if (!group || !group.playerSpawn) {
      chat("选择失败：群没有玩家出生点");
      return;
    }
    if (playableRoutesForGroup(group).length === 0) {
      chat(`选择失败：「${groupDisplayName(group)}」没有可回放路线`);
      return;
    }
    if (!GroupSelector.teleportHumanToSpawn(group)) {
      chat("选择失败：需要一个存活玩家");
      return;
    }

    activePlaybackGroupId = group.id;
    Replay.stop(false);
    Autopeek.stop(false);
    stopping = null;
    this.scheduleNext(0, "选中群", false);
  },

  scheduleNext(delay, reason = "", teleportHuman = false) {
    const group = this.activeGroup();
    if (!group) {
      pendingGroupReplay = null;
      return;
    }
    pendingGroupReplay = {
      groupId: group.id,
      at: now() + Math.max(0, delay),
      reason,
      teleportHuman,
    };
    scheduleThink(Math.max(0.05, delay));
  },

  tryStartPending() {
    if (!pendingGroupReplay || now() < pendingGroupReplay.at) {
      return;
    }
    if (recording) {
      return;
    }

    const request = pendingGroupReplay;
    const group = groupForId(request.groupId);
    if (!group) {
      this.stop(false);
      return;
    }

    const preferredChoice = preferredRouteChoiceForGroup(group);
    const choice = preferredChoice || balancedPlayableRouteForGroup(group, lastReplayRouteKeyByGroup[group.id] || "");
    if (!choice) {
      pendingGroupReplay = null;
      chat(`群循环停止：「${groupDisplayName(group)}」没有可回放路线`);
      return;
    }

    if (request.teleportHuman && !GroupSelector.teleportHumanToSpawn(group)) {
      pendingGroupReplay.at = now() + 0.25;
      scheduleThink(0.25);
      return;
    }

    pendingGroupReplay = null;
    const targetRouteKey = routeKeyForGroupChoice(choice);
    lastReplayRouteKeyByGroup[group.id] = targetRouteKey;
    const usingPreferred = !!preferredChoice && routeKeyForGroupChoice(preferredChoice) === targetRouteKey;
    if (usingPreferred) {
      consumePreferredRouteChoice(group, choice);
    }
    const routeName = routeDisplayNameForGroupChoice(choice);
    const reasonText = request.reason ? `${request.reason}，` : "";
    const modeText = usingPreferred ? "指定回放" : "随机回放";
    chat(`${reasonText}${modeText}「${groupDisplayName(group)}」中的「${routeName}」`);
    emitAdminRouteEvent("route_start", group, choice, { reason: request.reason || "", mode: modeText });
    Replay.startRouteByKey(targetRouteKey, groupDisplayName(group), { loopGroupId: group.id });
  },

  onBotRespawn(controller) {
    if (activePlaybackGroupId < 0 || recording || pendingGroupReplay || pendingReplay) {
      return;
    }
    if (!controller || !controller.IsBot()) {
      return;
    }
    Replay.stop(false);
    this.scheduleNext(0.05, "bot已复活", false);
  },

  onBotDeath(controller) {
    if (activePlaybackGroupId < 0 || recording || pendingGroupReplay || pendingReplay) {
      return;
    }
    if (!controller || !controller.IsBot()) {
      return;
    }
    if (pendingFinishKill && pendingFinishKill.botSlot === controller.GetPlayerSlot()) {
      clearPendingFinishKill();
    }
    Replay.stop(false);
    this.scheduleNext(0, "bot已死亡", false);
  },

  onHumanRespawn(controller) {
    if (activePlaybackGroupId < 0 || recording || !controller || controller.IsBot()) {
      return;
    }
    const group = this.activeGroup();
    if (!group) {
      this.stop(false);
      return;
    }
    Replay.stop(false);
    Autopeek.stop(false);
    stopping = null;
    GroupSelector.teleportHumanToSpawn(group);
    this.scheduleNext(Math.max(0, HUMAN_DEATH_REPLAY_DELAY_SECONDS - REPLAY_SETTLE_SECONDS), "玩家已复活", false);
  },
};

function challengeSaveText() {
  if (NODATA_DISABLE_CHALLENGE_DATA) {
    return "";
  }
  return decodeBase64Utf8(CHALLENGE_SAVE_CHUNKS.join(""));
}

function loadChallengeStore() {
  if (challengeStoreLoaded && challengeStore) {
    return challengeStore;
  }
  if (NODATA_DISABLE_CHALLENGE_DATA) {
    challengeStore = createEmptyStore();
    challengeStoreLoaded = true;
    return challengeStore;
  }
  try {
    const parsed = JSON.parse(challengeSaveText());
    challengeStore = cleanTrainingStore(parsed);
    challengeStoreLoaded = true;
    return challengeStore;
  } catch (error) {
    challengeStore = createEmptyStore();
    challengeStoreLoaded = true;
    Instance.Msg(`[${CHAT_PREFIX}] Challenge hidden data failed: ${error}`);
    return challengeStore;
  }
}

function routeFromGroupEntryInStore(targetStore, entry) {
  if (!targetStore || !entry) {
    return null;
  }
  return targetStore.routes[routeKeyFromGroupEntry(entry)] || null;
}

function playableRoutesForGroupInStore(targetStore, group) {
  if (!targetStore || !group || !group.routes) {
    return [];
  }
  const routes = [];
  for (const entry of group.routes) {
    const route = routeFromGroupEntryInStore(targetStore, entry);
    if (routeIsPlayable(route)) {
      routes.push({ entry, route });
    }
  }
  return routes;
}

function playableChallengeGroups() {
  const hiddenStore = loadChallengeStore();
  return Object.values(hiddenStore.groups || {})
    .filter((group) => groupIsPlayableWithRoutes(group, hiddenStore.routes || {}))
    .sort((a, b) => Number(a.id) - Number(b.id));
}

function shuffledChallengeGroups(limit = CHALLENGE_ROUND_COUNT) {
  const groups = playableChallengeGroups();
  for (let index = groups.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = groups[index];
    groups[index] = groups[swapIndex];
    groups[swapIndex] = temp;
  }
  return groups.slice(0, Math.min(limit, groups.length)).map((group) => group.id);
}

function randomChallengeRouteChoice(group) {
  const routes = playableRoutesForGroupInStore(loadChallengeStore(), group);
  if (routes.length === 0) {
    return null;
  }
  return routes[Math.floor(Math.random() * routes.length)];
}

function challengeRateText(success, completed) {
  if (completed <= 0) {
    return "0%";
  }
  return `${Math.round((success / completed) * 100)}%`;
}

const ChallengePlayback = {
  isActive() {
    return !!challengeSession;
  },

  start(player) {
    const hiddenStore = loadChallengeStore();
    const queue = shuffledChallengeGroups(CHALLENGE_ROUND_COUNT);
    if (queue.length === 0) {
      chat("challenge 启动失败：没有隐藏可播放群。");
      return false;
    }

    this.stop(false);
    GroupPlayback.stop(false);
    Replay.stop(false);
    Autopeek.stop(false);
    clearPendingFinishKill();
    stopping = null;
    challengeSession = {
      queue,
      total: queue.length,
      completed: 0,
      success: 0,
      current: null,
      pendingStartAt: now() + 0.05,
      waitingForRespawn: false,
      injected: null,
      startedAt: now(),
      lastResult: "",
      hiddenSummary: CHALLENGE_SAVE_METADATA && CHALLENGE_SAVE_METADATA.hiddenSummary
        ? CHALLENGE_SAVE_METADATA.hiddenSummary
        : { playableGroups: playableChallengeGroups().length, routes: Object.keys(hiddenStore.routes || {}).length },
    };
    chat(`challenge 开始：从 ${challengeSession.hiddenSummary.playableGroups || queue.length} 个隐藏群随机抽取 ${queue.length} 个。`);
    this.schedule();
    this.startNext("start");
    return true;
  },

  stop(verbose = true) {
    if (!challengeSession) {
      if (verbose) {
        chat("当前没有 challenge。");
      }
      return false;
    }
    this.removeInjected();
    Replay.stop(false);
    clearPendingFinishKill();
    challengeSession = null;
    if (verbose) {
      chat("challenge 已停止。");
    }
    return true;
  },

  schedule(delay = 0.05) {
    scheduleThink(Math.max(0.01, delay));
  },

  removeInjected() {
    if (!challengeSession || !challengeSession.injected) {
      return;
    }
    const injected = challengeSession.injected;
    ensureStoreShape();
    if (injected.previousGroup) {
      store.groups[injected.groupKey] = cloneData(injected.previousGroup);
    } else {
      delete store.groups[injected.groupKey];
    }
    for (const routeKeyValue of injected.routeKeys || []) {
      if (Object.prototype.hasOwnProperty.call(injected.previousRoutes || {}, routeKeyValue)) {
        store.routes[routeKeyValue] = cloneData(injected.previousRoutes[routeKeyValue]);
      } else {
        delete store.routes[routeKeyValue];
      }
    }
    challengeSession.injected = null;
  },

  injectGroup(group) {
    if (!challengeSession || !group) {
      return false;
    }
    this.removeInjected();
    ensureStoreShape();
    const hiddenStore = loadChallengeStore();
    const key = groupKey(group.id);
    const routeKeys = [];
    const previousRoutes = {};
    const previousGroup = store.groups[key] ? cloneData(store.groups[key]) : null;
    store.groups[key] = cloneData(group);
    for (const entry of group.routes || []) {
      const routeKeyValue = routeKeyFromGroupEntry(entry);
      const route = hiddenStore.routes[routeKeyValue];
      if (!routeIsPlayable(route)) {
        continue;
      }
      routeKeys.push(routeKeyValue);
      if (store.routes[routeKeyValue]) {
        previousRoutes[routeKeyValue] = cloneData(store.routes[routeKeyValue]);
      }
      store.routes[routeKeyValue] = cloneData(route);
    }
    challengeSession.injected = { groupKey: key, routeKeys, previousGroup, previousRoutes };
    return routeKeys.length > 0;
  },

  startNext(reason = "") {
    if (!challengeSession) {
      return false;
    }
    if (challengeSession.completed >= challengeSession.total) {
      this.finish();
      return true;
    }

    const hiddenStore = loadChallengeStore();
    const groupId = challengeSession.queue[challengeSession.completed];
    const group = hiddenStore.groups[groupKey(groupId)];
    const choice = randomChallengeRouteChoice(group);
    if (!group || !choice) {
      this.completeCurrent(false, "missing_group", 0.05, false);
      return true;
    }

    const human = findHuman();
    const humanPawn = pawnOf(human);
    if (!human || !humanPawn) {
      challengeSession.pendingStartAt = now() + 0.25;
      this.schedule(0.25);
      return true;
    }

    if (!this.injectGroup(group)) {
      this.completeCurrent(false, "inject_failed", 0.05, false);
      return true;
    }

    GroupSelector.teleportHumanToSpawn(group);
    Replay.stop(false);
    Autopeek.stop(false);
    clearPendingFinishKill();
    stopping = null;
    const routeKeyValue = routeKeyForGroupChoice(choice);
    challengeSession.current = {
      groupId: group.id,
      routeKey: routeKeyValue,
      routeDuration: choice.route.duration || 0,
      startedAt: now(),
      routeStartedAt: now(),
    };
    challengeSession.pendingStartAt = -1;
    challengeSession.waitingForRespawn = false;
    emitAdminRouteEvent("challenge_route_start", group, choice, { reason: reason || "challenge", mode: "challenge" });
    chat(`challenge ${challengeSession.completed + 1}/${challengeSession.total}：${groupDisplayName(group)} / ${routeDisplayNameForGroupChoice(choice)}`);
    Replay.startRouteByKey(routeKeyValue, `challenge ${groupDisplayName(group)}`, { loopGroupId: -1 });
    this.schedule();
    return true;
  },

  completeCurrent(success, reason = "", delay = CHALLENGE_NEXT_DELAY_SECONDS, stopReplay = true) {
    if (!challengeSession || !challengeSession.current) {
      return false;
    }
    if (stopReplay) {
      Replay.stop(false);
      clearPendingFinishKill();
    }
    if (success) {
      challengeSession.success += 1;
    }
    challengeSession.completed += 1;
    challengeSession.lastResult = success ? `success:${reason}` : `miss:${reason}`;
    chat(`challenge 进度：成功 ${challengeSession.success}/${challengeSession.completed}，命中率 ${challengeRateText(challengeSession.success, challengeSession.completed)}，剩余 ${Math.max(0, challengeSession.total - challengeSession.completed)}`);
    challengeSession.current = null;
    this.removeInjected();
    if (challengeSession.completed >= challengeSession.total) {
      this.finish();
      return true;
    }
    challengeSession.pendingStartAt = now() + Math.max(0.05, delay);
    this.schedule(delay);
    return true;
  },

  finish() {
    if (!challengeSession) {
      return false;
    }
    const success = challengeSession.success;
    const completed = challengeSession.completed;
    const total = challengeSession.total;
    const rate = challengeRateText(success, completed);
    this.removeInjected();
    Replay.stop(false);
    clearPendingFinishKill();
    chat(`challenge 完成：成功 ${success}/${total}，命中率 ${rate}。`);
    challengeSession = null;
    return true;
  },

  onBotDeath(controller) {
    if (!challengeSession || !challengeSession.current || !controller || !controller.IsBot()) {
      return false;
    }
    this.completeCurrent(true, "bot_killed", CHALLENGE_NEXT_DELAY_SECONDS, true);
    return true;
  },

  onHumanDeath(controller) {
    if (!challengeSession || !challengeSession.current || !controller || controller.IsBot()) {
      return false;
    }
    this.completeCurrent(false, "player_dead", HUMAN_DEATH_REPLAY_DELAY_SECONDS, true);
    if (challengeSession) {
      challengeSession.waitingForRespawn = true;
    }
    return true;
  },

  onHumanRespawn(controller) {
    if (!challengeSession || !controller || controller.IsBot()) {
      return false;
    }
    challengeSession.waitingForRespawn = false;
    challengeSession.pendingStartAt = now() + Math.max(0.05, HUMAN_DEATH_REPLAY_DELAY_SECONDS - REPLAY_SETTLE_SECONDS);
    this.schedule(0.1);
    return true;
  },

  drawHud() {
    if (!challengeSession) {
      return false;
    }
    const completed = challengeSession.completed;
    const total = challengeSession.total;
    const remaining = Math.max(0, total - completed);
    const rate = challengeRateText(challengeSession.success, completed);
    const currentText = challengeSession.current
      ? `Now ${completed + 1}/${total}`
      : `Next ${Math.min(completed + 1, total)}/${total}`;
    Instance.DebugScreenText({
      text: `CHALLENGE  ${currentText}  Success ${challengeSession.success}  Hit ${rate}  Left ${remaining}`,
      x: 0.34,
      y: 0.16,
      duration: 0.08,
      color: { r: 80, g: 220, b: 255, a: 255 },
    });
    return true;
  },

  tick() {
    if (!challengeSession) {
      return false;
    }
    this.drawHud();
    if (challengeSession.waitingForRespawn) {
      return true;
    }
    if (challengeSession.pendingStartAt >= 0 && now() >= challengeSession.pendingStartAt) {
      this.startNext("next");
      return true;
    }
    if (challengeSession.current && !playback && !pendingReplay && !pendingFinishKill) {
      const elapsed = now() - challengeSession.current.routeStartedAt;
      const timeout = Math.max(1.0, challengeSession.current.routeDuration + REPLAY_SETTLE_SECONDS + CHALLENGE_ROUTE_TIMEOUT_PAD_SECONDS);
      if (elapsed >= timeout) {
        this.completeCurrent(false, "route_ended", CHALLENGE_NEXT_DELAY_SECONDS, false);
      }
    }
    return true;
  },
};

function loadStore() {
  storeLoaded = false;
  store = createEmptyStore();
  lastLoadDiagnostic = {
    rawLength: -1,
    parsed: false,
    groupCount: 0,
    nonEmptyGroupCount: 0,
    spawnGroupCount: 0,
    routeCount: 0,
    source: "",
    error: "",
  };
  if (NODATA_DISABLE_GROUP_DATA) {
    applyBaseStore("nodata_empty");
    storeLoaded = true;
    return;
  }
  try {
    const raw = Instance.GetSaveData();
    lastLoadDiagnostic.rawLength = raw ? raw.length : 0;
    if (!raw || raw.length === 0) {
      applyBaseStore("builtin_empty");
      storeLoaded = true;
      return;
    }
    const parsed = JSON.parse(raw);
    if (!applyLoadedStore(parsed, "save")) {
      lastLoadDiagnostic.error = "schema/routes mismatch";
    } else {
      const removedEmptyGroups = pruneEmptySpawnOnlyGroups();
      const removedConfiguredGroups = pruneConfiguredGroupsOnLoad();
      if (removedEmptyGroups > 0) {
        Instance.Msg(`[${CHAT_PREFIX}] Pruned ${removedEmptyGroups} empty spawn-only group(s)`);
      }
      if (removedConfiguredGroups.groups > 0 || removedConfiguredGroups.routes > 0) {
        Instance.Msg(`[${CHAT_PREFIX}] Pruned configured groups on load: groups=${removedConfiguredGroups.groups}, routes=${removedConfiguredGroups.routes}`);
      }
      if (parsed.userSaveSchema !== USER_SAVE_SCHEMA || removedEmptyGroups > 0 || removedConfiguredGroups.groups > 0 || removedConfiguredGroups.routes > 0) {
        saveStore();
      }
    }
    storeLoaded = true;
  } catch (error) {
    lastLoadDiagnostic.error = `${error}`.slice(0, 96);
    try {
      applyBaseStore("builtin_parse_error");
      storeLoaded = true;
      return;
    } catch (fallbackError) {
      lastLoadDiagnostic.error = `${error}; fallback=${fallbackError}`.slice(0, 96);
    }
    Instance.Msg(`[${CHAT_PREFIX}] Load save data failed: ${error}`);
    storeLoaded = true;
  }
}

function saveStore() {
  if (NODATA_DISABLE_GROUP_DATA) {
    return true;
  }
  ensureStoreShape();
  const data = JSON.stringify(buildUserSave());
  if (data.length > MAX_ROUTE_BYTES) {
    chat(`路线数据过大：${data.length} bytes，先缩短录制`);
    return false;
  }

  try {
    Instance.SetSaveData(data);
    return true;
  } catch (error) {
    chat(`保存失败，路线仅保存在内存：${error}`);
    return false;
  }
}

function weaponInfo(pawn) {
  try {
    const weapon = pawn.GetActiveWeapon();
    if (!weapon) {
      return { className: "", dataName: "" };
    }
    const data = weapon.GetData();
    return {
      className: weapon.GetClassName ? weapon.GetClassName() : "",
      dataName: data && data.GetName ? data.GetName() : "",
    };
  } catch {
    return { className: "", dataName: "" };
  }
}

function weaponDisplayName(info) {
  if (!info) {
    return "无武器";
  }
  return info.dataName || info.className || "无武器";
}

function equipPawnWeapon(pawn, info) {
  if (!pawn || !info || !info.className) {
    return false;
  }
  try {
    pawn.DestroyWeapons();
    pawn.GiveNamedItem(info.className, true);
    return true;
  } catch (error) {
    Instance.Msg(`[${CHAT_PREFIX}] Could not equip ${info.className}: ${error}`);
    return false;
  }
}

function cloneWeaponInfo(info) {
  if (!info) {
    return { className: "", dataName: "" };
  }
  return {
    className: info.className || "",
    dataName: info.dataName || "",
    displayName: info.displayName || info.dataName || info.className || "",
  };
}

function sameWeaponInfo(a, b) {
  const left = cloneWeaponInfo(a);
  const right = cloneWeaponInfo(b);
  return !!left.className && left.className === right.className;
}

function entityOwner(entity) {
  if (!entity || !entity.GetOwner) {
    return undefined;
  }
  try {
    return entity.GetOwner();
  } catch {
    return undefined;
  }
}

function destroyEntity(entity) {
  if (!entity) {
    return false;
  }
  try {
    if (entity.Destroy) {
      entity.Destroy();
      return true;
    }
  } catch {
  }
  try {
    Instance.EntFireAtTarget({ target: entity, input: "Kill" });
    return true;
  } catch {
  }
  return false;
}

function cleanupDroppedWeapons(force = false) {
  const currentTime = now();
  if (!force && currentTime < nextDroppedWeaponCleanupAt) {
    return false;
  }
  nextDroppedWeaponCleanupAt = currentTime + DROPPED_WEAPON_CLEANUP_INTERVAL;

  let changed = false;
  for (const className of DROPPED_WEAPON_CLASSES) {
    let entities = [];
    try {
      entities = Instance.FindEntitiesByClass(className) || [];
    } catch {
      entities = [];
    }
    for (const entity of entities) {
      if (!entity || entityOwner(entity)) {
        continue;
      }
      changed = destroyEntity(entity) || changed;
    }
  }
  return changed;
}

function weaponLoadoutSlot(info) {
  const className = info && info.className ? info.className : "";
  if (PRIMARY_WEAPON_CLASSES[className]) {
    return "primary";
  }
  if (PISTOL_WEAPON_CLASSES[className]) {
    return "pistol";
  }
  return "";
}

function rememberedLoadoutForSlot(slot) {
  if (slot < 0) {
    return null;
  }
  return humanRememberedLoadouts[slot] || null;
}

function humanWeaponMemoryKey(slot, loadoutSlot) {
  return `${slot}:${loadoutSlot}`;
}

function clearHumanWeaponMemoryCandidates(slot) {
  delete humanWeaponMemoryCandidates[humanWeaponMemoryKey(slot, "primary")];
  delete humanWeaponMemoryCandidates[humanWeaponMemoryKey(slot, "pistol")];
}

function rememberHumanWeapon(controller, info = null) {
  if (!controller || controller.IsBot()) {
    return false;
  }
  const slot = controller.GetPlayerSlot();
  const pawn = pawnOf(controller);
  if (!pawn) {
    clearHumanWeaponMemoryCandidates(slot);
    return false;
  }
  const weapon = info || weaponInfo(pawn);
  const loadoutSlot = weaponLoadoutSlot(weapon);
  if (!loadoutSlot) {
    clearHumanWeaponMemoryCandidates(slot);
    return false;
  }
  const otherSlot = loadoutSlot === "primary" ? "pistol" : "primary";
  delete humanWeaponMemoryCandidates[humanWeaponMemoryKey(slot, otherSlot)];
  const key = humanWeaponMemoryKey(slot, loadoutSlot);
  const currentTime = now();
  const candidate = humanWeaponMemoryCandidates[key];
  if (!candidate || !sameWeaponInfo(candidate.weapon, weapon)) {
    humanWeaponMemoryCandidates[key] = {
      weapon: cloneWeaponInfo(weapon),
      firstSeenAt: currentTime,
      lastSeenAt: currentTime,
    };
    return false;
  }

  candidate.lastSeenAt = currentTime;
  if (currentTime - candidate.firstSeenAt < HUMAN_WEAPON_REMEMBER_SECONDS) {
    return false;
  }

  const current = humanRememberedLoadouts[slot] || {};
  if (sameWeaponInfo(current[loadoutSlot], weapon)) {
    return false;
  }
  current[loadoutSlot] = cloneWeaponInfo(weapon);
  current.updatedAt = currentTime;
  humanRememberedLoadouts[slot] = current;
  return true;
}

function sampleHumanWeapons(force = false) {
  const current = now();
  if (!force && current < nextHumanWeaponSampleAt) {
    return false;
  }
  nextHumanWeaponSampleAt = current + HUMAN_WEAPON_SAMPLE_INTERVAL;

  let changed = false;
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && controller.IsConnected && controller.IsConnected() && !controller.IsBot()) {
      changed = rememberHumanWeapon(controller) || changed;
    }
  }
  return changed;
}

function giveWeaponIfPresent(pawn, info) {
  if (!pawn || !info || !info.className) {
    return false;
  }
  try {
    pawn.GiveNamedItem(info.className, true);
    return true;
  } catch (error) {
    Instance.Msg(`[${CHAT_PREFIX}] Could not give remembered ${info.className}: ${error}`);
    return false;
  }
}

function giveHumanLoadoutWeapons(pawn, loadout) {
  if (!pawn || !loadout) {
    return false;
  }
  let gaveWeapon = false;
  if (!loadout.primary || !sameWeaponInfo(loadout.primary, loadout.pistol)) {
    gaveWeapon = giveWeaponIfPresent(pawn, loadout.pistol) || gaveWeapon;
  }
  gaveWeapon = giveWeaponIfPresent(pawn, loadout.primary) || gaveWeapon;
  return gaveWeapon;
}

function applyHumanHealthArmor(controller, pawn) {
  const targetPawn = pawn || pawnOf(controller);
  if (!targetPawn) {
    return false;
  }
  callFirstMethod(targetPawn, ["SetHealth"], [100]);
  callFirstMethod(targetPawn, ["SetArmorValue", "SetArmor"], [100]);
  callFirstMethod(targetPawn, ["SetHasHelmet", "SetHelmet"], [true]);
  callFirstMethod(controller, ["SetArmorValue", "SetArmor"], [100]);
  callFirstMethod(controller, ["SetHasHelmet", "SetHelmet"], [true]);
  return true;
}

function setHumanDamageProtection(controller, enabled) {
  const pawn = pawnOf(controller);
  if (!pawn) {
    return false;
  }
  let changed = false;
  changed = callFirstMethod(pawn, ["SetInvulnerable", "SetGodMode"], [enabled]) || changed;
  changed = callFirstMethod(controller, ["SetInvulnerable", "SetGodMode"], [enabled]) || changed;
  changed = callFirstMethod(pawn, ["SetTakesDamage", "SetCanTakeDamage"], [!enabled]) || changed;
  changed = callFirstMethod(controller, ["SetTakesDamage", "SetCanTakeDamage"], [!enabled]) || changed;
  changed = callFirstMethod(pawn, ["SetTakeDamage"], [enabled ? 0 : 2]) || changed;
  return changed;
}

function markHumanInvulnerable(controller, seconds = HUMAN_SPAWN_INVULNERABLE_SECONDS) {
  if (!controller || controller.IsBot()) {
    return;
  }
  humanInvulnerableUntilBySlot[controller.GetPlayerSlot()] = now() + seconds;
}

function maintainHumanSpawnInvulnerability() {
  const current = now();
  let active = false;
  for (const key of Object.keys(humanInvulnerableUntilBySlot)) {
    const until = humanInvulnerableUntilBySlot[key];
    const slot = Number(key);
    const controller = controllerAtSlot(slot);
    if (!controller || !controller.IsConnected || !controller.IsConnected() || controller.IsBot()) {
      delete humanInvulnerableUntilBySlot[key];
      continue;
    }
    if (current >= until) {
      setHumanDamageProtection(controller, false);
      delete humanInvulnerableUntilBySlot[key];
      continue;
    }
    setHumanDamageProtection(controller, true);
    active = true;
  }
  return active;
}

function equipDefaultHumanLoadout(controller) {
  if (!controller || controller.IsBot()) {
    return false;
  }
  const pawn = pawnOf(controller);
  if (!pawn) {
    return false;
  }

  try {
    pawn.DestroyWeapons();
  } catch {
  }

  const defaultLoadout = currentHumanDefaultLoadoutInfo();
  const rememberedLoadout = rememberedLoadoutForSlot(controller.GetPlayerSlot());
  const loadout = rememberedLoadout
    ? {
        primary: rememberedLoadout.primary || defaultLoadout.primary,
        pistol: rememberedLoadout.pistol || defaultLoadout.pistol,
      }
    : defaultLoadout;
  const gaveWeapon = giveHumanLoadoutWeapons(pawn, loadout);
  if (!gaveWeapon) {
    giveWeaponIfPresent(pawn, currentHumanDefaultWeaponInfo());
  }

  try {
    pawn.GiveNamedItem(DEFAULT_HUMAN_ARMOR_ITEM, true);
  } catch (error) {
    Instance.Msg(`[${CHAT_PREFIX}] Could not give default ${DEFAULT_HUMAN_ARMOR_ITEM}: ${error}`);
  }

  applyHumanHealthArmor(controller, pawn);
  return true;
}

function scheduleHumanSpawnLoadout(controller, reason = "spawn") {
  if (!controller || controller.IsBot()) {
    return false;
  }
  const slot = controller.GetPlayerSlot();
  markHumanInvulnerable(controller);
  setHumanDamageProtection(controller, true);
  equipDefaultHumanLoadout(controller);
  pendingHumanLoadouts[slot] = {
    slot,
    index: 0,
    reason,
    nextAt: now() + mapReadyDelay(HUMAN_SPAWN_STATUS_DELAYS[0]),
  };
  scheduleThink(0.05);
  return true;
}

function scheduleAllHumanSpawnLoadouts(reason = "setup") {
  let changed = false;
  for (const controller of Instance.GetAllPlayerControllers()) {
    if (controller && controller.IsConnected && controller.IsConnected() && !controller.IsBot()) {
      changed = scheduleHumanSpawnLoadout(controller, reason) || changed;
    }
  }
  return changed;
}

function handlePendingHumanLoadouts() {
  const current = now();
  let active = false;
  for (const key of Object.keys(pendingHumanLoadouts)) {
    const pending = pendingHumanLoadouts[key];
    const controller = controllerAtSlot(pending.slot);
    if (!controller || !controller.IsConnected || !controller.IsConnected() || controller.IsBot()) {
      delete pendingHumanLoadouts[key];
      continue;
    }
    if (current < pending.nextAt) {
      active = true;
      continue;
    }
    const pawn = pawnOf(controller);
    if (!pawn) {
      pending.nextAt = current + 0.25;
      active = true;
      continue;
    }
    applyHumanHealthArmor(controller, pawn);
    pending.index += 1;
    if (pending.index >= HUMAN_SPAWN_STATUS_DELAYS.length) {
      setHumanDamageProtection(controller, false);
      delete pendingHumanLoadouts[key];
      continue;
    }
    pending.nextAt = current + Math.max(0.01, HUMAN_SPAWN_STATUS_DELAYS[pending.index] - HUMAN_SPAWN_STATUS_DELAYS[pending.index - 1]);
    active = true;
  }
  return active;
}

function safeInputPressed(pawn, inputFlag) {
  try {
    return pawn.IsInputPressed(inputFlag);
  } catch {
    return false;
  }
}

function inputMask(pawn, includeFire) {
  let mask = 0;
  const flags = includeFire ? INPUT_FLAGS.concat([CSInputs.ATTACK, CSInputs.ATTACK2]) : INPUT_FLAGS;
  for (const flag of flags) {
    if (safeInputPressed(pawn, flag)) {
      mask |= flag;
    }
  }
  return mask;
}

function duckValueIsActive(value) {
  if (value === undefined || value === null) {
    return false;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value > 0.15;
  }
  return false;
}

function pawnCrouchActive(pawn) {
  if (!pawn) {
    return false;
  }
  if (safeInputPressed(pawn, CSInputs.DUCK)) {
    return true;
  }

  const methodValue = callFirstGetter(pawn, [
    "IsDucking",
    "IsDucked",
    "IsCrouching",
    "GetDucking",
    "GetDucked",
    "GetDuckAmount",
    "GetDuckFraction",
  ]);
  if (duckValueIsActive(methodValue)) {
    return true;
  }

  try {
    const origin = pawn.GetAbsOrigin();
    const eye = pawn.GetEyePosition();
    if (origin && eye && finiteNumber(origin.z) && finiteNumber(eye.z)) {
      return eye.z - origin.z <= CROUCH_EYE_HEIGHT_THRESHOLD;
    }
  } catch {
  }
  return false;
}

function routeFrameCrouchActive(frame) {
  if (!frame) {
    return false;
  }
  if (frame.d !== undefined) {
    return duckValueIsActive(frame.d);
  }
  return ((frame.m || 0) & CSInputs.DUCK) !== 0;
}

function routeFrameInputMask(frame) {
  if (!frame) {
    return 0;
  }
  let mask = frame.m || 0;
  if (routeFrameCrouchActive(frame)) {
    mask |= CSInputs.DUCK;
  }
  return mask;
}

function routeCrouchFrameCount(frames) {
  if (!frames || !frames.length) {
    return 0;
  }
  let count = 0;
  for (const frame of frames) {
    if (routeFrameCrouchActive(frame)) {
      count += 1;
    }
  }
  return count;
}

function sampleFrame(pawn, startTime, anchor, includeFire) {
  const origin = pawn.GetAbsOrigin();
  const eyeAngles = pawn.GetEyeAngles();
  const crouching = pawnCrouchActive(pawn);
  const mask = inputMask(pawn, includeFire) | (crouching ? CSInputs.DUCK : 0);
  return {
    t: q(now() - startTime, 4),
    p: vecArray(toLocal2D(anchor, origin)),
    a: [
      q(eyeAngles.pitch, 3),
      q(normalizeYaw(eyeAngles.yaw - anchor.yaw), 3),
      0,
    ],
    m: mask,
    d: crouching ? 1 : 0,
  };
}

const Recorder = {
  setAnchorFromHuman() {
    const human = findHuman();
    const pawn = pawnOf(human);
    if (!pawn) {
      chat("设置锚点失败：需要一个存活玩家");
      return false;
    }
    pendingSettledPoint = {
      kind: "anchor",
      humanSlot: human.GetPlayerSlot(),
      at: now() + TELEPORT_SETTLE_SECONDS,
    };
    teleportPawnForSettle(pawn, pawn.GetAbsOrigin(), yawOnlyAngles(pawn.GetEyeAngles()));
    chat("正在稳定录制锚点：已先抬高约0.5m，1秒后保存落稳位置");
    scheduleThink(TELEPORT_SETTLE_SECONDS);
    return true;
  },

  selectSlot(delta) {
    activeRouteSlot += delta;
    if (activeRouteSlot < 1) activeRouteSlot = ROUTE_SLOT_COUNT;
    if (activeRouteSlot > ROUTE_SLOT_COUNT) activeRouteSlot = 1;
    const route = routeForActiveSlot();
    if (route) {
      chat(`已切换路线槽 ${activeRouteSlot}「${routeDisplayName(route)}」：${route.frames.length}帧，${route.duration.toFixed(2)}秒`);
    } else {
      chat(`已切换路线槽 ${activeRouteSlot}：空`);
    }
  },

  toggleRecordFire() {
    recordFire = !recordFire;
    chat(recordFire ? "已开启记录开枪动作" : "已关闭记录开枪动作");
  },

  toggleLosStop() {
    losStopAndShoot = !losStopAndShoot;
    chat(losStopAndShoot ? "已开启看到玩家后急停开枪" : "已关闭看到玩家后急停开枪");
  },

  toggle() {
    if (recording) {
      this.stop(false);
    } else {
      this.start();
    }
  },

  start() {
    if (recording) {
      chat("已经在录制中");
      return;
    }
    GroupPlayback.stop(false);
    Replay.stop(false);
    const human = findHuman();
    const bot = findBot();
    const pawn = pawnOf(human);
    const botPawn = pawnOf(bot);
    if (!pawn || !botPawn) {
      chat("开始录制失败：需要一个存活玩家和一个 bot");
      return;
    }

    const humanOrigin = pawn.GetAbsOrigin();
    const botOrigin = botPawn.GetAbsOrigin();
    if (!worldPositionIsUsable(humanOrigin)) {
      abortUnsafeHumanActivity(human, humanOrigin, "record_start_invalid_human");
      teleportHumanToDefaultSpawn(human, "record_start_invalid_human");
      return;
    }
    if (!worldPositionIsUsable(botOrigin)) {
      Instance.Msg(`[${CHAT_PREFIX}] cannot start recording: bot anchor is outside the playable world`);
      chat("Bot anchor is outside the playable world; move the bot before recording.");
      return;
    }

    const startingWeapon = weaponInfo(pawn);
    cancelGroupNamingFor(activeGroupId);
    const botAngles = botPawn.GetEyeAngles();
    selectedBotSlot = bot.GetPlayerSlot();
    lastBotSlot = selectedBotSlot;
    selectedAnchor = makeAnchor(botOrigin, botAngles.yaw, 0, 0);
    drawAnchor(selectedAnchor);
    setupServer();
    server("bot_stop 1");
    server("bot_dont_shoot 1");
    equipPawnWeapon(botPawn, startingWeapon);
    teleportPawnToAnchor(pawn, selectedAnchor);
    botPawn.Teleport({
      position: runtimeTeleportPosition(parkPositionForAnchor(selectedAnchor)),
      angles: anchorAngles(selectedAnchor),
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
    });
    lockBotView(bot.GetPlayerSlot(), selectedAnchor);

    const prepStart = now();
    recording = {
      routeSlot: activeRouteSlot,
      humanSlot: human.GetPlayerSlot(),
      botSlot: bot.GetPlayerSlot(),
      preparing: true,
      prepEndsAt: prepStart + RECORD_PREP_SECONDS,
      lastCountdown: RECORD_PREP_SECONDS + 1,
      startTime: prepStart + RECORD_PREP_SECONDS,
      nextSampleAt: prepStart + RECORD_PREP_SECONDS,
      anchor: selectedAnchor,
      groupId: activeGroupId,
      recordsFire: recordFire,
      weapon: startingWeapon,
      frames: [],
      shots: [],
    };
    chat(`录制准备：你已在 bot 起点，武器「${weaponDisplayName(startingWeapon)}」，${RECORD_PREP_SECONDS} 秒后开始`);
    scheduleThink();
  },

  capture() {
    if (!recording) {
      return;
    }
    const human = controllerAtSlot(recording.humanSlot);
    const pawn = pawnOf(human);
    if (!pawn) {
      this.stop(true);
      return;
    }
    const origin = pawn.GetAbsOrigin();
    if (!worldPositionIsUsable(origin)) {
      abortUnsafeHumanActivity(human, origin, "recording_invalid_human");
      teleportHumanToDefaultSpawn(human, "recording_invalid_human");
      return;
    }
    const current = now();
    if (recording.preparing) {
      stopPawn(pawn);
      const remaining = Math.max(0, Math.ceil(recording.prepEndsAt - current));
      if (remaining > 0 && remaining !== recording.lastCountdown) {
        recording.lastCountdown = remaining;
        chat(`录制倒计时：${remaining}`);
      }
      if (current + 0.0001 < recording.prepEndsAt) {
        return;
      }
      recording.preparing = false;
      recording.startTime = current;
      recording.nextSampleAt = current + RECORD_INTERVAL;
      recording.weapon = weaponInfo(pawn);
      const bot = controllerAtSlot(recording.botSlot);
      const botPawn = pawnOf(bot);
      if (botPawn) {
        equipPawnWeapon(botPawn, recording.weapon);
      }
      recording.frames.push(sampleFrame(pawn, current, recording.anchor, recording.recordsFire));
      chat(`已开始录制，记录武器「${weaponDisplayName(recording.weapon)}」`);
      return;
    }
    if (current + 0.0001 < recording.nextSampleAt) {
      return;
    }
    recording.frames.push(sampleFrame(pawn, recording.startTime, recording.anchor, recording.recordsFire));
    recording.nextSampleAt = current + RECORD_INTERVAL;

    if (current - recording.startTime >= MAX_RECORD_SECONDS) {
      this.stop(false);
    }
  },

  stop(cancel) {
    if (!recording) {
      chat("当前没有录制");
      return;
    }

    const route = recording;
    recording = null;
    restoreBotToAnchor(route);
    if (cancel || route.preparing || route.frames.length < 2) {
      chat("录制已取消或太短");
      return;
    }

    const lastFrame = route.frames[route.frames.length - 1];
    const savedRoute = {
      schema: SAVE_SCHEMA,
      slot: route.routeSlot,
      botSlot: route.botSlot,
      humanSlot: route.humanSlot,
      name: defaultRouteName(route.routeSlot),
      groupId: -1,
      groupName: "",
      groupOrder: 0,
      savedAt: Math.floor(Date.now() / 1000),
      duration: lastFrame.t,
      recordsFire: route.recordsFire,
      weapon: route.weapon,
      anchor: route.anchor,
      frames: route.frames,
      shots: route.shots,
    };
    const groupText = attachRouteToGroup(savedRoute, route.groupId);

    store.routes[routeKey(route.routeSlot)] = savedRoute;
    const saved = saveStore();
    beginRouteNaming(route.routeSlot, route.humanSlot, savedRoute.routeKey || routeKey(route.routeSlot));
    const shotText = route.recordsFire ? `，${route.shots.length}次开枪` : "";
    const crouchFrameCount = routeCrouchFrameCount(route.frames);
    const crouchText = crouchFrameCount > 0 ? `，蹲${crouchFrameCount}帧` : "";
    chat(`已停止并保存录制：路线槽${route.routeSlot}「${savedRoute.name}」，武器「${weaponDisplayName(route.weapon)}」，${route.frames.length}帧，${lastFrame.t.toFixed(2)}秒${shotText}${crouchText}${groupText}${saved ? "" : "（内存）"}；${ROUTE_NAME_WINDOW_SECONDS}秒内聊天输入可改名`);
  },
};

function frameVelocity(frames, index) {
  const frame = frames[index];
  if (frame && frame.v && frame.v.length >= 3) {
    return frame.v;
  }

  const previousIndex = index > 0 ? index - 1 : index;
  const nextIndex = index + 1 < frames.length ? index + 1 : index;
  const previous = frames[previousIndex];
  const next = frames[nextIndex];
  if (!previous || !next || previous === next) {
    return [0, 0, 0];
  }

  const span = Math.max((next.t || 0) - (previous.t || 0), 0.0001);
  const previousPosition = previous.p || [0, 0, 0];
  const nextPosition = next.p || [0, 0, 0];
  return [
    (nextPosition[0] - previousPosition[0]) / span,
    (nextPosition[1] - previousPosition[1]) / span,
    (nextPosition[2] - previousPosition[2]) / span,
  ];
}

function sampleRoute(playbackState, elapsed) {
  const frames = playbackState.route.frames;
  while (playbackState.cursor + 1 < frames.length && frames[playbackState.cursor + 1].t <= elapsed) {
    playbackState.cursor += 1;
  }

  const current = frames[playbackState.cursor];
  const next = frames[playbackState.cursor + 1];
  if (!next) {
    return {
      t: current.t,
      p: current.p || [0, 0, 0],
      a: current.a || [0, 0, 0],
      v: frameVelocity(frames, playbackState.cursor),
      m: routeFrameInputMask(current),
      d: routeFrameCrouchActive(current) ? 1 : 0,
    };
  }

  const span = Math.max(next.t - current.t, 0.0001);
  const alpha = Math.max(0, Math.min(1, (elapsed - current.t) / span));
  const currentVelocity = frameVelocity(frames, playbackState.cursor);
  const nextVelocity = frameVelocity(frames, playbackState.cursor + 1);
  const inputFrame = alpha < 0.5 ? current : next;
  return {
    t: elapsed,
    p: [
      lerp(current.p[0], next.p[0], alpha),
      lerp(current.p[1], next.p[1], alpha),
      lerp(current.p[2], next.p[2], alpha),
    ],
    a: [
      lerp(current.a[0], next.a[0], alpha),
      lerpYaw(current.a[1], next.a[1], alpha),
      0,
    ],
    v: [
      lerp(currentVelocity[0], nextVelocity[0], alpha),
      lerp(currentVelocity[1], nextVelocity[1], alpha),
      lerp(currentVelocity[2], nextVelocity[2], alpha),
    ],
    m: routeFrameInputMask(inputFrame),
    d: routeFrameCrouchActive(inputFrame) ? 1 : 0,
  };
}

function movementMaskFromVelocity(localVelocity, localAngles) {
  const vx = localVelocity && Number.isFinite(localVelocity.x) ? localVelocity.x : 0;
  const vy = localVelocity && Number.isFinite(localVelocity.y) ? localVelocity.y : 0;
  const speed = Math.sqrt(vx * vx + vy * vy);
  if (speed < REPLAY_SYNTHETIC_INPUT_MIN_SPEED) {
    return 0;
  }

  const yaw = localAngles && Number.isFinite(localAngles.yaw) ? localAngles.yaw : 0;
  const radians = yaw * Math.PI / 180;
  const forwardX = Math.cos(radians);
  const forwardY = Math.sin(radians);
  const rightX = -forwardY;
  const rightY = forwardX;
  const forwardDot = (vx * forwardX + vy * forwardY) / speed;
  const rightDot = (vx * rightX + vy * rightY) / speed;

  let mask = 0;
  if (forwardDot > REPLAY_SYNTHETIC_INPUT_DOT) {
    mask |= CSInputs.FORWARD;
  } else if (forwardDot < -REPLAY_SYNTHETIC_INPUT_DOT) {
    mask |= CSInputs.BACK;
  }
  if (rightDot > REPLAY_SYNTHETIC_INPUT_DOT) {
    mask |= CSInputs.RIGHT;
  } else if (rightDot < -REPLAY_SYNTHETIC_INPUT_DOT) {
    mask |= CSInputs.LEFT;
  }
  return mask;
}

function replayMaskForSample(sample, localVelocity, localAngles) {
  let mask = sample && sample.m !== undefined
    ? sample.m
    : movementMaskFromVelocity(localVelocity, localAngles);
  if (sample && routeFrameCrouchActive(sample)) {
    mask |= CSInputs.DUCK;
  }
  return mask;
}

function applyReplayInputs(botSlot, mask, allowFire) {
  let targetMask = mask & (
    CSInputs.FORWARD
    | CSInputs.BACK
    | CSInputs.LEFT
    | CSInputs.RIGHT
    | CSInputs.WALK
    | CSInputs.DUCK
    | CSInputs.JUMP
    | CSInputs.USE
    | CSInputs.RELOAD
  );
  if (allowFire) {
    targetMask |= mask & (CSInputs.ATTACK | CSInputs.ATTACK2);
  }

  for (const command of REPLAY_INPUT_COMMANDS) {
    if (command.fire && !allowFire) {
      continue;
    }

    const wasPressed = (botPressedMask & command.flag) !== 0;
    const shouldPress = (targetMask & command.flag) !== 0;
    if (command.flag === CSInputs.DUCK && shouldPress) {
      Instance.ClientCommand(botSlot, command.down);
      continue;
    }
    if (wasPressed !== shouldPress) {
      Instance.ClientCommand(botSlot, shouldPress ? command.down : command.up);
    }
  }
  botPressedMask = targetMask;
  if (allowFire) {
    const firePressed = (targetMask & (CSInputs.ATTACK | CSInputs.ATTACK2)) !== 0;
    server(firePressed ? "bot_zombie 0" : "bot_zombie 1");
    server(firePressed ? "bot_stop 0" : "bot_stop 1");
    server(firePressed ? "bot_dont_shoot 0" : "bot_dont_shoot 1");
  }
}

function releaseReplayInputs(botSlot) {
  for (const command of REPLAY_INPUT_COMMANDS) {
    if ((botPressedMask & command.flag) !== 0) {
      Instance.ClientCommand(botSlot, command.up);
    }
  }
  server("bot_zombie 1");
  server("bot_stop 1");
  server("bot_dont_shoot 1");
  botPressedMask = 0;
}

function equipRouteWeapon(botPawn, route) {
  if (!route.weapon || !route.weapon.className) {
    return;
  }
  equipPawnWeapon(botPawn, route.weapon);
}

function applyRecordedShots(playbackState, elapsed, botPawn, humanPawn) {
  const shots = playbackState.route.shots || [];
  if (!playbackState.route.recordsFire || shots.length === 0) {
    return;
  }

  while (playbackState.shotCursor < shots.length && shots[playbackState.shotCursor] <= elapsed) {
    tryShootAtHuman(playbackState.botSlot, botPawn, humanPawn, "recorded", "trajectory");
    playbackState.shotCursor += 1;
  }
}

function applyFallbackRecordedFire(playbackState, mask, botPawn, humanPawn) {
  if (!playbackState.route.recordsFire || (playbackState.route.shots && playbackState.route.shots.length > 0)) {
    playbackState.fireHeld = false;
    return;
  }

  const fireHeld = (mask & (CSInputs.ATTACK | CSInputs.ATTACK2)) !== 0;
  if (fireHeld && !playbackState.fireHeld) {
    tryShootAtHuman(playbackState.botSlot, botPawn, humanPawn, "recorded_fallback", "trajectory");
  }
  playbackState.fireHeld = fireHeld;
}

const DriveProbe = {
  start() {
    Replay.stop(false);
    Autopeek.stop(false);
    stopping = null;
    const bot = findBot();
    const botPawn = pawnOf(bot);
    if (!botPawn) {
      chat("输入驱动测试失败：需要一个存活 bot");
      return;
    }

    const botSlot = bot.GetPlayerSlot();
    selectedBotSlot = botSlot;
    lastBotSlot = botSlot;
    const anchor = makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0);
    lockBotView(botSlot, anchor, DRIVE_PROBE_SECONDS + 0.5);
    setupServer();
    beginScriptBotControl(botSlot);
    stopPawn(botPawn);
    Instance.ClientCommand(botSlot, "+forward");
    driveProbe = {
      botSlot,
      start: botPawn.GetAbsOrigin(),
      releaseAt: now() + DRIVE_PROBE_SECONDS,
    };
    chat("输入驱动测试：AI屏蔽中，已向 bot 发送 +forward 1 秒");
    scheduleThink();
  },

  tick() {
    if (!driveProbe || now() < driveProbe.releaseAt) {
      return;
    }
    Instance.ClientCommand(driveProbe.botSlot, "-forward");
    const bot = controllerAtSlot(driveProbe.botSlot);
    const botPawn = pawnOf(bot);
    if (botPawn) {
      const delta = sub(botPawn.GetAbsOrigin(), driveProbe.start);
      const distance = len2D(delta);
      const speed = len2D(botPawn.GetAbsVelocity() || { x: 0, y: 0, z: 0 });
      stopPawn(botPawn);
      chat(`输入驱动测试结束：位移 ${distance.toFixed(1)}，末速 ${speed.toFixed(1)}；bot AI 已释放`);
    } else {
      chat("输入驱动测试结束：bot 已不存在");
    }
    endScriptBotControl(driveProbe.botSlot, true);
    driveProbe = null;
  },

  stop() {
    if (!driveProbe) {
      return;
    }
    Instance.ClientCommand(driveProbe.botSlot, "-forward");
    endScriptBotControl(driveProbe.botSlot, true);
    driveProbe = null;
  },
};

const AimProbe = {
  start() {
    Replay.stop(false);
    Autopeek.stop(false);
    stopping = null;
    const bot = findBot();
    const botPawn = pawnOf(bot);
    if (!botPawn) {
      chat("视角输入测试失败：需要一个存活 bot");
      return;
    }

    const botSlot = bot.GetPlayerSlot();
    selectedBotSlot = botSlot;
    lastBotSlot = botSlot;
    clearBotViewLock(botSlot);
    setupServer();
    beginScriptBotControl(botSlot);
    releaseBotInputs(botSlot);
    const startYaw = botPawn.GetEyeAngles().yaw;
    Instance.ClientCommand(botSlot, "+right");
    aimProbe = {
      botSlot,
      startYaw,
      releaseAt: now() + AIM_PROBE_SECONDS,
    };
    chat("视角输入测试：AI屏蔽中，已向 bot 发送 +right");
    scheduleThink();
  },

  tick() {
    if (!aimProbe || now() < aimProbe.releaseAt) {
      return;
    }
    Instance.ClientCommand(aimProbe.botSlot, "-right");
    const bot = controllerAtSlot(aimProbe.botSlot);
    const botPawn = pawnOf(bot);
    if (botPawn) {
      const yawDelta = normalizeYaw(botPawn.GetEyeAngles().yaw - aimProbe.startYaw);
      chat(`视角输入测试结束：yaw变化 ${yawDelta.toFixed(1)}；bot AI 已释放`);
    } else {
      chat("视角输入测试结束：bot 已不存在");
    }
    endScriptBotControl(aimProbe.botSlot, true);
    aimProbe = null;
  },

  stop() {
    if (!aimProbe) {
      return;
    }
    Instance.ClientCommand(aimProbe.botSlot, "-right");
    endScriptBotControl(aimProbe.botSlot, true);
    aimProbe = null;
  },
};

const Replay = {
  start() {
    this.startRouteByKey(routeKey(activeRouteSlot));
  },

  startRouteByKey(targetRouteKey, sourceName = "", options = {}) {
    if (recording) {
      Recorder.stop(true);
    }
    this.stop(false);

    const route = store.routes[targetRouteKey];
    const targetSlot = route ? (route.slot || activeRouteSlot) : activeRouteSlot;
    if (!routeIsPlayable(route)) {
      scheduleGroupReplayAfterFinish(options.loopGroupId === undefined ? -1 : options.loopGroupId, 1.0, "invalid_route");
      chat(`路线槽${targetSlot}为空，无法播放`);
      return;
    }

    if (Number.isFinite(route.slot)) {
      activeRouteSlot = route.slot;
    }
    pendingReplay = {
      routeKey: targetRouteKey,
      routeSlot: targetSlot,
      sourceName,
      retryAt: 0,
      deadline: now() + 5,
      addedBot: false,
      settleSeconds: Math.max(0, options.settleSeconds === undefined ? REPLAY_SETTLE_SECONDS : options.settleSeconds),
      loopGroupId: options.loopGroupId === undefined ? -1 : options.loopGroupId,
    };
    this.tryPendingStart();
    scheduleThink(0.2);
  },

  tryPendingStart() {
    if (!pendingReplay || now() < pendingReplay.retryAt) {
      return;
    }

    const route = store.routes[pendingReplay.routeKey || routeKey(pendingReplay.routeSlot)];
    const human = findHuman();
    const bot = findBot();
    const humanPawn = pawnOf(human);
    const botPawn = pawnOf(bot);
    if (!routeIsPlayable(route)) {
      const slot = pendingReplay.routeSlot;
      const loopGroupId = pendingReplay.loopGroupId;
      pendingReplay = null;
      scheduleGroupReplayAfterFinish(loopGroupId, 1.0, "invalid_route");
      chat(`路线槽${slot}为空，无法展示`);
      return;
    }
    if (!humanPawn) {
      pendingReplay.retryAt = now() + 0.5;
      if (now() > pendingReplay.deadline) {
        pendingReplay = null;
        chat("展示失败：需要一个存活玩家");
      }
      return;
    }
    if (!botPawn) {
      setupServer();
      if (!pendingReplay.addedBot) {
        const team = desiredOpponentBotTeam() || TEAM_T;
        requestBotSpawn(team, `正在放置 ${teamName(team)} bot 并准备展示路线`);
        pendingReplay.addedBot = true;
      }
      pendingReplay.retryAt = now() + 0.5;
      if (now() > pendingReplay.deadline) {
        pendingReplay = null;
        chat("展示失败：bot 没有生成");
      }
      return;
    }

    const sourceName = pendingReplay.sourceName || "";
    const settleSeconds = pendingReplay.settleSeconds;
    const loopGroupId = pendingReplay.loopGroupId;
    pendingReplay = null;
    this.begin(route, human, bot, sourceName, { settleSeconds, loopGroupId });
  },

  begin(route, human, bot, sourceName = "", options = {}) {
    const humanPawn = pawnOf(human);
    const botPawn = pawnOf(bot);
    const loopGroupId = options.loopGroupId === undefined ? -1 : options.loopGroupId;
    if (!routeIsPlayable(route)) {
      scheduleGroupReplayAfterFinish(loopGroupId, 1.0, "invalid_route");
      return;
    }
    if (humanPawn) {
      const humanOrigin = humanPawn.GetAbsOrigin();
      if (!worldPositionIsUsable(humanOrigin)) {
        abortUnsafeHumanActivity(human, humanOrigin, "replay_start_invalid_human");
        teleportHumanToDefaultSpawn(human, "replay_start_invalid_human");
        return;
      }
    }
    if (botPawn) {
      const botOrigin = botPawn.GetAbsOrigin();
      if (!worldPositionIsUsable(botOrigin)) {
        Instance.Msg(`[${CHAT_PREFIX}] cannot start replay: bot is outside the playable world`);
        scheduleGroupReplayAfterFinish(loopGroupId, 1.0, "invalid_bot_position");
        return;
      }
    }
    if (!humanPawn || !botPawn) {
      chat("展示失败：需要一个存活玩家和一个 bot");
      return;
    }

    setupServer();
    equipRouteWeapon(botPawn, route);
    selectedBotSlot = bot.GetPlayerSlot();
    lastBotSlot = selectedBotSlot;
    clearBotViewLock(selectedBotSlot);
    beginTrajectoryReplayControl(selectedBotSlot);
    teleportPawnToAnchor(botPawn, route.anchor);
    stopPawn(botPawn);
    lockBotView(selectedBotSlot, route.anchor);
    const settleSeconds = Math.max(0, options.settleSeconds === undefined ? REPLAY_SETTLE_SECONDS : options.settleSeconds);
    const randomStartDelaySeconds = randomReplayStartDelaySeconds();
    const prepSeconds = settleSeconds + randomStartDelaySeconds;
    const startTime = now() + prepSeconds;
    playback = {
      route,
      botSlot: bot.GetPlayerSlot(),
      humanSlot: human.GetPlayerSlot(),
      anchor: route.anchor,
      startTime,
      preparing: prepSeconds > 0,
      prepEndsAt: startTime,
      settleSeconds,
      randomStartDelaySeconds,
      cursor: 0,
      shotCursor: 0,
      fireHeld: false,
      startOffset: route.frames && route.frames.length > 0 ? arrVec(route.frames[0].p) : { x: 0, y: 0, z: 0 },
      runtimeAnchor: route.anchor,
      nextCorrectionAt: 0,
      sourceName,
      loopGroupId,
    };
    drawAnchor(playback.anchor);
    const sourceText = sourceName ? `（${sourceName}）` : "";
    chat(prepSeconds > 0
      ? `bot站稳中：${prepSeconds.toFixed(3)}秒后开始展示路线（random +${randomStartDelaySeconds.toFixed(3)}s）${sourceText}「${routeDisplayName(route, route.slot)}」`
      : `已开始展示路线${sourceText}「${routeDisplayName(route, route.slot)}」`);
    scheduleThink();
  },

  apply() {
    if (pendingReplay) {
      this.tryPendingStart();
    }
    if (!playback) {
      return;
    }

    const bot = controllerAtSlot(playback.botSlot);
    const human = controllerAtSlot(playback.humanSlot) || findHuman();
    const botPawn = pawnOf(bot);
    const humanPawn = pawnOf(human);
    if (!botPawn || !humanPawn) {
      this.stop(false);
      return;
    }

    const humanOrigin = humanPawn.GetAbsOrigin();
    if (!worldPositionIsUsable(humanOrigin)) {
      abortUnsafeHumanActivity(human, humanOrigin, "replay_invalid_human");
      teleportHumanToDefaultSpawn(human, "replay_invalid_human");
      return;
    }
    const botOrigin = botPawn.GetAbsOrigin();
    if (!worldPositionIsUsable(botOrigin)) {
      const botSlot = playback.botSlot;
      const loopGroupId = playback.loopGroupId;
      Instance.Msg(`[${CHAT_PREFIX}] replay bot position became invalid; skipping route`);
      releaseReplayInputs(botSlot);
      beginTrajectoryReplayControl(botSlot);
      playback = null;
      scheduleGroupReplayAfterFinish(loopGroupId, 1.0, "invalid_bot_position");
      return;
    }

    const current = now();
    if (playback.preparing) {
      stopPawn(botPawn);
      lockBotView(playback.botSlot, playback.anchor);
      if (current + 0.0001 < playback.prepEndsAt) {
        return;
      }
      playback.preparing = false;
      playback.startTime = current;
      playback.cursor = 0;
      playback.shotCursor = 0;
      playback.fireHeld = false;
      playback.runtimeAnchor = makeAnchor(botPawn.GetAbsOrigin(), playback.anchor.yaw, 0, 0);
      playback.nextCorrectionAt = current + REPLAY_CORRECTION_INTERVAL;
      server("bot_stop 0");
      server("bot_zombie 1");
      server("bot_dont_shoot 1");
      chat("bot已站稳，开始播放记录");
      return;
    }

    const elapsed = current - playback.startTime;
    if (elapsed > playback.route.duration) {
      const botSlot = playback.botSlot;
      const humanSlot = human ? human.GetPlayerSlot() : -1;
      const loopGroupId = playback.loopGroupId;
      releaseReplayInputs(botSlot);
      stopPawn(botPawn);
      const finishKillAllowed = finishKillEnabled();
      const canFinishKill = finishKillAllowed && hasClearHeadLine(botPawn, humanPawn);
      if (canFinishKill) {
        scheduleFinishKill(botSlot, humanSlot, loopGroupId, killDelayMs, "路线播放完毕");
      } else {
        lockBotView(botSlot, makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0));
        beginTrajectoryReplayControl(botSlot);
        scheduleGroupReplayAfterFinish(loopGroupId, 1.0, finishKillAllowed ? "bot未看到玩家" : "difficulty0_no_finish_kill");
      }
      playback = null;
      chat(canFinishKill
        ? `路线播放完毕：${shootDifficultyLabel()}，将在 ${killDelayMs}ms 后结算击杀`
        : (finishKillAllowed ? "路线播放完毕：bot看不到玩家，1秒后播放下一轮" : "路线播放完毕：难度0不执行收尾击杀，1秒后播放下一轮"));
      return;
    }

    const sample = sampleRoute(playback, elapsed);
    const samplePosition = sample ? vectorOrNull(sample.p) : null;
    const sampleVelocity = sample ? vectorOrNull(sample.v) : null;
    if (!routeLocalPositionIsUsable(samplePosition)) {
      const botSlot = playback.botSlot;
      const loopGroupId = playback.loopGroupId;
      Instance.Msg(`[${CHAT_PREFIX}] replay sample became invalid; skipping route`);
      releaseReplayInputs(botSlot);
      stopPawn(botPawn);
      beginTrajectoryReplayControl(botSlot);
      playback = null;
      scheduleGroupReplayAfterFinish(loopGroupId, 1.0, "invalid_replay_sample");
      return;
    }
    const localPosition = sub(samplePosition, playback.startOffset || { x: 0, y: 0, z: 0 });
    const localVelocity = sampleVelocity || { x: 0, y: 0, z: 0 };
    const localAngles = arrAngle(sample && sample.a ? sample.a : [0, 0, 0]);
    const replayAnchor = playback.runtimeAnchor || playback.anchor;
    if (!replayAnchor || !worldPositionIsUsable(replayAnchor.position) || !routeLocalPositionIsUsable(localPosition)) {
      const botSlot = playback.botSlot;
      const loopGroupId = playback.loopGroupId;
      Instance.Msg(`[${CHAT_PREFIX}] replay target position became invalid; skipping route`);
      releaseReplayInputs(botSlot);
      stopPawn(botPawn);
      beginTrajectoryReplayControl(botSlot);
      playback = null;
      scheduleGroupReplayAfterFinish(loopGroupId, 1.0, "invalid_replay_position");
      return;
    }
    const replayPosition = fromLocal2D(replayAnchor, localPosition);
    if (!worldPositionIsUsable(replayPosition)) {
      const botSlot = playback.botSlot;
      const loopGroupId = playback.loopGroupId;
      Instance.Msg(`[${CHAT_PREFIX}] replay target position became invalid; skipping route`);
      releaseReplayInputs(botSlot);
      stopPawn(botPawn);
      beginTrajectoryReplayControl(botSlot);
      playback = null;
      scheduleGroupReplayAfterFinish(loopGroupId, 1.0, "invalid_replay_position");
      return;
    }
    const replayMask = replayMaskForSample(sample, localVelocity, localAngles);
    applyReplayInputs(playback.botSlot, replayMask, false);
    if (ANIMATED_REPLAY_ENABLED) {
      botPawn.Teleport({
        angles: replayPawnAngles(replayAnchor, localAngles),
        angularVelocity: { x: 0, y: 0, z: 0 },
      });
      if (current >= playback.nextCorrectionAt) {
        const error = sub(replayPosition, botPawn.GetAbsOrigin());
        if (len2D(error) > REPLAY_CORRECTION_DISTANCE || Math.abs(error.z) > REPLAY_CORRECTION_Z_DISTANCE) {
          botPawn.Teleport({
            position: replayPosition,
            velocity: velocityFromLocal(replayAnchor, localVelocity),
            angularVelocity: { x: 0, y: 0, z: 0 },
          });
        }
        playback.nextCorrectionAt = current + REPLAY_CORRECTION_INTERVAL;
      }
    } else {
      botPawn.Teleport({
        position: replayPosition,
        angles: replayPawnAngles(replayAnchor, localAngles),
        velocity: velocityFromLocal(replayAnchor, localVelocity),
        angularVelocity: { x: 0, y: 0, z: 0 },
      });
    }
    applyFallbackRecordedFire(playback, sample.m, botPawn, humanPawn);
    applyRecordedShots(playback, elapsed, botPawn, humanPawn);

    if (losStopAndShoot && hasLineOfSight(botPawn, humanPawn)) {
      const botSlot = playback.botSlot;
      const humanSlot = human.GetPlayerSlot();
      this.stop(false);
      Stopping.start(botSlot, humanSlot, "回放看到玩家，进入拟真急停", () => {
        chat("回放已急停并开枪");
      });
    }
  },

  stop(verbose = true, clearGroupPlayback = false) {
    if (clearGroupPlayback) {
      GroupPlayback.stop(false);
    }
    clearPendingFinishKill();
    if (pendingReplay) {
      pendingReplay = null;
      if (verbose) {
        chat("已取消展示准备");
      }
      return;
    }
    if (!playback) {
      if (verbose) {
        chat("当前没有路线播放");
      }
      return;
    }

    releaseReplayInputs(playback.botSlot);
    const bot = controllerAtSlot(playback.botSlot);
    const botPawn = pawnOf(bot);
    if (botPawn) {
      stopPawn(botPawn);
      lockBotView(playback.botSlot, makeAnchor(botPawn.GetAbsOrigin(), botPawn.GetEyeAngles().yaw, 0, 0));
    }
    endScriptBotControl(playback.botSlot, true);
    playback = null;
    if (verbose) {
      chat("已停止播放，bot AI 已释放");
    }
  },
};

function tick() {
  const dt = THINK_INTERVAL;
  handleForcedAttack();
  handleInitialBotKick();
  handlePendingOpponentBot();
  handlePendingBotSpawn();
  handlePendingBotConfirm();
  const humanSpawnAssistActive = assistAllHumansSpawn();
  const pendingDefaultHumanSpawnActive = handlePendingDefaultHumanSpawn();
  const humanRescueActive = rescueFallingHumans();
  const humanWeaponSampleActive = sampleHumanWeapons(false);
  const humanLoadoutActive = handlePendingHumanLoadouts();
  const humanInvulnerabilityActive = maintainHumanSpawnInvulnerability();
  const startupUseInstructionActive = maybeShowStartupUseInstruction();
  const startupLanguageTipActive = maybeShowStartupLanguageTip();
  const startupLanguageTipEnglishActive = maybeShowStartupLanguageTipEnglish();
  const startupDifficultyTipActive = maybeShowStartupDifficultyTip();
  const startupDifficultyTipEnglishActive = maybeShowStartupDifficultyTipEnglish();
  const startupRemindTipActive = maybeShowStartupRemindTip();
  const killDelayReminderActive = maybeShowKillDelayReminder();
  const killDelayReminderEnglishActive = maybeShowKillDelayReminderEnglish();
  ensureOpponentBot(false);
  enforceEconomy(false);
  const droppedWeaponCleanupActive = cleanupDroppedWeapons(false);
  handlePendingSettledPoint();
  GroupPlayback.tryStartPending();
  const pendingFinishKillAimActive = maintainPendingFinishKillAim();
  tryPendingFinishKill();
  enforceBotViewLock();
  Autopeek.tick(dt);
  Recorder.capture();
  Replay.apply();
  maintainForcedAttackAim();
  maintainBotFireAssist();
  const fullTimeHeadlockActive = maintainFullTimeHeadlock();
  Stopping.tick(dt);
  AttackProbe.tick();
  DriveProbe.tick();
  AimProbe.tick();
  const challengePlaybackActive = ChallengePlayback.tick();
  if (challengePlaybackActive) {
    GroupSelector.hideUnusedLabels(0);
  } else {
    GroupSelector.tick();
  }
  handleRouteNamingTimeout();

  if (forcedAttack || botFireAssist || fullTimeHeadlockActive || pendingFinishKillAimActive || challengePlaybackActive || droppedWeaponCleanupActive || humanWeaponSampleActive || humanLoadoutActive || humanInvulnerabilityActive || startupUseInstructionActive || startupLanguageTipActive || startupLanguageTipEnglishActive || startupDifficultyTipActive || startupDifficultyTipEnglishActive || startupRemindTipActive || killDelayReminderActive || killDelayReminderEnglishActive || pendingInitialBotKickAt >= 0 || pendingOpponentBot || pendingBotSpawn || pendingBotConfirm || pendingDefaultHumanSpawnActive || pendingSettledPoint || pendingGroupReplay || pendingFinishKill || Autopeek.active || recording || playback || pendingReplay || pendingRouteNaming || stopping || attackProbe || driveProbe || aimProbe) {
    scheduleThink();
  } else if (humanSpawnAssistActive || humanRescueActive) {
    scheduleThink(0.5);
  } else if (!startupUseInstructionShown) {
    scheduleThink(0.25);
  } else if (!startupLanguageTipShown) {
    const languageDelay = startupLanguageTipEnglishPending ? startupLanguageTipEnglishReadyAt - now() : startupLanguageTipReadyAt - now();
    scheduleThink(Math.max(0.25, Math.min(1.0, languageDelay)));
  } else if (!startupDifficultyTipShown) {
    scheduleThink(Math.max(0.25, Math.min(1.0, startupDifficultyTipReadyAt - now())));
  } else if (startupDifficultyTipEnglishPending) {
    scheduleThink(Math.max(0.25, Math.min(1.0, startupDifficultyTipEnglishReadyAt - now())));
  } else if (!startupRemindTipShown) {
    scheduleThink(Math.max(0.25, Math.min(1.0, startupRemindTipReadyAt - now())));
  } else if (killDelayReminderEnglishPending) {
    scheduleThink(Math.max(0.25, Math.min(1.0, killDelayReminderEnglishReadyAt - now())));
  } else if (botViewLock) {
    scheduleThink(VIEW_LOCK_INTERVAL);
  } else if (GroupSelector.shouldThink()) {
    scheduleThink(0.05);
  } else {
    scheduleThink(Math.min(OPPONENT_BOT_CHECK_INTERVAL, ECONOMY_ENFORCE_INTERVAL));
  }
}

function setupAndBind() {
  setupServer();
  enforceEconomy(true);
  loadStore();
  requestExternalBuiltinData();
  cfgBackupOkConfirmedRuntime = false;
  resetStartupUseInstruction(1.0);
  resetStartupLanguageTip(START_LANGUAGE_TIP_DELAY_SECONDS);
  resetStartupDifficultyTip(START_DIFFICULTY_TIP_DELAY_SECONDS);
  resetStartupRemindTip(START_REMIND_TIP_DELAY_SECONDS);
  resetKillDelayReminder();
  announceLoaded();
  showCfgBackupGateWarning();
  assistAllHumansSpawn();
  scheduleAllHumanSpawnLoadouts("setup");
}

try {
  Instance.RegisterCheatCommand("autopeek_builtin_begin", () => {
    beginExternalBuiltinData();
  });
  Instance.RegisterCheatCommand("autopeek_builtin_chunk", (args) => {
    receiveExternalBuiltinChunk(args);
  });
  Instance.RegisterCheatCommand("autopeek_builtin_end", () => {
    finishExternalBuiltinData();
  });
} catch (error) {
  Instance.Msg(`[${CHAT_PREFIX}] Builtin data command registration failed: ${error}`);
}

Instance.SetThink(tick);

Instance.OnActivate(() => {
  mapReadyAt = now() + MAP_SPAWNGROUP_READY_DELAY_SECONDS;
  resetGroupSelectorInputGate(MAP_SPAWNGROUP_READY_DELAY_SECONDS + GROUP_SELECTOR_INPUT_ARM_DELAY);
  setupAndBind();
  scheduleThink(0.25);
});

Instance.OnRoundStart(() => {
  setupServer();
  enforceEconomy(true);
  resetStartupUseInstruction(1.0);
  resetStartupLanguageTip(START_LANGUAGE_TIP_DELAY_SECONDS);
  resetStartupDifficultyTip(START_DIFFICULTY_TIP_DELAY_SECONDS);
  resetStartupRemindTip(START_REMIND_TIP_DELAY_SECONDS);
  resetKillDelayReminder();
  requestInitialBotKickOnce();
  showCfgBackupGateWarning();
  assistAllHumansSpawn();
  scheduleAllHumanSpawnLoadouts("round_start");
  ChallengePlayback.stop(false);
  Autopeek.stop(false);
  Replay.stop(false);
  AttackProbe.stop();
  DriveProbe.stop();
  AimProbe.stop();
  recording = null;
  pendingReplay = null;
  pendingGroupReplay = null;
  clearPendingFinishKill();
  activePlaybackGroupId = -1;
  lastReplayRouteKeyByGroup = {};
  groupRouteShuffleBags = {};
  preferredGroupRoute = null;
  pendingSettledPoint = null;
  botViewLock = null;
  botFireAssist = null;
  scriptDrivenBotSlot = -1;
  nextDroppedWeaponCleanupAt = -1;
  stopping = null;
  GroupSelector.resetInputGate();
  requestOpponentBotForExistingHuman(1.0);
  ensureOpponentBot(true);
  announceLoaded();
  scheduleThink(0.25);
});

Instance.OnPlayerConnect(({ player }) => {
  if (player && !player.IsBot()) {
    lastHumanSlot = player.GetPlayerSlot();
    assistHumanSpawn(player, "connect");
    scheduleHumanSpawnLoadout(player, "connect");
    resetStartupUseInstruction(1.5);
    resetStartupLanguageTip(START_LANGUAGE_TIP_DELAY_SECONDS);
    resetStartupDifficultyTip(START_DIFFICULTY_TIP_DELAY_SECONDS);
    resetStartupRemindTip(START_REMIND_TIP_DELAY_SECONDS);
    scheduleThink(0.25);
  }
});

Instance.OnPlayerActivate(({ player }) => {
  setupServer();
  enforceEconomy(true);
  if (player && !player.IsBot()) {
    lastHumanSlot = player.GetPlayerSlot();
    assistHumanSpawn(player, "activate");
    GroupSelector.resetInputGate();
    resetStartupUseInstruction(1.5);
    resetStartupLanguageTip(START_LANGUAGE_TIP_DELAY_SECONDS);
    resetStartupDifficultyTip(START_DIFFICULTY_TIP_DELAY_SECONDS);
    resetStartupRemindTip(START_REMIND_TIP_DELAY_SECONDS);
    requestDefaultHumanSpawn(player, "activate", 1.0);
    scheduleHumanSpawnLoadout(player, "activate");
    showCfgBackupGateWarning();
    ensureOpponentBot(true);
  }
  requestOpponentBotForController(player, 1.0);
  announceLoaded();
  scheduleThink(0.25);
});

Instance.OnPlayerDisconnect(({ playerSlot }) => {
  if (playerSlot === lastHumanSlot) {
    lastHumanSlot = -1;
    nextHumanSpawnAssistAt = -1;
  }
  delete pendingHumanLoadouts[playerSlot];
  delete humanInvulnerableUntilBySlot[playerSlot];
  delete humanRememberedLoadouts[playerSlot];
  delete humanWeaponMemoryCandidates[`${playerSlot}:primary`];
  delete humanWeaponMemoryCandidates[`${playerSlot}:pistol`];
  clearHeadlockSmoothing(playerSlot);
});

Instance.OnPlayerReset(({ player }) => {
  const controller = player ? player.GetPlayerController() : undefined;
  if (!controller) {
    return;
  }
  if (controller.IsBot()) {
    GroupPlayback.onBotRespawn(controller);
    return;
  }
  lastHumanSlot = controller.GetPlayerSlot();
  nextHumanSpawnAssistAt = -1;
  enforceEconomy(true);
  scheduleHumanSpawnLoadout(controller, "reset");
  GroupSelector.resetInputGate();
  const challengeRespawned = ChallengePlayback.onHumanRespawn(controller);
  if (!challengeRespawned) {
    GroupPlayback.onHumanRespawn(controller);
  }
  if (!challengeRespawned && shouldTeleportHumanToDefaultSpawn()) {
    teleportHumanToDefaultSpawn(controller, "spawn");
  }
  requestOpponentBotForTeam(player.GetTeamNumber(), lastHumanSlot, 0.55);
  ensureOpponentBot(true);
});

if (Instance.OnPlayerDeath) {
  Instance.OnPlayerDeath((event) => {
    const controller = controllerFromEventEntity(event && (event.player || event.victim || event.pawn || event.entity));
    if (!controller) {
      return;
    }
    if (controller.IsBot()) {
      if (ChallengePlayback.onBotDeath(controller)) {
        return;
      }
      GroupPlayback.onBotDeath(controller);
    } else {
      ChallengePlayback.onHumanDeath(controller);
    }
  });
}

Instance.OnPlayerPing(({ player, position }) => {
  if (!player || player.IsBot()) {
    return;
  }
  const pawn = pawnOf(player);
  selectedAnchor = makeAnchor(position, pawn ? pawn.GetEyeAngles().yaw : 0);
  drawAnchor(selectedAnchor);
  chat("已通过 ping 设置录制锚点");
});

Instance.OnPlayerChat(({ player, text }) => {
  if (isScriptChatEcho(text)) {
    return;
  }
  if (handlePlayerChatCommand(player, text)) {
    return;
  }
  if (handlePlayerChatForGroupName(player, text)) {
    return;
  }
  if (handlePlayerChatForRouteName(player, text)) {
    return;
  }
  handlePlayerChatForGroupRoutePreference(player, text);
});

Instance.OnGunFire(({ weapon }) => {
  AttackProbe.noteShot(weapon);
  startBotFireAssistFromWeapon(weapon);
  try {
    const shooter = weapon && weapon.GetOwner ? weapon.GetOwner() : undefined;
    const controller = shooter && shooter.GetPlayerController ? shooter.GetPlayerController() : undefined;
    if (controller && !controller.IsBot()) {
      const data = weapon.GetData ? weapon.GetData() : null;
      rememberHumanWeapon(controller, {
        className: weapon.GetClassName ? weapon.GetClassName() : "",
        dataName: data && data.GetName ? data.GetName() : "",
      });
    }
  } catch {
  }
  if (!recording || recording.preparing || !recording.recordsFire || !weapon) {
    return;
  }
  try {
    const shooter = weapon.GetOwner();
    const human = controllerAtSlot(recording.humanSlot);
    const humanPawn = pawnOf(human);
    if (shooter && humanPawn && shooter === humanPawn) {
      recording.shots.push(q(now() - recording.startTime, 4));
    }
  } catch (error) {
    Instance.Msg(`[${CHAT_PREFIX}] Shot record failed: ${error}`);
  }
});

Instance.OnScriptInput("RequestBuiltinData", () => {
  requestExternalBuiltinData();
});

Instance.OnScriptInput("Setup", () => {
  setupAndBind();
  chat("Workshop install: type OK in chat, or type say OK in console. Direct console OK may be blocked.");
  chat("脚本Setup已执行；首次使用请在聊天框输入 OK，或控制台输入 say OK；聊天输入 binds 查看手动命令");
});

Instance.OnScriptInput("ConfirmAndInstallBinds", () => {
  confirmOrInstallBinds(findHuman());
});

Instance.OnScriptInput("PrintBinds", () => {
  showManualBindCommands(findHuman());
});

Instance.OnScriptInput("InstallBinds", () => {
  confirmOrInstallBinds(findHuman());
});

Instance.OnScriptInput("RecoverCfg", () => {
  recoverCfgForPlayer(findHuman());
});

Instance.OnScriptInput("Challenge", () => {
  ChallengePlayback.start(findHuman());
});

Instance.OnScriptInput("StopChallenge", () => {
  ChallengePlayback.stop(true);
});

const INPUT_LABELS = {};
for (const binding of BINDINGS) {
  INPUT_LABELS[binding.input] = binding.label;
}
for (const [input, label] of Object.entries(INPUT_LABEL_OVERRIDES)) {
  INPUT_LABELS[input] = label;
}

function bindScriptInput(name, action) {
  Instance.OnScriptInput(name, () => {
    chat(`按键触发：${INPUT_LABELS[name] || name}`);
    action();
  });
}

bindScriptInput("AddT", () => BotManager.add("T"));
bindScriptInput("AddCT", () => BotManager.add("CT"));
bindScriptInput("SelectGroup", () => GroupSelector.selectAimed());
bindScriptInput("AppendGroup", () => GroupRecorder.appendAimed());
bindScriptInput("PlaceBot", () => BotManager.placeAtCrosshair());
bindScriptInput("FaceBot", () => BotManager.faceHuman());
bindScriptInput("SelectLeft", () => Autopeek.select("left"));
bindScriptInput("SelectRight", () => Autopeek.select("right"));
bindScriptInput("StartPeek", () => Autopeek.start());
bindScriptInput("StopPeek", () => Autopeek.stop(true));
bindScriptInput("FreezeBot", () => BotManager.freeze());
bindScriptInput("ToggleFFA", () => BotManager.toggleFFA());
bindScriptInput("SetAnchor", () => Recorder.setAnchorFromHuman());
bindScriptInput("PrevRouteSlot", () => Recorder.selectSlot(-1));
bindScriptInput("NextRouteSlot", () => Recorder.selectSlot(1));
bindScriptInput("ToggleRecordFire", () => Recorder.toggleRecordFire());
bindScriptInput("ToggleLosStop", () => Recorder.toggleLosStop());
bindScriptInput("ToggleRecord", () => Recorder.toggle());
bindScriptInput("ToggleGroupRecord", () => GroupRecorder.toggle());
bindScriptInput("SetGroupSpawn", () => GroupRecorder.setPlayerSpawn());
bindScriptInput("PlayRoute", () => Replay.start());
bindScriptInput("StopPlayback", () => Replay.stop(true, true));
bindScriptInput("CycleShootDifficulty", () => ShootingControl.cycleDifficulty());
bindScriptInput("AttackProbe", () => AttackProbe.start());
bindScriptInput("AimProbe", () => AimProbe.start());
bindScriptInput("DriveProbe", () => DriveProbe.start());
