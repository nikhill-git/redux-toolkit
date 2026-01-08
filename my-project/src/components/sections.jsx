import React from 'react'
import { useDispatch } from 'react-redux'
import {changeActiveTab} from "../redux/features/activeTab"



const Sections = () => {
  
  const dispatch = useDispatch();

  function activePhoto(){
    dispatch(changeActiveTab("photo"))
  }
  function activeVideo(){
    dispatch(changeActiveTab("video"))
  }
  function activeGif(){
    dispatch(changeActiveTab("gif"))
  }
 

  return (
    <div>
      <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md' onClick={activePhoto}>Photos</button>
      <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md' onClick={activeVideo}>Videos</button>
      <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md' onClick={activeGif}>GIFs</button>
    </div>
  )
}


export default Sections
