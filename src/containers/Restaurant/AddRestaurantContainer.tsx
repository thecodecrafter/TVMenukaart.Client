import { useForm } from "react-hook-form";
import { RestaurantService } from "../../service/RestaurantService";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { useNavigate } from "react-router-dom";

type RestaurantSchemaModel = {
  id: number;
  name: string;
};

export const AddRestaurantContainer = () => {
  const apiUrl = useApiEndpointContext();
  const service = new RestaurantService(apiUrl);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<RestaurantSchemaModel>({
    values: { id: 0, name: "" },
  });

  const onSubmit = async (data: RestaurantSchemaModel) => {
    await service
      .CreateRestaurant(data.name)
      .then(() => {
        reset();
        navigate("/admin/restaurants");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add a new restaurant
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
          Add restaurant
        </button>
      </form>
    </div>
  );
};
