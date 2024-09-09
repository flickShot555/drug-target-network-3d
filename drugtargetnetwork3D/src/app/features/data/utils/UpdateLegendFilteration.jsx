export const UpdateLegendFilteration = (data, currentLegendFilteration) => {
    const legendFilteration = {
      phase: {},
      diseaseClass: {},
      maxPhase: {},
      oncotreeLineage: {},
      metric: {},
      dataset: {},
    };
    // Loop through the new data and update the legend filteration
    data.forEach((item) => {
      // Phase
      if (!legendFilteration.phase[item.Phase]) {
        legendFilteration.phase[item.Phase] = {
         color: currentLegendFilteration?.phase?.[item.Phase]?.color,
          checked: currentLegendFilteration?.phase?.[item.Phase]?.checked ?? true,
        };
      }
  
      // Disease Class
      if (!legendFilteration.diseaseClass[item.Disease_class]) {
        legendFilteration.diseaseClass[item.Disease_class] = {
          color: currentLegendFilteration?.diseaseClass?.[item.Disease_class]?.color , 
          checked: currentLegendFilteration?.diseaseClass?.[item.Disease_class]?.checked ?? true,
        };
      }
  
      // Max Phase
      if (!legendFilteration.maxPhase[item.MAX_PHASE]) {
        legendFilteration.maxPhase[item.MAX_PHASE] = {
          color: currentLegendFilteration?.maxPhase?.[item.MAX_PHASE]?.color , 
          checked: currentLegendFilteration?.maxPhase?.[item.MAX_PHASE]?.checked ?? true,
        };
      }
  
      // Oncotree Lineage
      if (!legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE]) {
        legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE] = {
          color: currentLegendFilteration?.oncotreeLineage?.[item.ONCOTREE_LINEAGE]?.color , 
          checked: currentLegendFilteration?.oncotreeLineage?.[item.ONCOTREE_LINEAGE]?.checked ?? true,
        };
      }
  
      // Metric
      if (!legendFilteration.metric[item.METRIC]) {
        legendFilteration.metric[item.METRIC] = {
          color: currentLegendFilteration?.metric?.[item.METRIC]?.color , 
          checked: currentLegendFilteration?.metric?.[item.METRIC]?.checked ?? true,
        };
      }
  
      // Dataset
      if (!legendFilteration.dataset[item.DATASET]) {
        legendFilteration.dataset[item.DATASET] = {
          color: currentLegendFilteration?.dataset?.[item.DATASET]?.color , 
          checked: currentLegendFilteration?.dataset?.[item.DATASET]?.checked ?? true,
        };
      }
    });
  
    return legendFilteration;
  };
  