import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import useApp from './useApp';


const useFetch = () => {
    const {allDatas,setAllDatas} = useApp();
    const fetchData = (langauge, currency, destid, destType, categoriesFilter, initialSort, pageNumber, roomCount, lng, lat, checkoutDate, adultCount, checkinDate, childCount, children_age) => {
        const [count,setCount] = useState(0);
        const [sorts,setSorts] = useState([]);
        // const [datas, setDatas] = useState([]);
        const [loading,setLoading] = useState(false);
        
        useEffect(()=> {
            const source = axios.CancelToken.source();
            const getData = async () => {
              setLoading(true)
              console.log('MMMMMMount')
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
                      order_by: initialSort,
                      checkout_date: checkoutDate,
                      adults_number :adultCount,
                      checkin_date :checkinDate,
                      include_adjacency: 'true',
                      page_number: pageNumber,
                    }
                    if (childCount > 0 || categoriesFilter.length > 0 ) {
                      params.children_number = childCount;
                      params.children_ages = children_age;
                      console.log(categoriesFilter)
                      const combinedString = categoriesFilter.join(',');
                      console.log(combinedString)
                      params.categories_filter_ids = combinedString;
                    } 
    
                    const {data:{count,result,sort} } = await axios.get ('http://localhost:8000/datas',{
                      params : params,
                      cancelToken: source.token,
                    })
                  setLoading(false)
                  setCount(count)
                  setAllDatas(result)
                //   setDatas(result)
                //   setDatas((prevDatas)=>[...prevDatas,...result])
                  console.log(result)
                  setSorts(sort)
                } 
                catch (error) {
                  setLoading(false)
                  if (axios.isCancel(error)) {
                    console.log('Request was canceled.');
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
            getData();
    
            return () => {
              source.cancel();
              console.log('Aborteddddddd')
            };
          },[langauge, currency, destid, destType, categoriesFilter, initialSort.id, roomCount, lng, lat, checkoutDate, adultCount, checkinDate, childCount, children_age, initialSort])
    
        // return{count,sorts,datas,loading}
        return{count,sorts,loading}
    }

   
    const filterItems = () => {
        
        return{}
    };

  return {fetchData,filterItems}
}

export default useFetch