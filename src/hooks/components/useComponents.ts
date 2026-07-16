import { useQueries, useQuery } from "@tanstack/react-query";
import { getManufacturingAPI } from "../../api_adcsystem/endpoints/manufacturing/manufacturing";
import type { Component } from "../../api_adcsystem/model/component";

const manufacturingAPI = getManufacturingAPI();
export const useComponents = (ids?: Component["id"][]) => {
  // ----- mutations ------
  // ----- querys ----------
  const getComponentsQuery = useQuery({
    queryKey: ["components"],
    queryFn: manufacturingAPI.manufacturingComponentsList,
    retry: false,
  });
  const getComponents = useQueries({
    queries: ids!.map((id) => ({
      queryKey: ["post", id],
      queryFn: () => manufacturingAPI.manufacturingComponentsRetrieve(id),
    })),
    combine: (res) => {
      return {
        data: res.map((r) => r.data),
        pending: res.some((r) => r.isPending),
      };
    },
  });
  return {
    getComponentsQuery,
    getComponents,
  };
};
