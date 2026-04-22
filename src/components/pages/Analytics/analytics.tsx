import styles from './styles.module.css';
import { useRef, useState, useMemo } from 'react';
import type { IAnalyticsItem } from '../../../utils/types';
import { getAnalyticsItem, getHistoryItem } from '../../../utils/SCApi';
import { findItemIdByName } from '../../../utils/methods/getInfoItem';
import ReactECharts from 'echarts-for-react';
import { AnalyticsTable } from './analyticsTable';
import { AnalyticCard } from './analyticsCard';
import { useNotification } from '../../../utils/methods/notification';
import { HeaderUI } from '@/components/ui/headerUI/headerUI';

export const AnalyticsPage = () => {
  const inputPlace = useRef<HTMLInputElement | null>(null);
  const { openNotification, contextHolder } = useNotification();

  const [historyItem, setHistoryItem] = useState<
    { name: string; amount: number; price: string; time: string }[] | null
  >(null);

  const [findItemAnalytic, setFindItemAnalytic] = useState<IAnalyticsItem | null>(null);
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  const columnsTableHistory = [
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    { title: 'Количество', dataIndex: 'amount', key: 'amount' },
    { title: 'Сумма продажи', dataIndex: 'price', key: 'price' },
    { title: 'Время', dataIndex: 'time', key: 'time' },
  ];

  const formatPrice = (value: number | string) =>
    String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const findAnalytics = async () => {
    const value = inputPlace.current?.value?.trim();
    if (!value) return;

    const correctId = findItemIdByName(value);
    setCurrentItem(correctId);

    // ❗ Предмет не существует
    if (!correctId) {
      openNotification({
        type: 'error',
        title: 'Предмет не найден',
        description: 'Такого предмета нет в базе',
      });
      setFindItemAnalytic(null);
      setHistoryItem(null);
      return;
    }

    const data = await getAnalyticsItem(correctId);
    const historyData = await getHistoryItem(correctId);

    // ❗ Нет аналитики или нет истории продаж
    if (!data || !historyData || historyData.prices.length === 0) {
      openNotification({
        type: 'error',
        title: 'Нет данных по предмету',
        description: 'Этот предмет не продавался, поэтому анализ недоступен',
      });
      setFindItemAnalytic(null);
      setHistoryItem(null);
      return;
    }

    // ❗ Данные есть — сохраняем
    setFindItemAnalytic(data);

    const formatted = historyData.prices.map((item) => ({
      name: value,
      amount: item.amount,
      price: formatPrice(item.price),
      time: item.time,
    }));

    setHistoryItem(formatted);
  };

  const chartOption = useMemo(() => {
    if (!findItemAnalytic) return {};

    return {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: [
          'Лучшая цена покупки',
          'Предельная цена покупки',
          'Минимальная цена продажи',
          'Максимальная цена продажи',
        ],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Цена',
          type: 'line',
          smooth: true,
          data: [
            findItemAnalytic.buy_price_min,
            findItemAnalytic.buy_price_max,
            findItemAnalytic.sell_price_min,
            findItemAnalytic.sell_price_max,
          ],
          lineStyle: { width: 3, color: '#4b7bec' },
          itemStyle: { color: '#3867d6' },
        },
      ],
    };
  }, [findItemAnalytic]);

  return (
    <div className={styles.containerAnalytics}>
      {contextHolder} {/* ❗ Без этого уведомления не работают */}
      <HeaderUI />
      <div className={styles.smoothContainer}>
        <div className={styles.containerFinder}>
          <h1>Анализировать предмет</h1>
          <p>Анализ происходит на основе формулы и ИИ. Технология дорабатывается</p>

          <div className={styles.containerInput}>
            <input ref={inputPlace} placeholder="Введите название предмета" />

            <div className={styles.buttonGroup}>
              <button onClick={findAnalytics}>Начать анализ</button>
            </div>
          </div>
        </div>

        {/* ❗ Показываем анализ только если есть данные */}
        {findItemAnalytic && historyItem && (
          <div className={styles.containerAnalize}>
            {currentItem && inputPlace.current?.value && (
              <AnalyticCard itemName={inputPlace.current.value} itemid={currentItem} />
            )}

            {/* <h2>Анализ рынка предмета</h2>
            <ReactECharts
              className={styles.tableContainer}
              option={chartOption}
              style={{ height: 350, marginTop: 20 }}
            />

            <h3 className={styles.tableHeader}>История продаж предмета:</h3>

            <p>Показываются последние 20 сделок по предмету</p>

            <AnalyticsTable data={historyItem} columns={columnsTableHistory} /> */}
          </div>
        )}
      </div>
    </div>
  );
};
