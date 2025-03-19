import React, { useEffect, useState } from 'react';
import { useLikesStore, useThisUserStore, useUserStore } from '../utils/store';
import Feed from './Feed';

const Profile = () => {
    const [matches, setMatches] = useState([]);
    const userData = useUserStore((state) => state.userData);

    const thisUserData = useThisUserStore((state) => state.thisUserData);
    const imageArr = thisUserData.images[0].split(",");

    const setLikes = useLikesStore((state) => state.setLikes);


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




    const handleClick = (id) => {
        console.log(id)
    }

    return (
        <div className='py-4  h-screen overflow-y-hidden '>
            <div className=' flex  w-full gap-4 px-4   mb-4  '>
                {
                    matches.filter((item) => item != '').map((item, index) => (
                        < div onClick={() => {

                        }} key={index} className='h-14 w-14 border-4 border-blue-500  rounded-full  '>
                            <img className='w-full h-full object-cover rounded-full' src={item} alt="" />
                        </div>
                    ))
                }
            </div>
            <div className='flex    border-t  border-neutral-600'>

                <div className=' w-1/4 p-4   '>
                    <div className='bg-green-500     gap-4 '>


                    </div>
                </div>
                <div className=' w-3/4 border-l  overflow-y-auto  border-neutral-600   '>
                    <Feed />
                </div>
            </div>
        </div>
    );
};

export default Profile;
