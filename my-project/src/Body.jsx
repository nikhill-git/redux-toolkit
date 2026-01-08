import React from 'react'
import Sections from './components/sections'
import ResContainer from './pages/ResContainer'
import { useSelector } from 'react-redux'

const Body = () => {

  const query = useSelector((store) => store.searchQuery.value)
  return(query.length)? (
    <div>
      <div className='flex ml-10 h-15 m-5'><Sections/></div>
      <ResContainer/>
    </div>
  ):(<div className='h-100vh flex justify-center mt-3 bg-white'><h1 className='text-4xl text-black'>Search Anything...</h1></div>)
}

export default Body
