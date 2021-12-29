'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { describe, it } = (exports.lab = Lab.script());

describe('GET /part2', () => {
  const server = require('../server');

  it('request without page, responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/part2'
    });

    expect(res.statusCode).to.equal(200);
  });

  it('request with page, responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/part2?page=100'
    });

    expect(res.statusCode).to.equal(200);
  });

  it('request with page over limit, responds with 500', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/part2?page=101'
    });

    expect(res.statusCode).to.equal(500);
  });
});
