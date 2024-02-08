import React from 'react'

const ChildRemoveFunction = (child,setChild,array,setArray,selectedOption.setSelectedOption) => {
    if (child > 0) {
        setChild ( prevChild => prevChild - 1);
        const arrOne = array ;
        arrOne.pop()
        setArray (arrOne)
        const arrTwo = selectedOption;
        arrTwo.pop()
        setSelectedOption(arrTwo)
      }
}

export default ChildRemoveFunction