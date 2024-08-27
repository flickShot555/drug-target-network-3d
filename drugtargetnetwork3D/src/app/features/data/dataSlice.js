import { createSlice } from "@reduxjs/toolkit";
import { fetchGraphData } from "./dataThunks";
import { transformData } from "./utils/transformData";
import { generateLegendFilteration } from "./utils/generateLegendFilteration";

const initialState = {
  OriginalData: null,
  graphData: null,
  legendData: null,
  legendFilteration: null,
  status: "idle",
  error: null,
  maxPhase: null,
  dataset: null,
  diseaseClass: null,
  metric: null,
  pIC50: null,
  phase: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleLegendItem: (state, action) => {
      const { category, value } = action.payload;
      state.legendFilteration[category][value].checked =
        !state.legendFilteration[category][value].checked;
    },
    filterGraphData: (state) => {
      if (state.legendFilteration && state.OriginalData) {
        // Filter nodes based on legendFilteration
        const filteredNodes = state.OriginalData.filter(node => {
         
          // Assuming legendFilteration contains information to filter by class
          return node ;
        });

        // Slice the filtered nodes to a maximum of 50 items
        const slicedNodes = filteredNodes.slice(0, 50);

        // Optionally transform the sliced data
        state.graphData = transformData(slicedNodes); 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.OriginalData = action.payload;
        state.legendFilteration = generateLegendFilteration(action.payload);
        // Transform the full data initially
        state.graphData = transformData(action.payload);
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleLegendItem, filterGraphData } = dataSlice.actions;
export default dataSlice.reducer;
