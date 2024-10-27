"use client"

import Maintenance from "@/components/layout/Maintenance";
import Payslip from "@/components/payrolls/payslips/ViewPayslip";
import PayslipDataList from "@/components/payrolls/payslips/PayslipDataList";
import { Button } from "antd";

export default function Payslips(){

    return (
        <div className="p-4">
            <PayslipDataList />
        </div>
    )
}