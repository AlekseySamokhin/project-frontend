import { call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchChangelog, fetchFolderTracking, fetchTracking } from './api';

import {
  trackingChangelogFailed,
  trackingChangelogRequested,
  trackingChangelogSucceeded,
  trackingFailed,
  trackingFolderFailed,
  trackingFolderRequested,
  trackingFolderSucceeded,
  trackingRequested,
  trackingSucceeded,
} from '../../redux/slices/tracking';


function* trackingFolderTrackingRequest() {
  try {
    const getParams = (state) => state.tracking.folder;
    const params = yield select(getParams);

    const response = yield call(fetchFolderTracking, { params });
    const collection = response.data;

    yield put(trackingFolderSucceeded({ collection }));
  } catch (error) {
    yield put(trackingFolderFailed({ error }));
  }
}

function* trackingRequest(action) {
  try {
    const folderId = action.payload;
    const response = yield call(fetchTracking, { folderId });

    const collection = response.data;
    yield put(trackingSucceeded({ collection }));
  } catch (error) {
    yield put(trackingFailed({ error }));
  }
}

function* trackingChangelogRequest() {
  try {
    const response = yield call(fetchChangelog);

    const collection = response.data;
    yield put(trackingChangelogSucceeded({ collection }));
  } catch (error) {
    yield put(trackingChangelogFailed({ error }));
  }
}



export function* tracking() {
  yield takeLatest(trackingFolderRequested, trackingFolderTrackingRequest);
  yield takeLatest(trackingRequested, trackingRequest);
  yield takeLatest(trackingChangelogRequested, trackingChangelogRequest);
}
