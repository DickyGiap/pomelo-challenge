'use strict';

const dotenv = require('dotenv');

dotenv.config();
const Path = require('path');
const { buildTree } = require('./utils');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('joi');
const axios = require('axios');
const Handlebars = require('./handlebars');
const parse = require('parse-link-header');

const childSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  level: Joi.number().required(),
  children: Joi.array(),
  parent_id: Joi.number().allow(null).required()
}).label('Child');

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost'
});

async function liftOff() {
  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.route({
    method: 'GET',
    path: '/layout.css',
    handler: function (request, h) {
      return h.file(Path.join(__dirname, 'public/css/layout.css'));
    }
  });

  server.route({
    method: 'POST',
    path: '/api/part1',
    options: {
      handler: function (request, h) {
        try {
          return buildTree(request.payload);
        } catch (e) {
          return h
            .response({
              statusCode: 500,
              error: 'Internal Error',
              message: e.message
            })
            .code(500);
        }
      },
      description: 'API for building hiearchy',
      notes: 'Return a hiearchy',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array()
                .items(childSchema)
                .label('Response')
            },
            400: {
              description: 'Bad request!'
            }
          }
        }
      },
      validate: {
        payload: Joi.object({})
          .pattern(/^/, [Joi.array().items(childSchema)])
          .label('Payload')
      }
    }
  });

  server.views({
    engines: {
      html: Handlebars
    },
    relativeTo: __dirname,
    path: './templates',
    layoutPath: './templates/layout',
    helpersPath: './templates/helpers'
  });

  server.route({
    method: 'GET',
    path: '/part2',
    handler: async function (request, h) {
      const page = request.query.page || 1;
      const response = await axios
        .get(
          `https://api.github.com/search/repositories?q=nodejs&per_page=10&page=${page}`
        )
        .catch(() => {
          return 'Error';
        });

      let links;
      if (response !== 'Error') {
        links = parse(response.headers.link);
      }

      return h.view('layout/layout', {
        pagination: {
          page,
          pageCount: links.last?.page || page,
          pageLimit: 5
        },
        total_count: response.data.total_count,
        items: response.data.items
      });
    }
  });
}

exports.init = async () => {
  await liftOff();
  await server.initialize();
  return server;
};

exports.start = async () => {
  await liftOff();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log('1', err);
  process.exit(1);
});
