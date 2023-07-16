import { Outlet } from 'react-router-dom';
import NavbarComponent from './Navbar';

export default function Layout() {
  return (
    <div className="component-border">
      <NavbarComponent />
      <Outlet />
    </div>
  );
}
