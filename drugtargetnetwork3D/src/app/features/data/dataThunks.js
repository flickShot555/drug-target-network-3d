// src/features/data/dataThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { transformData } from './utils/transformData'; // Adjust the import path as needed

// Define the async thunk for fetching and transforming data
export const fetchGraphData = createAsyncThunk(
  'data/fetchGraphData',
  async () => {
    const response = await fetch('/sampledata.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    let data = await response.json();
    
    // Use the imported transformData function
    const transformedData = transformData(data);
    
    return data;
  }
);
