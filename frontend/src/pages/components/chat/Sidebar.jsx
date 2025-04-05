import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import avatar from "../../../images/avatar.png";
import { useLikesStore, useSocketStore, useThisUserStore, useUserStore } from "../../../utils/store";
import { useChatStore } from "../../../utils/store/chatStore";
import SidebarSkeleton from "../../skeletons/SidebarSkeleton";
const Sidebar = () => {
    const [matches, setMatches] = useState([]);
    const likes = useLikesStore((state) => state.likes);
    const likesID = likes.map((item) => item._id)
    const thisUserData = useThisUserStore((state) => state.thisUserData);
    const [userLoading, setUserLoading] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const { onlineUser } = useSocketStore()
    const { messages, users, selectedUser, isUserLoading, isMessagesLoading, setSelectedUser, getUsers } = useChatStore();
    const userData = useUserStore((state) => state.userData);
    const navigate = useNavigate()
    const setLikes = useLikesStore((state) => state.setLikes);


    const [showOnlineOnly, setShowOnlineOnly] = useState(false);


    useEffect(() => {
        getUsers();
    }, []);




    const handleSelect = (user) => {

        setSelectedUser(user);

        if (window.innerWidth < 768) {
            navigate(`/messages/${user._id}`);
        }
    }


    const getMatchedQueue = () => {
        if (!thisUserData || !userData) return; // Avoid errors if data is not available

        const ids = thisUserData.likes || [];
        const likes = userData?.filter(user => ids.includes(user._id)) || [];
        setLikes(likes);
        const queue = likes.map((item) => {
            const imageAr = item.images[0].split(',');
            return imageAr;
        });
        const firstElements = queue.map(subArray => subArray[0]); // Extract first elements
        setMatches(firstElements);
    }
    useEffect(() => {
        getMatchedQueue();

    }, [userData, thisUserData]);
    if (userLoading) return <SidebarSkeleton />;

    return (
        <aside className="lg:w-72 border-r lg:fixed  h-full w-full no-scrollbar   border-base-300   lg:flex flex-col transition-all duration-200">
            {/* <div className=' lg:flex hidden  bg-red-400 gap-4 px-4 overflow-x-scroll   overflow-y-hidden p-6  '>
                {
                    matches.filter((item) => item != '').map((item, index) => (
                        < div onClick={() => {

                        }} key={index} className='h-10 w-10 border-4 border-blue-500  rounded-full  '>
                            <img className='w-full h-full object-cover rounded-full' src={item} alt="" />
                        </div>
                    ))
                }
            </div> */}
            <div className="overflow-y-auto  px-4   gap-2 py-16     flex flex-col    w-full lg:py-3">
                {
                    users && users?.data?.filter((user) => user._id !== thisUserData?._id)?.map((item, index) => (

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
