import express, { query } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

const PORT = 8000;
dotenv.config();
const app = express();

app.use(cors());

app.get('/datas', async (req, res) => {
    console.log('Request received:', req.query)
  
    const room = req.query.room_number;
    const lng = req.query.longitude;
    const lat = req.query.latitude;
    const currency = req.query.filter_by_currency;
    const locale = req.query.locale;
    const order = req.query.order_by;
    const checkoutdate = req.query.checkout_date;
    const checkindate = req.query.checkin_date;
    const adult = req.query.adults_number;
  
    const params = {
      filter_by_currency: currency,
      locale: locale,
      room_number: room,
      checkin_date: checkindate,
      checkout_date: checkoutdate,
      longitude: lng,
      adults_number: adult,
      latitude: lat,
      order_by: order,
      units: 'metric',
      categories_filter_ids: 'class::2,class::4,free_cancellation::1',
      include_adjacency: 'true',
      page_number: '0',
    };
  
    // // Combine conditions in a single block
    if (req.query.children_number && req.query.children_ages) {
      params.children_number = req.query.children_number;
      params.children_ages = req.query.children_ages;
    }
  
    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
      params: params,
      headers: {
        'X-RapidAPI-Key': process.env.VITE_REACT_APP_BOOKING_API_KEY,
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      },
    };
  
    try{
    const response = await axios.request(options);
    res.json(response.data)
    }
      
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/locations', async (req, res) => {
    console.log('Request received:', req.query)
    const city = req.query.name;
  
    
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        params: {
          name: city,
          locale: 'en-gb'
        },
        headers: {
        'X-RapidAPI-Key': process.env.VITE_REACT_APP_BOOKING_API_KEY,
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      },
    };
    try{
    const response = await axios.request(options);
    res.json(response.data)
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/filters', async (req, res) => {
    console.log('Request received:', req.query)
    const type = req.query.dest_type;
    const id = req.query.dest_id;
    const rooms = req.query.room_number;
    const currencies = req.query.filter_by_currency;
    const locales = req.query.locale;
    const orders = req.query.order_by;
    const checkoutdates = req.query.checkout_date;
    const checkindates = req.query.checkin_date;
    const adults = req.query.adults_number;
    
    const params = {
        adults_number: adults,
        filter_by_currency: currencies,
        checkin_date: checkindates,
        dest_id: id,
        dest_type: type,
        checkout_date: checkoutdates,
        units: 'metric',
        room_number: rooms,
        order_by: orders,
        locale: locales,
        // categories_filter_ids: 'class::2,class::4,free_cancellation::1',
        page_number: '0',
        // include_adjacency: 'true'
      };
    
      // // Combine conditions in a single block
      if (req.query.children_number && req.query.children_ages) {
        params.children_number = req.query.children_number;
        params.children_ages = req.query.children_ages;
      }
    
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-filters',
        params: params,
        headers: {
        'X-RapidAPI-Key': process.env.VITE_REACT_APP_BOOKING_API_KEY,
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      },
    };
    try{
    const response = await axios.request(options);
    res.json(response.data)
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.listen(8000,()=> console.log(`server is running on PORT ${PORT}`));