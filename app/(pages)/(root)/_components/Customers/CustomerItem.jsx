import Image from 'next/image'
import React from 'react'

const CustomerItem = ({imgSrc}) => {
  return (
    <div className='my-10'>
        <div className='p-6 bg-secondary rounded-md mx-5'>
            <div className='text-white'>
                <div>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vel est, eos sed porro sint pariatur nesciunt, error commodi quae dolores molestiae beatae praesentium eius!</p>
                </div>
                <div className='flex flex-col gap-y-1 my-3'>
                    <span className='font-semibold text-xl my-1'>Mike Hamell</span>
                    <span className='text-sm my-1'>Muhammed Zeki</span>
                </div>
            </div>
            <div className='relative w-28 h-28
             border-primary rounded-full border-[4px] my-4 flex justify-center'>
                <div className='absolute w-5 h-5 bg-primary top-0 -translate-y-3 rotate-45'></div>
                <Image alt='' src={imgSrc} className='rounded-full' fill style={{objectFit:"contain"}}/>
            </div>
        </div>
    </div>
  )
}

export default CustomerItem