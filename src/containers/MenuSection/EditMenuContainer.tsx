import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { useFetch } from "../../hooks/useFetch";
import { MenuService } from "../../service/MenuService";
import { Loader } from "../../components/Loader";

type EditMenuContainerProps = {
  menuId: number;
};

type MenuSchemaModel = {
  id: number;
  name: string;
};

export const EditMenuContainer = (props: EditMenuContainerProps) => {
  const apiUrl = useApiEndpointContext();
  const service = new MenuService(apiUrl);
  const navigate = useNavigate();

  const result = useFetch(
    () => service.GetMenu(props.menuId),
    () => "Er is een fout opgetreden bij het ophalen van het menu",
    true,
    1
  );

  const { register, handleSubmit, reset } = useForm<MenuSchemaModel>({
    values: result.data
      ? { id: result.data.id, name: result.data?.name }
      : undefined,
  });

  const onSubmit = async (data: MenuSchemaModel) => {
    await service
      .editMenu(data.id, data.name)
      .then(() => {
        reset();
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  if (result.isProcessing) {
      return <Loader />;
    }

  return (
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Bewerk menu
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Menu naam
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type menu naam"
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
  );
};
