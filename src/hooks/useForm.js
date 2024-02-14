import React from 'react'
import useApp from "./useApp";

const formHandler = () => {
    const{selectedOption,setSelectedOption} = useApp();

    const handleChange = (event, index) => {
        console.log("Index:", index);
        console.log(event.target.value);
        const updatedSelectedOption = [...selectedOption];
        updatedSelectedOption[index] = event.target.value;
        console.log(updatedSelectedOption[index]);
        setSelectedOption(updatedSelectedOption);
      }

  return {handleChange}
    
}

export default formHandler