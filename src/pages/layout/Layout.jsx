import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { AppContextProvider } from '../../contexts/AppContext'
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../../i18next'; 

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