import { useQuery } from "@tanstack/react-query";
import { getManufacturing } from "../../api/endpoints/manufacturing/manufacturing";

const manufacturingApi = getManufacturing();

export const useOrders = () => {
    //---------------- mutaciones -------------
    
    //---------------- querys -----------------
    const ordersQuery = useQuery({
        queryKey:['orders'],
        queryFn:manufacturingApi.manufacturingOrdersList
    })
    

    return{
        // -------- querys -------------
        ordersQuery
    }

};
