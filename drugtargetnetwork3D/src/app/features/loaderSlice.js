import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false, // Initial loader state
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Set the loading state
    },
  },
});

export const { setLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
