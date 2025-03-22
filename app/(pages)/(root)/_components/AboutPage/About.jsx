"use client"
import Title from '@/app/ui/Title'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const About = () => {
  const pathname=usePathname()  
  return (
    <div className={`${pathname === "/" ? "bg-secondary" : "bg-slate-500"} h-full py-16`}>
      <div className='container mx-auto'>
        <div className='flex flex-col-reverse gap-y-20
        md:flex md:flex-row md:justify-center md:items-center md:gap-x-14'>
          <div className='grid place-content-center'>
            <div className='relative md:w-[445px]  md:h-[607px]
            w-[350px] h-[550px] p-2'>
              <Image src="/images/about-img.png" alt='' fill style={{objectFit:"contain"}}/>
            </div>
          </div>
          <div className='text-white'>
            <Title addClass="text-[40px] px-4">We Are Feane</Title>
            <p className='my-4 px-4'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt
               anything embarrassing hidden in the middle of text. All
            </p>
            <button className='bg-primary py-[10px] px-[45px] rounded-xl'>Read More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About