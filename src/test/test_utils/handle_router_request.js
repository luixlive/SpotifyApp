import _ from 'lodash';

import { mockUser } from './mock_data';

export default (router, req, res, mockSession) => {
  if (mockSession) {
    req.user = _.cloneDeep(mockUser);
    req.user.expires = Date.now() + (60 * 60 * 1000);
  }
  router.handle(req, res);
};
