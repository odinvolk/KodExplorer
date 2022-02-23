var Backbone = require('backbone')
var Store = require('backbone.localstorage')

var State = Backbone.Model.extend({
  defaults: {
    id: 0,
    query: ''
  },

  localStorage: new Store('litewriteState')
})

module.exports = State
