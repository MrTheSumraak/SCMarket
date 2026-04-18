import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { cloneElement } from 'react';
import type { JSX } from 'react';

interface IStaticLinkItem {
  link: string;
  title: string;
  icon: JSX.Element;
}

const ProfileLinkItem = ({ link, title, icon }: IStaticLinkItem) => {
  return (
    <NavLink to={link} end className="block">
      {({ isActive }) => {
        const StyledIcon = icon
          ? cloneElement(icon, {
              fill: isActive ? '#3557c8' : '#fff',
              className: clsx(
                icon.props.className,
                'transition-all duration-300 ease-in-out w-4 h-4 qhd:w-8 qhd:h-8',
              ),
            })
          : null;

        return (
          <div
            className={clsx(
              'flex flex-row items-center gap-2 justify-between p-2 rounded-xl transition-colors',
              isActive ? 'bg-accentProfile/20 text-accentProfile' : 'text-white',
            )}
          >
            <div className="flex flex-row items-center gap-2 hover:text-[#ffffff57] transition-all duration-300 ease-in-out">
              {StyledIcon}

              <span className="transition-colors whitespace-nowrap overflow-hidden text-ellipsis qhd:text-2xl">
                {title}
              </span>
            </div>

            <div
              className={clsx(
                'transition-all duration-300 ease-in-out w-1.5 py-3 rounded qhd:w-2.5 qhd:py-4',
                isActive ? 'bg-accentProfile' : 'bg-transparent',
              )}
            />
          </div>
        );
      }}
    </NavLink>
  );
};

export default ProfileLinkItem;
