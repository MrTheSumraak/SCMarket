import clsx from 'clsx';

interface IFilterTabs {
  text: string;
  value: string;
  active: string;
  setActive: (value: string) => void;
}

const FilterTabs = ({ text, value, active, setActive }: IFilterTabs) => {
  return (
    <button
      onClick={() => setActive(value)}
      className={clsx(
        'flex items-center justify-center w-18 text-xs py-5 rounded-full mt-5 bg-[#17191d] group',
        active === value && 'bg-accentProfile text-slate-800',
      )}
    >
      <span className="font-bold text-sm text-center">{text}</span>
    </button>
  );
};

export default FilterTabs;
