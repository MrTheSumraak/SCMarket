import { clsx } from 'clsx';
import iconBasket from './assets/iconBasket.png'
import style from './ItemComponent.module.css';
import ButtonUI from '../ButtonUI/buttonUI';
import { RANKS_ITEMS, TYPES_ITEMS, type TItemRank, type TItemType } from '../../../utils/types';


type TItemComponent = {
  id: string;
  rarity: TItemRank; // редкость скина
  price: string | number; // цена скина
  name?: string | '';   // название скина, например "AR-24"
  type: TItemType;   // тип скина, например "Автомат"
  category: string
};

const rarityGlowMap: Record<string, string> = {
  'RANK_MASTER': 'glowRare',
  'RANK_VETERAN': 'glowUnusual',
  'RANK_LEGEND': 'glowLegendary',
  'RANK_STALKER': 'glowCommon',
  'DEFAULT': 'glowDefault',
  'RANK_NEWBIE': 'glowNewbie'
};

// в компонент будут передаваться данные с сервера, 
// в зависимости от переданной редкости будет определяться цвет бликов 



const ItemComponentUI
  = ({ id, rarity, price, name, type, category }: TItemComponent) => {
    return (
      <>
        <section className={clsx(
          style.itemCard,
          style[rarityGlowMap[rarity]]
        )}>
          <div className={style.weaponWrapper} style={{ backgroundImage: `url(https://raw.githubusercontent.com/EXBO-Studio/stalcraft-database/main/ru/icons/${category}/${id}.png)` }}>
            <div className={style.weaponHeader}>
              {name && <h3>{name}</h3>}
              <p className={clsx(style[`${rarityGlowMap[rarity]}Text`])}>{TYPES_ITEMS[type]}</p>
            </div>
            <div className={style.weaponFooter}>
              <span className={style.weaponPrice}>{price}</span>
              <span className={style.weaponRarity}>Ранг: {RANKS_ITEMS[rarity]}</span>
            </div>
          </div>
          <ButtonUI btnText='Перейти' img={iconBasket} />
        </section>
      </>
    )
  }

export default ItemComponentUI;
