import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import useApp from '../../../hooks/useApp';
import useDebounce from '../../../hooks/useDebounce';

const Autocomplete = () => {
  const [suggestions,setSuggestions] = useState(null);
  const popRef = useRef(null);

  const {setLatitude,setLongitude,setLocation,location,setImageurl,history,toggle,setDestType,setDestid} = useApp();

  const debouncedValue = useDebounce(location);

  const handleOnChange = (e) => {
        setLocation(e.target.value);
    }

  const langauge = localStorage.getItem('i18nextLng');
  const historyData = localStorage.getItem('history');

   useEffect(() => {
        if(debouncedValue.length > 2 && !toggle.current) {
            const getLocation = async () => {
              let lang = ''; 
                if(langauge ==='en') {
                  lang = langauge +'-gb'
                }else {
                  lang = langauge;
                }
                try{
                    const {data} = await axios.get('http://localhost:8000/locations',{
                        params: {
                            name: debouncedValue,
                            locale: lang
                          }
                    });
                    setSuggestions(data)
                    toggle.current=false;
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
              getLocation();
        }
    },[debouncedValue])

    useEffect(()=>{
        if(debouncedValue<= 2 ) {
            setSuggestions(null)
            toggle.current=false
           
        }
    },[debouncedValue])

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
        toggle.current=false
    }

    const handler = (city,region,lat,lng,img,id,type) => {
      setLocation(city || region);
      setLatitude(lat);
      setLongitude(lng);
      setDestid(id);
      setDestType(type);
      toggle.current=true;
      setSuggestions(null);
      setImageurl(img);
    }

    useEffect(() => {
      if (historyData) {
        const parsedHistoryData = JSON.parse(historyData);
        const city = parsedHistoryData[0].city;
        setLocation(city);
        toggle.current=true
      }
    }, [historyData]);

  return (
    <div className='w-[300px] h-[60px] flex items-center p-3 border bg-white border-gray-400 text-sm rounded-md placeholder-black hover:border-blue-500'>
        <div className='w-[9%]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <input type="text" placeholder='Enter your destination' value={location} className='w-full ml-2 focus:outline-none'
        onChange={handleOnChange} />
        {!!location && <button onClick={removeHandler} className='w-[8%] flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>}
        {!!suggestions && location.length !== 0 && suggestions.length > 0 && (
            <div className='relative group' >
                <div className='bg-white shadow-[1px_1px_10px_rgb(0,0,0,0.1)] w-[300px] rounded-lg absolute top-[30px] -left-[290px] mt-2 group-hover:border-blue-500 z-50'>
                <div className='space-y-2'ref={popRef}>
                    {suggestions.map((suggestion, i) => (
                    <div key={i} className='hover:bg-stone-100 cursor-pointer p-2 space-y-1 first:rounded-t-lg last:rounded-b-lg' onClick={() => handler (suggestion.city_name, suggestion.region,suggestion.latitude,suggestion.longitude,suggestion.image_url,suggestion.dest_id,suggestion.dest_type)} >
                      <h4 className='font-semibold'>{suggestion.name}</h4>
                      <div className='text-sm space-x-1'>
                        {!!suggestion.city_name && <span >{suggestion.city_name},</span>}
                        <span>{suggestion.region},</span>
                        <span>{suggestion.country}</span>
                      </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        )}



        
    </div>  

  )
}

export default Autocomplete