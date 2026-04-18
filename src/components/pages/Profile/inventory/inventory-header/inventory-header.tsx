import SearchIcon from '../../svg-icon/search-icon';
import { InputBase } from '@/components/ui/base/input/input';

const InventoryHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <h3 className="font-bold">Ваш инвентарь</h3>
        <p>Все ваши предметыЁ, находящиеся на хранении в SCMarket</p>
      </div>
      <div className="w-1/3">
        {/* <Input icon={<SearchIcon />} placeholder="Поиск" /> */}
        <InputBase
          icon={SearchIcon}
          inputClassName="text-white"
          placeholder="Поиск"
          iconClassName="text-[#6b7280]"
        />
      </div>
    </div>
  );
};

export default InventoryHeader;
