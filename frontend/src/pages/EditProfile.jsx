import React, { useState } from 'react';
import { useThisUserStore } from '../utils/store';
import axios from 'axios';

const EditProfile = () => {


    const [isEditing, setIsEditing] = useState(false);
    const { thisUserData, setThisUserData } = useThisUserStore();
    const [formData, setFormData] = useState({
        name: thisUserData?.name || '',
        age: thisUserData?.age || '',
        email: thisUserData?.email || '',
        gender: thisUserData?.gender || '',
        relationship: thisUserData?.relationship || '',
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = thisUserData?.images[0];
            if (image) {
                const formDataImg = new FormData();
                formDataImg.append('file', image);
                formDataImg.append('upload_preset', 'your_upload_preset'); // Cloudinary upload preset

                const imgResponse = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formDataImg);
                imageUrl = imgResponse.data.secure_url;
            }

            const updatedUserData = { ...formData, images: [imageUrl] };
            const response = await axios.patch(`http://localhost:3000/user/update/${thisUserData._id}`, updatedUserData);
            setThisUserData(response.data.data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen flex flex-col  '>
            {/* <h2 className='text-2xl font-bold mb-4'>Edit Profile</h2> */}

            {isEditing ? <div>

            </div> :

                <form onSubmit={handleSubmit} className='w-full max-w-md shadow-md rounded-lg p-6'>
                    <label className='block mb-2'>Name</label>
                    <input type='text' name='name' value={formData.name} onChange={handleChange} className='w-full p-2 border rounded mb-4' required />

                    <label className='block mb-2'>Age</label>
                    <input type='number' name='age' value={formData.age} onChange={handleChange} className='w-full p-2 border rounded mb-4' required />

                    <label className='block mb-2'>Email</label>
                    <input type='email' name='email' value={formData.email} onChange={handleChange} className='w-full p-2 border rounded mb-4' required disabled />

                    <label className='block mb-2'>Gender</label>
                    <select name='gender' value={formData.gender} onChange={handleChange} className='w-full p-2 border rounded mb-4'>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>

                    <label className='block mb-2'>Relationship Status</label>
                    <select name='relationship' value={formData.relationship} onChange={handleChange} className='w-full p-2 border rounded mb-4'>
                        <option value='single'>Single</option>
                        <option value='long-term'>Long-Term</option>
                        <option value='casual'>Casual</option>
                    </select>

                    <label className='block mb-2'>Profile Image</label>
                    <input type='file' onChange={handleImageChange} className='w-full p-2 border rounded mb-4' />

                    <button type='submit' disabled={loading} className='w-full bg-blue-500 text-white p-2 rounded'>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>}



        </div>
    );
};

export default EditProfile;