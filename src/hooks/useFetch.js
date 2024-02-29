import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';


const useFetch = () => {

    const fetchData = (langauge, currency, destid, destType, roomCount, lng, lat, checkoutDate, adultCount, checkinDate, childCount, children_age,orderBy,ids) => {

        const [count,setCount] = useState(0);
        const [sorts,setSorts] = useState([]);
        const [datas, setDatas] = useState([]);
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
                    //   categories_filter_ids : categories,
                      order_by: orderBy,
                      checkout_date: checkoutDate,
                      adults_number :adultCount,
                      checkin_date :checkinDate,
                      include_adjacency: 'true',
                      page_number: '0',
                    }
                    if (childCount > 0 || ids.length > 0 ) {
                      params.children_number = childCount;
                      params.children_ages = children_age;
                      const combinedString = ids.join(',');
                      params.categories_filter_ids = combinedString;
                    } 
                    // if (childCount > 0 ) {
                    //     params.children_number = childCount;
                    //     params.children_ages = children_age;
                    //   } 
                    const {data:{result,count,sort} } = await axios.get ('http://localhost:8000/datas',{
                      params : params,
                      cancelToken: source.token,
                    })
                  setLoading(false)
                  setCount(count)
                  setDatas(result)
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
          },[langauge, currency, destid, destType, ids, roomCount, lng, lat, checkoutDate, adultCount, checkinDate, childCount, children_age,orderBy])
    
        return{datas,setDatas,count,sorts,loading}
    }

    // for filter by
    const filterItems = (langauge, currency, destid, destType,roomCount,checkoutDate, adultCount, checkinDate, childCount, children_age,orderById,collectedIds,pageNumber) => {

      const [price,setPrice] = useState(null);
      const [filteredData,setFilterData] = useState();
      
      useEffect(()=> {
        const source = axios.CancelToken.source();
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
                  order_by: orderById,
                  locale:lang,
                  include_adjacency: 'true',
                  page_number: pageNumber,
                }
                if (childCount > 0 || collectedIds.length > 0) {
                  params.children_number = childCount;
                  params.children_ages = children_age;
                
                  const combinedString = collectedIds.join(',');
                  console.log('Combined String:', combinedString);
                
                  params.categories_filter_ids = combinedString;
                }  
                const {data:{filter}} = await axios.get ('http://localhost:8000/filters',{
                  params : params,
                  cancelToken: source.token,
                },
                )
              console.log(filter)
              const slicedFilter = filter.slice(2);
              setPrice(filter[1]);
              setFilterData(slicedFilter)
            } 
            catch (error) {
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
      },[langauge, currency, destid, destType,adultCount, checkinDate, checkoutDate,orderById,collectedIds,roomCount, pageNumber, childCount, children_age])
        return{price,filteredData}
    };

  return {fetchData,filterItems}
}

export default useFetch