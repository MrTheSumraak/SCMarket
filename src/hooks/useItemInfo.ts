// src/hooks/useItemInfo.ts
import { useEffect, useState } from 'react';
import type { IGetInfoItemCard, ItemInfo } from '../utils/types';

export const getInfoItemCard = (itemid: string): IGetInfoItemCard => {
  const modules = import.meta.glob('/src/assets/items/**/*.json');

  let jsonPath: string | null = null;

  for (const path in modules) {
    if (path.endsWith(`${itemid}.json`)) {
      jsonPath = path;
      break;
    }
  }

  return { json: jsonPath };
};

export const useItemInfo = (itemid: string) => {
  const [item, setItem] = useState<ItemInfo | null>(null);

  useEffect(() => {
    const { json } = getInfoItemCard(itemid);
    if (!json) return;

    import(/* @vite-ignore */ json)
      .then((module) => {
        const data = module.default;

        // --- Description ---
        const descriptionBlock = data.infoBlocks.find(
          (b: any) => b.type === 'text' && b.text?.lines?.ru,
        );
        const description = descriptionBlock?.text?.lines?.ru ?? null;

        // --- Stats (numeric) ---
        const stats: ItemInfo['stats'] = [];
        const meta: ItemInfo['meta'] = [];
        const textBlocks: string[] = [];

        // Вытягиваемые параметры
        let rank: string | null = null;
        let category: string | null = null;
        let subcategory: string | null = null;
        let itemType: string | null = null;
        let classType: string | null = null;
        let damageType: string | null = null;
        let caliber: string | null = null;
        let ammoType: string | null = null;
        let armorClass: string | null = null;
        let rarity: string | null = null;
        let weight: string | null = null;

        for (const block of data.infoBlocks) {
          // text blocks
          if (block.type === 'text' && block.text?.lines?.ru) {
            textBlocks.push(block.text.lines.ru);
          }

          if (!block.elements) continue;

          for (const el of block.elements) {
            // numeric
            if (el.type === 'numeric') {
              stats.push({
                name: el.name?.lines?.ru,
                value: el.formatted?.value?.ru ?? el.value,
              });

              if (el.name?.lines?.ru?.toLowerCase().includes('вес')) {
                weight = el.formatted?.value?.ru ?? el.value;
              }
            }

            // key-value
            if (el.type === 'key-value') {
              const key = el.key?.lines?.ru?.toLowerCase();
              const value = el.value?.lines?.ru ?? null;

              meta.push({
                name: el.key?.lines?.ru,
                value,
              });

              if (!key) continue;

              if (key.includes('ранг')) rank = value;
              if (key.includes('катег')) category = value;
              if (key.includes('подкатег')) subcategory = value;
              if (key.includes('тип')) itemType = value;
              if (key.includes('класс')) classType = value;
              if (key.includes('урон')) damageType = value;
              if (key.includes('калибр')) caliber = value;
              if (key.includes('патрон') || key.includes('боеприп')) ammoType = value;
              if (key.includes('бронекласс') || key.includes('броня')) armorClass = value;
              if (key.includes('редк')) rarity = value;
            }
          }
        }

        setItem({
          raw: data,
          description,
          stats,
          meta,
          textBlocks,
          rank,
          category,
          subcategory,
          itemType,
          class: classType,
          damageType,
          caliber,
          ammoType,
          armorClass,
          rarity,
          weight,
        });
      })
      .catch((err) => {
        console.error('Error loading JSON:', err);
      });
  }, [itemid]);

  return item;
};
