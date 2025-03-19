import axios from "axios";
import React, { useState, useEffect } from "react";
import { useThisUserStore } from "../utils/store";
import toast, { Toaster } from "react-hot-toast";
import { motion, useAnimation } from "framer-motion";

const Card = ({ data, onSwipe }) => {
    const setThisUserData = useThisUserStore((state) => state.setThisUserData);
    const imageArr = data.images[0].split(",");
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();

    const handleLikes = async (userId) => {
        const thisUserData = useThisUserStore.getState().thisUserData;
        const likerId = thisUserData?._id;

        if (!likerId) {
            console.error("Liker ID is missing");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/user/likes/${userId}`, { likerId });

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

    return (
        <motion.div
            className="   h-screen justify-center"
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
            <div className="h-3/4  w-80 relative overflow-hidden rounded-lg border border-neutral-500">
                <div
                    className="flex w-full h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {imageArr.map((item, index) => {
                        const link = item === '' ? null : item;
                        return <img key={index} className="h-full w-full object-cover shrink-0" src={link} alt="no image found" />
                    }
                    )}
                </div>

                {/* Navigation Buttons */}
                <button onClick={handlePrev} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900 transition">
                    ◀
                </button>

                <button onClick={handleNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900 transition">
                    ▶
                </button>

                {/* Bottom section */}
                <div className="absolute bottom-4 flex items-center w-3/4 px-2 justify-between left-4">
                    <h1 className="text-white text-2xl">
                        {data.name}, <span>{data.age}</span>
                    </h1>
                    <button onClick={() => handleLikes(data._id)} className="bg-red-800 border-2 border-red-600 px-4 py-1 text-lg rounded-full">
                        Like
                    </button>
                </div>
                <Toaster position="top-right" />
            </div>
        </motion.div>
    );
};

export default Card;
