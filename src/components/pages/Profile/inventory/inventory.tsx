import { useState } from 'react';
import FilterTabs from './filter-tabs/filter-tabs';
import InventoryHeader from './inventory-header/inventory-header';

const array = [
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

const Inventory = () => {
  const [active, setActive] = useState('all');

  return (
    <>
      <InventoryHeader />
      <div className="flex flex-col gap-6">
        <ul className="flex flex-row gap-6">
          {array.map((item, index) => (
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
      </div>
    </>
  );
};

export default Inventory;
