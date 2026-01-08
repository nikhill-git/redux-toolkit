import React from 'react'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"



const ResultCardCart = (props) => {
  const {item} = props;
  const {description, smallSrc} = item;

  

  const activeTabCart = useSelector((store)=> store.activeTabCart.value);

  const navigate = useNavigate();


  return (activeTabCart == "photoCart" || activeTabCart == "gifCart")?  (
      <div to='/fullImageCart'  className=' flex justify-center items-center flex-col h-100 w-75 mx-3 px-1 rounded cursor-pointer ' onClick={()=>navigate("/fullImageCart", {state: {item}})}>
        <div><img src={smallSrc} className='h-70 w-67 rounded'/></div>
        <div>{description}</div>
      </div>
  ) : (
      <div to='/fullImageCart' className='h-90 w-70 mx-3 px-1 rounded cursor-pointer' onClick={()=>navigate("/fullImageCart", {state: {item}})}>
        <div>
          <video className='h-70 w-67 rounded' autoPlay><source src={smallSrc}></source></video>
        </div>
        <div>{description}</div>
      </div>
  )
}


export default ResultCardCart