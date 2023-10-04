import {
    createBrowserRouter,
  } from "react-router-dom";
  import Layout from "../pages/layout/Layout.jsx";
import Home from '../pages/Home.jsx'
import Search from "../pages/Search.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
        {
            path:"",
            element: <Home/>
        },
        {
            path:"/search",
            element: <Search/>
        }
      ]
    },
  ]);

  export default router 