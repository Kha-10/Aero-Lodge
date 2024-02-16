import React, { useState, useEffect, useRef} from 'react';
import './App.css'
import Herosection from '../components/Herosection';
import Autocomplete from '../components/shared/Autocompelete/Autocomplete';
import Daterange from '../components/shared/DateRange/Daterange';
import GuestQuantity from '../components/shared/GuestQuantity/GuestQuantity';
import { useTranslation } from 'react-i18next';
import useApp from '../hooks/useApp';
import Advertise from '../components/Advertise';
import {db} from '../firebase/index'
import { collection, getDocs } from 'firebase/firestore';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Recent from '../components/Recent';
import SearchButton from '../components/shared/searchButton/SearchButton';
import PopularCityLink from '../components/PopularCityLink';

function Home() {
  const [datas, setDatas] = useState([]);
  
  const {t} = useTranslation();
  
  const {setHistory} = useApp();

  useEffect(() => {
    let ref = collection(db,'stays');
    getDocs(ref).then(docs => {
      let datas =[];
      docs.forEach(doc => {  
        let data = {id:doc.id,...doc.data()}
        datas.push(data)
        setDatas(datas)
      })
    })
  }, []);

  useEffect(() => {
    let historyData = localStorage.getItem('history');
    
    if (historyData === null) {
      setHistory({ recent: [] });
    } else {
      let parsedHistoryData = JSON.parse(historyData);
      setHistory((prevHistory) => ({ ...prevHistory, recent: [...parsedHistoryData] }));
    }
  }, []);

  const NextArrow = (props) => {
    const {onClick} = props
    return(
      <div onClick={onClick}>
        <button className='absolute top-[85px] -right-[5px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center g-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)] hover:bg-blue-100'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="blue" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    )
  }

  const PrevArrow = (props) => {
    const {onClick} = props
    return(
      <div onClick={onClick}>
        <button className='absolute top-[85px] -left-[5px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center g-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)] hover:bg-blue-100'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="blue" className="w-4 h-4 flex items-center justify-center">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    prevArrow : <PrevArrow/>,
    nextArrow : <NextArrow/>
  };
  
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
      <div className='px-10 w-full mt-[50px] h-screen mx-auto space-y-4'>
        <span className='text-2xl font-semibold'>{t('popularStays.header')}</span>
        <Slider {...settings}>
            {!!datas &&
              datas.map(data => (
                <PopularCityLink
                key={data.id}
                data={data}                               
                />
              ))}
        </Slider>
      </div>
      
    
    </div>
  );
}

export default Home;