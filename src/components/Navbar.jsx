import React, { useRef } from 'react'
import { useState,useEffect} from 'react';
import usa from '../assets/usa.png'
import spain from '../assets/spain.png'
import thai from '../assets/thai.png'
import japan from '../assets/japan.png'
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import useApp from '../hooks/useApp';
import Modal from './modal/Modal';
import logo from '../assets/logo.png'


const Navbar = () => {
    const [languagePopup, setLanguagePopup] = useState(false);
    const [currencyPopup, setCurrencyPopup] = useState(false);
    const popupRef = useRef(null);
    const popupCurrRef = useRef(null);
    const { t,i18n } = useTranslation();
    const locales = {
        en :{title : 'English',img : usa},
        es : {title : 'Español',img : spain,},
        th : {title : 'ภาษาไทย',img : thai,},
        ja : {title : '日本語',img : japan,},
    };

    const changeCurrency = (shortName) => {
        setCurrency(shortName)
    };

    const {setAdult,setChild,setSelectedOption,setArray,setRoom,setAddress,setDate,currency,setCurrency,updatedCurrency} = useApp();

    const changeLanguagePopup = () => {
        setLanguagePopup(!languagePopup)
    }

    useEffect(()=>{
        const handleClick =(event) => {
            if(!popupRef.current.contains(event.target)) {
                setLanguagePopup(false);
            }
        }
        if(languagePopup) {
            document.addEventListener('click',handleClick);
        }
        return ()=> document.removeEventListener('click',handleClick);
    },[languagePopup])

    useEffect(()=>{
        const handleClick =(event) => {
            if(!popupCurrRef.current.contains(event.target)) {
                setCurrencyPopup(false);
            }
        }
        if(currencyPopup) {
            document.addEventListener('click',handleClick);
        }
        return ()=> document.removeEventListener('click',handleClick);
    },[currencyPopup])


  return (
    <>
     <nav>
            <ul className='flex justify-between items-center px-10 py-3 border-b border-gray-200 '>
                <li className='w-20 -ml-5'> 
                    <img src={logo} alt="logo"/>
                </li>
                <li className='flex items-center gap-10'>
                    <div ref={popupRef} onClick={changeLanguagePopup} className='cursor-pointer'>
                        <img src={
                            localStorage.getItem('i18nextLng')==="en"? usa : 
                            localStorage.getItem('i18nextLng')==="es"? spain :
                            localStorage.getItem('i18nextLng')==="th"? thai:
                            localStorage.getItem('i18nextLng')==="ja"? japan:""
                            } 
                            className='w-8'
                            alt="locale"/>
                        {!!languagePopup && 
                        <Modal>
                            <div className='absolute top-3 right-3 cursor-pointer hover:bg-blue-50 hover:text-blue-500 p-1 rounded-full' onClick={()=>setLanguagePopup(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> 
                                </svg>
                            </div>
                            <div className='mt-4'>
                                    {Object.keys(locales).map((local) => (
                                    <div key={local}>
                                        <button className={`w-full mt-4 px-[140px] h-10 flex items-center gap-2 text-sm ${ i18n.resolvedLanguage === local ? 'bg-blue-400 text-white rounded-md' : "hover:bg-blue-50 hover:text-blue-500 rounded-md " }`}
                                         onClick={() => {i18n.changeLanguage(local);setAdult(1);setChild(0);setSelectedOption([]);
                                         setArray([]);setRoom(1);setAddress('');setDate([
                                            {
                                              startDate: new Date(),
                                              endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                                              key: 'selection',
                                            },
                                          ]);}}>
                                            <img src={locales[local].img} className='w-5' alt="" />
                                            <span>{locales[local].title}</span>
                                        </button>
                                    </div>
                                    ))}
                            </div>      
                        </Modal>
                        }
                    </div>
                   <div ref={popupCurrRef} onClick={()=>setCurrencyPopup(!currencyPopup)} className='cursor-pointer'>
                        <span className='text-sm font-light hover:underline hover:text-blue-500'>
                            {currency}
                        </span> 
                        {!!currencyPopup && 
                        <Modal>
                            <div className='absolute top-3 right-3 cursor-pointer hover:bg-blue-50 hover:text-blue-500 p-1 rounded-full' onClick={()=>setCurrencyPopup(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> 
                                </svg>
                            </div>
                            <div className='mt-4'>
                                    {!!updatedCurrency && updatedCurrency.map((cur,i) =>(
                                        <button key={i} className={`flex items-center justify-center w-[360px] mt-4 h-10 gap-2 text-sm rounded-md ${currency === cur.shortName?'bg-blue-100 font-normal rounded-md':'hover:bg-blue-50 hover:text-blue-500'} `} onClick={()=>changeCurrency(cur.shortName)}>
                                            <div className='w-full gap-2 flex justify-center items-center'>
                                                <span className='font-normal text-blue-400'>{cur.shortName}</span>
                                                <span>{cur.fullName}</span>
                                            </div>
                                        </button>
                                    ))}
                            </div>      
                        </Modal>
                        }
                    </div>
                    <button className='text-blue-500 border border-blue-500 rounded px-4 py-2 text-sm font-medium hover:bg-blue-400 hover:text-white hover:border-transparent'>
                        {t('nav.signIn')}
                    </button>
                </li>
            </ul>  
        </nav>  
    </>
  )
}
export default function WrappedApp() {
    return (
        <Suspense fallback= "...loading">
            <Navbar/>
        </Suspense>
    )
}