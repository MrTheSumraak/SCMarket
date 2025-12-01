import clsx from 'clsx';
import iconBasket from './assets/iconBasket.png';
import style from './ItemComponent.module.css';
import ButtonUI from '../ButtonUI/buttonUI';
import { RANKS_ITEMS, rarityGlowMap, TYPES_ITEMS, type TItemComponent } from '../../../utils/types';
import { useState } from 'react';
import { ModalUI } from '../ModalUI/modalUI';


const ItemComponentUI = ({
  rarity,
  price,
  name,
  type,
  image,
  subCategory,
  description
}: TItemComponent) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  // Safely resolve a description string for the modal. `description` may be
  // a string, an array of `IItemInfoBlock`, or undefined.
  const modalDescription: string = (() => {
    if (Array.isArray(description)) {
      const block = description[10];
      return block?.text?.lines?.ru ?? 'Описание отсутствует';
    }
    if (typeof description === 'string') return description;
    return '';
  })();

  return (
    <div>
      {openModal ? (
        <ModalUI
          title={name ?? ''}
          description={modalDescription}
          image={image}
          price={Number(price)}
          onClick={() => setOpenModal(false)}
        />
      ) : null}
      <section className={clsx(style.itemCard, style[rarityGlowMap[rarity]])}>
        <div
          className={style.weaponWrapper}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className={style.weaponHeader}>
            {name && <h3>{name}</h3>}
            <p className={clsx(style[`${rarityGlowMap[rarity]}Text`])}>{subCategory ? (TYPES_ITEMS[subCategory] ?? 'Неизвестно') : (TYPES_ITEMS[type] ?? 'Неизвестно')}</p>
          </div>
          <div className={style.weaponFooter}>
            <span className={style.weaponPrice}>{price}</span>
            <span className={style.weaponRarity}>Ранг: {RANKS_ITEMS[rarity] ?? 'Неизвестно'}</span>
          </div>
        </div>
        <div onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }}>
          <ButtonUI btnText="Перейти" img={iconBasket} />
        </div>
      </section>
    </div>
  );
};

export default ItemComponentUI;
