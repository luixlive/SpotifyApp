import { fork } from 'redux-saga/effects';

import userStatsSaga from './user_stats';
import userSaga from './user';

const sagas = [userSaga, userStatsSaga];

export default function* root() {
  yield sagas.map(saga => fork(saga));
}
