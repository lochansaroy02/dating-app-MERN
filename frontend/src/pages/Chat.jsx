import axios from "axios";
import React, { useEffect } from 'react';
import { useChatStore } from "../utils/store/chatStore";
import Sidebar from "./components/chat/Sidebar";
import NoChat from "./components/chat/NoChat";
import ChatContainer from "./components/chat/ChatContainer";
import Feed from "../pages/Feed"
const Chat = () => {

    const { selectedUser } = useChatStore();



    useEffect(() => {
        // getChatUsers();
    }, [])
    return (
        <div className=' bg-neutral-800'>
            <div className="flex items-center justify-center py-4  px-4  ">
                <div className="bg-neutral-700 rounded-lg  h-[calc(100vh-8rem)] shadow-xl w-full max-w-6xl ">
                    <div className="flex  rounded-lg overflow-hidden ">
                        <Sidebar />

                        {
                            selectedUser == null ? <NoChat /> : < ChatContainer />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat