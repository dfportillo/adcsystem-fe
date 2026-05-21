import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { useAuth } from '../contexts/AuthContext'
import { LinksHamburMenuArray } from '../utils/staticData'
import { HamburMenuItems } from './frontComponents/SideBar/HamburMenuItems'


export default function MenuHambur() {


    

    const{logout} = useAuth()

    return (
        <Popover className="relative">
            <PopoverButton 
                className="MenuHambur gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg mb-2 bg-gray-500 transition-transform duration-300 ease-in-out hover:scale-80 stroke-2 hover:bg-gray-200"
                >
                <Bars3Icon className='w-8 h-8 text-gray-200 hover:text-gray-500' />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className=" fixed right-0 left-20 z-50 mt-5 w-56 ">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-gray-200 p-4 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5 ">
                        <p className='text-center'>Hola: </p>
                        {
                            LinksHamburMenuArray.map((item) => {
                                return (
                                    <HamburMenuItems 
                                        key={item.label}
                                        {...item}
                                    />
                                )
                            })
                        }
                        <button
                            className='flex items-center p-2 rounded-md text-black text-sm hover:bg-gray-400 cursor-pointer w-full'
                            type='button'
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}