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
   console.log(productsQuery.data) 
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
            {productsList.length ? (
              // <ComponentsTable data={componentsList} />
              <p>aqui estan los productos</p>
            ) : (
              <p className="text-center py-20">No hay componentes disponibles.</p>
            )}
          </section>
          {/* {showAddModal && <AddComponentsModal />} */}
        </div>
  )
}
