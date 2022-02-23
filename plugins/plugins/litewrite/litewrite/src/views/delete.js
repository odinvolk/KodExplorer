var Backbone = require('backbone')
var _ = require('underscore')
var lang = require('../translations')

var DeleteView = Backbone.View.extend({
  el: '#delete',

  initialize: function () {
    _.bindAll(this, 'render')
    this.model.on('change:content', this.render)
    this.$el.text(lang.delete)
    this.render()
  },

  events: {
    click: 'delete'
  },

  render: function () {
    this.$el.toggleClass('hide', this.model.get('content') === '')
  },

  delete: function () {
    if (!window.confirm(lang.confirmDelete)) {
      return
    }

    this.model.set({
      content: '',
      cursorPos: 0
    })
    this.trigger('delete')
  }

})

module.exports = DeleteView
