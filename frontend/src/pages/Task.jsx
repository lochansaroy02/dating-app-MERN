import React from 'react'
import taskLogo from '../assets/taskLogo.jpg'

const Task = () => {
    return (
        <div className='h-screen flex  items-center justify-center'>
            <div className='bg-neutral-800 h-3/4 flex flex-col gap-4   p-2 w-[30%]  rounded-2xl'>
                <div className='flex justify-between  items-center pb-2   mx-2 border-b-2  border-neutral-600  '>
                    <div className='flex gap-2 items-center   ' >

                        <img className='h-12 w-12 rounded-full ' src={taskLogo} alt="" />
                        <span className='flex flex-col'>
                            <h1 className='text-sm '>Taykoid</h1>
                            <h2 className='text-xs'>professional tier</h2>
                        </span>
                    </div>
                    <div className='border bg-neutral-700   rounded-full px-2 py-1'>
                        <h1 className='text-sm'>Switch account </h1>
                    </div>
                </div>
                <div className='px-2 '>
                    <div>
                        <div>
                            <h1>sales growth </h1>
                            <h1>date</h1>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae enim iste saepe voluptates! Nulla, soluta. Enim nobis vel nisi sed dolore. Fugiat quam est beatae illum dolores reprehenderit maiores?
                        </p>
                    </div>

                    <div>
                        graph
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Task