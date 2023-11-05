import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchListMembers, fetchTeams } from './api';
import {
  teamListMembersFailed,
  teamListMembersRequested,
  teamListMembersSucceeded,
  teamsFailed,
  teamsRequested,
  teamsSucceeded,
} from '../../redux/slices/teams';

function* teamsRequest() {
  try {
    const response = yield call(fetchTeams);

    const teams = response.data.data;

    yield put(teamsSucceeded({ teams }));
  } catch (error) {
    yield put(teamsFailed({ error }));
  }
}

function* teamListMembersRequest(action) {
  try {
    const { teamId } = action.payload;

    const response = yield call(fetchListMembers, { teamId });
    const members = response.data.data;

    yield put(teamListMembersSucceeded({ members }));
  } catch (error) {
    yield put(teamListMembersFailed({ error }));
  }
}

export function* teams() {
  yield takeLatest(teamsRequested, teamsRequest);
  yield takeLatest(teamListMembersRequested, teamListMembersRequest);
}
