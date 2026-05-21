import { Link } from "react-router-dom"
import type { MainMenuDataTypes } from "../../utils/staticData"

export type MenuItemDisplayProps = {
    item:MainMenuDataTypes;
}



const MenuItems = ({item}:MenuItemDisplayProps) => {
    
    const itemStatusClass = item.link ? '' : 'false';
    
    return (
        <Link
            to={item.link}
            // className={` bg-gray-300 hover:bg-gray-100 hover:scale-110 rounded-2xl shadow-2xl ${item?'menuItem':'menuItem false'}`}
            className={`
                bg-gray-300 hover:bg-gray-100 transition-all duration-300 flex flex-col relative cursor-pointer
                rounded-2xl shadow-2xl 
                menu-item-complex ${itemStatusClass}`}
        >
            <div
                className="menuItem-content absolute inset-px p-2.5 flex flex-col grow z-20"
            >
                <div
                    className="menuItem-image w-full h-35 flex items-center justify-center"
                >   
                    {item.icon}
                </div>
                <div
                    className=" menuItem-info-wrapper flex grow items-center justify-start"
                >
                    <div
                        className=" menuItem-info flex items-start gap-2.5"
                    >
                        <i className="fa-duotone fa-unicorn text-base h-5 leading-5"></i>
                        <div
                            className=" menu-item-info-title"
                        >
                            <h3
                                className=" capitalize font-extrabold text-[1.1em] leading-5"
                            >{item.title}</h3>
                            <h4
                                className=" first-letter:capitalize text-[0.85em] mt-2 font-medium"
                            >{item.subtitle}</h4>
                        </div>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default MenuItems