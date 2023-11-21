import React from 'react'
import { useLocation,useParams} from 'react-router'
import { useEffect } from 'react';
import axios from 'axios';

const City = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const city = params.get('city');
  console.log(city)
  const locale = params.get('locale');
  console.log(locale)
  const room = params.get('room_number');
  console.log(room)
  const lng = params.get('longitude');
  console.log(lng)
  const lat = params.get('latitude');
  console.log(lat)
  const currency = params.get('filter_by_currency');
  console.log(currency)
  const checkout_date = params.get('checkout_date');
  console.log(checkout_date)
  const checkin_date = params.get('checkin_date');
  console.log(checkin_date)
  const adult = params.get('adults');
  console.log(adult)
  const children = params.get('children_number');
  console.log(children)
  
  
  const getData = async () => {
    let lang = ''; 
    if(locale==='en') {
       lang = locale+'-gb'
    }
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
          const {data:{result} } = await axios.get ('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',{
            params : params,
            headers: {
              'X-RapidAPI-Key': 'b49de35924mshab2af0dbb1a3725p1b5c58jsn4d30457a9e06',
              'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
            
          })
        console.log(result);

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

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <>
   
    </>
    
  )
}

export default City