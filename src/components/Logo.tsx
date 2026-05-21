import type { MouseEventHandler } from "react"

interface LogoProps {
    onClick?: MouseEventHandler<HTMLImageElement> | undefined
    className?: string
}

export default function Logo({ onClick, className }: LogoProps) {
    return (
        <img 
        className={`size-10 transition-transform duration-300 ease-in-out hover:scale-115 stroke-2 ${className || ''}`} 
        src="/trace.svg"
        onClick={onClick} 
        alt="logo_Rivet" />
    )
}
