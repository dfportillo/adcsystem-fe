import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import type { User } from "../../../api_adcsystem/model";
import { getUser } from "../../../api_adcsystem/endpoints/user/user";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const useProfile = () => {
  const { isAuthenticated, logout } = useAuth();
  const userApi = getUser()
  const queryProfile = useQuery<User | any>({
    queryKey:["profile"],
    queryFn:userApi.userMeRetrieve,
    //control de ejecucion
    enabled:isAuthenticated,
    refetchOnWindowFocus:false 
  });

  const {isError,error} = queryProfile
  if(isAxiosError(error)&&error.response){
    if(isError){
        if(error?.status === 401 || error.status ===403){
            toast.error('el Token expirado o invalidado , se forza cierre')
            logout()
        }
    }
  }

  return queryProfile
};
