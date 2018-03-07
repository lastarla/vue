var Dep = require('./dep');

/**
 * 监听数据
 * 
 * @param    {Object}   vm   Vue实例对象
 * @param    {Object}   obj  data
 */
function observe(vm, obj) {
	Object.keys(obj).map(function (key) {
		defineReactive(vm, key, obj[key]);
	});
}

/**
 * 访问器属性
 * 
 * @param    {Object}   					vm   Vue实例对象
 * @param    {string}   					name 名称
 * @param    {number|string|Array|Object}   value 数据
 */
function defineReactive(vm, name, value) {
	var dep = new Dep();

	Object.defineProperty(vm, name, {
		get: function () {
			if (Dep.target) {
				dep.addSub(Dep.target);
			}

			return value;
		},

		set: function (newValue) {
			if (value === newValue) {
				return;
			}

			value = newValue;

			dep.notify();
		}
	});
}

function initData(options) {
	this.data = options.data;

	observe(this, this.data);
}

module.exports = initData;