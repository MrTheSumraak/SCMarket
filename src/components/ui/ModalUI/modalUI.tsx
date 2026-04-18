import { type FC } from "react";
import ButtonUI from "../ButtonUI/buttonUI";
import { CloseOutlined } from "@ant-design/icons";
import styles from './modalUI.module.css';

export interface IModalUI {
    title: string;
    description: string;
    image: string;
    price: number;
    onClick?: () => void;
}

export const ModalUI: FC<IModalUI> = ({ title, description, image, price, onClick }) => {


    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <CloseOutlined className={styles.closeIcon} onClick={onClick} />
                <div className={styles.modalBody}>
                    <div className={styles.headerBody}>
                        <img src={image} alt={title} />
                        <div className={styles.infoSection}>
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <span>{price}</span>
                            <ButtonUI btnText="Сделать ставку" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}