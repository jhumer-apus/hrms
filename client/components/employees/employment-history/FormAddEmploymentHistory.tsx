import { useModalStore } from "@/store/modalStore";
import { FamilyMembers, PreviousEmployer } from "@/types";
import { formatTextToNumber } from "@/utils/format-text";
import { Button, DatePicker, Form, Input } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import dayjs from 'dayjs'

interface Props {
    handleFormChange: (newData:FamilyMembers) => void
}
export default function FormAddEmploymentHistory(props: Props) {

    const { handleFormChange } = props

    // STATES
    const { setModal } = useModalStore((state: any) => state) 
    const [form] = useForm()

    const onFinish: FormProps['onFinish'] = (values) => {
        
        values = {
            ...values,
            date_assigned: dayjs(values.date_assigned).format('YYYY-MM-DD'),
            key: dayjs().valueOf()
        }

        handleFormChange(values)
        form.resetFields();
        setModal("formAddEmploymentHistory", false)
    };

    // const handleValuesChange = (changedValues: any, allValues: any) => {
    //     formatTextToNumber(['zip_code', 'tin'], changedValues, form)
    // }

    return (
            <Form
                name="add_employment_history"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="flex sm:flex-wrap md:flex-row flex-col md:items-end gap-4"
                // onValuesChange={handleValuesChange}
            >
                <Form.Item 
                    name="position"
                    label="Position:"
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
                    name="date_assigned"
                    label="Date Assigned"
                    rules={
                        [
                            { 
                                required: true 
                            }
                        ]
                    }
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item 
                    name="description"
                    label="Description:"
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