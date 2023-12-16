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

  const [sorts,setSorts] = useState([]);
  const [data, setData] = useState([]);
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
                  order_by: 'popularity',
                  checkout_date: checkoutDate,
                  adults_number :adultCount,
                  checkin_date :checkinDate,
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

                const {data:{result,sort} } = await axios.get ('http://localhost:8000/datas',{
                  params : params,
                })
              console.log(sort)
              setSorts(sort)
              console.log(result);
              // setData(result)
      
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
      },[langauge,currency,destid,destType,categoriesFilter])

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
                  order_by: 'popularity',
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
      },[langauge,currency,destid,destType,categoriesFilter])

      const svg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4 text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>;

    const [selectedTitle,setselectedTitle] = useState ('');
    
    const changeHandler = (value)=> {
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
  
      const handleClickState = (state, key) => {
        if (id === filterData[key]?.id) {
          state[index] = !state[index];
        }
      };
  
      handleClickState(newState.popular, 'popularFilters');
      handleClickState(newState.freeCancellation, 'freeCancellationFilters');
      handleClickState(newState.propertyRating, 'propertyRatingFilters');
      handleClickState(newState.propertyType, 'propertyTypeFilters');
      handleClickState(newState.numberOfBedrooms, 'numberOfBedroomsFilters');
      handleClickState(newState.facilities, 'facilitiesFilters');
      handleClickState(newState.distance, 'distanceFilters');
      handleClickState(newState.meals, 'mealsFilters');
      handleClickState(newState.chain, 'chainFilters');
      handleClickState(newState.review, 'reviewFilters');
      handleClickState(newState.roomFacilities, 'roomFacilitiesFilters');
      handleClickState(newState.bedPreference, 'bedPreferenceFilters');
      handleClickState(newState.district, 'districtFilters');
      handleClickState(newState.landmarks, 'landmarksFilters');
  
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
  
  const renderFilterSection = (filterObj, clickState, clickHandler) => (
    filterObj && (
      <div className='w-full bg-white px-4 py-3 rounded-lg border border-gray-300 '>
        <div className='font-semibold text-sm'>{filterObj.title}</div>
        <div className='mt-2'>
          {filterObj.categories && filterObj.categories.map((filter, i) => (
            <div key={i} className='group w-full flex items-center gap-2 cursor-pointer mt-3' onClick={() => clickHandler(i, filterObj)}>
              <div className='w-full flex items-center gap-2 '>
                <div className='w-[10%] flex items-center justify-center'>
                  <div className='border border-gray-300 group-hover:border-blue-400 bg-white rounded w-5 h-5 flex items-center justify-center'>
                    {clickState[i] && svg}
                  </div>
                </div>
                <p className='text-[13px] group-hover:text-blue-400'>{filter.name}</p>
              </div>
              <p className='text-[13px] group-hover:text-blue-400'>{filter.count}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );

      
      useEffect(()=>{
        setLocation(address)
        toggle.current=true;
      },[address])

      const searchLink = `/search?city=${location}&room=${room}&latitude=${latitude}&longitude=${longitude}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${formattedCheckoutDate}&checkindate=${formattedCheckinDate}&adult=${adult}&children=${child}${child > 0 ? `&children_quantity=${arrayy}&children_ages=${selectedOption}` : ''}&img=${imageurl}`;

      useEffect(()=>{
        window.scrollTo(0,0)
    },[])


    
    const [newClick,setNewClick] = useState(false);

    // useEffect(()=>{
    //   if(sorts){
    //     console.log(sorts)
    //   }
    // },[])
    const [initialSort,setInitialSort] = useState('');
    

    const sortBy = (name,id) => {
      setInitialSort(name)
      const sortedArray = [];
      sortedArray.push(id);
      setCategoriesFilter((prevStates)=>{
       return [...prevStates,...sortedArray]
      })

    }
    
    const sortToggle = () => {
      setNewClick(!newClick)
    }
   return (
    <div className='w-full h-[800vh] bg-gray-100'>
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
        <div className='flex items-center gap-1'>
          <div className='font-light text-sm'>Sorted by</div>
          <div className='flex items-center gap-1 cursor-pointer' onClick={sortToggle}>
            <div className='text-sm font-semibold'>{initialSort || sorts[0]?.name}</div>
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
              <div className='bg-white rounded-lg mt-2 p-3 border border-gray-300'>
                <select className='w-[180px] group-hover:text-blue-400 text-[13px] focus:outline-none' value={selectedTitle || ''}  onChange={(e) => changeHandler(e.target.value) }>
                  <option value="">{price.title}</option>
                  {!!price && price.categories && price.categories.map((category)=>(
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
          }
          {renderFilterSection(filterData.popularFilters, clickStates.popular, clickHandler)}
          {renderFilterSection(filterData.freeCancellationFilters, clickStates.freeCancellation, clickHandler)}
          {renderFilterSection(filterData.propertyRatingFilters, clickStates.propertyRating, clickHandler)}
          {renderFilterSection(filterData.propertyTypeFilters, clickStates.propertyType, clickHandler)}
          {renderFilterSection(filterData.numberOfBedroomsFilters, clickStates.numberOfBedrooms, clickHandler)}
          {renderFilterSection(filterData.facilitiesFilters, clickStates.facilities, clickHandler)}
          {renderFilterSection(filterData.distanceFilters, clickStates.distance, clickHandler)}
          {renderFilterSection(filterData.mealsFilters, clickStates.meals, clickHandler)}
          {renderFilterSection(filterData.chainFilters, clickStates.chain, clickHandler)}
          {renderFilterSection(filterData.reviewFilters, clickStates.review, clickHandler)}
          {renderFilterSection(filterData.roomFacilitiesFilters, clickStates.roomFacilities, clickHandler)}
          {renderFilterSection(filterData.bedPreferenceFilters, clickStates.bedPreference, clickHandler)}
          {renderFilterSection(filterData.districtFilters, clickStates.district, clickHandler)}
          {renderFilterSection(filterData.landmarksFilters, clickStates.landmarks, clickHandler)}
          </div>
        </div>
        <div className='w-full px-3 py-6'>
          <div className='flex items-center justify-end space-x-1'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search