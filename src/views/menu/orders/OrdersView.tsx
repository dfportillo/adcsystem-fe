import OrdersCards from "#components/Menu/Orders/OrdersCards"
import SecctionDescription from "#components/ReusableComponents/SecctionDescription"
import SearchInput from "#components/search/SearchInput"
import { useOrders } from "#hooks/orders/useOrders"
import { useSearch } from "#hooks/search/useSearch"
import { useSearchURL } from "#hooks/search/useSearchURL"

export default function OrdersView() {
   // -------- lectura de URL -----------------------------------

  // const { isOpen: addProduct, openModal: handleAddNewProduct } =
  //   useModalUrl("addProduct");
  // const { isOpen: editProduct } = useModalUrl("editProduct");

  //------ busqueda de informacion ------------------
  const {ordersQuery} =useOrders()
  const orderList = ordersQuery.data;
  // --------- filtrado de OP -----------------------------------
  //? -------- termino a buscar desde la URL ---------------
  const {searchTerm,setSearchTerm} = useSearchURL('q')

  //? --------- hook para filtrado de busqueda----------------
  const {filteredList:filteredOders} = useSearch({
    list:orderList,
    searchParams:['code','product_name'],
    searchItem:searchTerm
  })

  const handleNewOrder = () => {
    //TODO agregar accion de nueva orden de produccion 
    console.log('nueva orden agregada ')
  }

  return (
    <div
      className="
                  grid place-items-center 
                  sm:flex sm:justify-start sm:flex-col sm:items-baseline sm:ml-5
              "
    >
      <SecctionDescription 
        header={"ordenes de produccion"}
        description="ordenes de produccion disponibles en planta"
        buttonTag="agregar nueva orden de produccion"
        buttonAction={handleNewOrder}
      >
        <SearchInput 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeHolder="Buscar Ordenes de produccion"
        />
      </SecctionDescription>
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
          {filteredOders.length>0?(
            <ul
              role="list"
              className=" flex flex-col"
            >
              {filteredOders?.map((order,index) => (
                <OrdersCards 
                  key={order.id}
                  order={order} 
                  isFirst={index === 0}
                  isLast={index === filteredOders.length-1}
                  />
              ))}
            </ul>):(<p className="text-center text-gray-500 mt-10">No se encontraron órdenes de producción.</p>)}
          {/** Renderizado de las ordenes de produccion */}
        </div>
      </section>
      {/* {addProduct && <AddProductModal />} */}
      {/* {editProduct && <EditProductModal />} */}
    </div>
  )
}
