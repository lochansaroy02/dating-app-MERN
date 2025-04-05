import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from "../../../images/avatar.png";
import { useSocketStore } from '../../../utils/store';
import { useChatStore } from '../../../utils/store/chatStore';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUser } = useSocketStore();
    const navigate = useNavigate();
    return (
        <div className='border-b border-neutral-300 top-14 fixed  z-40 w-full lg:w-3/4  bg-neutral-800  justify-between  items-center  p-2  flex  '>
            <div className='flex  gap-2 items-center'>

                <div className='w-10 h-10 bg-neutral-900  border rounded-full'>

                    <img className='rounded-full w-full h-full object-cover' src={selectedUser.images[0].split(",")[0].trim() === ""
                        ? avatar
                        : selectedUser.images[0].split(",")[0]} alt="" />
                </div>
                <div>
                    <h1 className='text-base'>{selectedUser?.name}</h1>
                    {onlineUser.includes(selectedUser._id) && <h2 className='text-xs text-green-500 '>online</h2>
                    }
                </div>
            </div>
            <div onClick={() => {

                setSelectedUser(null)

                if (window.innerWidth < 768) {
                    navigate("/messages")
                }

            }

            } className='bg-neutral-900 h-6 w-6 cursor-pointer flex items-center justify-center  rounded-full  '>
                <button className='text-sm'>X</button>
            </div>

        </div>
    )
}

export default ChatHeader