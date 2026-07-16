import { IoMdCloseCircle } from "react-icons/io";
import type { IconProps } from "../types";

export default function DeleteIcon({ onClick, className }: IconProps) {
  return (
    <IoMdCloseCircle
      className={`transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ""}`}
      onClick={onClick}
    />
  );
}
