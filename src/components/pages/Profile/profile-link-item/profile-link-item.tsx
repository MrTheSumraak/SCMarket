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
                'transition-all duration-300 ease-in-out w-base h-base qhd:w-[clamp(0.8rem,1.67vw,2rem)] qhd:h-[clamp(0.8rem,1.67vw,2rem)]',
              ),
            })
          : null;

        return (
          <div
            className={clsx(
              'flex flex-row items-center gap-[clamp(0.2rem,0.417vw,0.5rem)] justify-between p-[clamp(0.2rem,0.417vw,0.5rem)] rounded-xl transition-colors',
              isActive ? 'bg-accentProfile/20 text-accentProfile' : 'text-white',
            )}
          >
            <div className="flex flex-row items-center gap-[clamp(0.2rem,0.417vw,0.5rem)] hover:text-[#ffffff57] transition-all duration-300 ease-in-out">
              {StyledIcon}

              <span className="transition-colors text-baseText qhd:text-xlText">{title}</span>
            </div>

            <div
              className={clsx(
                'transition-all duration-300 ease-in-out w-[clamp(0.15rem,0.325vw,0.375rem)] py-xs rounded qhd:w-2.5 qhd:py-base',
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
