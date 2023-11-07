import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    testReset: () => initialState,

    testRequested: (state) => {
      state.loading = true;
    },
    testSucceeded: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    testFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { testReset, testRequested, testSucceeded, testFailed } =
  slice.actions;
