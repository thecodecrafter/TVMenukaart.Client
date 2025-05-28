import { MenuItemDto } from "../client/MenuMaster.Client.Generated";
import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";
import { AbstractMapper } from "../utils/AbstractMapper";
import { getValueOrNull } from "../utils/convert";

export class MenuItemMapper extends AbstractMapper<
  MenuItemDto,
  MenuItemDomainModel
> {
  map(model: MenuItemDto): MenuItemDomainModel {
    const result = new MenuItemDomainModel();

    result.id = model.id ?? 0;
    result.name = getValueOrNull(model.name);
    result.description = getValueOrNull(model.description);
    result.price = getValueOrNull(model.price);

    return result;
  }
}
