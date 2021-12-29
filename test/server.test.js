'use strict';

const dotenv = require('dotenv');

dotenv.config();
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { describe, it, before, after } = (exports.lab = Lab.script());
const { start } = require('../server');

const PORT = parseInt(process.env.PORT) || 3000;

describe('Server started', () => {
  let server;

  before(async () => {
    server = await start();
  });

  after(async () => {
    await server.stop();
  });

  it('Server started', () => {
    expect(server.info.port).to.equal(PORT);
  });
});
