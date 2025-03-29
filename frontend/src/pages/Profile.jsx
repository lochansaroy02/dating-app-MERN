import React, { useEffect, useState } from 'react';
import { useLikesStore, useThisUserStore, useUserStore } from '../utils/store';
import Feed from './Feed';
import Sidebar from './components/chat/Sidebar';
import { useChatStore } from '../utils/store/chatStore';
import ChatContainer from './components/chat/ChatContainer';

const Profile = () => {

    const thisUserData = useThisUserStore((state) => state.thisUserData);
    const imageArr = thisUserData.images[0].split(",");







    const handleClick = (id) => {
        console.log(id)
    }
    const { selectedUser } = useChatStore();


    return (
        <div className='py-4   overflow-y-hidden '>

            <div className='flex    border-t  border-neutral-600'>

                <div className=' w-1/4 p-4   '>
                    <div className='gap-4 '>
                        <Sidebar />
                    </div>
                </div>
                <div className=' w-3/4 border-l  overflow-y-auto  border-neutral-600   '>
                    {
                        selectedUser == null ? <Feed /> : < ChatContainer />
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;
