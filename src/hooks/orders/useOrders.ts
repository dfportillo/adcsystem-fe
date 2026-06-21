import { useQuery } from "@tanstack/react-query";
import { getManufacturingAPI } from "../../api_adcsystem/endpoints/manufacturing/manufacturing";
import type { ProductionOrder } from "../../api/model";

const manufacturingApi = getManufacturingAPI();

export const useOrders = (id?:ProductionOrder['id']) => {
    //---------------- mutaciones -------------
    
    //---------------- querys -----------------
    const ordersQuery = useQuery({
        queryKey:['orders'],
        queryFn:manufacturingApi.manufacturingOrdersList
    })
    
    const getOrder = useQuery({
        queryKey:['order',id],
        queryFn:() => manufacturingApi.manufacturingProductionOrdersRetrieve2(id!),
        enabled:id!==undefined && id!==null,
    })

    return{
        // -------- querys -------------
        ordersQuery,
        getOrder
    }

};
