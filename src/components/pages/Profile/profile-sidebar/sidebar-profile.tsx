import ProfileHeader from './prodile-header/profile-header';
import InventoryIcon from '../svg-icon/inventory-icon';
import StatisticItem from './statistic-item/static-item';
import ProfileLinkItem from '../profile-link-item/profile-link-item';
import LogoutIcon from '../svg-icon/logout-icon';
import { useSelector } from 'react-redux';
import { isUserData } from '@/service/slices/user.slice';
import DashBoardIcon from '../svg-icon/dasboard';
import WalletIcon from '../svg-icon/wallet-icon';
import ArrowIcon from '../svg-icon/arrow-icon';
import SubscriptionIcon from '../svg-icon/subscription-icon';
import SettiingsIcon from '../svg-icon/settings-icon';

const STATIC_CONTENT = [
  {
    title: 'Сделок проведено',
    value: '2220',
  },
  {
    title: 'Баланс ( ₽ )',
    value: '222222220',
  },
  {
    title: 'Игровая валюта',
    value: '222222222222222220 SC',
  },
];

const LINK_VALUES = [
  { title: 'Дашборд', link: '/profile', icon: <DashBoardIcon /> },
  { title: 'Инвентарь', link: '/profile/inventory', icon: <InventoryIcon /> },
  { title: 'Пополнение', link: '/profile', icon: <WalletIcon /> },
  { title: 'Вывод средств', link: '/profile', icon: <ArrowIcon /> },
  { title: 'Подписка', link: '/profile', icon: <SubscriptionIcon /> },
  { title: 'Настройки', link: '/profile', icon: <SettiingsIcon /> },
];

const SidebarProfile = () => {
  const userData = useSelector(isUserData);
  // const { openNotification, contextHolder } = useNotification();
  const personID = userData?.id || '';
  return (
    <aside className="flex flex-col justify-between min-h-full max-h-lvh w-1/5 px-4 bg-[#17191d] overflow-y-auto">
      <div className="flex flex-col mt-16 qhd:gap-12">
        {/* секция с аватаркой */}
        <div className="flex flex-col items-center">
          <ProfileHeader personID={personID} />
        </div>

        {/* секция со статистикой */}
        <div className="flex flex-col gap-3 mt-4">
          <h5 className="qhd:text-2xl">Статистика аккаунта</h5>
          <div className="flex flex-col gap-5 p-3 bg-[#202224] rounded-xl">
            {STATIC_CONTENT.map((item, index) => (
              <StatisticItem key={index} title={item.title} value={item.value} />
            ))}
          </div>
        </div>

        {/* секция с действиями */}
        <div className="flex flex-col gap-3 mt-6 qhd:gap-6">
          {LINK_VALUES.map((item, index) => (
            <ProfileLinkItem key={index} link={item.link} title={item.title} icon={item.icon} />
          ))}
        </div>
      </div>

      {/* секция с кнопкой выхода */}
      <button className="flex items-center w-full text-xs p-3 mt-5 bg-transparent group">
        <div className="flex flex-row items-center gap-4">
          <LogoutIcon
            className="
                w-8 h-8 qhd:w-16 qhd:h-16
                transition-all duration-300
                [@media(hover:hover)]:group-hover:scale-110
                [@media(hover:hover)]:group-hover:opacity-70
              "
          />
          <span className="text-center text-red-500 qhd:text-2xl">Выйти из аккаунта</span>
        </div>
      </button>
    </aside>
  );
};

export default SidebarProfile;
