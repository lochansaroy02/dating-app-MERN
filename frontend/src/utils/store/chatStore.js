import axios from 'axios';
import toast from "react-hot-toast";
import { create } from 'zustand';
import { useSocketStore } from '../store';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    setIsMessagesLoading: (data) => set({
        isMessagesLoading: data
    }),

    setSelectedUser: (data) => set({ selectedUser: data }),
    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const url = import.meta.env.VITE_API_URL + "/user/get";
            const res = await axios.get(url)
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    getMessages: async (userId) => {
        const token = localStorage.getItem('token');
        set({ isMessagesLoading: true })
        try {
            const url = import.meta.env.VITE_API_URL + `/message/${userId}`;

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({ messages: res.data.messages })

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },


    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + `/message/send/${selectedUser._id}`, messageData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({
                messages: [...messages, res.data.newMessage]
            })

        } catch (error) {
            toast.error(error.response.data?.message)
        }
    },

    subscribeToMessage: () => {
        const { selectedUser, socket } = get();
        if (!selectedUser) return;

        // Directly use the socket from the store's state instead of using useSocketStore
        const currentSocket = useSocketStore.getState().socket;
        if (!currentSocket) return;

        currentSocket.on("newMassage", (newMassage) => {
            set({
                messages: [...get().messages, newMassage]
            });
        });
    },

    unSubscribeFromMessage: () => {
        const currentSocket = useSocketStore.getState().socket;
        if (currentSocket) {
            currentSocket.off("newMassage");
        }
    }
}))