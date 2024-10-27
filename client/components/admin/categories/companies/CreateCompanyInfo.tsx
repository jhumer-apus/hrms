"use client";

import { useQuery } from "@/hooks/useQuery";
import { useModalStore } from "@/store/modalStore";
import api from "@/utils/axios-config";
import { Button, Form, FormProps, Modal } from "antd";
import { Fragment } from "react";
import FormCompanyInfo from "./forms/FormCompanyInfo";

export default function CreateCompanyInfo() {

    // STATES
    const {showCreateCompanyModal, setModal} = useModalStore((state: any) => state)
    const [form] = Form.useForm()
    
    // HOOKS
    const {data, loading, status, error, contextHolder:alert, query} = useQuery()

    // FUNCTIONS
    const handleCloseModal = () => {
        form.resetFields()
        setModal("showCreateCompanyModal", false)
    }

    const onFinish: FormProps['onFinish'] = (values) => {
        query({
            fn: async () => {
                await api.post("/create-new-company")
            },
            onSuccess: (res) => {
                handleCloseModal()
            },
            onFail: null,
            successMessage: "Add New Company Successfully"
        })
        console.table(values)
    };


    return (
        <Fragment>
            {alert}
            <Modal 
                title="Add Company" 
                open={showCreateCompanyModal}
                footer={null}
                maskClosable={false}
                onClose={handleCloseModal}
                onOk={handleCloseModal} 
                onCancel={handleCloseModal}
                width="full"
                style={{ maxWidth: "500px" }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >   
                    <FormCompanyInfo 
                        initialValues={null} 
                        readOnly={false}                    
                    />
                    <Form.Item>
                        <div className="flex gap-4 my-4">
                            <Button type="primary" htmlType="submit" disabled={loading}>Submit</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}