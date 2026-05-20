import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddMachineModal from "@/components/Menu/Machines/AddMachineModal";
import { useMachineLocalStateStore } from "@/store/useMachineLocalStateStore";
import { toast } from "sonner";
import SaveIcon from "@/icons/ActionIcons/SaveIcon";
import EditMachineModal from "@/components/Menu/Machines/EditMachineModal";
import { useModalUrl } from "@/hooks/useURLtoModal";
import { TracepulseService } from "@/api/generated";
import MachinesCard from "@/components/Menu/Machines/MachinesCard";

export default function MachinesView() {

  const {isOpen:addMachine,openModal:handleNewMachineModal} = useModalUrl("addMachine")
  const {isOpen:editMachine} = useModalUrl('editMachine')

  // ----------- busqueda de informacion ------------
  const queryClient = useQueryClient();
  const { data: dataMachines } = useQuery({
    queryKey: ["machines"],
    queryFn: () => TracepulseService.tracepulseApiMachinesList(),
    retry: false,
  });

  // --------- obteniendo informacion para guardado general zustand------

  const pendingChanges = useMachineLocalStateStore((s) => s.pendingChanges);
  const clearAllPendingChanges = useMachineLocalStateStore(
    (s) => s.clearChanges
  );

  //------- mutacion general ---------------------------------------------

  const { mutate: saveAll } = useMutation({
    mutationFn: async () => {
      const promises = Object.entries(pendingChanges).map(([id, state]) =>
        TracepulseService.tracepulseApiMachinesPartialUpdate(Number(id), {
          state,
        })
      );

      return Promise.all(promises);
    },
    onSuccess: () => {
      toast.success(
        "todos los estados de las maquinas actualizados correctamente"
      );
      clearAllPendingChanges();
      queryClient.invalidateQueries({ queryKey: ["machines"] });
    },
  });

  const machines = dataMachines?.results;

  return (
    <div
      className="
                grid place-items-center
                lg:mr-10  
                sm:flex sm:justify-start sm:flex-col sm:items-baseline sm:ml-5
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
            Maquinas
          </h1>
          {Object.keys(pendingChanges).length > 0 && (
            <SaveIcon
              className=" size-7 cursor-pointer"
              onClick={() => saveAll()}
            />
          )}
        </div>

        <p className=" text-xl font-light first-letter:capitalize text-gray-500 mt-3">
          Maquinas disponibles en planta
        </p>

        <button
          className=" bg-red-500 rounded-xl first-letter:capitalize hover:bg-red-600 py-2 px-2 text-white text-lg font-bold cursor-pointer transition-colors mt-2"
          onClick={() => handleNewMachineModal()}
        >
          agregar maquina
        </button>
      </div>
      <section
        className="grid place-items-center w-full pb-3"
      >
        {
          <div
            className="
                    mt-2
                    grid gap-2
                    lg:grid-cols-4
                    sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-3"
          >
            {machines?.map((machine) => (
              <MachinesCard key={machine.id} machine={machine} />
            ))}
          </div>
        }
      </section>
      {addMachine && <AddMachineModal />}
      {editMachine && <EditMachineModal />}
    </div>
  );
}
