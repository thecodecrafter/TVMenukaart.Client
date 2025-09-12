import { useParams } from "react-router-dom";

import { MenuCreationWizard } from "../../../components/MenuCreationWizard";

export const AddMenuPage = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) return <h1>Geen UUID</h1>;

  return <MenuCreationWizard restaurantId={+restaurantId} />;
};
