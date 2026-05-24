import ProductsTable from "#components/Menu/Products/ProductsTable";
import SecctionDescription from "#components/ReusableComponents/SecctionDescription";
import { useProducts } from "#hooks/products/useProducts"

export default function ProductsView() {
    //------------ busqueda de informacion --------
   const {productsQuery} = useProducts()
   const productsList = productsQuery.data || []
   // manejo de informacion
   if (productsQuery.isLoading)
    return (
      <p className="text-center py-20 text-gray-500">Cargando los productos...</p>
    );
  if (productsQuery.error)
    return (
      <p className="text-center py-20 text-red-500 font-bold">
        Error al cargar los productos
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
            header="Productos"
            description="productos disponibles"
            buttonTag="agregar un nuevo producto"
          />
    
          <section
            className="
                    grid place-items-center overflow-y-hidden w-full pb-3
                    "
          >
            {productsList.length ? (
              // <ComponentsTable data={componentsList} />
              <ProductsTable data={productsList}/>
            ) : (
              <p className="text-center py-20">No hay componentes disponibles.</p>
            )}
          </section>
          {/* {showAddModal && <AddComponentsModal />} */}
        </div>
  )
}
