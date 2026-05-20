import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "../../../tracepulse-fe/src/contexts/AuthContext";
import { useProfile } from "../../../tracepulse-fe/src/hooks/useProfile";
import SideBar from "../../../tracepulse-fe/src/components/frontComponents/SideBar";
import { useState } from "react";
import UserDropDown from "@/components/frontComponents/UserDropDown";

export default function AppLayout() {
  // apertura/cierre sidebar

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openCloseSideBar = () => setSideBarOpen((prev) => !prev);

  const containerClasses = `Container ${sideBarOpen ? "desktop-open" : ""}`;

  // hook para caducidad de sesion
  const { isLoading } = useProfile();

  // hook de autenticacion
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} replace />;
  }

  if (isAuthenticated && isLoading) {
    return <div>Cargando datos de usuario...</div>; // crear una forma mas amigable de ver que esta cargando los datos del usuario
  }

  if (isAuthenticated)
    return (
      <>
        <main className={`${containerClasses}`}>
          <SideBar
            sideBarOpen={sideBarOpen}
            openCloseSideBar={openCloseSideBar}
          />

          <section className="OutletAppLayout">
            <header
              className="
                hidden
                sm:flex justify-end p-4 bg-white border-b 
                "
            >
              <UserDropDown />
            </header>
            <Outlet />
          </section>
        </main>
        <Toaster richColors position="top-right" expand={true} />
      </>
    );
}
