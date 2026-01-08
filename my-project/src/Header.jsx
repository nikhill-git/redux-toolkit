import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "./redux/features/searchSlice";
import { fetchPhotos, fetchVideos, getGFIS } from "./api/Mediaapi";
import { pushDataP } from "./redux/features/photosSlice";
import { pushDataV } from "./redux/features/videosSlice";
import { pushDataG } from "./redux/features/gifsSlice";
import { clearPhotoData } from "./redux/features/photosSlice";
import { clearVideoData } from "./redux/features/videosSlice";
import { clearGifData } from "./redux/features/gifsSlice";
import { useNavigate , Link, NavLink} from "react-router-dom";


const Header = () => {
  const [query, updateQuery] = useState("");

  const navigate = useNavigate();

  //fetching all the data
  const allData = async (query) => {
    if (query.length > 0) {


      //fetching the photos data
      let photosData = await fetchPhotos(query);
      photosData = photosData.results;
      let photoObj = {}
      photosData.map((item) => {
          photoObj = {
          id: item.id,
          description: item.alt_description,
          type: item.asset_type,
          smallSrc: item.urls.small,
          fullSrc: item.urls.full,
          isActive : false,
        };
        dispatch(pushDataP(photoObj));
      });



      //fetching the videos data
      let videosData = await fetchVideos(query);
      videosData = videosData.videos;
      let videoObj = {};
      videosData.map((item) => {
        videoObj = {
          id: item.id,
          description: item.user.name,
          type: "video",
          smallSrc: item.video_files[0].link,
          fullSrc: item.video_files[0].link,
          isActive: false,
        }
        dispatch(pushDataV(videoObj));
      });
      


      //fetching the gifs data and 
      let gifsData = await getGFIS(query);
      gifsData = gifsData.results;
      let gifObj = {}
      gifsData.map((item)=> {
        gifObj = {
          id : item.id,
          description: item.content_description,
          type: "gif",
          smallSrc: item.media_formats.gif.url,
          fullSrc: item.media_formats.gif.url,
          isActive: false,
        }
        dispatch(pushDataG(gifObj))
      })

    }
  };

  const dispatch = useDispatch();
  // const queryfromStore = useSelector((store)=> store.searchQuery.value)


  function clearAllData(){
    dispatch(clearPhotoData());
    dispatch(clearVideoData()); // clearing all the data before pushing the new data
    dispatch(clearGifData());
  }

   function addQuerytoStore() {
    clearAllData();
    allData(query);
    dispatch(setQuery(query));//updating the query to the store
    updateQuery("");//updating the query on the UI => (old query will accessible , from the store)
    
    //Here we are pushing the data, so that we need to clear the previous data from the store,
    // so that the new data which is fetched form the new query will be stored
    //Or else new data will be stored along with the previous query data
    
    // dispatch(clearPhotoData());
    // dispatch(clearVideoData()); // clearing all the data before pushing the new data
    // dispatch(clearGifData());
    // clearAllData();

    // allData(queryfromStore);//getting the query from the store 

    navigate("/");
  }


  return (
    <div className="bg-blue-500 h-32 w-full">
      <div className="flex justify-between mx-15 py-3">
        <h2 className="text-2xl cursor-pointer" onClick={()=> navigate("/")}>Media Search</h2>
        <div className="flex gap-3">
          <Link  to='/home'><button className="active:scale-95 transition text-xl cursor-pointer bg-red-500 py-1 px-2 rounded" >
          Home
        </button></Link>
        <Link to='/collection'><button className="active:scale-95 transition text-xl cursor-pointer bg-red-500 py-1 px-2 rounded" >
          Collection
        </button></Link>
        </div>
        
      </div>

      <div className="flex justify-center">
        <form
          className="w-full flex justify-center gap-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            className=" font-medium text-xl border-2 w-1/2 px-4 py-2 rounded outline-none text-white"
            placeholder="Search Anything..."
          />
          <button
            className="active:scale-95 transition cursor-pointer border-2 font-medium text-xl px-4 py-2 rounded outline-none text-white"
            onClick={addQuerytoStore}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
