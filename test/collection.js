'use strict';
var serializer = require('..');

require('tape')('collection', function(tape) {
  tape.plan(2);

  serializer('team');
  tape.assert('team' in serializer.collection, 'should have serializer after factory');

  serializer.clear();
  tape.notOk('team' in serializer.collection, 'should not have serializer after clear');
});
