import { useState } from 'react';
import styles from './auth.module.css';
import logo from './assets/logo.png';
import logoButton from './assets/logoButton.png';
import pers from './assets/stalker.png';
import { AuthData } from '../../../utils/db';
import { motion } from "motion/react"




// Simple demo token accessor


export const Auth = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const redirectAuth = () => {
        const url = new URL(`${AuthData.urlAuth}`);
        url.searchParams.set('client_id', AuthData.clientId);
        url.searchParams.set('redirect_uri', AuthData.redirectUri);
        url.searchParams.set('scope', '');
        url.searchParams.set('response_type', AuthData.response_type);
        url.searchParams.set('state', AuthData.state);

        //console.log(url);
        
       window.location.href = url.toString();
    }

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.rowContainer}>
                <div className={styles.authWindow}>
                    <h1>Добро пожаловать на Stalcraft <span>Market</span></h1>
                    <img className={styles.logo} src={logo} alt="Logotype project 'StalCraft Market'" />
                    <p className={styles.description}>Вся авторизация проходит через официальные сервисы EXBO</p>

                    
                    <div style={{ display: 'flex', gap: 8 }}>
                        
                        <motion.button onClick={redirectAuth} className={styles.buttonLogin} disabled={loading}>
                            <span><img src={logoButton} alt="" /></span>
                            <p>Авторизоваться</p>
                        </motion.button>

                    </div>

                    <p className={styles.exboAuth}>SCMarket работает на официальном API EXBO.</p>
                </div>

                <img className={styles.stalkerSetting} src={pers} alt="Персонаж взятый из игры" />
            </div>
        </div>
    );
};
