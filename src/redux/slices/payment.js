import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collection: [],
  meta: {},
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    paymentReset: () => initialState,

    paymentRequested: (state) => {
      state.loading = true;
    },
    paymentSucceeded: (state, action) => {
      state.loading = false;
      state.collection = action.payload.collection;
      state.error = null;
    },
    paymentFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default slice.reducer;
export const { paymentReset, paymentRequested, paymentSucceeded, paymentFailed } = slice.actions;
