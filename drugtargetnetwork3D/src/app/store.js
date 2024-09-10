// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/data/dataSlice';
import themeReducer from './features/data/themeSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    theme: themeReducer, // Add themeReducer to the store

  },
});

export default store;
