// src/features/data/dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchGraphData } from './dataThunks';
import { transformData } from './utils/transformData';

const initialState = {
  graphData: null,
  legendData: null,
  legendFilteration: null, 
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const generateLegendFilteration = (data) => {
  const legendFilteration = {
    phase: {},
    diseaseClass: {},
    maxPhase: {},
    oncotreeLineage: {},
    metric: {},
    dataset: {}
  };

  data.forEach(item => {
    // Phase
    if (!legendFilteration.phase[item.Phase]) {
      legendFilteration.phase[item.Phase] = {
        color: 'black',
        checked: true,
      };
    }

    // Disease Class
    if (!legendFilteration.diseaseClass[item.Disease_class]) {
      legendFilteration.diseaseClass[item.Disease_class] = {
        color: 'steelblue',
        checked: true,
      };
    }

    // Max Phase
    if (!legendFilteration.maxPhase[item.MAX_PHASE]) {
      legendFilteration.maxPhase[item.MAX_PHASE] = {
        color: '#0bc00f',
        checked: true,
      };
    }

    // Oncotree Lineage
    if (!legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE]) {
      legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE] = {
        color: '#1f77b4',
        checked: true,
      };
    }

    // Metric
    if (!legendFilteration.metric[item.METRIC]) {
      legendFilteration.metric[item.METRIC] = {
        color: 'black',
        checked: true,
      };
    }

    // Dataset
    if (!legendFilteration.dataset[item.DATASET]) {
      legendFilteration.dataset[item.DATASET] = {
        color: 'black',
        checked: true,
      };
    }
  });

  return legendFilteration;
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

export default dataSlice.reducer;
