import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"



export const useSearchURL = (paramKey:string='Search') => {
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search)

    const searchTerm = queryParams.get(paramKey) || "";

    const setSearchTerm = useCallback((value:string) => {
        if(value){
            queryParams.set(paramKey,value)
        }else{
            queryParams.delete(paramKey) 
        }

        navigate(`${location.pathname}?${queryParams.toString()}`,{replace:true})
    },[location.pathname,navigate,paramKey])

    return{
        searchTerm,
        setSearchTerm
    }
}