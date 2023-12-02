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
import { Link, useLocation, useNavigate } from 'react-router-dom';


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

    const location = useLocation();
    console.log(location)
    console.log(location.search)
    console.log(location.key)
    console.log('currenvy:',currency)
    const navigate = useNavigate ();

    useEffect(()=>{
        if(
        location.pathname === '/' 
        // location.pathname === '/locale=en' || 
        // location.pathname === '/locale=es'|| 
        // location.pathname ==='/locale=th' || 
        // location.pathname === '/locale=ja'
        ) {
            const search = location.search;
            const par_ams = new URLSearchParams(search);
            const localeValue = par_ams.get('locale')
            i18n.changeLanguage(localeValue)
            const curValue = par_ams.get('cur');
            const localStorageCur = localStorage.getItem('cur')
            console.log(curValue)
            console.log(localStorageCur)
            if(curValue === null && localStorageCur === null){
                localStorage.setItem('cur',currency);
            }else if (curValue) {
                localStorage.setItem('cur',curValue)
                changeCurrency(curValue)
            }else if(localStorageCur) {
                changeCurrency(localStorageCur)
            }
        }else{
            const newParams = new URLSearchParams(location.search)
            const language = newParams.get('locale');
            i18n.changeLanguage(language)
            const curr = newParams.get('currency');
            localStorage.setItem('cur',curr);
            changeCurrency(curr)

        }
        console.log('I DID FUCKING CHANGE')
    },[location.key])

    const handleSwitchLanguage = (locales) => {
        i18n.changeLanguage(locales)

        if(
            location.pathname === '/' 
            // location.pathname === '/?locale=en'||
            // location.pathname === '/?locale=es'|| 
            // location.pathname ==='/?locale=th' || 
            // location.pathname === '/?locale=ja'
            ) {
            navigate(`/?locale=${locales}&cur=${localStorage.getItem('cur')}`);
        }else if (location.pathname.startsWith('/search')) {
            const params = new URLSearchParams(location.search);
            params.set('locale', locales);
            const newUrl = `/search?${params.toString()}`;
            console.log('newurl:', newUrl);
            navigate(newUrl);
          }
        
    }

    const handleSwitchCurrency = (curShort) => {
        changeCurrency(curShort)
        localStorage.setItem('cur',curShort)
        if(
            location.pathname == '/' 
            // location.pathname === '/locale=en' || 
            // location.pathname === '/locale=es'|| 
            // location.pathname ==='/locale=th' || 
            // location.pathname === '/locale=ja'
            ) {
            navigate(`/?locale=${localStorage.getItem('i18nextLng')}&cur=${curShort}`)
        }else if (location.pathname.startsWith('/search')) {
            const params = new URLSearchParams(location.search);
            params.set('currency', curShort);
            const newUrl = `/search?${params.toString()}`;
            console.log('newurl:', newUrl);
            navigate(newUrl);
            
          }
        
    }

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
                                            <button className={`w-full mt-4 px-[140px] h-10 flex items-center gap-2 text-sm ${ i18n.resolvedLanguage === local ? 'bg-blue-100 rounded-md' : "hover:bg-blue-50 hover:text-blue-500 rounded-md " }`}
                                            onClick={() => {handleSwitchLanguage(local);setAdult(1);setChild(0);setSelectedOption([]);
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
                                        <button key={i} className={`flex items-center justify-center w-[360px] mt-4 h-10 gap-2 text-sm rounded-md ${currency === cur.shortName?'bg-blue-100 font-normal rounded-md':'hover:bg-blue-50 hover:text-blue-500'} `} onClick={()=>handleSwitchCurrency(cur.shortName)}>
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