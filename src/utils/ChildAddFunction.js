import React from 'react'

const ChildFunction = (child, setChild, setArrayy) => {
    if (child < 10) {
        setChild(prevChild => prevChild + 1);
        setArrayy(prevArrayy => [...prevArrayy, child]);
      }
}

export default ChildFunction