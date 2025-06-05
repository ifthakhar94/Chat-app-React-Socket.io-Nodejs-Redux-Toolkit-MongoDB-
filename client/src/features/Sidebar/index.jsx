import { IoLogoWechat } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Avatar from "../../common/components/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { EditProfile } from "../EditProfile";
import { setUser } from "../../redux/slices/userSlice";
import { Divider } from "antd";
import { SearchUser } from "../SearchUser";

export const Sidebar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const handleUpdateUser = (updatedUser) => {
        dispatch(setUser(updatedUser));
    };

    return (
        <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
            <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
                <div>
                <NavLink to="/" className={({isActive}) =>  `w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded ${!isActive && "bg-slate-200"}`} title="Chat">
                    <IoLogoWechat size={25} />
                </NavLink>
                <div onClick={() => setOpenSearchUser(true)} className={`w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded`} title="Add New">
                    <FaUserPlus size={25} />
                </div>
                </div>

                <div>
                    <button className="w-12 h-12 flex items-center justify-center">
                        <Avatar 
                            size="default"
                            alt={user.name}
                            isOnline={true}
                            fallbackText={user.name}
                            onClick={() => setIsEditModalOpen(true)}
                            src={user.profile_pic}
                            userId={user._id}
                        />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded">
                        <MdLogout size={25} />
                    </button>
                </div>
            </div>
            <div className="w-full">
                <div className="h-16 flex items-center">
                    <h2 className="text-xl font-bold p-4 text-slate-800">Messages</h2>
                </div>
                <Divider />
                <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
                  {
                    allUsers.length === 0 && (
                        <div className="mt-16">
                            <p className="text-slate-500 text-center">No users found</p>
                        </div>
                    )
                  }
                </div>
            </div>

            <EditProfile 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userData={user}
                onUpdate={handleUpdateUser}
            />
            <SearchUser 
                isOpen={openSearchUser}
                onClose={() => setOpenSearchUser(false)}
            />
        </div>
    )
}