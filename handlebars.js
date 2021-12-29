const Handlebars = require('handlebars');
const paginate = require('handlebars-paginate');

Handlebars.registerHelper('paginate', paginate);
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  }

  return opts.inverse(this);
});

module.exports = Handlebars;
