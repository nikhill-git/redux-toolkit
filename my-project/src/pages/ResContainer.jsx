import React from "react";
import ResultCard from "../components/ResultCard";
import { useDispatch, useSelector } from "react-redux";
import { addPhotoCart } from "../redux/features/photoCart";
import { addVideoCart } from "../redux/features/videoCart";
import { addGifCart } from "../redux/features/gifCart";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


const ResContainer = () => {
  const photosData = useSelector((store) => store.photos.value);
  const videosData = useSelector((store) => store.videos.value);
  const gifsData = useSelector((store) => store.gifs.value);

  const dispatch = useDispatch();

  const activeTab = useSelector((store) => store.activeTab.value);


  const photosCartData = useSelector((store)=> store.photosCart.value)
  const videosCartData = useSelector((store)=> store.videosCart.value)
  const gifsCartData = useSelector((store)=> store.gifsCart.value)


  function APC(item) {
      for(let val of photosCartData){
      if(val.id === item.id){
        toast.error("Item already exists in the Collection")
        return
      }   
    }
    dispatch(addPhotoCart(item))
    
    toast.success("Added to collection!")

  } 

  function AVC(item){
    for(let val of videosCartData){
      if(val.id === item.id){
        toast.error("Item already exists in the Collection")
        return
      }
    }
    dispatch(addVideoCart(item))
    toast.success("Added to collection!")
  }

  function AGC(item){
    for(let val of gifsCartData){
      if(val.id === item.id){
        toast.error("Item already exists in the Collection")
        return
      }
    }
    dispatch(addGifCart(item))
    toast.success("Added to collection!")
  }


  return (photosData.length != 0 || videosData.length != 0 || gifsData.length != 0)? (
    
    <div className="m-0.2">
      <ToastContainer />
      {(activeTab == "photo")?
        <div className="flex flex-wrap justify-center items-center mb-4">
          {photosData.map((item)=>(     
            <div key={item.id}  className="flex flex-col mb-5 justify-center items-center">
               <ResultCard 
               item = {item}
              />
              <button onClick={()=>APC(item)} className='active:scale-95 transition cursor-pointer  bg-green-400 p-2 rounded-md'>Add to Collection</button>
            </div>            
          ))}
        </div>: 
      null}


      {(activeTab == "video")?
        <div className="flex flex-wrap justify-center items-center">
          {videosData.map((item)=>(
            <div key={item.id}  className="mb-5 flex flex-col justify-center items-center">
              <ResultCard 
              item = {item}
              />
            <button onClick={()=> AVC(item)} className='active:scale-95 transition  cursor-pointer  bg-green-400 p-2 rounded-md'>Add to Collection</button>

            </div>
          ))}
        </div>: 
      null}


      {(activeTab == "gif")?
        <div className="flex flex-wrap justify-center items-center">
          {gifsData.map((item)=>(
            <div key={item.id}  className="mb-5 flex flex-col justify-center items-center">
              <ResultCard 
              item = {item}
              />
              <button onClick={()=> AGC(item)} className='active:scale-95 transition  cursor-pointer  bg-green-400 p-2 rounded-md'>Add to Collection</button>
            </div>
            
          ))}
        </div>: 
      null}
    </div>
  ):(<div className='h-100vh flex justify-center mt-3 bg-white text-black'>
    <h1 className="text-3xl">Please Wait Data is Loading...</h1>
  </div>);
};

export default ResContainer;
