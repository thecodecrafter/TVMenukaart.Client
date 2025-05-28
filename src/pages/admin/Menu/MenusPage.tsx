import { useParams } from "react-router-dom";
import { MenusContainer } from "../../../containers/Menu/MenusContainer";

export const MenusPage = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) return <h1>FOUT</h1>;

  return <MenusContainer restaurantId={restaurantId} />;
};
