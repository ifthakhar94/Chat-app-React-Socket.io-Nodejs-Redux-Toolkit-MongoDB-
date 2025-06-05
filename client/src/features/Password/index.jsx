import { Button, Form, Input, Upload, Spin } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import CommonAvatar from "../../common/components/CommonAvatar";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/userSlice";
export const Password = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();
    const dispatch = useDispatch();

  useEffect(() => {
    if(!state?.data?.name){
      navigate("/email");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
    const onFinish = async (values) => {

      // console.log("state data", state?.data);
      try {
        setLoading(true);
        const payload = {
          ...values,
          userId: state?.data?._id
        }
        const regUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/check-password`;
        const response = await axios.post(regUrl, payload, {
          withCredentials: true
        });
       
        
        toast.success('Password verified successfully!', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: '#fff',
          },
        });
        
        
        if(response){
          dispatch(setToken(response?.data?.token));
          localStorage.setItem("token", response?.data?.token);
        }
        navigate('/home',
            {
                state:{
                    data:response?.data?.data
                }
            }
        );
      } catch (error) {
        // console.log("error",error);
        toast.error(error?.response?.data?.message || 'Password verification failed. Please try again.', {
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
            <CommonAvatar userId={state?.data?.id} name={state?.data?.name} imageUrl={state?.data?.imageUrl} width={100} height={100} />
          <h2 className="mt-6 mb-6 text-center  text-gray-500">
            Verify your password
          </h2>
        </div>
        <Spin spinning={loading} tip="Checking email...">
          <Form
            form={form}
            name="checkPassword"
            onFinish={onFinish}
            layout="vertical"
            className=" space-y-6"
          >

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

            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className="w-full"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        <div className="text-center mt-4">
          <span className="text-gray-600">Forgot password? </span>
          <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
            Reset password
          </Link>
        </div>
      </div>
    </div>
        </>
    );
};
