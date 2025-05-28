import { useParams } from "react-router-dom";
import { EditRestaurantContainer } from "../../../containers/Restaurant/EditRestaurantContainer";

export const EditRestaurantPage = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) return <h1>Geen UUID</h1>;

  return <EditRestaurantContainer restaurantId={restaurantId} />;
};
