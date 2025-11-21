
export const TYPES_ITEMS = {
    'pistol': 'Пистолеты',
    'assault_rifle': 'Винтовки',
    'machine_gun': 'Пулеметы',
    'shotgun_rifle': 'Дробовики',
    'sniper_rifle': 'Снайперские винтовки',
    'submachine_gun': 'Пистолеты-пулеметы',
    'biochemical': 'Биохимические',
    'electrophysical' : 'Электрофизические',
    'gravity': 'Гравитационные',
    'thermal': 'Термические',
    'other_arts': 'Прочее',
    'bullet': 'Патроны',
    'other': 'Другое',
    'misc': 'Разное',
    'medicine': 'Медицина',
    'grenade': 'Гранаты',
    'food': 'Еда',
    'backpacks': 'Рюкзаки',
    'containers': 'Контейнеры',
    'drink': 'Напитки',
    'weapon_skins': 'Облик на оружение',
    'armor_skins': 'Облик на броню',
    'combat': 'Боевые',
    'combined': 'Комбинированные',
    'scientist': 'Научные',
    'clothes': 'Одежда',
    'device': 'Устройства'
} as const;

export type TItemType = keyof typeof TYPES_ITEMS;

export const RANKS_ITEMS = {
    'RANK_VETERAN': 'Ветеран',
    'RANK_STALKER': 'Сталкер',
    'RANK_MASTER': 'Мастер',
    'DEFAULT': 'Отмычка',
    'RANK_LEGEND': 'Легендарный',
    'RANK_NEWBIE': 'Новичок',
    'QUEST_ITEM': 'Квестовый предмет'
}

export type TItemRank = keyof typeof RANKS_ITEMS;


export type TItemConfig = {
image: string
  category: TItemType,
  subCategory?: TItemType,
  color: TItemRank,
  id: string,
  infoBlocks: [],
  name: INameItems,
  status: []
}

export interface INameItems  {
  args: [],
  key: string,
  lines: {
    ru: string,
    en: string,
    es: string,
    fr: string
  }
}


export type TItemComponent = {
  id: string;
  rarity: TItemRank;
  price: string | number;
  name?: string;
  type: TItemType;
  image: string;
  category: string;      // основная категория (weapons, armors…)
  subCategory?: TItemType;  // подкатегория, если есть
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

