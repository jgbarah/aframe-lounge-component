/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('lounge component', function () {
  var component;
  var el;

  setup(function (done) {
    el = entityFactory();
    el.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'lounge') { return; }
      component = el.components['lounge'];
      done();
    });
    el.setAttribute('lounge', {});
  });

  suite('Creation', () => {
    test('Simple', function () {
      el.setAttribute('lounge', {width: 7, depth: 7});
      assert.equal(el.getAttribute('lounge').width, 7);
      assert.equal(el.getAttribute('lounge').depth, 7);
    });

    test('Empty', function () {
      el.setAttribute('lounge', '');
      assert.equal(el.getAttribute('lounge').width, 10);
      assert.equal(el.getAttribute('lounge').depth, 7);
    });

  });

});
