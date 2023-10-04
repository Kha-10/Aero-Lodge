import React from 'react'
import {useRef,useEffect } from 'react';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import calendar from '../assets/calendar.png';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const Daterange = ({handleNewPopup,setNewPopup,newPopup,date,setDate}) => {
    const newPopRef = useRef(null);

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

    
    return (
    <div>
        <div ref={newPopRef} className='cursor-pointer group'>
          <div onClick={handleNewPopup} className='relative w-[300px] h-[60px] border border-b rounded-lg border-gray-400 flex items-center justify-around group-hover:border-blue-500 p-3'>
            <div className='absolute left-1 pl-3 pointer-events-none flex items-center gap-4 p-3' >
             <img src={calendar} alt="" className='w-5 h-5' />
             <span >{`${format(date[0].startDate, "EEE MMM d")} - ${format(date[0].endDate, "EEE MMM d")} `}</span>
             </div>
          </div> 
          {!!newPopup && <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className='shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] absolute top-[70%] text-sm'
          />}
        </div>
    </div>
  )
}

Daterange.propTypes = {
    handleNewPopup: PropTypes.func.isRequired,
    setNewPopup: PropTypes.func.isRequired,
    newPopup: PropTypes.bool.isRequired,
    date: PropTypes.array.isRequired,
    setDate: PropTypes.func.isRequired,
  };

export default Daterange;