import { Outlet } from 'react-router';
import { GlobalDataProvider } from '../data/global-data-context';
import Index from '..';

export default function AppLayout() {
  const url = new URL(location.href);
  if (url.searchParams.get('shop')) {
    return (
      <GlobalDataProvider>
        <Outlet />
      </GlobalDataProvider>
    );
  }

  return (<Index />);
}
