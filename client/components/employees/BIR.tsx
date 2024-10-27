import { PreviousEmployer } from "@/types"
import { Button, Form, Input, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import FormAddPreviousEmployer from "./BIR/FormAddPreviousEmployer";
import { useState } from "react";
import CardList from "../CardList";
import { useModalStore } from "@/store/modalStore";
import { useScreenStore } from "@/store/screenStore";

interface Props {
    employeeDetails: any
    setEmployeeDetails: any
}

export default function BIR(props:Props) {

    const { employeeDetails, setEmployeeDetails } = props
    const [form] = useForm()
    
    // STATE
    const {formAddPrevEmp, setModal} = useModalStore((state: any) => state)
    const {width:screenWidth} = useScreenStore((state: any) => state.screen)
    const [data, setData] = useState<PreviousEmployer []>([
        {
            key: 1,
            company_name: 'Bitverse',
            tin: 3342342342,
            address: '10 Downing Street',
            zip_code: 1700
        },
        {
            key: 2,
            company_name: 'App Electric',
            tin: 3343434342,
            address: '10 Downing Street',
            zip_code: 1700
        },
    ])
      
    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'company_name',
            key: 'company_name',
        },
        {
            title: 'TIN',
            dataIndex: 'tin',
            key: 'tin',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Zip Code',
            dataIndex: 'zip_code',
            key: 'zip_code',
        },
    ];

    const handleCloseModal = () => {
        setModal("formAddPrevEmp", false)
    }

    const handleAddPreviousEmployer = (newData:PreviousEmployer) => {
        setData(curr => [
            ...curr,
            newData
        ])
    }

    return (
        <div >
            {
                screenWidth < 768 ?
                    <div>
                        <Button type="primary" onClick={() => setModal("formAddPrevEmp", true)}>Add Previous Employer</Button>
                        <Modal 
                            title="Add Prevous Employer" 
                            open={formAddPrevEmp}
                            footer={null}
                            maskClosable={false}
                            onClose={handleCloseModal}
                            onOk={handleCloseModal} 
                            onCancel={handleCloseModal}
                        >
                            <FormAddPreviousEmployer handleFormChange={handleAddPreviousEmployer} />
                        </Modal>
                    </div> 
                    : <FormAddPreviousEmployer handleFormChange={handleAddPreviousEmployer} />

            }
            
            <Table dataSource={data} columns={columns} className="my-4 hidden md:block"/>
            <div className="md:hidden">
                <CardList dataList={data} titleKey="company_name" excludeKeys={["key"]} onSearch={null} />
            </div>
            <Button type="primary" htmlType="submit" className='mt-4'>
                Save
            </Button>
        </div>

    )
}