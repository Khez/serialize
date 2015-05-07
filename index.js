var Promise = require('bluebird');

exports = module.exports = function(name, obj) {
  if (obj && exports.collection[name]) {
    return exports.collection[name].serialize(obj);
  }

  if (obj && !exports.collection[name]) {
    throw new Error('Serializer [' + name + '] was not found.');
  }

  var obj = new Serializer(name);
  exports.collection.push(obj);
  exports.collection[name] = obj;

  return obj;
};

exports.collection = [];
exports.Serializer = Serializer;

exports.clear = function() {
  exports.collection.length = 0;
};

function Serializer(name) {
  this.name = name;
  this._mappings = [];
}

Serializer.prototype = {
  serialize: function(obj) {
    var self = this;
    var fresh = {};

    var fns = [];

    // Loop through the mappings and perform the operation onto the
    // incoming object.
    self._mappings.forEach(function(map) {
      // Grab the value of the key:
      var val = obj[map.key];

      if ('string' === typeof map.to) {
        fresh[map.to] = val;
      } else if ('function' === typeof map.to) {
        fns.push(map.to(val));
        // fresh[mapTo.key] = mapTo.value;
      }
    });

    return Promise.all(fns).then(function(maps) {
      maps.forEach(function(map) {
        fresh[map.key] = map.value;
      });

      return fresh;
    });
  },

  map: function(key, value) {
    this._mappings.push({
      key: key,
      to: value
    });
    return this;
  }
};
