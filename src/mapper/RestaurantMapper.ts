import { RestaurantDto } from "../client/MenuMaster.Client.Generated";
import { RestaurantDomainModel } from "../domain/RestaurantDomainModel";
import { AbstractMapper } from "../utils/AbstractMapper";
import { MenuMapper } from "./MenuMapper";

export class RestaurantMapper extends AbstractMapper<
  RestaurantDto,
  RestaurantDomainModel
> {
  map(model: RestaurantDto): RestaurantDomainModel {
    const result = new RestaurantDomainModel();
    const mapper = new MenuMapper();

    result.id = model.id ?? 0;
    result.name = model.name ?? "";
    result.menuCount = model.menuCount;
    result.menus = model.menus
      ? model.menus?.map((menu) => mapper.map(menu))
      : null;

    return result;
  }
}
