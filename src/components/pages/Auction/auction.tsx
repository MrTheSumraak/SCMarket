import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../../../service/store";
import { getItems } from "../../../service/Async/items";
import { Navigation } from "../../Navigation/navigation";
import styles from './auction.module.css'
import ItemComponentUI from "../../UI/CardIUI/ItemComponentUI";
import { getAllGuns, isLoading } from "../../../service/slices/items.slice";
import { nanoid } from "@reduxjs/toolkit";
import { LoadingUI } from "../../UI/loadingUI/loadingUI";




export const Auction = () => {
    const dispatch: AppDispatch = useDispatch();
    const allGuns = useSelector(getAllGuns);
    const getLoading = useSelector(isLoading);
    useEffect(() => {
        dispatch(getItems())
    }, [])
    return (
        <div className={styles.containerMarket}>
            <Navigation />
            {getLoading ? <LoadingUI /> : (
                <div className={styles.containerBody}>
                    {/* Сюда вставить уже то что над */}
                    <div className={styles.containerContent}>
                        {/* Здесь у нас контейнер под горизонталку */}
                        <div className={styles.containerFilter}>
                            <p>test</p>
                        </div>
                        <div className={styles.containerCards}>
                            {allGuns.map((item) => {
                                return (
                                    <ItemComponentUI key={nanoid(10)} category={item.category} name={item.name.lines.ru} price={1000} rarity={item.color} type={item.category} id={item.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}