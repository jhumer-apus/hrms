import { FamilyMembers } from "@/types";
import { Button, Form, Modal, Table, Tabs, TabsProps, Typography } from "antd";
import { useState } from "react";
import FormAddFamilyMember from "./family-background/FormAddFamilyMember";
import CardList from "../CardList";
import { useScreenStore } from "@/store/screenStore";
import { useModalStore } from "@/store/modalStore";

interface Props {
    employeeDetails: any
    setEmployeeDetails: any
}

export default function FamilyBackground (props:Props) {

    const {employeeDetails, setEmployeeDetails} = props
    const {formAddFamilyMember, setModal} = useModalStore((state: any) => state)
    const {width: screenWidth} = useScreenStore((state: any) => state.screen)
    
    const { Text, Link, Title} = Typography;
    const [data, setData] = useState<FamilyMembers []>([])


    const [form] = Form.useForm();

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Middle Name',
            dataIndex: 'middle_name',
            key: 'middle_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Suffix',
            dataIndex: 'suffix',
            key: 'suffix',
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthdate',
            key: 'birthdate',
        },
        {
            title: 'Relationship',
            dataIndex: 'relationship',
            key: 'relationship',
        }
    ]

    const handleCloseModal = () => {
        setModal("formAddFamilyMember", false)
    }

    const handleAddFamilyMember = (newData:FamilyMembers) => {
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
                        <Button type="primary" onClick={() => setModal("formAddFamilyMember", true)}>Add Family Member</Button>
                        <Modal 
                            title="Add Family Member" 
                            open={formAddFamilyMember}
                            footer={null}
                            maskClosable={false}
                            onClose={handleCloseModal}
                            onOk={handleCloseModal} 
                            onCancel={handleCloseModal}
                        >
                            <FormAddFamilyMember handleFormChange={handleAddFamilyMember} />
                        </Modal>
                    </div> 
                    : <FormAddFamilyMember handleFormChange={handleAddFamilyMember} />

            }
            
            <Table dataSource={data} columns={columns} className="my-4 hidden md:block"/>
            <div className="md:hidden">
                <CardList dataList={data} titleKey="relationship" excludeKeys={["key"]} onSearch={null} />
            </div>
            <Button type="primary" htmlType="submit" className='mt-4'>
                Save
            </Button>
        </div>
    )
}