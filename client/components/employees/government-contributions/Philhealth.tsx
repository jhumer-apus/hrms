import { Form, Input, InputNumber, Typography } from "antd";

export default function Philhealth() {
    const { Text, Link, Title} = Typography;
    const [form] = Form.useForm();
    
    return (
        <div className='card'>
            <Title level={5}>Philhealth Details</Title>
            <br></br>
            <Form.Item 
                name="philhealth_number" 
                label="Philhealth Number:" 
                rules={[
                    { 
                        required: true,
                        message: 'Philhealth number is required' 
                    },
                ]}
            >
                <Input 
                    name="philhealth_number" 
                />
            </Form.Item>
            <br></br>
            <Form.Item 
                name="philhealth_contribution" 
                label="Philhealth Contribution:" 
                rules={[
                    { 
                        required: true,
                        message: 'Philhealth Contribution is required' 
                    },
                ]}
            >
                <InputNumber
                    addonBefore="₱"
                    type="number"
                    name="philhealth_contribution"
                    min={0}
                />
            </Form.Item>
        </div>
    )
}