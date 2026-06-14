import { useQuery } from "@tanstack/react-query";
import { getManufacturing } from "../../api/endpoints/manufacturing/manufacturing";


const manufacturing = getManufacturing()

export const useWorkstations = () => {
    //------- mutations -----------
    //---------querys ------------
    const getWorkstations = useQuery({
        queryKey:['workstations'],
        queryFn:manufacturing.manufacturingProductionWorkstationsList
    })

    return{
        getWorkstations
    }
}