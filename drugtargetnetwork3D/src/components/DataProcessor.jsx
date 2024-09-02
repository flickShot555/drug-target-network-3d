import React, { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import { fetchGraphData } from "../app/features/data/dataThunks";

import { filterGraphData } from "./../app/features/data/dataSlice";
import {
  selectGraphData,
  selectDataStatus,
  selectDataError,
  selectlegendfilteration, 
  selectoriginalData
} from "../app/features/data/dataSelectors";
import ForceNetworkGraph from "./ForceNetworkGraph";
import Legend from "./Legend";
import CustomButton from "./CustomButton";
import DoubleSlider from "./doubleSIilder";
import SliderComponent from "./SliderSource";
const DataProcessor = () => {
  const dispatch = useDispatch();
  const [clonedGraphData, setClonedGraphData] = useState(null);
  const graphData = useSelector(selectGraphData);
  
  const originalData = useSelector(selectoriginalData);
  const dataStatus = useSelector(selectDataStatus);
  const dataError = useSelector(selectDataError);
  const legendData_filters =   useSelector(selectlegendfilteration);

console.log("original "  ,originalData )  ; 
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

  // Function to determine node color based on its category
  const getNodeColor = (node) => {
    const category = node.class;
    if (category === "Approved") return "#0bc00f";
    if (category === "Phase I") return "#4372c4";
    if (category === "Phase II") return "#fe0000";
    if (category === "Phase III") return "#9B35C8";
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
    if (node.class === "Behavior mechanisms") return "steelblue";
    if (node.class === "Cardiovascular") return "red";
    if (node.class === "Chemically-Induced disorders") return "orange";
    if (node.class === "Congenital and neonatal") return "yellow";
    if (node.class === "Digestive system") return "green";
    if (node.class === "Endocrine system") return "blue";
    if (node.class === "Eye") return "indigo";
    if (node.class === "Female urogenital") return "violet";
    if (node.class === "Genetic inborn") return "brown";
    if (node.class === "Hemic and lymphatic") return "pink";
    if (node.class === "Immune system") return "cyan";
    if (node.class === "Infections") return "purple";
    if (node.class === "Male urogenital") return "teal";
    if (node.class === "Mental disorders") return "gray";
    if (node.class === "Musculoskeletal") return "lime";
    if (node.class === "Neoplasm") return "maroon";
    if (node.class === "Nervous system") return "navy";
    if (node.class === "Nutritional and Metabolic") return "olive";
    if (node.class === "Occupational diseases") return "pink";
    if (node.class === "Otorhinolaryngologic") return "salmon";
    if (node.class === "Pathological conditions") return "turquoise";
    if (node.class === "Respiratory tract") return "sienna";
    if (node.class === "Skin and connective tissue") return "gold";
    if (node.class === "Stomatognathic") return "plum";
    if (node.class === "Wounds and injuries") return "coral";
    return "black"; // Default color for unrecognized categories
  };

  // Function to return a custom 3D object for each node based on its type
  const getNodeShape = (node) => {
    const color = getNodeColor(node);

    let geometry;
    if (node.type === "parent_source") {
      geometry = new THREE.BoxGeometry(10, 10, 20); 
    } else if (node.type === "protein_child") {
      geometry =  new THREE.SphereGeometry(5); 
    } else if (node.type === "disease_child") {
      geometry = new THREE.ConeGeometry(7, 12, 3); 
    } else {
      geometry = new THREE.SphereGeometry(5); // Default shape
    }

    const material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
  };
  
  
  function generateDataSet(link ) {
   const    category = link.dataset
    if (category === "GDSC1") return "#0bc00f";
    if (category === "GDSC2") return "#4372c4";
    if (category === "CCLE_NP24") return "#fe0000";
    if (category === "NCI-60") return "#9B35C8";
    if (category === "gCSI" || node.class === "Unknown") return "#fe8f01";
    if (category === "FIMM") return "#f99cc8";

  }

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchGraphData());
    }
    if (graphData) {
      const clonedData = {
        nodes: graphData.nodes.map((node) => ({
          ...node,
          color: getNodeColor(node), // Add color property
        })),
        links: graphData.links.map((link) => ({ ...link , color : generateDataSet(link) })),
       
      };
      setClonedGraphData(clonedData);
    } else {
      setClonedGraphData(null);
    }
  }, [dataStatus, graphData ,dispatch]);

  if (dataStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (dataStatus === "failed") {
    return <div>Error: {dataError}</div>;
  }

  // Clone graphData and add color property to nodes


  // Clone graphData and add color property to nodes
  // Dispatch the filterGraphData action on button click
  const handleApplyClick = () => {
    dispatch(filterGraphData());
  };


    return (
      <Row justify="center" gutter={[16, 16]} style={{ padding: "20px", marginTop: "40px" }}>
        {/* Legend Disease */}
        <Col xs={24} sm={12} md={6}>
          <Card title="Legend" bordered>
           
            <div style={{ height: "600px", overflowY: "auto" }}>
              
            <CustomButton onClick={handleApplyClick}>Apply</CustomButton> {/* Attach the handler */}
          
           <SliderComponent/>
          
           <DoubleSlider/>
          
              {legendData_filters ? (
                <Legend legendData={legendData_filters}/>
              ) : null}
            </div>
          </Card>
        </Col>
    
        {/* Force Network Graph */}
        <Col xs={24} sm={24} md={18}>
          <Card title="3D Force Network Graph" bordered>
          
            {clonedGraphData ? <ForceNetworkGraph graphData={clonedGraphData} getNodeShape={getNodeShape} /> : null}
          </Card>
        </Col>
      </Row>
    );
  };

export default DataProcessor;
