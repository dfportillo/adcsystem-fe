import { useQuery } from "@tanstack/react-query"
import { TracepulseService } from "../../../../../tracepulse-fe/src/api/generated"
import { ComponentsTable } from "../../../../../tracepulse-fe/src/components/Menu/Components/ComponentsTable"
import AddComponentsModal from "../../../../../tracepulse-fe/src/components/Menu/Components/AddComponentsModal"
import { useModalUrl } from "@/hooks/useURLtoModal"


export default function ComponentsView() {

    // ------------- lectura Url --------------------------
    const {isOpen:showAddModal,openModal:openAddModal} = useModalUrl('addComponent')

    

    // const addComponent = !!queryParams.get('addComponent') // boolean true existe/false no existe 

    // const handleNewComponentModal = () => {
    //     navigate(`${location.pathname}?addComponent=true`)
    // }


    // ------------ busqueda de informacion -------------------
    const { data: dataComponents, isLoading, isError } = useQuery({
        queryKey: ['components'],
        queryFn: () => TracepulseService.tracepulseApiComponentsList(),
        retry: false
    })



    //--------------- manejo de informacion -------------------------------
    if (isLoading) return <p className="text-center py-20 text-gray-500">Cargando componentes...</p>;

    if (isError) return <p className="text-center py-20 text-red-500 font-bold">Error al cargar los datos.</p>;

    const components = dataComponents?.results || []



    if (dataComponents?.results) return (
        <div
            
            className="
                grid place-items-center
                sm:flex sm:justify-start sm:flex-col sm:items-baseline
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
                <h1
                    className=" 
                text-xl font-black first-letter:capitalize
                sm:text-3xl
                ">Componentes </h1>
                <p className=" text-xl font-light first-letter:capitalize text-gray-500 mt-3">un listado de los componentes disponibles en planta</p>

                <button
                    className=" bg-red-500 rounded-xl hover:bg-red-600 py-2 px-2 text-white text-lg font-bold cursor-pointer transition-colors mt-2"
                    onClick={() => openAddModal()}
                >
                    Agregar componente
                </button>
            </div>

            <section
                className="
                grid place-items-center overflow-y-hidden w-full pb-3
                "
            >
                {
                    components.length ? (
                        <ComponentsTable
                            data={components} />
                    ) : (
                        <p className="text-center py-20">No hay componentes disponibles.

                        </p>
                    )
                }
            </section>
            {
                showAddModal && <AddComponentsModal />
            }
        </div>

    )
}
