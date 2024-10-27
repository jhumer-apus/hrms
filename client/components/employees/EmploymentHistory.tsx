import { FamilyMembers } from "@/types";
import { Button, Form, Modal, Table, Tabs, TabsProps, Typography } from "antd";
import { useState } from "react";
import FormAddFamilyMember from "./family-background/FormAddFamilyMember";
import FormAddEmploymentHistory from "./employment-history/FormAddEmploymentHistory";
import CardList from "../CardList";
import { useModalStore } from "@/store/modalStore";
import { useScreenStore } from "@/store/screenStore";

interface Props {
    employeeDetails: any
    setEmployeeDetails: any
}

export default function EmploymentHistory (props:Props) {

    const {employeeDetails, setEmployeeDetails} = props
    const {formAddEmploymentHistory, setModal} = useModalStore((state: any) => state.modal)
    const {width:screenWidth} = useScreenStore((state: any) => state.screen)

    const { Text, Link, Title} = Typography;
    const [data, setData] = useState<FamilyMembers []>([])


    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',    
        },
        {
            title: 'Date Assigned',
            dataIndex: 'date_assigned',
            key: 'date_assigned',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ]

    const handleCloseModal = () => {
        setModal("formAddEmploymentHistory", false)
    }

    const handleAddEmploymentHistory = (newData:FamilyMembers) => {
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
                        <Button type="primary" onClick={() => setModal("formAddEmploymentHistory", true)}>Add Employment History</Button>
                        <Modal 
                            title="Add Prevous Employer" 
                            open={formAddEmploymentHistory}
                            footer={null}
                            maskClosable={false}
                            onClose={handleCloseModal}
                            onOk={handleCloseModal} 
                            onCancel={handleCloseModal}
                        >
                            <FormAddEmploymentHistory handleFormChange={handleAddEmploymentHistory } />
                        </Modal>
                    </div> 
                    : <FormAddEmploymentHistory handleFormChange={handleAddEmploymentHistory } />

            }
            
            <Table dataSource={data} columns={columns} className="my-4 hidden md:block"/>
            
            <div className="md:hidden">
                <CardList dataList={data} titleKey="position" excludeKeys={["key"]} onSearch={null} />
            </div>

            <Button type="primary" htmlType="submit" className='mt-4'>
                Save
            </Button>
        </div>
    )
}