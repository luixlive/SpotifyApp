import _ from 'lodash';

export default (endpoint, options) => {
  let endpointWithQuery = `${endpoint}?`;
  _.forOwn(options, (value, key) => {
    endpointWithQuery += `${key}=${value}&`;
  });
  return endpointWithQuery.slice(0, -1);
};
