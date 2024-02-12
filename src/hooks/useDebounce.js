import React, { useEffect, useState } from 'react'

const useDebounce = (location) => {
    const [debouncedValue,setDebouncedValue] = useState (location);
    const delay = 1000;

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            setDebouncedValue(location)
        }, delay);

        return () => clearTimeout(timeOut)
    },[location,delay])
    
    return debouncedValue
}

export default useDebounce