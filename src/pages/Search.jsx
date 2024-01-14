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
import { Player } from '@lottiefiles/react-lottie-player';
import loadingTwo from '../loading2.json'
import loadinggg from '../animation.json';
import useFetch from '../hooks/useFetch';

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
    console.log(destType)

    const destid = params.get('dest_id');
 
    const {location,setLocation,toggle,latitude,longitude,imageurl,date,allDatas,setAllDatas} = useApp();

    console.log(allDatas)

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

    const getCheckinDate = checkinDate.split('-');
    const checkinDateValue = getCheckinDate[getCheckinDate.length - 1];

    const getCheckoutDate = checkoutDate.split('-');
    const checkoutDateValue = getCheckoutDate[getCheckoutDate.length - 1];

    const totalNight = checkoutDateValue - checkinDateValue;
   
  

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
  const [categoriesFilter,setCategoriesFilter] = useState([]);
  const [price,setPrice] = useState (null);
  const [filterData, setFilterData] = useState();
  const [newClick,setNewClick] = useState(false);
  const [initialSort,setInitialSort] = useState({id:'popularity',name:'Popularity'});
  const [pageNumber,setPageNumber] = useState(0);
  const [load,setLoad] = useState(false);
  const [hover, setHover] = useState({name : null,condition : false});
  const [load_ing,setLoad_ing] = useState(false);

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

      const currency= localStorage.getItem('cur');

      let{fetchData} = useFetch();

      let{count,sorts,loading} = fetchData(langauge, currency, destid, destType, categoriesFilter, initialSort.id, pageNumber, roomCount, lng, lat, checkoutDate, adultCount, checkinDate, childCount, children_age)

      useEffect(()=> {
        const source = axios.CancelToken.source();
        const filter = async () => {
          setLoad(true);
          console.log('ggggg')
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
                  page_number: pageNumber,
                }
                if (childCount > 0 || categoriesFilter.length > 0) {
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
                  cancelToken: source.token,
                },
                )
              const slicedFilter = filter.slice(2);
              console.log(slicedFilter);
              setLoad(false);
              setPrice(filter[1]);
              setFilterData(slicedFilter)
            } 
            catch (error) {
              setLoad(false);
              if(axios.isCancel(error)){
                console.log('Request was canceled2.')
              }
              else if (error.response) {
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
        return () => {
          source.cancel();
          console.log('Aborteddddddd')
        };
      },[langauge, currency, destid, destType, initialSort.id, adultCount, checkinDate, checkoutDate, roomCount, pageNumber, childCount, children_age])

    
    const changeHandler = (value)=> {
      setCategoriesFilter((prevCategories) => {
        return [...prevCategories, value];
      })

    }

    const handleCheckboxChange = (index_one, index_two,id) => {
      setFilterData(prevData => {
        const newData = [...prevData];
        const category = newData[index_one]?.categories?.[index_two];
        console.log(category)
        if (category) {
          category.selected = category.selected === 0 ? 1 : 0;
        }
    
        return newData;
      });
      setCategoriesFilter((prev) => {
        if (prev.includes(id)) {
          return prev.filter((categoryId) => categoryId !== id);
        } else {
          return [...prev, id];
        }
      });
    };    

    console.log(categoriesFilter)

      useEffect(()=>{
        setLocation(address)
        toggle.current=true;
      },[address])

      const searchLink = `/hotelDetail?city=${location}&room=${room}&latitude=${lat}&longitude=${lng}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${formattedCheckoutDate}&checkindate=${formattedCheckinDate}&adult=${adult}&children=${child}${child > 0 ? `&children_quantity=${arrayy}&children_ages=${selectedOption}` : ''}&img=${imageurl}`;

      useEffect(()=>{
        window.scrollTo(0,0)
    },[]);
    
    const sortBy = (name,id) => {
      setPageNumber(0);
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

     

      const getData = async () => {
        setLoad_ing(true)
        console.log('MMMMMMount')
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
                order_by: initialSort.id,
                checkout_date: checkoutDate,
                adults_number :adultCount,
                checkin_date :checkinDate,
                include_adjacency: 'true',
                page_number: updatedPageNumber,
              }
              if (childCount > 0 || categoriesFilter.length > 0 ) {
                params.children_number = childCount;
                params.children_ages = children_age;
                console.log(categoriesFilter)
                const combinedString = categoriesFilter.join(',');
                console.log(combinedString)
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
            setAllDatas((prevDatas)=>[...prevDatas,...result])
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
      // setPageNumber((prevPageNumber) => prevPageNumber+1);
      console.log(pageNumber)

    const handleMouseEnter = (index) => {
      setHover((prevHover) => ({ ...prevHover, name: index, condition: true }));
    };

    const handleMouseLeave = () => {
      setHover((prevHover) => ({ ...prevHover, condition: false }));
    }

    useEffect(() => {
      document.body.style.overflow = load ? 'hidden' : 'auto';

      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [load]);
 

   return (
    <div className='relative w-full min-h-screen bg-gray-100'>
      {/* {load && loading && (
      pageNumber <= 0 ? 
      (
        <div className='w-full flex justify-center items-center h-[100vh] inset-0 fixed top-0 left-0 bg-white z-50'>
          <Player
                autoplay
                loop
                src={loadinggg}
                style={{ height: '300px', width: '300px' }}
          >
          </Player>
        </div>
      ):
      (
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
      )
      )
      } */}
      {load && loading && (
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
      { allDatas.length > 0 && <div className='inset-x-0 max-w-6xl mx-auto p-[2%] flex items-center gap-4 justify-between top-[38px]'>
        <Autocomplete/>
        <Daterange handleNewPopup={handleNewPopup} setNewPopup={setNewPopup} 
          newPopup={newPopup}  />

            
        <div ref={popRef}  className='group cursor-pointer'>
          <div onClick={handlePopup} className='relative w-[300px] bg-white h-[60px] p-3  border border-gray-400 flex justify-between items-center rounded-lg group-hover:border-blue-500' >
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
      </div>}
      <div className='max-w-6xl mx-auto px-[2%] py-[1%] flex items-center justify-between'>
        {allDatas.length > 0 && <div className='font-semibold text-base'>Filter by</div>}
        {count > 0 && <h3 className='font-bold text-lg -ml-20'>{city} : {count} hotels found</h3>}
        {allDatas.length > 0 && 
          <div className='flex items-center gap-1'>
            <div className='font-light text-sm'>Sorted by</div>
            <div ref={popUp} className='flex items-center gap-1 cursor-pointer' onClick={sortToggle}>
              <div className='text-sm font-semibold'>{initialSort.name}</div>
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
          {!!price && allDatas.length > 0 &&
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
           {allDatas.length > 0 && (
            !!filterData && filterData.map((filter,i) => (
              <div key={i} className='bg-white p-3 rounded-lg border border-gray-200 space-y-2'>
                <h3 className='text-sm font-semibold'>{filter.title}</h3>
                <ul>
                {filter.categories.map((category,index)=> (
                  <li key={index} className="flex items-center mb-2 relative">
                    <input
                      type="checkbox"
                      id={category.name}
                      checked={category.selected === 1}
                      onChange={() => handleCheckboxChange(i, index,category.id)}
                      className="mr-2 appearance-none bg-white w-4 h-4 rounded border border-gray-300 relative hover:border-blue-500 cursor-pointer"
                    />
                    {category.selected === 1 ? 
                    <span className='absolute left-[2px]' onClick={()=>handleCheckboxChange(i, index,category.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3 text-blue-500 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    : null
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
         {!!allDatas && allDatas.map((data,i)=>(
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
               <h1 className='text-[14px]'>{data?.review_score_word}</h1>
               <p className='text-[12px] font-light'>{data?.review_nr} reviews</p>
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
              <p className='text-[12px] text-red-700 line-through'>
                {data?.composite_price_breakdown?.strikethrough_amount?.amount_rounded}
              </p>
             )}
              <div className='flex items-center justify-end gap-1'>
              {(data?.composite_price_breakdown?.gross_amount || data?.composite_price_breakdown?.strikethrough_amount) && (
                <p className='font-semibold '>
                  {data?.composite_price_breakdown?.items.filter(item => item.name !== "Mobile-only price" && item.kind !== "charge").length > 0 
                  ? 
                  data?.composite_price_breakdown?.gross_amount?.amount_rounded
                  :
                  data?.composite_price_breakdown?.strikethrough_amount?.amount_rounded || data?.composite_price_breakdown?.gross_amount?.amount_rounded
                  }
                </p>
              )}
              {data?.composite_price_breakdown?.strikethrough_amount_per_night?.amount_rounded &&
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
                      <div>
                        {data?.composite_price_breakdown?.strikethrough_amount_per_night?.amount_rounded} x {totalNight} {totalNight > 1 ? 'nights' : 'night'}
                      </div>
                      <div>
                        {data?.composite_price_breakdown?.strikethrough_amount?.amount_rounded}
                      </div>
                    </div>
                    {data?.composite_price_breakdown?.items.map((item) => (
                      item.kind !== 'charge' && item.name !== 'Mobile-only price' && (
                        <div key={item.name} >
                         <div className='flex items-center justify-between text-sm'>
                          <div>{item.name}</div>
                          <div>{item.item_amount.amount_rounded}</div>
                         </div>
                          {item.details}
                        </div>
                      )
                    ))}
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className='flex items-center justify-between text-sm font-semibold'>
                      <div>Total</div>
                      <div>{data?.composite_price_breakdown?.gross_amount?.amount_rounded}</div>
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
                {parseInt(100 - 100 * parseInt(String(data?.composite_price_breakdown?.gross_amount?.amount_rounded).replace(/[^\d.-]/g, '')) / parseInt   (String(data?.composite_price_breakdown?.strikethrough_amount?.amount_rounded).replace(/[^\d.-]/g, ''))) + '% off'}
              </p>
             </div>
            )}
             {data?.composite_price_breakdown.excluded_amount.value > 0 
             ? <p className='text-[12px]'>+ {data?.composite_price_breakdown.excluded_amount.amount_rounded} taxes and charges</p>  
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
        {(!!load_ing && allDatas && allDatas.length > 0) && (
        <div className='w-full flex items-center justify-center'>
          <button className='bg-white opacity-60 cursor-not-allowed text-blue-500 border border-blue-400 py-2 px-4 text-[14px] rounded' onClick={getData}>
            Show More Properties
          </button>
        </div>
        )}
        {!load_ing && allDatas && allDatas.length > 0 && allDatas.length !== count  && (
        <div className='w-full flex items-center justify-center'>
          <button className='bg-white text-blue-500 border border-blue-400 py-2 px-4 text-[14px] rounded' onClick={getData}>
            Show More Properties
          </button>
        </div>
        )}
        </div>
      </div>
      <section>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, et eum accusamus quae porro itaque quisquam unde praesentium nulla. Earum doloremque corporis reiciendis! Ipsa iste quibusdam labore officia enim laboriosam.
      Fugiat ad et veritatis voluptatibus, dolor fuga architecto deleniti. Magni repellendus maiores omnis quasi. Sit quia ipsam optio voluptatibus ut, est asperiores corrupti ipsum aliquam blanditiis saepe porro libero culpa!
      Aperiam consectetur cum aliquam libero dignissimos distinctio nostrum quaerat dicta aliquid eaque, vel dolorum optio obcaecati doloribus porro quod ab harum sunt perspiciatis culpa magni! Soluta exercitationem fugiat accusamus itaque!
      Et sit repellendus minus dolore ea illo ullam nisi sunt atque impedit. Aspernatur eveniet iure, excepturi similique quo iusto corrupti ex veritatis veniam cupiditate libero blanditiis accusantium debitis. Ut, ratione.
      Necessitatibus cumque ratione ex obcaecati corrupti, aut reprehenderit rem possimus nulla dolorem debitis officia aliquid ipsa eveniet nihil adipisci hic repudiandae? Doloremque voluptas tempore sapiente temporibus. Modi voluptate esse impedit.
      Et quos nobis nesciunt minus voluptatem provident laudantium, consectetur sint facilis pariatur. Quidem, doloribus! Molestias velit exercitationem est eveniet amet fugit. Illo aspernatur quaerat aliquid, at accusantium voluptatem eos assumenda.
      Culpa consequuntur, quo, magnam autem quod natus quibusdam fuga reiciendis quia eveniet excepturi earum totam, officia maxime ad placeat corporis porro. Ipsa exercitationem expedita eum quia deleniti temporibus sit architecto.
      Quibusdam cupiditate necessitatibus eveniet praesentium odio, quisquam dicta facere perferendis repellat dolores consequatur iste optio, doloremque sunt consectetur perspiciatis tempore officiis rem omnis beatae unde quos obcaecati illo. Sunt, omnis?
      Optio sapiente tempore assumenda neque consequuntur perferendis similique. Ab molestiae ipsa facere, eveniet est illum eaque dolores, at quibusdam, doloremque natus. Saepe velit aperiam ducimus voluptatum? Magni aut laborum vitae!
      Reprehenderit veritatis vero iusto, dolorem non quos, sint rerum neque, dignissimos molestias culpa. Deserunt porro fuga a. Ab optio voluptas aperiam maxime et, placeat ratione unde rem enim quod? Quis.</section>
    </div>
  )
}

export default Search