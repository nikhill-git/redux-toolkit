import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "./redux/features/searchSlice";
import { fetchPhotos, fetchVideos, getGFIS } from "./api/Mediaapi";
import { pushDataP } from "./redux/features/photosSlice";
import { pushDataV } from "./redux/features/videosSlice";
import { pushDataG } from "./redux/features/gifsSlice";
import { clearPhotoData } from "./redux/features/photosSlice";
import { clearVideoData } from "./redux/features/videosSlice";
import { clearGifData } from "./redux/features/gifsSlice";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { cacheResults } from "./redux/features/cacheResultsSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

const Header = () => {
  const [query, updateQuery] = useState("");
  const [Suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const user = useSelector((store) => store.isSignUp.value);
  console.log(user)
  const navigate = useNavigate();

  const cachedResults = useSelector((store) => store.cacheResult);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        navigate("/home");
      } else {
        // User is signed out
        // ...
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  //fetching all the data
  const allData = async (bothquery) => {
    if (query.length > 0) {
      //fetching the photos data
      let photosData = await fetchPhotos(bothquery);
      photosData = photosData.results;
      let photoObj = {};
      photosData.map((item) => {
        photoObj = {
          id: item.id,
          description: item.alt_description,
          type: item.asset_type,
          smallSrc: item.urls.small,
          fullSrc: item.urls.full,
          isActive: false,
        };
        dispatch(pushDataP(photoObj));
      });

      //fetching the videos data
      let videosData = await fetchVideos(bothquery);
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
        };
        dispatch(pushDataV(videoObj));
      });

      //fetching the gifs data and
      let gifsData = await getGFIS(bothquery);
      gifsData = gifsData.results;
      let gifObj = {};
      gifsData.map((item) => {
        gifObj = {
          id: item.id,
          description: item.content_description,
          type: "gif",
          smallSrc: item.media_formats.gif.url,
          fullSrc: item.media_formats.gif.url,
          isActive: false,
        };
        dispatch(pushDataG(gifObj));
      });
    }
  };

  const dispatch = useDispatch();
  // const queryfromStore = useSelector((store)=> store.searchQuery.value)

  function clearAllData() {
    dispatch(clearPhotoData());
    dispatch(clearVideoData()); // clearing all the data before pushing the new data
    dispatch(clearGifData());
  }

  function addQuerytoStore(query) {
    setShowSuggestions(false);

    //this onClick function will be executed even i dont click on the button
    // this onClick function is called even when i click on just press on ENTER key
    // console.log("Magic Button executed");
    clearAllData();
    //fetching the data with the query that newly updated
    allData(query);
    dispatch(setQuery(query)); //updating the query to the store
    // updateQuery(query);//updating the query on the UI => (old query will accessible , from the store)

    //Here we are pushing the data, so that we need to clear the previous data from the store,
    // so that the new data which is fetched form the new query will be stored
    //Or else new data will be stored along with the previous query data

    // dispatch(clearPhotoData());
    // dispatch(clearVideoData()); // clearing all the data before pushing the new data
    // dispatch(clearGifData());
    // clearAllData();

    // allData(queryfromStore);//getting the query from the store

    navigate("/home");
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  function hoverQuery(hquery) {
    //updated the query with the onClicked query from the Suggestions
    clearAllData();
    allData(hquery);
    dispatch(setQuery(hquery));
    updateQuery(hquery);
  }

  const searchSuggestions = async (query) => {
    const data = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
        query
    );
    const json = await data.json();
    dispatch(
      cacheResults({
        [query]: json[1],
      })
    );
    setSuggestions(json[1]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cachedResults[query]) {
        setSuggestions(cachedResults[query]);
      } else searchSuggestions(query);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  //even though the setTimeOut is 0 seconds, the onBlurFun will be stored in
  //Call back Queue, and then when the everything is rendered then the setTimeOut will be executed
  function onBlurFun() {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 0);
  }

  return (
    <div className="bg-blue-500 h-32 w-full">
      <div className="flex justify-between mx-15 py-3">
        <h2
          className="text-2xl cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Media Search
        </h2>
        <div className="flex gap-3">
          {user && (
            <Link to="/home">
              <button className="active:scale-95 transition text-xl cursor-pointer bg-red-500 py-1 px-2 rounded">
                Home
              </button>
            </Link>
          )}
          {user && (
            <Link to="/home/collection">
              <button className="active:scale-95 transition text-xl cursor-pointer bg-red-500 py-1 px-2 rounded">
                Collection
              </button>
            </Link>
          )}
          {
            <Link to="/">
              <button
                onClick={handleSignOut}
                className="active:scale-95 transition text-xl cursor-pointer bg-red-500 py-1 px-2 rounded"
              >
                Sign Out
              </button>
            </Link>
          }
        </div>
      </div>

      <div className=" flex justify-center w-full">
        <form
          className="w-1/2 flex justify-center gap-1 flex-col"
          onSubmit={(e) => e.preventDefault()}
        >
          {user && (
            <div className=" flex gap-1.5">
              <input
                onClick={() => setShowSuggestions(true)}
                //after two seconds setShowSuggestions become false,
                //im building a new feature, that
                //if i click on the suggestions,it show be added to query and fetch the data with that query,
                // to implement this, here when im clicking on that suggestred query , this onBlur funciton is called and setting the
                //showSuggestions value to false, so im using a setTime out here for 100 milli seconds
                onBlur={onBlurFun}
                type="text"
                value={query}
                onChange={(e) => {
                  updateQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className=" font-medium text-xl border-2 w-2/3 px-4 py-2 rounded outline-none text-white"
                placeholder="Search Anything..."
              />
              <button
                className="active:scale-95 transition cursor-pointer border-2 font-medium text-xl px-4 py-2 rounded outline-none text-white"
                onClick={() => addQuerytoStore(query)}
              >
                Search
              </button>
            </div>
          )}

          {showSuggestions && Suggestions.length != 0 && (
            <div className=" rounded relative w-2/3 p-3 my-3 bg-black flex flex-col gap-1 ">
              {Suggestions.map((val, idx) => (
                <div
                  key={idx}
                  onPointerDown={() => hoverQuery(val)}
                  className=" px-1 py-0.5 rounded text-xm m-1 cursor-pointer text-white hover:bg-gray-800"
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Header;
