import { TracepulseService } from "@/api/generated";
import { AddProductModal } from "@/components/Menu/Products/AddProductModal";
import EditProductModal from "@/components/Menu/Products/EditProductModal";
import ProductCard from "@/components/Menu/Products/ProductCard";
import SearchInput from "@/components/search/SearchInput";
import { useSearch } from "@/hooks/search/useSearch";
import { useSearchURL } from "@/hooks/search/useSearchURL";
import { useModalUrl } from "@/hooks/useURLtoModal";
import { useQuery } from "@tanstack/react-query";

export default function ProductsView() {
  // -------- lectura de URL -----------------------------------

  const { isOpen: addProduct, openModal: handleAddNewProduct } =
    useModalUrl("addProduct");
  const { isOpen: editProduct } = useModalUrl("editProduct");

  //------ busqueda de informacion ------------------

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () => TracepulseService.tracepulseApiProductsList(),
  });
  const productsList = productsData?.results;
  
  // --------- filtrado de OP -----------------------------------
  //? -------- termino a buscar desde la URL ---------------
  const {searchTerm,setSearchTerm} = useSearchURL('q')

  //? --------- hook para filtrado de busqueda----------------
  const {filteredList:filteredProducts} = useSearch({
    list:productsList,
    searchParams:['op_value','name'],
    searchItem:searchTerm
  })


  return (
    <div
      className="
                  grid place-items-center 
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
            ordenes de produccion
          </h1>
        </div>

        <p className=" text-xl font-light first-letter:capitalize text-gray-500 mt-3">
          ordenes de produccion disponibles en planta
        </p>

        <button
          className=" bg-red-500 rounded-xl first-letter:capitalize hover:bg-red-600 py-2 px-2 text-white text-lg font-bold cursor-pointer transition-colors mt-2"
          onClick={() => handleAddNewProduct()}
        >
          agregar nueva orden de produccion
        </button>

        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeHolder="Buscar Ordenes de produccion"
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
          {filteredProducts.length>0?(<ul
              role="list"
              className=" flex flex-col"
            >
              {filteredProducts?.map((product,index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isFirst={index === 0}
                  isLast={index === filteredProducts.length-1}
                  />
              ))}
            </ul>):(<p className="text-center text-gray-500 mt-10">No se encontraron órdenes de producción.</p>)}
          {/** Renderizado de las ordenes de produccion */}
        </div>
      </section>
      {addProduct && <AddProductModal />}
      {editProduct && <EditProductModal />}
    </div>
  );
}
