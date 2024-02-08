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
