import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  browsersFolderFailed,
  browsersFolderRequested,
  browsersFolderSucceeded,
  fingerprintsFailed,
  fingerprintsRequested,
  fingerprintsSucceeded,
  profileFailed,
  profileFilterDataFailed,
  profileFilterDataRequested,
  profileFilterDataSucceeded,
  profileProxyUpdateFailed,
  profileProxyUpdateRequested,
  profileProxyUpdateSucceeded,
  profileRequested,
  profileStartFailed,
  profileStartRequested,
  profileStartSucceeded,
  profileStopFailed,
  profileStopRequested,
  profileStopSucceeded,
  profileSucceeded,
  profileUpdateRequested,
  proxyFailed,
  proxyFilterDataFailed,
  proxyFilterDataRequested,
  proxyFilterDataSucceeded,
  proxyRequested,
  proxySucceeded,
  statusesFailed,
  statusesRequested,
  statusesSimpleFailed,
  statusesSimpleRequested,
  statusesSimpleSucceeded,
  statusesSucceeded,
  tagsFailed,
  tagsRequested,
  tagsSimpleFailed,
  tagsSimpleRequested,
  tagsSimpleSucceeded,
  tagsSucceeded,
} from '../../redux/slices/browsers';
import {
  fetchFingerprints,
  fetchFolder,
  fetchProfile,
  fetchProfileFilterData,
  fetchProfileProxyUpdate,
  fetchProfileStart,
  fetchProfileStop,
  fetchProxy,
  fetchProxyFilterData,
  fetchStatuses,
  fetchStatusesSimple,
  fetchTags,
  fetchTagsSimple,
  updateProfile,
} from './api';

function* browsersFolderRequest() {
  try {
    const response = yield call(fetchFolder);
    const folders = response.data.data;

    yield put(browsersFolderSucceeded({ folders }));
  } catch (error) {
    yield put(browsersFolderFailed({ error }));
  }
}

function* proxyRequest(action) {
  try {
    const { folderId } = action.payload;

    const getParams = (state) => state.browsers.proxy.params;
    const params = yield select(getParams);

    const response = yield call(fetchProxy, { folderId, params });

    if (response.data.error) {
      yield put(proxyFailed({ error: response.data.error }));
    } else {
      const { items: proxies, total } = response.data.data;

      yield put(proxySucceeded({ proxies, total }));
    }




  } catch (error) {
    yield put(proxyFailed({ error }));
  }
}

function* proxyFilterDataRequest(action) {
  try {
    const { folderId } = action.payload;

    const response = yield call(fetchProxyFilterData, { folderId });
    const filters = response.data.data;

    yield put(proxyFilterDataSucceeded({ filters }));
  } catch (error) {
    yield put(proxyFilterDataFailed({ error }));
  }
}

function* profileRequest(action) {
  try {
    const { folderId } = action.payload;

    const getParams = (state) => state.browsers.profile.params;
    const params = yield select(getParams);

    const response = yield call(fetchProfile, { folderId, params });

    if (response.data.error) {
      yield put(profileFailed({ error: response.data.error }));
    } else {
      const { items: profiles, total } = response.data.data;

      yield put(profileSucceeded({ profiles, total }));
    }

  } catch (error) {
    yield put(profileFailed({ error }));
  }
}

function* profileFilterDataRequest(action) {
  try {
    const { folderId } = action.payload;

    const response = yield call(fetchProfileFilterData, { folderId });
    const filters = response.data.data;

    yield put(profileFilterDataSucceeded({ filters }));
  } catch (error) {
    yield put(profileFilterDataFailed({ error }));
  }
}

function* profileUpdateRequest(action) {
  try {
    const { id, folder_id, data } = action.payload;

    console.log(data, 'action.payload');

    // const getParams = (state) => state.browsers.profile;
    // const params = yield select(getParams);

    const response = yield call(updateProfile, { folder_id, id, data });
    const profiles = response.data.data;

    yield put(profileSucceeded({ profiles }));
  } catch (error) {
    yield put(profileFailed({ error }));
  }
}

