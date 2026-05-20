import { UserService } from "@/api/generated";
import AddUserModal from "@/components/Menu/Personal/AddUserModal";
import PersonalDataTable from "@/components/Menu/Personal/PersonalDataTable/PersonalDataTable";
import { useModalUrl } from "@/hooks/useURLtoModal";
import { useQuery } from "@tanstack/react-query";

export default function PersonalView() {
  // ---  lectura URL---------------------

  //? agregar un usuario
  const { isOpen: addUser, openModal: handleAddNewUser } =
    useModalUrl("addUser");
  //? editar un usuario
  // const { isOpen: editUser } = useModalUrl("editUser");

  // ----- busqueda de informacion ---------
  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.userUsersList(),
    retry: false,
  });

  const usersList = usersData?.results;

  return (
    <div
      className="
          grid place-items-center 
          sm:flex sm:justify-start sm:flex-col sm:items-baseline sm:ml-5"
    >
      <div
        role="banner"
        className="
            w-[92%] lg:w-2/5 md:w-2/3
            bg-gray-200
            px-4 py-3 mx-2 my-2
            rounded-4xl md:rounded-4xl
            lg:p-4 lg:m-5"
      >
        <div className=" flex items-center gap-4">
          <h1
            className=" 
                    text-xl font-black first-letter:capitalize
                    sm:text-3xl"
          >
            personal
          </h1>
        </div>

        <p className=" text-xl font-light first-letter:capitalize text-gray-500 mt-3">
          personal en planta
        </p>

        <button
          className=" bg-red-500 rounded-xl first-letter:capitalize hover:bg-red-600 py-2 px-2 text-white text-lg font-bold cursor-pointer transition-colors mt-2"
          onClick={() => handleAddNewUser()}
        >
          agregar a un nuevo colaborador
        </button>
      </div>
      <section className="grid place-items-center w-full pb-3">
        <div
          className="
                        mt-2
                        w-full
                        px-5
                        md:pr-10 md:px-0
                        lg:pr-20 lg:px-0           
                      "
        >
          {/** Renderizado de la tabla de personal */}
          {/* <PersonalTable usersList={usersList} /> */}
          <PersonalDataTable usersList={usersList}/>
        </div>
      </section>
      {addUser && <AddUserModal />}
      {/* {editUser && <EditUserModal />} */}
    </div>
  );
}
