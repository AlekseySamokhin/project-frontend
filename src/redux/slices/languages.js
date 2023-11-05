import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collection: [],
  current: {},
  meta: {},
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    languageReset: () => initialState,

    languageRequested: (state) => {
      state.loading = true;
    },
    languageSucceeded: (state, action) => {
      state.loading = false;
      state.collection = action.payload.collection;
      state.current = action.payload.current;
    },
    languageFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default slice.reducer;
export const { languageReset, languageRequested, languageSucceeded, languageFailed } = slice.actions;
