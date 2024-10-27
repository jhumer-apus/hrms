import { Form, Input, InputNumber, Typography } from "antd";

export default function Tax(){
    const { Text, Link, Title} = Typography;
    const [form] = Form.useForm();
    
    return (
        <div className='card'>
            <Title level={5}>Tax Details</Title>
            <br></br>
            <Form.Item 
                name="tin" 
                label="Tin:" 
                rules={[
                    { 
                        required: true,
                        message: 'TIN is required' 
                    },
                ]}
            >
                <Input 
                    name="tin" 
                />
            </Form.Item>
            <br></br>
            <Form.Item 
                name="tax_contribution" 
                label="Tax Contribution:" 
                rules={[
                    { 
                        required: true,
                        message: 'Tax Contribution is reqired' 
                    },
                ]}
            >
                <InputNumber
                    addonBefore="₱"
                    type="number"
                    name="tax_contribution"
                    min={0}   
                />
            </Form.Item>
        </div>
    )
}