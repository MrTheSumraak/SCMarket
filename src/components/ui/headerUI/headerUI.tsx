import { useSelector } from 'react-redux';
import styles from './headerUI.module.css';
import { isUserData } from '../../../service/slices/user.slice';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface IHeader {
  className?: string;
}

const LINKS_VALUES = [
  {
    title: 'Аукцион',
    link: '/auction',
  },
  {
    title: 'Маркет',
    link: '#',
  },
  {
    title: 'Правила',
    link: '#',
  },
  {
    title: 'Сделки',
    link: '#',
  },
  {
    title: 'Аналитика',
    link: '/analytics',
  },
];

export const HeaderUI = ({ className, ...props }: IHeader) => {
  const userData = useSelector(isUserData);
  return (
    <div className={clsx(styles.containerHeader, className)} {...props}>
      <h1>
        SC<span>Market</span>
      </h1>
      <div className={styles.containerList}>
        <ul>
          {LINKS_VALUES.map(({ title, link }) => (
            <li key={title}>
              <Link to={link}>{title}</Link>
            </li>
          ))}
        </ul>
        <Link to={'/profile'}>
          <button className={styles.profileButton}>
            <p>{userData?.login}</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
