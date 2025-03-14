import axios from 'axios';
import React from 'react';
import { useThisUserStore } from '../utils/store';
import toast, { Toaster } from 'react-hot-toast';



const Card = ({ data }) => {


    const setThisUserData = useThisUserStore((state) => state.setThisUserData);


    const handleLikes = async (userId) => {
        const thisUserData = useThisUserStore.getState().thisUserData;
        const likerId = thisUserData?._id;

        if (!likerId) {
            console.error("Liker ID is missing");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/user/likes/${userId}`, { likerId });

            // setThisUserData(response.data);
            // Update the local state to reflect the like action
            toast.success("Liked", {

            })
            setThisUserData(response?.data?.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const imageArr = data.images[0].split(",")
    return (
        <div className=' h-screen  relative '>

            <div className='h-3/4    w-72 absolute  inset-0 '>
                {
                    imageArr.map((item, index) => (
                        <div key={index} className={` h-full w-full  rounded-lg  absolute  border border-neutral-500  `} >
                            <img className='h-full  rounded-lg w-full object-cover' src={item} alt="" />
                        </div>
                    ))
                }

                <div className=' absolute bottom-4 flex  items-center   w-3/4 px-2   justify-between left-4'>

                    <h1 className='text-white text-2xl  '>{data.name},
                        <span>{data.age}</span>
                    </h1>

                    <button onClick={() => {
                        handleLikes(data._id)
                    }} className='bg-red-800 border-2  border-red-600   px-4 py-1 text-lg rounded-full '>Like</button>
                </div>
                <Toaster position='top-right' />
            </div>
        </div >
    )
}

export default Card