import { createSlice } from "@reduxjs/toolkit";
import { fetchGraphData } from "./dataThunks";
import { transformData } from "./utils/transformData";
import { generateLegendFilteration } from "./utils/generateLegendFilteration";

const initialState = {
  OriginalData: null,
  graphData: null,
  legendData: null,
  legendFilteration: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
  },
  

  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.OriginalData = action.payload;

        // Generate legendFilteration based on the payload
        state.legendFilteration = generateLegendFilteration(action.payload);
        // Filter the graph data based on the legendFilteration
        // Transform the filtered data
        state.graphData = transformData(action.payload);
        console.log(
          "check",
          state.OriginalData,
          "state.legendFilteration",
          state.legendFilteration
        );
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleLegendItem } = dataSlice.actions;
export default dataSlice.reducer;
