import { PiGearSixDuotone } from "react-icons/pi";
import type { IconProps } from "../types"

export default function ConfigIcon({onClick,className}:IconProps) {
    return (
        <PiGearSixDuotone
            className={`size-6 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
            onClick={onClick}
        />
    )
}