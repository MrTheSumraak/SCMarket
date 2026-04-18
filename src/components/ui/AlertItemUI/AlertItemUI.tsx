import { useRef } from 'react';
import styles from './AlertItemUI.module.css';

export const AlertItemUI = (itemid: any) => {
  const inputRef = useRef(HTMLInputElement);

  return (
    <div className={styles.alertContainer}>
      <pre>Уведомить, если цена ниже</pre>
      <div className={styles.formContainer}>
        <input type="text" placeholder="Цена" />
        <button>Уведомить</button>
      </div>
    </div>
  );
};
