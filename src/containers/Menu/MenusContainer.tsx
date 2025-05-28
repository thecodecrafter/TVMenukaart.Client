import { useState } from "react";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { MenuService } from "../../service/MenuService";
import { useFetch } from "../../hooks/useFetch";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { Loader } from "../../components/Loader";
import Connector from "../../signalr-connection";
import { MenuDomainModel } from "../../domain/MenuDomainModel";
import { useNavigate } from "react-router-dom";
import { RestaurantService } from "../../service/RestaurantService";

type MenusContainerProps = {
  restaurantId: string;
};

export const MenusContainer = (props: MenusContainerProps) => {
  const apiUrl = useApiEndpointContext();
  const menuService = new MenuService(apiUrl);
  const restaurantService = new RestaurantService(apiUrl);
  const [menu, setMenu] = useState<MenuDomainModel>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const connector = Connector.getInstance();
  connector.onMenuReceived(() => setRefreshCounter(refreshCounter + 1));

  const result = useFetch(
    () => restaurantService.GetRestaurant(+props.restaurantId),
    () => "Er is een fout opgetreden bij het ophalen van het restaurant",
    true,
    refreshCounter
  );

  const handleDeleteMenu = (id: number) => menuService.deleteMenu(id);

  if (result.isProcessing) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col content-start pt-0 pr-12">
      <ConfirmationModal
        body={`Verwijderen van menu ${menu?.name}`}
        title="Wilt u zeker dit restaurant verwijderen?"
        confirmationPromise={() =>
          menu ? handleDeleteMenu(menu.id) : Promise.resolve()
        }
        show={showModal}
        handleClose={() => setShowModal(false)}
        dialogId={menu ? menu.id.toString() : ""}
      />
      <h1>Restaurant: {result.data?.name}</h1>

      {!result.data?.menus || result.data.menus.length < 1 ? (
        <div className="flex flex-col">
          <button
            onClick={() =>
              navigate(`/admin/restaurants/${result.data?.id}/menus/add`)
            }
            className="px-5 py-2.5 text-sm mb-4 sm:mb-6 text-center bg-primary rounded-lg text-white border p-3"
          >
            Voeg je eerste scherm toe
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-end">
            <button
              onClick={() =>
                navigate(`/admin/restaurants/${result.data?.id}/menus/add`)
              }
              className="px-5 py-2.5 text-sm mb-4 sm:mb-6 text-center bg-primary rounded-lg text-white border p-3"
            >
              Voeg nieuw scherm toe
            </button>
          </div>
          <div className="realtive overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Scherm naam
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actie
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.data?.menus?.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      navigate(`/admin/menus/${item.id}`);
                    }}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4 text-[red]">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/admin/menus/${item.id}/edit`);
                        }}
                        className="z-10 first:pr-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Bewerk
                      </button>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setMenu(item);
                          setShowModal(true);
                        }}
                        className="z-10 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Verwijder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    // <div className="flex flex-wrap flex-row content-start pt-16 max-h-lvh">
    //   <Modal
    //     body={`Verwijderen van scherm ${menuId}`}
    //     title="Wilt u zeker dit scherm verwijderen?"
    //     confirmationPromise={() => handleDeleteMenu(menuId)}
    //     show={showModal}
    //     handleClose={() => setShowModal(false)}
    //     dialogId={menuId.toString()}
    //   />
    //   {result.data?.map((item) => (
    //     <div key={item.id} className="indicator mb-5 mr-5 group">
    //       <span
    //         className="indicator-item p-2 rounded-full bg-[#09244B] cursor-pointer group-hover:block hidden"
    //         onClick={() => {
    //           setMenuId(item.id);
    //           setShowModal(true);
    //         }}
    //       >
    //         <IconClose width={10} height={10} />
    //       </span>
    //       <a href={`/admin/menus/${item.id}`} className="no-underline">
    //         <div
    //           className={`border-2 border-solid hover:cursor-pointer rounded-2xl w-80 h-56 flex justify-center items-center text-center`}
    //         >
    //           <h2 className="capitalize">{item.name}</h2>
    //         </div>
    //       </a>
    //     </div>
    //   ))}
    //   <div
    //     className={`border-2 hover:border-solid hover:cursor-pointer border-dashed rounded-2xl w-80 h-56 flex justify-center items-center text-center`}
    //     onClick={() => {
    //       if (toggle) {
    //         setToggle(false);
    //       } else {
    //         setToggle(true);
    //       }
    //     }}
    //     onBlur={(e) => {
    //       e.stopPropagation();
    //     }}
    //   >
    //     {toggle ? (
    //       <MenuForm
    //         toggle={() => {
    //           setToggle(false);
    //         }}
    //         restaurantId={+props.restaurantId}
    //       />
    //     ) : (
    //       <IconAddMenu />
    //     )}
    //   </div>
    // </div>
  );
};
