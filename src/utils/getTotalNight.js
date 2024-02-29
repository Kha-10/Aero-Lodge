import React from 'react'

const getTotalNight = (checkInDate,checkOutDate) => {
    const getCheckinDate = checkInDate.split('-');

    const checkinDateValue = getCheckinDate[getCheckinDate.length - 1];

    const getCheckoutDate = checkOutDate.split('-');

    const checkoutDateValue = getCheckoutDate[getCheckoutDate.length - 1];

    const totalNight = checkoutDateValue - checkinDateValue;

    return {totalNight}
}

export default getTotalNight