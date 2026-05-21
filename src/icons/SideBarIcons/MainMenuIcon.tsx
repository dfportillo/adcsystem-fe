import { CgMenuGridO } from "react-icons/cg";
import type { IconProps } from "../types";

export default function MainMenuIcon({onClick,className}:IconProps) {
    return (
            <CgMenuGridO
                className={`size-6 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`}
                onClick={onClick}
            />
        )
}
