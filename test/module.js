'use strict';
var serializer = require('..');

require('tape')('module', function(tape) {
  tape.plan(4);

  tape.equal('function', typeof serializer, 'should have serializer factory');
  tape.equal('function', typeof serializer.Serializer, 'should have serializer class');
  tape.equal('function', typeof serializer.clear, 'should have clear collection method');
  tape.equal('object', typeof serializer.collection, 'should have collection of serializers');
});
