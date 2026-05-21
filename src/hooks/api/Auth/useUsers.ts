import { useMutation } from "@tanstack/react-query";
//----------------------------------------------------------------------------------------
import { getUser } from "../../../api/endpoints/user/user";
import { useAuth } from "../../../contexts/AuthContext";


const userApi = getUser()
// -------------- uso de contexto ------------------

export const useUsers = () => {
  const {login:loginContext} =useAuth()

  

  //-------------- mutaciones ---------------------------
  const loginMutation = useMutation({
    mutationFn:userApi.userLoginCreate,
    onSuccess:(data) => {
      loginContext(data)
    },
    onError:(error) => {
      console.error('Error en la autenticacion ',error.message)
    }
  })

 

  //----------------- return -------------------
  return{
    //-------- mutations -------------------
    loginMutation
  }
};
