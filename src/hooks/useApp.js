import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'


const useApp = () => {
    const contexts = useContext(AppContext);
    if (contexts === undefined) {
       new Error ('app context should only use within App context provider')
    }
  return contexts
  
}

export default useApp