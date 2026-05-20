import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../../../tracepulse-fe/src/components/Logo";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen flex flex-col">
        {/* Cambiamos w-112.5 por un sistema responsivo:
                   - w-full: Ocupa el 100% en móviles.
                   - max-w-lg: Limita el ancho en pantallas grandes (512px).
                   - px-4: Margen interno de seguridad para que el form no toque los bordes del cel.
                */}
        <div className="py-10 lg:py-20 mx-auto w-full max-w-lg px-4 sm:px-6">
          <div className="mt-5 md:mt-10">
            <div className="grid place-items-center mb-10">
              {/* Ajustamos el tamaño del logo si es necesario dentro del componente Logo */}
              <Logo />
            </div>

            {/* Aquí se renderiza el LoginView u otros componentes de auth */}
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <Toaster richColors position="top-right" expand={true} />
    </>
  );
}
