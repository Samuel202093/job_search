import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages/Index'
import Listing from './pages/Listing'
import Footer from './components/Footer'
import Error from './components/Error'
import 'react-toastify/dist/ReactToastify.css';
import { FormContextProvider } from './context/form'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>
  },
  {
    path: '/listing',
    element: <Listing/>
  },
  {
    path: '*',
    element: <Error/>
  }
])


function App() {
  


  return (
    <>
    <FormContextProvider>
      <RouterProvider router={router}>
        {/* <ToastContainer position='bottom-right'/> */}
        <Index />
        <Listing />
        <Error/>
      </RouterProvider>
        <Footer/>
      </FormContextProvider>
      </>
  )
}

export default App

