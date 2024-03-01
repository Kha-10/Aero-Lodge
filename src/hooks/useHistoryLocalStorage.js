import React from 'react'
import { useEffect } from 'react'
import useApp from './useApp'

const useHistoryLocalStorage = (collectedDataIds,lat,lng,city) => {

    const {formattedCheckinDate,formattedCheckoutDate,location} = useApp();
    const language = localStorage.getItem('i18nextLng');
    const currency = localStorage.getItem('cur');
    const datas = localStorage.getItem('history');
    const parsedData = JSON.parse(datas);
    const adult = parsedData[0]?.adults;
    const child = parsedData[0]?.children;
    const selectedOption = parsedData[0]?.children_ages;
    const destid = parsedData[0]?.dest_id;
    const destType = parsedData[0]?.dest_type;
    const image = parsedData[0]?.img;
    const room = parsedData[0]?.room_number;
    const orderBy = parsedData[0]?.order_by;

    useEffect (()=> {
        if(collectedDataIds.length > 0) {
          const collectedDatas = {
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
            locale : language,
            order_by : orderBy,
            room_number : room,
            categories_filterIds : collectedDataIds
          }
          const localStorageDatas =localStorage.getItem('history');
          const newDatas = JSON.parse(localStorageDatas);
          const filteredItems = newDatas.filter(bb => bb.city !== city);
          filteredItems.unshift(collectedDatas)
    
          localStorage.setItem('history',JSON.stringify(filteredItems));
        }
      },[collectedDataIds])
  
}

export default useHistoryLocalStorage