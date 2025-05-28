import axios from "../service/api";
import {
  IMenuItemsClient,
  MenuItemsClient,
} from "../client/MenuMaster.Client.Generated";
import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";
import { MenuItemMapper } from "../mapper/MenuItemMapper";
import { CreateMenuItemMapper } from "../mapper/CreateMenuItemMapper";

export class MenuItemsService {
  private readonly client: IMenuItemsClient;

  constructor(apiUrl: string) {
    this.client = new MenuItemsClient(apiUrl, axios);
  }

  menuItemsAll = (menuSectionId: number): Promise<MenuItemDomainModel[]> => {
    const menuItemMapper = new MenuItemMapper();

    return this.client.menuSection(menuSectionId).then((result) => {
      return result.map((item) => menuItemMapper.map(item));
    });
  };

  menuItemsGET = (id: number): Promise<MenuItemDomainModel> => {
    const menuItemMapper = new MenuItemMapper();

    return this.client.menuItemsGET(id).then((result) => {
      return menuItemMapper.map(result);
    });
  };

  menuItemsPUT = (id: number, menuItem: MenuItemDomainModel): Promise<void> => {
    const mapper = new CreateMenuItemMapper();
    const updateMenuItem = mapper.map(menuItem);

    return this.client.menuItemsPUT(id, updateMenuItem);
  };

  menuItemsPOST = (
    menuItem: MenuItemDomainModel
  ): Promise<MenuItemDomainModel> => {
    const menuItemMapper = new MenuItemMapper();
    const mapper = new CreateMenuItemMapper();
    const createMenuItem = mapper.map(menuItem);

    return this.client
      .menuItemsPOST(createMenuItem)
      .then((response) => {
        return menuItemMapper.map(response);
      })
      .catch((error) => {
        console.log(error);
        throw new Error("");
      });
  };

  menuItemDELETE = (menuItemId: number): Promise<void> => {
    return this.client
      .menuItemsDELETE(menuItemId)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Deleting menu item went wrong");
      });
  };
}
