import { Link } from 'react-router-dom'
import styles from './navigation.module.css'

export const Navigation = () => {
    return (
        <div className={styles.navigationContainer}>
            <h1 className={styles.logo}>SC<span>MARKET</span></h1>
            <ul className={styles.menuList}>
                <li><Link to={'/'}>Аукцион</Link></li>
                <li><Link to={'/'}>Документация</Link></li>
                <li><button>Войти</button></li>
            </ul>
        </div>
    )
}