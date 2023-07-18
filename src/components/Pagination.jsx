import React, {useState} from 'react'


const Pagination = (props) => {
    const {prePage, changeCurrrentPage, nextPage, numbers, currentPage} = props

  return (
      <div className='flex justify-end border-[3px]y border-[green]y w-[100%] lg:w-[100%]y mt-3'>
        {/* pagination wrapper */}
    <div className='flex justify-end gap-4 border-2y border-[yellow]y cursor-pointer md:mr-2 lg:mr-[6.3rem]'>
      <span onClick={prePage} className='border-2 border-[#fa7e1e] px-2 py-1 text-sm'>Prev</span> 
      {
          numbers.map((n, i)=>{
            return <span onClick={()=> changeCurrrentPage(n)} key={i} className={currentPage === n ? "text-[red]y font-semibold text-sm px-2 py-1 border-2 bg-[#fa7e1e] text-[white] cursor-pointer": ''}>{n}</span>
          })
        } 
        <span onClick={nextPage} className='border-2 border-[#fa7e1e] px-2 py-1 text-sm'>Next</span>
    </div>
    </div>
  )
}

export default Pagination
