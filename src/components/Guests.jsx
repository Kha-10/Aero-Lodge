import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';

const Guests = ({adult,child,room}) => {
 
  const {t} = useTranslation();

  return (
    <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            <div className='flex gap-1'>
              <div>
               {adult} {t('adult',{count : adult})}
              </div>
              <div>
                {child} {t('children',{count : child})}
              </div>
              <div>
                {room} {t('room',{count : room})}
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-3 h-3 stroke-black mr-3">
              <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
        </svg>
    </>
  )
}

Guests.propTypes={
  adult : PropTypes.number.isRequired,
  child : PropTypes.number.isRequired,
  room : PropTypes.number.isRequired
}
export default Guests