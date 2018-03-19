import swaggerController from './../../../server/swagger/controller';

describe('Server Swagger - Controller', () => {
  let redirectTo;
  let header;
  let req;
  let res;
  let responseValue;
  beforeEach(() => {
    header = { header: undefined, value: undefined };
    redirectTo = undefined;
    responseValue = undefined;
    res = {
      redirect: (path) => { redirectTo = path; },
      send: (value) => { responseValue = value; },
      setHeader: (headerName, value) => {
        header = { header: headerName, value };
      },
    };
  });

  describe('Swagger Default', () => {
    it('redirects to /swagger/api-docs', () => {
      swaggerController.swaggerDefault(req, res);
      expect(redirectTo).toEqual('/swagger/api-docs');
    });
  });

  describe('Swagger JS Doc', () => {
    it('sets headers and sends Swagger JSON', () => {
      swaggerController.swaggerJSDoc(req, res);
      expect(header).toEqual({
        header: 'Content-Type',
        value: 'application/json',
      });
      expect(responseValue).toMatchSnapshot();
    });
  });
});
