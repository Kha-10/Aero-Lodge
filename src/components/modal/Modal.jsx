import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({children}) => {
  return (
    ReactDom.createPortal(
        <div className='h-screen bg-black bg-opacity-20 z-10 absolute top-0 left-0 w-full'>
            <div className='bg-white shadow-[-1px_-1px_10px_rgb(0,0,0,0.1)] w-[400px] rounded-lg absolute top-[20%] z-50 right-[35%] flex flex-col items-center mb-10 p-4'>
                {children}
            </div>
        </div>,document.getElementById('modal'))
  )
}

export default Modal