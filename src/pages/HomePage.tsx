import { useParams } from "react-router-dom";
import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { ClientContainer } from "../containers/ClientContainer";

export const HomePage = () => {
  const { uuId } = useParams();
  const apiUrl = useApiEndpointContext();

  if (!uuId)
    return (
      <h1>
        Geen of onbekend UUIDDD, nu wel???? APIURL: {apiUrl} BASE_URL:{" "}
        {import.meta.env.BASE_URL}
      </h1>
    );

  return <ClientContainer uuId={uuId} />;
};
