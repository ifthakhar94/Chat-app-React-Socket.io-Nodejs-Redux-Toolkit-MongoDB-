import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("user", user);

    const fetchUserDetails = async () => {
        try {
            const userUrl = `${import.meta.env.VITE_API_ENDPOINT}/api/user-details`;
            const response = await axios.get(userUrl, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            dispatch(setUser(response.data.user));
            if(response.data.logout){
                dispatch(logout());
                navigate('/email');
            }
     
        } catch (error) {
            if (error.response?.status === 401) {
                dispatch(logout());
                navigate('/email');
            }
        }
    }

    useEffect(() => {
        if (user.token) {
            fetchUserDetails();
        } else {
            navigate('/email');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.token]);

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}