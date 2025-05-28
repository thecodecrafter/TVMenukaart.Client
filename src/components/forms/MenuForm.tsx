import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { MenuDomainModel } from "../../domain/MenuDomainModel";
import { MenuService } from "../../service/MenuService";

type MenuProps = {
  toggle: () => void;
  restaurantId: number;
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
    console.log(data);
    await menuService
      .AddMenu(data.name, props.restaurantId)
      .then(() => {
        props.toggle();
        reset();
      })
      .catch((error) => {
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
      onClick={(e) => {
        console.log(e.currentTarget);
        e.stopPropagation();
      }}
      className="admin-form"
      noValidate
    >
      <div className="join join-vertical lg:join-vertical">
        <input
          type="text"
          placeholder="Naam"
          autoFocus={true}
          {...register("name", {
            required: "Naam is verplicht",
          })}
          className={`input input-bordered max-w-xs join-item focus:outline-none ${
            errors.name
              ? "focus:border-red-500 focus-within:border-red-500 border-red-500"
              : ""
          }`}
        />
        <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        <button className="btn btn-primary join-item" type="submit">
          Opslaan
        </button>
      </div>
    </form>
  );
};
