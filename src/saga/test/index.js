import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTest } from './api';
import {
  testRequested,
  testSucceeded,
  testFailed,
} from '../../redux/slices/test';

function* workerTest(action) {
  try {
    const response = yield call(fetchTest, action.payload);

    const testMessage = response.data;

    yield put(testSucceeded(testMessage));
  } catch (error) {
    yield put(testFailed(error.message));
  }
}

export function* watcherTest() {
  yield takeLatest(testRequested, workerTest);
}
