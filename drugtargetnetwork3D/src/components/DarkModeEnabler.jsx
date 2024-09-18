/* eslint-disable no-unused-vars */
import React from 'react'
import {Switch } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './../app/features/data/themeSlice';
const DarkModeEnabler = () => {
 const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get the current theme
  
 const dispatch = useDispatch();  
  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the action to toggle the theme
  };

  return (
 
       <Switch
              checkedChildren="Dark"
              unCheckedChildren="Light"
              checked={isDarkMode} // Bind the switch to the current theme mode
              onChange={handleThemeToggle} // Call the toggle handler when switched
            />

   
  )
}

export default DarkModeEnabler
