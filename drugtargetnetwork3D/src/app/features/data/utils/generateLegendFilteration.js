export const generateLegendFilteration = (data) => {
    const legendFilteration = {
      phase: {},
      diseaseClass: {},
      maxPhase: {},
      oncotreeLineage: {},
      metric: {},
      dataset: {}
    };
  
    data.forEach(item => {
      // Phase
      if (!legendFilteration.phase[item.Phase]) {
        legendFilteration.phase[item.Phase] = {
          color: 'black',
          checked: true,
        };
      }
  
      // Disease Class
      if (!legendFilteration.diseaseClass[item.Disease_class]) {
        legendFilteration.diseaseClass[item.Disease_class] = {
          color: 'steelblue',
          checked: true,
        };
      }
  
      // Max Phase
      if (!legendFilteration.maxPhase[item.MAX_PHASE]) {
        legendFilteration.maxPhase[item.MAX_PHASE] = {
          color: '#0bc00f',
          checked: true,
        };
      }
  
      // Oncotree Lineage
      if (!legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE]) {
        legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE] = {
          color: '#1f77b4',
          checked: true,
        };
      }
  
      // Metric
      if (!legendFilteration.metric[item.METRIC]) {
        legendFilteration.metric[item.METRIC] = {
          color: 'black',
          checked: true,
        };
      }
  
      // Dataset
      if (!legendFilteration.dataset[item.DATASET]) {
        legendFilteration.dataset[item.DATASET] = {
          color: 'black',
          checked: true,
        };
      }
    });
  
    return legendFilteration;
  };