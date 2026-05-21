import type { MouseEventHandler } from "react"

interface LatheIconProps {
    onClick?: MouseEventHandler<HTMLImageElement> | undefined
    className?: string
}

export default function LatheIcon({ onClick, className }: LatheIconProps) {
    return (
        <img 
        className={`size-6 transition-transform ${className || ''}`} 
        src="/lathe-work-machine.svg"
        onClick={onClick} 
        alt="logo_Rivet" />
    )
}