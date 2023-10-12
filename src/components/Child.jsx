import React from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Child = ({removeHandler,child,addHandler,array,handleChange,selectedOption,options}) => {
  
  const{t} = useTranslation();

  return (
    <div className='flex items-center gap-5'>
            <div className='w-full'>
              <div className='flex items-center gap-5 justify-between'>
                <div>{t('children',{count : child})}</div>
                <div className='flex items-center gap-6 border border-b px-4 py-2 border-gray-400 rounded-md'>
                  <button onClick={removeHandler} className={child === 0? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100 rounded-full "}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {(!!child || child === 0) && <h1>{child}</h1>}
                  <button onClick={addHandler} className={child === 10 ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100 rounded-full"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='flex items w-full justify-between flex-wrap'>
                {!!array && array.map((a,i)=>(
                    <div key={i} className='mt-3'>
                        <div className='relative border border-gray-400 rounded-lg px-1 py-1 w-[130px] flex items-center'>
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

Child.propTypes = {
  removeHandler : PropTypes.func.isRequired,
  addHandler : PropTypes.func.isRequired,
  child : PropTypes.number.isRequired,
  array : PropTypes.array.isRequired,
  handleChange : PropTypes.func.isRequired,
  selectedOption : PropTypes.array.isRequired,
  options : PropTypes.array.isRequired
}

export default Child;