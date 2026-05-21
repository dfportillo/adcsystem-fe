import { CiSaveDown2 } from "react-icons/ci";
import type { IconProps } from "../types";

export default function SaveIcon({onClick,className}:IconProps) {
    return (
            <CiSaveDown2  
                className={`transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
                onClick={onClick}
            />
        )
}
