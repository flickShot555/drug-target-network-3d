// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/data/dataSlice';
import themeReducer from './features/data/themeSlice';
import loaderReducer from './features/loaderSlice';
import countReducer from './features/countSlice';
const store = configureStore({
  reducer: {
    data: dataReducer,
    theme: themeReducer, // Add themeReducer to the store
    loader: loaderReducer, 
    counts: countReducer,
  },
});

export default store;
