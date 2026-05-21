import { GiHexagonalNut } from "react-icons/gi";
import type { IconProps } from "../types";

export default function ComponentIcon({onClick,className}:IconProps) {
    return (
        <GiHexagonalNut 
            className={`size-18 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
            onClick={onClick}
        />
    )
}