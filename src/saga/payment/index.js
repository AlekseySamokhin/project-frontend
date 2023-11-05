import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPayment } from './api';
import { paymentFailed, paymentRequested, paymentSucceeded } from '../../redux/slices/payment';

function* paymentRequest() {
  try {
    const response = yield call(fetchPayment);

    const collection = response.data;

    yield put(paymentSucceeded({ collection }));
  } catch (error) {
    yield put(paymentFailed({ error }));
  }
}

export function* payment() {
  yield takeLatest(paymentRequested, paymentRequest);
}
