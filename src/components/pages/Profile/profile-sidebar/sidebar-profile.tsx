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
    <aside className="flex flex-col justify-between min-h-full max-h-lvh w-[12%] px-base bg-[#17191d] overflow-y-auto qhd:w-[10%]">
      <div className="flex flex-col mt-4xl qhd:gap-3xl">
        {/* секция с аватаркой */}
        <div className="flex flex-col items-center">
          <ProfileHeader
            personID={personID}
            imageURL={
              'https://avatars.mds.yandex.net/i?id=55486af37a7a88634d4f407c0d6bfd4ffa825219-5278644-images-thumbs&n=13'
            }
          />
        </div>

        {/* секция со статистикой */}
        <div className="flex flex-col gap-xs mt-base">
          <h5 className="m-0 text-[clamp(0.35rem,0.729vw,0.875rem)] flex-1 text-nowrap qhd:text-lgText">
            Статистика аккаунта
          </h5>
          <div className="flex flex-col gap-base p-xs bg-[#202224] rounded-xl">
            {STATIC_CONTENT.map((item, index) => (
              <StatisticItem key={index} title={item.title} value={item.value} />
            ))}
          </div>
        </div>

        {/* секция с действиями */}
        <div className="flex flex-col gap-xs mt-xl qhd:gap-xl">
          {LINK_VALUES.map((item, index) => (
            <ProfileLinkItem key={index} link={item.link} title={item.title} icon={item.icon} />
          ))}
        </div>
      </div>

      {/* секция с кнопкой выхода */}
      <button className="flex items-center w-full text-base p-xs mt-xl bg-transparent group">
        <div className="flex flex-row items-center ">
          <LogoutIcon
            className="
                w-[clamp(1.5rem,1.88vw,2rem)] h-[clamp(1.5rem,1.88vw,2rem)] qhd:w-[clamp(1.7rem,2.5vw,3rem)] qhd:h-[clamp(1.7rem,2.5vw,3rem)]
                transition-all duration-300
                [@media(hover:hover)]:group-hover:scale-110
                [@media(hover:hover)]:group-hover:opacity-70
              "
          />
          <span className="text-center text-red-500 text-xsText qhd:text-baseText">
            Выйти из аккаунта
          </span>
        </div>
      </button>
    </aside>
  );
};

export default SidebarProfile;
