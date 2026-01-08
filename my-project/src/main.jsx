
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import appStore from './redux/store.js'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import FullResCard from './components/FullResCard.jsx'
import Collection from './pages/Collection.jsx'
import Body from './Body.jsx'
import FullResCardCart from './components/FullResCardCart.jsx'


const appRouter = createBrowserRouter([
  {
    path:"/",
    element : <App/>,
    children: [
      {
        path:"/",
        element: <Body/>
      },
      {
        path:"/home",
        element: <Body/>
      },
      {
        path:"/fullImage",
        element: <FullResCard/>
      },
      {
        path:"/collection",
        element: <Collection/>
      },
      {
        path:"/fullImageCart",
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