import './MainLayout.scss'
import { Header } from '../Header/Header.jsx';
import { Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
