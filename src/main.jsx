import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import News from "./components/News";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
const api = import.meta.env.VITE_REACT_APP_API_KEY;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <News api={api}  key="general" country="in" category="general" />
      },
      {
        path: "/general",
        element: <News api={api}  key="general" country="in" category="general" />
      },
      {
        path: "/business",
        element: <News api={api}  key="business" country="in" category="business" />
      },
      {
        path: "/entertainment",
        element: <News api={api}  key="entertainment" country="in" category="entertainment" />
      },
      {
        path: "/health",
        element: <News api={api}  key="health" country="in" category="health" />
      },
      {
        path: "/science",
        element: <News api={api}  key="science" country="in" category="science" />
      },
      {
        path: "/sports",
        element: <News api={api}  key="sports" country="in" category="sports" />
      },  
      {
        path: "/technology",
        element: <News api={api}  key="technology" country="in" category="technology" />
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
