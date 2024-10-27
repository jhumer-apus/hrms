import { EmployeeDataType, PayrollInfoType,  } from "@/types/employee";
import { Button, Col, Form, FormProps, Input, InputNumber, Radio, Row, Typography } from "antd";

interface Props {
    initialValues: EmployeeDataType | null
    readOnly: boolean
}

export default function FormPayrollInfo (props:Props) {
    
    const { initialValues, readOnly } = props
    const { Text, Link, Title} = Typography;

    return (
        <div className="my-4">
            <Title level={3}>Payroll Information</Title>
            <Row gutter={[16, 16]}> 
                <Col
                    md={12}
                    sm={24}
                    xs={24}
                >
                    <div className='card'>
                        <Title level={5}>Basic Pay</Title>
                        <br></br>
                        <Form.Item 
                            name="computation_type" 
                            label="Computation Type:"
                            initialValue={initialValues?.computation_type}
                            rules={[
                                { 
                                    required: !readOnly,
                                    message: 'Please Select Computation Type' 
                                },
                            ]}
                        >
                            <Radio.Group disabled={readOnly}>
                                <Radio value='monthly'>Monthly Rate</Radio>
                                <Radio value='daily'>Daily Rate</Radio>
                                <Radio value='hourly'>Hourly Rate</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <br></br>
                        <Form.Item 
                            name="rate" 
                            label="Rate:"
                            initialValue={initialValues?.rate}
                            rules={[
                                { 
                                    required: !readOnly,
                                    message: 'Please Input Rate' 
                                },
                            ]}
                        >
                            <InputNumber
                                readOnly={readOnly}
                                min={0} 
                                name="rate" 
                                placeholder='0'
                            />
                        </Form.Item>
                    </div>
                </Col>
                    
                <Col 
                    md={12}
                    sm={24}
                    xs={24}
                >
                    <div className='card'>
                        <Title level={5}>ATM Information</Title>
                        <br></br>
                        <Form.Item 
                            name="bank_name" 
                            label="Bank Name:"
                            initialValue={initialValues?.bank_name}
                            rules={[
                                { 
                                    required: !readOnly,
                                    message: 'Please Input Bank Name' 
                                },
                            ]}
                        >
                            <Input
                                readOnly={readOnly}
                                type='text' 
                                name="bank_name" 
                                placeholder='BPI/ Landbank/ UAB'
                            />
                        </Form.Item>
                        <br></br>
                        <Form.Item 
                            name="account_number" 
                            label="Account Number:"
                            initialValue={initialValues?.account_number}
                            rules={[
                                { 
                                    required: !readOnly,
                                    message: 'Please Input Account Number' 
                                },
                            ]}
                        >
                            <Input
                                readOnly={readOnly}
                                type='text' 
                                name="account_number" 
                                placeholder='123456789'
                            />
                        </Form.Item>
                    </div>
                </Col>
            </Row>
        </div>
    )
}