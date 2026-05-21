import { FaRegCircleUser } from "react-icons/fa6";
import type { IconProps } from "../types";

export default function ProfileIcon({onClick, className}:IconProps) {
    return (
        <FaRegCircleUser 
            className={`size-6 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
            onClick={onClick}
        />
    )
}
