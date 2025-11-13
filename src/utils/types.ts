export const TYPES_ITEMS = {
    'weapon/pistol': 'Пистолеты',
    'weapon/assault_rifle': 'Винтовки',
    'weapon/machine_gun': 'Пулеметы',
    'weapon/shotgun_rifle': 'Дробовики',
    'weapon/sniper_rifle': 'Снайперские винтовки',
    'weapon/submachine_gun': 'Пистолеты-пулеметы'
} as const;

export type TItemType = keyof typeof TYPES_ITEMS;

export const RANKS_ITEMS = {
    'RANK_VETERAN': 'Ветеран',
    'RANK_STALKER': 'Сталкер',
    'RANK_MASTER': 'Мастер',
    'DEFAULT': 'Отмычка',
    'RANK_LEGEND': 'Легендарный',
    'RANK_NEWBIE': 'Новичок'
}

export type TItemRank = keyof typeof RANKS_ITEMS;

