'use strict'
const dotenv = require('dotenv')
dotenv.config()

const { buildTree } = require('./helpers')
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('./package')
const axios = require('axios')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
  })

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version,
    },
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ])

  server.route({
    method: 'POST',
    path: '/',
    handler: function (request, h) {
      if (!request.payload) return h.response('Bad request!').code(400)
      return buildTree(request.payload)
    },
  })

  server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './templates',
    layoutPath: './templates/layout',
    helpersPath: './templates/helpers',
  })

  server.route({
    method: 'GET',
    path: '/index',
    options: {
      handler: function (request, h) {
        return h.view('index')
      },
      description: 'API for building hiearchy',
      notes: 'Return a hiearchy',
      tags: ['api'],
    },
  })

  server.route({
    method: 'GET',
    path: '/layout',
    handler: async function (request, h) {
      const response = await axios.get(`https://api.github.com/search/repositories?q=nodejs&per_page=10`).catch((e) => {
        return 'Error'
      })
      console.log(response)
      // if (response !== 'Error') {
      //   const links = getLinks(response.headers.link)
      // }
      return h.view('layout/layout', { search: response.data })
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
