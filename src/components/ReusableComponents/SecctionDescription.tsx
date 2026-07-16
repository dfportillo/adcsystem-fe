/** 
 * @param header titulo de la descripcion
 * @param descripcion descripcion de lo que se hace en la seccion 
 * @param buttonTag contenido del boton
 * @param buttonAction accion que realziara el boton
*/

import { type PropsWithChildren } from "react";

interface SecctionDescriptionProps extends PropsWithChildren{
    header:string
    description:string
    buttonTag:string
    // Acciones en el display button
    buttonAction?:() => void 
}

export default function SecctionDescription({
header,
description,
buttonTag,
buttonAction,
children
}:SecctionDescriptionProps) {
  return (
    <div
      role="banner"
      className="
                w-[92%] lg:w-2/5 
                px-4 py-3 mx-2 my-2
                rounded-4xl 
                md:rounded-4xl
                md:w-2/3
                bg-gray-200
                lg:p-4
                lg:m-5
                "
    >
        <h1
          className=" 
                    text-xl font-black first-letter:capitalize
                    sm:text-3xl
                    "
        >
          {header}
        </h1>
      <p className=" text-xl font-light first-letter:capitalize text-gray-500 mt-3">
        {description}
      </p>
      <button
        className=" bg-red-500 rounded-xl first-letter:capitalize hover:bg-red-600 py-2 px-2 text-white text-lg font-bold cursor-pointer transition-colors mt-2"
        onClick={buttonAction}
      >
        {buttonTag}
      </button>
      {children}
    </div>
  );
}
