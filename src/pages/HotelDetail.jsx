import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

const HotelDetail = () => {
    const params = useParams()
    console.log(params.id)


  return (
    <h1>{params.id}</h1>
  )
}

export default HotelDetail