import { TracepulseService, type Process } from "@/api/generated";
import AddProcessModal from "@/components/Menu/Process/AddProcessModal";
import EditProcessModal from "@/components/Menu/Process/EditProcessModal";
import ProcessCard from "@/components/Menu/Process/ProcessCard";
import { useModalUrl } from "@/hooks/useURLtoModal";
import { useQuery } from "@tanstack/react-query";

export default function ProcessView() {

  // ----------- lectura de URL ------------------------------

  const {isOpen:addProcess,openModal:handleNewProcessModal} = useModalUrl('addProcess')
  const {isOpen:editProcess} = useModalUrl('editProcess')
  //----- busqueda de informacion ------------------
  const { data: dataProcesses } = useQuery({
    queryKey: ["processes"],
    queryFn: () => TracepulseService.tracepulseApiProcessesList(),
    retry:false
  });

  const processes = dataProcesses?.results;

  return (
    <div
      className="
                grid place-items-center 
                sm:flex sm:justify-start sm:flex-col sm:items-baseline sm:ml-5 sm:mr-8
                "
    >
      <div
        role="banner"
        className="
            w-[92%] lg:w-2/5 md:w-2/3
                    bg-gray-200
                    px-4 py-3 mx-2 my-2
                    rounded-4xl md:rounded-4xl
                    lg:p-4
                    lg:m-5
                    "
      >
        <div className=" flex items-center gap-4">
          <h1
            className=" 
                    text-xl font-black first-letter:capitalize
                    sm:text-3xl
                    "
          >
            procesos
          </h1>
        </div>

        <p className=" text-xl font-light first-letter:capitalize text-gray-500 mt-3">
          listado de productos 
        </p>

        <button 
        className=" bg-red-500 rounded-xl hover:bg-red-600 py-2 px-2 text-white text-lg font-bold cursor-pointer first-letter:capitalize transition-colors mt-2"
        onClick={() => handleNewProcessModal()}
        >
          agregar proceso
        </button>
      </div>

  <div
    className="
              mt-2
              grid gap-2
              lg:grid-cols-4
              sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-3"
  >
{processes && processes.length>0?(
  processes.map((process:Process) => (
  <ProcessCard 
    key={process.id}
    process={process}
  />
))):(<p>Cargando procesos...</p>)}
        </div>
  {addProcess &&<AddProcessModal />}
  {editProcess &&<EditProcessModal /> }
    </div>
  );
}
