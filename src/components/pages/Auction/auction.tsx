import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../../../service/store";
import { Navigation } from "../../Navigation/navigation";
import styles from './auction.module.css'
import { selectAllItems, selectItemsLoading } from "../../../service/slices/items.slice";
import { LoadingUI } from "../../UI/loadingUI/loadingUI";
import ItemComponentUI from "../../UI/CardIUI/ItemComponentUI";
import { nanoid } from "@reduxjs/toolkit";
import { getItems } from "../../../service/Async/items";
import type { TItemConfig } from "../../../utils/types";
import { usePagination } from "../../../utils/hooks/usePagination";
import { Pagination } from "antd";




export const Auction = () => {
    const dispatch: AppDispatch = useDispatch();
    const allItems = useSelector(selectAllItems);
    const getLoading = useSelector(selectItemsLoading);

    const flatItems = Object.entries(allItems)
        .filter(([categoryName]) => categoryName !== "loading")
        .flatMap(([categoryName, items]) =>
            (items as TItemConfig[]).map(item => ({
                ...item,
                categoryName
            }))
        );

    const {
        paginatedItems,
        currentPage,
        pageSize,
        totalItems,
        onChangePage
    } = usePagination(flatItems, 105);


    useEffect(() => {
        dispatch(getItems())
    }, [])
    return (
        <div className={styles.containerMarket}>
            {getLoading ? <LoadingUI /> : (
                <>
                    <Navigation />
                    <div className={styles.containerBody}>
                        <div className={styles.containerCards}>
                            {paginatedItems.map(item => (
                                <ItemComponentUI
                                    key={nanoid(10)}
                                    id={item.id}
                                    rarity={item.color}
                                    price={2490000}
                                    name={item.name.lines.ru}
                                    type={item.category}
                                    category={item.categoryName}
                                    image={item.image}
                                    subCategory={item.subCategory}
                                />
                            ))}
                        </div>
                        <div className={styles.containerPaginator}>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={totalItems}
                                onChange={onChangePage}
                                showSizeChanger={false}
                                align="center"
                                style={{ marginTop: 20, textAlign: "center" }}

                            />

                        </div>
                    </div>
                </>
            )}
        </div>

    )
}