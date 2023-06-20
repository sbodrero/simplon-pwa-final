import { useState } from 'react';
import { Form, Input, Button, Row, Typography, Space, Checkbox } from 'antd';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/'

const { Text } = Typography;

export const Auth = ({ isLogged, setIsLogged }) => {
  const [error, setError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  // console.log(hasAccount, 'hasAccount');

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      if (hasAccount) {
        await signInWithEmailAndPassword(auth, email, password);
        setIsLogged(true);
        return console.log(auth?.currentUser, 'user')
      }
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLogged(true);
      return console.log(auth?.currentUser, 'user')
    } catch (e) {
      setError(e.message)
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth)
      setIsLogged(false);
    } catch (e) {
      console.error(e);
    }
  }

  const HandleCheckboxChange = (e) => setHasAccount(e.target.checked);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  console.log(auth?.currentUser, 'user');
  // console.log(error?.message, 'error');

  return (
    <>
      <Row justify="center">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Requis',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Requis',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                {hasAccount ? "S'authentifier" : "Créer mon compte"}
              </Button>
              <Button type="primary" onClick={handleLogOut}>
                Se deconnecter
              </Button>
            </Space>
          </Form.Item>
          <Checkbox onChange={HandleCheckboxChange}>J'ai déjà un compte</Checkbox>
          <Text type="danger">{error}</Text>
        </Form>
      </Row>
    </>
  )
}

export default Auth;
