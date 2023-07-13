import { createContext, useContext, useState } from "react";

export const formContext = createContext()

export const FormContextProvider = ({children})=>{
    const [resumeName, setResumeName] = useState('')
    const [resumeError, setResumeError] = useState(true)
    const [showMobile, setShowMobile] = useState(false)
    const [loading, setLoading] = useState(false)
    const [focused, setFocused] = useState(false)
    const [resume, setResume] = useState(null)
    const[formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        coverLetter: ""
      })

      const handleFocus = (e)=>{
        setFocused(true)
      }

      const handleMobile = ()=>{
        setShowMobile(!showMobile)
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        }); // scrolls to the top of the page
        document.body.style.overflow = 'hidden' // to make the parent body not to scroll when the modal opens
      }

      const handleChange = (e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setFocused(false)
      }

      const handleUpload = (e) => {
        setResume(e.target.files[0]);
        setResumeName(e.target.files[0].name)
        setResumeError(!resumeError)
      };

      const handleSubmit = (e)=>{
        // e.preventDefault()
        setLoading(true)
        if (formData.firstname === ''|| formData.coverLetter==='' || formData.lastname==='' || formData.email=== '' || resume === '') {
           toast.error('please enter the required fields', {
            transition: Slide,
            position: "top-right"})
            setLoading(false)
            setFocused(!focused)
        }else{
          setLoading(false)
          setFocused(false)
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            coverLetter: ''
          })
          setResume(null)
          toast.success(`Thanks for apply for ${data.slug}`,{transition: Slide, position: "top-center"})
  
        }     
      }
  



    return(<formContext.Provider value={{handleChange, handleFocus, handleSubmit, handleUpload, handleMobile, resume, resumeError, resumeName, loading, focused, formData, showMobile, setShowMobile}}>
        {children}
    </formContext.Provider>)
}


export const useFormContext = ()=>{
    return useContext(formContext)
}