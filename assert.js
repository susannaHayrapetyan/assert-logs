/**
 *
 */
"use strict";
var assert = require('assert');

/*
 *   Add new warning function to assert library
 */

assert.warning = function(message){
    console.error(message);
};

/* Add date to messages of assert functions. */

[
    { "name": "warning", args: 1},
    { "name": "doesNotThrow", args: 2},
    { "name": "fail", args: 3},
    { "name": "equal", args: 3},
    { "name": "notEqual", args: 3},
    { "name": "deepEqual", args: 3},
    { "name": "deepStrictEqual", args: 3},
    { "name": "notDeepEqual", args: 3},
    { "name": "notDeepStrictEqual", args: 3},
    { "name": "strictEqual", args: 3},
    { "name": "notStrictEqual", args: 3},
    { "name": "throws", args: 3}
].forEach(
    function(method) {

        var oldMethod = assert[method.name].bind(assert);

        assert[method.name] = function() {
            var args = Array.from(arguments),
                l = method.args - 1;

            args[l] = " Date: " + new Date().toISOString() + (arguments[l] ? (" Message: " + arguments[l]) : "");

            oldMethod.apply(
                assert,
                args
            );
        };
    }
);

module.exports = assert;