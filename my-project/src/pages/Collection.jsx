import React from 'react'
import SectionsCart from '../components/sectionsCart';
import { useDispatch, useSelector } from 'react-redux';
import ResultCard from '../components/ResultCard';
import ResultCardCart from '../components/ResultCardCart';
import { removePhotoCart } from '../redux/features/photoCart';
import { removeVideoCart } from '../redux/features/videoCart';
import { removeGifCart } from '../redux/features/gifCart';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


const Collection = () => {

  const dispatch = useDispatch();

  const photoCartData = useSelector((store)=> store.photosCart.value);
  const videoCartData = useSelector((store)=> store.videosCart.value);
  const gifCartData = useSelector((store)=> store.gifsCart.value);

  const activeCartTab = useSelector((store) => store.activeTabCart.value);

  function removePhoto(item){
    dispatch(removePhotoCart(item))
    toast.success("Removed from collection")
  }
  function removeVideo(item){
    dispatch(removeVideoCart(item))
    toast.success("Removed from collection")
  }
  function removeGif(item){
    dispatch(removeGifCart(item))
    toast.success("Removed from collection")
  }


  return (
    <div>
      <ToastContainer/>
      {(photoCartData.length !== 0) || (videoCartData.length !== 0) || (gifCartData.length !== 0) 
      ? (<div>
        <SectionsCart/>

        {(activeCartTab == "photoCart")? (
        <div className="flex flex-wrap justify-center items-center mb-4">
          {photoCartData.map((item)=> (
            <div key={item.id} className="flex flex-col mb-5 justify-center items-center">
              <ResultCardCart
              item = {item}
              />
              <button className='active:scale-95 transition  cursor-pointer  bg-red-400 p-2 rounded-md' onClick={()=>removePhoto(item)}>Remove</button>
            </div>
          ))}
        </div>): null}


        {(activeCartTab == "videoCart")? (
        <div className="flex flex-wrap justify-center items-center mb-4">
          {videoCartData.map((item)=> (
            <div key={item.id} className="flex flex-col mb-5 justify-center items-center">
              <ResultCardCart
              item = {item}
              />
              <button className='active:scale-95 transition cursor-pointer  bg-red-400 p-2 rounded-md' onClick={()=>removeVideo(item)}>Remove</button>
            </div>
          ))}
        </div>): null}


        {(activeCartTab == "gifCart")? (
        <div className="flex flex-wrap justify-center items-center mb-4">
          {gifCartData.map((item)=> (
            <div key={item.id} className="flex flex-col mb-5 justify-center items-center">
              <ResultCardCart
              item = {item}
              />
              <button className='active:scale-95 transition cursor-pointer  bg-red-400 p-2 rounded-md' onClick={()=>removeGif(item)}>Remove</button>
            </div>
          ))}
        </div>): null}

        

      </div>) 
      : (<div className='flex flex-col justify-center items-center gap-3 my-3 '>
         <h1 className='text-3xl'>Collection is Empty.</h1> 
         <h1 className='text-3xl mb-2.5'>Add Somthing to Collection..</h1>
      </div>) }
      
    </div>
  )
}

export default Collection;