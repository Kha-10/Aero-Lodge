// export const addSortByDataToHistory = (name,id) => {
//     const obj = {id :id,name :name}
//     const combinedDatas = {
//       adults : adult,
//       checkin_date : formattedCheckinDate,
//       checkout_date : formattedCheckoutDate,
//       children : child,
//       children_ages : selectedOption,
//       city : location,
//       currencies : currency,
//       dest_id : destid,
//       dest_type : destType,
//       img : image,
//       lat : lat,
//       lng : lng,
//       locale : langauge,
//       order_by : obj,
//       room_number : room,
//       categories_filterIds :filters
//     }
//     const localStorageDatas =localStorage.getItem('history');
//     const newDatas = JSON.parse(localStorageDatas);
//     const filteredItems = newDatas.filter(bb => bb.city !== city);
//     filteredItems.unshift(combinedDatas)
//     console.log(filteredItems)
//     localStorage.setItem('history',JSON.stringify(filteredItems));
//   }