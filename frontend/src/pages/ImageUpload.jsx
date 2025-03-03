import axios from "axios";
import React, { useState } from "react";
import { useImageStore } from "../utils/store";


const ImageUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);

    const setImageData = useImageStore((state) => state.setImageData);

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to array
        if (selectedFiles.length === 0) return;

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files
        await uploadFiles(selectedFiles);
    };

    const uploadFiles = async (selectedFiles) => {
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("images", file)); // Append multiple images

        try {
            setUploading(true);
            setProgress(0);

            const response = await axios.post("http://localhost:3000/image/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percent);
                },
            });
            setImageData(response.data.images);

        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed! Please try again.");
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    return (
        <div className="mt-8 flex flex-col justify-center items-center text-white">
            {/* Progress Bar */}
            {uploading && (
                <div className="w-64 bg-neutral-700 h-2 rounded-md overflow-hidden mt-2">
                    <div
                        className="bg-blue-500 h-full transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            {imageUrls.length == 0 && <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-16 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-neutral-800 bg-neutral-800 hover:bg-neutral-100 dark:border-neutral-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                </label>
            </div>}

            {imageUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="p-2 relative">
                            <button
                                onClick={() => {
                                    setImageUrls(imageUrls.filter((_, i) => i !== index));
                                }}
                                className="absolute right-0 top-0 bg-black rounded-full p-1 flex justify-center items-center"
                            >
                                ❌
                            </button>
                            <img src={url} alt={`Uploaded ${index}`} className="w-40 h-40 object-cover rounded-lg" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
