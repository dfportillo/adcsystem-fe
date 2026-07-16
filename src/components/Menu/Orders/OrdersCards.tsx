import { Fragment } from "react/jsx-runtime";
//------------------------------------------------------------
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#components/ui/accordion";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import type { Component, ProductionOrder } from "../../../api_adcsystem/model";
import { useProducts } from "#hooks/products/useProducts";
import { useComponents } from "#hooks/components/useComponents";
import { useEffect, useState } from "react";
import { useOrders } from "#hooks/orders/useOrders";

export type OrdersCardProps = {
  order: ProductionOrder;
  isFirst?: boolean;
  isLast?: boolean;
};

export default function OrdersCards({
  order,
  isFirst,
  isLast,
}: OrdersCardProps) {

    const {orderProductQuery} = useProducts(order.product)
    const [orderComponentsIds,setOrderComponentsIds] = useState<Component['id'][]>([])
    const [bodyConfirm,setBodyConfirm] = useState({confirm:true})

    const {productionOrderRealese}=useOrders(order.id,bodyConfirm)

    const {getComponents} = useComponents(orderComponentsIds)
    // manejo de los componentes que tiene la orden
    const handleGetOrderComponents = () => {
      if(!orderProductQuery.data) return
      const ids = orderProductQuery.data.components.map(c => c.id)
      setOrderComponentsIds(ids)
    }

    // llegada de los componentes al momento de hacer click
    useEffect(()=>{
      if(getComponents.data){
        console.log(`la OP ${order.code} tiene los siguientes productos relacionados`,getComponents.data)
      }
    },[getComponents.data,order.code])

    // realese product
    const handleReleaseOrder = () => {
      console.log('click para liberar orden')
      console.log(bodyConfirm)
      productionOrderRealese.mutate()

    }

  return (
    <li
      className={` flex flex-col px-3 border border-gray-300 ${isFirst ? " rounded-t-lg" : isLast ? " rounded-b-lg" : ""} ${isFirst && isLast && " rounded-t-lg rounded-b-lg"}`}
    >
      <Accordion
        type="single" // NOTA: Si necesitas múltiples OPs abiertas a la vez, cambia esto a type="multiple"
        collapsible
        className=" pr-1.5"
      >
        <AccordionItem value={`OP - ${order.code} `}>
          <div className=" flex justify-between items-center">
            <AccordionTrigger className="hover:cursor-pointer justify-between items-center gap-1">
              <h1 className="text-gray-600 cursor-pointer hover:underline text-2xl font-bold">
                OP {order.code}
              </h1>
            </AccordionTrigger>
            <button className=" border-2 bg-blue-500 rounded-3xl w-xl hover:cursor-pointer"
            onClick={handleReleaseOrder}
            > liberar orden </button>
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 hover:cursor-pointer">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-7 w-7" aria-hidden="true" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem>
                    <button
                      className="
                    block px-3 py-1 text-sm hover:cursor-pointer hover:underline leading-6 text-gray-900"
                      onClick={() =>
                        console.log("editando orden de produccion")
                      }
                    >
                      Editar Orden de Produccion
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      className="
                      block px-3 py-1 text-sm hover:cursor-pointer hover:underline leading-6 text-red-500"
                      onClick={() =>
                        console.log("eliminando orden de produccion")
                      }
                    >
                      Eliminar Orden de Produccion
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>

          <AccordionContent>
            <h3 
                className=" first-letter:capitalize font-semibold"
                onClick={handleGetOrderComponents}
                >
                {order.product_name}
            </h3>
            <h3 className=" first-letter:capitalize font-semibold">
              status: {order.status_name}
            </h3>
              <h3 className=" first-letter:capitalize font-semibold">
                prioridad: {order.priority_name}
              </h3>
              <p>{order.notes}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
