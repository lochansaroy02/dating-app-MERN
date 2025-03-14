import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useImageStore, useThisUserStore } from "../utils/store";
import ImageUpload from './ImageUpload';
import toast from "react-hot-toast";

const CreateProfile = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [relationship, setRelationship] = useState("");
    const [religion, setReligion] = useState("");
    const [likedBy, setLikedBy] = useState([])
    const [likes, setLikes] = useState([])




    const navigate = useNavigate();

    const setThisUserData = useThisUserStore((state) => state.setThisUserData);


    const imageData = useImageStore((state) => state.imageData);

    const url = "https://mfiles.alphacoders.com/109/109987.jpg"

    const handleSubmit = async (e, files) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("relationship", relationship);
        formData.append("religion", religion);
        formData.append("email", localStorage.getItem('email'));
        formData.append("images", imageData);


        try {
            const response = await axios.post("http://localhost:3000/user/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("profile created!")

            setThisUserData(response?.data?.data);
            console.log(response?.data?.data);
            navigate("/feed");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create profile");
        } finally {
            setName("");
            setAge("");
            setGender("");
            setRelationship("");
            setReligion("");
            setEmail("");
        }
    };

    useEffect(() => {
        setEmail(localStorage.getItem('email'));
    }, [])


    return (
        <div className='h-screen flex flex-col mt-8  bg-neutral-900 '>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-white text-center">
                Create Your Profile
            </h1>
            <div className='flex '>

                <div className='w-1/2 px-16   text-white '>
                    <div className="  grid grid-cols-2 m-12 gap-4  -mt-12  ">
                        <div className="flex flex-col gap-4">
                            <div className="row-span-2 w-[200px] h-[80px] bg-transparent">

                            </div>
                            <img className="w-[300px] h-[300px] object-cover rounded-xl" src={url} />
                            <img className="w-[300px] h-[300px] object-cover rounded-xl" src={url} />
                        </div>
                        <div className="flex flex-col gap-4">

                            <img className="w-[300px] h-[300px] object-cover rounded-xl" src={url} />
                            <img className="w-[300px] h-[300px] object-cover rounded-xl" src={url} />
                            <div className="w-[200px] h-[80px] row-span-2 bg-transparent">
                            </div>
                        </div>
                    </div>

                </div>
                <form className="space-y-4 h-fit   mt-4 w-1/2 p-8 rounded-lg bg-neutral-800  mr-4   " onSubmit={handleSubmit}>

                    <div className='flex flex-col  justify-between'>


                        <div>
                            <label className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        {/* <div>
                            <label className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div> */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Age</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                                className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}
                                className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>






                        <div>
                            <label className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Type of Relationship</label>
                            <select value={relationship} onChange={(e) => setRelationship(e.target.value)}
                                className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                <option value="">Select Relationship Type</option>
                                <option value="long-term">Long term</option>
                                <option value="casual">Fun and casual</option>
                                <option value="life-partner">Life partner</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Religion</label>
                            <select value={religion} onChange={(e) => setReligion(e.target.value)}
                                className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                <option value="">Select Religion</option>
                                <option value="hindu">Hindu</option>
                                <option value="muslim">Muslim</option>
                                <option value="sikh">Sikh</option>
                                <option value="christian">Christian</option>
                                <option value="jain">Jain</option>
                                <option value="buddhist">Buddhist</option>
                            </select>
                        </div>
                        <ImageUpload />



                    </div>
                    <div>
                        <button type="submit"
                            className="w-full bg-neutral-600 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Submit
                        </button>

                    </div>
                </form>


            </div>

        </div >
    );
};

export default CreateProfile;
