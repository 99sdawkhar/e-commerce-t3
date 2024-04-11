import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const Marquee = () => {
  return (
    <div className='flex justify-center items-center bg-[#f4f4f4] p-2.5 gap-6 mb-10'>
        <ChevronLeft className='w-5 h-5' />
        <span className='font-sm font-medium'>Get 10% off on business sign up</span>
        <ChevronRight className='w-5 h-5' />
    </div>
  )
}

export default Marquee