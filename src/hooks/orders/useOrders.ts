import { useQuery } from "@tanstack/react-query";
import { getManufacturingAPI } from "../../api_adcsystem/endpoints/manufacturing/manufacturing";

const manufacturingApi = getManufacturingAPI();

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
