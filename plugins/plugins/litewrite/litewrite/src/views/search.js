var Backbone = require('backbone')
var lang = require('../translations')

var SearchView = Backbone.View.extend({
  el: '#search',

  initialize: function () {
    this.render()
    this.setPlaceholder()
  },

  events: {
    'search': 'search',
    'keyup': 'handleKey',
    'focus': 'triggerFocus'
  },

  render: function () {
    this.$el.val(this.model.get('query'))
  },

  search: function () {
    var query = this.$el.val()
    this.model.save('query', query)
  },

  handleKey: function (e) {
    var isEnter = e.which === 13
    if (isEnter) {
      e.preventDefault()
      this.trigger('blur')
      return
    }
    this.search()
  },

  focus: function () {
    this.$el.removeClass('hide')
    this.$el.focus()
  },

  triggerFocus: function () {
    this.trigger('focus')
  },

  isFocused: function () {
    return this.$el.is(':focus')
  },

  show: function () {
    this.$el.removeClass('hide')
  },

  hide: function () {
    // Never hide search if not empty
    if (this.model.get('query')) {
      return
    }
    this.$el.addClass('hide')
    this.trigger('blur')
  },

  clear: function () {
    this.model.save('query', '')
    this.render()
  },

  setPlaceholder: function () {
    this.$el.attr('placeholder', lang.search)
  }

})

module.exports = SearchView
