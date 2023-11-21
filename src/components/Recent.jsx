import React from 'react'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useTranslation } from 'react-i18next';
import './Style.css'

const Recent = ({recentHistory}) => {
    const recent = recentHistory;
    console.log(recent)
    const {t} = useTranslation();
    const NextArrow = (props) => {
        const { className, onClick } = props;
        const isSlickDisabled = className.includes('slick-disabled');
        // console.log(isSlickDisabled)
      
        return (
          <div onClick={ onClick }>
            <button
              className={`absolute top-[40px] -right-[3px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center  
              ${isSlickDisabled ? 'cursor-not-allowed hover:bg-gray-100 opacity-50' : 'hover:bg-blue-100 shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={isSlickDisabled ? 'gray' : 'blue'} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        );
      };
    
      const PrevArrow = (props) => {
        const { className, onClick } = props;
        const isSlickDisabled = className.includes('slick-disabled');
        return(
          <div onClick={onClick}>
            <button className={`absolute top-[40px] -left-[5px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center 
            ${isSlickDisabled ? 'cursor-not-allowed hover:bg-gray-100 opacity-50' : 'hover:bg-blue-100 shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)] '}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={isSlickDisabled ? 'gray' : 'blue'}  className="w-4 h-4 flex items-center justify-center hover:to-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
        )
    
      }
    
      const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow:4,
        slidesToScroll: 1,
        prevArrow : <PrevArrow/>,
        nextArrow : <NextArrow/>
      };


  return (
    <div className='px-10 w-full mx-auto mt-[120px]'>
      {(localStorage.getItem('history') !== null && (<h1 className='text-2xl font-semibold mb-4'>{t('recent.search')}</h1>))}
      <div>
      <Slider {...settings}>
          {!!recent &&
            recent.map((search,i) => (
              <div key={i} >
                <Link
                  to={`/search?city=${search.city}&room=${parseInt(search.room_number)}&latitude=${search.lat}&longitude=${search.lng}&currency=${search.currencies}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${search.checkout_date}&checkindate=${search.checkin_date}&adult=${parseInt(search.adults)}&children=${parseInt(search.children)}&children_quantity=${search.children_array}&children_ages=${search.children_ages}`}
                  target='_blank'
                  className='flex items-center space-x-4 border w-[320px] h-[110px] border-gray-200 px-4 py-4 rounded-xl'
                >
                  <img src={search.img} alt="" className='w-[60px] h-[60px] rounded'/>
                  <div className='space-y-1'>
                    <div className='font-semibold text-sm'>{search.city} </div>
                    <div>
                      {!!search.checkin_date && (
                        <div className='flex gap-3'>
                          <div className='text-sm'>
                            {new Date(search.checkin_date).toLocaleString(localStorage.getItem('i18nextLng'), {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                          <div>-</div>
                          <div className='text-sm'>
                            {new Date(search.checkout_date).toLocaleString(localStorage.getItem('i18nextLng'), {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                      )}
                      <div className='text-sm'>
                        {`${search.adults + search.children} ${search.adults + search.children > 1 ? t('recent.people') : t('recent.person')}`}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </div>

  )
}

export default Recent