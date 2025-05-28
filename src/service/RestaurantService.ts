import axios from "../service/api";
import {
  IRestaurantClient,
  Restaurant,
  RestaurantClient,
  RestaurantDto,
} from "../client/MenuMaster.Client.Generated";
import { RestaurantDomainModel } from "../domain/RestaurantDomainModel";
import { RestaurantMapper } from "../mapper/RestaurantMapper";

export class RestaurantService {
  private readonly client: IRestaurantClient;

  constructor(apiUrl: string) {
    this.client = new RestaurantClient(apiUrl, axios);
  }

  GetAllRestaurants = async (): Promise<RestaurantDomainModel[]> => {
    const mapper = new RestaurantMapper();
    const data = await this.client.restaurantAll();
    return data.map((item) => mapper.map(item));
  };

  GetRestaurant = async (id: number): Promise<RestaurantDomainModel> => {
    const mapper = new RestaurantMapper();
    const data = await this.client.restaurantGET(id);
    return mapper.map(data);
  };

  CreateRestaurant = async (name: string): Promise<RestaurantDomainModel> => {
    const restaurant = new Restaurant();
    restaurant.id = 0;
    restaurant.appUserId = 0;

    restaurant.name = name;
    console.log(restaurant);

    return this.client
      .restaurantPOST(restaurant)
      .then((response) => {
        const mapper = new RestaurantMapper();
        return mapper.map(response);
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  };

  editRestaurant = async (id: number, name: string): Promise<void> => {
    const restaurant = new RestaurantDto();
    restaurant.id = id;
    restaurant.name = name;
    restaurant.menuCount = 0;
    await this.client.restaurantPUT(restaurant);
  };

  deleteRestaurant = async (id: number): Promise<void> => {
    return this.client.restaurantDELETE(id);
  };
}
