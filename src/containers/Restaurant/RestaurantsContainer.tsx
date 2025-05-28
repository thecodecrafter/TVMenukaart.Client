import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { useFetch } from "../../hooks/useFetch";
import { RestaurantService } from "../../service/RestaurantService";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { Suspense, useState } from "react";
import { RestaurantDomainModel } from "../../domain/RestaurantDomainModel";

export const RestaurantsContainer = () => {
  const apiUrl = useApiEndpointContext();
  const restaurantService = new RestaurantService(apiUrl);
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<RestaurantDomainModel>();
  const [showModal, setShowModal] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const result = useFetch(
    () => restaurantService.GetAllRestaurants(),
    () => "FOUT",
    true,
    refreshCounter
  );

  const handleDeleteRestaurant = (id: number) =>
    restaurantService.deleteRestaurant(id).then(() => {
      setRefreshCounter((prev) => prev + 1);
    });

  // if (result.isProcessing) {
  //   return <Loader />;
  // }

  return (
    <div className="flex flex-col content-start pt-0 pr-12">
      <ConfirmationModal
        body={`Verwijderen van restaurant ${restaurant?.name}`}
        title="Wilt u zeker dit restaurant verwijderen?"
        confirmationPromise={() =>
          restaurant ? handleDeleteRestaurant(restaurant.id) : Promise.resolve()
        }
        show={showModal}
        handleClose={() => setShowModal(false)}
        dialogId={restaurant ? restaurant.id.toString() : ""}
      />
      <h1>Jouw restaurants</h1>
      <div className="flex justify-end">
        <button
          onClick={() => navigate("add")}
          className="px-5 py-2.5 text-sm mb-4 sm:mb-6 text-center bg-primary rounded-lg text-white border p-3"
        >
          Restaurant toevoegen
        </button>
      </div>
      <div className="realtive overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Restaurant naam
              </th>
              <th scope="col" className="px-6 py-3">
                Locatie
              </th>
              <th scope="col" className="px-6 py-3">
                aantal schermen
              </th>
              <th scope="col" className="px-6 py-3">
                Actie
              </th>
            </tr>
          </thead>
          <Suspense fallback={<Loader />}>
            <tbody>
              {result.data?.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    navigate(`${item.id}`);
                  }}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">Utrecht</td>
                  <td className="px-6 py-4">{item.menuCount}</td>
                  <td className="px-6 py-4 text-[red]">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`${item.id}/edit`);
                      }}
                      className="z-10 first:pr-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Bewerk
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setRestaurant(item);
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
          </Suspense>
        </table>
      </div>
    </div>
  );
};
