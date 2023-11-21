import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Style.css'

const Random = () => {
    const NextArrow = (props) => {
        const {onClick} = props
        return(
          <div onClick={onClick}>
            <button className='absolute top-[85px] -right-[5px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center g-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)] hover:bg-slate-100'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
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
            <button className='absolute top-[85px] -left-[5px] bg-white z-40 w-8 h-8 rounded-full flex items-center justify-center g-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.3)] hover:bg-slate-100'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 flex items-center justify-center">
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
        slidesToShow:3,
        slidesToScroll: 0,
        prevArrow : <PrevArrow/>,
        nextArrow : <NextArrow/>,
        centerMode: false,
        centerPadding: '0',
      };

      const gg =[
        {title:'mandalay',person:3,country:'mm'},
        
        
      ]


  return (
    <div className='px-10 w-full h-screen  mx-auto mt-[10px]'>
        <Slider {...settings}>
            {gg.map((cc,i)=>(
                <div key={i} className='p-4 border border-gray-300 max-w-[200px] rounded-lg'>
                    <div>{cc.title}</div>
                    <div>{cc.person}</div>
                    <div>{cc.country}</div>
                </div>
            ))}
        </Slider>
    </div>
  )
}

export default Random