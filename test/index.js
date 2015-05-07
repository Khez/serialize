var assert = require('assert');
var serializer = require('..');
var Promise = require('bluebird');
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
    }).then(function(obj) {
      assert.deepEqual(obj, {
        id: 1
      });
    });
  });

  it('should serialize with a dynamic function mapping.', function() {
    var user = serializer('user')
      .map('team_id', function(id) {
        return {
          key: 'team',
          value: id + 1
        };
      });

    var serialized = user.serialize({
      team_id: 2
    }).then(function(obj) {
      assert.deepEqual(obj, {
        team: 3
      });
    });
  });

  it('should serialize with a promise mapping.', function() {

    var findTeam = function(id) {
      return new Promise(function(resolve, reject) {
        resolve({ key: 'team', value: id + 5 });
      });
    };

    var invite = serializer('invite')
      .map('team_id', function(id) {
        return findTeam(id);
      });

    var serialized = invite.serialize({
      team_id: 2
    }).then(function(obj) {
      assert.deepEqual(obj, {
        team: 7
      });
    });

  });
});
