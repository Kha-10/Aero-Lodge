import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Guests from '../components/Guests';
import Adult from '../components/Adult';
import Child from '../components/Child';
import Room from '../components/Room';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import Autocomplete from '../components/Autocomplete';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import axios from 'axios';
import useApp from '../hooks/useApp';


const Search = () => {
    const locations = useLocation();
    const params = new URLSearchParams(locations.search);
    const city= params.get('city');
    console.log(city)
    const lat = params.get('latitude');
    const lng = params.get('longitude');
    const roomCount = parseInt(params.get('room'));
    const adultCount = parseInt(params.get('adult'));
    const childCount = parseInt(params.get('children'));
    const children_age = params.get('children_ages')
    const childrenQuantity = params.get('children_quantity');
    let arr_ay;
    if(children_age) {
       arr_ay = children_age.split(',');
    }else arr_ay =[]
    let arr;
    if(childrenQuantity) {
       arr = childrenQuantity.split(',');
    }else arr = []
   
    const locale = params.get('locale')
    const cur = params.get('currency')
    const {location,setLocation,toggle,latitude,longitude,imageurl} = useApp();
  
    const [adult, setAdult] = useState(adultCount);
    const [child, setChild] = useState(childCount);

    const checkinDate = params.get('checkindate');
    console.log(checkinDate)
    const inputCheckinDate = new Date(checkinDate);
    const opts = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    };
    const weekdayCheckinDate = inputCheckinDate.toLocaleString('en-US', opts);
    

    const checkoutDate = params.get('checkoutdate');
    const inputCheckoutDate = new Date(checkoutDate);
    const opt = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    };
    const weekdayCheckoutDate = inputCheckoutDate.toLocaleString('en-US', opt);

    const [date, setDate] = useState([
      {
        startDate: new Date(weekdayCheckinDate),
        endDate: new Date(weekdayCheckoutDate),
        key: 'selection'
      }
    ]);
  
    const checkInDate = new Date (date[0].startDate) ;
  
    const checkInYear = checkInDate.getFullYear();
  
    const checkInMonth = (checkInDate.getMonth()+1).toString().padStart(2,0);
  
    const checkInDay = checkInDate.getDate().toString().padStart(2,0)
  
    const formattedCheckinDate = `${checkInYear}-${checkInMonth}-${checkInDay}`;
  
    const checkOutDate = new Date (date[0].endDate);
  
    const checkOutYear = checkOutDate.getFullYear();
  
    const checkOutMonth = (checkOutDate.getMonth()+1).toString().padStart(2,0);
  
    const checkOutDay = checkOutDate.getDate().toString().padStart(2,0);
  
    const formattedCheckoutDate = `${checkOutYear}-${checkOutMonth}-${checkOutDay}`;
  

    const [popup, setPopup] = useState(false);
    const [newPopup , setNewPopup] = useState (false);
    const popRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(arr_ay);
    const [room, setRoom] = useState(roomCount);
    const {t,i18n} = useTranslation();
    const options =[];
    for (let i = 0; i < 18; i++) {
     options.push({
      value : `${i}`,
      label : t('age.label',{count:i})
    }) 
  }

  const [arrayy,setArrayy] = useState(arr);
  const [address, setAddress] = useState(city);
  const newPopRef = useRef(null);
  const [data, setData] = useState([]);
  

    const addHandler = () => {
        if (child < 10) {
          setChild( prevChild => prevChild +1);
          setArrayy(prevArrayy => [...prevArrayy, child]);
        }
      };
     
      const removeHandler = () => {
        if (child > 0) {
          setChild ( prevChild => prevChild - 1);
          const arr = arrayy ;
          arr.pop()
          setArrayy (arr)
          const aar = selectedOption;
          aar.pop()
          setSelectedOption(aar)
        }
      };
    
      const addNewHandler = () => {
        if (adult < 30) {
          setAdult( prevAdultt => prevAdultt +1);
         
        }
      };
    
      const removeNewHandler = () => {
        if (adult > 1) {
          setAdult ( prevAdult => prevAdult - 1);
        }
      };
    
      const addRoom = () => {
        if (room < 30 ) {
          setRoom(prevRoom => prevRoom+1);
        }
      }
    
      const removeRoom = () => {
        if (room > 1 ) {
          setRoom(prevRoom => prevRoom-1 );
        }
      }
      
     const handleChange = (event, index) => {
        console.log("Index:", index);
        console.log(event.target.value)
      // Update the selectedOption array
        const updatedSelectedOption = [...selectedOption];
        updatedSelectedOption[index] = event.target.value;
        console.log(updatedSelectedOption[index])
        setSelectedOption(updatedSelectedOption);
      }
    
      const handlePopup = () => {
          setPopup(!popup)
          setNewPopup (false)
       
      }
    
      const handleNewPopup = () => {
        setNewPopup (!newPopup)
        setPopup(false)
       
      }

      useEffect(() => {
        function handleClickOutside(event) {
          if (!popRef.current.contains(event.target)) {
            setPopup(false)
           
          }
        }
    
        if (popup) {
          document.addEventListener('click', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
        
      },[popup]);

      useEffect(() => {
        function handleClickOutside(event) {
          if (!newPopRef.current.contains(event.target)) {
            setNewPopup(false);
          }
        }
    
        if (newPopup) {
          document.addEventListener('click', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [newPopup]);

      useEffect(() => {
        i18n.changeLanguage(locale)
      }, [locale])

      useEffect(()=> {
        const getData = async () => {
          let lang = ''; 
          if(locale ==='en') {
             lang = locale+'-gb'
          }
          try {
            const params = {
                  units: 'metric',
                  room_number: roomCount,
                  longitude : lng,
                  latitude :lat,
                  filter_by_currency:cur,
                  locale:lang,
                  order_by: 'popularity',
                  checkout_date: checkoutDate,
                  adults_number :adultCount,
                  checkin_date :checkinDate,
                  include_adjacency: 'true',
                  page_number: '0',
                }
                if (childCount > 0) {
                  params.children_number = childCount;
                  params.children_ages = children_age;
                }
                const {data:{result} } = await axios.get ('http://localhost:8000/datas',{
                  params : params,
                })
              console.log(result);
              setData(result)
      
            } 
            catch (error) {
              if (error.response) {
                console.error('Data:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request made but no response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
                // Something else went wrong
                console.error('Error:', error.message);
            }
         
        };
        getData()
      },[])
      
      useEffect(()=>{
        setLocation(address)
        toggle.current=true;
      },[address])

      const searchLink = `/search?city=${location}&room=${room}&latitude=${latitude}&longitude=${longitude}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${formattedCheckoutDate}&checkindate=${formattedCheckinDate}&adult=${adult}&children=${child}${child > 0 ? `&children_quantity=${arrayy}&children_ages=${selectedOption}` : ''}&img=${imageurl}`;


  return (
    <div className='w-full h-screen bg-gray-100'>
        <div  className='absolute  inset-x-0 max-w-6xl mx-auto px-[2%] py-[4%] flex items-center justify-between top-[50px]'>
        
           <Autocomplete/>
            <div ref={newPopRef} className='cursor-pointer group'>
                <div onClick={handleNewPopup} className='relative bg-white w-[300px] h-[60px] border border-b rounded-lg border-gray-400 flex items-center justify-around group-hover:border-blue-500 p-3'>
                    <div className='absolute left-1 pl-3 pointer-events-none flex items-center gap-4 p-3' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    <span>
                        {`${t('daterange.startDate', { date: new Date(date[0]?.startDate) })} - ${t('daterange.endDate', { date: new Date(date[0]?.endDate) })}`}
                    </span>
                    </div>
                </div> 
            {!!newPopup && <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className='shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] absolute top-[70%] text-sm z-10'
          />}
            </div>
            
            <div ref={popRef}  className='group cursor-pointer'>
            <div onClick={handlePopup} className='relative w-[300px] bg-white h-[60px] p-3  border border-gray-400 flex justify-between items-center rounded-lg group-hover:border-blue-500' >
                <Guests adult={adult} child={child} room={roomCount}/>
            </div>
            
            {!!popup && 
            <div className='bg-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] w-[330px] rounded-lg absolute top-[70%] right-[15%] flex flex-col space-y-5 p-6 '>
            
            <Adult removeNewHandler={removeNewHandler} adult={adult} addNewHandler={addNewHandler}/>
            
            <Child  removeHandler={removeHandler} child={child} addHandler={addHandler} array={arrayy} handleChange={handleChange}
            selectedOption={selectedOption} options={options}/>
            
            <Room room={room} removeRoom={removeRoom} addRoom={addRoom}/>
            
            <button type='button' className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={handlePopup}>Done</button>
            </div>}
            </div>
            <Link to={searchLink} className='bg-blue-500 text-white text-lg font-semibold rounded-lg px-6 py-4 text-center hover:bg-blue-400' target='_blank'>{t('button.search')
            }
            </Link>
            <div className='w-full'>

            </div>
      </div>
    </div>
  )
}

export default Search