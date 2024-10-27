import { EmployeeDataType, EmploymentInfoType } from "@/types/employee";
import { Col, DatePicker, Form, FormProps, Input, Row, Select, Typography } from "antd";
import dayjs from "dayjs";

interface Props {
    initialValues: EmployeeDataType | null
    readOnly: boolean
}

export default function FormEmploymentInfo(props:Props) {

    const { initialValues, readOnly } = props
    const { Text, Link, Title} = Typography;

    const companyOptions = [
        { value: 1, label: 'Jack' },
        { value: 2, label: 'Lucy' },
        { value: 3, label: 'Tom' },
    ]

    const positionOptions = [
        { value: 1, label: 'Developer' },
        { value: 2, label: 'Project Manager' },
    ]

    const roleOptions = [
        { value: 1, label: 'Super Admin' },
        { value: 2, label: 'Admin Lang' },
    ]
    

    return(
        <div className="my-4">
            <Title level={3}>Employment Information</Title>
            <Row gutter={[16, 16]}> 
                <Col xs={24} sm={12} md={8} lg={4}>

                        <Form.Item 
                            name="date_hired" 
                            label="Date Hired"
                            initialValue={initialValues?.date_hired? dayjs(initialValues.date_hired): ""} 
                            rules={[
                                { 
                                    required: !readOnly,
                                },
                            ]}
                        >
                            <DatePicker 
                                disabled={readOnly}
                            />
                        </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={4}>

                    <Form.Item 
                        name="employee_number" 
                        label="Employee Number"
                        initialValue={initialValues?.employee_number}
                        rules={[
                            { 
                                required: !readOnly,
                            },
                        ]}
                    >
                        <Input
                            readOnly={readOnly}
                            name="employee_number"               
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>

                    <Form.Item 
                        name="company_id" 
                        label="Company"
                        initialValue={initialValues?.company_id}
                        rules={[
                            { 
                                required: !readOnly,
                                message: 'Please Select Company' 
                            },
                        ]}
                    >
                        <Select
                            disabled={readOnly}
                            showSearch
                            placeholder="Select a company"
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={companyOptions}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={4}>

                    <Form.Item 
                        name="position_id" 
                        label="Position"
                        initialValue={initialValues?.position_id}
                        rules={[
                            { 
                                required: !readOnly,
                                message: 'Please Select Position' 
                            },
                        ]}
                    >
                        <Select
                            disabled={readOnly}
                            showSearch
                            placeholder="Select a position"
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={positionOptions}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={4}>

                    <Form.Item 
                        name="role_id" 
                        label="Role"
                        initialValue={initialValues?.role_id}
                        rules={[
                            { 
                                required: !readOnly,
                                message: 'Please Select Role' 
                            },
                        ]}
                    >
                        <Select
                            disabled={readOnly}
                            showSearch
                            placeholder="Select a role"
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={roleOptions}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}