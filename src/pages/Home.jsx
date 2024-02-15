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
import { Link } from 'react-router-dom';
import Recent from '../components/Recent';
import christmasoffer from '../assets/christmasoffer.jpg';
import dailyspecials from '../assets/dailyspecials.jpg';

function Home() {
  const [datas, setDatas] = useState([]);
  
  const {t} = useTranslation();
  
  const {adult,child,selectedOption,room,array,formattedCheckinDate,formattedCheckoutDate,currency,latitude,longitude,location,imageurl,history,setHistory,toggle,destType,destid,orderBy} = useApp();

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

  const recentHandler = () => {
    const updatedHistory = { recent: history.recent , ...history };
    updatedHistory.recent.unshift({
      city: location || history.recent[0].city,
      room_number: room,
      lat: latitude || history.recent[0].lat,
      lng: longitude || history.recent[0].lng,
      currencies: currency,
      locale: localStorage.getItem('i18nextLng'),
      checkout_date: formattedCheckoutDate,
      checkin_date: formattedCheckinDate,
      adults: adult,
      children: child,
      children_array: array,
      children_ages: selectedOption,
      img : imageurl || history.recent[0].img,
      dest_type : destType || history.recent[0].dest_type,
      dest_id : destid || history.recent[0].dest_id,
      order_by : orderBy || history.recent[0].order_by,
    }); 
    const data = localStorage.getItem('history');
    if (data === null) {
      localStorage.setItem('history', JSON.stringify(updatedHistory.recent))
    }
    else {
      const parsedData = JSON.parse(data);
      // Check if the city already exists in the recent history
      const cityExists = parsedData.some(item => item.city === updatedHistory.recent[0].city);
      if(cityExists) {
        const filtered = parsedData.filter(gg => gg.city !== updatedHistory.recent[0].city);
        filtered.unshift(updatedHistory.recent[0])
        localStorage.setItem('history', JSON.stringify(filtered))
      }
      else {
        parsedData.unshift(updatedHistory.recent[0]);
        localStorage.setItem('history', JSON.stringify(parsedData));
      }
    }    
  };

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
  
  const searchLink = `/search?city=${location || history.recent[0]?.city}&room=${parseInt(room)}&latitude=${latitude || history.recent[0]?.lat}&longitude=${longitude || history.recent[0]?.lng}&currency=${currency}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${formattedCheckoutDate}&checkindate=${formattedCheckinDate}&adult=${parseInt(adult)}&children=${parseInt(child)}${child > 0 ? `&children_quantity=${array}&children_ages=${selectedOption}`:''}&dest_id=${destid || history.recent[0]?.dest_id}&dest_type=${destType||  history.recent[0]?.dest_type}&order_by=${orderBy || history.recent[0]?.order_by}`;

  const offerlink = `/offers?city=${datas[0]?.title}&room_number=${room}&latitude=${datas[0]?.coordinates._lat}&longitude=${datas[0]?.coordinates._long}&filter_by_currency=${currency}&locale=${localStorage.getItem('i18nextLng')}&checkout_date=${formattedCheckoutDate}&adults=${adult}&checkin_date=${formattedCheckinDate}&children_number=${child}`;
 
  return (
    <div className='relative w-full h-screen'>
      <Herosection/>
      <div  className='absolute bg-white flex justify-center items-center gap-5 inset-x-0 max-w-6xl mx-auto px-[2%] py-[4%] border border-b border-gray-300 rounded-2xl top-[300px] z-50'>
        
        <Autocomplete/>
        
        <Daterange/>

        <GuestQuantity/>
        
        <Link to={searchLink} className='bg-blue-500 text-white text-lg font-semibold rounded-lg px-6 py-4 text-center hover:bg-blue-400'  onClick={()=>{recentHandler();
        toggle.current=true}}>{t('button.search')
        }
        </Link>
      </div>

      {/* recent searches */}
      <Recent recentHistory={history.recent}/>
      
       {/* sign in ad */}
       <Advertise/>

      <div className='px-10 w-full mt-[50px] mx-auto space-y-4 '>
        <div className='text-2xl font-semibold'>Offers and Rewards</div>
        <div className='flex items-center gap-[40px]'>
          <Link to={offerlink} className='w-[600px] flex items-center p-3 gap-4 shadow-[-1px_-1px_10px_rgb(0,0,0,0.2)] rounded-xl cursor-pointer'>
                <img src={christmasoffer} className='w-[180px] rounded-md' alt="loyalitypoint" /> 
                <div className='space-y-2'>
                  <span className='font-bold text-xl'>Christmas Exclusive Offer</span>
                  <p className='text-base'>Christmas in New York, up to 5% off hotels! Limited time. Book your festive escape now. 🎄🏨</p>
                  <div className='inline-block px-2 py-1 bg-orange-100'>
                    <div className='flex gap-1 items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="red" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      <p className='text-xs font-semibold text-red-500'>Offer Ends Dec 31</p>
                    </div>
                  </div>
                  <button className='px-4 py-1 bg-blue-500 text-white rounded-xl text-sm font-light block'>Book now</button>
                </div>
          </Link>
          <div className='w-[600px] flex items-center p-3 gap-4 shadow-[-1px_-1px_10px_rgb(0,0,0,0.2)] rounded-xl cursor-pointer'>
              <img src={dailyspecials} className='w-[180px] rounded-md' alt="loyalitypoint" /> 
              <div className='space-y-2'>
                <span className='font-bold text-xl'>Daily Specials</span>
                <p className='text-base'>Discover endless savings! Access all deals, offers, and discounts now. Start saving today!</p>
                <button className='px-4 py-1 bg-blue-500 text-white rounded-xl text-sm font-light block'>Claim now</button>
              </div>
          </div>
          {/* <div className='w-[200px]'>
              <img src={limitedtime} alt="hourpromo" /> 
            </div> */}
        </div>
      </div>
       

      {/* discover popular stays */}
      <div className='px-10 w-full mt-[50px] h-screen mx-auto space-y-4'>
        <span className='text-2xl font-semibold'>{t('popularStays.header')}</span>
        <Slider {...settings}>
        {!!datas &&
          datas.map(data => (
            <Link
            to={`/city/${data.title}?city=${data.title}&room_number=${room}&latitude=${data.coordinates._lat}&longitude=${data.coordinates._long}&filter_by_currency=${currency}&locale=${localStorage.getItem('i18nextLng')}&checkout_date=${formattedCheckoutDate}&adults=${adult}&checkin_date=${formattedCheckinDate}&children_number=${child}${child > 0 ? `&children_quantity=${array}&children_ages=${selectedOption}`:''}`}
              target='_blank'
              key={data.id}
              className='cursor-pointer'
              onClick={() => {
                let langauge = localStorage.getItem('i18nextLng');
                const updatedHistory = { recent: history.recent , ...history };
                updatedHistory.recent.unshift({
                  city: data?.title,
                  room_number: room,
                  lat: data.coordinates._lat,
                  lng: data.coordinates._long,
                  currencies: currency,
                  locale: langauge === 'en' ? `${langauge}_GB` : langauge,
                  checkout_date: formattedCheckoutDate,
                  checkin_date: formattedCheckinDate,
                  adults: adult,
                  children: child,
                  children_array: array,
                  children_ages: selectedOption,
                  img : data.image
                })
                const response = localStorage.getItem('history');
                if (response === null) {
                  localStorage.setItem('history', JSON.stringify(updatedHistory.recent))
                }
                else {
                  const parsedData = JSON.parse(response);              
                  // Check if the city already exists in the recent history
                  const cityExists = parsedData.some(item => item.city === updatedHistory.recent[0].city);
                  console.log(cityExists)
                  if(cityExists) {
                    const filtered = parsedData.filter(gg => gg.city !== updatedHistory.recent[0].city);
                    filtered.unshift(updatedHistory.recent[0])
                    // console.log(filtered)
                    localStorage.setItem('history', JSON.stringify(filtered))
                  }
                  else {
                    parsedData.unshift(updatedHistory.recent[0]);
                    localStorage.setItem('history', JSON.stringify(parsedData));
                  }
                }
              }}
            >
              <img src={data.image} alt="" className='w-full h-[200px] rounded-xl' />
              <div className='font-semibold mt-2'>{t(`cities.${data.title}.city`)}</div>
              <div className='text-sm'>{t(`cities.${data.title}.country`)}</div>
            </Link>
          ))}

        </Slider>
      </div>
      
    
    </div>
  );
}

export default Home;