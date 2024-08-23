export const getNodeShape = (node) => {
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
