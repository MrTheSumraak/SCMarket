import { Table } from 'antd';
import styles from './table.module.css';

interface AnalyticsTableProps {
  columns: any[];
  data: any[];
  type?: 'default' | 'vertical';
}

export const AnalyticsTable = ({ columns, data, type = 'default' }: AnalyticsTableProps) => {
  // --- ВЕРТИКАЛЬНЫЙ РЕЖИМ ---
  if (type === 'vertical') {
    // columns: string[]
    // data: string[]
    const verticalData = columns.map((col, i) => ({
      key: `row_${i}`,
      name: col,
      value: data[i],
    }));

    const verticalColumns = [
      {
        title: 'Характеристика',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Значение',
        dataIndex: 'value',
        key: 'value',
      },
    ];

    return (
      <div className={styles.darkTableWrapper}>
        <Table
          columns={verticalColumns}
          dataSource={verticalData}
          pagination={false}
          rowKey="key"
          bordered
        />
      </div>
    );
  }

  // --- ДЕФОЛТНЫЙ РЕЖИМ ---
  let tableColumns = columns;
  let tableData = data;

  const isSimpleTable =
    Array.isArray(columns) && columns.length > 0 && typeof columns[0] === 'string';

  if (isSimpleTable) {
    tableColumns = columns.map((col: string, i: number) => ({
      title: col,
      dataIndex: `col_${i}`,
      key: `col_${i}`,
    }));

    tableData = [
      {
        key: 'stats-row',
        ...Object.fromEntries(data.map((value: any, i: number) => [`col_${i}`, value])),
      },
    ];
  }

  return (
    <div className={styles.darkTableWrapper}>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        rowKey="key"
        bordered
      />
    </div>
  );
};
