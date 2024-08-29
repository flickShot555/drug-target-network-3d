import { createSlice } from "@reduxjs/toolkit";
import { fetchGraphData } from "./dataThunks";
import { transformData } from "./utils/transformData";
import { generateLegendFilteration } from "./utils/generateLegendFilteration";

const initialState = {
  initailData: null,
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
  sliderData: [],
  sliderValue: 0,
  currentSlider: 0,
};

function updateCategoryState(legendFilteration, category) {
  return Object.keys(legendFilteration[category] || {}).filter(
    (key) => legendFilteration[category][key].checked
  );
}

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
      state.phase = updateCategoryState(state.legendFilteration, "phase");
      console.log("Updated phase array:", state.phase);

      state.diseaseClass = updateCategoryState(
        state.legendFilteration,
        "diseaseClass"
      );
      console.log("Updated diseaseClass array:", state.diseaseClass);

      state.maxPhase = updateCategoryState(state.legendFilteration, "maxPhase");
      console.log("Updated maxPhase array:", state.maxPhase);

      state.oncotreeLineage = updateCategoryState(
        state.legendFilteration,
        "oncotreeLineage"
      );
      console.log("Updated oncotreeLineage array:", state.oncotreeLineage);

      state.metric = updateCategoryState(state.legendFilteration, "metric");
      console.log("Updated metric array:", state.metric);

      state.dataset = updateCategoryState(state.legendFilteration, "dataset");
      console.log("Updated dataset array:", state.dataset);
    },

    filterGraphData: (state) => {
      if (state.legendFilteration && state.OriginalData) {
        // Filter nodes based on legendFilteration
        const filteredNodes = state.OriginalData.filter((node) => {
          // Assuming legendFilteration contains information to filter by class

          if (
            state.maxPhase.includes(node.MAX_PHASE) &&
            state.dataset.includes(node.DATASET) &&
            state.metric.includes(node.METRIC) &&
            state.oncotreeLineage.includes(node.ONCOTREE_LINEAGE) &&
            state.phase.includes(node.Phase) &&
            state.diseaseClass.includes(node.Disease_class)
          ) {
            return node;
          }
        });

        // Slice the filtered nodes to a maximum of 50 items

        // Optionally transform the sliced data
        state.graphData = transformData(filteredNodes);
      }
    },
    updateSliderValue: (state, action) => {
      state.currentSlider = action.payload;

      const uniqueCompoundNames = Array.from(
        new Set(state.initailData.map((node) => node.COMPOUND_NAME))
      );
      // Save unique values and their count to state

      state.sliderData = uniqueCompoundNames.slice(0, state.currentSlider);
      state.OriginalData = state.initailData.filter((node) => {
        if (state.sliderData.includes(node.COMPOUND_NAME)) {
          return node;
        }
      });
       // Toggle the checked state for the specific category and value
    
       

      state.legendFilteration = generateLegendFilteration(state.OriginalData);
      state.phase = updateCategoryState(state.legendFilteration, "phase");
      state.diseaseClass = updateCategoryState(
        state.legendFilteration,
        "diseaseClass"
      );
      state.maxPhase = updateCategoryState(state.legendFilteration, "maxPhase");
      state.oncotreeLineage = updateCategoryState(
        state.legendFilteration,
        "oncotreeLineage"
      );
      state.metric = updateCategoryState(state.legendFilteration, "metric");
      state.dataset = updateCategoryState(state.legendFilteration, "dataset");
      console.log("Updated maxPhase array:", state.maxPhase);
      // Transform the full data initially
      const filteredNodes = state.OriginalData.filter((node) => {
        // Assuming legendFilteration contains information to filter by class

        if (
          state.maxPhase.includes(node.MAX_PHASE) &&
          state.dataset.includes(node.DATASET) &&
          state.metric.includes(node.METRIC) &&
          state.oncotreeLineage.includes(node.ONCOTREE_LINEAGE) &&
          state.phase.includes(node.Phase) &&
          state.diseaseClass.includes(node.Disease_class)
        ) {
          return node;
        }
      });

      state.graphData = transformData(filteredNodes);

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
        state.initailData = action.payload;
        const uniqueCompoundNames = Array.from(
          new Set(state.OriginalData.map((node) => node.COMPOUND_NAME))
        );

        // Save unique values and their count to state
        state.sliderValue = uniqueCompoundNames.length;
        // state.sliderData = uniqueCompoundNames;

        state.sliderData = uniqueCompoundNames.slice(0, 6);

        state.OriginalData = state.OriginalData.filter((node) => {
          if (state.sliderData.includes(node.COMPOUND_NAME)) {
            return node;
          }
        });
        console.log("state.sliderData", state.sliderData, state.sliderValue);
        state.legendFilteration = generateLegendFilteration(state.OriginalData);
        state.phase = updateCategoryState(state.legendFilteration, "phase");
        state.diseaseClass = updateCategoryState(
          state.legendFilteration,
          "diseaseClass"
        );
        state.maxPhase = updateCategoryState(
          state.legendFilteration,
          "maxPhase"
        );
        state.oncotreeLineage = updateCategoryState(
          state.legendFilteration,
          "oncotreeLineage"
        );
        state.metric = updateCategoryState(state.legendFilteration, "metric");
        state.dataset = updateCategoryState(state.legendFilteration, "dataset");
        console.log("Updated maxPhase array:", state.maxPhase);
        // Transform the full data initially
        state.graphData = transformData(state.OriginalData);
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleLegendItem, filterGraphData, updateSliderValue } =
  dataSlice.actions;
export default dataSlice.reducer;
