
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import appStore from './redux/store.js'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import FullResCard from './components/FullResCard.jsx'
import Collection from './pages/Collection.jsx'
import FullResCardCart from './components/FullResCardCart.jsx'
import Login from './Login.jsx'
import Body from './Body.jsx'



const appRouter = createBrowserRouter([
  {
    path:"/",
    element : <Login/>,
  },
  {
    path : "/home",
    element : <App/>,
    children: [
      {
        path: "/home",
        element : <Body/>
      },
      {
        path:"/home/fullImage",
        element: <FullResCard/>
      },
      {
        path:"/home/collection",
        element: <Collection/>
      },
      {
        path:"/home/fullImageCart",
        element: <FullResCardCart/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter}/>
  </Provider>
)