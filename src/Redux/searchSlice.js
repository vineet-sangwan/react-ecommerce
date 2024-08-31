// src/redux/slices/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchQuery(state, action) {
      return action.payload; // Update the search query in the state
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
