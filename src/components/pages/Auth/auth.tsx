import styles from './auth.module.css';
import logo from './assets/logo.png';
import logoButton from './assets/logoButton.png';
import pers from './assets/stalker.png'

export const Auth = () => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.rowContainer}>
                <div className={styles.authWindow}>
                    <h1>Добро пожаловать на Stalcraft <span>Market</span></h1>
                    <img className={styles.logo} src={logo} alt="Logotype project 'StalCraft Market'" />
                    <p className={styles.description}>Для перехода на основную площадку требуется авторизация</p>
                    <button className={styles.buttonLogin}><span><img src={logoButton} alt="" /></span><p>Авторизоваться</p></button>
                    <p className={styles.exboAuth}>Авторизация происходит через официальные сервисы EXBO, не сообщайте никому свои данные от аккаунта, администрация платформы в них не нуждается!</p>
                </div>
                <img className={styles.stalkerSetting} src={pers} alt="Персонаж взятый из игры" />
            </div>
        </div>
    )
}