import { CompanyType } from "@/types/admin/categories/company";
import { Col, Form, Input, Row } from "antd";

interface Props {
    initialValues: CompanyType | null
    readOnly: boolean
}
export default function FormCompanyInfo(props: Props) {
    
    const { initialValues, readOnly } = props

    return (
        <div className="form-wrapper my-8">
            <Row gutter={[16,16]}>
                <Col span={24}>
                    <Form.Item
                        name="company_name"
                        label="Company Name" 
                        initialValue={initialValues?.company_name}
                        rules={[
                            {
                                required: !readOnly
                            }
                        ]}
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Description" 
                        initialValue={initialValues?.description}
                        rules={[
                            {
                                required: !readOnly
                            }
                        ]}
                    >
                        <Input readOnly={readOnly}/>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}