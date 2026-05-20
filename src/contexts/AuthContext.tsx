import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { UserService, type UserListRequest } from "../api/generated";

const USER_STORAGE_KEY = "tracepulse_user";

const getUserFromStorage = () => {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);

  return userJson ? JSON.parse(userJson) : null;
};

export interface AuthContextI {
  user: ;
  isAuthenticated: ;
  role: ;
  login: ;
  logout: ;
}

export const AuthContext = createContext<AuthContextI | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserListRequest | null>(getUserFromStorage);

  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // funcion 1 Login: recibe el objeto "user" del backend (desde onSucces de useMutation)

  const login = () => {
    // setUser();
    // localStorage.setItem(USER_STORAGE_KEY, JSON.stringify());
  };

  // funcion2: logout limpia la sesion local y redirige

  const queryClient = useQueryClient();

  // const { mutate: logoutMutate } = useMutation({
  //   mutationFn: UserService.userAuthLogoutCreate,
  //   onError: (error) => {
  //     console.log(error.message)
  //   },
  //   onSuccess: (data) => {
  //     toast.success(data);
  //     queryClient.invalidateQueries({
  //       queryKey: ["profile"],
  //     });
  //   },
  // });

  const logout = () => {
    // //cuando se tenga la llamada a POST de /user/auth/logout de ser necesaria
    // setUser(null);
    // localStorage.removeItem(USER_STORAGE_KEY);
    // logoutMutate();
    // navigate("auth/login");
  };


  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      role: user?.role,
    }),
    [user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// custom hook para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    // proveemos errores si alguien quiere usar useAuth fuera del provider
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
