import { Button, Form, Input, Upload, Spin } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
export const CheckEmail = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  

  
    const onFinish = async (values) => {
      try {
        setLoading(true);
        const regUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/check-email`;
        const response = await axios.post(regUrl, {...values});
      
        
        toast.success('Email verified successfully!', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: '#fff',
          },
        });

        navigate('/password',
            {
                state:{
                    data:response?.data?.data
                }
            }
        );
      } catch (error) {
        console.log("error",error);
        toast.error(error?.response?.data?.message || 'Email verification failed. Please try again.', {
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

  
  
    return (
        <>
             <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 mt-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
        </div>
        <Spin spinning={loading} tip="Checking email...">
          <Form
            form={form}
            name="checkEmail"
            onFinish={onFinish}
            layout="vertical"
            className=" space-y-6"
          >


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

            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className="w-full"
                size="large"
              >
                Let's go
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Register
          </Link>
        </div>
      </div>
    </div>
        </>
    );
};
