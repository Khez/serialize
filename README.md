# Serialize

Serialize A -> B. Often times you're working with different object representations and you need to interop between them. For example, you might be working with a REST API that needs to export a different representation than what you have internally. This fixes that issue.

## Installation

```
npm install serialize-obj --save
```

## Getting Started

Let's create our first serializer that maps between a camel-cased key to an underscored one.

```js
var serializer = require('serialize-obj');

serializer('team')
  .map('firstName', 'first_name');
```

The serializer instance is cached within the module, so you can always fetch it anywhere in your project:

```js
// somewhere/else.js
var serializer = require('serialize-obj');

serializer('team'); // instanceof Serializer
```

## Mappings

The only concept is that of mappings. We map A -> B through either a static assignment, function, or even a promise.

```js
// static

serializer('foobar')
  .map('token', 'id');
```

This effectively takes an object like:

```js
{
  id: 1,
  token: 'foobar123'
}
```

And transforms it into:

```js
{
  id: 'foobar123'
}
```

Replacing whatever key was once there. This allows us to produce extremely clean objects.

**Function Mapping:**

```js
serializer('blueskies')
  .map('team_id', function(id) {
    // We need to perform some logic on the `team_id` value
    return doSomething(id);
  });
```

**Promise Mapping:**

Promise mappings are a way of performing some asynchronous logic based on some key's value and then mapping that to a new set.

```js
serializer('blackdeath')
  .map('team_id', function(id) {
    return Team.forge({ id: id })
      .fetch()
      .then(function(team) {
        return { key: 'team', value: team.get('token') };
      });
  });
```

In this example, we want to transform any internal ids we may have on our objects into an external token already stored in the object. The promise mapping allows us to fetch the relationship through our internal id which we then read the token.

## Serializing

Let's try to actually serialize an object. Because it supports promises, we *have* to work with them even without using them.

```js
serializer('wings')
  .map('token', 'id')
  .map(...);

serializer.serialize({ id: 1, token: 'ffa500' }).then(function(record) {
  // { id: 'ffa500' }
});
```

# License

The MIT License (MIT)

Copyright (c) 2015 Daniel Fagnan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
