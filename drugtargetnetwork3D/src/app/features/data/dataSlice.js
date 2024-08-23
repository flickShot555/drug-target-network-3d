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

      // Filter graphData based on updated legendFilteration
      // state.graphData = filterGraphData(state.graphData, state.legendFilteration);
      console.log("check3", action.payload.originalData, value, category);
      action.payload.originalData = action.payload.originalData.filter(
        (node) => node.ONCOTREE_LINEAGE !== "Lung"
      );

      console.log(
        action.payload,
        "here ilegendFilterationlegendFilterationlegendFilterationthere "
      );
      state.maxPhase = state.legendFilteration;

      // Log the updated initial state values
      console.log("Updated State:");
      console.log("Phase:", state.phase);
      console.log("Disease Class:", state.diseaseClass);
      console.log("Max Phase:", state.maxPhase);
      console.log("Oncotree Lineage:", state.oncotreeLineage);
      console.log("Metric:", state.metric);
      console.log("Dataset:", state.dataset);
      console.log("after fitler", action.payload.originalData);
      state.graphData = transformData(action.payload.originalData);
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
