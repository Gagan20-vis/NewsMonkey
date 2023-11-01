import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import News from "./components/News";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/general",
        element: <News key="general" country="in" category="general" />
      },
      {
        path: "/business",
        element: <News key="business" country="in" category="business" />
      },
      {
        path: "/entertainment",
        element: <News key="entertainment" country="in" category="entertainment" />
      },
      {
        path: "/health",
        element: <News key="health" country="in" category="health" />
      },
      {
        path: "/science",
        element: <News key="science" country="in" category="science" />
      },
      {
        path: "/sports",
        element: <News key="sports" country="in" category="sports" />
      },  
      {
        path: "/technology",
        element: <News key="technology" country="in" category="technology" />
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
