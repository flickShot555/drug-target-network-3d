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
  maxPhase: [],
  dataset: [],
  diseaseClass: [],
  metric: [],
  oncotreeLineage: [],
  phase: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleLegendItem: (state, action) => {
      const { category, value } = action.payload;

      // Toggle the checked state for the specific category and value
      state.legendFilteration[category][value].checked =
        !state.legendFilteration[category][value].checked;

      // Update the state properties based on legendFilteration
      state.phase = Object.keys(state.legendFilteration.phase || {}).filter(
        (key) => state.legendFilteration.phase[key].checked
      );
      console.log("Updated phase array:", state.phase);

      state.diseaseClass = Object.keys(
        state.legendFilteration.diseaseClass || {}
      ).filter((key) => state.legendFilteration.diseaseClass[key].checked);
      console.log("Updated diseaseClass array:", state.diseaseClass);

      state.maxPhase = Object.keys(
        state.legendFilteration.maxPhase || {}
      ).filter((key) => state.legendFilteration.maxPhase[key].checked);
      console.log("Updated maxPhase array:", state.maxPhase);

      state.oncotreeLineage = Object.keys(
        state.legendFilteration.oncotreeLineage || {}
      ).filter((key) => state.legendFilteration.oncotreeLineage[key].checked);
      console.log("Updated oncotreeLineage array:", state.oncotreeLineage);

      state.metric = Object.keys(state.legendFilteration.metric || {}).filter(
        (key) => state.legendFilteration.metric[key].checked
      );
      console.log("Updated metric array:", state.metric);

      state.dataset = Object.keys(state.legendFilteration.dataset || {}).filter(
        (key) => state.legendFilteration.dataset[key].checked
      );
      console.log("Updated dataset array:", state.dataset);

      // Optionally, you could also store specific key-value pairs if needed
      // state.pIC50 = state.legendFilteration.metric?.pIC50?.checked ? 'pIC50' : null;
      // console.log('Updated pIC50:', state.pIC50);
    },

    filterGraphData: (state) => {
      if (state.legendFilteration && state.OriginalData) {
        // Filter nodes based on legendFilteration
        const filteredNodes = state.OriginalData.filter((node) => {
          // Assuming legendFilteration contains information to filter by class

          if (
            state.maxPhase.includes(node.MAX_PHASE) &&
            state.dataset.includes(node.DATASET) &&
            state.diseaseClass.includes(node.Disease_class) &&
            state.metric.includes(node.METRIC) &&
            state.phase.includes(node.Phase)  &&
            state.oncotreeLineage.includes(node.ONCOTREE_LINEAGE)
          ) {
            return node;
          }
        });

        // Slice the filtered nodes to a maximum of 50 items

        // Optionally transform the sliced data
        state.graphData = transformData(filteredNodes);
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
