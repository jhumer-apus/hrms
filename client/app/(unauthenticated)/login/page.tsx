"use client";

import useAuth from "@/hooks/auth";
import { Button, Card, Col, Form, FormProps, Input, Row, Typography, message } from "antd";
import { useRouter } from "next/navigation";

export default function Login() {

    // NEXTJS
    const router = useRouter()

    // LIBRARIES
    const [messageApi, contextHolder] = message.useMessage();
    const { Title } = Typography;
    const [form] = Form.useForm();

    // HOOKS
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })

    const onFinish: FormProps['onFinish'] = (values) => {
        const { username , password} = values
        login(username, password)
            // .then((res:any) =>
            //     (res == undefined || res == null) && error("Something Went Wrong")
            // )
            // .catch((err:any) => {
            //     if(err.response?.status == "401") {
            //         error("Wrong Username or Password")
            //     } else {
            //         error("Something Went Wrong")
            //     }
            // })
    };

    const error = (errorMessage:string) => {
        messageApi.open({
          type: 'error',
          content: errorMessage,
        });
    };

    return (
        <div className="flex md:flex-row flex-col h-screen bg-purple-900">
            {contextHolder}
            <div className="md:h-full p-8 md:w-1/2">
                <div className="h-full grid content-center">
                    <h1 className="text-white text-2xl text-center h-fit">APP ELECTRIC HRIS</h1>
                </div>
            </div>
            <div className="bg-white h-full md:w-1/2 grid content-center">
                <Title className="text-center">LOGIN</Title>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Row gutter={16} className="p-8">
                        <Col span={24}>
                            <Form.Item
                                name="username" 
                                label="Username"
                                rules={[
                                    { 
                                        required: true,
                                        message: 'Username is required' 
                                    },
                                ]}
                            >
                                <Input 
                                    name="username"
                                    className="text-blue-500"
                                    // onChange={handleChangePersonalData}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item 
                                name="password" 
                                label="Password:" 
                                rules={[
                                    { 
                                        required: true,
                                        message: 'Password is required' 
                                    }
                                ]}
                            >
                                <Input
                                    name="password" 
                                    type="password"
                                    // onChange={handleChangePersonalData}
                                />
                            </Form.Item>
                        </Col>
                        <Col className="mt-16" span={24}>
                            <Form.Item className="mt-4">
                                <Button type="primary" htmlType="submit" size="large" className="w-full">

                                        LOGIN

                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}