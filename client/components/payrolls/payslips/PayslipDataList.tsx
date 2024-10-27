import CardList from "@/components/CardList";
import { Table, TableColumnsType } from "antd";
import { Fragment, useEffect, useState } from "react";
import ViewPayslip from "./ViewPayslip";
import { useModalStore } from "@/store/modalStore";

export default function PayslipDataList() {

    const {setModal} = useModalStore(state => state)
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const [data, setData] = useState<any>([
        {
            cut_off: "DATE"
        }
    ])

    const columns: TableColumnsType<any> = [
        
        {
            title: 'Cut Off Period',
            dataIndex: 'cut_off',
            key: 'cut_off',
        },
        
    ]

    useEffect(() => {
        fetchPayslipsList()
    },[])

    const onRowCLick = (row:any) => {
        console.log(row)
        setSelectedRow((curr:any) => row)
        setModal("showPayslipModal", true)
    }

    const fetchPayslipsList = () => {
        return
    }
    return (
        <Fragment>
            <div className="hidden md:block">
                <Table 
                    columns={columns}
                    dataSource={data}
                    onRow={(row, index) => (
                        {
                          onClick: (e) => onRowCLick(row)
                        }
                    )}
                />
            </div>

            <div className="md:hidden">
                <CardList 
                    dataList={data} 
                    titleKey={""} 
                    excludeKeys={[]} 
                    onSearch={null} 
                />
            </div>

            <ViewPayslip payslip_id={selectedRow?.id} />
        </Fragment>
    )
}