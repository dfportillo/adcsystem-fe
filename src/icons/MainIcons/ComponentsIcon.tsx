import { GrTechnology } from "react-icons/gr";
import type { IconProps } from "../types";

export default function ComponentsIcon({onClick,className}:IconProps) {
    return (
            <GrTechnology  
                className={`size-18 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
                onClick={onClick}
            />
        )
}
