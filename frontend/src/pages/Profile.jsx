import React, { useEffect } from 'react';
import { useThisUserStore } from '../utils/store';

const Profile = () => {
    const thisUserData = useThisUserStore((state) => state.thisUserData);
    useEffect(() => {
        console.log(thisUserData)
    }, [thisUserData]);

    return (
        <div className='m-4 h-screen'>
            <h2>Profile</h2>
            {thisUserData ? (
                <div>
                    <p>Name: {thisUserData.data.name}</p>
                    <p>Age: {thisUserData.data.age}</p>
                    <p>Email: {thisUserData.data.email}</p>
                    {
                        thisUserData.data.images && thisUserData.data.images.map((image, index) => (
                            <img key={index} src={image} alt={image.url} style={{ width: '100px', height: '100px' }} />
                        ))
                    }
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
