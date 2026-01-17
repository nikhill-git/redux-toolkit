import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./features/searchSlice"
import photosSlice from './features/photosSlice'
import videosSlice from './features/videosSlice'
import gifsSlice from './features/gifsSlice'
import activeTab from "./features/activeTab"
import photoCart from "./features/photoCart"
import videoCart from "./features/videoCart"
import gifCart from './features/gifCart'
import activeTabCart from "./features/activetabCart"
import cacheResultsSlice from  "./features/cacheResultsSlice"
import isSignUpSlcie from "./features/isSignUpSlice"

const appStore = configureStore({
    reducer:{
        searchQuery:searchSlice,
        photos:photosSlice,
        videos:videosSlice,
        gifs:gifsSlice,
        activeTab : activeTab,
        photosCart : photoCart,
        videosCart : videoCart,
        gifsCart : gifCart,
        activeTabCart: activeTabCart,
        cacheResult : cacheResultsSlice,
        isSignUp: isSignUpSlcie,
    }
})

export default appStore