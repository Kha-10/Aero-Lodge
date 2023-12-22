import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Guests from '../components/Guests';
import Adult from '../components/Adult';
import Child from '../components/Child';
import Room from '../components/Room';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import Autocomplete from '../components/Autocomplete';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import axios from 'axios';
import useApp from '../hooks/useApp';
import Daterange from '../components/Daterange';
import './App.css';
import FilterSection from '../components/FilterSection';
import pool from '../assets/pool.png';
import car from '../assets/car.png'


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
    const childrenQuantity = params.get('children_quantity');
    let arr_ay;
    if(children_age) {
       arr_ay = children_age.split(',');
    }else arr_ay =[]
    let arr;
    if(childrenQuantity) {
       arr = childrenQuantity.split(',');
    }else arr = []

   
   
    const cur = params.get('currency')
    const destType = params.get('dest_type');

    const destid = params.get('dest_id');
    const hotelsNumbers = params.get('hotels_numbers');
    const modifiedHotelsNumbers = parseInt(hotelsNumbers).toLocaleString();
 
    const {location,setLocation,toggle,latitude,longitude,imageurl,date} = useApp();

   

  



    const [adult, setAdult] = useState(adultCount);
    const [child, setChild] = useState(childCount);

    const checkinDate = params.get('checkindate');
    const inputCheckinDate = new Date(checkinDate);
    const opts = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    };
    const weekdayCheckinDate = inputCheckinDate.toLocaleString('en-US', opts);

    console.log(weekdayCheckinDate)
    

    const checkoutDate = params.get('checkoutdate');
    const inputCheckoutDate = new Date(checkoutDate);
    const opt = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    };
    const weekdayCheckoutDate = inputCheckoutDate.toLocaleString('en-US', opt);

    // const [date, setDate] = useState([
    //   {
    //     startDate: new Date(weekdayCheckinDate),
    //     endDate: new Date(weekdayCheckoutDate),
    //     key: 'selection'
    //   }
    // ]);

    // useEffect(()=>{
    //   const newDate = [...date];
    //   newDate[0].startDate = weekdayCheckinDate;
    //   newDate[0].endDate = weekdayCheckoutDate;
      
    //   setDate(newDate)

    // },[weekdayCheckinDate,weekdayCheckoutDate])
   
   
    const checkInDate = new Date (date[0].startDate) ;
  
    const checkInYear = checkInDate.getFullYear();
  
    const checkInMonth = (checkInDate.getMonth()+1).toString().padStart(2,0);
  
    const checkInDay = checkInDate.getDate().toString().padStart(2,0)
  
    const formattedCheckinDate = `${checkInYear}-${checkInMonth}-${checkInDay}`;
  
    const checkOutDate = new Date (date[0].endDate);
  
    const checkOutYear = checkOutDate.getFullYear();
  
    const checkOutMonth = (checkOutDate.getMonth()+1).toString().padStart(2,0);
  
    const checkOutDay = checkOutDate.getDate().toString().padStart(2,0);
  
    const formattedCheckoutDate = `${checkOutYear}-${checkOutMonth}-${checkOutDay}`;
  

    const [popup, setPopup] = useState(false);
    const [newPopup , setNewPopup] = useState (false);
    const popRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(arr_ay);
    const [room, setRoom] = useState(roomCount);
    const {t,i18n} = useTranslation();
    const options =[];
    for (let i = 0; i < 18; i++) {
     options.push({
      value : `${i}`,
      label : t('age.label',{count:i})
    }) 
  }

  const [arrayy,setArrayy] = useState(arr);
  const [address, setAddress] = useState(city);
  const newPopRef = useRef(null);
  console.log('FIRST RENDER')
  const [sorts,setSorts] = useState([]);
  console.log(sorts)
  const [datas, setDatas] = useState([]);
  const [categoriesFilter,setCategoriesFilter] = useState([]);
  const [price,setPrice] = useState (null);
  const [filterData, setFilterData] = useState({
    price: null,
    popularFilters: null,
    freeCancellationFilters : null,
    propertyRatingFilters: null,
    propertyTypeFilters: null,
    numberOfBedroomsFilters: null,
    facilitiesFilters: null,
    distanceFilters: null,
    mealsFilters: null,
    chainFilters: null,
    reviewFilters: null,
    roomFacilitiesFilters: null,
    bedPreferenceFilters: null,
    districtFilters: null,
    landmarksFilters:null
  });
  const [newClick,setNewClick] = useState(false);
  const [initialSort,setInitialSort] = useState({id:'popularity',name:'Popularity'});
    
  const addHandler = () => {
        if (child < 10) {
          setChild( prevChild => prevChild +1);
          setArrayy(prevArrayy => [...prevArrayy, child]);
        }
      };
     
      const removeHandler = () => {
        if (child > 0) {
          setChild ( prevChild => prevChild - 1);
          const arr = arrayy ;
          arr.pop()
          setArrayy (arr)
          const aar = selectedOption;
          aar.pop()
          setSelectedOption(aar)
        }
      };
    
      const addNewHandler = () => {
        if (adult < 30) {
          setAdult( prevAdultt => prevAdultt +1);
         
        }
      };
    
      const removeNewHandler = () => {
        if (adult > 1) {
          setAdult ( prevAdult => prevAdult - 1);
        }
      };
    
      const addRoom = () => {
        if (room < 30 ) {
          setRoom(prevRoom => prevRoom+1);
        }
      }
    
      const removeRoom = () => {
        if (room > 1 ) {
          setRoom(prevRoom => prevRoom-1 );
        }
      }
      
     const handleChange = (event, index) => {
        console.log("Index:", index);
        console.log(event.target.value)
      // Update the selectedOption array
        const updatedSelectedOption = [...selectedOption];
        updatedSelectedOption[index] = event.target.value;
        console.log(updatedSelectedOption[index])
        setSelectedOption(updatedSelectedOption);
      }
    
      const handlePopup = () => {
          setPopup(!popup)
          setNewPopup (false)
       
      }
    
      const handleNewPopup = () => {
        setNewPopup (!newPopup)
        setPopup(false)
       
      }
      useEffect(() => {
        function handleClickOutside(event) {
          if (!newPopRef.current.contains(event.target)) {
            setNewPopup(false);
          }
        }
    
        if (newPopup) {
          document.addEventListener('click', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [newPopup]);
      

      useEffect(() => {
        function handleClickOutside(event) {
          if (!popRef.current.contains(event.target)) {
            setPopup(false)
           
          }
        }
    
        if (popup) {
          document.addEventListener('click', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
        
      },[popup]);

      const langauge  = localStorage.getItem('i18nextLng');
      // console.log('localStorage language :',langauge);

      const currency= localStorage.getItem('cur');

      useEffect(()=> {
        const getData = async () => {
          let lang = ''; 
          if(langauge ==='en') {
             lang = langauge +'-gb'
          }else {
            lang = langauge
          }
          try {
            const params = {
                  units: 'metric',
                  room_number: roomCount,
                  longitude : lng,
                  latitude :lat,
                  filter_by_currency:currency,
                  locale:lang,
                  order_by: initialSort.id,
                  checkout_date: checkoutDate,
                  adults_number :adultCount,
                  checkin_date :checkinDate,
                  include_adjacency: 'true',
                  page_number: '0',
                }
                if (childCount > 0 || categoriesFilter ) {
                  params.children_number = childCount;
                  params.children_ages = children_age;
                  console.log(categoriesFilter)
                  const combinedString = categoriesFilter.join(',');
                  console.log(combinedString)
                  params.categories_filter_ids = combinedString;
                } 

                const {data:{result,sort} } = await axios.get ('http://localhost:8000/datas',{
                  params : params,
                })
              console.log(sort)
              setSorts(sort)
              console.log(result);
              setDatas(result)
      
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
                // Something else went wrong
                console.error('Error:', error.message);
            }
         
        };
        getData()
      },[langauge,currency,destid,destType,categoriesFilter,initialSort.id])

      useEffect(()=> {
        const filter = async () => {
          let lang = ''; 
          if(langauge ==='en') {
             lang = langauge +'-gb'
          }else {
            lang = langauge
          }
          try {
            const params = {
                  adults_number :adultCount,
                  filter_by_currency:currency,
                  checkin_date :checkinDate,
                  dest_id: destid,
                  dest_type: destType,
                  checkout_date: checkoutDate,
                  units: 'metric',
                  room_number: roomCount,
                  order_by: initialSort.id,
                  locale:lang,
                  include_adjacency: 'true',
                  page_number: '0',
                }
                if (childCount > 0 || categoriesFilter) {
                  params.children_number = childCount;
                  params.children_ages = children_age;
                
                  const combinedString = categoriesFilter.join(',');
                  console.log('Combined String:', combinedString);
                
                  params.categories_filter_ids = combinedString;
                } 
                
                console.log(childCount)
                console.log(categoriesFilter)
                const {data:{filter}} = await axios.get ('http://localhost:8000/filters',{
                  params : params,
                },
                )
              
              console.log(filter);
              setPrice(filter[1]);
              setFilterData({
                popularFilters: filter[2],
                freeCancellationFilters : filter[3],
                propertyRatingFilters: filter[4],
                propertyTypeFilters: filter[5],
                numberOfBedroomsFilters: filter[6],
                facilitiesFilters: filter[7],
                distanceFilters: filter[8],
                mealsFilters: filter[9],
                chainFilters: filter[10],
                reviewFilters: filter[11],
                RoomFacilitiesFilters: filter[12],
                bedPreferenceFilters: filter[13],
                districtFilters: filter[14],
                landmarksFilters: filter[15],

              });
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
                // Something else went wrong
                console.error('Error:', error.message);
            }
         
        };
        filter()
      },[langauge,currency,destid,destType,categoriesFilter,initialSort.id])

    const [selectedTitle,setselectedTitle] = useState ('');
    console.log(selectedTitle)
    
    const changeHandler = (value)=> {
      console.log(value)
      setselectedTitle(value)
      const newArray = [];
      newArray.push(value);
      setCategoriesFilter((prevCategories) => {
        return [...prevCategories, value];
      })

    }

    const [clickStates, setClickStates] = useState({
      popular: Array(filterData.popularFilters?.categories?.length).fill(false),
      freeCancellation: Array(filterData.freeCancellationFilters?.categories?.length).fill(false),
      propertyRating: Array(filterData.propertyRatingFilters?.categories?.length).fill(false),
      propertyType: Array(filterData.propertyTypeFilters?.categories?.length).fill(false),
      numberOfBedrooms: Array(filterData.numberOfBedroomsFilters?.categories?.length).fill(false),
      facilities: Array(filterData.facilitiesFilters?.categories?.length).fill(false),
      distance: Array(filterData.distanceFilters?.categories?.length).fill(false),
      meals: Array(filterData.mealsFilters?.categories?.length).fill(false),
      chain: Array(filterData.chainFilters?.categories?.length).fill(false),
      review: Array(filterData.reviewFilters?.categories?.length).fill(false),
      roomFacilities: Array(filterData.roomFacilitiesFilters?.categories?.length).fill(false),
      bedPreference: Array(filterData.bedPreferenceFilters?.categories?.length).fill(false),
      district: Array(filterData.districtFilters?.categories?.length).fill(false),
      landmarks: Array(filterData.landmarksFilters?.categories?.length).fill(false)
    });
    

  const clickHandler = (index, obj) => {
    const { id } = obj;
  
    setClickStates((prevStates) => {
      const newState = { ...prevStates };

      const filterKeys = [
        'popular',
        'freeCancellation',
        'propertyRating',
        'propertyType',
        'numberOfBedrooms',
        'facilities',
        'distance',
        'meals',
        'chain',
        'review',
        'roomFacilities',
        'bedPreference',
        'district',
        'landmarks',
      ];
      filterKeys.forEach((key)=>{
        if(id === filterData[key+'Filters']?.id) {
          newState[key][index] = ! newState[key][index];
        }
      })
      return newState;
    });
    const category = [];
      if( obj.categories[index].id !== categoriesFilter[categoriesFilter.length-1]) {
        category.push(obj.categories[index].id);
        setCategoriesFilter((prevCategoriesFilter)=> [...prevCategoriesFilter,...category])
      }else{
       const newCategoriesFilter = [...categoriesFilter];
       newCategoriesFilter.pop();
       setCategoriesFilter(newCategoriesFilter)
      }
      
  };
  

      
      useEffect(()=>{
        setLocation(address)
        toggle.current=true;
      },[address])

      const searchLink = `/search?city=${location}&room=${room}&latitude=${latitude}&longitude=${longitude}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${formattedCheckoutDate}&checkindate=${formattedCheckinDate}&adult=${adult}&children=${child}${child > 0 ? `&children_quantity=${arrayy}&children_ages=${selectedOption}` : ''}&img=${imageurl}`;

      useEffect(()=>{
        window.scrollTo(0,0)
    },[]);
    

    const sortBy = (name,id) => {
      setInitialSort((prevInitialSort)=>{
        const newInitialSort = {...prevInitialSort};
        newInitialSort.name = name;
        newInitialSort.id = id;
       return newInitialSort
      })

    }
    
    const sortToggle = () => {
      setNewClick(!newClick)
    }
    
    const popUp = useRef(null);

    useEffect(()=>{
      function handleClickoutside (event) {
        if(!popUp.current.contains(event.target)){
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
  


   return (
    <div className='w-full min-h-screen bg-gray-100'>
      <div className='inset-x-0 max-w-6xl mx-auto p-[2%] flex items-center gap-4 justify-between top-[38px]'>
        <Autocomplete/>
        <Daterange handleNewPopup={handleNewPopup} setNewPopup={setNewPopup} 
          newPopup={newPopup}  />

            
        <div ref={popRef}  className='group cursor-pointer'>
          <div onClick={handlePopup} className='relative w-[300px] bg-white h-[60px] p-3  border border-gray-400 flex justify-between items-center        rounded-lg group-hover:border-blue-500' >
          <Guests adult={adult} child={child} room={roomCount}/>
          </div>
            
          {!!popup && 
          <div className='bg-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] w-[330px] rounded-lg absolute top-[25%] right-[21%] flex flex-col space-y-5 p-6 '>
            
            <Adult removeNewHandler={removeNewHandler} adult={adult} addNewHandler={addNewHandler}/>
            
            <Child  removeHandler={removeHandler} child={child} addHandler={addHandler} array={arrayy} handleChange={handleChange}
            selectedOption={selectedOption} options={options}/>
            
            <Room room={room} removeRoom={removeRoom} addRoom={addRoom}/>
            
            <button type='button' className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={handlePopup}>Done</button>
            </div>}
        </div>
        <Link to={searchLink} className='bg-blue-500 text-white text-lg font-semibold rounded-lg px-6 py-4 text-center hover:bg-blue-400'target='_blank'>    
          {t('button.search')}
        </Link>  
      </div>
      <div className='max-w-6xl mx-auto px-[2%] py-[1%] flex items-center justify-between'>
        <div className='font-semibold text-base'>Filter by</div>
        <h3 className='font-bold text-lg -ml-20'>{city} : {modifiedHotelsNumbers} hotels found</h3>
        <div className='flex items-center gap-1'>
          <div className='font-light text-sm'>Sorted by</div>
          <div ref={popUp} className='flex items-center gap-1 cursor-pointer' onClick={sortToggle}>
            <div className='text-sm font-semibold'>{initialSort.name}</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-3 h-3 stroke-black">
              <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
            </svg>  
          </div>
        </div>
        <div className={`${newClick ? 'visible' : 'hidden'} w-[280px] shadow-[1px_1px_10px_rgb(0,0,0,0.1)] absolute top-[235px] z-30 right-[170px] bg-white rounded-lg space-y-1 text-[13px]`}>
              {!!sorts &&
                sorts.map((sort, id) => (
                  <div key={id} className='hover:bg-stone-100 cursor-pointer px-4 py-3 first:rounded-t-lg last:rounded-b-lg' onClick={()=>{sortBy(sort.name,sort.id),setNewClick(false)}}>
                    {sort.name}
                  </div>
                ))}
        </div>
      </div>
      <div className='max-w-6xl mx-auto flex'>
        <div className='w-[40%] px-8 py-4'> 
          <div className='w-full flex flex-col gap-[20px] '>
          {!!price && 
            <div className='w-[210px] group'>
              <div className='font-semibold text-sm'>{price.title}</div>
              <div className='bg-white rounded-lg mt-2 p-3 border border-gray-200'>
                <select className='w-[180px] group-hover:text-blue-400 text-[13px] focus:outline-none' value={selectedTitle || ''}  onChange={(e) => changeHandler(e.target.value)}>
                  <option value="">{price.title}</option>
                  {!!price && price.categories && price.categories.map((category)=>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
          }
          <FilterSection filterObj={filterData.popularFilters} clickState={clickStates.popular} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.freeCancellationFilters} clickState={clickStates.freeCancellation} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.propertyRatingFilters} clickState={clickStates.propertyRating} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.propertyTypeFilters} clickState={clickStates.propertyType} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.numberOfBedroomsFilters} clickState={clickStates.numberOfBedrooms} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.facilitiesFilters} clickState={clickStates.facilities} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.distanceFilters} clickState={clickStates.distance} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.mealsFilters} clickState={clickStates.meals} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.chainFilters} clickState={clickStates.chain} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.reviewFilters} clickState={clickStates.review} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.roomFacilitiesFilters} clickState={clickStates.roomFacilities} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.bedPreferenceFilters} clickState={clickStates.bedPreference} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.districtFilters} clickState={clickStates.district} clickHandler={clickHandler} />
          <FilterSection filterObj={filterData.landmarksFilters} clickState={clickStates.landmarks} clickHandler={clickHandler} />
          
          </div>
        </div>
        <div className='w-full px-3 py-6 flex flex-col gap-4'>
         {!!datas && datas.map((data,i)=>(
           <div key={i} className='w-full flex border py-4 border-gray-200 bg-white rounded-lg'>
           <div className='w-[40%] flex justify-center'>
             <img src={data?.max_photo_url} className='rounded-lg max-h-[200px] max-w-[200px]' />
           </div>
           <div className='w-[64%]'>
             <div className=' font-semibold text-xl'>{data?.hotel_name}</div>
             <div className='flex flex-col gap-1 mt-1'>
               <div className='flex items-center gap-1'>
                   {!!data?.class && data.class === 1? <div className='flex items-center'>{star}</div> :''}
                   {!!data?.class && data.class === 2? <div className='flex items-center'>{star} {star}</div> :''}
                   {!!data?.class && data.class === 3? <div className='flex items-center'>{star} {star} {star} </div> :''}
                   {!!data?.class && data.class === 4? <div className='flex items-center'>{star} {star} {star} {star} </div> :''}
                   {!!data?.class && data.class === 5? <div className='flex items-center'>{star} {star} {star} {star} {star} </div> :''}
                   {!!data?.district && <div className='text-blue-600 text-[12px] font-semibold'>{data?.district},</div>}
                   <div className='text-blue-600 text-[12px] font-semibold'>{data?.city}</div>
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
               <div className='mt-2'>
                {data?.ribbon_text && <p className='text-[12px] font-semibold'>Breakfast included</p>}
                {data?.in_best_district > 0 && <p className='text-[12px] font-semibold'>Best district</p>}
                {data?.is_beach_front > 0 && <p className='text-[12px] font-semibold'>Beach front</p>}
                {data?.is_city_center > 0 && <p className='text-[12px] font-semibold'>City center</p>}
                {data?.is_free_cancellable > 0 && <p className='text-[12px] font-semibold'>Free cancellation</p>}
                {data?.is_genius_deal > 0 && <p className='text-[12px] font-semibold'>Genius deal</p>}
                {data?.is_geo_rate > 0 && <p className='text-[12px] font-semibold'>Geo rate</p>}
                {data?.is_mobile_deal > 0 && <p className='text-[12px] font-semibold'>Mobile deal</p>}
                {data?.is_no_prepayment_block > 0 && <p className='text-[12px] font-semibold'>No Prepayment needed- pay at the property</p>}
                {data?.is_smart_deal > 0 && <p className='text-[12px] font-semibold'>Smart deal</p>}
               </div>
             </div>
           </div>
           <div className='w-[30%] gap-8 px-3'>
            <div className='flex items-center gap-2'>
             <div className='w-[80%] text-right'>
               <h1 className='text-[14px]'>{data?.review_score_word}</h1>
               <p className='text-[12px] font-light'>{data?.review_nr} reviews</p>
             </div>
             <div className='w-[18%] h-full'>
               <p className='bg-blue-500 text-white text-center text-[14px] rounded-tr-full rounded-tl-full rounded-br-full py-1'>{data?.review_score}</p>
             </div>
            </div>
            <div className=' space-y-1 text-right mt-[70px]'>
             <p className='text-[12px]'>3 nights,2 adults,2 children</p>
             <p className='text-[12px] text-red-700 line-through'>THB 1000</p>
             <p className='text-[20px]'>THB 48,000</p>
             <p className='text-[12px] px-2 py-1 bg-green-700 text-white inline rounded-md'>10% off</p>
             <p className='text-[12px]'>Includes taxes and fees</p>
             <button className='text-[14px] px-3 py-2 bg-blue-500 text-white rounded'>See availability</button>
            </div>
           </div>
           </div>
         ))}
        </div>
      </div>
    </div>
  )
}

export default Search