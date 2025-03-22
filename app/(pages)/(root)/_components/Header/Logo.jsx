import Title from '@/app/ui/Title'
import { Dancing_Script } from 'next/font/google'
import Link from 'next/link'
import React from 'react'


const dancing =Dancing_Script({
  subsets:["latin"],
  variable:"--font-dancing-script",
  weight: ["400", "700"],
})
const Logo = () => {
  return (
    <Title addClass="text-3xl">
      <Link href="/">Feane</Link>
    </Title>
  )
}

export default Logo