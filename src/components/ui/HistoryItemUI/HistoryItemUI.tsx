import { LineChart } from '@mui/x-charts';
import { useEffect, useState, type FC } from 'react';

interface IHistoryItemUI {
  data: any[];
}

export const HistoryItemUI: FC<IHistoryItemUI> = ({ data }) => {
  const [columnsChart, setColumnsChart] = useState<string[] | null>(null);
  const [valueChart, setValueChart] = useState<number[] | null>(null);

  useEffect(() => {
    if (!Array.isArray(data)) return;

    const reversed = [...data].reverse();

    const times = reversed.map((i) => {
      const d = new Date(i.time);
      return d.toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    });

    const prices = reversed.map((i) => Number(i.price));

    setColumnsChart(times);
    setValueChart(prices);
  }, [data]);

  return (
    <>
      <h1>История продаж:</h1>

      {columnsChart && valueChart ? (
        <LineChart
          height={300}
          xAxis={[
            {
              data: columnsChart.map((_, i) => i), // индексы
              valueFormatter: (index: any) => columnsChart[index], // показываем время
            },
          ]}
          series={[
            {
              data: valueChart,
              area: true,
            },
          ]}
          sx={{
            '& .MuiChartsAxis-left .MuiChartsAxis-line': { stroke: 'transparent' },
            '& .MuiChartsAxis-left .MuiChartsAxis-tick': { stroke: 'transparent' },
            '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': { display: 'none' },

            '& .MuiAreaElement-root': { fill: '#0d152f' },
            '& .MuiLineElement-root': { stroke: '#3557C8', strokeWidth: 2 },

            '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
              fill: '#fff',
              transform: 'rotate(45deg)',
              textAnchor: 'start',
            },
          }}
        />
      ) : (
        'Истории продаж нет'
      )}
    </>
  );
};
