// src/features/data/dataThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the async thunk for fetching and transforming data
export const fetchGraphData = createAsyncThunk(
  'data/fetchGraphData',
  async () => {
    const response = await fetch('/sampledata.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const transformedData = transformData(data);
    return transformedData;
  }
);

// Function to transform the fetched data into nodes and links
const transformData = (data) => {
  const nodes = [];
  const links = [];
  const nodeSet = new Set();

  data.forEach((item) => {
    const {
      COMPOUND_NAME,
      CELL_LINE_NAME,
      Disease_name,
      Disease_class,
      Phase,
      DATASET,
      MAX_PHASE,
      ONCOTREE_LINEAGE,
      METRIC,
    } = item;

    // Add unique nodes
    if (!nodeSet.has(COMPOUND_NAME)) {
      nodes.push({
        id: COMPOUND_NAME,
        class: MAX_PHASE,
        type: 'parent_source',
        dataset: DATASET,
        maxPhase: MAX_PHASE,
        metric: METRIC,
        group: 1,
      });
      nodeSet.add(COMPOUND_NAME);
    }

    if (!nodeSet.has(CELL_LINE_NAME)) {
      nodes.push({
        id: CELL_LINE_NAME,
        class: ONCOTREE_LINEAGE,
        type: 'protein_child',
        dataset: DATASET,
        oncotreeLineage: ONCOTREE_LINEAGE,
        metric: METRIC,
        group: 2,
      });
      nodeSet.add(CELL_LINE_NAME);
    }

    if (!nodeSet.has(Disease_name)) {
      nodes.push({
        id: Disease_name,
        class: Disease_class,
        type: 'disease_child',
        diseaseClass: Disease_class,
        phase: Phase,
        metric: METRIC,
        group: 3,
      });
      nodeSet.add(Disease_name);
    }

    // Add links between nodes
    links.push({
      source: COMPOUND_NAME,
      target: CELL_LINE_NAME,
      value: 1,
    });
    links.push({
      source: COMPOUND_NAME,
      target: Disease_name,
      value: 1,
    });
  });

  return { nodes, links };
};

