import { CiCircleChevRight } from "react-icons/ci";
import type { IconProps } from "../types";

export default function RightIcon({onClick, className}:IconProps) {
    return (
        <CiCircleChevRight 
            className={`size-8 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
            onClick={onClick}>
        </CiCircleChevRight>
        
    )
}
