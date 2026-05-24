import { ComponentsTable } from "#components/Menu/components/ComponentsTable";
import SecctionDescription from "#components/ReusableComponents/SecctionDescription";
import { useComponents } from "#hooks/components/useComponents";

export default function ComponentsView() {
  // busqueda de informacion
  const { getComponentsQuery } = useComponents();
  const componentsList = getComponentsQuery.data || [];

  // ----- manejo de informacion--------------
  if (getComponentsQuery.isLoading)
    return (
      <p className="text-center py-20 text-gray-500">Cargando componentes...</p>
    );
  if (getComponentsQuery.error)
    return (
      <p className="text-center py-20 text-red-500 font-bold">
        Error al cargar los datos.
      </p>
    );
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

      <section
        className="
                grid place-items-center overflow-y-hidden w-full pb-3
                "
      >
        {componentsList.length ? (
          <ComponentsTable data={componentsList} />
        ) : (
          <p className="text-center py-20">No hay componentes disponibles.</p>
        )}
      </section>
      {/* {showAddModal && <AddComponentsModal />} */}
    </div>
  );
}
