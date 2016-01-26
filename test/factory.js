'use strict';
var serializer = require('..');

require('tape')('factory', function(tape) {
  tape.plan(2);

  var team = serializer('team');
  tape.assert(team instanceof serializer.Serializer, 'should return serializer');


  team.random = Math.random();
  tape.equal(serializer('team').random, team.random, 'should return the same serializer');
});
