import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { MenuDomainModel } from "../../domain/MenuDomainModel";
import { MenuService } from "../../service/MenuService";
import { LayoutTemplate } from "../LayoutTemplateSelector";

type MenuProps = {
  toggle?: () => void;
  onSubmit?: (name: string) => void;
  onCancel?: () => void;
  restaurantId: number;
  selectedLayout?: LayoutTemplate | null;
};

type MenuSchemaModel = {
  id: number;
  name: string;
};

export const MenuForm = (props: MenuProps) => {
  const [menuItem] = useState<MenuDomainModel | null>(null);
  const apiUrl = useApiEndpointContext();
  const menuService = new MenuService(apiUrl);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuSchemaModel>({
    values: menuItem
      ? {
          id: menuItem.id ?? 0,
          name: menuItem.name ?? "",
        }
      : undefined,
  });

  useEffect(() => {
    // const fetchMenuItem = async () => {
    //   const response = await menuItemService.menuItemsGET(menuItemId ?? 0);
    //   setMenuItem(response);
    // };
    // if (menuItemId) {
    //   fetchMenuItem();
    // }
  }, []);

  const onSubmit = async (data: MenuSchemaModel) => {
    console.log(data, { layout: props.selectedLayout });

    if (props.onSubmit) {
      props.onSubmit(data.name);
      return;
    }

    await menuService
      .AddMenu(data.name, props.restaurantId)
      .then(() => {
        if (props.toggle) props.toggle();
        reset();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // const onBlur = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   // console.log("blur form", e.currentTarget, e.target, e.relatedTarget);
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={e => {
        console.log(e.currentTarget);
        e.stopPropagation();
      }}
      className="admin-form"
      noValidate
    >
      <div className="space-y-6">
        {props.selectedLayout && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-900 mb-1">
              Geselecteerde layout:
            </div>
            <div className="text-sm text-blue-700 capitalize">
              {props.selectedLayout.replace("-", " ")}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu naam
          </label>
          <input
            type="text"
            placeholder="Voer menu naam in..."
            autoFocus={true}
            {...register("name", {
              required: "Naam is verplicht",
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          )}
        </div>

        <div className="flex justify-between pt-4">
          {props.onCancel && (
            <button
              type="button"
              onClick={props.onCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Terug
            </button>
          )}

          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
            type="submit"
          >
            {props.onSubmit ? "Volgende" : "Opslaan"}
          </button>
        </div>
      </div>
    </form>
  );
};
