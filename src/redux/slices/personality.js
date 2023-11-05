import { createSlice } from '@reduxjs/toolkit';

const initialCollection = {
  data: {
    teams: {},
    folders: {},
  },
  loading: false,
  error: null,
};

const initialState = {
  ...initialCollection,
};

const slice = createSlice({
  name: 'personality',
  initialState,
  reducers: {
    personalityRequested: (state) => {
      state.loading = true;
    },
    personalitySucceeded: (state, action) => {
      state.loading = false;

      action.payload.data.teams && action.payload.data.teams.map((item) => {
        item.position += '';
      });
      action.payload.data.folders && action.payload.data.folders.map((item) => {
        item.position += '';
      });
      state.data.teams = action.payload.data.teams;
      state.data.folders = action.payload.data.folders;
    },
    personalityFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default slice.reducer;
export const { personalityRequested, personalitySucceeded, personalityFailed } = slice.actions;
