import _ from 'lodash';

import { mockUser } from './../../test_utils/mock_data';
import updateSession from './../../../server/util/update_session';

describe('Server Util - Update Session', () => {
  let user;
  let session;
  let req;
  beforeEach(() => {
    user = _.cloneDeep(mockUser);
    session = JSON.stringify(user);
    req = { session: { passport: { user: session } } };
  });

  it('updates express session', () => {
    const newName = 'newName';
    const change = { profile: { displayName: newName } };
    user.profile.displayName = newName;
    const expectedSession = JSON.stringify(user);
    updateSession(req, change);
    expect(req.session.passport.user).toEqual(expectedSession);
  });

  it('doesn update if new session is invalid', () => {
    const newName = 123;
    const change = { profile: { displayName: newName } };
    const expectedSession = JSON.stringify(user);
    updateSession(req, change);
    expect(req.session.passport.user).toEqual(expectedSession);
  });
});
