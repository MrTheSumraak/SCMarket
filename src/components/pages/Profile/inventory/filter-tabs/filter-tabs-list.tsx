import FilterTabs from './filter-tabs';

interface IFilterTabs {
  arrayTabs: Array<{ text: string; value: string }>;
  active: string;
  setActive: (value: string) => void;
}

const FilterTabsList = ({ arrayTabs, active, setActive }: IFilterTabs) => {
  return (
    <ul className="flex flex-row flex-wrap items-center gap-[clamp(0.2rem,1.25vw,1.5rem)]">
      {arrayTabs.map((item, index) => (
        <li>
          <FilterTabs
            key={index}
            text={item.text}
            value={item.value}
            active={active}
            setActive={setActive}
          />
        </li>
      ))}
    </ul>
  );
};

export default FilterTabsList;
