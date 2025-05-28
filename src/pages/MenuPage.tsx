import { useParams } from "react-router-dom";
import { MenuSectionContainer } from "../containers/MenuSection/MenuSectionContainer";

export const MenuPage = () => {
  const { menuId } = useParams();

  if (!menuId) return <h1>Geen UUID</h1>;

  return <MenuSectionContainer menuId={menuId} />;
};

export default MenuPage;
