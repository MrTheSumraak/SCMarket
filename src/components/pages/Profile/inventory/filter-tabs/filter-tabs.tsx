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
        'flex items-center justify-center text-[clamp(0.3rem,0.625vw,1rem)] py-[clamp(0.3rem,0.625vw,1rem] rounded-full mt-5 bg-[#17191d]',
        active === value && 'bg-accentProfile text-slate-800',
      )}
    >
      <span className="font-bold text-center">{text}</span>
    </button>
  );
};

export default FilterTabs;
