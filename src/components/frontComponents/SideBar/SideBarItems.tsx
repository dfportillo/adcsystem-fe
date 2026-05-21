import { NavLink } from "react-router-dom";
import type { LinksArraySideBarTypes } from "../../../utils/staticData";


export interface sideBarItemsProps extends LinksArraySideBarTypes  {
    sideBarOpen: boolean;
}

/** Componente para renderizado de Sidebar */

export const SideBarItems: React.FC<sideBarItemsProps> = ({ label, icon, to, sideBarOpen }) => {

    const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
        // Clase base y hover
        const baseClass = `mt-1 p-3 flex flex-row hover:bg-gray-400 w-full ${!sideBarOpen?"justify-center":""}`;
        
        // 2. Aplicar el estilo de resaltado si está activo
        const activeStyle = isActive 
            ? ' bg-gray-600 border-l-6 border-white font-bold' // Ejemplo de resaltado: fondo y borde
            : ''; 

        return `${baseClass} ${activeStyle}`;
    };

    return (
        <NavLink
            to={to}
            className={getLinkClassName}
        >
            {icon}
            <p
                className={` ml-3 text-lg font-black ${sideBarOpen ? '' : ' hidden'}`}
            >{label}</p>
        </NavLink>
    )

}