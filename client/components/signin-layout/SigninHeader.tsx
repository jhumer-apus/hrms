
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SigninHeader() {

    const pathname = usePathname()

    const routes = [
        {
            link: "/about",
            label: "ABOUT"
        },
        {
            link: "/login",
            label: "SIGN IN"
        }
    ];

    return (
        <div className="bg-purple-900 py-4 sticky top-0 z-10">
            <nav>
                <ul className="flex gap-4 justify-center">
                    {routes.map((item:any, index:number) => (
                        <li key={index}>
                            <Link className={`${pathname === item.link ? 'text-white ' : 'text-slate-300 hover:text-white'} font-semibold`} href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>
    )
}