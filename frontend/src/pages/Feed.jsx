import axios from 'axios';
import React, { useEffect } from 'react';
import { useThisUserStore, useUserStore } from '../utils/store';
import Card from './Card';

const Feed = () => {
    const userData = useUserStore((state) => state.userData);
    const setUserData = useUserStore((state) => state.setUserData);

    const email = localStorage.getItem('email');
    useEffect(() => {
        // console.log(email);
    }, []);


    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/get');
            const data = await response.data;
            setUserData(data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };



    const handleLikes = async (userId) => {
        const thisUserData = useThisUserStore.getState().thisUserData;
        const likerId = thisUserData?.data?._id;
        console.log(likerId, " ", userId);
        if (!likerId) {
            console.error("Liker ID is missing");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:3000/user/likes/${userId}`, { likerId });
            console.log("Like response:", response.data);
            useThisUserStore.setState((state) => ({
                thisUserData: {
                    ...state.thisUserData,
                    likes: [...state.thisUserData.likes, userId],
                }
            }));
            console.log(data);
        } catch (error) {
            console.error('Error liking user:', error);
        }
    }



    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="m-8  text-white">

            <div className='w-fit grid grid-cols-3 gap-4'>

                {userData &&
                    userData.filter((item) => item.email !== email).map((user, index) => (

                        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-lg">

                            <div>

                                <div>
                                    <h2 className="text-lg font-bold">{user.name}</h2>
                                    <p>Age: {user.age}</p>
                                    <p>Relationship: {user.relationship}</p>
                                </div>



                                {/* Ensure images exist and are properly formatted */}
                                {user.images.length > 0 && (
                                    <div className="flex gap-4 mt-2">
                                        {user.images[0].split(',').map((imgSrc, imgIndex) => (
                                            <img key={imgIndex} src={imgSrc} alt={`Profile ${imgIndex}`} className="w-24 h-24 object-cover rounded-md" />
                                        ))}
                                    </div>
                                )}
                            </div>


                            <div>
                                <button onClick={() => { handleLikes(user._id) }} className='px-2 py-1  rounded-lg border-2 border-red-900 bg-red-400 mt-2 '> like</button>
                            </div>
                        </div>



                    ))}
            </div>
        </div>
    );
};

export default Feed;
