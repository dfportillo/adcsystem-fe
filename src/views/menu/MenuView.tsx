import MenuItems from "#components/Menu/MenuItems"
import { MainMenuData } from "../../utils/staticData"


export default function MenuView() {
    return (
        <>
            <div
                className="relative z-10 flex items-center justify-center bg-transparent min-h-screen h-auto scroll-container overflow-hidden"
            >
                <svg
                    className="cuadros-menu absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                    viewBox="0 0 492 317"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.40"
                        d="M526 1L-34 1.00005M526 27.25L-34 27.2501M526 53.5L-34 53.5001M526 79.75L-34 79.7501M526 106L-34 106M526 132.25L-34 132.25M526 158.5L-34 158.5M526 184.75L-34 184.75M526 211L-34 211M526 237.25L-34 237.25M526 263.5L-34 263.5M526 289.75L-34 289.75M526 316L-34 316M-29.625 1V316M-3.375 1V316M22.875 1V316M49.125 1V316M75.375 1V316M101.625 1V316M127.875 1V316M154.125 1V316M180.375 1V316M206.625 1V316M232.875 1V316M259.125 1V316M285.375 1V316M311.625 1V316M337.875 1V316M364.125 1V316M390.375 1V316M416.625 1V316M442.875 1V316M469.125 1V316M495.375 1V316M521.625 1V316"
                        stroke="url(#paint0_radial_932_3040)"
                        stroke-width="0.5"
                    />
                    <defs>
                        <radialGradient
                            id="paint0_radial_932_3040"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(246 158.5) rotate(90) scale(150 200)"
                        >
                            <stop offset="0.343728" stop-color="white" />
                            <stop offset="1" stop-opacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
                <div
                    id="MenuItems"
                    className=" flex flex-wrap justify-items-center gap-2 max-w-229 w-[calc(100%-20px)] py-5"
                >
                    {
                        MainMenuData.map((item, index) => {
                            return (
                                <MenuItems
                                    item={item}
                                    key={index}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}