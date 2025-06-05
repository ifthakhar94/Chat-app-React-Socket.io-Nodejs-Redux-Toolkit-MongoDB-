import { useState } from 'react';
import { Avatar as AntAvatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const Avatar = ({
    src,
    alt,
    size = 'default',
    onClick,
    className = '',
    fallbackText,
    userId,
}) => {
    const [imageError, setImageError] = useState(false);
    const onlineUsers = useSelector((state) => state.user.onlineUsers);

    const handleImageError = () => {
        setImageError(true);
    };

    const getInitials = (text) => {
        if (!text) return '?';
        return text
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const renderAvatar = () => {
        if (!imageError && src) {
            return (
                <AntAvatar
                    src={src}
                    alt={alt}
                    size={size}
                    className={className}
                    onError={handleImageError}
                />
            );
        }

        return (
            <AntAvatar
                size={size}
                className={className}
                icon={<UserOutlined />}
            >
                {fallbackText && getInitials(fallbackText)}
            </AntAvatar>
        );
    };
    const isUserOnline = onlineUsers.includes(userId);
    return (
        <Badge
            dot={isUserOnline}
            status={isUserOnline ? "success" : "default"}
            offset={[-2, 2]}
        >
            <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
                {renderAvatar()}
            </div>
        </Badge>
    );
};

export default Avatar; 