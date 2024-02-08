export const addChildrenHandler = (child, setChild, setArrayy) => {
    if (child < 10) {
        setChild(prevChild => prevChild + 1);
        setArrayy(prevArrayy => [...prevArrayy, child]);
      }
}

export const removeChildrenHandler = (child,setChild,array,setArray,selectedOption,setSelectedOption) => {
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

export const addAdultsHandler = (adult,setAdult) => {
    if (adult < 30) {
      setAdult( prevAdult => prevAdult +1);
     
    }
  };

  export const removeAdultsHandler = (adult,setAdult) => {
    if (adult > 1) {
      setAdult ( prevAdult => prevAdult - 1);
     }
    };