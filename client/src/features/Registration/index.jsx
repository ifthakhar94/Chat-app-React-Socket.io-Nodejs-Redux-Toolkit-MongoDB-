import { Button, Form, Input, Upload, Spin } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

import { useState } from "react";
import uploadFile from "../../../helpers/uploadFile";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

export const Register = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState(null);
    const navigate = useNavigate();
  
    const onValuesChange = async (changedValues) => {
  
      if (changedValues.profilePic) {
        const file = changedValues.profilePic[0].originFileObj;
        const response = await uploadFile(file);
        setUserProfilePic(response?.url);
      }
    };
  
    const onFinish = async (values) => {
      try {
        setLoading(true);
        const regUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/register`;
        const response = await axios.post(regUrl, {...values, profile_pic: userProfilePic});
        console.log("response",response.data.user);
        
        toast.success('Registration successful!', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: '#fff',
          },
        });

        navigate('/email');
      } catch (error) {
        console.log("error",error);
        toast.error(error?.response?.data?.message || 'Registration failed. Please try again.', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#f44336',
            color: '#fff',
          },
        });
      } finally {
        setLoading(false);
      }
    };
  
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
  
  
    return (
        <>
             <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 mt-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <Spin spinning={loading} tip="Registering...">
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            className=" space-y-6"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Full Name" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="profilePic"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload a profile picture!' }]}
            >
              <Upload
                name="profilePic"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className="w-full"
                size="large"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/email" className="text-blue-600 hover:text-blue-800 font-medium">
            Login here
          </Link>
        </div>
      </div>
    </div>
        </>
    );
};

