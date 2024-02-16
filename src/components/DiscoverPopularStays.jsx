import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { useEffect,useState } from 'react';
import { db } from '../firebase';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PopularCityLink from './PopularCityLink';
import { useTranslation } from 'react-i18next';

const DiscoverPopularStays = () => {

  const [datas, setDatas] = useState([]);
  const {t} = useTranslation();

    useEffect(()=>{
        let ref = collection(db,'stays');
        getDocs(ref).then(docs => {
                let datas =[];
                docs.forEach(doc => {  
                  let data = {id:doc.id,...doc.data()}
                  datas.push(data)
                  setDatas(datas)
                })
              })
    },[])
    const NextArrow = (props) => {
        const {onClick} = props
        return(
          <div onClick={onClick}>
            <button className='absolute top-[85px] -right-[5px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center g-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)] hover:bg-blue-100'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="blue" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )
      }
    
    const PrevArrow = (props) => {
        const {onClick} = props
        return(
          <div onClick={onClick}>
            <button className='absolute top-[85px] -left-[5px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center g-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)] hover:bg-blue-100'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="blue" className="w-4 h-4 flex items-center justify-center">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
        )
    }
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        prevArrow : <PrevArrow/>,
        nextArrow : <NextArrow/>
    };

  return (
    <div className='px-10 w-full mt-[50px] h-screen mx-auto space-y-4'>
        <span className='text-2xl font-semibold'>{t('popularStays.header')}</span>
        <Slider {...settings}>
            {!!datas &&
              datas.map(data => (
                <PopularCityLink
                key={data.id}
                data={data}                               
                />
              ))}
        </Slider>
    </div>
  )
}

export default DiscoverPopularStays