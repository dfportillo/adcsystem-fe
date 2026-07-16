import { useMutation, useQuery } from "@tanstack/react-query";
import { getManufacturingAPI } from "../../api_adcsystem/endpoints/manufacturing/manufacturing";
import type { ProductionOrder } from "../../api/model";

type bodyDataType = {
    confirm:boolean
}

const manufacturingApi = getManufacturingAPI();

export const useOrders = (id?:ProductionOrder['id'],bodyData?:bodyDataType) => {
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
    const productionOrderRealese = useMutation({
        mutationFn:() => manufacturingApi.manufacturingProductionReleaseCreate(id!,bodyData!),
        onError:(error) => {
            console.log('error al liberar la orden',error.message)
        },
        onSuccess:() => {
            console.log('orden liberada correctamente')
        }
    })

    return{
        // -------- querys -------------
        ordersQuery,
        getOrder,
        //------- mutations -------------
        productionOrderRealese
    }

};
