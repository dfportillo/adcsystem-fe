import SecctionDescription from "#components/ReusableComponents/SecctionDescription";
import { useWorkstations } from "#hooks/workstations/useWorkStations";

export default function MachinesView() {

  // --------- estado visual de cada 
  const {getWorkstations} = useWorkstations()

  console.log(getWorkstations.data)

  const workstationsList = getWorkstations.data?.map(w => w.name)


  return (
    <div
      className="
        grid place-items-center
        lg:pr-10
        sm:flex sm:justify-start sm:flex-col sm:items-baseline sm:ml-5
      "
    >
      <SecctionDescription
        header="maquinas"
        description="maquinas en planta"
        buttonTag="agregar maquina"
      />

      {/* Sección principal con Grid. Se agregaron estilos para asegurar que el borde no se visualice */}
      <section
        className="

            grid grid-cols-1 
            gap-6 w-full pb-3 px-3
            md:grid-cols-4
            lg:px-0

      
      "
      >
        {/* Columna Izquierda: Ocupa 1/4 */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-2">Filtros / Tipos</h3>
          <div
            className=" flex flex-col gap-2 mt-2"
          >{workstationsList?.map(ws => (
          <div
            key={ws}
            className="
            p-3 
            border border-gray-200 
            rounded-md 
            bg-gray-50/50 
            hover:bg-gray-50 
            transition-colors
            cursor-pointer"
          >{ws}</div>))}</div>
        </div>

        {/* Columna Derecha: Ocupa 3/4. Se ocultó el borde derecho */}
        <div className="md:col-span-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100 ">
          <h3 className="font-semibold text-gray-700 mb-2">
            Listado de Máquinas
          </h3>
          {/* Contenido del listado aquí */}
        </div>
      </section>
    </div>
  );
}
