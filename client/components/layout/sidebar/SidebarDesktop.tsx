import Link from "next/link"
import Image from 'next/image';
import BitverseLogo from '@/assets/bitverse-logo.png';
import { IoClose } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactElement, useState } from "react";
import { RoutesTypes, SubRoutesTypes } from "@/types";
import {BiChevronDown, BiChevronLeft, BiChevronUp} from "react-icons/bi";
import SubMenu from "./SubMenu";

interface Props {
    routes: RoutesTypes[]
}
export default function SidebarDesktop(props:Props) {

    const {routes} = props

    const [currentMenuIndex, setCurrentMenuIndex] = useState<number | null>(null);
    
    const pathname = usePathname()
    
    const isActiveRoute = (routeLink: string) => {
        return pathname.startsWith(routeLink);
    };

    const handleMenuIndex = (index:number | null) => {
        if (currentMenuIndex == index) 
            setCurrentMenuIndex(currIndex => null)
        else 
            setCurrentMenuIndex((currIndex) => index)
    }

    return (
        <div className={`h-screen w-[280px] shadow-2xl z-20`}>

            <aside className={`h-full w-full  bg-white`}>
                <nav>
                    <div className="flex h-16 items-center">
                        <Link href="">
                            <Image
                                src={BitverseLogo}
                                alt="Bitverse Logo"
                                className={`w-32 pl-8`}
                            />
                        </Link>
                        
                    </div>

                    <hr></hr>

                    <ul className="">
                        {routes.map((route: any, index: number) => (
                            <Fragment key={index}>
                                <li 
                                    className={`${(!Array.isArray(route.sub) || route.sub.length == 0) && isActiveRoute(route.link)? 'bg-blue-100':''} flex justify-between items-center cursor-pointer transition-all hover:bg-blue-100`} 
                                    key={index} 
                                    onClick={() => handleMenuIndex(index)}
                                >
                                    <Link 
                                        className="flex gap-4 px-8 py-4 w-full" 
                                        href={route.link}
                                    >
                                        <span>{route.icon}</span>
                                        <div className={`transition-all overflow-hidden`}>
                                            {route.name}
                                        </div>
                                    </Link>
                                    
                                    {
                                        route.sub && route.sub.length > 0 
                                        && (currentMenuIndex == index 
                                        ?   <div className="px-4">
                                                <BiChevronDown className={`transition-all text-2xl`}/> 
                                            </div>
                                        :   <div className="px-4">
                                                <BiChevronLeft  className={`transition-all text-2xl`}/>
                                            </div>
                                        )
                                    }
                                </li>
                                <SubMenu 
                                    subRoutes={route.sub} 
                                    menuIndex={index} 
                                    currentMenuIndex={currentMenuIndex} 
                                />
                            </Fragment>
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    )
}