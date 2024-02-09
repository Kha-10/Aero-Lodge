import React from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Room = ({removeRoom,room,addRoom}) => {
  
  const {t} = useTranslation();

  const plus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>;
  
  const minus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>

  return (
    <div>
        <div className='w-full'>
            <div className='flex items-center justify-between'>
              <div className="cursor-default">{t('room',{count : room})}</div>
              <div className='flex items-center justify-around border border-b w-[125px] p-2 border-gray-400 rounded-md'>
                <button onClick={removeRoom} className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${room === 1? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100 rounded-full"}`}>
                  {plus}
                </button>
                {(!!room || room === 0) && <h1 className='w-[30px] h-[30px] flex items-center justify-center'>{room}</h1>}
                <button onClick={addRoom} className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${room === 30 ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100 rounded-full"}`}>
                  {minus}
                </button>
              </div>
            </div>
          </div>
    </div>
  )
}

Room.propTypes= {
    removeRoom : PropTypes.func.isRequired,
    room : PropTypes.number.isRequired,
    addRoom : PropTypes.func.isRequired
}

export default Room