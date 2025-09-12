import { useParams } from "react-router-dom";

import { MenusContainer } from "../containers/Menu/MenusContainer";

export const MenusPage = () => {
  const { restaurantId } = useParams();
  return <MenusContainer restaurantId={restaurantId ?? ""} />;
};
