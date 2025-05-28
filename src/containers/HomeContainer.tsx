import { useEffect, useState, useMemo } from "react";
import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { MenuService } from "../service/MenuService";
import { MenuDomainModel } from "../domain/MenuDomainModel";

export const HomeContainer = () => {
  const apiUrl = useApiEndpointContext();
  const menuService = useMemo(() => new MenuService(apiUrl), [apiUrl]);
  const [menus, setMenus] = useState<MenuDomainModel[]>();

  useEffect(() => {
    menuService.GetAllMenus().then((response) => setMenus(response));
  }, [menuService]);

  return (
    <>
      <h1>Welkom</h1>
      <h2>Maak een keuze uit de volgende menus om te tonen</h2>
      <ul>
        {menus?.map((item) => {
          const publicUrl = `${import.meta.env.VITE_clientUrl}menus/${
            item?.publicUrl
          }`;
          return (
            <li key={item.id}>
              <a href={publicUrl}>{item.name}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};
