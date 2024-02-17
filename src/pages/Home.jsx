import React, { useState, useEffect, useRef} from 'react';
import './App.css'
import Herosection from '../components/Herosection';
import Autocomplete from '../components/shared/Autocompelete/Autocomplete';
import Daterange from '../components/shared/DateRange/Daterange';
import GuestQuantity from '../components/shared/GuestQuantity/GuestQuantity';
import { useTranslation } from 'react-i18next';
import useApp from '../hooks/useApp';
import Advertise from '../components/Advertise';
import Recent from '../components/Recent';
import SearchButton from '../components/shared/searchButton/SearchButton';
import DiscoverPopularStays from '../components/DiscoverPopularStays';

function Home() {
  
  const {t} = useTranslation();
  
  const {setHistory} = useApp();

  useEffect(() => {
    let historyData = localStorage.getItem('history');
    
    if (historyData === null) {
      setHistory({ recent: [] });
    } else {
      let parsedHistoryData = JSON.parse(historyData);
      setHistory((prevHistory) => ({ ...prevHistory, recent: [...parsedHistoryData] }));
    }
  }, []);

  return (
    <div className='relative w-full h-screen'>
      <Herosection/>

      <div  className='absolute bg-white flex justify-center items-center gap-5 inset-x-0 max-w-6xl mx-auto px-[2%] py-[4%] border border-b border-gray-300 rounded-2xl top-[300px] z-50'>
        
        <Autocomplete/>
        
        <Daterange/>

        <GuestQuantity/>

        <SearchButton/>

      </div>

      {/* recent searches */}
      <Recent/>
      
       {/* sign in ad */}
       <Advertise/>

      {/* discover popular stays */}
      <DiscoverPopularStays/>    
    </div>
  );
}

export default Home;