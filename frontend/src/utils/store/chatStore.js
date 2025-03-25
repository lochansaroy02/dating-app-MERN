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

    setSelectedUser: (data) => set({ selectedUser: data }),
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
        const token = localStorage.getItem('token');
        set({ isMessagesLoading: true })
        try {
            const url = `http://localhost:3000/message/${userId}`;
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
            const res = await axios.post(`http://localhost:3000/message/send/${selectedUser._id}`, messageData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({
                messages: [...messages, res.data.newMessage]
            })

            console.log(res.data)
        } catch (error) {
            toast.error(error.response.data?.message)
        }
    },

    subscribeToMessage: () => {
        const { selectedUser } = get();
        if (!selectedUser) return
        const socket = useSocketStore((state) => state.socket);

        // optimise this leter
        // const socket = useSocketStore.getState().socket;
        socket.on("newMassage", (newMassage) => {
            set({
                messages: [...get().messages, newMassage]
            });
        });
    },
    unSubscribeFromMessage: () => {
        const socket = useSocketStore((state) => state.socket);
        socket.off("newMassage")
    }


}))

