import { Outlet } from 'react-router-dom';
import SidebarProfile from './profile-sidebar/sidebar-profile';
import { HeaderUI } from '@/components/ui/headerUI/headerUI';

export const ProfileLayout = () => {
  return (
    <div className="flex min-h-[100vh] h-full">
      <HeaderUI className="!pt-0" />

      <SidebarProfile />

      {/* контент справа */}
      <div className="flex-1 overflow-y-auto p-6 mt-12">
        <Outlet />
      </div>
    </div>
  );
};
