import { createSlice } from "@reduxjs/toolkit";
import { fetchGraphData } from "./dataThunks";
import { transformData } from "./utils/transformData";
import { generateLegendFilteration } from "./utils/generateLegendFilteration";
import { UpdateLegendFilteration } from "./utils/UpdateLegendFilteration";
const initialState = {
  initailData: null,
  OriginalData: null,
  graphData: null,
  legendData: null,
  legendFilteration: null,
  FirstlegendFilteration: null,
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
  sliderMin: 4.0,
  silderMax: 9.0,
  CompoundNames: [],
  CellineNames: [],
  version: null,
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
    updateVersion: (state, action) => {
      state.version = action.payload;
    },


    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleLegendItem: (state, action) => {
      const { category, value } = action.payload;

      // Toggle the checked state for the specific category and value
      state.legendFilteration[category][value].checked =
        !state.legendFilteration[category][value].checked;

      // Toggle the checked state for the specific category and value
      state.FirstlegendFilteration[category][value].checked =
        !state.FirstlegendFilteration[category][value].checked;

      // Update the state properties based on legendFilteration
      state.phase = updateCategoryState(state.legendFilteration, "phase");
      console.log("Updated phase array:", state.phase);

      state.diseaseClass = updateCategoryState(state.legendFilteration, "diseaseClass");

      console.log("Updated diseaseClass array:", state.diseaseClass);

      state.maxPhase = updateCategoryState(state.legendFilteration, "maxPhase");

      console.log("Updated maxPhase array:", state.maxPhase);

      state.oncotreeLineage = updateCategoryState(state.legendFilteration, "oncotreeLineage");

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
        state.sliderValue = uniqueCompoundNames.length;
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
      }

    },
    updateLegendColor: (state, action) => {
      const { category, value, color } = action.payload;
      if (state.legendFilteration[ category] && state.legendFilteration[ category][value]) {
        state.legendFilteration[ category][value].color = color;
        state.FirstlegendFilteration[ category][value].color = color;
    
      }
      if (state.FirstlegendFilteration[ category] && state.FirstlegendFilteration[ category][value]) {
        state.FirstlegendFilteration[ category][value].color = color;
      }
      
    },

    updateSliderValue: (state, action) => {
      state.currentSlider = action.payload;

      const uniqueCompoundNames = Array.from(
        new Set(state.initailData.map((node) => node.COMPOUND_NAME))
      );


      //Save unique values and their count to state
      state.sliderData = uniqueCompoundNames.slice(0, state.currentSlider);
      state.OriginalData = state.initailData.filter((node) => {
        if (state.sliderData.includes(node.COMPOUND_NAME)) {
          return node;
        }
      });
      // filter the double silder data there 
      state.OriginalData = state.OriginalData.filter((node) => {
        if (node.VALUE > state.sliderMin && node.VALUE < state.silderMax) {
          return node;
        }
      });

      // FILTERATION OF THE SINGLE FILERATON 
      state.CompoundNames = Array.from(
        new Set(state.OriginalData.map((node) => node.COMPOUND_NAME))
      );
      state.CellineNames = Array.from(
        new Set(state.OriginalData.map((node) => node.CELL_LINE_NAME))
      );
    //  LEGEND DATA FILERATION TEHRE 
      state.legendFilteration = UpdateLegendFilteration(state.OriginalData, state.FirstlegendFilteration)
      state.phase = updateCategoryState(state.legendFilteration, "phase");
      state.diseaseClass = updateCategoryState(state.legendFilteration, "diseaseClass");
      state.maxPhase = updateCategoryState(state.legendFilteration, "maxPhase");
      state.oncotreeLineage = updateCategoryState(state.legendFilteration, "oncotreeLineage");
      state.metric = updateCategoryState(state.legendFilteration, "metric");
      state.dataset = updateCategoryState(state.legendFilteration, "dataset");
         // Assuming legendFilteration contains information to filter by class
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
        if (node.VALUE > newMin && node.VALUE < newMax) {
          return node;
        }
      });

      // FITLERATION OF THE SINGLE SLIDER THERE 
      const uniqueCompoundNames = Array.from(
        new Set(state.initailData.map((node) => node.COMPOUND_NAME))
      );
      state.sliderData = uniqueCompoundNames.slice(0, state.currentSlider);
      state.OriginalData = state.OriginalData.filter((node) => {
        if (state.sliderData.includes(node.COMPOUND_NAME)) {
          return node;
        }
      });
      // FILTERATION OF THE SINGLE node FILERATON 
      state.CompoundNames = Array.from(
        new Set(state.OriginalData.map((node) => node.COMPOUND_NAME))
      );
      state.CellineNames = Array.from(
        new Set(state.OriginalData.map((node) => node.CELL_LINE_NAME))
      );

   //  LEGEND DATA FILERATION TEHRE 
   state.legendFilteration = UpdateLegendFilteration(state.OriginalData, state.FirstlegendFilteration)
   state.phase = updateCategoryState(state.legendFilteration, "phase");
   state.diseaseClass = updateCategoryState(state.legendFilteration, "diseaseClass");
   state.maxPhase = updateCategoryState(state.legendFilteration, "maxPhase");
   state.oncotreeLineage = updateCategoryState(state.legendFilteration, "oncotreeLineage");
   state.metric = updateCategoryState(state.legendFilteration, "metric");
   state.dataset = updateCategoryState(state.legendFilteration, "dataset");
      // Assuming legendFilteration contains information to filter by class
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
    updateSingleFilteration: (state, action) => {
      const [compounds, celline] = action.payload;

      // Update the min and max values if they have changed
      state.OriginalData = state.initailData.filter((node) => {
        if (compounds.includes(node.COMPOUND_NAME)) {
          return node;
        }
      });

      state.CellineNames = Array.from(
        new Set(state.OriginalData.map((node) => node.CELL_LINE_NAME))
      );

      state.OriginalData = state.OriginalData.filter((node) => {
        if (celline.includes(node.CELL_LINE_NAME)) {
          return node;
        }
      });
   //  LEGEND DATA FILERATION TEHRE 
   state.legendFilteration = UpdateLegendFilteration(state.OriginalData, state.FirstlegendFilteration)
   state.phase = updateCategoryState(state.legendFilteration, "phase");
   state.diseaseClass = updateCategoryState(state.legendFilteration, "diseaseClass");
   state.maxPhase = updateCategoryState(state.legendFilteration, "maxPhase");
   state.oncotreeLineage = updateCategoryState(state.legendFilteration, "oncotreeLineage");
   state.metric = updateCategoryState(state.legendFilteration, "metric");
   state.dataset = updateCategoryState(state.legendFilteration, "dataset");
      // Assuming legendFilteration contains information to filter by class
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
        state.FirstlegendFilteration = generateLegendFilteration(state.OriginalData);

        console.log(state.legendFilteration, "https://www.youtube.com/watch?v=l3nvibMlFEM")

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

export const { updateVersion ,toggleLegendItem, filterGraphData, updateSliderValue, updateLegendColor, updateDoubleSliderValue, updateSingleFilteration ,toggleTheme  } =
  dataSlice.actions;
export default dataSlice.reducer;
