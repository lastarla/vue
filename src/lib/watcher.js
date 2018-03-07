var Dep = require('./dep');

function Watcher(vm, name, cb) {
	Dep.target = this;
	this.vm = vm;
	this.name = name;
	this.cb = cb;
	this.update();
	Dep.target = null;
}

Watcher.prototype = {
	update: function () {
		this.get();
		this.cb(this.value);
	},

	get: function () {
		this.value = this.vm[this.name];
	}
};

module.exports = Watcher;