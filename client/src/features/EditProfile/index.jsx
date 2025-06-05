import { Button, Form, Input, Upload, Modal, Spin } from "antd";
import { UserOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import uploadFile from "../../../helpers/uploadFile";
import axios from "axios";
import toast from 'react-hot-toast';
import Avatar from "../../common/components/Avatar";
export const EditProfile = ({ isOpen, onClose, userData, onUpdate }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState(userData?.profile_pic || null);

    const fetchUserDetails = async () => {
        try {
            const userUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/user-details`;
            const response = await axios.get(userUrl, {
                withCredentials: true
            });
            onUpdate(response.data.user);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

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
            const updateUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/update-user`;
            const response = await axios.post(updateUrl, {
                ...values,
                profile_pic: userProfilePic
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });


            // Check if response exists and has data
            if (response?.data) {
                toast.success('Profile updated successfully!', {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#4CAF50',
                        color: '#fff',
                    },
                });

                // Refetch user details to get the latest data
                await fetchUserDetails();
                onClose();
                form.resetFields();
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error?.response?.data?.message || 'Update failed. Please try again.', {
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
        <Modal
            title="Edit Profile"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={500}
        >
            <Spin spinning={loading} tip="Updating...">
                <div className="flex flex-col items-center mb-6">
                    <Avatar 
                        size={100} 
                        src={userProfilePic || userData?.profile_pic}
                        icon={<UserOutlined />}
                    />
                    <p className="mt-2 text-gray-500">Current Profile Picture</p>
                </div>
                <Form
                    form={form}
                    name="editProfile"
                    onFinish={onFinish}
                    layout="vertical"
                    className="space-y-6"
                    onValuesChange={onValuesChange}
                    initialValues={{
                        name: userData?.name,
                        email: userData?.email,
                    }}
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
                        name="profilePic"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="profilePic"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Change Profile Picture</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className="w-full"
                            size="large"
                        >
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}; 