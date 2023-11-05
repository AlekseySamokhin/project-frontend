import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  open: false,
};

const slice = createSlice({
  name: 'collapseSidebar',
  initialState,
  reducers: {
    openSidebar(state) {
      state.open = true;
    },
    closeSidebar(state) {
      state.open = false;
    },
    toggleSidebar(state) {
      state.open = !state.open;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { openSidebar, closeSidebar, toggleSidebar } = slice.actions;
