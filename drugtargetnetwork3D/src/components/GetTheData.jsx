import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';
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

  // API endpoint selection:
  // - If you set VITE_API_URL in client/.env (e.g. http://localhost:5000),
  //   it will call `${VITE_API_URL}/api/drugresponse/search`.
  // - Otherwise it will call the relative path '/api/drugresponse/search',
  //   which works if you configured Vite proxy to forward /api to your server.
  const API_ENDPOINT = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/drugresponse/search`
    : '/api/drugresponse/search';

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
    dispatch(setLoading(true)); // Start loading

    try {
      // Prepare the object
      const dataObject = {
        count_increment: selectedFilters.count_increment,
        Chembl_id1: selectedFilters.Chembl_id1 || [],
        MaxPhase1: selectedFilters.MaxPhase1 || [],
        oncotree_change1: selectedFilters.oncotree_change1 || [],
        DataPlatform: selectedFilters.DataPlatform || [],
        pic50: selectedFilters.pic50 || "",
        disease_class1: selectedFilters.disease_class1 || [],
        compound_class1: selectedFilters.compound_class1 || []
      };

      // Log for debugging
      console.log("📦 Sending dataObject:", dataObject);

      // Convert to FormData so PHP's $_POST works (and backend that expects arrays like key[])
      const formData = new FormData();
      Object.entries(dataObject).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Keep original behavior: append arrays as key[]
          value.forEach(v => formData.append(`${key}[]`, v));
        } else {
          formData.append(key, value);
        }
      });

      // Send as form data (Axios sets Content-Type automatically for FormData)
      const response = await axios.post(API_ENDPOINT, formData);

      console.log("✅ Response data from API:", response.data);

      // Now response.data should be the array your reducer expects
      message.success("Data fetched successfully!");
      dispatch(setInitialData(response.data));
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      message.error("Failed to fetch data.");
    } finally {
      dispatch(setLoading(false)); // Stop loading
    }
  };

  return (
    <CustomButton onClick={handleButtonClick} disabled={isLoading}> {/* Disable button during loading */}
      {isLoading ? after : before}
    </CustomButton>
  );
};

export default GetTheData;
