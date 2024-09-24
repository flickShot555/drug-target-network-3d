import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {  message } from 'antd';
import CustomButton from './CustomButton'; // Assuming CustomButton is a styled button
import { setInitialData } from './../app/features/data/dataSlice';
import { setLoading } from './../app/features/loaderSlice'; // Import loader actions

const GetTheData = ({ type, before, after, count, setCount }) => {
  const dispatch = useDispatch();

  // Get the global loading state from Redux
  const isLoading = useSelector((state) => state.loader.isLoading);

  // Define the selected filters from the Redux state
  const selectedFilters = useSelector((state) => ({
    oncotree_change1: state.data.selectedTissues,
    MaxPhase1: state.data.selectedMaxClinical,
    pic50: state.data.selectedpic50,
    Chembl_id1: state.data.selectedCellLine,
    DataPlatform: state.data.selectedDataPlatform,
    disease_class1: state.data.selectedDiseaseClass,
    compound_class1: state.data.selectedCompoundClass,
    count_increment: count, // Use dynamic count here
  }));

  // Handle increment or decrement of count based on the type
  const handleButtonClick = () => {
    if (type === 'addmoredata') {
      setCount((prevCount) => prevCount + 1);
    } else if (type === 'lessdata') {
      setCount((prevCount) => Math.max(prevCount - 1, 1)); // Prevent going below 1
    }
    handleApplyFilter(); // Call apply filter after count change
  };

  // Function to apply the filters and make the API call
  const handleApplyFilter = async () => {
    dispatch(setLoading(true)); // Start global loading

    try {
      // Sending filters and count in the POST request
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
      message.success('Data fetched successfully!');
      dispatch(setInitialData(response.data)); // Assuming response.data contains the data you want
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data.');
    } finally {
      dispatch(setLoading(false)); // Stop global loading
    }
  };

  return (
      <CustomButton onClick={handleButtonClick} disabled={isLoading}> {/* Disable button during loading */}
        {isLoading ? after : before}
      </CustomButton>

  );
};

export default GetTheData;
