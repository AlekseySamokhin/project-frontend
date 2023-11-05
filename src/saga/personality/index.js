import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPersonality } from './api';
import { personalityFailed, personalityRequested, personalitySucceeded } from '../../redux/slices/personality';

function* personalityRequest() {
  try {
    const response = yield call(fetchPersonality);

    yield put(personalitySucceeded(response.data));
  } catch (error) {
    yield put(personalityFailed({ error }));
  }
}

export function* personality() {
  yield takeLatest(personalityRequested, personalityRequest);
}
