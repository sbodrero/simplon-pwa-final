import { Form, Input, Button, Row, Typography, Space, Select } from 'antd';

const { Title } = Typography;

export const DogsForm = ({ dog, isEdit, setShowForm, onDogAdd, onDogUpdate }) => {

  const okCatSelectOptions = [
    {
      label: 'Oui',
      value: true,
    },
    {
      label: 'Non',
      value: false,
    },
  ];

  const sexSelectOptions = [
    {
      label: 'Mâle',
      value: 'Mâle',
    },
    {
      label: 'Femelle',
      value: 'Femelle',
    },
  ];

  const onFinish = async (values) => {
    if(isEdit) {
      return onDogUpdate(values, dog?.id)
    }
    return onDogAdd(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row justify="center">
        <Title>{isEdit ? 'Modifier' : 'Ajouter'} un chien</Title>
      </Row>
      <Row justify="center">
        <Form
          name="dogsform"
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
            ...dog
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nom"
            name="name"

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
            label="Âge"
            name="age"
            rules={[
              {
                required: true,
                message: 'Requis',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Race"
            name="breed"
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
            label="Ok Chat ?"
            name="okcat"
            rules={[
              {
                required: true,
                message: 'Requis',
              },
            ]}
          >
            <Select options={okCatSelectOptions} />
          </Form.Item>

          <Form.Item
            label="Sexe"
            name="sex"
            rules={[
              {
                required: true,
                message: 'Requis',
              },
            ]}
          >
            <Select options={sexSelectOptions} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                {isEdit ? "Modifier" : "Créer"}
              </Button>
              <Button type="primary" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Row>
    </>
  )
}

export default DogsForm;
