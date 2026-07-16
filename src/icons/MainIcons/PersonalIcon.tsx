import { GrUserWorker } from "react-icons/gr";
import type { IconProps } from "../types";

export default function PersonalIcon({onClick,className}:IconProps) {
    return (
            <GrUserWorker  
                className={`size-8 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
                onClick={onClick}
            />
        )
}
