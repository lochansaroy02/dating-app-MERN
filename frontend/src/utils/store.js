import { create, } from 'zustand';
import { persist } from "zustand/middleware";

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

export const useEmailStore = create((set) => ({
    userEmail: null,
    setUserEmail: (data) => set({ userData: data }),
}));
export const useIsLoggedStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (data) => set({ isLoggedIn: data }),
}));
