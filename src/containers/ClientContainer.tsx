import { useState } from "react";
import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { useFetch } from "../hooks/useFetch";
import { MenuSectionsService } from "../service/MenuSectionsService";
import Connector from "../signalr-connection";
import useFullscreen from "../hooks/useFullscreen";
import { MenuSection } from "../components/MenuSection";

type ClientContainerProps = {
  uuId: string;
};

export const ClientContainer = (props: ClientContainerProps) => {
  const apiUrl = useApiEndpointContext();
  const menuSectionService = new MenuSectionsService(apiUrl);
  const connector = Connector.getInstance();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { toggleFullscreen, isFullscreen } = useFullscreen();

  connector.onMenuReceived(() => {
    setRefreshCounter(refreshCounter + 1);
  });

  const onDeleteMenuSection = (id: number) => {
    console.log("HandleDeleteMenuSection", id);
    return Promise.resolve();
  };

  const result = useFetch(
    () => menuSectionService.allMenuSections(+props.uuId),
    () => "Er is een fout opgetreden bij het ophalen van de menus",
    true,
    refreshCounter
  );
  return (
    <div className="flex flex-wrap flex-col content-start h-dvh p-10 border border-[#BDBDBD] bg-[#F8F8F8]">
      <button
        className={`btn btn-primary mb-3 hidden ${
          isFullscreen ? "hidden" : "block"
        }`}
        onClick={toggleFullscreen}
      >
        go fullscreen
      </button>
      {result.data?.length === 0 && (
        <h2>Geen categorie. Maak je eerste categorie aan.</h2>
      )}
      {result.data?.map((item, key) => (
        <MenuSection
          menuSection={item}
          key={key}
          handleDeleteMenuSection={onDeleteMenuSection}
        />
      ))}
    </div>
  );
};
