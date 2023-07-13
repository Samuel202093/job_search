import React, { useState } from 'react'
import image from '../assets/img/error.gif'
import { HiOutlineOfficeBuilding, HiLocationMarker } from 'react-icons/hi'
import { BsStars } from 'react-icons/bs'
import axios from 'axios'
import useSWR from 'swr'
import { useNavigate, Link } from 'react-router-dom'


//using swr to fetch data
const fetcher = url => axios.get(url).then(res => res.data)


const Card = () => {
  //the swr handles the loading, error and data state
  let { data, error, isLoading } = useSWR('https://www.arbeitnow.com/api/job-board-api', fetcher)
  const [currentPage, setCurrentPage] = useState(1)
 
// loading state is been handled
  if (isLoading) return <div className='loader'></div>

   // error state is been handled
   if (error) return <div className='flex flex-col justify-center items-center gap-1 min-h-[20vh] mt-[1rem]'>
   <img src={image} alt="" className='h-[40vh]'/>
   <h2 className='text-xl font-bold font-sans'>No Internet connection</h2>
   <span className='text-sm font-sans'>check your connection, then refresh the page</span>
   <button className='bg-[#02735E]y border-2 border-[#02735E] text-sm font-semibold px-3 py-1 rounded' onClick={() => window.location.reload(true)}>Refresh</button>
 </div>


  // pagination logic
  const recordsPerPage = 10 // number of data on each page
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records =  data?.data.slice(firstIndex, lastIndex)
  const npage = Math.ceil(data?.data.length / recordsPerPage)
 
  const numbers = [...Array(npage + 1).keys()].slice(1) // displays the numbers of the page in the pagination
  
 // previous page function for pagination
  const prePage = ()=>{
    if(currentPage !== firstIndex){
      setCurrentPage(currentPage - 1)
    }
  }

  // current page function for pagination
  const changeCurrrentPage = (id)=>{
    setCurrentPage(id) 
  }

  // next page function for pagination
  const nextPage = ()=>{
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }

  

  //  data.data.filter()
  
  return (
    <div className='flex flex-col gap-3 items-center w-[100%] min-h-[80vh] mt-[5rem] md:mt-[1.5rem] lg:mt-[5rem] border-2y border-[red]y'>

      {data? records.map((x, i)=>{
        return(
        <div className='card-wrapper flex justify-between w-[100%] lg:w-[85%] min-h-[22vh] border-[1px] border-[red]y bg-[#014040] cursor-pointer text-[#E4F2E7] rounded' key={i}>
        <div className='flex flex-col gap-3 md:gap-3 lg:gap-1 md:min-w-[30%] min-w-[100%] h-full px-4 py-2 lg:py-2 md:py-7 border-2y border-[rgb(255,0,0)]y'>
            <h1 className='flex text-xl font-bold '><BsStars className='text-xl text-[#e4f2e7] mr-2 mt-[0.2rem]'/>{x.title.slice(0, 50)}</h1>
            <span className='flex text-[1rem] font-semibold bg-[#a66b49] w-fit px-3 py-1 rounded'><HiOutlineOfficeBuilding className='text-[#e4f2e7] text-xl mr-2 mt-[0.15rem]'/>{x.company_name}</span>
            <div className='flex gap-[4rem]'>
            <span className='flex text-[0.85rem] font-semibold italic font-serif'><HiLocationMarker className='text-[#e4f2e7] text-xl mr-2 mt-[-0.1rem]'/>{x.location}</span>
            <span className='md:hidden block font-semibold'>3d</span>
            </div>

            <div className='flex gap-5'>
            <span className='font-bold bg-[#E4F2E7] text-[#000] px-4 text-[1.1rem] rounded'>{x.remote===false? "onsite":"remote"}</span>
            <p className='bg-[#E4F2E7] rounded text-[#000] px-3 py-[0.15rem] font-bold'><span>$90k - </span>
              <span>$110k</span>
              </p>
              <Link to={"/listing"} state={{data:x}} className='md:hidden apply-btn bg-[#a66b49] shadow-lg px-4 py-[0.32rem] tracking-[0.15rem] font-semibold'>View</Link>
            </div>
            <span className='flex md:hidden self-start bg-[#E4F2E7] text-[#000] font-medium px-3 py-[0.35rem] rounded'>{x.tags}</span>
        </div>

        <div className='hidden md:flex justify-center self-center items-centery gap-4 w-[20%] border-2y border-[red]y h-full'>
          <span className='bg-[#E4F2E7] text-[#000] font-medium px-3 py-[0.35rem] rounded'>{x.tags}</span>
        </div>

        <div className='hidden md:flex self-center justify-center items-centery gap-[4rem] md:gap-3 lg:gap-[4rem] w-[20%] border-2y border-[gold]y h-full'>
        <span className='hidden md:block font-semibold'>3d</span>
        <Link to={"/listing"} state={{data:x}} className='apply-btn bg-[#a66b49] shadow-lg px-4 py-[0.32rem] tracking-[0.15rem] font-semibold'>View</Link>
        </div>
      </div>)
      }):""}


      {/* pagination wrapper */}
      <div className='flex justify-end border-[3px]y border-[green]y w-[98%] lg:w-[85%]'>
      <div className='flex justify-end gap-4 border-2y border-[yellow]y cursor-pointer'>
        <span onClick={prePage} className='border-2 border-[#fa7e1e] px-2 py-1 text-sm'>Prev</span> 
        {
            numbers.map((n, i)=>{
              return <span onClick={()=> changeCurrrentPage(n)} key={i} className={currentPage === n ? "text-[red]y font-semibold text-sm px-2 py-1 border-2 bg-[#fa7e1e] text-[white] cursor-pointer": ''}>{n}</span>
            })
          } 
          <span onClick={nextPage} className='border-2 border-[#fa7e1e] px-2 py-1 text-sm'>Next</span>
      </div>
      </div>
      
    </div>
  )
}

export default Card
