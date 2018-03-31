import _ from 'lodash';

import { mockUser } from './mock_data';

export default (router, req, res, mockSession) => {
  if (mockSession) {
    req.user = _.cloneDeep(mockUser);
  }
  router.handle(req, res);
};
