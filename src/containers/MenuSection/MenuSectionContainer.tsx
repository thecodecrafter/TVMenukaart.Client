import { useState } from "react";

import { MenuSection } from "../../components/MenuSection";
import { MenuSectionsService } from "../../service/MenuSectionsService";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
// import { MenuItemsService } from "../../service/MenuItemsService";
import { useFetch } from "../../hooks/useFetch";
import { MenuSectionForm } from "../../components/forms/MenuSectionForm";
import { MenuService } from "../../service/MenuService";
import Connector from "../../signalr-connection";
import { PopupModal } from "../../components/PopupModal";
import { Loader } from "../../components/Loader";
// import { MenuItemDomainModel } from "../../domain/MenuItemDomainModel";

type MenuSectionContainerProps = {
  menuId: string;
};

export const MenuSectionContainer = (props: MenuSectionContainerProps) => {
  const apiUrl = useApiEndpointContext();
  const menuSectionService = new MenuSectionsService(apiUrl);
  const menuService = new MenuService(apiUrl);
  // const menuItemService = new MenuItemsService(apiUrl);
  const connector = Connector.getInstance();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [refreshCounterMenu, setRefreshCounterMenu] = useState(0);
  const [showModal, setShowModal] = useState(false);

  connector.onMenuReceived(() => {
    setRefreshCounter(refreshCounter + 1);
    setRefreshCounterMenu(refreshCounterMenu + 1);
  });
  // onMenuItemReceived(() => setRefreshCounter(refreshCounter + 1));
  // const result = useFetch(
  //   () => menuSectionService.allMenuSections(+props.menuId),
  //   () => "Er is een fout opgetreden bij het ophalen van de menus",
  //   true,
  //   refreshCounter
  // );

  // connector
  const menu = useFetch(
    () => menuService.GetMenu(+props.menuId),
    () => "ERROR",
    true,
    refreshCounterMenu
  );

  const handleDeleteMenuSection = (id: number) => {
    return menuSectionService.deleteMenuSection(id);
  };

  if (menu.isProcessing) {
    return <Loader />;
  }

  // Cynthia Rebo

  // const handleDeleteMenuItem = (id: number) => {
  //   menuItemService.menuItemDELETE(id);
  // };

  // const handleAddMenuSection = (menuId: number, sectionName: string) => {
  //   menuSectionService.addMenuSection(menuId, sectionName);
  // };

  // const handleEditMenuItem = (menuItem: MenuItemDomainModel) => {
  //   console.log("edit menuitem");
  // };

  if (menu.hasError) return <h2>Ongeldig menu id</h2>;

  return (
    <div className="flex flex-col content-start pt-0 pr-12">
      <PopupModal
        title="Toevoegen productgroep"
        body={
          <MenuSectionForm
            toggle={(val) => setShowModal(val)}
            menuId={+props.menuId}
          />
        }
        // confirmationPromise={() => handleAddMenuSection()}
        show={showModal}
        handleClose={() => setShowModal(false)}
        dialogId={"1"}
      />
      <h1 className="capitalize">{menu.data?.name}</h1>
      {/* <div className="flex gap-2 mb-2">
        <button className="btn btn-primary" onClick={() => setToggle(!toggle)}>
          Maak een categorie aan
        </button>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Ga terug
        </button>

        <button
          className="btn btn-primary"
          onClick={() =>
            copyToClipboard(
              `${import.meta.env.VITE_clientUrl}menus/${menu.data?.publicUrl}`
            )
          }
        >
          Kopieer url
        </button>
      </div> */}
      <h2>Productgroepen</h2>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="px-5 py-2.5 text-sm mb-4 sm:mb-6 text-center bg-primary rounded-lg text-white border p-3"
        >
          Productgroep toevoegen
        </button>
      </div>
      {menu.data?.menuSections?.map((item) => (
        <MenuSection
          menuSection={item}
          // handleDeleteMenuItem={handleDeleteMenuItem}
          handleDeleteMenuSection={handleDeleteMenuSection}
          key={item.id}
          admin={true}
        />
      ))}
    </div>
  );
};
