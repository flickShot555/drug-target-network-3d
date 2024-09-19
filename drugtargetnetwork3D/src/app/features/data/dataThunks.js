// src/features/data/dataThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGraphData = createAsyncThunk(
  'data/fetchGraphData',
  async () => {
    // Log the full URL
  

    // Get the URL parameters (query string)
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data'); // Retrieve the value of the 'data' parameter
    
    // Set the file name based on the 'data' query parameter
    let jsonFile = '/newdata.json'; // Default JSON file
    if (dataParam === '2') {
      jsonFile = '/sampledata2.json';
    } else if (dataParam === '3') {
      jsonFile = '/sampledata_c.json';
    }

    console.log(window.location.href ,"dataParam" ,dataParam) ;
    
    // Fetch the appropriate JSON data based on the URL parameter
    const response = await fetch(jsonFile);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    let data = await response.json();

    // Return the fetched and processed data
    return data;
  }
);
