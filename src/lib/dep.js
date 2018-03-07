function Dep() {
	this.subs = [];
}

Dep.prototype = {
	addSub: function (sub) {
		this.subs.push(sub);
	},

	notify: function () {
		this.subs.map(function (sub) {
			sub.update();
		});
	}
};

module.exports = Dep;