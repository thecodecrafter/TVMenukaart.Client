import { useState } from "react";

import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";
import { MenuSectionDomainModel } from "../domain/MenuSectionDomainModel";
import IconBin from "../icons/IconBin";
import { MenuItemsService } from "../service/MenuItemsService";
import { ConfirmationModal } from "./ConfirmationModal";
import { MenuItemForm } from "./forms/MenuItemForm";
import { MenuItem } from "./MenuItem";
import { PopupModal } from "./PopupModal";

export type MenuSectionProps = {
  menuSection: MenuSectionDomainModel;
  handleDeleteMenuSection: (menuSectionId: number) => Promise<void>;
  handleDeleteMenuItem: (menuItemId: number) => void;
  // handleEditMenuItem: (menuItem: MenuItemDomainModel) => void;
  // setMenuItem: (menuItem: MenuItemDomainModel) => void;
  admin?: boolean;
};

export const MenuSection = (props: MenuSectionProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuItem, setMenuItem] = useState<MenuItemDomainModel | undefined>(
    undefined
  );
  const [deleteMenuItemId, setDeleteMenuItemId] = useState<number | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const apiUrl = useApiEndpointContext ? useApiEndpointContext() : undefined;
  const menuItemService = apiUrl ? new MenuItemsService(apiUrl) : undefined;

  const handleAddMenuItem = () => {
    setMenuItem(undefined);
    setShowModal(true);
  };

  const handleEditMenuItem = (item: MenuItemDomainModel) => {
    setMenuItem(item);
    setShowModal(true);
  };

  const handleDeleteMenuItem = (id: number) => {
    setDeleteMenuItemId(id);
    setShowConfirmation(true);
  };

  const confirmDeleteMenuItem = async () => {
    if (deleteMenuItemId && menuItemService) {
      await menuItemService.menuItemDELETE(deleteMenuItemId);
      setShowConfirmation(false);
      setDeleteMenuItemId(null);
      setRefreshCounter(c => c + 1);
      if (props.handleDeleteMenuItem)
        props.handleDeleteMenuItem(deleteMenuItemId);
    }
  };

  const handleFormClose = (refresh = false) => {
    setShowModal(false);
    setMenuItem(undefined);
    if (refresh) setRefreshCounter(c => c + 1);
  };

  return (
    <div>
      <PopupModal
        title={menuItem ? "Bewerk product" : "Product toevoegen"}
        body={
          <MenuItemForm
            menuSectionId={props.menuSection.id}
            toggle={handleFormClose}
            key={menuItem ? menuItem.id : "new"}
            menuItem={menuItem}
          />
        }
        show={showModal}
        handleClose={() => handleFormClose(false)}
        dialogId={menuItem ? menuItem.id.toString() : "new"}
      />
      <ConfirmationModal
        confirmationPromise={confirmDeleteMenuItem}
        dialogId={deleteMenuItemId ? deleteMenuItemId.toString() : ""}
        handleClose={() => setShowConfirmation(false)}
        show={showConfirmation}
        title="Verwijder product"
        body="Weet u zeker dat u dit product wilt verwijderen?"
        key={deleteMenuItemId}
      />
      <div className="flex flex-row items-center gap-4">
        <h1>{props.menuSection.name}</h1>
        <IconBin clickHandler={() => setShowConfirmation(true)} />
      </div>
      <div className="realtive overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Naam
              </th>
              <th scope="col" className="px-6 py-3">
                Beschrijving
              </th>
              <th scope="col" className="px-6 py-3">
                Prijs
              </th>
              <th scope="col" className="px-6 py-3">
                Actie
              </th>
            </tr>
          </thead>
          <tbody>
            {props.menuSection.menuItems?.map(item => (
              <MenuItem
                menuItem={item}
                handleDeleteMenuItem={() => handleDeleteMenuItem(item.id)}
                handleEditMenuItem={() => handleEditMenuItem(item)}
                key={item?.id}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="px-5 py-2.5 text-sm mt-4 sm:mb-6 text-center bg-primary rounded-lg text-white border p-3"
        onClick={handleAddMenuItem}
      >
        Product toevoegen
      </button>
    </div>
    // <div className="menuSection mb-5 mr-5 w-[300px]">
    //   <h2 className="category font-extrabold">{props.menuSection?.name}</h2>
    //   <div className="px-3">
    //     {props.menuSection?.menuItems?.map((item, index) => (
    //       <MenuItem
    //         key={item.id}
    //         index={index + 1}
    //         menuItem={item}
    //         handleDeleteMenuItem={props.handleDeleteMenuItem}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
};
