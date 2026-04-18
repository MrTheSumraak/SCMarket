import { useParams, useLocation } from 'react-router-dom';
import { AnalyticCard } from './Analytics/analyticsCard';

export const AnalyticCardPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const itemName = location.state?.itemName ?? 'Неизвестный предмет';

  return <AnalyticCard itemid={id!} itemName={itemName} />;
};
