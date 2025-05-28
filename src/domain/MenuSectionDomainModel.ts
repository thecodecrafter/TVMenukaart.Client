import { MenuItemDomainModel } from "./MenuItemDomainModel";

export class MenuSectionDomainModel {
  id!: number;
  menuId!: number;
  name!: string | null;
  menuItems!: MenuItemDomainModel[] | null;
}
