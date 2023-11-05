import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchHelp } from './api';
import { helpFailed, helpRequested, helpSucceeded } from '../../redux/slices/help';

function* helpRequest() {
  try {
    const response = yield call(fetchHelp);
    const collection = response.data;

    yield put(helpSucceeded({ collection }));
  } catch (error) {
    yield put(helpFailed({ error }));
  }
}

export function* help() {
  yield takeLatest(helpRequested, helpRequest);
}
