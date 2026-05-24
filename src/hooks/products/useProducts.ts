import { useQuery } from "@tanstack/react-query"
import { getManufacturing } from "../../api/endpoints/manufacturing/manufacturing"
import type { Product } from "../../api/model"

export const useProducts = (id?:Product['id']) => {
    const manufacturingAPI = getManufacturing()
    // ---------- mutaciones ----------
    //------------ querys -------------
    //* listado de productos para la seccion de productos
    const productsQuery = useQuery({
        queryKey:['productsList'],
        queryFn:manufacturingAPI.manufacturingProductsList
    })
    //* productos dependiendo de el id 
    const orderProductsQuery = useQuery({
        queryKey:["product",id],
        queryFn:() => manufacturingAPI.manufacturingProductsRetrieve(id!),//? usando "!" le garantzamos a ts que para esta funcion no sera null
        enabled:!!id
    })
    return{
        //------------ querys ------------------
        productsQuery,
        orderProductsQuery
    }
}