// src/utils/dataTransform.js

export const transformData = (data) => {
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
        VALUE
      } = item;
  
      // Add unique nodes
      if (!nodeSet.has(COMPOUND_NAME)) {
        nodes.push({
          id: COMPOUND_NAME,
          class: MAX_PHASE,
          type: 'parent_source',
          dataset: DATASET,
          maxPhase: MAX_PHASE,
          oncotreeLineage: ONCOTREE_LINEAGE,
          metric: METRIC,
          diseaseClass: Disease_class,
          phase: Phase,
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
          diseaseClass: Disease_class,
          phase: Phase,
          maxPhase: MAX_PHASE,
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
          oncotreeLineage: ONCOTREE_LINEAGE,
          phase: Phase,
          metric: METRIC,
          dataset: DATASET,
          maxPhase: MAX_PHASE,
          group: 3,
        });
        nodeSet.add(Disease_name);
      }
  
      // Add links between nodes
      links.push({
        source: COMPOUND_NAME,
        target: CELL_LINE_NAME,
        value: VALUE,
        dataset:DATASET ,
        matric :METRIC
      });
      links.push({
        source: COMPOUND_NAME,
        target: Disease_name,
        value: VALUE,
        dataset:DATASET ,
        matric :METRIC ,
         
      });
    });
  
    return { nodes, links };
  };
  