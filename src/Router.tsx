import { BrowserRouter, Route, Routes } from "react-router-dom";
//------------------------LOGIN---------------------------------------------
import { AuthContextProvider } from "./contexts/AuthContext";
import RegisterView from "./views/auth/RegisterView";
import LoginView from "./views/auth/LoginView";
import AuthLayout from "./layouts/AuthLayout";
//------------------APP------------------------------------------------
import AppLayout from "./layouts/AppLayout";
import AdcSystemDashboardView from "./views/AdcSystemDashboardView";
import MenuView from "./views/menu/MenuView";
import OrdersView from "./views/menu/orders/OrdersView";
import ComponentsView from "./views/menu/components/ComponentsView";
import ProductsView from "./views/menu/products/ProductsView";
import MachinesView from "./views/menu/Machines/MachinesView";


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
            <Route path="/menu/components" element={<ComponentsView />}  />
            <Route path="/menu/products" element={<ProductsView />}  />
            <Route path="/menu/orders" element={<OrdersView />}  />
            <Route path="/menu/machines" element={<MachinesView />}  />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
