import { PiNetworkLight } from "react-icons/pi";
import type { IconProps } from "../types";

export default function ProcessIcon({onClick,className}:IconProps) {
    return (
            <PiNetworkLight   
                className={`size-9 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
                onClick={onClick}
            />
        )
}
