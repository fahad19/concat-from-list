/* global describe, it */
'use strict';
var assert = require('assert');
var Concat = require('../');
var fs = require('fs');

var expected = fs.readFileSync(__dirname + '/fixtures/expected.js', 'utf8');

describe('concat-from-list node module', function () {
	it('must generate concat file', function () {
		var concat = new Concat(__dirname + '/fixtures/concat.json');
		assert.ok(concat.run());

		var content = fs.readFileSync(__dirname + '/fixtures/concat.js', 'utf8');
		var expected = fs.readFileSync(__dirname + '/fixtures/expected.js', 'utf8');
		assert.equal(content, expected);
	});

	it('must generate concat file in specified directory', function () {
		var concat = new Concat(
			__dirname + '/fixtures/concat.json',
			__dirname + '/fixtures/test_build/'
		);
		assert.ok(concat.run());

		var content = fs.readFileSync(__dirname + '/fixtures/test_build/concat.js', 'utf8');
		assert.equal(content, expected);
	});

	it('must generate concat file in specified file path', function () {
		var concat = new Concat(
			__dirname + '/fixtures/concat.json',
			__dirname + '/fixtures/test_build/hello.js'
		);
		assert.ok(concat.run());

		var content = fs.readFileSync(__dirname + '/fixtures/test_build/hello.js', 'utf8');
		assert.equal(content, expected);
	});

});
