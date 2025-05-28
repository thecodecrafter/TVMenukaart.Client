import { useParams } from "react-router-dom";
import { AddMenuContainer } from "../../../containers/Menu/AddMenuContainer";

export const AddMenuPage = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) return <h1>Geen UUID</h1>;

  return <AddMenuContainer restaurantId={+restaurantId} />;
};
