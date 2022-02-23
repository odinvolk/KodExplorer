var _ = require('underscore')
var $ = require('jquery')
var Backbone = require('backbone')
var utils = require('../utils')
var Snap = require('snap')
var lang = require('../translations')

// Allow hiding of sitebar if at list this number of docs
var minDocsForHide = 3

var AsideView = Backbone.View.extend({
  el: 'body',

  initialize: function () {
    _.bindAll(this, 'show', 'hide', 'toggle', 'desktopShow', 'desktopHide', 'handleSnapper', 'triggerOpening')

    this.$sidebar = this.$('aside')

    this.collection
      .on('add', this.desktopShow)
      .on('remove', this.desktopShow)
      .on('change:title', this.desktopShow)

    this.initSnapper()
    this.setFooter()
  },

  initSnapper: function () {
    this.snapper = new Snap({
      element: this.$('#snap-content')[0],
      disable: 'right',
      maxPosition: 265
    })

    this.snapper.on('end', this.triggerOpening)

    this.handleSnapper()
    $(window).on('resize', this.handleSnapper)
  },

  triggerOpening: function () {
    this.trigger('opening')
  },

  show: function () {
    if (utils.isDesktop) {
      this.$el.addClass('show-aside')
      return
    }
    this.snapper.open('left')
  },

  hide: function () {
    if (utils.isMobile) {
      this.snapper.close()
      return
    }
    // Hide sidebar when 3 or more docs and the open doc is not empty
    if (this.collection.length < minDocsForHide || this.model.isEmpty()) {
      return
    }
    this.$el.removeClass('show-aside')
  },

  toggle: function () {
    if (utils.isDesktop) {
      this.$el.toggleClass('show-aside')
      return
    }
    if (this.snapper.state().state === 'closed') {
      this.show()
      return
    }
    this.hide()
  },

  desktopShow: function () {
    if (utils.isDesktop) {
      this.show()
    }
  },

  desktopHide: _.debounce(function () {
    if (utils.isDesktop) {
      this.hide()
    }
  }, 3000),

  handleSnapper: _.debounce(function () {
    if (utils.isMobile) {
      this.snapper.enable()
      return
    }
    this.snapper.close()
    this.snapper.disable()
  }, 700),

  setFooter: function () {
    this.$sidebar.find('footer a').text(lang.footer)
  }
})

module.exports = AsideView
