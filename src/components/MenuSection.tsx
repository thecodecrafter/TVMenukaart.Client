import { useState } from "react";
import { MenuSectionDomainModel } from "../domain/MenuSectionDomainModel";
import { MenuItemForm } from "./forms/MenuItemForm";
import { PopupModal } from "./PopupModal";
import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";
import IconBin from "../icons/IconBin";
import { ConfirmationModal } from "./ConfirmationModal";
import { MenuItem } from "./MenuItem";

export type MenuSectionProps = {
  menuSection: MenuSectionDomainModel;
  handleDeleteMenuSection: (menuSectionId: number) => Promise<void>;
  // handleDeleteMenuItem: (menuItemId: number) => void;
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

  return (
    <div>
      <PopupModal
        title="Toevoegen productgroep"
        body={
          <MenuItemForm
            menuSectionId={props.menuSection.id}
            toggle={() => console.log("toggle")}
            key={props.menuSection.id}
            menuItem={menuItem}
          />
        }
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          console.log("handleclose");
          setMenuItem(undefined);
        }}
        dialogId={"1"}
      />
      <ConfirmationModal
        confirmationPromise={() =>
          props.handleDeleteMenuSection(props.menuSection.id)
        }
        dialogId="1"
        handleClose={() => setShowConfirmation(false)}
        show={showConfirmation}
        title="Verwijder productgroep"
        body="Weet u zeker dat u de productgroep wilt verwijderen?"
        key={props.menuSection.id}
      />
      <div className="flex flex-row items-center gap-4">
        <h1>{props.menuSection.name}</h1>
        <IconBin
          clickHandler={() =>
            // props.handleDeleteMenuSection(props.menuSection.id)
            setShowConfirmation(true)
          }
        />
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
            {props.menuSection.menuItems?.map((item) => {
              console.log(item);
              return (
                <MenuItem
                  menuItem={item}
                  handleDeleteMenuItem={() =>
                    console.log("handleDeleteMenuItem")
                  }
                  key={menuItem?.id}
                />

                // <MenuItemContainer
                //   key={item.id}
                //   menuItem={item}
                //   menuItemId={item.id.toString()}
                //   menuSectionId={props.menuSection.id}
                // />
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        className="px-5 py-2.5 text-sm mt-4 sm:mb-6 text-center bg-primary rounded-lg text-white border p-3"
        onClick={() => {
          setShowModal(true);
        }}
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
