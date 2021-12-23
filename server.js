'use strict'
const dotenv = require('dotenv')
dotenv.config()

const Path = require('path')
const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return 'Hello World!'
    },
  })

  await server.register(require('@hapi/vision'))

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
    handler: function (request, h) {
      return h.view('index')
    },
  })

  server.route({
    method: 'GET',
    path: '/layout',
    handler: function (request, h) {
      return h.view('layout/layout')
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
