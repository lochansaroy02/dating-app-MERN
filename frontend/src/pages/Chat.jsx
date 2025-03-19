import axios from "axios";
import React, { useEffect } from 'react';
import { useChatStore } from "../utils/store/chatStore";
import Sidebar from "./components/chat/Sidebar";
import NoChat from "./components/chat/NoChat";
import ChatContainer from "./components/chat/ChatContainer";

const Chat = () => {

    const { selectedUser } = useChatStore();



    useEffect(() => {
        // console.log(localStorage.getItem("token"))
        // getChatUsers();
    }, [])
    return (
        <div className='h-screen bg-neutral-800'>
            <div className="flex items-center justify-center pt-20 px-4  ">
                <div className="bg-neutral-700 rounded-lg  shadow-xl w-full max-w-6xl h-[calc(100vh-8rem )]">
                    <div className="flex h-full rounded-lg overflow-hidden ">
                        <Sidebar />
                        {
                            !selectedUser ? <NoChat /> : <ChatContainer />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat