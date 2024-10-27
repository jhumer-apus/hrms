"use client";

import AddEmployeeInfo from "@/components/employees/add-employees/AddEmployeeInfo";
import TableEmployees from "@/components/employees/TableEmployees"
import { useModalStore } from "@/store/modalStore";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Employees() {
    const router = useRouter()
    
    const {setModal} = useModalStore((state: any) => state)
    return (
        <div>
            <div className="max-w-[500px] mt-8 m-auto bg-white p-4 rounded-md shadow-xl">
                <Button type="primary" onClick={() => setModal("showAddEmployeeModal", true)}>Add New Employee</Button>
                <AddEmployeeInfo />
                <TableEmployees />
            </div>
        </div>
    )
}   