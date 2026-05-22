import { useMutation } from "@tanstack/react-query";
//----------------------------------------------------------------------------------------
import { getUser } from "../../../api/endpoints/user/user";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const userApi = getUser()
// -------------- uso de contexto ------------------

export const useUsers = () => {
  const {login:loginContext} =useAuth()
  const navigate = useNavigate()

  

  //-------------- mutaciones ---------------------------
  const loginMutation = useMutation({
    mutationFn:userApi.userLoginCreate,
    onSuccess:(data) => {
      loginContext(data)
      // guardar tokens
      localStorage.setItem('refresh',data.tokens.refresh)
      localStorage.setItem('access',data.tokens.access)
      navigate('/')
    },
    onError:(error) => {
      console.error('Error en loginMutation',error.message)
    }
  })

 

  //----------------- return -------------------
  return{
    //-------- mutations -------------------
    loginMutation
  }
};
