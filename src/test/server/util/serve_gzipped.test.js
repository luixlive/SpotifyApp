import path from 'path';

import serveGzipped from './../../../server/util/serve_gzipped';

describe('Server Util - Serve Gzipped', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { acceptsEncodings: () => ['gzip'], url: 'file.js' };
    res = { set: jest.fn() };
    next = jest.fn();
  });

  it('finds gzipped file and updates request', () => {
    const contentType = 'tex/plain';
    const middleware = serveGzipped(
      contentType,
      path.resolve(__dirname, './serve_gzipped'),
    );
    expect(middleware).toBeInstanceOf(Function);

    middleware(req, res, next);
    expect(req.url).toEqual('file.js.gz');
    expect(res.set).toHaveBeenCalledTimes(2);
    expect(res.set.mock.calls[0][0]).toEqual('Content-Encoding');
    expect(res.set.mock.calls[0][1]).toEqual('gzip');
    expect(res.set.mock.calls[1][0]).toEqual('Content-Type');
    expect(res.set.mock.calls[1][1]).toEqual(contentType);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('just calls next if no file was found', () => {
    const middleware = serveGzipped(
      null,
      path.resolve(__dirname, './serve_gzipped'),
    );
    expect(middleware).toBeInstanceOf(Function);

    req.url = 'nofile.js';
    middleware(req, res, next);
    expect(req.url).toEqual('nofile.js');
    expect(res.set).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
