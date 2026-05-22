import { useMemo } from "react";

export type useSearchProps<T> = {
  // T es un tipo necesario para nuestro hook generico
  list: T[] | undefined;
  searchParams: (keyof T)[];
  searchItem: string;
};

// la "," sirve para decir a typescript que T es un tipo y no una etiqueta HTML
/**
 * 
 * @param list listtado de productos a buscar
 * @param searchParams array de parametros de busqueda
 * @param searchItem un string que se esta buscando
 * @returns 
 */

export const useSearch = <T>({
  list,
  searchParams,
  searchItem,
}: useSearchProps<T>) => {
  const filteredList = useMemo(() => {
    if (!list) return [];

    const target = searchItem.trim().toLocaleLowerCase();
    if (!target) return list;

    return list.filter((item) => {
      return searchParams.some((key) => {
        const value = item[key];
        if (value !== null && value !== undefined) {
          return String(value).toLocaleLowerCase().includes(target);
        }
        return false;
      });
    });
  }, [searchItem, list, searchParams]);

  return {
    filteredList,
  };
};