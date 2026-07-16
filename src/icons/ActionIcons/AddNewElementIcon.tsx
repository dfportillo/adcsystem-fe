import { IoMdAddCircleOutline } from "react-icons/io";
import type { IconProps } from "../types";

interface AddNewElementIconProps extends IconProps{
    description:string
}

export default function AddNewElementIcon({ onClick, className,description }: AddNewElementIconProps) {
  return (
    <>
      <IoMdAddCircleOutline
        className={`transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ""}`}
        onClick={onClick}
      />
      <h3>{description}</h3>
    </>
  );
}
