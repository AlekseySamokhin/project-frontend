import { createSlice } from '@reduxjs/toolkit';
import forEach from 'lodash/forEach';

const initialCollection = {
  collection: [],
  params: {
    name: '',
  },
  meta: {},
  loading: false,
  error: null,
};

const initialState = {
  folder: {
    ...initialCollection,
  },

  profile: {
    ...initialCollection,
    tableHeads: [],
    total: 0,
    params: {
      pn: '1',
      ps: '25',
      name: '',
      profile_user: '',
      tag: '',
      status: '',
      main_website: '',
      proxy: '',
    },
    filtersData: {
      profile_user: [],
      tags: [],
      status: [],
      main_websites: [],
      proxies: [],
    },
    fingerprints: {
      device_memory: [],
      hardware_concurrency: [],
      language: [],
      resolution: [],
      timezone: [],
      webgl: [],
    },
  },

  proxy: {
    ...initialCollection,
    total: 0,
    params: {
      pn: '1',
      ps: '25',
      name: '',
      proxy_type: '',
      status: '',
      country: '',
    },
    filtersData: {
      proxy_type: [],
      status: [],
      location: [],
    },

  },

  tags: {
    ...initialCollection,
    total: 0,
  },
  tagsSimple: { ...initialCollection },

  statuses: {
    ...initialCollection,
    tableHeads: [],
    total: 0,
  },
  statusesSimple: { ...initialCollection },
};

