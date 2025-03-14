import React, { useEffect } from 'react';
import { useThisUserStore, useUserStore } from '../utils/store';

const Profile = () => {
    const userData = useUserStore((state) => state.userData);

    const thisUserData = useThisUserStore((state) => state.thisUserData);
    const imageArr = thisUserData.images[0].split(",");


    useEffect(() => {
        console.log(userData)

    }, [])


    return (
        <div className='m-4 h-screen'>
            <h2>Profile</h2>
            {thisUserData ? (
                <div className='flex  flex-col  '>
                    <p className='text-2xl'>Name: {thisUserData.name}</p>
                    <p>Age: {thisUserData.age}</p>
                    <p>Email: {thisUserData.email}</p>

                    <div className='grid grid-cols-10'>
                        {
                            imageArr && imageArr.map((image, index) => (
                                <div key={index} className='h-32 w-32   '>
                                    <img key={index} src={image} alt={image.url} />
                                </div>
                            ))
                        }
                    </div>

                    {/* <div className=' '>
                        {
                            thisUserData.likes && thisUserData.likes.map((item, index) => (
                                <div >
                                    <h1>{item}</h1>
                                </div>
                            ))
                        }
                    </div> */}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
