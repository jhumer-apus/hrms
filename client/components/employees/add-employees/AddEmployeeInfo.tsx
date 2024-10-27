import { Button, Form, FormProps, message, Modal, Steps } from "antd";
import FormPersonalInfo from "../forms/FormPersonalInfo";
import { useModalStore } from "@/store/modalStore";
import { Fragment, useEffect, useMemo, useState } from "react";
import FormPayrollInfo from "../forms/FormPayrollInfo";
import FormEmploymentInfo from "../forms/FormEmploymentInfo";
import { EmployeeDataType, EmploymentInfoType, PayrollInfoType, PersonalInfoType } from "@/types/employee";
import { useQuery } from "@/hooks/useQuery";
import api from "@/utils/axios-config";


export default function AddEmployeeInfo() {
    
    // STATE
    const [form] = Form.useForm();
    const {showAddEmployeeModal, setModal} = useModalStore((state: any) => state)
    const [current, setCurrent] = useState<number>(0);
    const [employeeData, setEmployeeData] = useState<EmployeeDataType>({
        employee_image: null,
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        birth_date: "",
        sex: "",
        civil_status: "",
        mobile_number: "",
        email_address: "",
        spouse_first_name: "",
        spouse_middle_name: "",
        spouse_last_name: "",
        spouse_suffix: "",
        emerg_contact_person: "",
        emerg_mobile_number: "",
        computation_type: "",
        rate: null,
        bank_name: "",
        account_number: "",
        employee_number: "",
        date_hired: null,
        company_id: null,
        position_id: null,
        role_id: null
    })

    // HOOKS
    const {data, loading, query, contextHolder:alertMessage, error, status} = useQuery()

    // FUNCTIONS
    const handleCloseModal = () => {
        resetForms()
        setCurrent(curr => 0)
        setModal("showAddEmployeeModal", false)
        
    }

    const handleStepsButton = (step: "next" | "prev") => {

        switch(step) {

            case "next":
                const nextStep = current + 1
                if(nextStep < steps.length) 
                    setCurrent(curr => nextStep)
                else 
                    submitEmployeeData()
                break;

            case "prev":
                const prevStep = current - 1
                if(prevStep >= 0) 
                    setCurrent(curr => prevStep)
                break;

            default:
                break;
        }
    }

    const updateEmployeeState = (values:any) => {
        setEmployeeData((curr:any) => ({
            ...curr,
            ...values
        }))
    }

    const onFinish: FormProps['onFinish'] = (values) => {
        updateEmployeeState(values)
        handleStepsButton("next")
    };

    const submitEmployeeData = async () => {
        query(
            {
                fn: async() => await api.post("/hahahaha"), 
                onSuccess: (res) => {
                    resetForms()
                    setCurrent(curr => 0)
                    setModal("showAddEmployeeModal", false)
                },
                onFail: (err) => {
                    console.log("ughh")
                },
                successMessage: "Succesfully Add New Employee"
            }
        )
    }

    const resetForms = () => {

        Object.keys(employeeData).map(key => {
            setEmployeeData(curr => ({
                ...curr,
                [key]: ""
            }))
        })
        form.resetFields()
    }


    const steps = [
        {
          title: 'Personal Information',
          content: 
            <FormPersonalInfo 
                initialValues={employeeData}
                readOnly={false}
            />
        },
        {
          title: 'Payroll Information',
          content:
            <FormPayrollInfo 
                initialValues={employeeData}
                readOnly={false}
            />
        },
        {
          title: 'Employment Information',
          content: 
            <FormEmploymentInfo 
                initialValues={employeeData}
                readOnly={false}
            />,
        },
    ];


    const items = useMemo(() => 
        steps.map((item) => ({ key: item.title, title: item.title }))
    , [employeeData]);

    return(
        <Fragment>
            {alertMessage}
            <Modal 
                title="Add Employee" 
                open={showAddEmployeeModal}
                footer={null}
                maskClosable={false}
                onClose={handleCloseModal}
                onOk={handleCloseModal} 
                onCancel={handleCloseModal}
                width="full"
                style={{ maxWidth: "1200px" }}
            >
                <Steps
                    current={current}
                    items={items}
                /> 
                <br></br>
                <div className="md:p-8 p-4 border-t border-slate-300">
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        {steps[current].content}
                        <Form.Item>
                            <div className="flex gap-4 my-4">
                                <Button type="primary" onClick={() => handleStepsButton("prev")} disabled={current == 0}>Back</Button>
                                <Button type="primary" htmlType="submit" disabled={loading}>{current == steps.length-1? "Finish": "Next"}</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </Fragment>
    )
}