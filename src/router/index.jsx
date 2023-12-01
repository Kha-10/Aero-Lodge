import {
  Navigate,
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../pages/layout/Layout.jsx";
import Home from '../pages/Home.jsx'
import City from "../pages/City.jsx";
import Search from "../pages/Search.jsx";
import Offers from "../pages/Offers.jsx";
import HotelDetail from "../pages/hotelDetail.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
        {
            path:"",
            element: <Home/>
        },
      //   {
      //     path:":locale",
      //     element: <Home/>
      // },
        {
            path:"/city/:title",
            element: <City/>
        },
        {
          path:"/search",
          element: <Search/>
        },
        {
          path:"/offers",
          element: <Offers/>
        },
        {
          path:"/hotelDetail/:id",
          element: <HotelDetail/>
        }
      ]
    },
  ]);

  export default router 