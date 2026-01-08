import React from 'react'
import { useLocation } from 'react-router-dom'
import { addPhotoCart } from '../redux/features/photoCart';
import { addVideoCart } from '../redux/features/videoCart';
import { addGifCart } from '../redux/features/gifCart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';


const FullResCard = () => {
    
    const {state} = useLocation();
    const {item} = state;
    const {description, smallSrc, type} = item;

    const dispatch = useDispatch();


    const photosCartData = useSelector((store)=> store.photosCart.value)
    const videosCartData = useSelector((store)=> store.videosCart.value)
    const gifsCartData = useSelector((store)=> store.gifsCart.value)

    
    function addItemcart(item){
      if(type === "photo"){
        for(let val of photosCartData){
          if(val.id === item.id){
            toast.error("Item already exists in collection")
            return
          }
        }
        dispatch(addPhotoCart(item));
        toast.success("Added to collection")
      }
      else if(type === 'video'){
        for(let val of videosCartData){
          if(val.id === item.id){
            toast.error("Item already exists in collection")
            return
          }
        }
        dispatch(addVideoCart(item));
        toast.success("Added to collection")
      }
      else if(type === 'gif')
      for(let val of gifsCartData){
        if(val.id === item.id){
          toast.error("Item already exists in collection")
          return
        }
      }
        dispatch(addGifCart(item));
        toast.success("Added to collection")
      }


    return (type === "photo" || type === "gif")? (
      <div className='h-100vh w-auto m-5 p-5 rounded cursor-pointer flex justify-center items-center flex-col  bg-gray-950'>
        <div><img src={smallSrc} className='h-120 w-135 rounded'/></div>
        <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md ' onClick={()=>addItemcart(item)}>Add to Collection</button>
        <div>{description}</div>
        <ToastContainer/>
      </div>
    )
    : (
      
      <div className='h-100vh w-auto m-5 p-5 rounded cursor-pointer flex justify-center items-center flex-col  bg-gray-950'>
        <video className='h-120 w-135 rounded' autoPlay><source src={smallSrc}></source></video>
        <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md ' onClick={()=>addItemcart(item)}>Add to Collection</button>
        <div>{description}</div>
        <ToastContainer/>
      </div>
    )
}

export default FullResCard
