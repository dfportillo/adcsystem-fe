import { useState } from "react"; // Importamos useState
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { UserLogin } from "../../api/model";
import { useUsers } from "../../hooks/api/Auth/useUsers";
import ErrorMessage from "../../components/ErrorMessage";

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false); // Estado para el password
  const { loginMutation } = useUsers();

  const navigate = useNavigate();

  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = (data: UserLogin) => {
  loginMutation.mutate(data)
   navigate('/')
  };

  return (
    <div className="w-full max-w-[95%] sm:max-w-md mx-auto flex flex-col items-center">
      {/* max-w-[95%] asegura que nunca toque los bordes físicos del celular */}

      <header className="px-2">
        <h1 className="text-3xl md:text-4xl font-black text-white text-center md:text-left leading-tight">
          Accede a tu Cuenta
        </h1>
        <p className="text-lg md:text-2xl font-light text-white mt-3 mb-6 text-center md:text-left">
          Ingresa tus datos para {""}
          <span className="text-red-500 font-bold">iniciar sesión</span>
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-5 p-5 md:p-10 bg-white rounded-2xl shadow-2xl w-90"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700 text-lg md:text-xl">
            Email
          </label>
          <input
            type="text"
            placeholder="usuario@empresa.cl"
            className="w-full p-3 border-gray-200 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
            {...register("email", {
              required: "El email del usuario es obligatorio",
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700 text-lg md:text-xl">
            Password
          </label>
          <div className="relative">
            {" "}
            {/* Contenedor relativo para posicionar el ojo */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Tu Password"
              className="w-full p-3 border-gray-200 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              {/* Icono simple con SVG si no tienes librería de iconos */}
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 w-full p-4 text-white font-bold text-xl rounded-xl transition-all shadow-lg active:scale-[0.98]"
        >
          Iniciar Sesión
        </button>
      </form>

      <nav className="mt-8 mb-10 flex flex-col space-y-4 px-2">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-300 text-sm md:text-base"
        >
          ¿No tienes cuenta?{" "}
          <span className="text-red-500 font-bold underline">Regístrate</span>
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-gray-300 text-sm md:text-base"
        >
          ¿Olvidaste tu contraseña?{" "}
          <span className="text-red-500 font-bold underline">Click aquí</span>
        </Link>
      </nav>
    </div>
  );
}
