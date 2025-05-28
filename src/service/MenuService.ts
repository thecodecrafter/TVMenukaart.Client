import axios from "../service/api";
import {
  IMenuClient,
  MenuClient,
  MenuDto,
} from "../client/MenuMaster.Client.Generated";

import { MenuDomainModel } from "../domain/MenuDomainModel";
import { MenuMapper } from "../mapper/MenuMapper";

export class MenuService {
  private readonly client: IMenuClient;

  constructor(apiUrl: string) {
    this.client = new MenuClient(apiUrl, axios);
  }

  GetAllMenus = async (): Promise<MenuDomainModel[]> => {
    const menuMapper = new MenuMapper();
    const data = await this.client.menuAll();
    return data.map((item) => menuMapper.map(item));
    // return this.client
    //   .menuAll()
    //   .then((response) => {
    //     return response.map((item) => menuMapper.map(item));
    //   })
    //   .catch((error) => handleError(error));
  };

  GetMenu = (menuId: number): Promise<MenuDomainModel> => {
    const mapper = new MenuMapper();

    return this.client.menuGET(menuId).then((response) => {
      return mapper.map(response);
    });
  };

  AddMenu = (name: string, restaurantId: number): Promise<MenuDomainModel> => {
    const mapper = new MenuMapper();

    return this.client
      .menuPOST(name, restaurantId)
      .then((response) => {
        return mapper.map(response);
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  };

  editMenu = async (id: number, name: string): Promise<void> => {
    const menu = new MenuDto();
    menu.id = id;
    menu.name = name;
    await this.client.menuPUT(id, menu);
  };

  deleteMenu = (id: number): Promise<void> => {
    return this.client.menuDELETE(id).catch((error) => console.error(error));
  };
}
