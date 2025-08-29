import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { SpaceBackground } from '../ui/SpaceBackground';

export const Layout = () => {
  return (
    <SpaceBackground className='flex flex-col min-h-screen'>
      <Navigation />
      <main className='flex flex-col flex-1'>
        <Outlet />
      </main>
    </SpaceBackground>
  );
};
