
/**
 * object League
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface League {
  /* the league's name */
  id: string;
  /* pc, xbox, or sony */
  realm?: string;
  description?: string;
  category?: object;
  rules?: LeagueRule[];
  /* date time (ISO8601) */
  registerAt?: string;
  /* always true if present */
  event?: boolean;
  /* a url link to a Path of Exile forum thread */
  url?: string;
  /* date time (ISO8601) */
  startAt?: string;
  /* date time (ISO8601) */
  endAt?: string;
  /* always true if present */
  timedEvent?: boolean;
  /* always true if present */
  scoreEvent?: boolean;
  /* always true if present */
  delveEvent?: boolean;
  /* always true if present */
  ancestorEvent?: boolean;
  /* always true if present */
  leagueEvent?: boolean;
}
/**
 * object LeagueRule
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface LeagueRule {
  /* examples: Hardcore, NoParties (SSF) */
  id: string;
  name: string;
  description?: string;
}
/**
 * object LadderEntry
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface LadderEntry {
  rank: number;
  dead?: boolean;
  retired?: boolean;
  ineligible?: boolean;
  public?: boolean;
  character: object;
  account?: Account;
}
/**
 * object EventLadderEntry
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface EventLadderEntry {
  rank: number;
  ineligible?: boolean;
  /* time taken to complete the league objective in seconds */
  time?: number;
  private_league: object;
}
/**
 * object Account
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface Account {
  name: string;
  /* pc, xbox, or sony */
  realm?: string;
  guild?: Guild;
  challenges?: object;
  twitch?: object;
}
/**
 * object Guild
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface Guild {
  id: number;
  name: string;
  tag: string;
}
/**
 * object PvPMatch
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface PvPMatch {
  /* the match's name */
  id: string;
  /* pc, xbox, or sony */
  realm?: string;
  /* date time (ISO8601) */
  startAt?: string;
  /* date time (ISO8601) */
  endAt?: string;
  /* a url link to a Path of Exile forum thread */
  url?: string;
  description: string;
  glickoRatings: boolean;
  /* always true */
  pvp: boolean;
  /* Blitz, Swiss, or Arena */
  style: string;
  /* date time (ISO8601) */
  registerAt?: string;
  /* always true if present */
  complete?: boolean;
  /* always true if present */
  upcoming?: boolean;
  /* always true if present */
  inProgress?: boolean;
}
/**
 * object PvPLadderTeamEntry
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface PvPLadderTeamEntry {
  rank: number;
  /* only present if the PvP Match uses Glicko ratings */
  rating?: number;
  points?: number;
  games_played?: number;
  cumulative_opponent_points?: number;
  /* date time (ISO8601) */
  last_game_time?: string;
  members: PvPLadderTeamMember[];
}
/**
 * object PvPLadderTeamMember
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface PvPLadderTeamMember {
  account: Account;
  character: object;
  /* always true if present */
  public?: boolean;
}
/**
 * object PublicStashChange
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface PublicStashChange {
  /* a unique 64 digit hexadecimal string */
  id: string;
  /* if false then optional properties will be null */
  public: boolean;
  accountName?: string;
  /* the name of the stash */
  stash?: string;
  stashType: string;
  /* the league's name */
  league?: string;
  items: Item[];
}
/**
 * object Item
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface Item {
  /* always poe2 if present */
  realm?: string;
  verified: boolean;
  w: number;
  h: number;
  icon: string;
  /* always true if present */
  support?: boolean;
  stackSize?: number;
  maxStackSize?: number;
  stackSizeText?: string;
  league?: string;
  /* a unique 64 digit hexadecimal string */
  id?: string;
  /* PoE2 only; string is always W */
  gemSockets?: string[];
  influences?: object;
  /* always true if present */
  elder?: boolean;
  /* always true if present */
  shaper?: boolean;
  /* always true if present */
  searing?: boolean;
  /* always true if present */
  tangled?: boolean;
  /* always true if present */
  memoryItem?: boolean;
  /* always true if present */
  abyssJewel?: boolean;
  /* always true if present */
  delve?: boolean;
  /* always true if present */
  fractured?: boolean;
  /* always true if present */
  synthesised?: boolean;
  sockets?: ItemSocket[];
  socketedItems?: Item[];
  name: string;
  typeLine: string;
  baseType: string;
  /* Normal, Magic, Rare, or Unique */
  rarity?: string;
  identified: boolean;
  /* used for items that always display their item level */
  itemLevel?: number;
  /* PoE2 only */
  unidentifiedTier?: number;
  ilvl: number;
  /* user-generated text */
  note?: string;
  /* user-generated text */
  forum_note?: string;
  /* always true if present */
  lockedToCharacter?: boolean;
  /* always true if present */
  lockedToAccount?: boolean;
  /* always true if present */
  duplicated?: boolean;
  /* always true if present */
  split?: boolean;
  /* always true if present */
  corrupted?: boolean;
  /* always true if present */
  unmodifiable?: boolean;
  /* always true if present */
  cisRaceReward?: boolean;
  /* always true if present */
  seaRaceReward?: boolean;
  /* always true if present */
  thRaceReward?: boolean;
  properties?: ItemProperty[];
  notableProperties?: ItemProperty[];
  requirements?: ItemProperty[];
  /* PoE2 only */
  weaponRequirements?: ItemProperty[];
  /* PoE2 only */
  supportGemRequirements?: ItemProperty[];
  additionalProperties?: ItemProperty[];
  nextLevelRequirements?: ItemProperty[];
  /* PoE2 only */
  grantedSkills?: ItemProperty[];
  talismanTier?: number;
  rewards?: object[];
  secDescrText?: string;
  utilityMods?: string[];
  logbookMods?: object[];
  enchantMods?: string[];
  /* PoE2 only */
  runeMods?: string[];
  scourgeMods?: string[];
  implicitMods?: string[];
  ultimatumMods?: object[];
  explicitMods?: string[];
  craftedMods?: string[];
  fracturedMods?: string[];
  /* only allocated mods are included */
  crucibleMods?: string[];
  cosmeticMods?: string[];
  /* random video identifier */
  veiledMods?: string[];
  /* always true if present */
  veiled?: boolean;
  /* PoE2 only */
  gemTabs?: GemTab[];
  /* PoE2 only */
  gemBackground?: string;
  /* PoE2 only */
  gemSkill?: string;
  descrText?: string;
  flavourText?: string[];
  flavourTextParsed?: (string | object)[];
  /* user-generated text */
  flavourTextNote?: string;
  prophecyText?: string;
  /* always true if present */
  isRelic?: boolean;
  foilVariation?: number;
  /* always true if present */
  replica?: boolean;
  /* always true if present */
  foreseeing?: boolean;
  incubatedItem?: object;
  scourged?: object;
  crucible?: object;
  /* always true if present */
  ruthless?: boolean;
  frameType?: FrameType;
  artFilename?: string;
  hybrid?: object;
  /* only present in the Public Stash API */
  extended?: object;
  x?: number;
  y?: number;
  inventoryId?: string;
  socket?: number;
  /* S, D, I, or G */
  colour?: string;
}
/**
 * enum FrameType
 * Referenced by Item→frameType.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export enum FrameType {
	NormalFrame = 0, // Normal frame
	MagicFrame = 1, // Magic frame
	RareFrame = 2, // Rare frame
	UniqueFrame = 3, // Unique frame
	GemFrame = 4, // Gem frame
	CurrencyFrame = 5, // Currency frame
	DivinationCardFrame = 6, // Divination Card frame
	QuestFrame = 7, // Quest frame
	ProphecyFrameLegacy = 8, // Prophecy frame (legacy)
	FoilFrame = 9, // Foil frame
	SupporterFoilFrame = 10, // Supporter Foil frame
	NecropolisFrame = 11, // Necropolis frame
}
/**
 * object ItemSocket
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface ItemSocket {
  group: number;
  /* PoE1 only; S, D, I, G, A, or DV */
  attr?: string;
  /* PoE1 only; R, G, B, W, A, or DV */
  sColour?: string;
  /* PoE2 only; gem, jewel, or rune */
  type?: string;
  /* PoE2 only; emerald, sapphire, ruby, rune, soulcore, primaltalisman, vividtalisman, wildtalisman, sacredtalisman, activegem, or supportgem */
  item?: string;
}
/**
 * object ItemProperty
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface ItemProperty {
  name: string;
  values: [string, number][];
  displayMode?: DisplayMode;
  /* rounded to 2 decimal places */
  progress?: number;
  type?: number;
  suffix?: string;
  icon?: string;
}
/**
 * enum DisplayMode
 * Referenced by ItemProperty→displayMode.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export enum DisplayMode {
	NameShouldBeFollowedByValues = 0, // Name should be followed by values
	ValuesShouldBeFollowedByName = 1, // Values should be followed by name
	ProgressBar = 2, // Progress bar
	ValuesShouldBeInsertedIntoTheStringByIndex = 3, // Values should be inserted into the string by index
	Separator = 4, // Separator
}
/**
 * object Character
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface Character {
  /* a unique 64 digit hexadecimal string */
  id: string;
  name: string;
  /* pc, xbox, or sony */
  realm: string;
  class: string;
  league?: string;
  level: number;
  experience: number;
  /* PoE1 only; always true if present */
  ruthless?: boolean;
  /* always true if present */
  expired?: boolean;
  /* always true if present */
  deleted?: boolean;
  /* always true if present */
  current?: boolean;
  equipment?: Item[];
  /* PoE2 only */
  skills?: Item[];
  inventory?: Item[];
  rucksack?: Item[];
  jewels?: Item[];
  passives?: object;
  metadata?: object;
}
/**
 * object ItemJewelData
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface ItemJewelData {
  type: string;
  radius?: number;
  radiusMin?: number;
  radiusVisual?: string;
  /* only present on cluster jewels */
  subgraph?: object;
}
/**
 * object StashTab
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface StashTab {
  /* a 10 digit hexadecimal string */
  id: string;
  /* a 10 digit hexadecimal string */
  parent?: string;
  name: string;
  type: string;
  index?: number;
  metadata: object;
  children?: StashTab[];
  items?: Item[];
}
/**
 * object LeagueAccount
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface LeagueAccount {
  atlas_passives?: object;
  atlas_passive_trees: object[];
}
/**
 * object ItemFilter
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface ItemFilter {
  id: string;
  filter_name: string;
  realm: string;
  description: string;
  version: string;
  /* either Normal or Ruthless */
  type: string;
  /* always true if present */
  public?: boolean;
  /* not present when listing all filters */
  filter?: string;
  /* not present when listing all filters */
  validation?: object;
}
/**
 * object PassiveGroup
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface PassiveGroup {
  x: number;
  y: number;
  orbits: number[];
  /* always true if present */
  isProxy?: boolean;
  /* identifier of the placeholder node */
  proxy?: string;
  /* the node identifiers associated with this group */
  nodes: string[];
}
/**
 * object PassiveNode
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface PassiveNode {
  /* skill hash */
  skill?: number;
  name?: string;
  icon?: string;
  /* always true if present */
  isKeystone?: boolean;
  /* always true if present */
  isNotable?: boolean;
  /* always true if present */
  isMastery?: boolean;
  /* inactive mastery image */
  inactiveIcon?: string;
  /* active mastery image */
  activeIcon?: string;
  /* active mastery or tattoo background image */
  activeEffectImage?: string;
  masteryEffects?: object[];
  /* always true if present */
  isBlighted?: boolean;
  /* always true if present */
  isTattoo?: boolean;
  /* always true if present */
  isProxy?: boolean;
  /* always true if present */
  isJewelSocket?: boolean;
  /* cluster jewel information */
  expansionJewel?: object;
  /* 
            components required for Blight crafting this node.
            each string is one of ClearOil, SepiaOil, AmberOil, VerdantOil,
            TealOil, AzureOil, IndigoOil, VioletOil, CrimsonOil,
            BlackOil, OpalescentOil, SilverOil, GoldenOil, or PrismaticOil
         */
  recipe?: string[];
  /* sum of stats on this node that grant strength */
  grantedStrength?: number;
  /* sum of stats on this node that grant dexterity */
  grantedDexterity?: number;
  /* sum of stats on this node that grant intelligence */
  grantedIntelligence?: number;
  ascendancyName?: string;
  /* always true if present */
  isAscendancyStart?: boolean;
  /* always true if present */
  isMultipleChoice?: boolean;
  /* always true if present */
  isMultipleChoiceOption?: boolean;
  grantedPassivePoints?: number;
  /* stat descriptions */
  stats?: string[];
  reminderText?: string[];
  flavourText?: string[];
  classStartIndex?: number;
  /* the key value to look up in the groups table */
  group?: string;
  /* the orbit this node occupies within it's group */
  orbit?: number;
  /* the index of this node in the group's orbit */
  orbitIndex?: number;
  /* node identifiers of nodes this one connects to */
  out: string[];
  /* node identifiers of nodes connected to this one */
  in: string[];
}
/**
 * object CrucibleNode
 * Referenced by Item→crucible.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface CrucibleNode {
  /* mod hash */
  skill?: number;
  /* mod tier */
  tier?: number;
  icon?: string;
  /* always true if present */
  allocated?: boolean;
  /* always true if present */
  isNotable?: boolean;
  /* always true if present */
  isReward?: boolean;
  /* stat descriptions */
  stats?: string[];
  reminderText?: string[];
  /* the column this node occupies */
  orbit?: number;
  /* the node's position within the column */
  orbitIndex?: number;
  /* node identifiers of nodes this one connects to */
  out: string[];
  /* node identifiers of nodes connected to this one */
  in: string[];
}
/**
 * object GemTab
 * Referenced by Item→gemTabs.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface GemTab {
  name?: string;
  pages: GemPage[];
}
/**
 * object GemPage
 * Referenced by GemTab→pages.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export interface GemPage {
  skillName?: string;
  description?: string;
  properties?: ItemProperty[];
  stats?: string[];
}