import { createSlice } from '@reduxjs/toolkit';

const initialCollection = {
  collection: [],
  notDeleted: [],
  params: {
    page: 1,
    per: 5,
  },
  meta: {},
  loading: true,
  error: null,
};

const initialState = {
  ...initialCollection,
  members: {
    ...initialCollection,
  },
};

const slice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    teamsReset: () => initialState,

    teamsRequested: (state) => {
      state.loading = true;
    },
    teamsSucceeded: (state, action) => {
      state.loading = false;
      state.collection = action.payload.teams;
      state.notDeletedAndRoleAdmin = action.payload.teams.filter((element) => element.role === 'Admin');
    },
    teamsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    teamListMembersRequested: (state) => {
      state.members.loading = true;
    },
    teamListMembersSucceeded: (state, action) => {
      console.log(action.payload.members)
      state.members.loading = false;
      state.members.collection = action.payload.members;
      state.members.error = null;
    },
    teamListMembersFailed: (state, action) => {
      state.members.loading = false;
      state.members.error = action.payload.error;
    },
  },
});

export default slice.reducer;
export const {
  teamsReset,
  teamsRequested,
  teamsSucceeded,
  teamsFailed,
  teamListMembersRequested,
  teamListMembersSucceeded,
  teamListMembersFailed,
} = slice.actions;
