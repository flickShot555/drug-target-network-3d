import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNodeCounts } from "./../app/features/countSlice";

const NodeCountUpdater = ({ graphData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if graphData and its nodes are defined
    if (graphData && graphData.nodes) {
      // Initialize sets to store unique IDs for each type
      const uniqueIds = {
        diseaseChild: new Set(),
        proteinChild: new Set(),
        parentSource: new Set(),
      };

      // Iterate through nodes to fill the sets
      graphData.nodes.forEach((node) => {
        // Check the type and add the ID to the respective Set
        if (node.type === "disease_child") {
          uniqueIds.diseaseChild.add(node.id);
        } else if (node.type === "protein_child") {
          uniqueIds.proteinChild.add(node.id);
        } else if (node.type === "parent_source") {
          uniqueIds.parentSource.add(node.id);
        }
      });

      // Dispatch the unique counts to Redux
      dispatch(setNodeCounts({
        diseaseChildCount: uniqueIds.diseaseChild.size,
        proteinChildCount: uniqueIds.proteinChild.size,
        parentSourceCount: uniqueIds.parentSource.size,
      }));
    }

  }, [graphData, dispatch]);

  return null; // This component does not render anything
};

export default NodeCountUpdater;
