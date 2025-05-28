import axios from "../service/api";

import {
  IMenuSectionClient,
  MenuSectionClient,
} from "../client/MenuMaster.Client.Generated";
import { MenuSectionDomainModel } from "../domain/MenuSectionDomainModel";
import { MenuSectionMapper } from "../mapper/MenuSectionMapper";

export class MenuSectionsService {
  private readonly client: IMenuSectionClient;

  constructor(apiUrl: string) {
    this.client = new MenuSectionClient(apiUrl, axios);
  }

  // menuSectionsAll = (uuId: string): Promise<MenuSectionDomainModel[]> => {
  //   const mapper = new MenuSectionMapper();

  //   return this.client
  //     .menuSectionAll(uuId)
  //     .then((result) => {
  //       return result.map((item) => mapper.map(item));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       throw new Error(error);
  //     });
  // };

  allMenuSections = (id: number): Promise<MenuSectionDomainModel[]> => {
    const mapper = new MenuSectionMapper();

    return this.client
      .admin(id)
      .then((result) => {
        return result.map((item) => mapper.map(item));
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  };

  addMenuSection = (
    menuId: number,
    sectionName: string
  ): Promise<MenuSectionDomainModel> => {
    // const mapper = new CreateMenuSectionMapper();
    const menuSectionMapper = new MenuSectionMapper();
    // const model = mapper.map(value);

    return this.client
      .menuSectionPOST(menuId, sectionName)
      .then((response) => {
        return menuSectionMapper.map(response);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };

  updateMenuSection = (
    menuId: number,
    id: number,
    name: string
  ): Promise<MenuSectionDomainModel> => {
    return this.client
      .menuSectionPATCH(menuId, id, name)
      .then((response) => {
        return new MenuSectionMapper().map(response);
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  };

  deleteMenuSection = (id: number): Promise<void> => {
    return this.client.menuSectionDELETE(id).catch((error) => {
      console.log(error);
    });
  };
}
