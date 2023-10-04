import React from 'react'
import { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import PropTypes from 'prop-types';

  const Autocomplete = ({setCoordinates} ) => {

    const [address, setAddress] = useState("");

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress)
    }
    
    const handleSelect = async newAddress => {
        const results = await geocodeByAddress(newAddress);
        const {lat,lng}= await getLatLng(results[0])
        setAddress(newAddress)
        setCoordinates({latitude:lat,longitude:lng})
      }

    const removex = () => {
        setAddress("")
    }

   return (
    <div>
        <PlacesAutocomplete
          value={address}
          onChange={handleAddressChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div key={suggestions.description} className='group'>
              <div className="relative w-[300px] h-[60px] p-3 border border-gray-400 flex items-center rounded-lg group-hover:border-blue-500">
                <div className="absolute left-1 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  {!!address && 
                  <button onClick={removex} className='absolute left-[260px] pointer-events-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>}
                </div>
                <input 
                  {...getInputProps({
                    placeholder: 'Enter your destination',
                    className: 'w-full h-[40px] pl-11 flex px-8 items-center flex rounded-md mt-0 text-black placeholder-black',
                  })}
                />
              </div>
              
              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                  ? 'bg-gray-100 cursor-pointer p-2'
                  : 'bg-white cursor-pointer p-2';
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
              
            </div>
          )}
        </PlacesAutocomplete>
    </div>
  )
}

Autocomplete.propTypes = {
    setCoordinates: PropTypes.func.isRequired,
};

export default Autocomplete