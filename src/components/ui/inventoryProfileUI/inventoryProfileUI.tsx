import ItemComponentUI from '../CardIUI/ItemComponentUI';
import styles from './inventoryProfileUI.module.css';
import pic from '../../../assets/items/ru/icons/bullet/1n46.png';

export const InventoryProfileUI = () => {
  const arrItem = []
  for (let i = 0; i < 20; i++) {
    arrItem.push(
      <ItemComponentUI
        id="2"
        category="test"
        rarity="RANK_LEGEND"
        price={10000}
        name="Половой член"
        type="bullet"
        image={pic}
        subCategory="bullet"
        description={'Хуевые пули'}
      />
    )
  }
  return (
    <div className={styles.containerInventory}>
      <h1>Ваш инвентарь</h1>
      <p>Все Ваши предметы что находятся на SCMarket</p>
      <div className={styles.containerItems}>
        <div className={styles.containerItems}>
          <div className={styles.containerItems}>
            <div className={styles.rowItems}>{arrItem.map((item) => item)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
