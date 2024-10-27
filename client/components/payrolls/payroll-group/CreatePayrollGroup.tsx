import { useQuery } from "@/hooks/useQuery";
import { useModalStore } from "@/store/modalStore";
import api from "@/utils/axios-config";
import { Button, Col, Form, FormProps, Input, Modal, Row } from "antd";
import FormPayrollGroupInfo from "../forms/FormPayrollGroupInfo";

export default function CreatePayrollGroup () {

    const {showCreatePayrollGroupModal, setModal} = useModalStore((state: any) => state)

    const [form] = Form.useForm()

    const {data, loading, status, error, contextHolder:alert, query} = useQuery()

    const handleCloseModal = () => {
        setModal("showCreatePayrollGroupModal", false)
    }

    const onFinish: FormProps['onFinish'] = (values) => {
        query({
            fn: async () => {
                await api.post("/add-payroll-group")
            },
            onSuccess: (res) => {
                handleCloseModal()
            },
            onFail: null,
            successMessage: "Add New Payroll Group Successfully"
        })
        console.table(values)
    };

    return (
        <Modal
            title="Add Payroll Group" 
            open={showCreatePayrollGroupModal}
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
                <FormPayrollGroupInfo initialValues={null} readOnly={false}/>
                <Button type="primary">
                    Submit
                </Button>
                
            </Form>

        </Modal>
    )
}