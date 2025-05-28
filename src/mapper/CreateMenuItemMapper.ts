import { MenuItem } from "../client/MenuMaster.Client.Generated";
import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";
import { AbstractMapper } from "../utils/AbstractMapper";
import { convertToValueOrUndefined } from "../utils/convert";

export class CreateMenuItemMapper extends AbstractMapper<
  MenuItemDomainModel,
  MenuItem
> {
  map(model: MenuItemDomainModel): MenuItem {
    const result = new MenuItem();

    result.id = model.id ?? 0;
    result.name = convertToValueOrUndefined(model.name);
    result.menuSectionId = model.menuSectionId;
    result.description = convertToValueOrUndefined(model.description);
    result.price = convertToValueOrUndefined(model.price);

    return result;
  }
}
