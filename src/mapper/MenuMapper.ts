import { MenuDto } from "../client/MenuMaster.Client.Generated";
import { MenuDomainModel } from "../domain/MenuDomainModel";
import { AbstractMapper } from "../utils/AbstractMapper";
import { MenuSectionMapper } from "./MenuSectionMapper";

export class MenuMapper extends AbstractMapper<MenuDto, MenuDomainModel> {
  map(model: MenuDto): MenuDomainModel {
    const result = new MenuDomainModel();
    const mapper = new MenuSectionMapper();

    result.id = model.id ?? 0;
    result.name = model.name ?? "";
    result.publicUrl = model.publicUrl ?? undefined;
    result.menuSections = model.menuSections
      ? model.menuSections.map((item) => mapper.map(item))
      : null;

    return result;
  }
}
