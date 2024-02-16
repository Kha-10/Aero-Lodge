import React from 'react'
import useFirebaseRecentHandler from '../hooks/useFirebaseRecentHandler';
import { Link } from 'react-router-dom';
import useApp from '../hooks/useApp';

const PopularCityLink = ({data}) => {
  const{updatedHistoryHandler} = useFirebaseRecentHandler();
  const {room,currency,formattedCheckoutDate,formattedCheckinDate,adult,child,selectedOption,array} = useApp();
  const language = localStorage.getItem('i18nextLng');
  const handleClick = () => {
    updatedHistoryHandler (data)
  }
  return (
    <Link
            to={`/city/${data.title}?city=${data.title}&room_number=${room}&latitude=${data.coordinates._lat}&longitude=${data.coordinates._long}&filter_by_currency=${currency}&locale=${language}&checkout_date=${formattedCheckoutDate}&adults=${adult}&checkin_date=${formattedCheckinDate}&children_number=${child}${child > 0 ? `&children_quantity=${array}&children_ages=${selectedOption}` : ''}`}
            target='_blank'
            key={data.id}
            className='cursor-pointer'
            onClick={handleClick}
        >
            <img src={data.image} alt="" className='w-full h-[200px] rounded-xl' />
            <div className='font-semibold mt-2'>{data.title}</div>
        </Link>
  )
}

export default PopularCityLink