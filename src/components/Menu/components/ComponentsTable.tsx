import { useState } from "react";
//-------------------------------------------------------------------
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
//----------------------------------------------------------------------------------------
import type { Component } from "../../../api/model";

export type ComponentsTableProps = {
  data: Component[];
};

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    tdClassName?: string;
  }
}

const columHelperComponent = createColumnHelper<Component>(); //helper para la creacion de tablas usando typescript
const columns = [
  columHelperComponent.accessor("name", {
    header: () => "Componente",
    cell: (info) => (
      <span className="font-semibold text-gray-800 pl-1">
        {info.getValue()}
      </span>
    ),
    enableSorting: true,
  }),
  columHelperComponent.accessor("code", {
    header: () => "Codigo",
    cell: (info) => (
      <span className="font-semibold text-gray-800 p-2 text-center">
        {info.getValue()}
      </span>
    ),
    enableSorting: true,
  }),

  columHelperComponent.accessor("component_type_name", {
    header: () => "Comprado/Fabricado",
    cell: (info) => {
      const type = info.getValue();
      const color =
        type === "purchased"
          ? "bg-blue-100 text-blue-800"
          : "bg-orange-100 text-orange-800";
      return (
        <span
          className={`px-2 p-1 text-xs leading-5 font-semibold rounded-full capitalize ${color}`}
        >
          {type}
        </span>
      );
    },
    enableSorting: true,
    meta: {
      tdClassName: "h-full text-center",
    },
  }),
  columHelperComponent.accessor("description", {
    header: () => "Descripcion",
    cell: (info) => <p className="text-sm line-clamp-2">{info.getValue()}</p>, // Limita la descripción
    enableSorting: false,
  }),
];

export const ComponentsTable = ({ data }: ComponentsTableProps) => {
  // estado para el manejo del sorting
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(), // piedra angular de tanstack table
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
                  className=" px-6 py-3 text-center text-sm font-medium text-gray-500 capitalize 
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
                  <div className=" flex items-center space-x-2">
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
          No se encontraron componentes.
        </div>
      )}
    </div>
  );
};
