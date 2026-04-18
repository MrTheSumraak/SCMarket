import ItemList from '../../assets/items/ru/listing.json';
import { RANKS_ITEMS, TYPES_ITEMS } from '../types';

export interface IGetInfoItem {
  data: string;
  icon: string;
  name: INameItem;
  color: string;
  status: object;
}

export interface INameItem {
  type: string;
  key: string;
  args: object;
  lines: {
    ru: string;
    en: string;
    es: string;
    fr: string;
    ko: string;
  };
}

export const extractId = (data: string): string => {
  return data.split('/').pop()!.replace('.json', '');
};

export const extractCategory = (data: string) => {
  const parts = data.split('/').filter(Boolean);

  // ищем любой сегмент, который есть в TYPES_ITEMS
  for (const part of parts) {
    if (part in TYPES_ITEMS) {
      return TYPES_ITEMS[part as keyof typeof TYPES_ITEMS];
    }
  }

  return undefined;
};

export const extractRanks = (ranks: string) => {
  if (ranks in RANKS_ITEMS) {
    return RANKS_ITEMS[ranks as keyof typeof RANKS_ITEMS];
  }
};

export const getInfoItem = (id: string): IGetInfoItem | null => {
  return ItemList.find((item) => extractId(item.data) === id) ?? null;
};

export const getInfoAllItem = () => {
  return ItemList;
};

export function findItemIdByName(name: string): string | null {
  const item = ItemList.find((i) => i.name?.lines?.ru?.toLowerCase() === name.toLowerCase());

  if (!item) return null;

  // data: "/items/weapon/assault_rifle/g4mdp.json"
  const parts = item.data.split('/');
  const file = parts[parts.length - 1]; // g4mdp.json
  return file.replace('.json', ''); // g4mdp
}

export const formatPrice = (value: number | string) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
