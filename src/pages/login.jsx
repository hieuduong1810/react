import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)



    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginUserAPI(values.email, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)

    }
    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ margin: "10px" }}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: "email", message: 'Enter a valid email address!', }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
                        </Form.Item>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Button onClick={() => form.submit()} type="primary" loading={loading} >Login</Button>
                            <Link to="/">Go to homepage <ArrowRightOutlined /> </Link>
                        </div>
                    </Form >
                    <Divider />
                    Chưa có tải khoản?
                    <Link to="/register"> Đăng ký tại đây</Link>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;