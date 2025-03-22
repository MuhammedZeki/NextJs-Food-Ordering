"use client"
import { Dancing_Script } from 'next/font/google'
import React from 'react'

const dancing =Dancing_Script({
  subsets:["latin"],
  variable:"--font-dancing-script",
  weight: ["400","700"],
})

const Title = ({children,addClass}) => {
  return (
    <div className={`${addClass} font-dancing ${dancing.variable}`}>{children}</div>
  )
}

export default Title