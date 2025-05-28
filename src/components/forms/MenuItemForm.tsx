import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { MenuItemDomainModel } from "../../domain/MenuItemDomainModel";
import { parsePrice } from "../../utils/number";
import { useClickedOutside } from "../../hooks/useClickedOutside";
import IconBin from "../../icons/IconBin";
import { MenuItemsService } from "../../service/MenuItemsService";

type MenuItemProps = {
  menuSectionId: number;
  toggle: (value: boolean) => void;
  menuItem?: MenuItemDomainModel;
};

type MenuItemSchemaModel = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export const MenuItemForm = (props: MenuItemProps) => {
  // const [menuItem] = useState<MenuItemDomainModel | null>(null);
  const apiUrl = useApiEndpointContext();
  const menuItemService = new MenuItemsService(apiUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, defaultValues },
    reset,
  } = useForm<MenuItemSchemaModel>({

    values: props.menuItem
      ? {
          id: props.menuItem.id,
          name: props.menuItem.name,
          description: props.menuItem.description,
          price: props.menuItem.price,
        }
      : undefined,
  });

  const onSubmit = async (data: MenuItemSchemaModel) => {
    const postData: MenuItemDomainModel = {
      id: data.id,
      menuSectionId: props.menuSectionId,
      name: data.name,
      description: data.description,
      price: parsePrice(data.price.toString()),
    };

    if (data.id) {
      await menuItemService
        .menuItemsPUT(data.id, postData)
        .then(() => console.log("PUT COMPLETE"));
    } else {
      await menuItemService
        .menuItemsPOST(postData)
        .then(() => {
          props.toggle(false);
          reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  const handleBlur = () => {
    if (!isFormDirty) {
      reset();
      console.log("bla", props.menuItem, defaultValues)
      props.toggle(false);
    }
  };

  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    setIsFormDirty(isDirty);
  }, [isDirty]);

  const formRef = useRef(null);
  useClickedOutside(formRef, handleBlur);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="admin-form flex flex-col gap-2"
      noValidate
      ref={formRef}
    >
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Naam"
          {...register("name", {
            required: "Naam is verplicht",
          })}
          autoFocus
          className={`input input-bordered w-2/3 max-w-xs focus:outline-none ${
            errors.name
              ? "focus:border-red-500 focus-within:border-red-500 border-red-500 focus:ring-rose-200"
              : ""
          }`}
        />
        <input
          type="text"
          placeholder="Prijs"
          {...register("price", {
            required: "Prijs is verplicht",
          })}
          className={`input input-bordered w-1/3 max-w-xs focus:outline-none ${
            errors.price
              ? "focus:border-red-500 focus-within:border-red-500 border-red-500 focus:ring-rose-200"
              : ""
          }`}
        />
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Beschrijving"
          {...register("description", {
            required: "Beschrijving is verplicht",
          })}
          className={`input input-bordered w-full focus:outline-none ${
            errors.description
              ? "focus:border-red-500 focus-within:border-red-500 border-red-500 focus:ring-rose-200"
              : ""
          }`}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => props.toggle(false)}
        >
          <IconBin />
        </button>
        <button className="btn btn-primary" type="submit">
          Opslaan
        </button>
      </div>
    </form>
  );
};
