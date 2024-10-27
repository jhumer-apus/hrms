import { Button, Form, FormProps, Modal, Tabs, TabsProps } from "antd";
import FormPayrollInfo from "./forms/FormPayrollInfo";
import FormPersonalInfo from "./forms/FormPersonalInfo";
import { Fragment, ReactNode, useEffect, useState } from "react";
import FormEmploymentInfo from "./forms/FormEmploymentInfo";
import { useModalStore } from "@/store/modalStore";
import { useQuery } from "@/hooks/useQuery";
import api from "@/utils/axios-config";

interface Props {
    userID: number | null
}

export default function ViewEmployeeInfo (props: Props) {

    const {userID} = props
    const [currSection, setCurrSection] = useState<string>("1");
    const {showViewEmployeeModal, setModal} = useModalStore((state: any) => state)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState(null)

    const [formPersonalInfo] = Form.useForm()
    const [formPayrollInfo] = Form.useForm()
    const [formEmploymentInfo] = Form.useForm()

    const {data, loading, query, status, contextHolder} = useQuery()

    useEffect(() => {
        if(userID) {
            query({
                fn: async () => {
                    await api.get("/adasda");
                },
                onSuccess: null,
                onFail: null,
                successMessage: null
            })
        }
    },[userID])

    const onFinish: FormProps['onFinish'] = (values) => {
        query({
            fn: async () => {
                await api.post("/asdasdasd")
            },
            onSuccess: null,
            onFail: null,
            successMessage: null
        })
        console.log(values)
    };
    
    const resetForms = () => {
        formPersonalInfo.resetFields()
        formPayrollInfo.resetFields()
        formEmploymentInfo.resetFields()
    }
    
    const handleChangeKey = (value: string) => {
        setIsEdit(curr => false)
        setCurrSection(curr => value)
        resetForms()
    };

    const handleCloseModal = () => {
        setCurrSection(curr => "1")
        setModal("showViewEmployeeModal", false)     
    }

    const onCancel = () => {
        setIsEdit(curr => false)
        resetForms()
    }

    const formElement = (formItemChildren: ReactNode, form:any):ReactNode => (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            {formItemChildren}
        </Form>
    )

    const buttonElement = ():ReactNode => {
        if(isEdit) {
            return (
                <div className="flex gap-4">
                    <Button onClick={() => onCancel()} loading={loading}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
                </div>
            )
        } else {
            return (<Button type="primary" onClick={() => setIsEdit(curr => true)} loading={loading}>Edit</Button>)
        }
    }

    const items: TabsProps['items'] = [
        {
            key:"1",
            label: 'Personal Information',
            children: 
                formElement(
                    <Fragment>
                        <FormPersonalInfo 
                            initialValues={null}
                            readOnly={!isEdit}
                        />
                        {buttonElement()}
                    </Fragment>,
                    formPersonalInfo
                )
        },
        {
            key: '2',
            label: 'Payroll Information',
            children: 
                formElement(
                    <Fragment>
                        <FormPayrollInfo 
                            initialValues={null}
                            readOnly={!isEdit}
                        />
                        {buttonElement()}
                    </Fragment>,
                    formPayrollInfo
                )
        },
        {
            key: '3',
            label: 'Employment Information',
            children: 
                formElement(
                    <Fragment>
                        <FormEmploymentInfo 
                            initialValues={null}
                            readOnly={!isEdit}
                        />
                        {buttonElement()}
                    </Fragment>,
                    formEmploymentInfo
                )
        },
        
    ];


    return (
        <Modal 
            title="Name of an Employee" 
            open={showViewEmployeeModal}
            footer={null}
            maskClosable={false}
            onClose={handleCloseModal}
            onOk={handleCloseModal} 
            onCancel={handleCloseModal}
            width="full"
            style={{ maxWidth: "1200px" }}
        >
            {contextHolder}
            <Tabs 
                defaultActiveKey="1"  
                activeKey={currSection}
                items={items} 
                onChange={handleChangeKey}
                className='w-full'
            />

        </Modal>
    )
}