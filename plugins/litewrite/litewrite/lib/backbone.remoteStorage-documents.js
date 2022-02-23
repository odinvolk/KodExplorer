define(function(require) {

  var $ = require('jquery');
  var _ = require('underscore');

  function sync(method, model, options) {
    var resp;
    var done = $.Deferred();

    switch (method) {
      case "read":    resp = model.id !== undefined ? find(model) : findAll(model); break;
      case "create":  resp = set(model);                                            break;
      case "update":  resp = set(model);                                            break;
      case "delete":  resp = destroy(model);                                        break;
    }

    resp.then(function(res) {
      options.success(res);
      if (options.complete) options.complete(res);
      done.resolve(res);
    }, function(res) {
      options.error(res);
      if (options.complete) options.complete(res);
      done.reject(res);
    });

    return done;
  }


  function find(model) {
    return model.collection.remote.get(model.id);
  }

  function findAll(collection) {
    return collection.remote.getAll().then(function(objMap) {
      return _.values(objMap);
    });
  }

  function set(model) {
    return model.collection.remote.set(model.id, model.toJSON()).then(function() {
      return model.toJSON();
    });
  }

  function destroy(model) {
    return model.collection.remote.remove(model.id.toString()).then(function() {
      return model.toJSON();
    });
  }



  return sync;
});
