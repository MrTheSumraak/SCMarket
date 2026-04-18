import { Input } from 'antd';
import styles from './styles.module.css';

interface FilterHorizontalProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterHorizontal: React.FC<FilterHorizontalProps> = ({ search, setSearch }) => {
  return (
    <div className={styles.horizontalContainer}>
      <h1>Фильтры</h1>
      <Input
        className={styles.inputField}
        placeholder="Введите название предмета..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
