import { useState } from 'react';
import FilterTabs from './filter-tabs/filter-tabs';
import InventoryHeader from './inventory-header/inventory-header';
import InventoryItem from './inventory-item/inventory-item';
import React from 'react';

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
      rarity="RANK_STALKER"
      price="1 999 999"
      name="AWP"
      model="Dragon Lor"
      type="weapon_skins"
      quantity="1"
    />,
  );
}

const Inventory = () => {
  const [active, setActive] = useState('all');

  return (
    <div className="">
      <InventoryHeader />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <ul className="flex flex-row flex-wrap items-center gap-[clamp(0.2rem,1.25vw,1.5rem)]">
            {arrayTabs.map((item, index) => (
              <li>
                <FilterTabs
                  key={index}
                  text={item.text}
                  value={item.value}
                  active={active}
                  setActive={setActive}
                />
              </li>
            ))}
          </ul>
          {/* сделал тут div, так как возникает конфиликт стилей кнопок, по идеи тут должна быть кнопка */}
          <div className="flex items-center justify-center text-[clamp(0.375rem,0.94vw,1.125rem)] py-[clamp(0.2rem,0.625vw, 0.75rem)] rounded-full mt-5 hover:text-accentProfile cursor-pointer">
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
