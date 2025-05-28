import { BoardPhotoDomainModel } from "./BoardPhotoDomainModel";
import { MenuSectionDomainModel } from "./MenuSectionDomainModel";

export class MenuDomainModel {
  id!: number;
  name!: string;
  publicUrl!: string | undefined;
  menuSections!: MenuSectionDomainModel[] | null;
  boardPhoto!: BoardPhotoDomainModel | null;
}
