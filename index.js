'use strict';
var bluebird = require('bluebird');
var collection = {};

module.exports = fetchSerializer;
module.exports.collection = collection;
module.exports.Serializer = Serializer;
module.exports.clear = clearCollection;

function fetchSerializer(name) {
  if (!collection[name]) {
    collection[name] = new Serializer(name);
  }

  return collection[name];
}

function clearCollection() {
  for (var key in collection) {
    delete collection[key];
  }
}

function Serializer(name) {
  this.name = name;
  this._mappings = {};
}

Serializer.prototype.serialize = function(object) {
  return bluebird.props(this.build(object));
};

Serializer.prototype.build = function(object) {
  var fresh = {};
  for (var key in this._mappings) {
    fresh[key] = this._mappings[key](object);
  }
  return fresh;
};

Serializer.prototype.map = function(key, from) {
  if (typeof from !== 'function') {
    from = getProp.bind(null, from);
  }

  this._mappings[key] = from;

  return this;
};

function getProp(key, object) {
  return object[key];
}
