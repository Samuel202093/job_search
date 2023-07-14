import React from 'react'
import { useFormContext } from '../context/form'
import { GrFormClose } from 'react-icons/gr'
import Loader from './Loader'


const MobileForm = () => {
    const {focused, resume, resumeName, resumeError, loading, formData, handleChange, handleFocus, handleSubmit, handleUpload, showMobile, setShowMobile} = useFormContext()

    const handleClose = ()=>{
        setShowMobile(!showMobile)
        document.body.style.overflow = 'unset' // makes the body scrollable when the modal is closed
    }

  return (
    <div className='listForm fixed top-[6%] left-0 z-[1000] bg-[rgba(0,0,0,0.7)] w-[100%] border-2y border-[red]y h-[153vh] overflow-hidden'>
       
    <div className='hiddeny lg:blocky listForm absolutey h-[120vh] w-[100%] p-3 rounded mt-8'>
    <GrFormClose className='close fixed top-[1%] right-[0%] z-[1000] text-4xl cursor-pointer' onClick={handleClose}/>
    <span className='formTooltip hidden fixed top-[1%] right-[10%] border-[1px] border-[black] px-2 py-[0.2rem] transition-all delay-150 ease-in'>close form</span>
    <div className='flex flex-col gap-5 mt-5'>

    <div className='flex flex-col gap-1'>
    <input type="text" placeholder='Enter Firstname' className='h-[7vh] px-3 font-sm font-sans font-semibold focus:outline-none rounded border-[1px] border-[#888888]' name='firstname' value={formData.firstname} onChange={handleChange} onBlur={handleFocus} focused={focused.toString()} pattern="^[A-Za-z0-9]{5,15}$" required={true}/>
    {focused === true ? <span className='text-sm text-[red] font-medium'>Firstname should contain 5 - 15 characters and should not include special characters</span>: ''}
    
    </div>

    <div className='flex flex-col gap-1'>
    <input type="text" placeholder='Enter Lastname' className='h-[7vh] px-3 font-sm font-sans font-semibold focus:outline-none rounded border-[1px] border-[#888888]' name='lastname' value={formData.lastname} onChange={handleChange} onBlur={handleFocus} focused={focused.toString()} pattern="^[A-Za-z0-9]{5,15}$" required={true}/>
    {focused === true ? <span className='text-sm text-[red] font-medium'>Firstname should contain 5 - 15 characters and should not include special characters</span>:""}
    
    </div>

    <div className='flex flex-col gap-1'>
    <input type='email' placeholder='Enter Email' className='bg-red-800y h-[7vh] px-3 font-sm font-sans font-semibold focus:outline-none rounded border-[1px] border-[#888888]' name='email' value={formData.email} onChange={handleChange} onBlur={handleFocus} focused={focused.toString()} required={true}/>
    {focused === true ? <span className='text-sm text-[red] font-medium'>It should be a valid email address!</span>:""}
    </div>

    <div className='flex flex-col gap-1'>
    <label htmlFor="resume" className='flex self-start text-sm font-bold cursor-pointer rounded px-3 py-2 border-[1px] border-[#e2e1e1] text-[#e2e1e1]'>{resume === null ? 'Upload resume':resumeName}<input type='file' id='resume' className='hidden cursor-pointer' name='resume' required={true} accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => {handleUpload(e)}}/></label>
    {resumeError === true ? <span className='text-sm text-[red] font-medium'>please upload your resume</span>:''}
    
    </div>

    <div className='flex flex-col gap-1'>
    <textarea name="coverLetter" id="" cols="30" rows="10" placeholder='cover letter should contain 1 - 1000 characters' className='bg-[green]y border-[1px] border-[#888888] px-3 py-2 font-sm font-sans font-semibold focus:outline-none rounded' value={formData.coverLetter} onChange={handleChange} onBlur={handleFocus} focused={focused.toString()} pattern="^[A-Za-z0-9]{5,1000}$" required={true}></textarea>
    {focused === true ? <span className='text-sm text-[red] font-medium'>cover letter should contain 1 - 1000 characters and no special characters</span>: ''}
    </div>

    <button className='flex self-center transition-all ease-in-out delay-150 px-4 py-2 font-semibold font-sans rounded border-[1px] border-transparent text-[white] bg-[#02735E] tracking-[0.05rem] hover:bg-transparent hover:text-[#02735E] hover:border-[1px] hover:border-[#02735E] hover:font-bold' onClick={handleSubmit}>{loading === true ? <Loader/>: 'submit'}</button>
    </div>
  
  </div>
  </div>
  )
}

export default MobileForm
