import { create } from 'zustand';

export const useImageStore = create((set) => ({
    imageData: [],
    setImageData: (data) => set({ imageData: data }),
}));

export const useUserStore = create((set) => ({
    userData: null,
    setUserData: (data) => set({ userData: data }),
}));
export const useEmailStore = create((set) => ({
    userEmail: null,
    setEmail: (data) => set({ userData: data }),
}));
export const useIsLoggedStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (data) => set({ isLoggedIn: data }),
}));
