import {FaHome} from "react-icons/fa"
import type { IconProps } from "../types"

export default function HomeIcon({onClick,className}:IconProps) {
    return (
        <FaHome
            className={`size-6 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
            onClick={onClick}
        />
    )
}
