import { MenuSectionDto } from "../client/MenuMaster.Client.Generated";
import { MenuSectionDomainModel } from "../domain/MenuSectionDomainModel";
import { AbstractMapper } from "../utils/AbstractMapper";
import { getValueOrNull } from "../utils/convert";
import { MenuItemMapper } from "./MenuItemMapper";

export class MenuSectionMapper extends AbstractMapper<
  MenuSectionDto,
  MenuSectionDomainModel
> {
  map(model: MenuSectionDto): MenuSectionDomainModel {
    const result = new MenuSectionDomainModel();
    const mapper = new MenuItemMapper();

    result.id = model.id ?? 0;
    result.name = getValueOrNull(model.name);
    result.menuItems = model.menuItems
      ? model.menuItems?.map((item) => mapper.map(item))
      : null;

    return result;
  }
}
