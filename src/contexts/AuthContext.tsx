import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UserLoginRespose } from "../api/model";
import { getUser } from "../api/endpoints/user/user";

const USER_STORAGE_KEY = `user_system`;

const getUserFromStorage = () => {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);

  return userJson ? JSON.parse(userJson) : null;
};

export interface AuthContextI {
  user: User | null | undefined;
  isAuthenticated: boolean;
  // role: number|null|undefined;
  login: (data: UserLoginRespose) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextI | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(getUserFromStorage);
  const userApi = getUser();
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // funcion 1 Login: recibe el objeto "user" del backend (desde onSucces de useMutation)

  const login = (data: UserLoginRespose) => {
    setUser(data);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
  };

  // funcion2: logout limpia la sesion local y redirige


  const { mutate: logoutMutate } = useMutation({
    mutationFn: userApi.userLogoutCreate,
    onError: (error) => {
      console.log(error.message,'Error en Logout');
    },
    onSuccess: () => {
      setUser(null)
      localStorage.removeItem(USER_STORAGE_KEY)
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      navigate('/auth/login')
    },
  });

  const logout = () => {
    logoutMutate()
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      // role:number,
    }),
    [user, isAuthenticated],
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
