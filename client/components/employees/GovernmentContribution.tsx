import { Button, Col, Form, FormProps, Input, InputNumber, Row, Typography } from "antd";
import { useRef, useState } from "react";
import SSS from "./government-contributions/SSS";
import Pagibig from "./government-contributions/Pagibig";
import Philhealth from "./government-contributions/Philhealth";
import Tax from "./government-contributions/Tax";
import { formatTextToNumber } from "@/utils/format-text";

interface Props {
    employeeDetails: any
    setEmployeeDetails: any
}

export default function GovernmentContribution (props:Props) {

    const {employeeDetails, setEmployeeDetails} = props
    const { Text, Link, Title} = Typography;
    const [form] = Form.useForm();
    
    const onFinish: FormProps['onFinish'] = (values) => {

        setEmployeeDetails((curr:any) => ({
            ...curr,
            sss_number: values.sss_number,
            sss_contribution: values.sss_contribution
        }))
    };

    const handleChange = (changedValues: any, allValues: any) => {

        formatTextToNumber(['sss_number', 'pagibig_number'], changedValues, form)

    }




    return (
        <div>
            <Title level={3}>Government Contribution</Title>
            <Form
                form={form}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onValuesChange={handleChange}
            >
                <Row gutter={[16, 16]}> 
                    <Col
                        md={12}
                        sm={24}
                        xs={24}
                    >
                        <SSS />
                    </Col>

                    <Col
                        md={12}
                        sm={24}
                        xs={24}
                    >
                        <Pagibig />
                    </Col>       
                </Row>

                <br></br>
                
                <Row gutter={[16, 16]}> 
                    <Col
                        md={12}
                        sm={24}
                        xs={24}
                    >
                        <Philhealth />
                    </Col>
                    
                    <Col
                        md={12}
                        sm={24}
                        xs={24}
                    >
                       <Tax />
                    </Col>       
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className='mt-4'>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}