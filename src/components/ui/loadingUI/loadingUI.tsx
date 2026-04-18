import { useState, useEffect } from 'react';
import styles from './loadingUI.module.css';

export const LoadingUI = () => {
    const textLoading = [
        'Загружаем артефакты',
        'Прогоняем скибиди-туалет',
        'Убираем пиво с серверов',
        'Находим лучшие ценники',
        'Фильтруем нефильтрованное',
        'Смотрим предложения Сидоровича',
        'Деремся с ЗИВом за банку пива'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // начинаем скрывать текст
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % textLoading.length);
                setFade(true); // показываем новый текст
            }, 500); // задержка для плавного скрытия
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.containerLoading}>
            <h1 className={styles.logo}>SC<span>Market</span></h1>
            <p className={`${styles.loadingText} ${fade ? styles.fadeIn : styles.fadeOut}`}>
                {textLoading[currentIndex]}
            </p>
        </div>
    );
};
