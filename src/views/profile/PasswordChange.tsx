import { UserService } from "@/api/generated";
import type { UserChangePasswordCreateRequest } from "@/api/generated/models/UserRegistrationRequest";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function PasswordChange() {
  //----------- formulario --------------------

  const initialValues = {
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserChangePasswordCreateRequest>({
    defaultValues: initialValues,
  });

  const password = watch('new_password')

  // ---------- actualizacion de contraseña --------------
  //? ------------segurlidad actualizar contraseña nueva ---------
  const {logout} = useAuth()

  const {mutate:mutateChangePassword} = useMutation({
    mutationFn:(payload:UserChangePasswordCreateRequest) => UserService.userUsersChangePasswordCreate(payload),
    onError:(error) => {
      toast.error(`hubo un error al actualizar la contraseña ${error.message}`)
    },
    onSuccess:(data) => {
      toast.success(data.message)
      reset()
      toast.info('por seguridad deberas iniciar sesion con tu nueva cotnraseña')
      setTimeout(() => {
        logout()
      }, 2000);
    }
  })

  const handleChangePassword = (payload:UserChangePasswordCreateRequest) => {
    mutateChangePassword(payload)
 }
  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Utiliza este formulario para cambiar tu password
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="old_password"
            >
              Password Actual
            </label>
            <input
              id="old_password"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3  border border-gray-200"
              {...register("old_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.old_password && (
              <ErrorMessage>{errors.old_password.message}</ErrorMessage>
            )}
          </div>
          
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="new_password"
            >Nuevo Password</label>
            <input
              id="new_password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3  border border-gray-200"
              {...register("new_password", {
                required: "El Nuevo Password es obligatorio",
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres'
                }
              })}
            />
            {errors.new_password && (
              <ErrorMessage>{errors.new_password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirm"
              className="text-sm uppercase font-bold"
            >Repetir Password</label>

            <input
              id="new_password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border border-gray-200"
              {...register("new_password_confirmation", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />
            {errors.new_password_confirmation && (
              <ErrorMessage>{errors.new_password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
