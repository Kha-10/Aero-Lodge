import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './App.css'
import Herosection from '../components/Herosection';
import Autocomplete from '../components/Autocomplete';
import Daterange from '../components/Daterange';
import Guests from '../components/Guests';
import Adult from '../components/Adult';
import Child from '../components/Child';
import Room from '../components/Room';
import { useTranslation } from 'react-i18next';
import useApp from '../hooks/useApp';


function Home() {
  const [coordinates, setCoordinates] = useState(null);
  const [popup, setPopup] = useState(false);
  const [newPopup , setNewPopup] = useState (false);
  const popRef = useRef(null);
  
  const {t} = useTranslation();

  const {adult,setAdult,child,setChild,selectedOption,setSelectedOption,room,setRoom,
  options,array,setArray,date,setDate,formattedCheckinDate,formattedCheckoutDate} = useApp();



  const addHandler = () => {
    if (child < 10) {
      setChild( prevChild => prevChild +1);
      setArray(prevArray => [...prevArray, child]);
    }
  };
 
  const removeHandler = () => {
    if (child > 0) {
      setChild ( prevChild => prevChild - 1);
      const arr = array ;
      arr.pop()
      setArray (arr)
      const aar = selectedOption;
      aar.pop()
      setSelectedOption(aar)
    }
  };

  const addNewHandler = () => {
    if (adult < 30) {
      setAdult( prevAdult => prevAdult +1);
     
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

  useEffect (()=> {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
        setCoordinates({latitude ,longitude})
    })
  },[]);

  // hotels
  // useEffect(() => {
  //   if (coordinates) {
  //     // const {latitude , longitude} = coordinates;
  //     const fetchData = async () => {
  //       try{
  //         const {data} = await axios.get ('https://booking-com.p.rapidapi.com/v1/static/hotels',{
  //           params: {
  //             page: '0',
  //             country: 'mm',
  //           },
  //           headers: {
  //             'X-RapidAPI-Key': 'f5d6e53d36msh7f177c6bbb4569ep1b2407jsn24136a67509e',
  //             'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
  //           }
  //         })
  //         console.log(data)
  //       }
  //       catch (error) {
  //         console.error("error", error.message)
  //       }
  //     }
  //     fetchData()
  //   }
  // }, [coordinates]);
  

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

  const getData = async () => {
    const {latitude , longitude} = coordinates;
    const childrenAges = selectedOption.toString();
    try {
      const params = {
            units: 'metric',
            room_number: room,
            longitude: longitude,
            latitude: latitude,
            filter_by_currency: 'USD',
            order_by: 'popularity',
            locale: 'en-gb',
            checkout_date: formattedCheckoutDate,
            adults_number: adult,
            checkin_date: formattedCheckinDate,
            include_adjacency: 'true',
          }
          if (child >0) {
            params.children_number = child;
            params.children_ages=childrenAges;
          }
          const {data :{result}} = await axios.get ('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',{
            params : params ,
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_BOOKING_API_KEY,
              'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
            
          })
        console.log(result);

      } 
      catch (error) {
          // Something else went wrong
          console.error('Error:', error.message);
      }
   
  };

  // const options =[];
  // for (let i = 0; i < 18; i++) {
  //    options.push({
  //     value : `${i}`,
  //     label : t('age.label',{count:i})
  //   }) 
  // }

  // const options = [
  //   { value: '0', label: `0 ${t('option.label')}` },
  //   { value: '1', label: '1 years old' },
  //   { value: '2', label: '2 years old' },
  //   { value: '3', label: '3 years old' },
  //   { value: '4', label: '4 years old' },
  //   { value: '5', label: '5 years old' },
  //   { value: '6', label: '6 years old' },
  //   { value: '7', label: '7 years old' },
  //   { value: '8', label: '8 years old' },
  //   { value: '9', label: '9 years old' },
  //   { value: '10', label: '10 years old' },
  //   { value: '11', label: '11 years old' },
  //   { value: '12', label: '12 years old' },
  //   { value: '13', label: '13 years old' },
  //   { value: '14', label: '14 years old' },
  //   { value: '15', label: '15 years old' },
  //   { value: '16', label: '16 years old' },
  //   { value: '17', label: '17 years old' },
  // ];

  
  
  return (
    <div  className='relative w-full h-screen'>
      <Herosection/>
      <div className='absolute bg-white inset-x-0 max-w-6xl mx-auto px-[2%] py-[4%] flex items-center justify-between border border-b border-gray-300 rounded-2xl top-[300px]'>
        <Autocomplete setCoordinates={setCoordinates}  />

        <Daterange handleNewPopup={handleNewPopup} setNewPopup={setNewPopup} 
        newPopup={newPopup} setDate={setDate} date={date} />


        <div ref={popRef}  className='group'>
          <div onClick={handlePopup} className='relative w-[300px] h-[60px] p-3  border border-gray-400 flex justify-between items-center rounded-lg group-hover:border-blue-500' >
            <Guests adult={adult} child={child} room={room}/>
          </div>
        
        {!!popup && <div className='bg-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] w-[330px] rounded-lg absolute top-[70%] right-[15%] flex flex-col space-y-5 p-6 '>
          
          <Adult removeNewHandler={removeNewHandler} adult={adult} addNewHandler={addNewHandler}/>
          
          <Child  removeHandler={removeHandler} child={child} addHandler={addHandler} array={array} handleChange={handleChange}
          selectedOption={selectedOption} options={options}/>
          
          <Room room={room} removeRoom={removeRoom} addRoom={addRoom}/>
          
          <button type='' className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={handlePopup}>Done</button>
          </div>}
        </div>
        <button type='button' onClick={getData} className='bg-blue-500 text-white text-lg font-semibold rounded-lg h-[60px] w-[120px] hover:bg-blue-400'>{t('button.search')}</button>
      </div>
    </div>
  );
}

export default Home;
