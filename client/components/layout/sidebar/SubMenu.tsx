import { SubRoutesTypes } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    subRoutes:SubRoutesTypes[]
    menuIndex:MenuIndex
    currentMenuIndex: MenuIndex
}
type MenuIndex = number | null 

export default function SubRMenu(props:Props){

    const { subRoutes, menuIndex, currentMenuIndex} = props

    const pathname = usePathname()

    const isActiveRoute = (routeLink: string) => {
        return pathname.startsWith(routeLink);
    };

    return (
        <div className={`transition-all duration-300 ${menuIndex == currentMenuIndex? 'max-h-96': 'max-h-0'} overflow-hidden`}>
            <ul>
                {
                    Array.isArray(subRoutes) 
                        && subRoutes.map((sub: any, index: number) => 
                            <li className={`transition-all duration-500 hover:bg-blue-100 ${isActiveRoute(sub.link)? 'bg-blue-100':''} flex justify-between `} key={index}>
                                <Link className="flex gap-4 pl-20 py-4 w-full" href={sub.link}>
                                    <span>{sub.icon}</span>
                                    <div className={`transition-all overflow-hidden`}>
                                        {sub.name}
                                    </div>
                                </Link>
                            </li>
                        ) 
                        
                }
            </ul>
        </div>
    )
}