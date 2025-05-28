import { MenuService } from "../../service/MenuService";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import Connector from "../../signalr-connection";
import { useState } from "react";
import IconClose from "../../icons/IconClose";
import { ConfirmationModal } from "../../components/ConfirmationModal";

export const MenuContainer = () => {
  const apiUrl = useApiEndpointContext();
  const menuService = new MenuService(apiUrl);
  const [menuId, setMenuId] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const connector = Connector.getInstance();
  connector.onMenuReceived(() => setRefreshCounter(refreshCounter + 1));
  const result = useFetch(
    () => menuService.GetAllMenus(),
    () => "ERROR",
    true,
    refreshCounter
  );

  // React.useEffect(() => {
  //   setFetching(true);
  //   const fetchMenus = async () => {
  //     menuService
  //       .GetAllMenus()
  //       .then((response) => {
  //         setMenus(response);
  //         setFetching(false);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setErrors(error);
  //         setFetching(false);
  //       });
  //   };

  //   fetchMenus();
  //   events(() => fetchMenus());
  // }, []);

  const handleDeleteMenu = (id: number) => menuService.deleteMenu(id);

  if (result.isProcessing) {
    return <Loader />;
  }

  if (result.hasError) {
    return <h2>Error: {result.error}</h2>;
  }

  return (
    <div className="flex flex-wrap flex-row content-start pt-16 max-h-lvh h-full w-full">
      <ConfirmationModal
        body={`Verwijderen van scherm ${menuId}`}
        title="Wilt u zeker dit scherm verwijderen?"
        confirmationPromise={() => handleDeleteMenu(menuId)}
        show={showModal}
        handleClose={() => setShowModal(false)}
        dialogId={menuId.toString()}
      />
      {result.data?.map((item) => (
        <div key={item.id} className="mb-5 mr-5 flex-[0_1_200px]">
          <button
            className="indicator-item p-2 rounded-full bg-[#09244B] cursor-pointer group-hover:block hidden"
            onClick={() => {
              setMenuId(item.id);
              setShowModal(true);
            }}
          >
            <IconClose width={10} height={10} />
          </button>
          <a href={`/menus/${item.id}`} className="no-underline">
            <div
              className={`custom-shadow p-16 hover:cursor-pointer rounded-2xl flex justify-center items-center text-center`}
            >
              <h2 className="capitalize">{item.name}</h2>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};
