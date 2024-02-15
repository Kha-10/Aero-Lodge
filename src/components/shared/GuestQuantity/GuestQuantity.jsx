import React from 'react'
import { useState,useEffect,useRef } from 'react';
import Guests from '../Guest/Guests';
import Adult from '../Adult/Adult';
import Child from '../Child/Child';
import Room from '../Room/Room';
import { useTranslation } from 'react-i18next';

const GuestQuantity = () => {
  const [popup, setPopup] = useState(false);
  const popRef = useRef(null);
  const {t} = useTranslation();

  const handlePopup = () => {
    setPopup(!popup)
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
  
  return (
    <div ref={popRef}  className='group cursor-pointer'>
          <div onClick={handlePopup} className='relative w-[300px] h-[60px] bg-white p-3 border border-gray-400 flex items-center rounded-lg group-hover:border-blue-500' >
            <Guests/>
          </div>
        
        {!!popup && 
        <div className='bg-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] w-[330px] rounded-lg absolute top-[72%] right-[13%] flex flex-col space-y-5 p-6 '>
          
          <Adult/>
          
          <Child/>
          
          <Room/>
          
          <button type='button' className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={handlePopup}>{t('button.done')}</button>
        </div>}
        </div>
  )
}

export default GuestQuantity