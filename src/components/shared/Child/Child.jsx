import React from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import formHandler from '../../../hooks/useForm';
import useApp from '../../../hooks/useApp';
import childHandlers from '../../../hooks/useChildren';

const Child = () => {
  const{selectedOption,child,array,options} = useApp();
  console.log(options)
  const {addChildrenHandler,removeChildrenHandler} = childHandlers();
  const {handleChange} = formHandler();
  
  const{t} = useTranslation();
  const plus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>;
  
  const minus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>

  return (
    <div className='flex items-center gap-5'>
            <div className='w-full'>
              <div className='flex items-center gap-5 justify-between'>
                <div className="cursor-default">{t('children',{count : child})}</div>
                <div className='flex items-center justify-around border border-b w-[125px] p-2 border-gray-400 rounded-md'>
                  <button onClick={removeChildrenHandler} className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${child === 0? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100 rounded-full"}`}>
                    {plus}
                  </button>
                  {(!!child || child === 0) && <h1 className=' w-[30px] h-[30px] flex items-center justify-center'>{child}</h1>}
                  <button onClick={addChildrenHandler} className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${child === 10 ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100 rounded-full"}`}>
                    {minus}
                  </button>
                </div>
              </div>
              <div className='flex items w-full justify-between flex-wrap z-50'>
                {!!array && array.map((a,i)=>(
                    <div key={i} className='mt-3'>
                        <div className='relative border border-gray-400 rounded-lg px-1 py-1 w-[130px] z-50 flex items-center'>
                          <select onChange={(event) => handleChange(event, i)}  value={selectedOption[i] || ""}  id="ageSelect" className='w-[85%] px-2 truncate text-sm appearance-none focus:outline-none  text-gray-900 rounded-lg py-2'>
                            <option value="" >{t('age.ageNeeded')}</option>
                              {!!options && options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                          </select>
                          <div className='absolute top-4 right-0 pointer-events-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-3 h-3 stroke-black mr-3">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                              </svg>
                          </div>
                        </div>
                      </div>
                    ))}    
              </div>
            </div>
          </div>
  )
}

// Child.propTypes = {
//   removeHandler : PropTypes.func.isRequired,
//   addHandler : PropTypes.func.isRequired,
//   child : PropTypes.number.isRequired,
//   array : PropTypes.array.isRequired,
//   handleChange : PropTypes.func.isRequired,
//   selectedOption : PropTypes.array.isRequired,
//   options : PropTypes.array.isRequired
// }

export default Child;