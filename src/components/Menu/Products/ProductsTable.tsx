import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
//-----------------------------------------------------------------
import type { Product } from "../../../api/model";
import { useState } from "react";

type ProductsTableProps = {
  data: Product[];
};

const columHelperProduct = createColumnHelper<Product>();
const columns = [
  columHelperProduct.accessor("name", {
    header: () => "Producto",
    cell: (info) => (
      <span className="font-semibold text-gray-800 pl-1">
        {info.getValue()}
      </span>
    ),
    enableColumnFilter: true,
  }),
  columHelperProduct.accessor("code", {
    header: () => "Codigo de producto",
    cell: (info) => (
      <span className="font-semibold text-gray-800 pl-1">
        {info.getValue()}
      </span>
    ),
  }),
  columHelperProduct.accessor("components", {
    header: () => "Codigo de producto",
    cell: (info) => (
      <span className="font-semibold text-gray-800 pl-1">
        {
          <ul>
            {info.getValue().map((component) => (
              <li className=" list-disc">{component.component_name}</li>
            ))}
          </ul>
        }
      </span>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columHelperProduct.accessor("description", {
    header: () => "descripcion",
    cell: (info) => (
      <span className=" font-normal text-gray-800 pl-1">{info.getValue()}</span>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
];

export default function ProductsTable({ data }: ProductsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // estado individual para almacenar filtros de cada columna
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel:getFilteredRowModel()
  });
  return (
    <div className=" bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200 w-7/8 mb">
      <table className=" min-w-full divide-y divide-gray-200">
        <thead className=" bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="
                     text-start
                    px-6 py-3 text-sm font-medium text-gray-500 capitalize 
                    tracking-wider
                    hover:bg-gray-100 transition-colors 
                    "
                  // manejo de sorting y cursor
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                >
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {/**Icono de sorting */}
                    {{
                      asc: <span className=" ml-1">🔼</span>,
                      desc: <span className="ml-1">🔽</span>,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>

                  {header.column.getCanFilter() ? (
                    <input
                      type="text"
                      // Lee el valor actual del filtro de esta columna específica
                      value={(header.column.getFilterValue() ?? "") as string}
                      // Al escribir, actualiza el filtro únicamente para esta columna
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                      placeholder={`Filtrar...`}
                      className="p-1.5 text-xs font-normal text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-300 focus:outline-none"
                      // Evita que al hacer clic en el input para escribir se dispare el ordenamiento (sorting) de la columna
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    // Espacio en blanco si la columna tiene deshabilitado el filtro
                    <div className="h-7"></div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/** Datos en la Tabla */}
        <tbody className=" bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className=" hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => {
                const columnMeta = cell.column.columnDef.meta;
                const customTdClass = columnMeta?.tdClassName || "";

                return (
                  <td key={cell.id} className={` p-1 ${customTdClass}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* en caso de no haber datos */}

      {table.getRowModel().rows.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se Encontraron los productos
        </div>
      )}
    </div>
  );
}
