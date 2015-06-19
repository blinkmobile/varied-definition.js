'use strict';

// foreign modules

var test = require('tape');

// local modules

var variedDefinition = require('..');

// this module

require('tape-chai');

test('variedDefinition', function (t) {

  t.test('is defined', function (tt) {
    tt.isDefined(variedDefinition);
    tt.end();
  });

});
