import React from 'react'
import { useLocation } from 'react-router-dom';
import { removeVideoCart } from '../redux/features/videoCart';
import { removePhotoCart } from '../redux/features/photoCart';
import { removeGifCart } from '../redux/features/gifCart';
import { useDispatch } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';




const FullResCardCart = () => {
    const {state} = useLocation();
    const {item} = state;
    const {description, smallSrc, type} = item


    const dispatch = useDispatch();
 
    function removeCartItem(){
        if(type === "photo"){
            dispatch(removePhotoCart(item))
            toast.success("Removed from collection")
        }
        else if(type === "video"){
            dispatch(removeVideoCart(item))
            toast.success("Removed from collection")
        }else 
            dispatch(removeGifCart(item))
            toast.success("Removed from collection")
    }


    return (type == "photo" || type == "gif")? (
      <div className='h-100vh w-auto m-5 p-5 rounded cursor-pointer flex justify-center items-center flex-col  bg-gray-950'>
        <div><img src={smallSrc} className='h-120 w-135 rounded'/></div>
        <button className='active:scale-95 transition cursor-pointer  bg-red-400 m-2 p-2 rounded-md' onClick={removeCartItem}>Remove from Collection</button>
        <div>{description}</div>
        <ToastContainer/>
      </div>
    )
    : (
      <div className='h-100vh w-auto m-5 p-5 rounded cursor-pointer flex justify-center items-center flex-col  bg-gray-950'>
        <video className='h-120 w-135 rounded' autoPlay><source src={smallSrc}></source></video>
        <button className='active:scale-95 transition cursor-pointer  bg-red-400 m-2 p-2 rounded-md ' onClick={removeCartItem}>Remove from Collection</button>
        <div>{description}</div>
        <ToastContainer/>
      </div>
    )
}

export default FullResCardCart
