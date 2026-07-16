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
import ProcessView from "./views/menu/process/ProcessView";
import PersonalView from "./views/menu/personal/PersonalView";


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
            <Route path="/components" element={<ComponentsView />}  />
            <Route path="/products" element={<ProductsView />}  />
            <Route path="/orders" element={<OrdersView />}  />
            <Route path="/machines" element={<MachinesView />}  />
            <Route path="/process" element={<ProcessView />}  />
            <Route path="/personal" element={<PersonalView />}  />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
