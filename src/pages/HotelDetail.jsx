import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const HotelDetail = () => {
    const [location, setLocation] = useState('');
    console.log(location)
    const [suggestions,setSuggestions] = useState(null);
    console.log(suggestions)
    const popRef = useRef(null);

    const handleOnChange = (e) => {
        setLocation(e.target.value);
    }

   useEffect(()=>{
        if(location.length>2) {
            const getLocation = async () => {
                try{
                    const {data} = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations',{
                        params: {
                            name: location,
                            locale: 'en-gb'
                          },
                          headers: {
                            'X-RapidAPI-Key': '7508e5cc53msh937c5f7e6e5f065p12ae9fjsnd40f16a888e9',
                            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                          }
                    });
                    setSuggestions(data)
                    console.log(data)
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
                  }
            }
            getLocation()
        }
    },[location])

    useEffect(()=>{
        if(location.length <= 2) {
            setSuggestions(null)
           
        }
    },[location])

    useEffect(() => {
        function handleClickOutside(event) {
          if (!popRef.current || !popRef.current.contains(event.target)) {
            setSuggestions(null);
           
          }
        }
      
        document.addEventListener('click', handleClickOutside);
      
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [suggestions]);
    
    const removeHandler = () => {
        setLocation('')
    }


  return (
    <div className='mx-auto max-w-xl w-full'>
        <input type="text" placeholder='Enter your destination' className='w-[300px] h-[60px] py-3 px-12 border bg-white border-gray-400  rounded-md placeholder-black' value={location} onChange={handleOnChange} />
        <div className="absolute left-30 top-[89px] pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        </div>
        {!!location && <button className="absolute right-[720px] top-[94px] pl-3" onClick={removeHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>}
        {!!suggestions && location.length !== 0 && suggestions.length > 0 && (
            <div className='relative group' ref={popRef} >
                <div className='bg-white shadow-[1px_1px_10px_rgb(0,0,0,0.1)] w-[300px] rounded-lg absolute top-[16%] right-[48%] mt-2 group-hover:border-blue-500'>
                <div className='py-2 space-y-2'>
                    {suggestions.map((suggestion, i) => (
                    <p key={i} className=' hover:bg-gray-100 cursor-pointer p-2' >{suggestion.label}</p>
                    ))}
                </div>
                </div>
            </div>
        )}



        
    </div>  

  )
}

export default HotelDetail