function* profileProxyUpdateRequest(action) {
  try {
    const { profileId } = action.payload;

    const response = yield call(fetchProfileProxyUpdate, { profileId });

    const { id, ip } = response.data.data;

    yield put(profileProxyUpdateSucceeded({ id, ip }));
  } catch (error) {
    yield put(profileProxyUpdateFailed({ error }));
  }
}

function* profileStartRequest(action) {
  try {
    const { profileId } = action.payload;

    const response = yield call(fetchProfileStart, { profileId });

    const id = response.data.data;

    yield delay(2000);
    yield put(profileStartSucceeded({ id }));
  } catch (error) {
    yield put(profileStartFailed({ error }));
  }
}

function* profileStopRequest(action) {
  try {
    const { profileId } = action.payload;

    const response = yield call(fetchProfileStop, { profileId });
    const id = response.data.data;

    yield delay(2000);
    yield put(profileStopSucceeded({ id }));
  } catch (error) {
    yield put(profileStopFailed({ error }));
  }
}

function* statusesRequest(action) {
  try {
    const { folderId } = action.payload;

    const response = yield call(fetchStatuses, { folderId });

    if (response.data.error) {
      yield put(statusesFailed({ error: response.data.error }));
    } else {
      // const { items: statuses, total } = response.data.data;
      const statuses = response.data.data;

      yield put(statusesSucceeded({ statuses }));
    }

  } catch (error) {
    yield put(statusesFailed({ error }));
  }
}

function* statusesSimpleRequest(action) {
  try {
    const { folderId } = action.payload;

    const response = yield call(fetchStatusesSimple, { folderId });
    const statusesSimple = response.data.data;

    yield put(statusesSimpleSucceeded({ statusesSimple }));
  } catch (error) {
    yield put(statusesSimpleFailed({ error }));
  }
}

function* tagsRequest(action) {
  try {
    const { folderId } = action.payload;

    const response = yield call(fetchTags, { folderId });


    if (response.data.error) {
      yield put(tagsFailed({ error: response.data.error }));
    } else {
      // const { items: tags, total } = response.data.data;
      const tags = response.data.data;

      yield put(tagsSucceeded({ tags }));
    }

  } catch (error) {
    yield put(tagsFailed({ error }));
  }
}

function* tagsSimpleRequest(action) {
  try {
    const { folderId } = action.payload;

    const response = yield call(fetchTagsSimple, { folderId });
    const tagsSimple = response.data.data;

    yield put(tagsSimpleSucceeded({ tagsSimple }));
  } catch (error) {
    yield put(tagsSimpleFailed({ error }));
  }
}

function* fingerprintsRequest(action) {
  try {
    const response = yield call(fetchFingerprints, action.payload);
    const collection = response.data.data;

    yield put(fingerprintsSucceeded(collection));
  } catch (error) {
    yield put(fingerprintsFailed({ error }));
  }
}

export function* browsers() {
  yield takeLatest(proxyRequested, proxyRequest);
  yield takeLatest(proxyFilterDataRequested, proxyFilterDataRequest);
  yield takeLatest(profileRequested, profileRequest);
  yield takeLatest(profileFilterDataRequested, profileFilterDataRequest);
  yield takeLatest(profileUpdateRequested, profileUpdateRequest);
  yield takeLatest(browsersFolderRequested, browsersFolderRequest);
  yield takeEvery(profileStartRequested, profileStartRequest);
  yield takeEvery(profileStopRequested, profileStopRequest);
  yield takeLatest(profileProxyUpdateRequested, profileProxyUpdateRequest);
  yield takeLatest(statusesRequested, statusesRequest);
  yield takeLatest(statusesSimpleRequested, statusesSimpleRequest);
  yield takeLatest(tagsRequested, tagsRequest);
  yield takeLatest(tagsSimpleRequested, tagsSimpleRequest);
  yield takeLatest(fingerprintsRequested, fingerprintsRequest);
}
