var _ = require('underscore')
var Backbone = require('backbone')
var utils = require('../utils')
var lang = require('../translations')
var autosize = require('autosize')
var $ = require('jquery')

var EditorView = Backbone.View.extend({
  el: '#editor',

  initialize: function (options) {
    _.bindAll(
      this,
      'render',
      'focus',
      'blur',
      'desktopFocus',
      'handleCharEncodings',
      'setCursor',
      'insertTab'
    )

    this.litewrite = options.litewrite
    this.litewrite.state
      .on('change:query', this.render)

    this.model
      .on('change:id', this.render)
      .on('change:content', this.handleCharEncodings)
      .on('update', this.render)

    autosize(this.$el)
    this.setPlaceholder()
    this.render()
  },

  render: function () {
    // Only re-render when content changed
    var content = this.model.get('content')
    var query = this.litewrite.state.get('query')

    var highlightedText = this.applyHighlights(content, query)
    this.updateHighlight(highlightedText)

    if (content === this.$el.val()) {
      return
    }

    this.$el.val(content || '')
    autosize.update(this.$el)

    var pos = this.model.get('cursorPos')
    if (pos) {
      this.setCursor(pos)
    }
  },

  focus: function () {
    if (utils.isDesktop) {
      this.$el.focus()
      return
    }

    // Doesn't seem to work for textarea on iOS at all.
    // Maybe it works on other platforms.
    setTimeout(_.bind(this.$el.focus, this.$el), 500)
  },

  desktopFocus: function () {
    if (utils.isDesktop) {
      this.focus()
    }
  },

  blur: function () {
    this.$el.blur()
  },

  events: {
    'input': 'updateOpenDoc'
  },

  updateOpenDoc: function () {
    this.model.set({
      content: this.$el.val(),
      cursorPos: this.$el.prop('selectionStart')
    })
    this.trigger('typing')
  },

  // Set CSS class for certain languages to adjust styling.
  // For char classes see: http://kourge.net/projects/regexp-unicode-block
  handleCharEncodings: function (doc) {
    var c = doc.get('content')
    var isCyrillic = !!c.match('[\u0400-\u04FF\u0500-\u052F]')
    this.$el.toggleClass('cyrillic', isCyrillic)

    // Arabic, Hebrew, Syriac & Thaana
    var isRTL = !!c.match('[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\u0700-\u074F\u0780-\u07BF]')
    this.$el.toggleClass('rtl', isRTL)
  },

  setPlaceholder: function () {
    this.$el.attr('placeholder', lang.emptyDoc)
  },

  setCursor: function (pos) {
    this.$el
      .prop('selectionStart', pos)
      .prop('selectionEnd', pos)
  },

  insertTab: function () {
    var pos = this.$el.prop('selectionStart')
    var v = this.$el.val()
    this.$el.val(v.substring(0, pos) + '\t' + v.substring(pos, v.length))
    this.setCursor(pos + 1)
    this.updateOpenDoc()
  },

  escapeRegex: function (str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  },

  applyHighlights: function (text, query) {
    var queryRegex = new RegExp(this.escapeRegex(query), 'gi')
    text = text
      .replace(/\n$/g, '\n\n')
      .replace(queryRegex, '<mark>$&</mark>')

    var ua = window.navigator.userAgent.toLowerCase()
    var isIE = !!ua.match(/msie|trident\/7|edge/)
    if (isIE) {
      // IE wraps whitespace differently in a div vs textarea, this fixes it
      text = text.replace(/ /g, ' <wbr>')
    }

    return text
  },

  updateHighlight: function (highlightedText) {
    $('.highlights').html(highlightedText)
  }

})

module.exports = EditorView
