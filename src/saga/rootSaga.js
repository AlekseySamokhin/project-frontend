import { all } from 'redux-saga/effects';
import { browsers } from './browsers';
import { languages } from './languages';
import { teams } from './teams';
import { help } from './help';
import { payment } from './payment';
import { tracking } from './tracking';
import { personality } from './personality';

function* rootSaga() {
  yield all([browsers(), languages(), teams(), help(), payment(), tracking(), personality()]);
}

export default rootSaga;
