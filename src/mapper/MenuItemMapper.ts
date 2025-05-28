import { MenuItemDto } from "../client/MenuMaster.Client.Generated";
import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";
import { AbstractMapper } from "../utils/AbstractMapper";

export class MenuItemMapper extends AbstractMapper<
  MenuItemDto,
  MenuItemDomainModel
> {
  map(model: MenuItemDto): MenuItemDomainModel {
    const result = new MenuItemDomainModel();

    result.id = model.id ?? 0;
    result.name = model.name ?? "";
    result.description = model.description ?? "";
    result.price = model.price ?? 0;

    return result;
  }
}
