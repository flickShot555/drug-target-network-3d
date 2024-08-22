// src/features/data/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchGraphData } from './dataThunks';
import { transformData } from './utils/transformData';
const initialState = {
  graphData: null,
  legendData: null,
  legendFilteration :null , 
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // You can define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.graphData = transformData(action.payload); 
        state.legendData = transformData(action.payload); // Modify as needed if legend data is different
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
