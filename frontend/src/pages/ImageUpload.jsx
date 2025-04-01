import axios from "axios";
import React, { useState } from "react";
import { useImageStore } from "../utils/store";

const ImageUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [imageUrls, setImageUrls] = useState([]);

    const setImageData = useImageStore((state) => state.setImageData);
    const imageData = useImageStore((state) => state.imageData);

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files
        await uploadFiles(selectedFiles);
    };

    const uploadFiles = async (selectedFiles) => {
        if (!selectedFiles.length) {
            alert("Please select at least one file.");
            return;
        }

        let newImageUrls = [];
        let progressData = {};

        for (let i = 0; i < selectedFiles.length; i++) {
            const formData = new FormData();
            formData.append("images", selectedFiles[i]); // Corrected field name
            // Removed fileName append as it's unnecessary

            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + "/image/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },


                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress((prevProgress) => ({
                            ...prevProgress,
                            [i]: percentCompleted,
                        }));
                    },
                });

                newImageUrls.push(response.data.imageUrls[0]);
            } catch (error) {
                console.error("Upload failed:", error);
                alert("Upload failed! Please try again.");
            }
        }
        setImageData(newImageUrls);
    };




    return (
        <div className="mt-8 flex flex-col justify-center items-center text-white">
            {/* Progress Bars */}
            {Object.keys(uploadProgress).map((index) => (
                <div key={index} className="w-64 bg-neutral-700 h-2 rounded-md overflow-hidden mt-2">
                    <div
                        className="bg-blue-500 h-full transition-all"
                        style={{ width: `${uploadProgress[index]}%` }}
                    ></div>
                </div>
            ))}

            {imageUrls.length === 0 && (
                <div className="flex items-center justify-center w-full">
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
                </div>
            )}

            {/* Display Uploaded Images */}
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
