import { createSlice } from '@reduxjs/toolkit';

const initialCollection = {
  collection: [],
  meta: {},
  loading: false,
  error: null,
};

const initialState = {
  folder: { ...initialCollection },

  trackingList: { ...initialCollection },

  changelog: { ...initialCollection },
};

const slice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    trackingReset: () => initialState,

    trackingFolderRequested: (state) => {
      state.folder.loading = true;
    },
    trackingFolderSucceeded: (state, action) => {
      state.folder.loading = false;
      state.folder.collection = action.payload.collection;
      state.folder.error = null;
    },
    trackingFolderFailed: (state, action) => {
      state.folder.loading = false;
      state.folder.error = action.payload.error;
    },

    trackingRequested: (state) => {
      state.trackingList.loading = true;
    },
    trackingSucceeded: (state, action) => {
      state.trackingList.loading = false;
      state.trackingList.collection = action.payload.collection;
      state.trackingList.error = null;
    },
    trackingFailed: (state, action) => {
      state.trackingList.loading = false;
      state.trackingList.error = action.payload.error;
    },

    trackingChangelogRequested: (state) => {
      state.changelog.loading = true;
    },
    trackingChangelogSucceeded: (state, action) => {
      state.changelog.loading = false;
      state.changelog.collection = action.payload.collection;
      state.changelog.error = null;
    },
    trackingChangelogFailed: (state, action) => {
      state.changelog.loading = false;
      state.changelog.error = action.payload.error;
    },
  },
});

export default slice.reducer;
export const {
  trackingReset,
  trackingRequested,
  trackingSucceeded,
  trackingFailed,
  trackingChangelogRequested,
  trackingChangelogSucceeded,
  trackingChangelogFailed,
  trackingFolderRequested,
  trackingFolderSucceeded,
  trackingFolderFailed,
} = slice.actions;
