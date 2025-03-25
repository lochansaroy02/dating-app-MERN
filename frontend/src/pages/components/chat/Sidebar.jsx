import { useEffect, useState } from "react";

import { Users } from "lucide-react";
import { useLikesStore, useSocketStore, useThisUserStore } from "../../../utils/store";
import { useChatStore } from "../../../utils/store/chatStore";
import SidebarSkeleton from "../../skeletons/SidebarSkeleton";
import avatar from "../../../images/avatar.png"
const Sidebar = () => {
    const likes = useLikesStore((state) => state.likes);
    const thisUserData = useThisUserStore((state) => state.thisUserData);
    const [userLoading, setUserLoading] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const { onlineUser } = useSocketStore()
    const { messages, users, selectedUser, isUserLoading, isMessagesLoading, setSelectedUser, getUsers, getMessages, } = useChatStore();

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);


    console.log(onlineUser);

    useEffect(() => {
        getUsers();
    }, []);




    const handleSelect = (user) => {
        setSelectedUser(user);
    }


    if (userLoading) return <SidebarSkeleton />;

    return (
        <aside className=" h-[calc(100vh-8rem)]  w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* TODO: Online filter toggle */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        {/* <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        /> */}
                        <span className="text-sm">Show online only</span>
                    </label>
                </div>
            </div>

            <div className="overflow-y-auto no-scrollbar p-4 gap-2  flex flex-col    w-full py-3">
                {
                    users && users?.data?.filter((user) => user._id !== thisUserData._id)?.map((item, index) => (

                        <div key={index} onClick={() => handleSelect(item)} className="flex gap-2   cursor-pointer items-center ">
                            <div className="h-14 w-14 relative bg-neutral-900  rounded-full">
                                <img className="h-full w-full object-cover rounded-full" src={
                                    item.images[0].split(",")[0].trim() === ""
                                        ? avatar
                                        : item.images[0].split(",")[0]
                                } alt="no image " />
                                {onlineUser.includes(item._id) && < span className="size-2 rounded-full  bg-green-400 absolute bottom-0 right-0" />}
                            </div>
                            <h1>
                                {item.name}
                            </h1>
                        </div>
                    ))
                }
            </div>
        </aside>
    )

};
export default Sidebar;


/*
    1. sidebar ke ander liked and likedBy arrays hi aayenge . for now use only likes
    2. fix the funtionlity


*/
