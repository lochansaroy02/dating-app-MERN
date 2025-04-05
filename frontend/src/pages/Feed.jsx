import React, { useEffect, useState } from "react";
import { useThisUserStore, useUserStore } from "../utils/store";
import Card from "./Card";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

const Feed = () => {

    const { setUserData, userData } = useUserStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const email = localStorage.getItem("email");

    const filteredUsers = userData ? userData.filter((item) => item.email !== email) : [];
    const apiUrl = import.meta.env.VITE_API_URL;

    const getUser = async () => {
        try {
            const response = await axios.get(apiUrl + '/user/get');
            const data = await response.data;
            setUserData(data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const handleSwipe = (direction) => {
        if (direction === "left" || direction === "right") {
            setCurrentIndex((prevIndex) => (prevIndex + 1 < filteredUsers.length ? prevIndex + 1 : 0));
        }
    };
    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className="pt-16  text-white flex  justify-center items-center   ">
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
