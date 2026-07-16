import { GrCluster } from "react-icons/gr";
import type { IconProps } from "../types";

export default function ProductsIcon({ onClick, className }: IconProps) {
  return (
    <GrCluster
      className={`size-6 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ""}`}
      onClick={onClick}
    />
  );
}
