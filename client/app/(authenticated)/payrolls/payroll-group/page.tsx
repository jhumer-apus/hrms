"use client";

import ActionButton from "@/components/actions/ActionButton";
import CreatePayrollGroup from "@/components/payrolls/payroll-group/CreatePayrollGroup";
import ViewPayrollGroup from "@/components/payrolls/payroll-group/ViewPayrollGroup";
import { useModalStore } from "@/store/modalStore";
import { ActionType } from "@/types";
import { Button, Card, Table, TableColumnsType } from "antd";
import { useState } from "react";

export default function PayrollGroup() {
    const {showCreatePayrollGroupModal, setModal} = useModalStore((state: any) => state)
    
    const [selectedRow, setSelectedRow] = useState<any>(
        {
            key: '',
            payroll_name: '',
            frequency: '',
            description: '',
        },
      )
      
    const clickRowAction = (record:any) => {
      setSelectedRow((curr:any) => record)
      setModal("showViewPayrollGroupModal", true)
    }

    const columns: TableColumnsType<any> = [
        {
            title: 'Payroll Name',
            dataIndex: 'payroll_name',
            key: 'payroll_name',
            fixed: 'left',
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            key: 'frequency',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_:any, record:any) => (
        //       <div className="flex gap-4">
        //         <ActionButton 
        //           actionType="view" 
        //           actionFn={() => clickRowAction(record, "view")} 
        //           title="View"
        //         />
        //         <ActionButton 
        //           actionType="edit" 
        //           actionFn={() => clickRowAction(record, "edit")} 
        //           title="Edit"
        //         />
        //         <ActionButton 
        //           actionType="delete" 
        //           actionFn={() => clickRowAction(record, "delete")} 
        //           title="Delete"
        //         />
        //       </div>
        //     ),
        // },
    ]

    const data = [
        {
            key: '1',
            payroll_name: 'Monthly',
            frequency: 'monthly',
            description: 'monthly',
        },
        {
            key: '2',
            payroll_name: 'Bi-Monthly',
            frequency: 'bi-monthly',
            description: 'bi-monthly',
        },
        {
            key: '3',
            payroll_name: 'Weekly',
            frequency: 'weekly',
            description: 'weekly',
        },
        {
            key: '4',
            payroll_name: 'Daily',
            frequency: 'daily',
            description: 'daily',
        },
      ];

    return (
        <div className="page-wrapper">
            <Card>

                <Button type="primary" onClick={() => setModal("showCreatePayrollGroupModal", true)}>Add Payroll Group</Button>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    pagination={
                        { 
                            position: ["topLeft", "bottomLeft"], 
                            total: 50,
                            pageSize: 5,
                            current:3

                        }
                    }
                    onRow={(record, rowIndex) => (
                      {
                        onClick: (e) => {clickRowAction(record)}
                      }
                    )}
                >
                    
                </Table>
            </Card>
            <CreatePayrollGroup />
            {/* <EditPayrollGroup payroll_group_id={selectedRow.key} /> */}
            <ViewPayrollGroup payroll_group_id={selectedRow?.key} />
        </div>
    )
}