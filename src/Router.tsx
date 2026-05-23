import { BrowserRouter, Route, Routes } from "react-router-dom";
//------------------------LOGIN---------------------------------------------
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import { AuthContextProvider } from "./contexts/AuthContext";
import AdcSystemDashboardView from "./views/AdcSystemDashboardView";
import MenuView from "./views/menu/MenuView";
import OrdersView from "./views/menu/orders/OrdersView";
import ComponentsView from "./views/menu/components/ComponentsView";
//------------------APP------------------------------------------------
export default function Router() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/auth/register" element={<RegisterView />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/" element={<AdcSystemDashboardView />} index />
            <Route path="/menu" element={<MenuView />}  />
            <Route path="/menu/orders" element={<OrdersView />}  />
            <Route path="/menu/components" element={<ComponentsView />}  />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
