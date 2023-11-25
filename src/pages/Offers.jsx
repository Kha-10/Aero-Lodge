import React, { useState } from 'react'
import { useLocation,useParams} from 'react-router'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dotenv from 'dotenv';
import loadinggg from '../animation.json';
import { Player } from '@lottiefiles/react-lottie-player';


const Offers = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [hotles, setHotles] = useState([]);
    // console.log(hotles)
    const [percentage, setPercentage] = useState([]);
    // console.log(percentage)
    const [newprice,setNewprice] = useState([]);
    // console.log(newprice)
    const [aftertax, setAftertax] = useState([]);
    const [loading,setLoading] = useState(false);


    const city = params.get('city');
    // console.log(city)
    const locale = params.get('locale');
    // console.log(locale)
    const room = params.get('room_number');
    // console.log(room)
    const lng = params.get('longitude');
    // console.log(lng)
    const lat = params.get('latitude');
    console.log(lat)
    const currency = params.get('filter_by_currency');
    console.log(currency)
    const checkout_date = params.get('checkout_date');
    // console.log(checkout_date)
    const checkin_date = params.get('checkin_date');
    // console.log(checkin_date)
    const adult = params.get('adults');
    // console.log(adult)
    const children = params.get('children_number');
    // console.log(children)
    
    
    const getData = async () => {
      let lang = ''; 
      if(locale==='en') {
         lang = locale+'-gb'
      }
      setLoading(true)
      try {
        const params = {
              units: 'metric',
              room_number: room,
              longitude : lng,
              latitude :lat,
              filter_by_currency:currency,
              locale:lang,
              order_by: 'popularity',
              checkout_date: checkout_date,
              adults_number :adult,
              checkin_date :checkin_date,
              include_adjacency: 'true',
              page_number: '0',
            }
            if (children >0) {
              params.children_number = children;
            }
            const {data:{result} } = await axios.get ('http://localhost:8000/datas',{
              params : params,
              
            })
         setHotles(result)
  
        } 
        catch (error) {
          if (error.response) {
            console.error('Data:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request made but no response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        }
        setLoading(false)
    };
  
    useEffect(() => {
      getData()
    }, [])

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    useEffect(() => {
        let array = [];
        let percentageValue = [];
        let aftertaxValue = [];
      
        for (let index = 0; index < hotles.length; index++) {
          const generateRandomPercentageNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
          array.push(generateRandomPercentageNumber);
          if (hotles[index].price_breakdown && hotles[index].price_breakdown.gross_price) {
            const value =Math.round((generateRandomPercentageNumber / 100) * hotles[index].price_breakdown.gross_price);
            const result = Math.round(hotles[index].price_breakdown.gross_price - value)
            percentageValue.push(result);
            const aftertaxResult = result + hotles[index].price_breakdown.sum_excluded_raw;
            aftertaxValue.push(aftertaxResult)
          }
        }
      
        setPercentage(array);
        setNewprice(percentageValue);
        setAftertax(aftertaxValue)
      }, [hotles]);
      
    
    for (let index = 0; index < hotles.length; index++) {
        hotles[index].percentage = percentage[index]
        hotles[index].newPrice = newprice[index]
        hotles[index].aftertax = aftertax[index]
        
    }
    
    return (
        <div className='flex flex-col h-screen'>
        {!!loading && (
        <div className='flex items-center justify-center h-screen w-full bg-white bg-opacity-1 z-50 absolute top-0 left-0'>
          <Player
            autoplay
            loop
            src={loadinggg}
            style={{ height: '300px', width: '300px' }}
            >
            </Player>
        </div>
        )}
            <div className='relative'>
                <img
                    src="https://images.unsplash.com/photo-1472577938094-84871b72ccac?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className='object-cover w-full h-[400px]'
                />
                <div className='absolute inset-0'>
                    <div className='bg-gradient-to-tr from-neutral-800 to-transparent w-full h-[400px] absolute'></div>
                </div>
                <div className='text-white absolute top-[150px] z-10 px-10 space-y-2'>
                    <div className='text-xl'>
                    Christmas Exclusive Offer
                    </div>
                    <p className='text-5xl font-bold'>
                    Unlock discounts of up to 50%
                    </p>
                    <p className='text-xl'>Secure your stay from November 1, 2023, to December 31, 2023</p>
                </div>
            </div>
            <div className='mt-[60px] px-10'>
                <h3>Christmas exclusive offers for : <span className='font-semibold'>1 Nov - 31 Dec</span></h3>
               <div className='flex items-center gap-[40px] flex-wrap mt-6'>
                {!!hotles && hotles.map((hotel) =>(
                    <Link to={`/hotelDetail/${hotel.hotel_id}`} key={hotel.hotel_id} className='shadow-[-1px_-1px_10px_rgb(0,0,0,0.2)] rounded-xl w-[300px] relative'>
                        <img src={hotel.max_1440_photo_url}  alt="hotels" className='rounded-t-xl'/>
                        <div className='p-4'>
                            <div className='absolute text-white bg-red-500 top-0 right-0 p-1 rounded'> {hotel.percentage} % off</div>
                            <div className='font-bold truncate'>{hotel.hotel_name}</div>
                            <div className='text-sm mt-2'>{hotel.city}</div>
                            <div className='flex items-center gap-2 mt-3'>
                                <div className='p-1 bg-blue-500 text-white text-sm rounded'>
                                    {hotel.review_score % 1 === 0 ? `${hotel.review_score}.0` : hotel.review_score}
                                </div>
                                <div className='text-sm font-semibold'>{hotel.review_score_word}</div>
                                <div className='text-sm'>{hotel.review_nr} reviews</div>
                            </div>
                            <div className='text-end space-y-1 mt-7'>
                                <div className='text-xs font-light'>Price per night</div>
                                <div className='flex items-center justify-end gap-2'>
                                    <div className='text-sm font-light gap-3 line-through'>
                                        {hotel.price_breakdown.currency}
                                        {hotel.price_breakdown.gross_price}
                                    </div>
                                    <div className='font-bold text-red-500'>{hotel.price_breakdown.currency} {hotel.newPrice}</div>
                                </div>
                                <div className='text-xs font-light'>After tax and fees</div>
                                <div className='text-xs'>{hotel.price_breakdown.currency} {hotel.aftertax} total</div>
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
      
      
    )
}

export default Offers