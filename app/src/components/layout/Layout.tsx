import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { SpaceBackground } from '../ui/SpaceBackground';

export const Layout = () => {
  return (
    <SpaceBackground>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </SpaceBackground>
  );
};
