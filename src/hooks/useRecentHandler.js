import React from 'react'
import useApp from './useApp';

const useRecentHandler = () => {
    const {adult,child,selectedOption,room,array,formattedCheckinDate,formattedCheckoutDate,currency,latitude,longitude,location,imageurl,history,destType,destid,orderBy} = useApp();

    const recentHandler = () => {
        const updatedHistory = { recent: history.recent , ...history };
        updatedHistory.recent.unshift({
          city: location || history.recent[0].city,
          room_number: room,
          lat: latitude || history.recent[0].lat,
          lng: longitude || history.recent[0].lng,
          currencies: currency,
          locale: localStorage.getItem('i18nextLng'),
          checkout_date: formattedCheckoutDate,
          checkin_date: formattedCheckinDate,
          adults: adult,
          children: child,
          children_array: array,
          children_ages: selectedOption,
          img : imageurl || history.recent[0].img,
          dest_type : destType || history.recent[0].dest_type,
          dest_id : destid || history.recent[0].dest_id,
          order_by : orderBy || history.recent[0].order_by,
        }); 
        const data = localStorage.getItem('history');
        if (data === null) {
          localStorage.setItem('history', JSON.stringify(updatedHistory.recent))
        }
        else {
          const parsedData = JSON.parse(data);
          // Check if the city already exists in the recent history
          const cityExists = parsedData.some(item => item.city === updatedHistory.recent[0].city);
          if(cityExists) {
            const filtered = parsedData.filter(gg => gg.city !== updatedHistory.recent[0].city);
            filtered.unshift(updatedHistory.recent[0])
            localStorage.setItem('history', JSON.stringify(filtered))
          }
          else {
            parsedData.unshift(updatedHistory.recent[0]);
            localStorage.setItem('history', JSON.stringify(parsedData));
          }
        }    
      };
    
  return {recentHandler}
}

export default useRecentHandler