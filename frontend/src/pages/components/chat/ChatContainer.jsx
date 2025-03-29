import React, { useEffect, useRef } from 'react';
import { useThisUserStore } from '../../../utils/store';
import { useChatStore } from '../../../utils/store/chatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

const ChatContainer = () => {
    const { messages = [], selectedUser, unSubscribeFromMessage, isMessagesLoading, setIsMessagesLoading, getMessages } = useChatStore();
    const { thisUserData } = useThisUserStore();
    const messageEndRef = useRef(null);
    useEffect(() => {
        const subscribe = useChatStore.getState().subscribeToMessage;
        subscribe();
        return () => unSubscribeFromMessage();
    }, []);





    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
        }



    }, [selectedUser?._id, getMessages, unSubscribeFromMessage]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const formatMessageTime = (date) => {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        return d.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata',
        });
    };

    return (
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)]   .no-scrollbar overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <p className="text-center text-gray-500">No messages yet.</p>
                )}

                {messages?.map((message, index) => {
                    const isSender =
                        message.senderId.toString() === thisUserData._id.toString();

                    const profileImage = isSender
                        ? thisUserData?.images?.[0]?.split(',')[0]?.trim() || '/avatar.png'
                        : selectedUser?.images?.[0]?.split(',')[0]?.trim() || '/avatar.png';

                    return (
                        <div
                            key={index}
                            className={`chat ${!isSender ? 'chat-end' : 'chat-start'}`}
                            ref={index === messages.length - 1 ? messageEndRef : null}
                        >
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img src={profileImage} alt="profile" />
                                </div>
                            </div>
                            <div className="chat-header mb-1">
                                <h1 className="text-xs opacity-50 ml-1">
                                    {formatMessageTime(message.createdAt)}
                                </h1>
                            </div>
                            <div className="chat-bubble">
                                {message.text && <p>{message.text}</p>}
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="sent-img"
                                        className="mt-2 rounded max-w-xs max-h-60"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
