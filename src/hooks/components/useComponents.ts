import { useQuery } from "@tanstack/react-query"
import { getManufacturing } from "../../api/endpoints/manufacturing/manufacturing"

const manufacturingAPI = getManufacturing()
export const useComponents = () => {
    
    // ----- mutations ------
    // ----- querys ----------
    const getComponentsQuery = useQuery({
        queryKey:['components'],
        queryFn:manufacturingAPI.manufacturingComponentsList
    })
    
    return{
        getComponentsQuery
    }
}