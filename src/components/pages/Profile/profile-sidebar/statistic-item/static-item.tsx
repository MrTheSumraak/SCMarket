interface IStaticItem {
  title: string;
  value: string;
}

const StatisticItem = ({ title, value }: IStaticItem) => {
  return (
    <div className="flex flex-col gap-[clamp(0.2rem,0.117vw,0.5rem)]">
      <p className="text-gray-400 m-0 qhd:text-lgText">{title}</p>
      <span className="text-[#fff] text-xsText qhd:text-xlText">{value}</span>
    </div>
  );
};

export default StatisticItem;
