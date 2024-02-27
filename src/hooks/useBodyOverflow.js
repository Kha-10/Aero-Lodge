import React from 'react'
import { useEffect } from 'react';

const useBodyOverflow = (showPopup) => {

    useEffect(() => {
        document.body.style.overflow = showPopup ? 'hidden' : 'auto';
    
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [showPopup]);
}

export default useBodyOverflow