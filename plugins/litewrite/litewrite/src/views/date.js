var _ = require('underscore')
var Backbone = require('backbone')
var lang = require('../translations')

var updateInterval = 20000

var DateView = Backbone.View.extend({
  el: '#date',

  initialize: function (options) {
    _.bindAll(this, 'render')
    this.model.on('change:lastEdited', this.render)
    this.refreshTimeout = null
  },

  render: function () {
    var lastModified = this.model.formatDate()
    this.$el.html(lastModified ? lang.modified + ' ' + lastModified : '')
    this.refresh()
  },

  refresh: function () {
    clearTimeout(this.refreshTimeout)
    this.refreshTimeout = setTimeout(_.bind(function () {
      // Stop updating when window is inactive
      window.requestAnimationFrame(this.render)
    }, this), updateInterval)
  }

})

module.exports = DateView
