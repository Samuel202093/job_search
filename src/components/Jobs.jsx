import React, { useState } from 'react'
import Pagination from './Pagination'
import { useFormContext } from '../context/form'

const Jobs = () => {
    let {data, finalResult, select, numbers, prePage, currentPage, changeCurrrentPage,nextPage} = useFormContext()
  

  return (
    <div className='flex flex-col gap-3 items-center w-[100%] min-h-[80vh] mt-[5rem] md:mt-[1.5rem] lg:mt-[5rem] border-2y border-[red]y'>  
        {finalResult(data.data, select)}

        {select === '' ? <Pagination numbers={numbers} currentPage={currentPage} changeCurrrentPage={changeCurrrentPage} nextPage={nextPage} prePage={prePage}/>: ''}

        {/* <Pagination numbers={numbers} currentPage={currentPage} changeCurrrentPage={changeCurrrentPage} nextPage={nextPage} prePage={prePage}/>   */}
    </div>
  )
}

export default Jobs
