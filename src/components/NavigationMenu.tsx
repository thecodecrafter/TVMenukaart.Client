import { Link, useNavigate } from "react-router-dom";
import IconAccount from "../icons/IconAccount";
import IconLogout from "../icons/IconLogout";
import IconScreens from "../icons/IconScreens";
import { useContext } from "react";
import { Context as AuthContext } from "../context/authContext";

export const NavigationMenu = () => {
  // const router = useNavigate();
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const { logout } = useCurrentUserContext();
  // const handleLogout = () => {
  //   logout();
  //   // router("/login");
  // };

  return (
    <div className="px-14 border-r-2 border-[#BDBDBD] p-8 h-full mr-14">
      <img src={"/logo.jpg"} alt="TV Menukaart" width={180} height={46} />
      <ul className="navigationMenu">
        <li>
          <div className="flex flex-row"></div>
        </li>
        <li>
          <div className="flex flex-row">
            <IconScreens />
            <Link to="restaurants" className="no-underline">
              <h3 className="font-semibold pl-5">Mijn restaurants</h3>
            </Link>
          </div>
        </li>
        {/* <li>
          <div className="flex flex-row">
            <IconScreens />
            <Link to="menus" className="no-underline">
              <h3 className="font-semibold pl-5">Mijn schermen</h3>
            </Link>
          </div>
        </li> */}
        <li>
          <div className="flex flex-row">
            <IconAccount />
            <Link to="profile" className="no-underline">
              <h3 className="font-semibold pl-5">Mijn account</h3>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex flex-row">
            <IconLogout />
            <h3
              className="font-semibold pl-5 cursor-pointer"
              onClick={() => signout(navigate)}
            >
              Uitloggen
            </h3>
          </div>
        </li>
      </ul>
    </div>
  );
};
