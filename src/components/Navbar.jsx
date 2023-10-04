import React from 'react'
import { useState } from 'react';
import usa from '../assets/usa.png'
import spain from '../assets/spain.png'
import thai from '../assets/thai.png'

const Navbar = () => {
    const [languagePopup, setLanguagePopup] = useState(false);
    const [flags, setFlags] = useState([usa]);
    console.log(flags)


    const changeLanguagePopup = () => {
        setLanguagePopup(!languagePopup)
    }

    const changeCountry = (country) => {
      const countries = [...flags,country];
      
      const newCountries = countries.slice(1);
      
      setFlags(newCountries)
    }

  return (
    <>
     <nav>
            <ul className='flex justify-between items-center px-10 py-3 border border-b-gray-200'>
                <li>Logo</li>
                <li className='flex items-center gap-10'>
                    <div onClick={changeLanguagePopup} className='cursor-pointer'>
                    {!!flags && flags.map((flag,i) => (
                            <div key={i}>
                                <img src={flag} alt="" className='w-7' />
                            </div>
                           ))
                    }
                        {!!languagePopup && !!flags &&
                        <div className='bg-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] w-[200px] rounded-lg absolute top-[6%] z-50 right-[16%] flex flex-col space-y-5 p-4'>
                            <button onClick={() => changeCountry(usa)} className={`p-2 flex items-center gap-3 text-sm ${flags[0] === usa ?'bg-blue-400 text-white rounded-md' :"hover:bg-blue-50 hover:text-blue-500 rounded-md "}`}>
                                <img src={usa} alt="" className='w-7'/>
                                <span>English</span>
                            </button>
                            <button onClick={() => changeCountry(spain)} className={`flex p-2 items-center gap-3 text-sm ${flags[0] === spain ?'bg-blue-400 text-white rounded-md' : "hover:bg-blue-50 hover:text-blue-500 "}`}>
                                <img src={spain} alt="" className='w-7'/>
                                <span>Español</span>
                            </button>
                            <button onClick={() => changeCountry(thai)} className={`flex p-2 items-center gap-3 text-sm ${flags[0] === thai ?'bg-blue-400 text-white rounded-md' : "hover:bg-blue-50 hover:text-blue-500 "}`}>
                                <img src={thai} alt="" className='w-7'/>
                                <span>ภาษาไทย</span>
                            </button>
                        </div>
                        }
                    </div>
                    <span className='text-sm font-medium'>
                        USD
                    </span>
                    <button className='text-blue-500 border border-blue-500 rounded px-4 py-2 text-sm font-medium hover:bg-blue-500 hover:text-white'>
                        Sign in
                    </button>
                </li>
            </ul>  
        </nav>  
    </>
  )
}

export default Navbar