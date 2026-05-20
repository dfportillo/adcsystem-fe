import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import { AuthContextProvider } from "./contexts/AuthContext";
import AppLayout from "./layouts/AppLayout";
import TracepulceDashboardView from "./views/TracepulceDashboardView";
import ProfileView from "./views/profile/ProfileView";
import ComponentsView from "./views/Menu/Components/ComponentsView";
import PersonalView from "./views/Menu/PersonalView";
import ProcessView from "./views/Menu/ProcessView";
import MenuView from "./views/Menu/MenuView";
import ProductsView from "./views/Menu/ProductsView";
import ProfileLayout from "./layouts/ProfileLayout";
import PasswordChange from "./views/profile/PasswordChange";
import MachinesView from "./views/Menu/Machines/MachinesView";

export default function Router() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/auth/login" element={<LoginView />} />
                        <Route path="/auth/register" element={<RegisterView />} />
                    </Route>
                    {/* <Route element={<AppLayout />}>
                        <Route path="/" element={<TracepulceDashboardView />} index/>
                        <Route path="/menu" element={<MenuView/>} />
                        <Route path="/menu/components" element={<ComponentsView />} />
                        <Route path="/menu/machines" element={<MachinesView />} />
                        <Route path="/menu/process" element={<ProcessView />} />
                        <Route path="/menu/products" element={<ProductsView />} />
                        <Route path="/menu/personal" element={<PersonalView />} />
                        <Route element={<ProfileLayout />}>
                            <Route path="/profile" element={<ProfileView/>} />
                            <Route path="/profile/password" element={<PasswordChange/>} />
                        </Route>
                    </Route> */}
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    )
}