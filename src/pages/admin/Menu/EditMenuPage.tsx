import { useParams } from "react-router-dom";
import { EditMenuContainer } from "../../../containers/MenuSection/EditMenuContainer";

export const EditMenuPage = () => {
  const { menuId } = useParams();

  if (!menuId) return <h1>Geen UUID</h1>;

  return <EditMenuContainer menuId={+menuId} />;
};
