import Maintenance from "@/components/layout/Maintenance";
import { Card } from "antd";
import Link from "next/link";

export default function Categories () {
    
    const categories = [
        {
            title: "Companies",
            description: "Manage companies",
            link: "/admin/categories/companies"
        },
        {
            title: "Positions",
            description: "Manage positions",
            link: "/admin/categories/positions"
        }
    ]
    
    const redirectTo = () => {

    }
  
    return (
        <div className="p-4 flex flex-wrap gap-4">
            {categories.map((category, index) => (
                <Link href={category.link} key={index}>
                    <Card title={category.title} bordered={false} className="w-56 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                        <p>{category.description}</p>
                    </Card>
                </Link>
            ))}
        </div>
    )
}