import _ from 'lodash';
import Joi from 'joi';

import { mockUser } from './../../test_utils/mock_data';
import { userSchema } from './../../../server/schemas';

describe('Server Schemas - User', () => {
  it('matches stored schema', () => {
    const result = Joi.validate(_.cloneDeep(mockUser), userSchema);
    expect(result.error).toBeNull();
  });

  it('doesnt match invalid schemas', () => {
    let user = _.cloneDeep(mockUser);
    user.accessToken = 123;
    let result = Joi.validate(user, userSchema);
    expect(result.error).toBeTruthy();

    user = _.cloneDeep(mockUser);
    user.expires = null;
    result = Joi.validate(user, userSchema);
    expect(result.error).toBeTruthy();

    user = _.cloneDeep(mockUser);
    user.profile = {};
    result = Joi.validate(user, userSchema);
    expect(result.error).toBeTruthy();

    user = _.cloneDeep(mockUser);
    user.refreshToken = 123;
    result = Joi.validate(user, userSchema);
    expect(result.error).toBeTruthy();
  });
});
