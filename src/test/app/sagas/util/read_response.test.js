import readResponse from './../../../../app/sagas/util/read_response';

describe('App Sagas Util - Read Response', () => {
  it('should return response.json()', () => {
    const response = { json: () => 'response.json' };
    expect(readResponse(response)).toEqual(response.json());
  });
});
