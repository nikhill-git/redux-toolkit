import React from 'react'
import { useDispatch } from 'react-redux'
import { changeActiveTabCart } from '../redux/features/activetabCart'; 
import { clearPhotoCart } from '../redux/features/photoCart';
import { clearVideoCart } from '../redux/features/videoCart';
import { clearGifCart } from '../redux/features/gifCart';



const SectionsCart = () => {

    const dispatch = useDispatch();

    function activePhotoCart(){
        dispatch(changeActiveTabCart("photoCart"))
    }
    function activeVideoCart(){
        dispatch(changeActiveTabCart("videoCart"))
    }
    function activeGifCart(){
        dispatch(changeActiveTabCart("gifCart"))
    }

    function clearCollection(){
      dispatch(clearPhotoCart());
      dispatch(clearVideoCart());
      dispatch(clearGifCart());
    }

 return (
    <div>

      <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md' onClick={activePhotoCart}>Photos</button>
      <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md' onClick={activeVideoCart}>Videos</button>
      <button className='active:scale-95 transition cursor-pointer  bg-green-400 m-2 p-2 rounded-md' onClick={activeGifCart}>GIFs</button>
      <button className='active:scale-95 transition cursor-pointer  bg-red-400 m-2 p-2 rounded-md ml-10' onClick={clearCollection}>Clear Collection</button>
        
    </div>
  )
}

export default SectionsCart
