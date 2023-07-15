import React,{ useState} from 'react'
import { BsLinkedin, BsInstagram, BsFacebook, BsTwitter, BsYoutube, BsHandIndex } from 'react-icons/bs'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'
import Loader from './Loader';
import { GoMoveToTop } from 'react-icons/go'


const Footer = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e)=>{
    setEmail(e.target.value)
  }

  const handleSubscribe = (e)=>{
    e.preventDefault()
    if (email === '') {
      setLoading(true) 
      toast.error('please enter your email address', {
        transition: Slide,
        position: "top-right"})
        setLoading(false)
     
    }else{
      setLoading(true)
      toast.success('Thanks for subscribing', {
        transition: Slide,
        position: "top-right"})
        setLoading(false)
        setEmail('')
      
    }
  }


  return (
    <footer className='flex flex-col lg:flex-row justify-around bg-[#02735E] min-h-[20vh] w-[100%] p-2 mt-5'>

        {/* Go to top */}
        {/* <div className='flex justify-center items-center w-[40px] h-[40px] border-2y border-red-500y absolute bottom-[10%]y bottom-[-215%] right-[3%] z-[1000] rounded-[50%] text-[#E4F2E7] bg-[#ee781d] font-bold'>
            <GoMoveToTop className='text-2xl font-bold'/>
        </div> */}
      

      {/* contact wrapper */}
      <div className='flex flex-col gap-4 p-3'>
        <h2 className='font-sans font-bold text-[1rem] tracking-[0.05rem] text-[#E4F2E7]'>CONTACT</h2>
        <span className='text-[#E4F2E7]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, aliquam.</span>
        <span className='flex gap-5 text-[1.35rem] text-[#E4F2E7] cursor-pointer'><BsFacebook className='transition-all ease-in-out delay-75 font-semibold hover:text-[#00acee]'/> <BsTwitter className='transition-all ease-in-out delay-75 font-semibold hover:text-[#00acee]'/> <BsInstagram className='transition-all ease-in-out delay-75 font-semibold hover:text-[#f06413]y hover:text-[#fa7e1e]'/> <BsLinkedin className='transition-all ease-in-out delay-75 font-semibold hover:text-[#00acee]'/> <BsYoutube className='transition-all ease-in-out delay-75 font-semibold hover:text-[#CD201F]'/> </span>
      </div>
      {/* <Loader/> */}

      {/* //newsletter container */}
      <div className='w-[100%] lg:w-[40%] border-[1px]y border-[#E4F2E7]y flex flex-col gap-4 p-3'>
        <h2 className='font-sans font-bold text-[1rem] tracking-[0.05rem] text-[#E4F2E7]'>NEWSLETTER</h2>
        <input type="email" required={true} placeholder='Enter your Email' className='h-[7vh] rounded bg-transparent border-[1px] border-[#E4F2E7] text-[#E4F2E7] px-3 focus:outline-none font-semibold' name='email' value={email} onChange={handleChange}/>

        <button className='transition-all delay-150 ease-in flex bg-red-800y border-[1px] border-[#E4F2E7] self-start text-sm font-bold font-sans px-4 py-2 rounded text-[#E4F2E7] tracking-[0.05rem] hover:text-[#02735E] hover:bg-[#E4F2E7]' onClick={handleSubscribe}>{loading === true ? <Loader/>: 'SUBSCRIBE NOW'}</button>
      </div>
      <ToastContainer/>
    </footer>
  )
}

export default Footer
