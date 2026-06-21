import { useQuery } from "@tanstack/react-query";
import { getManufacturingAPI } from "../../api_adcsystem/endpoints/manufacturing/manufacturing";
import type { Product } from "../../api_adcsystem/model";

export const useProducts = (id?: Product["id"]) => {
  const manufacturing = getManufacturingAPI();
  // ---------- mutaciones ----------
  //------------ querys -------------
  //* listado de productos para la seccion de productos
  const productsQuery = useQuery({
    queryKey: ["productsList"],
    queryFn: manufacturing.manufacturingProductsList,
  });
  //* productos dependiendo de el id
  const orderProductQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => manufacturing.manufacturingProductsRetrieve(id!), //? usando "!" le garantzamos a ts que para esta funcion no sera null
    enabled: id !== undefined && id !== null,
  });
  return {
    //------------ querys ------------------
    productsQuery,
    orderProductQuery,
  };
};
