import React from 'react'
function Artist() {
    return (
        <div className='w-full h-full'>
            <div className='w-full h-screen'>
                <div className='w-full h-60 bg-[#25211F] relative'>
                    <div className='flex absolute bottom-0'>
                        <div className='w-80  relative flex justify-center align-center'>
                            <div className="bg-primary absolute w-48 top-[-40px] h-48 flex items-center justify-center bg-[url('/default.jpg')] bg-cover">
                            </div>
                        </div>
                        <div className='relative left-[-50px]'>
                            <div className='flex justify-start px-4 items-center relative'>
                                <div className='text-5xl'>Alicia Keys</div>
                                <div className='px-2 ml-2'>
                                    <button>Become a Fan</button>
                                </div>
                            </div>
                            <div className='flex justify-start px-4 pt-2 space-x-4'>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='text-primary'>R & B</div>
                                    <div className='text-secondary font-bold'>Genre</div>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='text-primary'>88</div>
                                    <div className='text-secondary font-bold'>Popularity</div>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='text-primary'>588</div>
                                    <div className='text-secondary font-bold'>Followers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Artist