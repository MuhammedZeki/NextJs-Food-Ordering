import BlurText from '@/app/ui/BlurText';
import ShinyText from '@/app/ui/ShinyText/ShinyText ';
import Title from '@/app/ui/Title'
import { Dancing_Script } from 'next/font/google';
import Image from 'next/image'
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
const dancing = Dancing_Script({
    subsets:["latin"],
    variable:["--font-dancing-script"],
    weight:["400","700"]
})

const Campaigns = () => {

  return (
    <div className='container mx-auto h-full'>        
        <div className=' flex flex-col gap-y-5 sm:flex-wrap sm:flex sm:flex-row sm:justify-between sm:items-center 
            justify-between py-5 sm:gap-x-5 px-[15px]'>
            <div className='bg-secondary flex flex-col sm:flex-1
             justify-center sm:justify-start gap-y-3 items-center rounded-xl py-5 px-[15px] sm:flex sm:flex-row sm:gap-x-2'>
                <div className='relative h-40 w-40 border-[5px] border-primary rounded-full overflow-hidden sm:ml-5'>
                    <Image 
                        alt=''
                        src="/images/o1.jpg"    
                        fill
                        className='hover:scale-110 transition-all duration-300 '
                    />
                </div>
                <div className='flex flex-col gap-y-2 text-white sm:ml-5'>
                    <Title addClass="text-2xl">Tasty Thursdays</Title>
                    <div className='flex justify-center items-center'>
                        <span className={`${dancing.variable} font-dancing text-4xl`}>20%</span>
                        <span className={`${dancing.variable} font-dancing text-[16pxS] ml-2`}>off</span>
                    </div>
                    {/* <button className='flex justify-center rounded-xl items-center py-3 px-8 bg-primary'>Order Now <FaShoppingCart className='ml-1' size={20} />
                    </button> */}
                    <button className='flex justify-center rounded-xl items-center py-3 px-8 bg-primary'>
                        <ShinyText text="Order Now" disabled={false} speed={3} className='custom-class' /> <FaShoppingCart className='ml-1' size={20} />
                    </button>
                </div>
            </div>
            <div className='bg-secondary flex flex-col sm:flex-1
             justify-center gap-y-3 items-center rounded-xl py-5 px-[15px] sm:flex sm:flex-row sm:justify-start sm:gap-x-2'>
                <div className='relative h-40 w-40 border-[5px] border-primary rounded-full sm:ml-5 overflow-hidden'>
                    <Image 
                        alt=''
                        src="/images/o1.jpg"    
                        fill
                        className='hover:scale-110 transition-all duration-300 '
                    />
                </div>
                <div className='flex flex-col gap-y-2 text-white sm:ml-5'>
                    <Title addClass="text-2xl">Tasty Thursdays</Title>
                    <div className='flex justify-center items-center'>
                        <span className={`${dancing.variable} font-dancing text-4xl`}>20%</span>
                        <span className={`${dancing.variable} font-dancing text-[16pxS] ml-2`}>off</span>
                    </div>
                    <button className='flex justify-center rounded-xl items-center py-3 px-8 bg-primary'>
                        <ShinyText text="Order Now" disabled={false} speed={3} className='custom-class' /> <FaShoppingCart className='ml-1' size={20} />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Campaigns