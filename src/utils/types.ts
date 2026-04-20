export const TYPES_ITEMS = {
  pistol: 'Пистолеты',
  assault_rifle: 'Автоматы',
  machine_gun: 'Пулеметы',
  shotgun_rifle: 'Дробовики',
  sniper_rifle: 'Снайперские винтовки',
  submachine_gun: 'Пистолеты-пулеметы',
  biochemical: 'Биохимические',
  electrophysical: 'Электрофизические',
  gravity: 'Гравитационные',
  thermal: 'Термические',
  other_arts: 'Прочее',
  bullet: 'Патроны',
  other: 'Другое',
  misc: 'Разное',
  medicine: 'Медицина',
  grenade: 'Гранаты',
  food: 'Еда',
  backpacks: 'Рюкзаки',
  containers: 'Контейнеры',
  drink: 'Напитки',
  weapon_skins: 'Облик на оружение',
  armor_skins: 'Облик на броню',
  combat: 'Боевые',
  combined: 'Комбинированные',
  scientist: 'Научные',
  clothes: 'Одежда',
  device: 'Устройства',
} as const;

export type TItemType = keyof typeof TYPES_ITEMS;

export const RANKS_ITEMS = {
  RANK_VETERAN: 'Ветеран',
  RANK_STALKER: 'Сталкер',
  RANK_MASTER: 'Мастер',
  DEFAULT: 'Обычный',
  RANK_LEGEND: 'Легендарный',
  RANK_NEWBIE: 'Новичок',
  QUEST_ITEM: 'Квестовый предмет',
};

export type TItemRank = keyof typeof RANKS_ITEMS;

export interface IItemInfoBlock {
  type: string;
  title: [];
  text: ITextInfo;
}

export interface ITextInfo {
  type: string;
  key: string;
  args: any[];
  lines: {
    ru: string;
    en: string;
    es: string;
    fr: string;
  };
}

export type TItemConfig = {
  image: string;
  category: TItemType;
  subCategory?: string;
  color: TItemRank;
  id: string;
  infoBlocks: IItemInfoBlock[] | string;
  name: INameItems;
  status: [];
};

export interface INameItems {
  args: [];
  key: string;
  lines: {
    ru: string;
    en: string;
    es: string;
    fr: string;
  };
}

export type TItemComponent = {
  id: string;
  rarity: TItemRank;
  price: number;
  description: IItemInfoBlock[] | string | undefined;
  name?: string;
  type: TItemType;
  image: string;
  category: string; // основная категория (weapons, armors…)
  subCategory?: TItemType; // подкатегория, если есть
  url?: string;
};

// Сопоставление категории с папкой в GitHub
export const CATEGORY_MAP: Record<string, string> = {
  weapons: 'weapon',
  armors: 'armor',
  artefacts: 'artefact',
  bullet: 'bullet',
  other: 'other',
  misc: 'misc',
  medicine: 'medicine',
  grenade: 'grenade',
  food: 'food',
  attachment: 'attachment',
  backpacks: 'backpacks',
  containers: 'containers',
  drink: 'drink',
  weapon_skins: 'weapon_style/skins',
  armor_skins: 'armor_style/skins',
};

// Определяем класс для glow по редкости
export const rarityGlowMap: Record<string, string> = {
  RANK_MASTER: 'glowRare',
  RANK_VETERAN: 'glowUnusual',
  RANK_LEGEND: 'glowLegendary',
  RANK_STALKER: 'glowCommon',
  DEFAULT: 'glowDefault',
  RANK_NEWBIE: 'glowNewbie',
};

//Типы получаения токенов нахуй бля
export interface ITokensUser {
  code: string;
}

export interface ITokenUser {
  access_token: string;
  refresh_token: string;
}

export interface IAccessAuth {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface IRefreshToken {
  cliend_id: number;
  client_secret: string;
  grant_type: string;
  refresh_token: string;
  scope: string;
}

export interface IGrantType {
  grant_type: 'authorization_code' | 'refresh_token' | 'client_credentials';
}

export interface IUser {
  id: number | null;
  uuid: string | null;
  login: string;
  display_login: string | null;
  distributor: string | null;
  distributor_id: string | null;
}

export interface IItems {
  itemid: string;
  amount: number;
  startPrice: number;
  currentPrice: number;
  buyoutPrice: number;
  startTime: string;
  endTime: string;
  additional: string;
}

export interface IItemsHistory {
  id: string;
  image: string;
  price: number;
  record_id: string;
  time: string;
  total: string;
  additional: [];
  infoItems: [];
}

interface IItemsSaleHistory {
  amount: number;
  price: number;
  time: string;
  additional: Record<string, unknown>;
}

export interface IHistoryResponse {
  total: number;
  prices: IItemsSaleHistory[];
}

export interface IItemsHistoryData {
  item: IItemsHistory[];
}

//analytics types

export interface IAnalyticsItem {
  buy_price_min: number;
  buy_price_max: number;
  sell_price_min: number;
  sell_price_max: number;
  countItem: [];
}

//types json

export interface IGetInfoItemCard {
  json: string | null;
}

export interface ItemStat {
  name: string;
  value: string | number;
}

export interface ItemMeta {
  name: string;
  value: string | number | null;
}

export interface ItemInfo {
  raw: any;

  description: string | null;
  textBlocks: string[];

  stats: ItemStat[];
  meta: ItemMeta[];

  rank: string | null;
  category: string | null;
  subcategory: string | null;
  itemType: string | null;
  class: string | null;
  damageType: string | null;
  caliber: string | null;
  ammoType: string | null;
  armorClass: string | null;
  rarity: string | null;
  weight: string | null;
}
