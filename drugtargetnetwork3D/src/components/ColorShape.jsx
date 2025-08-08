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
  
    //code update by Abbas Khan
    //goal is to increase the size of node by a factor of 10

    let scaleFactor = 3;
    let geometry;
    if (node.type === "parent_source") {
      geometry = new THREE.BoxGeometry(10*scaleFactor, 10*scaleFactor, 20*scaleFactor);
    } else if (node.type === "protein_child") {
      geometry = new THREE.SphereGeometry(5*scaleFactor); // Sphere for protein_child
    } else if (node.type === "disease_child") {
      geometry = new THREE.ConeGeometry(7*scaleFactor, 12*scaleFactor, 3*scaleFactor);
    } else {
      geometry = new THREE.SphereGeometry(5*scaleFactor); // Default shape
    }
  
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
  
    // Create the text sprite for the node ID
    const textSprite = createTextSprite(node.id);
    // Adjust Y position for the sphere geometry
    textSprite.position.set(0, -7, -10); // Slightly lower than the bottom of the sphere
    // mesh.add(textSprite); // Add the text sprite as a child of the mesh
  
    return mesh;
  };
  
  // Helper function to create a text sprite
  function createTextSprite(message) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 30;
    
    // Set canvas size based on text
    context.font = `${fontSize}px Arial`;
    const textWidth = context.measureText(message).width;
    canvas.width = textWidth;
    canvas.height = fontSize * 1.2; // Height for font size
  
    // Draw text on canvas
    context.font = `${fontSize}px Arial`;
    context.fillStyle = isDarkMode ? "white" : "black"; // Set the text color
    context.fillText(message, 0, fontSize); // Draw the text
  
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true; // Ensure the texture updates
  
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(spriteMaterial);
    
    // Set the scale of the sprite based on text length
    sprite.scale.set(textWidth / 10, fontSize / 10, 1); // Scale the sprite for visibility
  
    return sprite;
  }
  
  

  let generateDataSet = (link) => {
    const category = link.dataset;
    if (legendData_filters.dataset && legendData_filters.dataset[category]) {
      return legendData_filters.dataset[category].color;
    }
  };

  return { getNodeColor, getNodeShape, generateDataSet };
};
export default useColorShape;
