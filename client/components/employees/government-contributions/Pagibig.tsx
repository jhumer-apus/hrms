import { Form, Input, InputNumber, Typography } from "antd";

export default function Pagibig(){
    const { Text, Link, Title} = Typography;
    const [form] = Form.useForm();
    
    return (
        <div className='card'>
            <Title level={5}>Pag-Ibig Details</Title>
            <br></br>
            <Form.Item 
                name="pagibig_number" 
                label="Pag-Ibig Number:" 
                rules={[
                    { 
                        required: true,
                        message: 'Pag-Ibig number is required' 
                    },
                ]}
            >
                <Input 
                    name="pagibig_number" 
                />
            </Form.Item>
            <br></br>
            <Form.Item 
                name="pagibig_contribution" 
                label="Pag-Ibig Contribution:" 
                rules={[
                    { 
                        required: true,
                        message: 'Pag-Ibig Contribution is reqired' 
                    },
                ]}
            >
                <InputNumber
                    addonBefore="₱"
                    type="number"
                    name="pagibig_contribution"
                    min={0}   
                />
            </Form.Item>
        </div>
    )
}