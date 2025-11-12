
import { useState } from 'react';
import styles from './main.module.css';
import { LoadingUI } from '../../UI/loadingUI/loadingUI';

export const MainPage = () => {

    const [setLoading, getLoading] = useState<boolean>(true);
    return (
        <div>
            <div className={styles.backgroundContainer}>
                <LoadingUI />
            </div>


        </div>
    )
}