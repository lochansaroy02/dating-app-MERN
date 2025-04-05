import React, { useState } from 'react';
import { useChatStore } from '../../../utils/store/chatStore';
import { AiOutlineSend, AiOutlinePaperClip } from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result); // base64 with prefix
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async () => {
        if (!text && !image) return;

        const messageData = {
            text,
            image,
        };

        await sendMessage(messageData);

        // Clear inputs
        setText('');
        setImage(null);
    };

    return (
        <div className="flex items-center p-2 border-t fixed bg-neutral-800 bottom-12 w-full lg:w-3/4 ">
            <label className="cursor-pointer mr-2">
                <AiOutlinePaperClip size={24} />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>

            <input
                type="text"
                className="flex-1 p-2 border rounded"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded">
                <AiOutlineSend size={20} />
            </button>

            {image && (
                <div className="ml-2 relative">
                    <img src={image} alt="preview" className="h-10 w-10 object-cover rounded" />
                </div>
            )}
        </div>
    );
};

export default MessageInput;
