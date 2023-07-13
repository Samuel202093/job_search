import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from '../assets/img/404-Error.png'

const Error = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center min-h-[50vh]'> 
        <img src={errorImg} className='w-[100%] lg:w-[30%] h-[50vh]'/>
        <p className='font-semibold'>click on the button to go back to Home page</p>
        <Link to={'/'} className='bg-[#02735E] px-4 py-2 rounded text-[#E4F2E7] font-semibold text-base'>Home</Link>
        
    </div>
  )
}

export default Error
