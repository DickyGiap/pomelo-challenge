'use strict';

const dotenv = require('dotenv');

dotenv.config();
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { describe, it } = (exports.lab = Lab.script());

const PORT = parseInt(process.env.PORT) || 3000;

describe('Server started', () => {
  const server = require('../server');

  it('Server started', () => {
    expect(server.info.port).to.equal(PORT);
  });
});
