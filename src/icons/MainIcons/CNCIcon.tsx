import type { MouseEventHandler } from "react"

interface CNCIconProps {
    onClick?: MouseEventHandler<HTMLImageElement> | undefined
    className?: string
}

export default function CNCIcon({ onClick, className }: CNCIconProps) {
    return (
        <img 
        className={`
            size-20  
            transition-transform 
            duration-300 ease-in-out 
            hover:scale-110 
            -mt-2 -mb-2 -ml-2 -mr-2 
            ${className || ''}`} 
        src="/CNC.svg"
        onClick={onClick} 
        alt="logo_Rivet" />
    )
}