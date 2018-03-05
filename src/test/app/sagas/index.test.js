import { fork } from 'redux-saga/effects';

import root, { sagas } from './../../../app/sagas/index';

describe('App Sagas - Root', () => {
  it('forks every saga watchers', () => {
    const rootGenerator = root();
    expect(rootGenerator.next().value).toEqual(sagas.map(saga => fork(saga)));
    expect(rootGenerator.next().done).toBeTruthy();
  });
});
