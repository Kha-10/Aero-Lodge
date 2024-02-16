import React from 'react'
import { Link } from 'react-router-dom';
import useApp from '../../../hooks/useApp';
import { useTranslation } from 'react-i18next';
import useRecentHandler from '../../../hooks/useRecentHandler';

const SearchButton = () => {
  const {adult,child,selectedOption,room,array,formattedCheckinDate,formattedCheckoutDate,currency,latitude,longitude,location,history,destType,destid,orderBy,toggle} = useApp (); 

  const {recentHandler} = useRecentHandler();

  const {t} = useTranslation();

  const searchLink = `/search?city=${location || history.recent[0]?.city}&room=${parseInt(room)}&latitude=${latitude || history.recent[0]?.lat}&longitude=${longitude || history.recent[0]?.lng}&currency=${currency}&locale=${localStorage.getItem('i18nextLng')}&checkoutdate=${formattedCheckoutDate}&checkindate=${formattedCheckinDate}&adult=${parseInt(adult)}&children=${parseInt(child)}${child > 0 ? `&children_quantity=${array}&children_ages=${selectedOption}`:''}&dest_id=${destid || history.recent[0]?.dest_id}&dest_type=${destType||  history.recent[0]?.dest_type}&order_by=${orderBy || history.recent[0]?.order_by}`; 

  return (
    <Link to={searchLink} className='bg-blue-500 text-white text-lg font-semibold rounded-lg px-6 py-4 text-center hover:bg-blue-400' onClick={()=>{recentHandler();
        toggle.current=true}}>
          {t('button.search')}
    </Link>
  )
}

export default SearchButton