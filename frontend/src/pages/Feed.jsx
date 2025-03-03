import axios from 'axios';
import React, { useEffect } from 'react';
import { useUserStore } from '../utils/store';

const Feed = () => {
    const userData = useUserStore((state) => state.userData);
    const setUserData = useUserStore((state) => state.setUserData);

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/get');
            const data = await response.data;
            setUserData(data.data);
            console.log('Users:', data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/user/delete/:${id}`);
            const data = await response.data;
            setUserData(data.data);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="m-8  text-white">

            <div className='w-fit grid grid-cols-3 gap-4'>

                {userData &&
                    userData.map((user, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-lg">
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
                            <div>
                                <button onClick={() => deleteUser(user._id)} className='px-2 py-1  rounded-lg border-2 border-red-900 bg-red-400 mt-2 '> delete </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Feed;
