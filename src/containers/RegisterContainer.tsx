import { useForm } from "react-hook-form";
import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { AccountService } from "../service/AccountService";

type RegisterSchemaModel = {
  username: string;
  password: string;
};

export const RegisterContainer = () => {
  const apiUrl = useApiEndpointContext();
  const service = new AccountService(apiUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchemaModel>({
    values: undefined,
  });

  const onSubmit = async (data: RegisterSchemaModel) => {
    await service
      .register(data.username, data.password)
      .then(() => {
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="admin-form flex flex-col gap-2"
      noValidate
    >
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username is verplicht",
          })}
          autoFocus
          className={`input input-bordered w-2/3 max-w-xs focus:outline-none ${
            errors.username
              ? "focus:border-red-500 focus-within:border-red-500 border-red-500 focus:ring-rose-200"
              : ""
          }`}
        />
        <input
          type="text"
          placeholder="Password"
          {...register("password", {
            required: "Wachtwoord is verplicht",
          })}
          className={`input input-bordered w-1/3 max-w-xs focus:outline-none ${
            errors.password
              ? "focus:border-red-500 focus-within:border-red-500 border-red-500 focus:ring-rose-200"
              : ""
          }`}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Register
      </button>
    </form>
  );
};
