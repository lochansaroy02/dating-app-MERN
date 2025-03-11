import React from 'react'



const Card = ({ data }) => {
    // const data = {
    //     "_id": "67c9596efcccb2bb71646894",
    //     "name": "Rajan",
    //     "age": 24,
    //     "email": "rajansaroy100@gmail.com",
    //     "gender": "male",
    //     "relationship": "long-term",
    //     "religion": "hindu",
    //     "likedBy": [
    //         "67cbbf2ab907517ec2a410dc",
    //         "67d01966e0f843478a322b3a"
    //     ],
    //     "likes": [],
    //     "images": [
    //         "https://res.cloudinary.com/dcuiltdc8/image/upload/v1741248873/isbvpg13s5lkoi0gw4mo.png,https://res.cloudinary.com/dcuiltdc8/image/upload/v1741248875/dgcbrkkt8tthpp3rsvck.png,https://res.cloudinary.com/dcuiltdc8/image/upload/v1741248876/z8f85bd7ivvrhsnfy1lx.png"
    //     ],
    //     "__v": 1
    // }
    const imageArr = data.images[0].split(",")
    return (
        <div className=' h-screen   '>

            <div className='h-3/4   w-72 relative  '>
                {
                    imageArr.map((item, index) => (
                        <div className={` h-full w-full  rounded-lg absolute border border-neutral-500  `} >
                            <img className='h-full  blur-sm rounded-lg w-full object-cover' src={item} alt="" />
                        </div>
                    ))
                }

                <h1 className='text-white text-2xl   absolute bottom-4 left-4'>{data.name},  <span>{data.age}</span> </h1>
            </div>
        </div >
    )
}

export default Card