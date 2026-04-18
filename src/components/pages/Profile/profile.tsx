// import { HeaderUI } from '../../UI/headerUI/headerUI';
// import { useSelector } from 'react-redux';
// import { isUserData } from '../../../service/slices/user.slice';
// import styles from './profile.module.css';
// import { Avatar, Button } from 'antd';
// import {
//   CopyOutlined,
//   CrownOutlined,
//   FallOutlined,
//   LogoutOutlined,
//   RiseOutlined,
//   SettingOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { useNotification } from '../../hooks/useNotification';
// import SidebarProfile from './sidebar-profile/sidebar-profile';
// import { Statistic, Table, Tag } from 'antd';
// import { StatisticProps } from 'antd/es/statistic';
// import CountUp from 'react-countup';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { InventoryProfileUI } from '@/components/ui/inventoryProfileUI/inventoryProfileUI';
// import { useLogout } from '@/hooks/useLogout';

// export const Profile = () => {
//   const userData = useSelector(isUserData);
//   // const { openNotification, contextHolder } = useNotification();
//   const personID = userData?.id || '';

//   const formatter: StatisticProps['formatter'] = (value) => (
//     <CountUp end={value as number} separator="." />
//   );

//   const correctValue: StatisticProps['formatter'] = (value) => <>{formatter(value)} ₽</>;

//   const column = [
//     {
//       title: 'Дата',
//       dataIndex: 'date',
//       key: 'date',
//     },
//     {
//       title: 'Название предмета',
//       dataIndex: 'item',
//       key: 'item',
//     },
//     {
//       title: 'Цена',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Тип операции',
//       dataIndex: 'type',
//       key: 'type',
//     },
//   ];

//   const timeValue: any[] = [];

//   return (
//     <div className={styles.backgroundContainer}>
//       {contextHolder}
//       <HeaderUI />
//       <div className={styles.containerProfile}>
//         <div className={styles.containerStats}>
//           <div className={styles.containerUserData}>
//             <div className={styles.containerAvatar}>
//               <Avatar className={styles.avatarSetting} icon={<UserOutlined />} size={120} />
//               <h2>{userData?.login}</h2>
//               <p className="text-8xl text-amber-400">Пользователь</p>
//             </div>

//             <div className={styles.containerClipboard}>
//               <pre>USER ID</pre>
//               <div className={styles.containerUID}>
//                 <p className={styles.uuidText}>{userData?.uuid?.slice(0, 12)}...</p>

//                 <button
//                   className={styles.copyButton}
//                   onClick={() => {
//                     if (userData?.uuid) {
//                       navigator.clipboard.writeText(userData.uuid);
//                       openNotification({
//                         type: 'success',
//                         title: 'UID успешно скопирован',
//                         description: 'Не передавайте UID третьим лицам.',
//                       });
//                     }
//                   }}
//                 >
//                   <CopyOutlined />
//                 </button>
//               </div>
//             </div>
//             <h3 className={styles.titleStats}>статистика аккаунта</h3>
//             <div className={styles.containerStatsFlex}>
//               <Statistic
//                 className={styles.statsCount}
//                 title="СДЕЛОК"
//                 value={948}
//                 precision={2}
//                 formatter={formatter}
//               />
//               <Statistic
//                 className={styles.statsCount}
//                 title="БАЛАНС (₽)"
//                 value={3951}
//                 precision={2}
//                 formatter={correctValue}
//               />
//               <Statistic
//                 className={styles.statsCount}
//                 title="БАЛАНС (ИГРОВАЯ ВАЛЮТА)"
//                 value={15834953}
//                 precision={2}
//                 formatter={formatter}
//               />
//             </div>
//             <div className={styles.buttonGroup}>
//               <button className={styles.buttonSetting} onClick={useLogout()}>
//                 <RiseOutlined width={16} />
//                 Пополнение
//               </button>
//               <button className={styles.buttonSetting} onClick={useLogout()}>
//                 <FallOutlined width={16} />
//                 Вывод
//               </button>
//               <button className={styles.buttonSetting} onClick={useLogout()}>
//                 <CrownOutlined width={16} />
//                 Подписка
//               </button>
//               <button className={styles.buttonSetting} onClick={useLogout()}>
//                 <SettingOutlined width={16} />
//                 Настройки
//               </button>
//               <button className={styles.buttonLogout} onClick={useLogout()}>
//                 <LogoutOutlined width={16} />
//                 Выйти из аккаунта
//               </button>
//             </div>
//           </div>
//           <div className={styles.containerTable}>
//             <div>
//               <InventoryProfileUI />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
