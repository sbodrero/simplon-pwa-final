import { useState } from 'react';
import { Table, Typography, Tag, Button, Tooltip, Space, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { isOwnByCurrentUser } from '../utils/auth';

const { Title } = Typography;

const DogsTable = ({ dataSource, setIsEdit, setDog, setShowForm, onDogDelete, onAddImage }) => {
  const [file, setFile] = useState(null);

  console.log(file, 'file');

  const handleOnEditClick = (record) => {
    setDog(record);
    setIsEdit(true);
    setShowForm(true);
  }

  const handleOnDogDelete = (id) => onDogDelete(id);

  const handleUploadFile = (dogId) => {
    onAddImage(file, dogId);
  }

  const columns = [
    {
      title: 'Race',
      dataIndex: 'breed',
      key: 'breed',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sexe',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Ok Chat',
      dataIndex: 'okcat',
      key: 'okcat',
      render: (text, record) => {
        const color = record.okcat ? '#87d068' : '#f50'
        return (
          <Tag color={color} >&nbsp;</Tag>
        );
      }
    },
    {
      title: 'Image',
      dataIndex: 'publicUrl',
      key: 'publicUrl',
      render: (text, record) => {
        if(record.publicUrl) {
          return <img src={record.publicUrl} title="image chien" alt="image chien" width="250p" />
        }
        if (isOwnByCurrentUser(record.userId)) {
          return (
            <>
              <Input type="file" onChange={(event) => setFile(event.target.files[0])}/>
              <Button type="primary" onClick={() => handleUploadFile(record.id)}>Ajouter une photo</Button>
            </>
          );
        }
      }
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => {
          return (
            <Space direction="vertical">
              <Space wrap>
                <Tooltip title="Modifier">
                  <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleOnEditClick(record)} />
                </Tooltip>
                <Tooltip title="Suprimer">
                  <Button type="link" shape="circle" icon={<DeleteOutlined />}onClick={() => handleOnDogDelete(record.id)} />
                </Tooltip>
              </Space>
            </Space>
          )
      }
    }
  ];
  return (
    <>
      <Title>Liste des chiens du refuge</Title>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default DogsTable;
