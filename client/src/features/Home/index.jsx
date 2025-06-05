import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setOnlineUsers, setSocketConnection, setToken, setUser } from "../../redux/slices/userSlice";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import logo from "../../assets/logo.png";
import { io } from "socket.io-client";
export const Home = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(setToken(token));
            fetchUserDetails();
        } else {
            navigate('/email');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // socket connection
    useEffect(() => {
        if (!user.token) return;
        
        const socketConnection = io(import.meta.env.VITE_API_ENDPOINT, {
            auth: {
                token: user.token
            }
        });

        socketConnection.on("onlineUsers", (data) => {
            dispatch(setOnlineUsers(data));
        });

        dispatch(setSocketConnection(socketConnection));

        return () => {
            socketConnection.disconnect();
        }
    }, [user.token]);

    const basePath = location.pathname == "/"
    return (
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
           <Sidebar/>
        </section>

        {/**message component**/}
        <section className={`${basePath && "hidden"}`} >
            <Outlet/>
        </section>


        <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
    </div>
    )
}