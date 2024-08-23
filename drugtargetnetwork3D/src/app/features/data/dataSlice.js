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
        
        // Generate legendFilteration based on the payload
        state.legendFilteration = generateLegendFilteration(action.payload);

        // Filter the graph data based on the legendFilteration
        const filteredData = action.payload.filter(item => {
          return state.legendFilteration.phase[item.Phase]?.checked &&
                 state.legendFilteration.diseaseClass[item.Disease_class]?.checked &&
                 state.legendFilteration.maxPhase[item.MAX_PHASE]?.checked &&
                 state.legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE]?.checked &&
                 state.legendFilteration.metric[item.METRIC]?.checked &&
                 state.legendFilteration.dataset[item.DATASET]?.checked;
        });

        // Transform the filtered data
        state.graphData = transformData(filteredData);
          })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleLegendItem } = dataSlice.actions;
export default dataSlice.reducer;
