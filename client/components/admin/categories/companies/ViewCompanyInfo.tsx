"use client";

import { useQuery } from "@/hooks/useQuery";
import { useModalStore } from "@/store/modalStore";
import api from "@/utils/axios-config";
import { Button, Form, FormProps, Modal } from "antd";
import { Fragment, ReactElement, useEffect, useState } from "react";
import FormCompanyInfo from "./forms/FormCompanyInfo";
import { ActionType } from "@/types";

interface Props {
    company_id: number | null
}
export default function ViewCompanyInfo(props: Props) {

    const {company_id} = props
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const {showViewCompanyModal, setModal} = useModalStore((state: any) => state)
    const [form] = Form.useForm()
    

    const {data, loading, status, error, contextHolder:alert, query} = useQuery()

    useEffect(() => {
        fetchData()
    }, [company_id])
    
    const fetchData = () => {
        query({
            fn: async () => {
                await api.get(`/view-company/${company_id}`)
            },
            onSuccess: null,
            onFail: null,
            successMessage: null
        })
    }

    const handleCloseModal = () => {
        form.resetFields()
        setIsEdit(false)
        setModal("showViewCompanyModal", false)
    }

    const onFinish: FormProps['onFinish'] = (values) => {
        query({
            fn: async () => {
                await api.post("/update-company")
            },
            onSuccess: (res) => {
                handleCloseModal()
            },
            onFail: null,
            successMessage: "Update Company Successfully"
        })
        console.table(values)
    };

    const onButtonClick = (action: ActionType )  => {
        switch (action) {

            case "delete": 
                break

            case "edit": 
                setIsEdit(curr => true)
                break

            case "cancel":
                setIsEdit(curr => false)
                form.resetFields()
                break

            case "save":
                //function here update company info
                break

            default:
                break
        }
    }

    const buttonElement = (): ReactElement => (

        <div className="flex gap-4 my-4">
            {isEdit 
            ?   <Fragment>
                    <Button disabled={loading} onClick={() => onButtonClick("cancel")}>Cancel</Button>
                    <Button disabled={loading} onClick={() => onButtonClick("save")} type="primary" htmlType="submit">Save</Button>
                </Fragment> 

            :   <Fragment>
                    <Button disabled={loading} onClick={() => onButtonClick("delete")} danger>Delete</Button>
                    <Button disabled={loading} onClick={() => onButtonClick("edit")} type="primary">Edit</Button>
                </Fragment> 

            }
        </div> 
    )

    return (
        <Fragment>
            {alert}
            <Modal 
                title="Company Details" 
                open={showViewCompanyModal}
                footer={null}
                maskClosable={!loading}
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
                        readOnly={!isEdit}                    
                    />
                    <Form.Item>
                        {buttonElement()}
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}