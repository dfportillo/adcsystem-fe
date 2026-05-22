import { useQuery } from "@tanstack/react-query"
import { getManufacturing } from "../../api/endpoints/manufacturing/manufacturing"
import type { Product } from "../../api/model"

export const useProducts = (id:Product['id']) => {
    const manufacturingAPI = getManufacturing()
    // ---------- mutaciones ----------
    //------------ querys -------------
    const orderProductsQuery = useQuery({
        queryKey:["product",id],
        queryFn:() => manufacturingAPI.manufacturingProductsRetrieve(id),
        enabled:!!id
    })
    return{
        //------------ querys ------------------
        orderProductsQuery
    }
}