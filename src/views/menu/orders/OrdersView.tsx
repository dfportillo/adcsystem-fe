import OrdersCards from "#components/Menu/Orders/OrdersCards";
import OrdersPriorityChart from "#components/Menu/Orders/OrdersPriorityChart";
import SearchInput from "#components/search/SearchInput";
import { useOrders } from "#hooks/orders/useOrders";
import { useSearch } from "#hooks/search/useSearch";
import { useSearchURL } from "#hooks/search/useSearchURL";
import { useQuery } from "@tanstack/react-query";
import { getManufacturing } from "../../../api/endpoints/manufacturing/manufacturing";
import AddNewElementIcon from "../../../icons/ActionIcons/AddNewElementIcon";

export default function OrdersView() {
  // -------- lectura de URL -----------------------------------

  // const { isOpen: addProduct, openModal: handleAddNewProduct } =
  //   useModalUrl("addProduct");
  // const { isOpen: editProduct } = useModalUrl("editProduct");

  //------ busqueda de informacion ------------------
  const { ordersQuery } = useOrders();
  const orderList = ordersQuery.data;
  console.log(orderList);
  // --------- filtrado de OP -----------------------------------
  //? -------- termino a buscar desde la URL ---------------
  const { searchTerm, setSearchTerm } = useSearchURL("q");

  //? --------- hook para filtrado de busqueda----------------
  const { filteredList: filteredOders } = useSearch({
    list: orderList,
    searchParams: ["code", "product_name"],
    searchItem: searchTerm,
  });

  const handleNewOrder = () => {
    //TODO agregar accion de nueva orden de produccion
    console.log("nueva orden agregada ");
  };
  const manufacturinApi = getManufacturing()

  const getProcessExecutions = useQuery({
    queryKey:['exceutions'],
    queryFn:() => manufacturinApi.manufacturingExecutionsList()
  })

  console.log('ejecuciones',getProcessExecutions.data)

  return (
    <div
      className="
                  grid place-items-center 
                  sm:flex sm:justify-start sm:flex-col sm:items-baseline sm:ml-5
              "
    >
      <div
        className=" flex w-[40%] h-auto mt-2"
      >
        
        <OrdersPriorityChart
          orders={orderList}
          isLoading={ordersQuery.isLoading}
        />
      </div>
      <div
        className="flex flex-row items-center gap-2 mt-3"
      >
        <AddNewElementIcon 
          className=" size-7"
          description="agrega una nueva orden de produccion"
        />
        <SearchInput 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeHolder="Buscar orden de produccion"
        />
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
          {filteredOders.length > 0 ? (
            <ul role="list" className=" flex flex-col">
              {filteredOders?.map((order, index) => (
                <OrdersCards
                  key={order.id}
                  order={order}
                  isFirst={index === 0}
                  isLast={index === filteredOders.length - 1}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No se encontraron órdenes de producción.
            </p>
          )}
          {/** Renderizado de las ordenes de produccion */}
        </div>
      </section>
      {/* {addProduct && <AddProductModal />} */}
      {/* {editProduct && <EditProductModal />} */}
    </div>
  );
}
