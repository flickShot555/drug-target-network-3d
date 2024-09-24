// countSlice.js
import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'counts',
  initialState: {
    diseaseChildCount: 0,
    proteinChildCount: 0,
    parentSourceCount: 0,
  },
  reducers: {
    setNodeCounts: (state, action) => {
      // Assuming action.payload is an object with counts
      state.diseaseChildCount = action.payload.diseaseChildCount ?? state.diseaseChildCount;
      state.proteinChildCount = action.payload.proteinChildCount ?? state.proteinChildCount;
      state.parentSourceCount = action.payload.parentSourceCount ?? state.parentSourceCount;
    },
  },
});

// Export actions
export const { setNodeCounts } = countSlice.actions;

// Selectors to access each count separately
export const selectDiseaseChildCount = (state) => state.counts.diseaseChildCount;
export const selectProteinChildCount = (state) => state.counts.proteinChildCount;
export const selectParentSourceCount = (state) => state.counts.parentSourceCount;

// Export reducer
export default countSlice.reducer;
