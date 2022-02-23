var _ = require('underscore')
var Backbone = require('backbone')
var Doc = require('../models/doc')
var rsSync = require('rs-adapter')
var lang = require('../translations')
const uuid = require('uuid/v4')

var Docs = Backbone.Collection.extend({
  model: Doc,

  sync: rsSync,

  initialize: function (models, options) {
    _.bindAll(this, 'sort', 'save', 'welcome', 'rsChange')

    this
      .on('change:lastEdited', this.sort)
      .on('change:lastEdited', this.save)

    this.once('sync', this.welcome)

    this.remote = options.remote

    this.remote.on('change', this.rsChange)
  },

  addNew: _.throttle(function (options) {
    return this.add(_.defaults(options || {}, {
      id: uuid(),
      lastEdited: Date.now()
    }))
  }, 1000, { leading: true }),

  // Sort by 'lastEdited'
  comparator: function (first, second) {
    return first.get('lastEdited') > second.get('lastEdited') ? -1 : 1
  },

  save: function (doc) {
    doc.throttledSave()
  },

  welcome: function () {
    if (this.isEmpty()) {
      this.addNew({ content: lang.welcome })
    }
  },

  events: [],

  rsChange: function (event) {
    this.events.push(event)
    this.handleEvents()
  },

  handleEvents: _.debounce(function () {
    _.each(this.events, function (event) {
      if (event.origin === 'window') {
        return
      }
      // Remove
      if (event.oldValue && !event.newValue) {
        this.remove(event.oldValue)
        return
      }
      // Add
      var existingDoc = this.get(event.newValue.id)
      if (!existingDoc) {
        this.add(event.newValue)
        return
      }
      // Update
      var isLatest = event.newValue.lastEdited > existingDoc.get('lastEdited')
      if (!isLatest) {
        return
      }
      this.set(event.newValue, { remove: false })
      this.trigger('remoteUpdate', event.newValue.id)
    }, this)
    this.events = []
  }, 400)

})

module.exports = Docs
