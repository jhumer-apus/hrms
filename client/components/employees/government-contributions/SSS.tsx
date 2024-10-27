import { Form, Input, InputNumber, Typography } from "antd";

export default function SSS(){
    const { Text, Link, Title} = Typography;
    const [form] = Form.useForm();
    
    return (
        <div className='card'>
            <Title level={5}>SSS Details</Title>
            <br></br>

            <Form.Item 
                name="sss_number" 
                label="SSS Number:" 
                rules={[
                    { 
                        required: true,
                        message: 'SSS number is required' 
                    },
                ]}
            >
                <Input 
                    name="sss_number" 
                />
            </Form.Item>

            <br></br>

            <Form.Item 
                name="sss_contribution" 
                label="SSS Contribution:" 
                rules={[
                    { 
                        required: true,
                        message: 'SSS Contribution is reqired' 
                    },
                ]}
            >
                <InputNumber
                    addonBefore="₱"
                    type="number"
                    name="sss_contribution"
                    min={0}
                />
            </Form.Item>

        </div>
    )
}