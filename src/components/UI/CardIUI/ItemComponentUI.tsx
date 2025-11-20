import { clsx } from 'clsx';
import iconBasket from './assets/iconBasket.png';
import style from './ItemComponent.module.css';
import ButtonUI from '../ButtonUI/buttonUI';
import { RANKS_ITEMS, rarityGlowMap, TYPES_ITEMS, type TItemComponent } from '../../../utils/types';

const ItemComponentUI = ({
  rarity,
  price,
  name,
  type,
  image
}: TItemComponent) => {
  console.log(type);

  return (
    <section className={clsx(style.itemCard, style[rarityGlowMap[rarity]])}>
      <div
        className={style.weaponWrapper}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className={style.weaponHeader}>
          {name && <h3>{name}</h3>}
          <p className={clsx(style[`${rarityGlowMap[rarity]}Text`])}>{TYPES_ITEMS[type] ?? 'Неизвестно'}</p>
        </div>
        <div className={style.weaponFooter}>
          <span className={style.weaponPrice}>{price}</span>
          <span className={style.weaponRarity}>Ранг: {RANKS_ITEMS[rarity as keyof typeof RANKS_ITEMS] ?? 'Неизвестно'}</span>
        </div>
      </div>
      <ButtonUI btnText="Перейти" img={iconBasket} />
    </section>
  );
};

export default ItemComponentUI;
