'use strict';
var serializer = require('..');
var bluebird = require('bluebird');

var team = {
  id: 5,
  name: 'FooBar',
  resolve: 'resolve value',
  reject: 'reject reason'
};

require('tape')('serializer', function(tape) {

  tape.plan(4);

  serializer.clear();

  serializer('team').serialize(team).then(function(record) {
    tape.deepEqual(record, {}, 'default serializer should be empty');
  });

  serializer('team:id').map('id', 'name').serialize(team).then(function(record) {
    tape.deepEqual(record, {id: team.name}, 'should allow mapping fields to different names');
  });

  serializer('team:hash').map('hash', getTeamHash).serialize(team).then(function(record) {
    tape.deepEqual(record, {hash: team.name + team.id}, 'should allow mapping fields with a function');
  });

  tape.test('promises', function(tape) {
    tape.plan(2);

    serializer('team:resolve').map('resolve', resolve).serialize(team).then(function(record) {
        tape.deepEqual(record, {resolve: team.resolve}, 'should wait for resolve');
    });

    serializer('team:reject').map('reject', reject).serialize(team).catch(function(reject) {
        tape.equal(reject, team.reject, 'should bubble up rejection');
    });
  });

});

function getTeamHash(team) {
    return team.name + team.id;
}

function resolve(object) {
    return bluebird.resolve(object.resolve);
}

function reject(object) {
    return bluebird.reject(object.reject);
}
