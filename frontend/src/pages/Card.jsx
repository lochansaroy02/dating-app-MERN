
import axios from "axios";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useProfileStore, useThisUserStore } from "../utils/store";

const Card = ({ data, onSwipe }) => {
    const user = data;
    const setThisUserData = useThisUserStore((state) => state.setThisUserData);
    const imageArr = data.images[0].split(",");
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();
    const { setProfileData } = useProfileStore();
    const thisUserData = useThisUserStore.getState().thisUserData;
    const navigate = useNavigate();


    const handleLikes = async (userId) => {
        const likerId = thisUserData?._id;

        if (!likerId) {
            console.error("Liker ID is missing");
            return;
        }

        try {
            const response = await axios.put(import.meta.env.VITE_API_URL + `/user/likes/${userId}`, { likerId });

            toast.success("Liked");
            setThisUserData(response?.data?.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageArr.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imageArr.length - 1 ? 0 : prevIndex + 1));
    };

    // Bumble-like swipe effect with rotation
    const handleSwipe = (direction) => {
        const rotateValue = direction === "right" ? 20 : -30;
        const xValue = direction === "right" ? 500 : -500;

        controls
            .start({
                x: xValue,
                rotate: rotateValue,
                opacity: 0,
                transition: { duration: 0.35, ease: "easeInOut" },
            })
            .then(() => onSwipe(direction));
        console.log("swipe")
    };

    // Handle keyboard swipes
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                handleSwipe("left");
            } else if (event.key === "ArrowRight") {
                handleSwipe("right");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);



    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/user/delete/${id}`)
            const data = await response.data;
            console.log(data);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <motion.div
            className=" h-screen  justify-center"
            drag="x"
            dragConstraints={{ left: -50, right: 50 }}
            onDragEnd={(event, info) => {
                if (info.offset.x > 100) {
                    handleSwipe("right");
                } else if (info.offset.x < -100) {
                    handleSwipe("left");
                }
            }}
            animate={controls}
            initial={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0 }}
        >


            <div className="h-3/4 cursor-pointer w-80 relative overflow-hidden rounded-lg border border-neutral-500">
                <div
                    className="flex w-full h-full   transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {imageArr.map((item, index) => {
                        const link = item === '' ? null : item;
                        return <img key={index} className="h-full w-full object-cover shrink-0" src={link} alt="no image found" />
                    }
                    )}
                    <div onClick={() => {
                        setProfileData(user)
                        navigate("/profile")
                    }} className="h-3/4 w-[70%] left-12  justify-center flex items-center  absolute">

                    </div>
                </div>


                <button onClick={handlePrev} className="absolute top-1/2 left-2 cursor-pointer transform -translate-y-1/2 bg-neutral-700 text-white p-2 rounded-full hover:bg-neutral-900 transition">
                    <ArrowLeft />
                </button>

                <button onClick={handleNext} className="absolute top-1/2 right-2 cursor-pointer transform -translate-y-1/2 bg-neutral-700 text-white p-2 rounded-full hover:bg-neutral-900 transition">
                    <ArrowRight />
                </button>

                <div className="absolute bottom-0 h-1/4 items-center  px-4 backdrop-blur-lg pt-4 rounded-xl   left-4 border  flex  w-[90%]   justify-between ">

                    <div>

                        <h1 className="text-white text-2xl">
                            {data.name}, <span>{data.age}</span>
                        </h1>
                        <h1 className="text-neutral-50 text-xl">{data.gender}</h1>
                    </div>


                    <div>

                        <button onClick={() => handleLikes(data._id)} className="bg-red-800 border-2 border-red-600 px-4 py-1 text-lg rounded-full">
                            Like
                        </button>
                    </div>
                    {/* <button onClick={() => handleDelete(data._id)} className="bg-red-800 border-2 border-red-600 px-4 py-1 text-lg rounded-full">
                        delete
                    </button> */}
                </div>
                <Toaster position="top-right" />
            </div>
        </motion.div >
    );
};

export default Card;
