import { notification } from 'antd';
import type { ArgsProps, NotificationInstance } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = ArgsProps['placement'];

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({
    placement = 'bottomRight',
    title,
    description,
    type = 'info',
  }: {
    placement?: NotificationPlacement;
    title: string;
    description: React.ReactNode;
    type?: NotificationType;
  }) => {
    api[type]({
      message: title, // требуется типами
      description, // корректно
      placement, // корректно
      // title можно не указывать — AntD 5 использует message
    });
  };

  return {
    openNotification,
    contextHolder,
  };
};
