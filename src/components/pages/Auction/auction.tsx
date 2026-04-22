import styles from './auction.module.css';
import { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  disableLoading,
  enableLoading,
  isLoadingAuction,
} from '../../../service/slices/items.slice';
import { nanoid } from '@reduxjs/toolkit';
import { getCookie } from '../../../utils/cookie';
import { getImageItem } from '../../../utils/methods/extractImage';
import {
  extractCategory,
  extractId,
  extractRanks,
  getInfoAllItem,
  getInfoItem,
  type IGetInfoItem,
} from '../../../utils/methods/getInfoItem';
import { Pagination } from 'antd';
import { useDebounce } from '../../../utils/hooks/useDebounced';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../../service/store';
import { useCheckUser } from '../../../service/Async/auth';
import { FilterHorizontal } from '@/components/ui/filterUI/filterUI';
import { LoadingUI } from '@/components/ui/loadingUI/loadingUI';
import { HeaderUI } from '@/components/ui/headerUI/headerUI';

export const Auction = () => {
  const isLoading = useSelector(isLoadingAuction);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [allItems, setAllItems] = useState<(IGetInfoItem & { _name: string })[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const pageSize = 100;

  const isCookie = getCookie('accessToken');
  const isStorage = localStorage.getItem('refreshToken');

  const checkUser = useCheckUser();

  // Загружаем данные один раз
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (!isCookie && !isStorage) {
      dispatch(enableLoading());
      const data = getInfoAllItem();

      if (data) {
        const normalized = data.map((item) => {
          const itemId = extractId(item.data);
          const info = getInfoItem(itemId);

          return {
            ...item,
            _name: info?.name.lines.ru.toLowerCase() || '',
          };
        });

        setAllItems(normalized);
        dispatch(disableLoading());
      }
    }
  }, []);

  // Сбрасываем страницу при поиске
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Фильтрация
  const filteredItems = useMemo(() => {
    if (!debouncedSearch.trim()) return allItems;

    const s = debouncedSearch.toLowerCase();
    return allItems.filter((item) => item._name.includes(s));
  }, [allItems, debouncedSearch]);

  // Пагинация
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage]);

  return (
    <>
      {isLoading ? (
        <LoadingUI />
      ) : (
        <>
          <HeaderUI />

          <div className={styles.containerHeader}>
            <h1>Игровой аукцион SC:X</h1>
            <p>Здесь представлены все предметы что есть в SC:X</p>

            <FilterHorizontal search={search} setSearch={setSearch} />

            <div className={styles.flexCards}>
              {paginatedItems.map((item) => {
                const itemId = extractId(item.data);
                const infoItem = getInfoItem(itemId);

                if (!infoItem) return null;

                const image = getImageItem(itemId);
                const category = extractCategory(infoItem.data);
                const ranks = extractRanks(infoItem.color);

                return (
                  <div className={styles.containerCard} key={nanoid(10)}>
                    <p className={styles.nameItem}>{infoItem.name.lines.ru}</p>
                    <p className={styles.categoryItem}>{category}</p>

                    <div className={styles.imageCard}>
                      <img src={image} loading="lazy" />
                    </div>

                    <p>Редкость: {ranks}</p>

                    <div className={styles.cardButton}>
                      <button
                        onClick={() =>
                          navigate(`/analytics/${itemId}`, {
                            state: { itemName: infoItem.name.lines.ru },
                          })
                        }
                      >
                        <p>Перейти</p>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.containerPaggination}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredItems.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </>
  );
};
