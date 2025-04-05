import React, { useEffect } from 'react'
import { useProfileStore, useThisUserStore } from '../utils/store'

const Profile = () => {
    const { profileData } = useProfileStore();
    const imgArr = profileData?.images[0]?.split(",")
    useEffect(() => {
        console.log(profileData)
    }, [])
    const cover = "https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg"
    return (
        <div className='h-screen'>
            <div className='h-full'>
                <div className='relative  h-[50%]  '>
                    <div className='  h-40   bg-red-400'>
                        <img className='w-full h-full object-cover' src={cover} alt="" />
                    </div>




                    <div className='absolute lg:bottom-0 bottom-16 pb-2 lg:border-b border-neutral-500  flex lg:left-32 lg:mt-2 px-4 justify-between lg:items-end  flex-col items-center lg:flex-row h-[40%] lg:w-3/4   '>
                        <div className=' h-48 w-48  rounded-2xl   '>

                            <div className="h-full w-full backdrop-blur-2xl  p-2 rounded-2xl ">
                                <img className='h-full w-full object-cover  rounded-xl ' src={imgArr[0]} alt="" />
                            </div>
                        </div>
                        <div className=' flex flex-col items-center lg:items-start  '>
                            <h1 className=' text-2xl'>
                                {profileData?.name}

                            </h1>
                            <p className='w-3/4 py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat id iste explicabo sit !</p>
                            <div className='flex  gap-4 mt-1  '>
                                <h1 className='px-2 py-1 bg-green-400 text-sm  border rounded-full border-green-950 text-green-900  '>{profileData?.gender}</h1>
                                <h1 className='px-2 py-1 bg-green-400 text-sm  border rounded-full border-green-950 text-green-900'>{profileData?.relationship}</h1>
                                <h1 className='px-2 py-1 bg-green-400  text-sm border rounded-full border-green-950 text-green-900'>{profileData?.religion}</h1>
                            </div>

                        </div>

                        <div className=' h-full hidden  items-center'>
                            <button className='bg-blue-500  px-2 py-1  rounded-xl'>Edit profile</button>
                        </div>

                    </div>
                </div>










            </div>

        </div>
    )
}

export default Profile