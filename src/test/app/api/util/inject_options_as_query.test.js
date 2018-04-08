import injectOptionsAsQuery from
  './../../../../app/api/util/inject_options_as_query';

describe('App API Util - Inject Options as Query', () => {
  it('should return the endpoint with all options as query', () => {
    let endpoint = '/';
    let options = { option: 'value' };
    expect(injectOptionsAsQuery(endpoint, options)).toEqual('/?option=value');

    endpoint = 'some/endpoint';
    options = { option1: 'value1', option2: 2 };
    expect(injectOptionsAsQuery(endpoint, options))
      .toEqual('some/endpoint?option1=value1&option2=2');
  });

  it('should return the endpoint alone if no options were provided', () => {
    let endpoint = '/';
    let options = {};
    expect(injectOptionsAsQuery(endpoint, options)).toEqual('/');

    endpoint = 'some/endpoint';
    options = undefined;
    expect(injectOptionsAsQuery(endpoint, options)).toEqual('some/endpoint');
  });
});
