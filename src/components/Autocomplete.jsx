import React from 'react'
import { useState,useEffect } from 'react';


// Autocomplete.propTypes = {
//     setCoordinates: PropTypes.func.isRequired,
// };
import axios from 'axios';
import { useRef } from 'react';
import useApp from '../hooks/useApp';

const Autocomplete = () => {
  const [suggestions,setSuggestions] = useState(null);
  console.log(suggestions)
  const popRef = useRef(null);
  
  

  const {setLatitude,setLongitude,setLocation,location,setImageurl,history,toggle} = useApp();
    
    // useEffect(()=>{
    //   setLocation(gg)
    //   toggle.current=true;
    // },[])
    
    console.log(location)


  const handleOnChange = (e) => {
        setLocation(e.target.value);
    }

   useEffect(() => {
        if(location.length > 2 && !toggle.current) {
            const getLocation = async () => {
                try{
                    const {data} = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations',{
                        params: {
                            name: location,
                            locale: 'en-gb'
                          },
                          headers: {
                            'X-RapidAPI-Key': 'b49de35924mshab2af0dbb1a3725p1b5c58jsn4d30457a9e06',
                            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
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
    },[location])

    useEffect(()=>{
        if(location.length <= 2 ) {
            setSuggestions(null)
            toggle.current=false
           
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
        toggle.current=false
    }

    const handler = (city,lat,lng,img) => {
      setLocation(city);
      setLatitude(lat);
      setLongitude(lng);
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
        <input type="text" placeholder='Enter your destination' className='w-[300px] h-[60px] py-3 px-12 border bg-white border-gray-400  rounded-md placeholder-black hover:border-blue-500' value={location}
        onChange={handleOnChange} />
        <div className="absolute left-30 top-[76px] pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        </div>
        {!!location && <button className="absolute right-[840px] top-[78px] pl-3" onClick={removeHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>}
        {!!suggestions && location.length !== 0 && suggestions.length > 0 && (
            <div className='relative group' >
                <div className='bg-white shadow-[1px_1px_10px_rgb(0,0,0,0.1)] w-[300px] rounded-lg absolute top-[16%] mt-2 group-hover:border-blue-500'>
                <div className='space-y-2'ref={popRef}>
                    {suggestions.map((suggestion, i) => (
                    <div key={i} className='hover:bg-stone-100 cursor-pointer p-2 space-y-1 first:rounded-t-lg last:rounded-b-lg' onClick={() => handler (suggestion.city_name,suggestion.latitude,suggestion.longitude,suggestion.image_url)} >
                      <h4 className='font-semibold'>{suggestion.name}</h4>
                      <div className='text-sm space-x-1'>
                        <span >{suggestion.city_name},</span>
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