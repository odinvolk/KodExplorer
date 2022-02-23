module.exports = {
  emptyDoc: 'Write …',
  search: 'Search',
  footer: 'write lite, open source',
  delete: 'delete',
  confirmDelete: 'Are you sure that you want to delete the document?',
  share: 'share',
  unshare: 'unshare',
  open: 'open',
  modified: 'modified',
  updateCache: 'New Litewrite version available. Refresh?',
  welcome: require('./welcome.txt'),
  secondsAgo: function (x) {
    if (x === 1) return 'a second ago'
    return x + ' seconds ago'
  },
  minutesAgo: function (x) {
    if (x === 1) return 'a minute ago'
    return x + ' minutes ago'
  },
  hoursAgo: function (x) {
    if (x === 1) return 'an hour ago'
    return x + ' hours ago'
  },
  daysAgo: function (x) {
    if (x === 1) return 'a day ago'
    return x + ' days ago'
  },
  weeksAgo: function (x) {
    if (x === 1) return 'a week ago'
    return x + ' weeks ago'
  },
  monthsAgo: function (x) {
    if (x === 1) return 'a month ago'
    return x + ' months ago'
  },
  yearsAgo: function (x) {
    if (x === 1) return 'a year ago'
    return x + ' years ago'
  }
}
