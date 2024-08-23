// src/features/data/dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchGraphData } from './dataThunks';
import { transformData } from './utils/transformData';
import { generateLegendFilteration } from './utils/generateLegendFilteration'; 

const initialState = {
  graphData: null,
  legendData: null,
  legendFilteration: null, 
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // You can define synchronous reducers here if needed
    toggleLegendItem: (state, action) => {
      const { category, value } = action.payload;
      state.legendFilteration[category][value].checked = !state.legendFilteration[category][value].checked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        const transformedData = transformData(action.payload);
        state.graphData = transformedData; 
        state.legendData = transformedData; // Modify as needed if legend data is different
        
        // Generate legendFilteration based on the payload
        state.legendFilteration = generateLegendFilteration(action.payload);

        console.log( 'state.legendFilteration' , state.legendFilteration  )
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleLegendItem } = dataSlice.actions;
export default dataSlice.reducer;
