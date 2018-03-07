var initData = require('./lib/initData');
var initDom = require('./lib/initDom');

function Vue(options) {
	initData.call(this, options);
	initDom.call(this, options);
}

module.exports = Vue;

