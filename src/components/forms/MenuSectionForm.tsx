import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
// import { MenuItemDomainModel } from "../../domain/MenuItemDomainModel";
import IconBin from "../../icons/IconBin";
import { useClickedOutside } from "../../hooks/useClickedOutside";
import { MenuSectionsService } from "../../service/MenuSectionsService";

type MenuSectionFormProps = {
  menuId: number;
  toggle: (value: boolean) => void;
};

type MenuSectionSchemaModel = {
  id: number;
  name: string;
};

export const MenuSectionForm = (props: MenuSectionFormProps) => {
  const [toggle] = useState<boolean>(true);
  const apiUrl = useApiEndpointContext();
  const menuSectionService = new MenuSectionsService(apiUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<MenuSectionSchemaModel>({
    mode: "onChange",
    defaultValues: {
      id: 0,
      name: "",
    },
  });

  // const handleToggle = () => {
  //   setToggle(false);
  // };

  const onSubmit = async (data: MenuSectionSchemaModel) => {
    if (data.id) {
      await menuSectionService
        .updateMenuSection(props.menuId, data.id, data.name)
        .then(() => console.log("PUT COMPLETE"));
    } else {
      await menuSectionService
        .addMenuSection(props.menuId, data.name)
        .then(() => {
          reset();
          props.toggle(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [isFormDirty, setIsFormDirty] = useState(false);

  const handleBlur = () => {
    if (!isFormDirty) {
      props.toggle(false);
    }
  };

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
      <div className="">
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
      </div>
      {toggle && (
        <div className="flex flex-row">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.toggle(false);
            }}
          >
            <IconBin />
          </button>
          <button className="btn btn-primary" type="submit">
            Opslaan
          </button>
        </div>
      )}
    </form>
  );
};
