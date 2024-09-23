/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';
import { Spin, message } from 'antd';
import CustomButton from './CustomButton'; // Assuming CustomButton is a styled button
import { setInitialData } from "./../app/features/data/dataSlice";
const GetTheData = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch(); // Use Redux dispatch
  // Assuming your data values are stored in Redux state
  const selectedFilters = useSelector((state) => ({
    Chembl_id1: state.data.selectedTissues,         // Example: Change based on your actual Redux state structure
    MaxPhase1: state.data.selectedMaxClinical,
    pic50: state.data.selectedpic50,
    oncotree_change1: state.data.selectedCellLine,
    DataPlatform: state.data.selectedDataPlatform,
    disease_class1: state.data.selectedDiseaseClass,
    compound_class1: state.data.selectedCompoundClass,
    count_increment: 1 // Set initial count_increment value
  }));
   
  
  const handleApplyFilter = async () => {
    setLoading(true); // Start loading
    console.log("selectedFilters" , selectedFilters )
    try {
        // Sending filters and arrays in the POST request
        const response = await axios.post('http://localhost/React_php/getData.php', {
          Chembl_id1: selectedFilters.Chembl_id1,
          MaxPhase1: selectedFilters.MaxPhase1,
          pic50: selectedFilters.pic50,
          oncotree_change1: selectedFilters.oncotree_change1,
          DataPlatform: selectedFilters.DataPlatform,       
          disease_class1: selectedFilters.disease_class1,
          compound_class1: selectedFilters.compound_class1,
          count_increment: selectedFilters.count_increment,
        });
  
        // Handle the response from the backend (PHP)
        console.log('Respobackendnse from :', response.data);
      
      
        message.success('Data fetched successfully!');
        setLoading(false)
        dispatch(setInitialData(response.data)); // Assuming response.data contains the data you want

      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch data.');
      }
    };

  return (
    <Spin spinning={loading} tip="Loading..."> {/* Wrap with Spin */}
      <CustomButton onClick={handleApplyFilter} disabled={loading}> {/* Disable button during loading */}
        {loading ? 'Applying Filter...' : 'Apply Filter'}
      </CustomButton>
    </Spin>
  );  
};

export default GetTheData;
