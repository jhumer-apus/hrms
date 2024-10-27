import { useModalStore } from "@/store/modalStore";
import { PreviousEmployer } from "@/types";
import { formatTextToNumber } from "@/utils/format-text";
import { Button, Form, Input } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

interface Props {
    handleFormChange: (newData:PreviousEmployer) => void
}
export default function FormAddPreviousEmployer(props: Props) {

    const { handleFormChange } = props

    // STATES
    const { setModal } = useModalStore((state: any) => state) 
    const [form] = useForm()

    const onFinish: FormProps['onFinish'] = (values) => {
        values = {
            key: dayjs().valueOf(),
            ...values
        }
        handleFormChange(values)
        form.resetFields();
        setModal("formAddPrevEmp", false)
    };

    const handleValuesChange = (changedValues: any, allValues: any) => {

        formatTextToNumber(['zip_code', 'tin'], changedValues, form)
    }

    return (
            <Form
                name="add_previous_employer"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="flex sm:flex-wrap md:flex-row flex-col md:items-end gap-4"
                onValuesChange={handleValuesChange}
            >
                <Form.Item 
                    name="company_name"
                    label="Company Name:"
                    rules={
                        [
                            { 
                                required: true,

                            }
                        ]
                    }
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="tin"
                    label="TIN: "
                    rules={
                        [
                            { 
                                required: true 
                            }
                        ]
                    }
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="address"
                    label="Address: "
                    rules={
                        [
                            { 
                                required: true 
                            }
                        ]
                    }
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="zip_code"
                    label="Zip Code: "
                    rules={
                        [
                            { 
                                required: true 
                            }
                        ]
                    }
                >
                    <Input />
                </Form.Item>
                <Form.Item className="">
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        
    )
}