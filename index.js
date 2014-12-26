'use strict';

var fs = require('fs');

module.exports = function (jsonPath) {
	this.jsonPath = jsonPath;

	var paths = jsonPath.split('/');
	var jsonFileName = paths.pop();
	var destination = paths.join('/') + '/';
	if (typeof arguments[1] !== 'undefined' && arguments[1]) {
		destination = arguments[1];
	}
	if (destination.slice(-1) === '/') {
		destination += jsonFileName.replace('.json', '.js');
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

	this.readJson = function () {
		return JSON.parse(fs.readFileSync(this.jsonPath, 'utf8'));
	};

	this.readFile = function (file) {
		var paths = this.jsonPath.split('/');
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
		var files = this.readJson();

		var output = '';
		var self = this;
		files.forEach(function (file) {
			output += self.readFile(file) + self.options.separator;
		});

		return this.write(output);
	};
};
