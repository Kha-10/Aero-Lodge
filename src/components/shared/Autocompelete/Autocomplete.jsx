import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import useApp from '../../../hooks/useApp';
import { useLocation } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';

const Autocomplete = () => {
  const [suggestions,setSuggestions] = useState(null);
  const popRef = useRef(null);
  const loc = useLocation();
  const path = loc.pathname;

  const {setLatitude,setLongitude,setLocation,location,setImageurl,history,toggle,setDestType,setDestid} = useApp();

  const debouncedValue = useDebounce(location);

  const handleOnChange = (e) => {
        setLocation(e.target.value);
    }

  const langauge = localStorage.getItem('i18nextLng');

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
      if (history && history.recent && history.recent.length > 0) {
        setLocation(history.recent[0]?.city);
        toggle.current=true
      }
    }, [history]);

    
  return (
    <div>
        <input type="text" placeholder='Enter your destination' className='w-[300px] h-[60px] py-3 px-11 border bg-white border-gray-400 text-sm rounded-md placeholder-black hover:border-blue-500' value={location}
        onChange={handleOnChange} />
        <div className={` ${path === '/search' ? 'absolute left-30 top-[48px] pl-3 pointer-events-none' : 'absolute left-30 top-[77px] pl-3 pointer-events-none'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        </div>
        {!!location && <button className={`${path === '/search'?'absolute left-[410px] top-[51px] pl-3' : 'absolute right-[840px] top-[80px] pl-3' }`} onClick={removeHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>}
        {!!suggestions && location.length !== 0 && suggestions.length > 0 && (
            <div className='relative group' >
                <div className='bg-white shadow-[1px_1px_10px_rgb(0,0,0,0.1)] w-[300px] rounded-lg absolute top-[16%] mt-2 group-hover:border-blue-500 z-50'>
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