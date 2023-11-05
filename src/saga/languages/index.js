import { call, put, takeLatest } from 'redux-saga/effects';
import { languageFailed, languageRequested, languageSucceeded } from '../../redux/slices/languages';
import { fetchLanguage } from './api';

function* languageRequest(action) {
  try {
    const languageId = action.payload?.languageId;

    const response = yield call(fetchLanguage, { languageId });

    const { collection, current } = response.data;

    yield put(languageSucceeded({ collection, current }));
  } catch (error) {
    yield put(languageFailed({ error }));
  }
}

export function* languages() {
  yield takeLatest(languageRequested, languageRequest);
}
