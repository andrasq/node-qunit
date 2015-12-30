/**
 * Copyright (C) 2015 Andras Radics
 * Licensed under the Apache License, Version 2.0
 */

'use strict';

var assert = require('assert');
var qunit = require('../index');
var qmocha = require('../lib/mocha-compat');

module.exports = {
    'should parse mocha test': function(t) {
        qmocha.reset();
        // delete any previous run results, and re-run with empty options
        delete require.cache[require.resolve('./mocha-test.js')];
        var trace = require('./mocha-test.js');
        var options = {};
        var stats = {
            assertionCount: 0,
            fileCount: 0,
            errors: new Array(),
        };
        qunit.runTest(qmocha.getHierarchy(), "", options, [], [], stats, function(err) {
            var expectTrace = [
                // top level
                "top before",
                "top before each",
                "test 1",
                "top after each",
                "top before each",
                "test 2",
                "top after each",

                // nested tests
                "nested before",
                "nested before 2",

                // non-nested tests run first
                "top before each",
                "nested before each",
                "nested test 1",
                "nested after each",
                "top after each",
                "top before each",
                "nested before each",
                "nested test 2",
                "nested after each",
                "top after each",

                // sub-nested tests
                "nested 2 before",
                "top before each",
                "nested before each",
                "nested 2 before each",
                "nested 2 before each 2",
                "nested 2 test 1",
                "nested 2 after each",
                "nested after each",
                "top after each",

                "top before each",
                "nested before each",
                "nested 2 before each",
                "nested 2 before each 2",
                "nested 2 test 2",
                "nested 2 after each",
                "nested after each",
                "top after each",

                // end sub-nested tests
                "nested 2 after",

                // end nested tests
                "nested after",

                // end top tests
                "top after",
                "top after 2",
            ];
            //console.log("DONE", err, err?err.stack:"", trace.length, expectTrace.length);
            //for (var i=0; i<trace.length; i++) t.printf("%-3i %s %s\n", trace[i] == expectTrace[i], trace[i], expectTrace[i]);
            assert.deepEqual(trace, expectTrace);
        });

        t.done();
    },
};