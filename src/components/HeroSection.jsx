import React, {useState, useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify'
import Loader from './Loader';
import Select from 'react-select';
import { useFormContext } from '../context/form';


const HeroSection = () => {
    const { handleSelectChange, jobOptions, handleSearch, select } = useFormContext()
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [scrollHeight, setscrollHeight] = useState(window.scrollY);
    const [loading, setLoading] = useState(false)

    // the function is to close the the newsletter div when open if height of the screen is greater than 300px
    useEffect(() => {
      const handleScrollHeight = () => {
        if (scrollHeight > 300 && show === true) {
          setShow(false)
        }
        setscrollHeight(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScrollHeight);
  
      return () => {
        window.removeEventListener('scroll', handleScrollHeight);
      };
    });

// function to open the newsletter modal or show the newsletter div
    const handleModal = ()=>{
        setShow(!show)
    }

    // handles the onchange attribute for the newsletter subscribe
   const handleChange = (e)=>{
      setEmail(e.target.value)
    }

    // function to subscribe to newsletters
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
          setShow(!show)
      }
    } 

  return (
    <div className="heroSection h-[75vh] w-[100%] flex justify-center items-center">
        <button className='absolute top-[1%] md:top-[3%] right-[2%] md:right-[5%] bg-[#161616] border-2 border-transparent text-sm px-3 py-3 text-[white] tracking-[0.2rem] ease-in-out delay-150 font-bold hover:bg-transparent hover:text-[black] hover:border-[#2c3c31] hover:border-[2px] transition-all' onClick={handleModal}>SUBSCRIBE</button>

        {/* hidden subscribe container */}

        {show && <div className='absolute flex justify-around lg:justify-between top-[10%] md:top-[10%] left-[0%] md:left-[15%] lg:left-[30%] w-[100%] md:w-[80%] lg:w-[40%] h-[9vh] md:h-[7vh] lg:h-[7vh]'>
            <input type="email" name="email" id="" className='w-[77%] md:w-[85%] lg:w-[85%] px-3 text-xl font-semibold text-[#000] focus:outline-none' placeholder='Enter your Email for Newsletter' onChange={handleChange}/>
            <button className='bg-[#2c3c31] text-[#fff] px-3 py-[0.85rem] tracking-[0.15rem] font-semibold text-sm' onClick={handleSubscribe}>{loading === true? <Loader/>: "SUBMIT"}</button>
        </div> }
      
        
      {/* Job Zone */}
      <div className='searchContainer flex flex-col gap-5 min-w-[40%] md:min-w-[70%] lg:min-w-[40%] min-h[30vh] border p-[0.3rem] lg:p-[1.5rem] backdrop-blur-[0px]y lg:backdrop-blur-sm mt-[7rem] md:mt-0 py-6 lg:py-5'>
        <div className='flex flex-col justify-center items-center w-[100%]y'>
        <h1 className='heading'>JOBZONE</h1>
            <span className='tracking-[0.3rem] font-bold text-[white]'>Search for your dream jobs!!!!!</span>
        </div>
        <div className='flex flex-col gap-4'>
      
      <Select options={jobOptions} onChange={handleSelectChange} value={jobOptions.find(obj => obj.value === select)}/>
      {/* <button className='flex self-center border-2 border-transparent px-[1.3rem] py-2 text-[1.1rem] bg-[#2c3c31] text-[#fff] tracking-[0.35rem] font-bold hover:border-[2px] hover:border-white hover:bg-transparent hover:text-[#2c3c31] ease-in delay-150 transition-all' onClick={handleSearch}>{loading === true? <Loader/>: "Search"}</button> */}
     
      </div>
      </div>
    </div>
  )
}

export default HeroSection
