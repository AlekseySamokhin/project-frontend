import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collection: [],
  meta: {},
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    helpReset: () => initialState,

    helpRequested: (state) => {
      state.loading = true;
    },
    helpSucceeded: (state, action) => {
      state.loading = false;
      state.collection = action.payload.collection;
      state.error = null;
    },
    helpFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default slice.reducer;
export const { helpReset, helpRequested, helpSucceeded, helpFailed } = slice.actions;
