import { MenuDomainModel } from "./MenuDomainModel";

export class RestaurantDomainModel {
  id!: number;
  name!: string;
  menuCount?: number;
  menus!: MenuDomainModel[] | null;
}
