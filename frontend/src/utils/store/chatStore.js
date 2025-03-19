import { create } from 'zustand'
import toast from "react-hot-toast";
import axios from 'axios';

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (data) => ({
        selectedUser: data
    }),
    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const url = "http://localhost:3000/user/get";
            const res = await axios.get(url)
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const url = "";
            const res = axios.get(url);
            set({ message: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

}))