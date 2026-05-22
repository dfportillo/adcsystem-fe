import type { MouseEventHandler } from "react"

interface PolinIconProps {
    onClick?: MouseEventHandler<HTMLImageElement> | undefined
    className?: string
}

export default function PolinICon({ onClick, className }: PolinIconProps) {
    return (
        <img 
        className={`
            size-20  
            transition-transform 
            duration-300 ease-in-out 
            hover:scale-110 
            -mt-2 -mb-2 -ml-2 -mr-2 
            ${className || ''}`} 
        src="/polin.svg"
        onClick={onClick} 
        alt="logo_ordenes_produccion" />
    )
}