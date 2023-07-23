import { Form, Input } from "antd"
import { Button } from "antd/es/radio"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authSelector from "../../redux/slice/authenticate/selector"
import { login } from "../../redux/slice/authenticate/action"

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(authSelector.selectIsAuthenticate)
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()

        dispatch(login({
            email: username,
            password
        }))
    }

    if (isAuthenticated) {
        return navigate("/")
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={(event) => {
                    setUserName(event.target.value)
                }} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onChange={(event) => {
                    setPassword(event.target.value)
                }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginPage