import { ComponentsTable } from "#components/Menu/components/ComponentsTable";
import { MaterialsTable } from "#components/Menu/components/MaterialsTable";
import SecctionDescription from "#components/ReusableComponents/SecctionDescription";
import { useComponents } from "#hooks/components/useComponents";
import { useState } from "react";

type TabType = "products" | "materials";

//TODO ---------- temporal para produccion
const componentsListProvExample = [
  {
    "id": 0,
    "name": "string",
    "code": "string",
    "description": "string",
    "component_type": 0,
    "component_type_name": "string",
    "processes": [
      {
        "id": 0,
        "process": 0,
        "process_name": "string",
        "order": 2147483647
      }
    ]
  },
  {
    "id": 0,
    "name": "string",
    "code": "string",
    "description": "string",
    "component_type": 0,
    "component_type_name": "string",
    "processes": [
      {
        "id": 0,
        "process": 0,
        "process_name": "string",
        "order": 2147483647
      }
    ]
  },
  {
    "id": 0,
    "name": "string",
    "code": "string",
    "description": "string",
    "component_type": 0,
    "component_type_name": "string",
    "processes": [
      {
        "id": 0,
        "process": 0,
        "process_name": "string",
        "order": 2147483647
      }
    ]
  }
]

const materialsList = [
  {
    id: 1,
    material_type_name: "1045",
    name: "barra Dia120 Largo2400",
    code: "BR12540",
    description: "Barra proveedor .....",
    material_type: 1,
  },
  {
    id: 1,
    material_type_name: "1045",
    name: "barra Dia200 Largo1500",
    code: "BR36500",
    description: "Barra proveedor .....",
    material_type: 2,
  },
];

export default function ComponentsView() {
  // manejo de pestañas
  const [activeTab, setActiveTab] = useState<TabType>("products");
  // busqueda de informacion
  const { getComponentsQuery } = useComponents([]);
  const componentsListProv = getComponentsQuery.data || [];

  // ----- manejo de informacion--------------
  // if (getComponentsQuery.isLoading)
  //   return (
  //     <p className="text-center py-20 text-gray-500">Cargando componentes...</p>
  //   );
  // if (getComponentsQuery.error)
  //   return (
  //     <p className="text-center py-20 text-red-500 font-bold">
  //       Error al cargar los datos.
  //     </p>
  //   );
  return (
    <div
      className="
                grid place-items-center
                sm:flex sm:justify-start sm:flex-col sm:items-baseline sm:ml-5
            "
    >
      <SecctionDescription
        header="Componentes"
        description="listado de componentes"
        buttonTag="agregar componente"
      />
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          {/* Pestaña: Productos */}
          <button
            onClick={() => setActiveTab("products")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap
              ${
                activeTab === "products"
                  ? "border-red-600 text-red-600 font-bold" // Estilo activa
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" // Estilo inactiva
              }
            `}
          >
            📦 Componentes
          </button>

          {/* Pestaña: Materiales */}
          <button
            onClick={() => setActiveTab("materials")}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap
              ${
                activeTab === "materials"
                  ? "border-red-600 text-red-600 font-bold" // Estilo activa
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" // Estilo inactiva
              }
            `}
          >
            ⚙️ Materiales
          </button>
        </nav>
      </div>
      <section
        className="
                grid overflow-y-hidden w-full pb-3
                "
      >
        {activeTab === "products" ? (
          componentsListProv.length ? (
            <ComponentsTable data={componentsListProv} />
          ) : (
            <p className="text-center py-20">No hay componentes disponibles.</p>
          )
        ) : materialsList.length ? (
          <MaterialsTable data={materialsList} />
        ) : (
          <p className="text-center py-20">No hay materiales disponibles.</p>
        )}
      </section>
      {/* {showAddModal && <AddComponentsModal />} */}
    </div>
  );
}
