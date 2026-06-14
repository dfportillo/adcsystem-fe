import { useQuery } from "@tanstack/react-query"
import { getManufacturingAPI } from "../../api_adcsystem/endpoints/manufacturing/manufacturing"

const manufacturingAPI = getManufacturingAPI()
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