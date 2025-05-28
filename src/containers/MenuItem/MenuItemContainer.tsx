import { useState } from "react";
import { MenuItem } from "../../components/MenuItem";
import { MenuItemDomainModel } from "../../domain/MenuItemDomainModel";
import { PopupModal } from "../../components/PopupModal";
import { MenuItemForm } from "../../components/forms/MenuItemForm";

type MenuItemContainerProps = {
  menuSectionId: number;
};

export const MenuItemContainer = (props: MenuItemContainerProps) => {
  const [menuItem, setMenuItem] = useState<MenuItemDomainModel | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PopupModal
        title="Toevoegen product"
        body={
          <MenuItemForm
            menuSectionId={props.menuSectionId}
            toggle={() => console.log("toggle")}
            key={props.menuSectionId}
            menuItem={menuItem}
          />
        }
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setMenuItem(undefined);
        }}
        dialogId={"1"}
      />
      <MenuItem
        menuItem={menuItem}
        handleDeleteMenuItem={() => console.log("handleDeleteMenuItem")}
        key={menuItem?.id}
      />
    </>
  );
};
