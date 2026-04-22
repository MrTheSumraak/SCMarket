import { useCallback, useState } from 'react';
import InventoryHeader from './inventory-header/inventory-header';
import InventoryItem from './inventory-item/inventory-item';
import React from 'react';
import FilterTabsList from './filter-tabs/filter-tabs-list';

const arrayTabs = [
  {
    text: 'Все',
    value: 'all',
  },
  {
    text: 'Ножи',
    value: 'knives',
  },
  {
    text: 'Перчатки',
    value: 'gloves',
  },
  {
    text: 'Винтовки',
    value: 'shotguns',
  },
  {
    text: 'Проститутки',
    value: 'pistols',
  },
  {
    text: 'Наклейки',
    value: 'attachments',
  },
];

const urlImage = '/src/assets/items/ru/icons/weapon/sniper_rifle/4qn7r.png';

const testArray: React.ReactElement[] = [];
for (let i = 0; i < 30; i++) {
  testArray.push(
    <InventoryItem
      id="1"
      imgURL={urlImage}
      rarity="RANK_NEWBIE"
      price="1 999 999"
      name="AWP"
      model="Dragon Lor"
      type="sniper_rifle"
      quantity="1"
    />,
  );
}

const Inventory = () => {
  const [active, setActive] = useState<string>('all');

  const setActiveHandler = useCallback(
    (value: string) => {
      setActive(value);
    },
    [arrayTabs.length],
  );

  return (
    <div>
      <InventoryHeader />
      <div className="flex flex-col gap-xl">
        <div className="flex flex-row justify-between">
          <FilterTabsList arrayTabs={arrayTabs} active={active} setActive={setActiveHandler} />
          {/* сделал тут div, так как возникает конфиликт стилей кнопок, по идеи тут должна быть кнопка */}
          <div className="flex items-center justify-center text-[clamp(0.375rem,0.94vw,1.125rem)] py-[clamp(0.2rem,0.625vw, 0.75rem)] rounded-full mt-lg hover:text-accentProfile cursor-pointer">
            <span>Все фильтры</span>
          </div>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[clamp(0.3rem,0.833vw,1rem)] p-[clamp(0.3rem,0.833vw,1rem)] overflow-y-auto max-h-[70vh] pr-2 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
          {testArray.map((item) => item)}
        </ul>
      </div>
    </div>
  );
};

export default Inventory;
