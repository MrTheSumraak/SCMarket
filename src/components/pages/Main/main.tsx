
import { useState } from 'react';
import styles from './main.module.css';


export const MainPage = () => {

    const [setLoading, getLoading] = useState<boolean>(true);
    return (
        <div>
            <div className={styles.backgroundContainer}>
            </div>


        </div>
    )
}