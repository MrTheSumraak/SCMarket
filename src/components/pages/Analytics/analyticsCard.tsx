import { useEffect, useMemo, useState, type FC } from 'react';
import { useItemInfo } from '../../../hooks/useItemInfo';
import { getImageItem } from '../../../utils/methods/extractImage';
import styles from './card.module.css';
import { AnalyticsTable } from './analyticsTable';
import { getAnalyticsItem, getHistoryItem } from '../../../utils/SCApi';
import type { IAnalyticsItem, IItems } from '../../../utils/types';
import ReactECharts from 'echarts-for-react';
import { formatPrice } from '../../../utils/methods/getInfoItem';
import { AlertItemUI } from '@/components/ui/AlertItemUI/AlertItemUI';
import { HistoryItemUI } from '@/components/ui/HistoryItemUI/HistoryItemUI';
import { HeaderUI } from '@/components/ui/headerUI/headerUI';

interface IAnalyticCard {
  itemid: string;
  itemName: string;
}

export const AnalyticCard: FC<IAnalyticCard> = ({ itemid, itemName }) => {
  const image = getImageItem(itemid);
  const item = useItemInfo(itemid);

  const [activeLots, setActiveLots] = useState<any[] | null>(null);
  const [historyData, setHistoryData] = useState<any[] | null>(null);
  const [findItemAnalytic, setFindItemAnalytic] = useState<IAnalyticsItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await getHistoryItem(itemid);
      const data = await getAnalyticsItem(itemid);

      // если API вернуло null или пустой массив
      if (!res || !res.prices) {
        setHistoryData([]);
        return;
      }

      const formatted = res.prices.map((p) => ({
        name: itemName,
        amount: p.amount,
        price: p.price,
        time: p.time,
      }));

      setHistoryData(formatted);
      console.log(data);

      setFindItemAnalytic(data);

      const resultActive = data.countItem as IItems[];

      const dataActive = resultActive.map((p) => ({
        name: itemName,
        amount: p.amount,
        price: p.buyoutPrice,
      }));

      setActiveLots(dataActive);
    };

    load();
  }, [itemid, itemName]);

  const columnsActiveLots = [
    { title: 'Наименование', dataIndex: 'name', key: 'name' },
    { title: 'Количество', dataIndex: 'amount', key: 'amount' },
    { title: 'Цена', dataIndex: 'price', key: 'price' },
  ];

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

  const columns = item?.stats?.map((s: any) => s.name) ?? [];
  const values = item?.stats?.map((s: any) => s.value) ?? [];

  return (
    <div className={styles.container}>
      <HeaderUI />

      <div className={styles.rootContainer}>
        <div className={styles.cardContainer}>
          <div>
            <div className={styles.imageContainer}>
              <img src={image} alt="" />
            </div>
            <AlertItemUI itemid={itemid} />
            {findItemAnalytic && (
              <div className={styles.chartContainer}>
                <div className={styles.recContainer}>
                  <div>
                    <pre>Минимальная цена покупки:</pre>

                    <p>{formatPrice(findItemAnalytic.buy_price_min)} ₽</p>
                  </div>
                  <div>
                    <pre>Максимальная цена покупки:</pre>

                    <p>{formatPrice(findItemAnalytic.buy_price_max)} ₽</p>
                  </div>
                  <div>
                    <pre>Минимальная цена продажи:</pre>

                    <p>{formatPrice(findItemAnalytic.sell_price_min)} ₽</p>
                  </div>
                  <div>
                    <pre>Максимальная цена продажи:</pre>
                    <p>{formatPrice(findItemAnalytic.sell_price_max)} ₽</p>
                  </div>
                </div>
                <ReactECharts option={chartOption} style={{ width: '100%', height: '100%' }} />
                <div className={styles.HistoryTable}>
                  {historyData && (
                    <>
                      <HistoryItemUI data={historyData} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.cardInfo}>
            <h1>{itemName}</h1>

            <div className={styles.tags}>
              <div className={styles.containerTags}>
                <div>
                  <pre>Категория</pre>
                  <p>{item?.class}</p>
                </div>
                <div>
                  <pre>Ранг</pre>
                  <p>{item?.rank}</p>
                </div>
              </div>
            </div>
            <h3 className={styles.descriptionItem}>Описание:</h3>
            <p>{item?.description}</p>
            <h3 className={styles.statsHeader}>Характеристики предмета</h3>
            <AnalyticsTable columns={columns} data={values} type="vertical" />
          </div>
          <div className={styles.statsContainer}>
            <h3 className={styles.activeLotsHeader}>
              Сейчас в продаже лотов: {findItemAnalytic?.countItem.length}
            </h3>
            {activeLots ? (
              <AnalyticsTable columns={columnsActiveLots} data={activeLots} />
            ) : (
              'Данные не найдены'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
