import React, { useState } from "react";
import { useUserStore } from "../utils/store";
import Card from "./Card";
import { AnimatePresence } from "framer-motion";

const Feed = () => {
    const userData = useUserStore((state) => state.userData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const email = localStorage.getItem("email");

    const filteredUsers = userData ? userData.filter((item) => item.email !== email) : [];

    const handleSwipe = (direction) => {
        if (direction === "left" || direction === "right") {
            setCurrentIndex((prevIndex) => (prevIndex + 1 < filteredUsers.length ? prevIndex + 1 : 0));
        }
    };

    return (
        <div className="m-8 text-white flex justify-center items-center   ">
            <AnimatePresence>
                {filteredUsers.length > 0 ? (
                    <Card key={currentIndex} data={filteredUsers[currentIndex]} onSwipe={handleSwipe} />
                ) : (
                    <h1 className="text-xl text-center">No more users to show</h1>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Feed;
