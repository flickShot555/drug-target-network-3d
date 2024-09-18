/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import {
    selectlegendfilteration, 
  } from "../app/features/data/dataSelectors";
const useColorShape = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const legendData_filters = useSelector(selectlegendfilteration);
  let getNodeColor = (node) => {
    const category = node.class;

    if (legendData_filters.maxPhase && legendData_filters.maxPhase[category]) {
      return legendData_filters.maxPhase[category].color;
    }
    if (
      legendData_filters.diseaseClass &&
      legendData_filters.diseaseClass[category]
    ) {
      return legendData_filters.diseaseClass[category].color;
    }
    if (
      legendData_filters.oncotreeLineage &&
      legendData_filters.oncotreeLineage[category]
    ) {
      return legendData_filters.oncotreeLineage[category].color;
    }
    if (legendData_filters.metric && legendData_filters.metric[category]) {
      return legendData_filters.metric[category].color;
    }
    if (legendData_filters.dataset && legendData_filters.dataset[category]) {
      return legendData_filters.dataset[category].color;
    }
    if (legendData_filters.phase && legendData_filters.phase[category]) {
      return legendData_filters.phase[category].color;
    }

    return isDarkMode ? "#ffffff" : "#000000"; // Default color based on theme
  };

  let getNodeShape = (node) => {
    const color = getNodeColor(node, legendData_filters);

    let geometry;
    if (node.type === "parent_source") {
      // eslint-disable-next-line no-undef
      geometry = new THREE.BoxGeometry(10, 10, 20);
    } else if (node.type === "protein_child") {
      geometry = new THREE.SphereGeometry(5);
    } else if (node.type === "disease_child") {
      geometry = new THREE.ConeGeometry(7, 12, 3);
    } else {
      geometry = new THREE.SphereGeometry(5); // Default shape
    }

    const material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
  };

  let generateDataSet = (link) => {
    const category = link.dataset;
    if (legendData_filters.dataset && legendData_filters.dataset[category]) {
      return legendData_filters.dataset[category].color;
    }
  };

  return { getNodeColor, getNodeShape, generateDataSet };
};
export default useColorShape;
