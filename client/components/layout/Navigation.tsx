"use client"

import { capitalize } from "@/utils/format-text"
import { Breadcrumb, Typography } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

export default function Navigation() {
    const {Title} = Typography

    const path = usePathname()

    const routeList = path.split("/")
    const currentRouteTitle = routeList[routeList.length -1]
    const currentRouteTitleArr = currentRouteTitle.split(/[-_]/);

    const cleanRouteTitle = currentRouteTitleArr.map(name => capitalize(name)).join(" ")


    const items = routeList.map((route:string,index:number) => {
        const url = `${routeList.slice(0, index+1).join('/')}`
        const routeSplit = route.split(/[-_]/);
        const cleanRouteName = routeSplit.map(name => capitalize(name)).join(" ")

        return {
            title: <Link href={url}>{cleanRouteName}</Link>
        }
    })
    
    return (
        <div className="p-4">
            <Breadcrumb items={items} separator=">"/>
            <Title level={3}>{cleanRouteTitle}</Title>
        </div>
    )
}