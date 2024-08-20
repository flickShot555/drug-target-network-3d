// src/features/data/dataSelectors.js

export const selectGraphData = (state) => state.data.graphData;

export const selectLegendData = (state) => state.data.legendData;

export const selectDataStatus = (state) => state.data.status;

export const selectDataError = (state) => state.data.error;
