import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { AppContextProvider } from '../../contexts/AppContext'

const Layout = () => {
  return (
  
  <AppContextProvider>
    <>
      <Navbar />
      <Outlet />
    </>
  </AppContextProvider>
  )
}

export default Layout