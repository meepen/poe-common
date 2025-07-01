// This file is auto-generated from https://www.pathofexile.com/developer/docs/reference#types

// This file is auto-generated from https://www.pathofexile.com/developer/docs/reference#types

import { Type, Expose } from 'class-transformer';
import { IsOptional, ValidateNested, IsArray, IsObject, IsInt, Max, Min, IsNumber, IsString, IsBoolean } from 'class-validator';
import { IsAny } from './is-any.js';
import { Dictionary, IsDictionary, TransformDictionary } from './is-dictionary.js';

/**
 * object LeagueCategory
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LeagueCategory {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  current?: boolean;
}
/**
 * object LeagueRule
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LeagueRule {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;
}
/**
 * object League
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class League {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsOptional()
  @IsString()
  realm?: string;
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;
  @Expose()
  @IsOptional()
  @Type(() => LeagueCategory)
  @ValidateNested()
  category?: LeagueCategory;
  @Expose()
  @IsOptional()
  @Type(() => LeagueRule)
  @IsArray()
  @ValidateNested({ each: true })
  rules?: LeagueRule[];
  @Expose()
  @IsOptional()
  @IsString()
  registerAt?: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  event?: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  url?: string;
  @Expose()
  @IsOptional()
  @IsString()
  startAt?: string;
  @Expose()
  @IsOptional()
  @IsString()
  endAt?: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  timedEvent?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  scoreEvent?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  delveEvent?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  ancestorEvent?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  leagueEvent?: boolean;
}
/**
 * object LadderEntryCharacterDepth
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LadderEntryCharacterDepth {
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  default?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  solo?: number;
}
/**
 * object LadderEntryCharacter
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LadderEntryCharacter {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  level!: number;
  @Expose()
  @IsString()
  class!: string;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  time?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  score?: number;
  @Expose()
  @IsOptional()
  @IsObject()
  progress?: Dictionary<object>;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  experience?: number;
  @Expose()
  @IsOptional()
  @Type(() => LadderEntryCharacterDepth)
  @ValidateNested()
  depth?: LadderEntryCharacterDepth;
}
/**
 * object Guild
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class Guild {
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  id!: number;
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsString()
  tag!: string;
}
/**
 * object AccountChallenges
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class AccountChallenges {
  @Expose()
  @IsString()
  set!: string;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  completed!: number;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  max!: number;
}
/**
 * object AccountTwitchStream
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class AccountTwitchStream {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsString()
  image!: string;
  @Expose()
  @IsString()
  status!: string;
}
/**
 * object AccountTwitch
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class AccountTwitch {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsOptional()
  @Type(() => AccountTwitchStream)
  @ValidateNested()
  stream?: AccountTwitchStream;
}
/**
 * object Account
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class Account {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsOptional()
  @IsString()
  realm?: string;
  @Expose()
  @IsOptional()
  @Type(() => Guild)
  @ValidateNested()
  guild?: Guild;
  @Expose()
  @IsOptional()
  @Type(() => AccountChallenges)
  @ValidateNested()
  challenges?: AccountChallenges;
  @Expose()
  @IsOptional()
  @Type(() => AccountTwitch)
  @ValidateNested()
  twitch?: AccountTwitch;
}
/**
 * object LadderEntry
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LadderEntry {
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  rank!: number;
  @Expose()
  @IsOptional()
  @IsBoolean()
  dead?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  retired?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  ineligible?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  public?: boolean;
  @Expose()
  @Type(() => LadderEntryCharacter)
  @ValidateNested()
  character!: LadderEntryCharacter;
  @Expose()
  @IsOptional()
  @Type(() => Account)
  @ValidateNested()
  account?: Account;
}
/**
 * object EventLadderEntryPrivate_league
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class EventLadderEntryPrivate_league {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsString()
  url!: string;
}
/**
 * object EventLadderEntry
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class EventLadderEntry {
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  rank!: number;
  @Expose()
  @IsOptional()
  @IsBoolean()
  ineligible?: boolean;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  time?: number;
  @Expose()
  @Type(() => EventLadderEntryPrivate_league)
  @ValidateNested()
  private_league!: EventLadderEntryPrivate_league;
}
/**
 * object PvPMatch
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PvPMatch {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsOptional()
  @IsString()
  realm?: string;
  @Expose()
  @IsOptional()
  @IsString()
  startAt?: string;
  @Expose()
  @IsOptional()
  @IsString()
  endAt?: string;
  @Expose()
  @IsOptional()
  @IsString()
  url?: string;
  @Expose()
  @IsString()
  description!: string;
  @Expose()
  @IsBoolean()
  glickoRatings!: boolean;
  @Expose()
  @IsBoolean()
  pvp!: boolean;
  @Expose()
  @IsString()
  style!: string;
  @Expose()
  @IsOptional()
  @IsString()
  registerAt?: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  complete?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  upcoming?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  inProgress?: boolean;
}
/**
 * object PvPLadderTeamMemberCharacter
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PvPLadderTeamMemberCharacter {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  level!: number;
  @Expose()
  @IsString()
  class!: string;
  @Expose()
  @IsOptional()
  @IsString()
  league?: string;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  score?: number;
}
/**
 * object PvPLadderTeamMember
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PvPLadderTeamMember {
  @Expose()
  @Type(() => Account)
  @ValidateNested()
  account!: Account;
  @Expose()
  @Type(() => PvPLadderTeamMemberCharacter)
  @ValidateNested()
  character!: PvPLadderTeamMemberCharacter;
  @Expose()
  @IsOptional()
  @IsBoolean()
  public?: boolean;
}
/**
 * object PvPLadderTeamEntry
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PvPLadderTeamEntry {
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  rank!: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  rating?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  points?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  games_played?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  cumulative_opponent_points?: number;
  @Expose()
  @IsOptional()
  @IsString()
  last_game_time?: string;
  @Expose()
  @Type(() => PvPLadderTeamMember)
  @IsArray()
  @ValidateNested({ each: true })
  members!: PvPLadderTeamMember[];
}
/**
 * object ItemSocket
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemSocket {
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  group!: number;
  @Expose()
  @IsOptional()
  @IsString()
  attr?: string;
  @Expose()
  @IsOptional()
  @IsString()
  sColour?: string;
  @Expose()
  @IsOptional()
  @IsString()
  type?: string;
  @Expose()
  @IsOptional()
  @IsString()
  item?: string;
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
 * object ItemProperty
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemProperty {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsArray()
  values!: ([string, number])[];
  @Expose()
  @IsOptional()
  displayMode?: DisplayMode;
  @Expose()
  @IsOptional()
  @IsNumber()
  progress?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  type?: number;
  @Expose()
  @IsOptional()
  @IsString()
  suffix?: string;
  @Expose()
  @IsOptional()
  @IsString()
  icon?: string;
}
/**
 * object ItemRewards
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemRewards {
  @Expose()
  @IsString()
  label!: string;
  @Expose()
  @IsDictionary([IsInt(), Max(0x7FFFFFFF), Min(-0x80000000)])
  @Type(() => Dictionary<unknown>)
  rewards!: Dictionary<number>;
}
/**
 * object ItemLogbookModsFaction
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemLogbookModsFaction {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsString()
  name!: string;
}
/**
 * object ItemLogbookMods
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemLogbookMods {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @Type(() => ItemLogbookModsFaction)
  @ValidateNested()
  faction!: ItemLogbookModsFaction;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  mods!: string[];
}
/**
 * object ItemUltimatumMods
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemUltimatumMods {
  @Expose()
  @IsString()
  type!: string;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  tier!: number;
}
/**
 * object GemPage
 * Referenced by GemTab→pages.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class GemPage {
  /**
   * 
   */
  @Expose()
  @IsOptional()
  @IsString()
  skillName?: string;
  /**
   * 
   */
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;
  /**
   * 
   */
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  properties?: ItemProperty[];
  /**
   * 
   */
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  stats?: string[];
}
/**
 * object GemTab
 * Referenced by Item→gemTabs.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class GemTab {
  /**
   * 
   */
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;
  /**
   * 
   */
  @Expose()
  @Type(() => GemPage)
  @IsArray()
  @ValidateNested({ each: true })
  pages!: GemPage[];
}
/**
 * object ItemIncubatedItem
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemIncubatedItem {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  level!: number;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  progress!: number;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  total!: number;
}
/**
 * object ItemScourged
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemScourged {
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  tier!: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  level?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  progress?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  total?: number;
}
/**
 * object CrucibleNode
 * Referenced by Item→crucible.
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class CrucibleNode {
  /**
   * mod hash
   */
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  skill?: number;
  /**
   * mod tier
   */
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  tier?: number;
  /**
   * 
   */
  @Expose()
  @IsOptional()
  @IsString()
  icon?: string;
  /**
   * always true if present
   */
  @Expose()
  @IsOptional()
  @IsBoolean()
  allocated?: boolean;
  /**
   * always true if present
   */
  @Expose()
  @IsOptional()
  @IsBoolean()
  isNotable?: boolean;
  /**
   * always true if present
   */
  @Expose()
  @IsOptional()
  @IsBoolean()
  isReward?: boolean;
  /**
   * stat descriptions
   */
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  stats?: string[];
  /**
   * 
   */
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  reminderText?: string[];
  /**
   * the column this node occupies
   */
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  orbit?: number;
  /**
   * the node's position within the column
   */
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  orbitIndex?: number;
  /**
   * node identifiers of nodes this one connects to
   */
  @Expose()
  @IsArray()
  @IsString({ each: true })
  out!: string[];
  /**
   * node identifiers of nodes connected to this one
   */
  @Expose()
  @IsArray()
  @IsString({ each: true })
  in!: string[];
}
/**
 * object ItemCrucible
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemCrucible {
  @Expose()
  @IsString()
  layout!: string;
  @Expose()
  @IsDictionary([Type(() => CrucibleNode), ValidateNested()])
  @TransformDictionary(CrucibleNode)
  nodes!: Dictionary<CrucibleNode>;
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
 * object ItemHybrid
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemHybrid {
  @Expose()
  @IsOptional()
  @IsBoolean()
  isVaalGem?: boolean;
  @Expose()
  @IsString()
  baseTypeName!: string;
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  properties?: ItemProperty[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  explicitMods?: string[];
  @Expose()
  @IsOptional()
  @IsString()
  secDescrText?: string;
}
/**
 * object ItemExtended
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemExtended {
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  prefixes?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  suffixes?: number;
}
/**
 * object Item
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class Item {
  @Expose()
  @IsOptional()
  @IsString()
  realm?: string;
  @Expose()
  @IsBoolean()
  verified!: boolean;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  w!: number;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  h!: number;
  @Expose()
  @IsString()
  icon!: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  support?: boolean;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0x7FFFFFFF)
  @Min(-0x80000000)
  stackSize?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0x7FFFFFFF)
  @Min(-0x80000000)
  maxStackSize?: number;
  @Expose()
  @IsOptional()
  @IsString()
  stackSizeText?: string;
  @Expose()
  @IsOptional()
  @IsString()
  league?: string;
  @Expose()
  @IsOptional()
  @IsString()
  id?: string;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gemSockets?: string[];
  @Expose()
  @IsOptional()
  @IsObject()
  influences?: Dictionary<object>;
  @Expose()
  @IsOptional()
  @IsBoolean()
  elder?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  shaper?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  searing?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  tangled?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  memoryItem?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  abyssJewel?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  delve?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  fractured?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  synthesised?: boolean;
  @Expose()
  @IsOptional()
  @Type(() => ItemSocket)
  @IsArray()
  @ValidateNested({ each: true })
  sockets?: ItemSocket[];
  @Expose()
  @IsOptional()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  socketedItems?: Item[];
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsString()
  typeLine!: string;
  @Expose()
  @IsString()
  baseType!: string;
  @Expose()
  @IsOptional()
  @IsString()
  rarity?: string;
  @Expose()
  @IsBoolean()
  identified!: boolean;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0x7FFFFFFF)
  @Min(-0x80000000)
  itemLevel?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0x7FFFFFFF)
  @Min(-0x80000000)
  unidentifiedTier?: number;
  @Expose()
  @IsInt()
  @Max(0x7FFFFFFF)
  @Min(-0x80000000)
  ilvl!: number;
  @Expose()
  @IsOptional()
  @IsString()
  note?: string;
  @Expose()
  @IsOptional()
  @IsString()
  forum_note?: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  lockedToCharacter?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  lockedToAccount?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  duplicated?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  split?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  corrupted?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  unmodifiable?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  cisRaceReward?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  seaRaceReward?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  thRaceReward?: boolean;
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  properties?: ItemProperty[];
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  notableProperties?: ItemProperty[];
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  requirements?: ItemProperty[];
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  weaponRequirements?: ItemProperty[];
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  supportGemRequirements?: ItemProperty[];
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  additionalProperties?: ItemProperty[];
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  nextLevelRequirements?: ItemProperty[];
  @Expose()
  @IsOptional()
  @Type(() => ItemProperty)
  @IsArray()
  @ValidateNested({ each: true })
  grantedSkills?: ItemProperty[];
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0x7FFFFFFF)
  @Min(-0x80000000)
  talismanTier?: number;
  @Expose()
  @IsOptional()
  @Type(() => ItemRewards)
  @IsArray()
  @ValidateNested({ each: true })
  rewards?: ItemRewards[];
  @Expose()
  @IsOptional()
  @IsString()
  secDescrText?: string;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  utilityMods?: string[];
  @Expose()
  @IsOptional()
  @Type(() => ItemLogbookMods)
  @IsArray()
  @ValidateNested({ each: true })
  logbookMods?: ItemLogbookMods[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enchantMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  runeMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scourgeMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  implicitMods?: string[];
  @Expose()
  @IsOptional()
  @Type(() => ItemUltimatumMods)
  @IsArray()
  @ValidateNested({ each: true })
  ultimatumMods?: ItemUltimatumMods[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  explicitMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  craftedMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fracturedMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  crucibleMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cosmeticMods?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  veiledMods?: string[];
  @Expose()
  @IsOptional()
  @IsBoolean()
  veiled?: boolean;
  @Expose()
  @IsOptional()
  @Type(() => GemTab)
  @IsArray()
  @ValidateNested({ each: true })
  gemTabs?: GemTab[];
  @Expose()
  @IsOptional()
  @IsString()
  gemBackground?: string;
  @Expose()
  @IsOptional()
  @IsString()
  gemSkill?: string;
  @Expose()
  @IsOptional()
  @IsString()
  descrText?: string;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  flavourText?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsAny([[IsString()], [IsObject()]], { each: true })
  flavourTextParsed?: (string | Dictionary<object>)[];
  @Expose()
  @IsOptional()
  @IsString()
  flavourTextNote?: string;
  @Expose()
  @IsOptional()
  @IsString()
  prophecyText?: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isRelic?: boolean;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0x7FFFFFFF)
  @Min(-0x80000000)
  foilVariation?: number;
  @Expose()
  @IsOptional()
  @IsBoolean()
  replica?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  foreseeing?: boolean;
  @Expose()
  @IsOptional()
  @Type(() => ItemIncubatedItem)
  @ValidateNested()
  incubatedItem?: ItemIncubatedItem;
  @Expose()
  @IsOptional()
  @Type(() => ItemScourged)
  @ValidateNested()
  scourged?: ItemScourged;
  @Expose()
  @IsOptional()
  @Type(() => ItemCrucible)
  @ValidateNested()
  crucible?: ItemCrucible;
  @Expose()
  @IsOptional()
  @IsBoolean()
  ruthless?: boolean;
  @Expose()
  @IsOptional()
  frameType?: FrameType;
  @Expose()
  @IsOptional()
  @IsString()
  artFilename?: string;
  @Expose()
  @IsOptional()
  @Type(() => ItemHybrid)
  @ValidateNested()
  hybrid?: ItemHybrid;
  @Expose()
  @IsOptional()
  @Type(() => ItemExtended)
  @ValidateNested()
  extended?: ItemExtended;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  x?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  y?: number;
  @Expose()
  @IsOptional()
  @IsString()
  inventoryId?: string;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  socket?: number;
  @Expose()
  @IsOptional()
  @IsString()
  colour?: string;
}
/**
 * object PublicStashChange
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PublicStashChange {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsBoolean()
  public!: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  accountName?: string;
  @Expose()
  @IsOptional()
  @IsString()
  stash?: string;
  @Expose()
  @IsString()
  stashType!: string;
  @Expose()
  @IsOptional()
  @IsString()
  league?: string;
  @Expose()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  items!: Item[];
}
/**
 * object PassiveNodeMasteryEffects
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PassiveNodeMasteryEffects {
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  effect!: number;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  stats!: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  reminderText?: string[];
}
/**
 * object PassiveNodeExpansionJewel
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PassiveNodeExpansionJewel {
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  size?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  index?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  proxy?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  parent?: number;
}
/**
 * object PassiveNode
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PassiveNode {
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  skill?: number;
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;
  @Expose()
  @IsOptional()
  @IsString()
  icon?: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isKeystone?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isNotable?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isMastery?: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  inactiveIcon?: string;
  @Expose()
  @IsOptional()
  @IsString()
  activeIcon?: string;
  @Expose()
  @IsOptional()
  @IsString()
  activeEffectImage?: string;
  @Expose()
  @IsOptional()
  @Type(() => PassiveNodeMasteryEffects)
  @IsArray()
  @ValidateNested({ each: true })
  masteryEffects?: PassiveNodeMasteryEffects[];
  @Expose()
  @IsOptional()
  @IsBoolean()
  isBlighted?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isTattoo?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isProxy?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isJewelSocket?: boolean;
  @Expose()
  @IsOptional()
  @Type(() => PassiveNodeExpansionJewel)
  @ValidateNested()
  expansionJewel?: PassiveNodeExpansionJewel;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  recipe?: string[];
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  grantedStrength?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  grantedDexterity?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  grantedIntelligence?: number;
  @Expose()
  @IsOptional()
  @IsString()
  ascendancyName?: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isAscendancyStart?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isMultipleChoice?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  isMultipleChoiceOption?: boolean;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  grantedPassivePoints?: number;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  stats?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  reminderText?: string[];
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  flavourText?: string[];
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  classStartIndex?: number;
  @Expose()
  @IsOptional()
  @IsString()
  group?: string;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  orbit?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  orbitIndex?: number;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  out!: string[];
  @Expose()
  @IsArray()
  @IsString({ each: true })
  in!: string[];
}
/**
 * object PassiveGroup
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class PassiveGroup {
  @Expose()
  @IsNumber()
  x!: number;
  @Expose()
  @IsNumber()
  y!: number;
  @Expose()
  @IsArray()
  @IsInt({ each: true })
  @Max(0xFFFFFFFF, { each: true })
  @Min(0, { each: true })
  orbits!: number[];
  @Expose()
  @IsOptional()
  @IsBoolean()
  isProxy?: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  proxy?: string;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  nodes!: string[];
}
/**
 * object ItemJewelDataSubgraph
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemJewelDataSubgraph {
  @Expose()
  @IsDictionary([Type(() => PassiveGroup), ValidateNested()])
  @TransformDictionary(PassiveGroup)
  groups!: Dictionary<PassiveGroup>;
  @Expose()
  @IsDictionary([Type(() => PassiveNode), ValidateNested()])
  @TransformDictionary(PassiveNode)
  nodes!: Dictionary<PassiveNode>;
}
/**
 * object ItemJewelData
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemJewelData {
  @Expose()
  @IsString()
  type!: string;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  radius?: number;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  radiusMin?: number;
  @Expose()
  @IsOptional()
  @IsString()
  radiusVisual?: string;
  @Expose()
  @IsOptional()
  @Type(() => ItemJewelDataSubgraph)
  @ValidateNested()
  subgraph?: ItemJewelDataSubgraph;
}
/**
 * object CharacterPassives
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class CharacterPassives {
  @Expose()
  @IsArray()
  @IsInt({ each: true })
  @Max(0xFFFFFFFF, { each: true })
  @Min(0, { each: true })
  hashes!: number[];
  @Expose()
  @IsArray()
  @IsInt({ each: true })
  @Max(0xFFFFFFFF, { each: true })
  @Min(0, { each: true })
  hashes_ex!: number[];
  @Expose()
  @IsDictionary([IsInt(), Max(0x7FFFFFFF), Min(-0x80000000)])
  @Type(() => Dictionary<unknown>)
  mastery_effects!: Dictionary<number>;
  @Expose()
  @IsDictionary([IsArray(), IsInt({ each: true }), Max(0x7FFFFFFF, { each: true }), Min(-0x80000000, { each: true })])
  @Type(() => Dictionary<unknown>)
  specialisations!: Dictionary<number[]>;
  @Expose()
  @IsDictionary([Type(() => PassiveNode), ValidateNested()])
  @TransformDictionary(PassiveNode)
  skill_overrides!: Dictionary<PassiveNode>;
  @Expose()
  @IsOptional()
  @IsString()
  bandit_choice?: string;
  @Expose()
  @IsOptional()
  @IsString()
  pantheon_major?: string;
  @Expose()
  @IsOptional()
  @IsString()
  pantheon_minor?: string;
  @Expose()
  @IsDictionary([Type(() => ItemJewelData), ValidateNested()])
  @TransformDictionary(ItemJewelData)
  jewel_data!: Dictionary<ItemJewelData>;
  @Expose()
  @IsOptional()
  @IsString()
  alternate_ascendancy?: string;
}
/**
 * object CharacterMetadata
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class CharacterMetadata {
  @Expose()
  @IsOptional()
  @IsString()
  version?: string;
}
/**
 * object Character
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class Character {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsString()
  realm!: string;
  @Expose()
  @IsString()
  class!: string;
  @Expose()
  @IsOptional()
  @IsString()
  league?: string;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  level!: number;
  @Expose()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  experience!: number;
  @Expose()
  @IsOptional()
  @IsBoolean()
  ruthless?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  expired?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  current?: boolean;
  @Expose()
  @IsOptional()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  equipment?: Item[];
  @Expose()
  @IsOptional()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  skills?: Item[];
  @Expose()
  @IsOptional()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  inventory?: Item[];
  @Expose()
  @IsOptional()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  rucksack?: Item[];
  @Expose()
  @IsOptional()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  jewels?: Item[];
  @Expose()
  @IsOptional()
  @Type(() => CharacterPassives)
  @ValidateNested()
  passives?: CharacterPassives;
  @Expose()
  @IsOptional()
  @Type(() => CharacterMetadata)
  @ValidateNested()
  metadata?: CharacterMetadata;
}
/**
 * object StashTabMetadata
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class StashTabMetadata {
  @Expose()
  @IsOptional()
  @IsBoolean()
  public?: boolean;
  @Expose()
  @IsOptional()
  @IsBoolean()
  folder?: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  colour?: string;
}
/**
 * object StashTab
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class StashTab {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsOptional()
  @IsString()
  parent?: string;
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsString()
  type!: string;
  @Expose()
  @IsOptional()
  @IsInt()
  @Max(0xFFFFFFFF)
  @Min(0)
  index?: number;
  @Expose()
  @Type(() => StashTabMetadata)
  @ValidateNested()
  metadata!: StashTabMetadata;
  @Expose()
  @IsOptional()
  @Type(() => StashTab)
  @IsArray()
  @ValidateNested({ each: true })
  children?: StashTab[];
  @Expose()
  @IsOptional()
  @Type(() => Item)
  @IsArray()
  @ValidateNested({ each: true })
  items?: Item[];
}
/**
 * object LeagueAccountAtlas_passives
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LeagueAccountAtlas_passives {
  @Expose()
  @IsArray()
  @IsInt({ each: true })
  @Max(0xFFFFFFFF, { each: true })
  @Min(0, { each: true })
  hashes!: number[];
}
/**
 * object LeagueAccountAtlas_passive_trees
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LeagueAccountAtlas_passive_trees {
  @Expose()
  @IsString()
  name!: string;
  @Expose()
  @IsArray()
  @IsInt({ each: true })
  @Max(0xFFFFFFFF, { each: true })
  @Min(0, { each: true })
  hashes!: number[];
}
/**
 * object LeagueAccount
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class LeagueAccount {
  @Expose()
  @IsOptional()
  @Type(() => LeagueAccountAtlas_passives)
  @ValidateNested()
  atlas_passives?: LeagueAccountAtlas_passives;
  @Expose()
  @Type(() => LeagueAccountAtlas_passive_trees)
  @IsArray()
  @ValidateNested({ each: true })
  atlas_passive_trees!: LeagueAccountAtlas_passive_trees[];
}
/**
 * object ItemFilterValidation
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemFilterValidation {
  @Expose()
  @IsBoolean()
  valid!: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  version?: string;
  @Expose()
  @IsOptional()
  @IsString()
  validated?: string;
}
/**
 * object ItemFilter
 * Generated from https://www.pathofexile.com/developer/docs/reference#types
 */
export class ItemFilter {
  @Expose()
  @IsString()
  id!: string;
  @Expose()
  @IsString()
  filter_name!: string;
  @Expose()
  @IsString()
  realm!: string;
  @Expose()
  @IsString()
  description!: string;
  @Expose()
  @IsString()
  version!: string;
  @Expose()
  @IsString()
  type!: string;
  @Expose()
  @IsOptional()
  @IsBoolean()
  public?: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  filter?: string;
  @Expose()
  @IsOptional()
  @Type(() => ItemFilterValidation)
  @ValidateNested()
  validation?: ItemFilterValidation;
}
