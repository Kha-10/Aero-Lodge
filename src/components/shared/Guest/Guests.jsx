import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';
import useApp from '../../../hooks/useApp';

const Guests = () => {

  const {adult,child,room} = useApp();
  const {t} = useTranslation();

  return (
  <>
    <div className='flex items-center gap-3'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
        {/* <div className={`flex gap-1 ${localStorage.getItem('i18nextLng') ==='es'? 'ml-0 ': '-ml-7'}`}> */}
        <div className='flex items-center gap-2 text-sm'>   
               <span>{adult} {t('adult',{count : adult})}</span>  
               <span>{child} {t('children',{count : child})}</span>
              <span>{room} {t('room',{count : room})}</span>
        </div>       
        {/* </div> */}            
    </div>
    <div className='w-[10%] flex items-center justify-center ml-6'>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-4 h-4">
          <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
        </svg>
    </div>
  </>
  )
}

// Guests.propTypes={
//   adult : PropTypes.number.isRequired,
//   child : PropTypes.number.isRequired,
//   room : PropTypes.number.isRequired
// }
export default Guests