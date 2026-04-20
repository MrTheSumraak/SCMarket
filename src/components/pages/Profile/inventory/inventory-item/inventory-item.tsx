import { RANKS_ITEMS, TYPES_ITEMS, type TItemRank, type TItemType } from '@/utils/types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface IInventoryItem {
  id: string;
  imgURL: string;
  rarity: TItemRank;
  price: number | string;
  //   name: INameItems | string;
  name: string;
  model: string;
  type: TItemType;
  quantity?: string;
  description?: string;
}

const rarityBGMap = {
  RANK_VETERAN: 'bg-glowUnusualBG',
  RANK_STALKER: 'bg-glowCommonBG',
  RANK_MASTER: 'bg-glowRareBG',
  RANK_LEGEND: 'bg-glowLegendaryBG',
  RANK_NEWBIE: 'bg-glowNewbieBG',
  QUEST_ITEM: 'bg-glowCommonBG',

  DEFAULT: 'bg-glowDefault',
};

const rarityGradientMap = {
  RANK_VETERAN: 'bg-gradient-to-br from-glowUnusualBG/30 to-black/70',
  RANK_STALKER: 'bg-gradient-to-br from-glowCommonBG/30 to-black/70',
  RANK_MASTER: 'bg-gradient-to-br from-glowRareBG/30 to-black/70',
  RANK_LEGEND: 'bg-gradient-to-br from-glowLegendaryBG/30 to-black/70',
  RANK_NEWBIE: 'bg-gradient-to-br from-glowNewbieBG/30 to-black/70',
  QUEST_ITEM: 'bg-gradient-to-br from-glowCommonBG/30 to-black/70',

  DEFAULT: 'bg-gradient-to-br from-black/20 to-black/70',
};

const InventoryItem = ({
  id,
  imgURL,
  rarity,
  price,
  name,
  model,
  type,
  quantity,
}: IInventoryItem) => {
  return (
    <li
      className="
        group relative
        flex flex-col rounded-xl overflow-hidden w-full
        transition-all duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:scale-[1.03]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        will-change-transform
        "
    >
      <NavLink to={`/profile/inventory/${id}`}>
        <div className="w-full">
          <div
            style={{ backgroundImage: `url(${imgURL})` }}
            className="
                relative aspect-square bg-cover bg-center bg-no-repeat w-full
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:scale-[1.05]
                "
          >
            <div className={clsx('absolute inset-0 opacity-60', rarityGradientMap[rarity])} />

            <span
              className={clsx(
                'absolute top-2 left-2 px-2 py-1 rounded text-xs uppercase text-white',
                rarityBGMap[rarity],
              )}
            >
              {RANKS_ITEMS[rarity] ?? 'Обычный'}
            </span>
          </div>
        </div>

        <div className="w-full bg-[#1E2128FF] flex flex-col gap-2 p-5">
          <div className="flex flex-col gap-2">
            <h4 className="text-[clamp(0.45rem,0.625vw,0.75rem)] uppercase">{TYPES_ITEMS[type]}</h4>

            <div className="flex flex-row items-center gap-2">
              <span className="text-[clamp(0.675rem,0.94vw,1.125rem)] uppercase">{name}</span>
              <div className="w-[clamp(0.075rem,0.104vw,0.125rem)] h-4 bg-slate-50"></div>
              <span className="text-[clamp(0.675rem,0.94vw,1.125rem)] text-[#BDC1CAFF]">
                {model}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <span className="text-[clamp(0.35rem,1.041vw,1.25rem)] font-bold">{price} ₽</span>
            <span className="text-[clamp(0.45rem,0.625vw,0.75rem)] text-[#BDC1CAFF] uppercase">
              Кол-во: x{quantity}
            </span>
          </div>
        </div>

        <div className={clsx('w-full h-1', rarityBGMap[rarity])}></div>
      </NavLink>
    </li>
  );
};

export default InventoryItem;
