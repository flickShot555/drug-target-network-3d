export const generateLegendFilteration = (data) => {
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
        color: "steelblue",
        checked: true,
      };
    }

    // Max Phase
    if (!legendFilteration.maxPhase[item.MAX_PHASE]) {
      legendFilteration.maxPhase[item.MAX_PHASE] = {
        color: "#0bc00f",
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
        color: "black",
        checked: true,
      };
    }

    // Dataset
    if (!legendFilteration.dataset[item.DATASET]) {
      legendFilteration.dataset[item.DATASET] = {
        color: "black",
        checked: true,
      };
    }
  });

  return legendFilteration;
};
