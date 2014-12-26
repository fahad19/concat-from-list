'use strict';

var fs = require('fs');

module.exports = function (listPath) {
	this.listPath = listPath;

	var paths = listPath.split('/');
	var listFileName = paths.pop();
	var destination = paths.join('/') + '/';
	if (typeof arguments[1] !== 'undefined' && arguments[1]) {
		destination = arguments[1];
	}
	if (destination.slice(-1) === '/') {
		destination += 'concat-' + listFileName;
	}
	this.destination = destination;

	this.options = {
		separator: '\n'
	};

	if (typeof arguments[2] !== 'undefined') {
		var k;
		var v;
		for (k in arguments[2]) {
			v = arguments[2][k];
			this.options[k] = v;
		}
	}

	this.readList = function () {
		var list = [];

		if (this.listPath.slice(-5) === '.json') {
			list = JSON.parse(fs.readFileSync(this.listPath, 'utf8'));
		} else if (this.listPath.slice(-5) === '.cson') {
			var cson = require('cson');
			list = cson.parseFileSync(this.listPath);
		}

		return list;
	};

	this.readFile = function (file) {
		var paths = this.listPath.split('/');
		paths.pop();
		var jsonDir = paths.join('/') + '/';
		if (file[0] !== '.') {
			file = './' + file;
		}
		return fs.readFileSync(jsonDir + file, 'utf8');
	};

	this.write = function (content) {
		fs.writeFileSync(this.destination, content);
		return true;
	};

	this.run = function () {
		var files = this.readList();

		var output = '';
		var self = this;
		files.forEach(function (file) {
			output += self.readFile(file) + self.options.separator;
		});

		return this.write(output);
	};
};
