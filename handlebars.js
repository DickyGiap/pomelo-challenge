const Handlebars = require('handlebars');
const paginate = require('handlebars-paginate');

Handlebars.registerHelper('paginate', paginate);

module.exports = Handlebars;
