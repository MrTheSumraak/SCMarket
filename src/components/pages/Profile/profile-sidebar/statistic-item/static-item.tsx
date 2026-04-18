interface IStaticItem {
  title: string;
  value: string;
}

const StatisticItem = ({ title, value }: IStaticItem) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-400 qhd:text-lg">{title}</p>
      <span className="text-[#fff] qhd:text-2xl">{value}</span>
    </div>
  );
};

export default StatisticItem;
