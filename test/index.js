var assert = require('assert');
var serializer = require('..');
var Serializer = serializer.Serializer;

describe('serializer', function() {
  beforeEach(function() {
    serializer.clear();
  });

  it('should return a function', function() {
    assert.equal('function', typeof serializer);
  });

  it('should throw an error with invalid name', function() {
    assert.throws(function() {
      serializer('fooomouth', {});
    });
  });

  it('should return a new serializer', function() {
    assert(serializer('team') instanceof Serializer);
  });

  it('should define a map', function() {
    var team = serializer('team')
      .map('token', 'id');

    assert.equal(team._mappings.length, 1);
  });

  it('should serialize a single static map', function() {
    var team = serializer('team')
      .map('token', 'id');

    var serialized = team.serialize({
      token: 1
    });

    assert.deepEqual(serialized, {
      id: 1
    });
  });
});
