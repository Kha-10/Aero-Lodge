import React from 'react'
import useApp from './useApp';

const useFirebaseRecentHandler = () => {
  const {history,room,currency,formattedCheckinDate,formattedCheckoutDate,adult,child,array,selectedOption} = useApp();

  const updatedHistoryHandler = (data) => {

    let langauge = localStorage.getItem('i18nextLng');
            const updatedHistory = { recent: history.recent , ...history };
            updatedHistory.recent.unshift({
              city: data?.title,
              room_number: room,
              lat: data.coordinates._lat,
              lng: data.coordinates._long,
              currencies: currency,
              locale: langauge === 'en' ? `${langauge}_GB` : langauge,
              checkout_date: formattedCheckoutDate,
              checkin_date: formattedCheckinDate,
              adults: adult,
              children: child,
              children_array: array,
              children_ages: selectedOption,
              img : data.image
            })
            const response = localStorage.getItem('history');
            if (response === null) {
              localStorage.setItem('history', JSON.stringify(updatedHistory.recent))
            }
            else {
              const parsedData = JSON.parse(response);              
              // Check if the city already exists in the recent history
              const cityExists = parsedData.some(item => item.city === updatedHistory.recent[0].city);

              if(cityExists) {
                const filtered = parsedData.filter(filteredData=> filteredData.city !== updatedHistory.recent[0].city);
                filtered.unshift(updatedHistory.recent[0])
                localStorage.setItem('history', JSON.stringify(filtered))
              }
              else {
                parsedData.unshift(updatedHistory.recent[0]);
                localStorage.setItem('history', JSON.stringify(parsedData));
              }
            }
  }
  return {updatedHistoryHandler}
}

export default useFirebaseRecentHandler