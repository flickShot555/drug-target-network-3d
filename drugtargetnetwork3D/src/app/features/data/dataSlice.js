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
  sliderMin : 4.0 ,
  silderMax : 9.0 ,
  CompoundNames : [] , 
  CellineNames : []
  
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

      state.diseaseClass = updateCategoryState(state.legendFilteration,  "diseaseClass" );
     
      console.log("Updated diseaseClass array:", state.diseaseClass);

      state.maxPhase = updateCategoryState(state.legendFilteration, "maxPhase");
    
      console.log("Updated maxPhase array:", state.maxPhase);

      state.oncotreeLineage = updateCategoryState(state.legendFilteration,"oncotreeLineage");
   
      console.log("Updated oncotreeLineage array:", state.oncotreeLineage);

      state.metric = updateCategoryState(state.legendFilteration, "metric");
      console.log("Updated metric array:", state.metric);

      state.dataset = updateCategoryState(state.legendFilteration, "dataset");
      console.log("Updated dataset array:", state.dataset);
    },

    filterGraphData: (state) => {
      if (state.legendFilteration && state.OriginalData) {
        // Filter nodes based on legendFilteration

        const uniqueCompoundNames = Array.from(
          new Set(state.initailData.map((node) => node.COMPOUND_NAME))
        );
        // Save unique values and their count to state
  
        state.sliderData = uniqueCompoundNames.slice(0, state.currentSlider);

           
            state.sliderValue =uniqueCompoundNames.length;

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
    updateLegendColor: (state, action) => {
      const { category, value, color } = action.payload;
      if (state.legendData[category] && state.legendData[category][value]) {
        state.legendData[category][value].color = color;
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
      // state.legendFilteration = generateLegendFilteration(state.OriginalData);
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
    updateDoubleSliderValue: (state, action) => {
      const [newMin, newMax] = action.payload;

      // Update the min and max values if they have changed
      if (newMin !== state.sliderMin) {
        state.sliderMin = newMin;
      }
    
      if (newMax !== state.silderMax) {
        state.silderMax = newMax;
      }
      state.OriginalData = state.initailData.filter((node) => {
        if (node.VALUE > newMin &&  node.VALUE < newMax) {
          return node;
        }
      });
      state.graphData = transformData(state.OriginalData);
    },
    updateSingleFilteration :  (state, action) => {
      const [compounds, celline] = action.payload;

      // Update the min and max values if they have changed
      state.OriginalData = state.initailData.filter((node) => {
        if(compounds.includes(node.COMPOUND_NAME)  ) {
          return node;
        }
      });

      state.CellineNames = Array.from(
        new Set(state.OriginalData.map((node) => node.CELL_LINE_NAME))
      );

      state.OriginalData = state.OriginalData.filter((node) => {
        if(celline.includes(node.CELL_LINE_NAME)  ) {
          return node;
        }
      });
      state.graphData = transformData(state.OriginalData);
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
state.CompoundNames = uniqueCompoundNames
 state.CellineNames = Array.from(
  new Set(state.OriginalData.map((node) => node.CELL_LINE_NAME))
);
        // Save unique values and their count to state
        state.sliderValue = uniqueCompoundNames.length;
        state.currentSlider = uniqueCompoundNames.length
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

export const { toggleLegendItem, filterGraphData,updateSliderValue,updateLegendColor,updateDoubleSliderValue ,updateSingleFilteration } =
  dataSlice.actions;
export default dataSlice.reducer;
