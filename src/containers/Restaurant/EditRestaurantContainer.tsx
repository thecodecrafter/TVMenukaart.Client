import { Loader } from "../../components/Loader";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { useFetch } from "../../hooks/useFetch";
import { RestaurantService } from "../../service/RestaurantService";
import { useState } from "react";
import Connector from "../../signalr-connection";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type EditRestaurantContainerProps = {
  restaurantId: string;
};

type RestaurantSchemaModel = {
  id: number;
  name: string;
};

export const EditRestaurantContainer = (
  props: EditRestaurantContainerProps
) => {
  const apiUrl = useApiEndpointContext();
  const service = new RestaurantService(apiUrl);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const navigate = useNavigate();

  const connector = Connector.getInstance();
  connector.onMenuReceived(() => setRefreshCounter(refreshCounter + 1));

  const result = useFetch(
    () => service.GetRestaurant(+props.restaurantId),
    () => "Er is een fout opgetreden bij het ophalen van de menus",
    true,
    refreshCounter
  );

  const { register, handleSubmit, reset } = useForm<RestaurantSchemaModel>({
    values: result.data
      ? { id: result.data.id, name: result.data.name }
      : undefined,
  });

  // const handleDeleteMenu = (id: number) => menuService.deleteMenu(id);

  const onSubmit = async (data: RestaurantSchemaModel) => {
    await service
      .editRestaurant(data.id, data.name)
      .then(() => {
        reset();
        navigate("/admin/restaurants");
      })
      .catch((err) => console.log(err));
  };

  if (result.isProcessing) {
    return <Loader />;
  }

  if (result.hasError) {
    return <h1>{result.error}</h1>;
  }

  return (
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Bewerk restaurant
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type restaurant name"
              required
              autoFocus
              {...register("name", {
                required: "Naam is verplicht",
              })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary"
        >
          Opslaan
        </button>
      </form>
    </div>
    // <div className="flex flex-col content-start pt-0 pr-12">
    //   <Modal
    //     body={`Verwijderen van menu ${menu?.name}`}
    //     title="Wilt u zeker dit restaurant verwijderen?"
    //     confirmationPromise={() =>
    //       menu ? handleDeleteMenu(menu.id) : Promise.resolve()
    //     }
    //     show={showModal}
    //     handleClose={() => setShowModal(false)}
    //     dialogId={menu ? menu.id.toString() : ""}
    //   />
    //   <h1>Restaurant: {result.data?.name}</h1>
    //   <div className="flex justify-end">
    //     <button
    //       onClick={() =>
    //         navigate(`/admin/restaurants/${result.data?.id}/menus/add`)
    //       }
    //       className="px-5 py-2.5 text-sm mb-4 sm:mb-6 text-center bg-primary rounded-lg text-white border p-3"
    //     >
    //       Add new menu
    //     </button>
    //   </div>
    //   <div className="realtive overflow-x-auto shadow-md sm:rounded-lg">
    //     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //         <tr>
    //           <th scope="col" className="px-6 py-3">
    //             Menu name
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Action
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {result.data?.menus?.map((item) => (
    //           <tr
    //             key={item.id}
    //             onClick={() => {
    //               console.log(item.id);
    //               navigate(`/admin/menus/${item.id}`);
    //             }}
    //             className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
    //           >
    //             <th
    //               scope="row"
    //               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //             >
    //               {item.name}
    //             </th>
    //             <td className="px-6 py-4 text-[red]">
    //               <button
    //                 onClick={(event) => {
    //                   event.stopPropagation();
    //                   setMenu(item);
    //                   setShowModal(true);
    //                 }}
    //                 className="z-10 font-medium text-blue-600 dark:text-blue-500 hover:underline"
    //               >
    //                 Verwijder
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};
