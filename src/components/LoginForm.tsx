import { Button, Form, Input } from "antd"
import { FC, useState } from "react"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { rules } from "../utils/rules"

const LoginForm: FC = () => {
    const { error, isLoading } = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useActions()

    const submit = () => {
        login(username, password)
    }

    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{ color: "red" }}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required()]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required()]}
            >
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm