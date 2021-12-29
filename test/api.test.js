'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { describe, it } = (exports.lab = Lab.script());

describe('POST /api/part1', () => {
  const server = require('../server');

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/api/part1',
      payload: {
        0: [
          {
            id: 10,
            title: 'House',
            level: 0,
            children: [],
            parent_id: null
          }
        ],
        1: [
          {
            id: 12,
            title: 'Red Roof',
            level: 1,
            children: [],
            parent_id: 10
          },
          {
            id: 18,
            title: 'Blue Roof',
            level: 1,
            children: [],
            parent_id: 10
          },
          {
            id: 13,
            title: 'Wall',
            level: 1,
            children: [],
            parent_id: 10
          }
        ],
        2: [
          {
            id: 17,
            title: 'Blue Window',
            level: 2,
            children: [],
            parent_id: 12
          },
          {
            id: 16,
            title: 'Door',
            level: 2,
            children: [],
            parent_id: 13
          },
          {
            id: 15,
            title: 'Red Window',
            level: 2,
            children: [],
            parent_id: 12
          }
        ]
      }
    });

    const result = [
      {
        id: 10,
        title: 'House',
        level: 0,
        children: [
          {
            id: 12,
            title: 'Red Roof',
            level: 1,
            children: [
              {
                id: 17,
                title: 'Blue Window',
                level: 2,
                children: [],
                parent_id: 12
              },
              {
                id: 15,
                title: 'Red Window',
                level: 2,
                children: [],
                parent_id: 12
              }
            ],
            parent_id: 10
          },
          {
            id: 18,
            title: 'Blue Roof',
            level: 1,
            children: [],
            parent_id: 10
          },
          {
            id: 13,
            title: 'Wall',
            level: 1,
            children: [
              {
                id: 16,
                title: 'Door',
                level: 2,
                children: [],
                parent_id: 13
              }
            ],
            parent_id: 10
          }
        ],
        parent_id: null
      }
    ];

    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal(result);
  });

  it('responds with 400', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/api/part1',
      payload: null
    });
    expect(res.statusCode).to.equal(400);
    expect(res.result.statusCode).to.equal(400);
    expect(res.result.error).to.equal('Bad Request');
    expect(res.result.message).to.equal('Invalid request payload input');
  });
});
