import { Modal, Input, List, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../common/components/Avatar';
export const SearchUser = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const searchUsers = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/api/search-user`,
                { search: query },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            setSearchResults(response.data.users || []);
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = debounce(searchUsers, 500);

    useEffect(() => {
        debouncedSearch(searchQuery);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Modal
            title="Search Users"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={500}
        >
            <div className="space-y-4">
                <Input
                    placeholder="Search users..."
                    prefix={<SearchOutlined />}
                    onChange={handleSearch}
                    value={searchQuery}
                    size="large"
                />
                
                <Spin spinning={loading}>
                    <List
                        itemLayout="horizontal"
                        dataSource={searchResults}
                        renderItem={(user) => (
                            <List.Item
                                className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                                onClick={() => {
                                    // Handle user selection here
                                    onClose();
                                    navigate(`/${user._id}`);
                                }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={user.profile_pic}
                                            alt={user.name}
                                            userId={user._id}
                                        >
                                            {user.name?.charAt(0)}
                                        </Avatar>
                                    }
                                    title={user.name}
                                    description={user.email}
                                />
                            </List.Item>
                        )}
                    />
                </Spin>
            </div>
        </Modal>
    );
};