import React from 'react'
import { useTranslation } from 'react-i18next'


const Advertise = () => {
  const{t} = useTranslation();
  return (
    <div>
      <div className={`px-10 ${(localStorage.getItem('history') || localStorage.getItem('cityData')) === null? 'mt-0' :'mt-[50px]' } w-full mx-auto`}>
          <ul className='w-full flex justify-between items-center bg-gray-950 gap-4 rounded-xl px-6 py-3'>
            <li className='flex items-center gap-3 w-[2200px]'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
               <span className='text-white w-full text-sm font-light'>{t('section.ad')}</span>
            </li>
            <div className='w-1/4 py-2 text-right'>
              <button className='text-white bg-blue-500 px-4 py-2 text-center text-sm rounded-2xl'>
                {t('nav.signIn')}
              </button>
            </div>
          
          </ul>
      </div>
    </div>
  )
}

export default Advertise