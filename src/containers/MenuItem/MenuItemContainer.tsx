import { useState } from "react";

import { MenuItemForm } from "../../components/forms/MenuItemForm";
import { MenuItem } from "../../components/MenuItem";
import { PopupModal } from "../../components/PopupModal";
import { MenuItemDomainModel } from "../../domain/MenuItemDomainModel";

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
