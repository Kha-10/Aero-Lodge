import React from 'react'

const FilterSection = ({ filterObj, clickState, clickHandler }) => {

    const svg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4 text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>;

    return (
        filterObj && (
            <div className='w-full bg-white px-4 py-3 rounded-lg border border-gray-200 '>
              <div className='font-semibold text-sm'>{filterObj.title}</div>
              <div className='mt-2'>
                {filterObj.categories && filterObj.categories.map((filter, i) => (
                  <div key={i} className='group w-full flex items-center gap-2 cursor-pointer mt-3' onClick={() => clickHandler(i, filterObj)}>
                    <div className='w-full flex items-center gap-2 '>
                      <div className='w-[10%] flex items-center justify-center'>
                        <div className='border border-gray-300 group-hover:border-blue-400 bg-white rounded w-5 h-5 flex items-center justify-center'>
                          {clickState[i] && svg}
                        </div>
                      </div>
                      <p className='text-[13px] group-hover:text-blue-400'>{filter.name}</p>
                    </div>
                    <p className='text-[13px] group-hover:text-blue-400'>{filter.count}</p>
                  </div>
                ))}
              </div>
            </div>
          )
    );
  };

export default FilterSection