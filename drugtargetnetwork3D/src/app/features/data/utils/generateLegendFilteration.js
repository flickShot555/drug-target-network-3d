export const generateLegendFilteration = (data ) => {
  const legendFilteration = {
    phase: {},
    diseaseClass: {},
    maxPhase: {},
    oncotreeLineage: {},
    metric: {},
    dataset: {},
  };

  const child_colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#17becf",
    "#E75480",
    "#ff9896",
    "#98df8a",
    "#aec7e8",
    "#ffbb78",
    "#FFD700",
    "#00CED1",
  ];

  const getNodeColor_ONCOTREE_LINEAGE = (node) => {
    const category = node.ONCOTREE_LINEAGE;
    if (category === "" || node.class === "Unknown") return "#fe8f01";
    if (category === "Preclinical") return "#f99cc8";
    if (category === "Bone") return child_colors[0];
    if (category === "Skin") return child_colors[1];
    if (category === "Central Nervous System") return child_colors[2];
    if (category === "Lung") return child_colors[3];
    if (category === "Peripheral Nervous System") return child_colors[4];
    if (category === "Soft Tissue") return child_colors[5];
    if (category === "Esophagus") return child_colors[6];
    if (category === "Breast") return child_colors[7];
    if (category === "Head and Neck") return child_colors[8];
    if (category === "Haematopoietic and Lymphoid") return child_colors[9];
    if (category === "Bladder") return child_colors[10];
    if (category === "Kidney") return child_colors[11];
    if (category === "Endometrium") return child_colors[12];
    if (category === "Lymphoid") return child_colors[13];
    if (category === "Adrenal Gland") return child_colors[14];
    if (category === "Bowel") return child_colors[15];
    if (category === "Pancreas") return child_colors[0]; // Reuse color
    if (category === "Large Intestine") return child_colors[1];
    if (category === "Ovary") return child_colors[2];
    if (category === "Stomach") return child_colors[3];
    if (category === "Biliary Tract") return child_colors[4];
    if (category === "Small Intestine") return child_colors[5];
    if (category === "Placenta") return child_colors[6];
    if (category === "Prostate") return child_colors[7];
    if (category === "Testis") return child_colors[8];
    if (category === "Uterus") return child_colors[9];
    if (category === "Vulva") return child_colors[10];
    if (category === "Thyroid") return child_colors[11];
    if (category === "Cervix") return child_colors[12];
    if (category === "Liver") return child_colors[13];
    return "black"; // Default color for unrecognized categories
  };
  const getNodeColor_Disease_class = (node) => {
    const category = node.Disease_class;
    if (category === "Behavior mechanisms") return "steelblue";
    if (category === "Cardiovascular") return "red";
    if (category === "Chemically-Induced disorders") return "orange";
    if (category === "Congenital and neonatal") return "yellow";
    if (category === "Digestive system") return "green";
    if (category === "Endocrine system") return "blue";
    if (category === "Eye") return "indigo";
    if (category === "Female urogenital") return "violet";
    if (category === "Genetic inborn") return "brown";
    if (category === "Hemic and lymphatic") return "pink";
    if (category === "Immune system") return "cyan";
    if (category === "Infections") return "purple";
    if (category === "Male urogenital") return "teal";
    if (category === "Mental disorders") return "gray";
    if (category === "Musculoskeletal") return "lime";
    if (category === "Neoplasm") return "maroon";
    if (category === "Nervous system") return "navy";
    if (category === "Nutritional and Metabolic") return "olive";
    if (category === "Occupational diseases") return "pink";
    if (category === "Otorhinolaryngologic") return "salmon";
    if (category === "Pathological conditions") return "turquoise";
    if (category === "Respiratory tract") return "sienna";
    if (category === "Skin and connective tissue") return "gold";
    if (category === "Stomatognathic") return "plum";
    if (category === "Wounds and injuries") return "coral";
    return "black"; // Default color for unrecognized categories
  };

  const getNodeColor_MAX_PHASE = (node) => {
    const category = node.MAX_PHASE;
    if (category === "Approved") return "#0bc00f";
    if (category === "Phase I") return "#4372c4";
    if (category === "Phase II") return "#fe0000";
    if (category === "Phase III") return "#9B35C8";
    if (category === "" || node.class === "Unknown") return "#fe8f01";
    return "black"; // Default color for unrecognized categories
  };
  function generateDataSet(link) {
    const category = link.DATASET
    if (category === "GDSC1") return "#0bc00f";
    if (category === "GDSC2") return "#4372c4";
    if (category === "CCLE_NP24") return "#fe0000";
    if (category === "NCI-60") return "#9B35C8";
    if (category === "gCSI") return "#fe8f01";
    if (category === "FIMM") return "#f99cc8";

  }
  function generateMatric(link) {
    const category = link.METRIC
    if (category === "pIC50") {
      return "purple"
    }
    else if (category === "pEC50") {
      return "grey"
    } else if (category === "pGI50") {
      return "green"
    }
  }

data.forEach((item) => {
  // Phase
  if (!legendFilteration.phase[item.Phase]) {
    legendFilteration.phase[item.Phase] = {
      color: "black",
      checked: true,
    };
  }

  // Disease Class
  if (!legendFilteration.diseaseClass[item.Disease_class]) {
    legendFilteration.diseaseClass[item.Disease_class] = {
      color: getNodeColor_Disease_class(item),
      checked: true,
    };
  }

  // Max Phase
  if (!legendFilteration.maxPhase[item.MAX_PHASE]) {
    legendFilteration.maxPhase[item.MAX_PHASE] = {
      color: getNodeColor_MAX_PHASE(item),
      checked: true,
    };
  }

  // Oncotree Lineage
  if (!legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE]) {
    legendFilteration.oncotreeLineage[item.ONCOTREE_LINEAGE] = {
      color: getNodeColor_ONCOTREE_LINEAGE(item),
      checked: true,
    };
  }

  // Metric
  if (!legendFilteration.metric[item.METRIC]) {
    legendFilteration.metric[item.METRIC] = {
      color: generateMatric(item),
      checked: true,
    };
  }

  // Dataset
  if (!legendFilteration.dataset[item.DATASET]) {
    legendFilteration.dataset[item.DATASET] = {
      color: generateDataSet(item),
      checked: true,
    };
  }
});

return legendFilteration;
};
