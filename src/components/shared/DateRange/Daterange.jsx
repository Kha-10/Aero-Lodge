import React from 'react'
import {useRef,useEffect,useState} from 'react';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useApp from '../../../hooks/useApp';
import { useLocation } from 'react-router-dom';

const Daterange = () => {

    const newPopRef = useRef(null);
    const {t} = useTranslation();
    const {date,setDate} = useApp();
    const [newPopup , setNewPopup] = useState (false);
    const location = useLocation();
    const path = location.pathname;
    
    const handleNewPopup = () => {
      setNewPopup (!newPopup)
      // setPopup(false)
    }

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
        // Parse checkindate and checkoutdate from URL params
        const params = new URLSearchParams(location.search);
        const checkinDateParam = params.get('checkindate');
        const checkoutDateParam = params.get('checkoutdate');
    
        if (checkinDateParam && checkoutDateParam) {
          // Update the date state based on the URL params
          const startDate = new Date(checkinDateParam);
          const endDate = new Date(checkoutDateParam);
          setDate([{ startDate, endDate, key: 'selection' }]);
        }
      }, [location.search, setDate]);
    
      
    
    
    return (
    <div>
        <div ref={newPopRef} className='cursor-pointer group'>
          <div onClick={handleNewPopup} className='relative bg-white w-[300px] h-[60px] border border-b rounded-lg border-gray-400 flex items-center justify-around group-hover:border-blue-500 p-3'>
            <div className='absolute left-1 pl-3 pointer-events-none flex items-center gap-4 p-3' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
             <span className='-ml-1 text-sm'>
                {`${t('daterange.startDate', { date: new Date(date[0]?.startDate) })} - ${t('daterange.endDate', { date: new Date(date[0]?.endDate) })}`}
            </span>
            </div>
          </div> 
          {newPopup && <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className={`shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] ${path === '/search' ? 'absolute top-[96px]' : 'absolute top-[73%]' } text-sm z-10`}
          />}
        </div>
    </div>
  )
}

// Daterange.propTypes = {
//     handleNewPopup: PropTypes.func.isRequired,
//     setNewPopup: PropTypes.func.isRequired,
//     newPopup: PropTypes.bool.isRequired,
//     date: PropTypes.array.isRequired,
//     setDate: PropTypes.func.isRequired,
//   };

export default Daterange;