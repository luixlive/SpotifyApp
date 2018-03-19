import _ from 'lodash';

export default props => _.merge({}, {
  match: null,
  location: null,
  history: null,
  staticContext: null,
}, props);
