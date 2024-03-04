import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './App.css';
import Autocomplete from '../components/shared/Autocompelete/Autocomplete';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import axios from 'axios';
import useApp from '../hooks/useApp';
import Daterange from '../components/shared/DateRange/Daterange';
import './App.css';
import pool from '../assets/pool.png';
import car from '../assets/car.png'
import { Player } from '@lottiefiles/react-lottie-player';
import loadingTwo from '../loading2.json'
import loadinggg from '../animation.json';
import useFetch from '../hooks/useFetch';
import GuestQuantity from '../components/shared/GuestQuantity/GuestQuantity';
import SearchButton from '../components/shared/searchButton/SearchButton';
import useBodyOverflow from '../hooks/useBodyOverflow';
import getTotalNight from '../utils/getTotalNight';
import useHistoryLocalStorage from '../hooks/useHistoryLocalStorage';

const Search = () => {
    const locations = useLocation();
    const params = new URLSearchParams(locations.search);
    const city= params.get('city');
    const lat = params.get('latitude');
    const lng = params.get('longitude');
    const roomCount = parseInt(params.get('room'));
    const adultCount = parseInt(params.get('adult'));
    const childCount = parseInt(params.get('children'));
    const children_age = params.get('children_ages')

    const destType = params.get('dest_type');

    const destid = params.get('dest_id');

    const checkinDate = params.get('checkindate');
    
    const checkoutDate = params.get('checkoutdate');

    // const pp = params.get('order_by');
    // const ppObject = JSON.stringify(pp);
    // console.log(ppObject)
    const ppString = params.get('order_by'); // This will retrieve the string "[object Object]"
    const decodedString = decodeURIComponent(ppString); // This will decode the URL encoding, converting it back to "[object Object]"
    console.log(decodedString);


    // totalNight from getTotalNight function utils
    const {totalNight} = getTotalNight(checkinDate,checkoutDate);

    const {location,setLocation,toggle,imageurl,adult,child,selectedOption,address,room,formattedCheckinDate,formattedCheckoutDate} = useApp();

    const [categoriesFilter,setCategoriesFilter] = useState([]);
    console.log(categoriesFilter)

    const [newClick,setNewClick] = useState(false);
    const [pageNumber,setPageNumber] = useState(0);
    const [hover, setHover] = useState({name : null,condition : false});
    const [load_ing,setLoad_ing] = useState(false);
    const [collectedIds, setCollectedIds] = useState([]);

    const langauge  = localStorage.getItem('i18nextLng');

    const currency = localStorage.getItem('cur');

    let orders = localStorage.getItem('history');
    let parsedData = JSON.parse(orders);
    let orderBy = parsedData[0]?.order_by;
    let orderById = orderBy.id;
    let orderByName = orderBy.name;
    let filters = parsedData[0]?.categories_filterIds;
    let image = parsedData[0]?.img;

    let{ fetchData,filterItems } = useFetch();

    let{count,sorts,loading,datas,setDatas} = fetchData(langauge, currency, destid, destType,roomCount, lng, lat, checkoutDate, adultCount, checkinDate, childCount, children_age,orderById,collectedIds);

    let {price,filteredData} = filterItems(langauge, currency, destid, destType,roomCount,checkoutDate, adultCount, checkinDate, childCount, children_age,orderById,collectedIds,pageNumber)

    useBodyOverflow(loading)

    const changeHandler = (value)=> {
      setCategoriesFilter((prevCategories) => {
        return [...prevCategories, value];
      })
    }

    const handleCheckboxChange = (id) => {
        if(!collectedIds.includes(id)) {
          setCollectedIds(prevCollectedIds => [...prevCollectedIds, id]);
        } else {
          setCollectedIds(prevCollectedIds => prevCollectedIds.filter(item => item !== id));
        }
      };    
    console.log(collectedIds)
    
    // fetch when collectedIds changes
    useHistoryLocalStorage(collectedIds,lat,lng,city)

    // useEffect(()=>{
    //   setLocation(address)
    //   toggle.current=true;
    // },[address])

    const searchLink = `/hotelDetail?city=${location}&room=${room}&latitude=${lat}&longitude=${lng}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${formattedCheckoutDate}&checkindate=${formattedCheckinDate}&adult=${adult}&children=${child}${child > 0 ? `&children_ages=${selectedOption}` : ''}&img=${imageurl}`;

    useEffect(()=>{
        window.scrollTo(0,0)
    },[]);
    
    const sortBy = (name,id) => {
      const obj = {id :id,name :name}
      const combinedDatas = {
        adults : adult,
        checkin_date : formattedCheckinDate,
        checkout_date : formattedCheckoutDate,
        children : child,
        children_ages : selectedOption,
        city : location,
        currencies : currency,
        dest_id : destid,
        dest_type : destType,
        img : image,
        lat : lat,
        lng : lng,
        locale : langauge,
        order_by : obj,
        room_number : room,
        categories_filterIds :filters
      }
      const localStorageDatas =localStorage.getItem('history');
      const newDatas = JSON.parse(localStorageDatas);
      const filteredItems = newDatas.filter(bb => bb.city !== city);
      filteredItems.unshift(combinedDatas)
      console.log(filteredItems)
      localStorage.setItem('history',JSON.stringify(filteredItems));
    }

    const sortToggle = () => {
      setNewClick(!newClick)
    }
    
    const poppUp = useRef(null);

    useEffect(()=>{
      function handleClickoutside (event) {
        console.log(event)
        if(!poppUp.current.contains(event.target)){
            setNewClick(false)
        }
      }
     if(newClick) {
      document.addEventListener('click',handleClickoutside);
     }
      
      return()=> {
        document.removeEventListener('click',handleClickoutside);
      };
    },[newClick])

    const star = <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>;



      const getData = async () => {
        setLoad_ing(true)
        let lang = ''; 
        if(langauge ==='en') {
           lang = langauge +'-gb'
        }else {
          lang = langauge
        }
        const updatedPageNumber = pageNumber + 1;
        setPageNumber(updatedPageNumber);
        try {
          const params = {
                units: 'metric',
                room_number: roomCount,
                longitude : lng,
                latitude :lat,
                filter_by_currency:currency,
                locale:lang,
                order_by: orderById,
                checkout_date: checkoutDate,
                adults_number :adultCount,
                checkin_date :checkinDate,
                include_adjacency: 'true',
                page_number: updatedPageNumber,
              }
              if (childCount > 0 || collectedIds.length > 0) {
                params.children_number = childCount;
                params.children_ages = children_age;
                const combinedString = collectedIds.join(',');
                params.categories_filter_ids = combinedString;
              } 

              // const {data:{count,result,sort} } = await axios.get ('http://localhost:8000/datas',{
              //   params : params,
              // })
              // const {data:{count,result} } = await axios.get ('http://localhost:8000/datas',{
              //   params : params,
              // })
              const {data:{result} } = await axios.get ('http://localhost:8000/datas',{
                params : params,
              })
            setLoad_ing(false)
            // setCount(count)
            setDatas(prevData => [...prevData,...result])
            // setSorts(sort)
          } 
          catch (error) {
            setLoad_ing(false)
            if (error.response) {
              console.error('Data:', error.response.data);
              console.error('Status:', error.response.status);
              console.error('Headers:', error.response.headers);
          } else if (error.request) {
              console.error('Request made but no response received:', error.request);
          } else {
              console.error('Error:', error.message);
          }
              // Something else went wrong
              console.error('Error:', error.message);
          }
       
      };

    const handleMouseEnter = (index) => {
      setHover((prevHover) => ({ ...prevHover, name: index, condition: true }));
    };

    const handleMouseLeave = () => {
      setHover((prevHover) => ({ ...prevHover, condition: false }));
    }

   return (
    <div className='relative w-full min-h-screen bg-gray-100'>
      {loading && (
        <div className='w-full flex justify-center items-center h-[100vh] inset-0 fixed top-0 left-0 bg-white z-50'>
          <Player
                autoplay
                loop
                src={loadinggg}
                style={{ height: '300px', width: '300px' }}
          >
          </Player>
        </div>
      )}
      {load_ing && (
        <div className='w-full flex justify-center fixed bottom-10 z-50' >
          <div className='w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white'>
            <Player
                autoplay
                loop
                src={loadingTwo}
                className='w-[150px] h-[150px]'              
            >
            </Player>
          </div>
       </div>
      )}
      {datas.length > 0 && <div className='inset-x-0 max-w-6xl mx-auto p-[2%] flex items-center gap-4 justify-between top-[38px]'>
        <Autocomplete/>

        <Daterange/>

        <GuestQuantity/>

        <SearchButton/>
      </div>}
      <div className='max-w-6xl mx-auto px-[2%] py-[1%] flex items-center justify-between'>
        {datas.length > 0 && <div className='font-semibold text-base'>Filter by</div>}
        {count > 0 && <h3 className='font-bold text-lg -ml-20'>{city} : {count} hotels found</h3>}
        {datas.length > 0 && 
          <div className='flex items-center gap-1'>
            <div className='font-light text-sm'>Sorted by</div>
            <div ref={poppUp} className='flex items-center gap-1 cursor-pointer' onClick={sortToggle}>
              <div className='text-sm font-semibold'>{orderByName}</div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-3 h-3 stroke-black">
                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
              </svg>  
            </div>
          </div>
        }
        <div className={`${newClick ? 'visible' : 'hidden'} w-[280px] shadow-[1px_1px_10px_rgb(0,0,0,0.1)] absolute top-[165px] z-30 right-[170px] bg-white rounded-lg space-y-1 text-[13px]`}>
              {!!sorts && 
                sorts.map((sort, id) => (
                  <div key={id} className='hover:bg-stone-100 cursor-pointer px-4 py-3 first:rounded-t-lg last:rounded-b-lg' onClick={()=>{sortBy(sort.name,sort.id),setNewClick(false)}}>
                    { sort.name }
                  </div>
                ))}
        </div>
      </div>
      <div className='max-w-6xl mx-auto flex'>
        <div className='w-[40%] px-8 py-4'> 
          <div className='w-full flex flex-col gap-[20px]'>
          {!!price && datas.length > 0 &&
            <div className='w-[210px] group'>
              <div className='font-semibold text-sm'>{price.title}</div>
              <div className='bg-white rounded-lg mt-2 p-3 border border-gray-200'>
                <select className='w-[180px] group-hover:text-blue-400 text-[13px] focus:outline-none' onChange={(e) => changeHandler(e.target.value)}>
                  <option value="">{price.title}</option>
                  {!!price && price.categories && price.categories.map((category)=>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
          }
           {datas.length > 0 && (
            !!filteredData && filteredData.map((filter,i) => (
              <div key={i} className='bg-white p-3 rounded-lg border border-gray-200 space-y-2'>
                <h3 className='text-sm font-semibold'>{filter.title}</h3>
                <ul>
                {filter.categories.map((category,index)=> (
                  <li key={index} className="flex items-center mb-2 relative">
                    <input
                      type="checkbox"
                      id={category.name}
                      checked={!!filters && filters.some(item => item === category.id)}
                      onChange={() => handleCheckboxChange(category.id)}
                      className="mr-2 appearance-none bg-white w-4 h-4 rounded border border-gray-300 relative hover:border-blue-500 cursor-pointer"
                    />
                    {!!filters && filters.some(item => item === category.id) &&
                    <span className='absolute left-[2px]' onClick={()=>handleCheckboxChange(category.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3 text-blue-500 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    
                    }
                    <label htmlFor={category.name} className='text-[13px] hover:text-blue-500 cursor-pointer'>{category.name}</label>
                  </li>
                ))}
              </ul>
              </div>
            ))
           )}
          </div>
        </div>
        <div className='w-full px-3 py-6 flex flex-col gap-4'>
         {!!datas && datas.map((data,i)=>(
           <div key={i} className='w-full flex border py-4 border-gray-200 bg-white rounded-xl relative'>
           <div className='w-[40%] flex justify-center px-4 '>
             <img src={data?.max_photo_url} className='rounded-md max-w-[200px] max-h-[200px]' />
           </div>
           <div className='w-[64%]'>
            <div className='flex items-center gap-1 flex-wrap'>
              <span className=' font-semibold text-xl'>{data?.hotel_name}</span>
              {!!data?.class && data.class === 1? <div className='flex items-center'>{star}</div> :''}
              {!!data?.class && data.class === 2? <div className='flex items-center'>{star} {star}</div> :''}
              {!!data?.class && data.class === 3? <div className='flex items-center'>{star} {star} {star} </div> :''}
              {!!data?.class && data.class === 4? <div className='flex items-center'>{star} {star} {star} {star} </div> :''}
              {!!data?.class && data.class === 5? <div className='flex items-center'>{star} {star} {star} {star} {star} </div> :''}
            </div>
             <div className='flex flex-col gap-1 mt-1'>
               <div className='flex items-center gap-1'>
                   {!!data?.district && <div className=' text-blue-600 text-[12px] font-semibold'>{data?.district},</div>}
                   <div className=' text-blue-600 text-[12px] font-semibold'>{data?.city}</div>
                   <div className='text-[12px] font-light'>{data?.distance_to_cc} km from center</div>
               </div>
               <div className='mt-2'>
                   <div dangerouslySetInnerHTML={{ __html: data?.unit_configuration_label }} className=' text-[12px]' />
               </div>
               {data?.has_free_parking || data?.has_swimming_pool ? (
                  <div className='text-[12px] flex items-center gap-2 mt-1'>
                  {data?.has_free_parking > 0 && 
                  <div className='flex items-center gap-2'>
                      <img src={car} alt="parking" className='w-4' />
                      <span>Parking</span>
                  </div> 
                  }
                  { data?.has_swimming_pool > 0 &&
                  <div className='flex items-center gap-2'>
                    <img src={pool} alt="parking" className='w-4' />
                    <span>Pool</span>
                  </div> 
                  }
                </div>
                ):null}
               {data?.composite_price_breakdown?.items && (
                data.composite_price_breakdown?.items.map((item,i)=>(
                  item.kind != 'charge' && item.name != "Mobile-only price" && item.name != "Bonus savings" && item.name != 'Booking.com pays' && (
                    <span key={i} className='text-[12px] bg-green-700 text-white px-2 py-1 w-fit mt-1 rounded-md'>{item.name}</span>
                  )
                ))
              )} 

              {(data?.ribbon_text || data?.in_best_district > 0 || data?.is_beach_front > 0 || data?.is_city_center > 0 || data?.is_free_cancellable > 0 || data?.is_genius_deal > 0 || data?.is_geo_rate > 0 || data?.is_mobile_deal > 0 || data?.is_no_prepayment_block > 0 || data?.is_smart_deal > 0) &&
                <div className='mt-2 space-y-1'>
                {data?.ribbon_text && <p className='text-[12px] font-semibold text-green-700'>Breakfast included</p>}
                {data?.in_best_district > 0 && <p className='text-[12px] font-semibold'>Best district</p>}
                {data?.is_beach_front > 0 && <p className='text-[12px] font-semibold'>Beach front</p>}
                {data?.is_city_center > 0 && <p className='text-[12px] font-semibold'>City center</p>}
                {data?.is_free_cancellable > 0 && <p className='text-[12px] font-semibold'>Free cancellation</p>}
                {data?.is_genius_deal > 0 && <p className='text-[12px] font-semibold'>Genius deal</p>}
                {data?.is_geo_rate > 0 && <p className='text-[12px] font-semibold'>Geo rate</p>}
                {/* {data?.is_mobile_deal > 0 && <p className='text-[12px] font-semibold'>Mobile deal</p>} */}
                {data?.is_no_prepayment_block > 0 && <p className='text-[12px] font-semibold'>No Prepayment needed- pay at the property</p>}
                {data?.is_smart_deal > 0 && <p className='text-[12px] font-semibold'>Smart deal</p>}
                {!!data?.urgency_message &&  <p className='text-[12px] font-semibold text-red-600'>{data.urgency_message}</p>}
               </div>
               }
             </div>
           </div>
           <div className='w-[30%] gap-8 px-3'>
            <div className='flex items-center gap-2'>
             <div className='w-[100%] text-right'>
              {!data?.review_score && !data?.review_score_word && !data?.review_nr && (
                <span className='bg-yellow-400 px-2 py-1 text-[12px] rounded'>New to Aero Lodge</span>
              )}
              {!!data?.review_score_word && <h1 className='text-[14px]'>{data?.review_score_word}</h1>}
              {!!data?.review_nr && <p className='text-[12px] font-light'>{data?.review_nr} reviews</p>}
             </div>
            {!!data?.review_score && (
               <div className='w-[24%] h-full'>
                <p className='bg-blue-700 text-white text-center text-[14px] rounded-tr-full rounded-tl-full rounded-br-full py-1'>{data?.review_score}</p>
               </div>
            )}
            </div>
            <div className='flex flex-col space-y-1 text-right mt-[70px]'>
             <p className='text-[12px]'>
              {totalNight} {`${totalNight > 1 ? 'nights' : 'night'}`},
              {adultCount} {`${adultCount > 1 ? 'adults' : 'adult'}`} {`${childCount > 0 ? ',' : ''}`}
              {!! childCount && 
              <>
              {childCount} {`${childCount > 1 ? 'children' : 'child'}`}
              </>
              }
             </p>
             {data?.composite_price_breakdown?.strikethrough_amount && data?.composite_price_breakdown?.items.filter(item => item.name !== "Mobile-only price" && item.kind !== "charge").length > 0 && (
              <div className='text-[12px] text-red-700 line-through'>
                <span>
                  {data?.composite_price_breakdown?.strikethrough_amount?.currency} {Math.round(data?.composite_price_breakdown?.strikethrough_amount?.value)}
                </span>    
              </div>
             )}
              <div className='flex items-center justify-end gap-1'>
              {(data?.composite_price_breakdown?.gross_amount || data?.composite_price_breakdown?.strikethrough_amount) && (
                <p className='font-semibold '>
                  {data?.composite_price_breakdown?.items.filter(item => item.name !== "Mobile-only price" && item.kind !== "charge").length > 0 
                  ? 
                  `${data?.composite_price_breakdown?.gross_amount?.currency}
                   ${Math.round(data?.composite_price_breakdown?.gross_amount?.value)}`
                  :
                  data?.composite_price_breakdown?.strikethrough_amount ?
                  `${data?.composite_price_breakdown?.strikethrough_amount?.currency}
                   ${Math.round(data?.composite_price_breakdown?.strikethrough_amount?.value)}`
                   :
                  `${data?.composite_price_breakdown?.gross_amount?.currency}
                   ${Math.round(data?.composite_price_breakdown?.gross_amount?.value)}`
                  }
                </p>
              )}
              {data?.composite_price_breakdown?.strikethrough_amount_per_night?.value &&
                data?.composite_price_breakdown?.items.filter(item => item.name !== "Mobile-only price" && item.kind !== "charge").length > 0 && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                    onMouseEnter={() => handleMouseEnter(data.hotel_name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                  {!!hover.condition && hover.name === data.hotel_name && (
                  <div className='absolute bg-white w-[40%] top-52 -right-[120px] text-left flex-wrap p-2 rounded-md text-[12px] space-y-4 shadow-[1px_1px_10px_rgb(0,0,0,0.2)] z-50 flex flex-col'>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='space-x-1'>
                        <span>
                        {data?.composite_price_breakdown?.strikethrough_amount_per_night?.currency} 
                        </span>
                        <span>
                        {data?.composite_price_breakdown?.strikethrough_amount_per_night?.value}
                        </span>          
                        <span>x</span>
                        <span>{totalNight} {totalNight > 1 ? 'nights' : 'night'}</span>
                      </div>
                      <div className='space-x-1'>
                        {data?.composite_price_breakdown?.strikethrough_amount?.currency}
                        {data?.composite_price_breakdown?.strikethrough_amount?.value}                  
                      </div>
                    </div>
                    {data?.composite_price_breakdown?.items.map((item) => (
                      item.kind !== 'charge' && item.name !== 'Mobile-only price' && (
                        <div key={item.name} >
                         <div className='flex items-center justify-between text-sm'>
                          <div>{item.name}</div>
                          <div className='space-x-1'>
                            <span>-  {item.item_amount.currency}</span>
                            <span>{item.item_amount.value}</span>
                          </div>
                         </div>
                          {item.details}
                        </div>
                      )
                    ))}
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className='flex items-center justify-between text-sm font-semibold'>
                      <div>Total</div>
                      <div className='space-x-1'>
                        <span>{data?.composite_price_breakdown?.gross_amount?.currency}</span>
                        <span>{data?.composite_price_breakdown?.gross_amount?.value}</span>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
                )
            }
             </div>
            {!!data?.composite_price_breakdown?.strikethrough_amount_per_night && data?.composite_price_breakdown?.items.filter(item => item.name !== "Mobile-only price" && item.kind !== "charge").length > 0 &&  (
             <div className='w-full flex items-center justify-end'>
              <p className='text-[12px] px-2 py-1 text-white bg-red-700 rounded-md'>
                {Math.round((100 - (data?.composite_price_breakdown?.gross_amount?.value / data?.composite_price_breakdown?.strikethrough_amount?.value) * 100)) + '% off'}
              </p>
             </div>
            )}
             {data?.composite_price_breakdown.excluded_amount.value > 0 
             ? 
             <p className='text-[12px]'>+{data?.composite_price_breakdown?.excluded_amount?.currency} {Math.round(data?.composite_price_breakdown?.excluded_amount?.value)} taxes and charges</p>

             : <p className='text-[12px]'>Includes taxes and charges</p>      
            }
              <Link to={searchLink} className='w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-400 rounded' target='_blank'>
                <span className='text-[14px] text-white'>See availability</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg> 
              </Link>
            </div>
           </div>
           </div>
         ))}
        {(!!load_ing && datas && datas.length > 0) && (
        <div className='w-full flex items-center justify-center'>
          <button className='bg-white opacity-60 cursor-not-allowed text-blue-500 border border-blue-400 py-2 px-4 text-[14px] rounded' onClick={getData}>
            Show More Properties
          </button>
        </div>
        )}
        {!load_ing && datas && datas.length > 0 && datas.length !== count  && (
        <div className='w-full flex items-center justify-center'>
          <button className='bg-white text-blue-500 border border-blue-400 py-2 px-4 text-[14px] rounded' onClick={getData}>
            Show More Properties
          </button>
        </div>
        )}
        </div>
      </div>
      <section>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, et eum accusamus quae porro itaque quisquam unde praesentium nulla. Earum doloremque corporis reiciendis! Ipsa iste quibusdam labore officia enim laboriosam.
      </section>
    </div>
  )
}

export default Search