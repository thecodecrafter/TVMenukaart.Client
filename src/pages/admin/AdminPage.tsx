import { Outlet } from "react-router-dom";
import { NavigationMenu } from "../../components/NavigationMenu";

export const AdminPage = () => {
  return (
    <div className="grid grid-cols-[400px_minmax(calc(100%-400px),_1fr)] h-full">
      <NavigationMenu />
      <Outlet />
    </div>
  );
};
