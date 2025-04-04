import { io } from 'socket.io-client';
import { create, } from 'zustand';
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_API_URL
export const useImageStore = create((set) => ({
    imageData: [],
    setImageData: (data) => set({ imageData: data }),
}));

export const useUserStore = create((set) => ({
    userData: null,
    setUserData: (data) => set({ userData: data }),
}));

export const useThisUserStore = create(
    persist(
        (set) => ({
            thisUserData: null,
            setThisUserData: (data) => set({ thisUserData: data }),
        }),
        {
            name: "user-storage", // Key for localStorage
        }
    )
);
export const useProfileStore = create(
    persist(
        (set) => ({
            profileData: null,
            setProfileData: (data) => set({ profileData: data }),
        }),
        {
            name: "user-storage", // Key for localStorage
        }
    )
);

export const useEmailStore = create((set) => ({
    userEmail: null,
    setUserEmail: (data) => set({ userData: data }),
}));
export const useIsLoggedStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (data) => set({ isLoggedIn: data }),
}));


export const useLikesStore = create((set) => ({
    likes: [],
    setLikes: (data) => set({
        likes: data
    })
}))

export const useSocketStore = create((set, get) => ({
    socket: null,
    authUser: null,
    onlineUser: [],
    setAuthUser: (data) => set({
        authUser: data
    }),
    setSocket: (data) => set({
        socket: data
    }),
    connectSocket: () => {

        const { authUser } = get();

        // check for auth only auth user connect to application

        const socket = io(BASE_URL,
            // here I need to add thisUser.UserID or create  a authUser store
            {
                query: {
                    userId: authUser?._id
                }
            })
        socket.connect();
        set({ socket: socket })
        socket.on("getOnlineUsers", (userId) => {
            set({ onlineUser: userId })
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}))
