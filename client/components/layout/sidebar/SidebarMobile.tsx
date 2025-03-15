"use client"

import Link from "next/link"
import Image from 'next/image';
import BitverseLogo from '@/assets/bitverse-logo.png';
import { IoClose } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "antd";
import { BiChevronDown, BiChevronLeft, BiChevronUp } from "react-icons/bi";
import { createPortal } from "react-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import SubMenu from "./SubMenu";
import { useMenuStore } from "@/store/menuStore";

export default function SidebarMobile (props:any) {
    const {routes} = props

    const {isShow, setIsShow} = useMenuStore((state) => state.sidebar)

    const [isClient, setIsClient] = useState(false);
    const [currentMenuIndex, setCurrentMenuIndex] = useState<number | null>(null);
    
    const router = useRouter()
    const pathname = usePathname()
    const sideBarRef = useRef(null)
    
    const isActiveRoute = (routeLink: string) => {
        return pathname.startsWith(routeLink);
    };

    const handleSideBar = (event:any) => {
        if (sideBarRef.current == event.target) {
            // Clicked outside sidebar, close sidebar
            setIsShow(false);
        }
    };

    // WATCH IF COMPONENT IS RENDERED
    useEffect(() => {
        if (typeof document !== "undefined") {
            setIsClient(true);
        }
    }, []);


    const handleMenuIndex = (index:number | null) => {
        if (currentMenuIndex == index) setCurrentMenuIndex(currIndex => null)
        else setCurrentMenuIndex((currIndex) => index)
    }
    

    return (
            <Fragment>
                {isClient && createPortal(
                    <div 
                        ref={sideBarRef} 
                        onClick={handleSideBar}
                        className={`h-screen top-0 fixed z-20 shadow-2xl transition-all ${isShow ? 'w-full' : 'w-0' } bg-slate-400 bg-opacity-30 overflow-hidden`}>
                    {/* Sidebar content for larger screens */}
                        <aside className={`h-full w-[280px] bg-white`}>
                            <nav>
                                <div className="flex pl-8 justify-between h-16 items-center">
                                    <Link href="">
                                        <Image
                                            src={BitverseLogo}
                                            alt="Sample Logo"
                                            className={`transition-all w-20`}
                                        />
                                    </Link>

                                    <Button type="link" onClick={() => setIsShow(!isShow)}>
                                        <BiChevronLeft
                                            className='text-3xl text-slate-500 hover:text-blue-600'
                                        />
                                    </Button>
                                </div>
                                <hr></hr>
                                <ul className="">
                                    {routes.map((route: any, index: number) => (
                                        <Fragment key={index}>
                                            <li 
                                                className={`${(!Array.isArray(route.sub) || route.sub.length == 0) && isActiveRoute(route.link)? 'bg-blue-100' :''} flex justify-between items-center cursor-pointer transition-all hover:bg-blue-100`} 
                                                key={index}
                                                onClick={() => handleMenuIndex(index)}
                                            >
                                                <Link 
                                                    className="flex gap-4 px-8 py-4 w-full" 
                                                    href={route.link} 
                                                    onClick={() => (!route.sub || route.sub.length == 0) && setIsShow(false)}>
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
                    </div>,document.body)
                }
            </Fragment>
            

        
    )
}