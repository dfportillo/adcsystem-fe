import { NavLink } from "react-router-dom"
import type { LinksHamburMenuArrayTypes } from "../../../utils/staticData"


export const HamburMenuItems: React.FC<LinksHamburMenuArrayTypes> = ({ to, label }) => {
    return (
        <NavLink
            to={to}
            className='flex items-center p-2 rounded-md text-black text-sm hover:bg-gray-400 '
        >{label}</NavLink>
    )
}