const slice = createSlice({
  name: 'browsers',
  initialState,
  reducers: {
    browsersReset: () => initialState,

    browsersFolderRequested: (state) => {
      state.folder.loading = true;
    },
    browsersFolderSucceeded: (state, action) => {
      state.folder.loading = false;
      state.folder.collection = action.payload.folders;
      state.folder.error = null;
    },
    browsersFolderFailed: (state, action) => {
      state.folder.loading = false;
      state.folder.error = action.payload.error;
    },

    proxyRequested: (state, action) => {
      state.proxy.loading = true;
      forEach(action.payload?.filters, (value, key) => {
        state.proxy.params[key] = value;
      });
      if (action.payload?.pn && action.payload?.ps) {
        state.proxy.params.pn = action.payload.pn;
        state.proxy.params.ps = action.payload.ps;
      }
    },
    proxySucceeded: (state, action) => {
      state.proxy.loading = false;
      state.proxy.collection = action.payload.proxies;
      state.proxy.total = action.payload.total;
      state.proxy.error = null;
    },
    proxyFailed: (state, action) => {
      state.proxy.loading = false;
      state.proxy.error = action.payload.error;
    },

    proxyFilterDataRequested: (state) => {
      state.proxy.loading = true;
    },
    proxyFilterDataSucceeded: (state, action) => {
      state.proxy.loading = false;
      forEach(action.payload?.filters, (value, key) => {
        state.proxy.filtersData[key] = value;
      });
      state.proxy.error = null;
    },
    proxyFilterDataFailed: (state, action) => {
      state.proxy.loading = false;
      state.proxy.error = action.payload.error;
    },

    profileRequested: (state, action) => {
      state.profile.loading = true;
      forEach(action.payload?.filters, (value, key) => {
        state.profile.params[key] = value;
      });
      if (action.payload?.pn && action.payload?.ps) {
        state.profile.params.pn = action.payload.pn;
        state.profile.params.ps = action.payload.ps;
      }
    },
    profileSucceeded: (state, action) => {
      state.profile.loading = false;
      action.payload.profiles.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      state.profile.collection = action.payload.profiles
      // state.profile.tableHeads = action.payload.tableHeads;
      state.profile.total = action.payload.total;
      state.profile.error = null;
    },
    profileFailed: (state, action) => {
      state.profile.loading = false;
      state.profile.error = action.payload.error;
    },

    profileFilterDataRequested: (state) => {
      state.profile.loading = true;
    },
    profileFilterDataSucceeded: (state, action) => {
      state.profile.loading = false;
      forEach(action.payload?.filters, (value, key) => {
        state.profile.filtersData[key] = value;
      });
      state.proxy.error = null;
    },
    profileFilterDataFailed: (state, action) => {
      state.proxy.loading = false;
      state.proxy.error = action.payload.error;
    },

    profileStartRequested: (state, action) => {
      state.profile.collection = state.profile.collection.map((element) => {
        if (element.id === action.payload.profileId) {
          element.work = 'loading';
        }
        return element;
      });
    },
    profileStartSucceeded: (state, action) => {
      state.profile.collection = state.profile.collection.map((element) => {
        if (element.id === action.payload.id) {
          element.work = 'start';
        }
        return element;
      });
    },
    profileStartFailed: (state, action) => {
      state.profile.error = action.payload.error;
    },

    profileStopRequested: (state, action) => {
      state.profile.collection = state.profile.collection.map((element) => {
        if (element.id === action.payload.profileId) {
          element.work = 'loading';
        }
        return element;
      });
    },
    profileStopSucceeded: (state, action) => {
      state.profile.collection = state.profile.collection.map((element) => {
        if (element.id === action.payload.id) {
          element.work = 'stop';
        }
        return element;
      });
    },
    profileStopFailed: (state, action) => {
      state.profile.error = action.payload.error;
    },

    profileUpdateRequested: (state, action) => {
      state.profile.loading = true;
    },
    profileUpdateSucceeded: (state, action) => {
      state.profile.loading = false;
      state.profile.collection = action.payload.profiles;
      state.profile.error = null;
    },

    profileUpdateFailed: (state, action) => {
      state.profile.error = action.payload.error;
    },

    profileProxyUpdateRequested: (state, action) => {
      state.profile.collection = state.profile.collection.map((element) => {
        if (element.id === action.payload.profileId) {
          element.proxy.ip = 'loading';
        }
        return element;
      });
    },
    profileProxyUpdateSucceeded: (state, action) => {
      state.profile.collection = state.profile.collection.map((element) => {
        if (element.id === action.payload.id) {
          element.proxy.ip = action.payload.ip;
        }
        return element;
      });
    },
    profileProxyUpdateFailed: (state, action) => {
      state.profile.error = action.payload.error;
    },

    statusesRequested: (state) => {
      state.statuses.loading = true;
    },
    statusesSucceeded: (state, action) => {
      state.statuses.loading = false;
      state.statuses.collection = action.payload.statuses;
      state.statuses.total = action.payload.total;
      state.statuses.error = null;
    },
    statusesFailed: (state, action) => {
      state.statuses.loading = false;
      state.statuses.error = action.payload.error;
    },

    statusesSimpleRequested: (state) => {
      state.statusesSimple.loading = true;
    },
    statusesSimpleSucceeded: (state, action) => {
      state.statusesSimple.loading = false;
      state.statusesSimple.collection = action.payload.statusesSimple;
      state.statusesSimple.error = null;
    },
    statusesSimpleFailed: (state, action) => {
      state.statusesSimple.loading = false;
      state.statusesSimple.error = action.payload.error;
    },

    tagsRequested: (state) => {
      state.tags.loading = true;
    },
    tagsSucceeded: (state, action) => {
      state.tags.loading = false;
      state.tags.collection = action.payload.tags;
      state.tags.total = action.payload.total;
      state.tags.error = null;
    },
    tagsFailed: (state, action) => {
      state.tags.loading = false;
      state.tags.error = action.payload.error;
    },

    tagsSimpleRequested: (state) => {
      state.tagsSimple.loading = true;
    },
    tagsSimpleSucceeded: (state, action) => {
      state.tagsSimple.loading = false;
      state.tagsSimple.collection = action.payload.tagsSimple;
      state.tagsSimple.error = null;
    },
    tagsSimpleFailed: (state, action) => {
      state.tagsSimple.loading = false;
      state.tagsSimple.error = action.payload.error;
    },

    fingerprintsRequested: (state) => {
      state.profile.fingerprints.loading = true;
    },
    fingerprintsSucceeded: (state, action) => {
      state.profile.loading = false;
      forEach(action.payload, (value, key) => {
        state.profile.fingerprints[key] = value;
      });
    },
    fingerprintsFailed: (state, action) => {
      state.profile.fingerprints.loading = false;
      state.profile.fingerprints.error = action.payload.error;
    },
  },
});

export default slice.reducer;
export const {
  reset,
  browsersFolderRequested,
  browsersFolderSucceeded,
  browsersFolderFailed,
  proxyRequested,
  proxySucceeded,
  proxyFailed,
  proxyFilterDataRequested,
  proxyFilterDataSucceeded,
  proxyFilterDataFailed,
  profileRequested,
  profileSucceeded,
  profileFailed,
  profileFilterDataRequested,
  profileFilterDataSucceeded,
  profileFilterDataFailed,
  profileStartRequested,
  profileStartSucceeded,
  profileStartFailed,
  profileStopRequested,
  profileStopSucceeded,
  profileStopFailed,
  profileUpdateRequested,
  profileUpdateSucceeded,
  profileUpdateFailed,
  profileProxyUpdateRequested,
  profileProxyUpdateSucceeded,
  profileProxyUpdateFailed,
  statusesRequested,
  statusesSucceeded,
  statusesFailed,
  statusesSimpleRequested,
  statusesSimpleSucceeded,
  statusesSimpleFailed,
  tagsRequested,
  tagsSucceeded,
  tagsFailed,
  tagsSimpleRequested,
  tagsSimpleSucceeded,
  tagsSimpleFailed,
  fingerprintsRequested,
  fingerprintsSucceeded,
  fingerprintsFailed,
} = slice.actions;
