// src/features/data/dataSelectors.js

export const selectGraphData = (state) => state.data.graphData;

export const selectoriginalData = (state) => state.data.OriginalData;

export const selectDataStatus = (state) => state.data.status;

export const selectDataError = (state) => state.data.error;

export const selectlegendfilteration = (state) => state.data.legendFilteration;
