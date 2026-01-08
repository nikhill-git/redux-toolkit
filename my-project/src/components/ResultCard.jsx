import React from 'react'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"



const ResultCard = (props) => {
  const {item } = props;
  const {description, smallSrc} = item;
  const activeTab = useSelector((store)=> store.activeTab.value);

  const navigate = useNavigate();


  return (activeTab == "photo" || activeTab == "gif")?  (
      <div to='/fullImage'  className=' flex justify-center items-center flex-col h-100 w-75 mx-3 px-1 rounded cursor-pointer ' onClick={()=>navigate("/fullImage", {state: {item}})}>
        <div><img src={smallSrc} className='h-70 w-67 rounded'/></div>
        <div>{description}</div>
      </div>
  ) : (
      <div to='/fullImage' className='h-90 w-70 mx-3 px-1 rounded cursor-pointer' onClick={()=>navigate("/fullImage", {state: {item}})}>
        <div>
          <video className='h-70 w-67 rounded' autoPlay><source src={smallSrc}></source></video>
        </div>
        <span>{description}</span>
      </div>
  )
}


export default ResultCard
