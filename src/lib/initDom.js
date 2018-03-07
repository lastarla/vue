var Watcher = require('./watcher');

/**
 * 节点转成文档片段
 * 
 * @param    {Object} vm   Vue实例对象
 * @param    {string} dom  Dom对象
 * @return   {Object}　　　文档片段
 */
function nodeToFragment(vm, dom) {
	var frag = document.createDocumentFragment();
	var child;

	while(child = dom.firstChild) {
		compile(vm, child);
		frag.append(child);
	}

	return frag;
}

function compile(vm, node) {
	var reg = /\{\{(.*)\}\}/;

	if (node.nodeType === 1) {
		var attrs = node.attributes;

		for (var i = 0; i < attrs.length; i++) {
			var name = attrs[i].nodeValue;

			if (attrs[i].nodeName === 'v-model') {
				// node.value = vm[name];
				new Watcher(vm, name, updateDom.bind(this, node));
			}
		}
	}

	if (node.nodeType === 3) {
		if (reg.test(node.nodeValue)) {
			var name = RegExp.$1;

			name = name.trim();
			// node.nodeValue = vm[name];
			new Watcher(vm, name, updateDom.bind(this, node));
		}
	}
}

function updateDom(node, value) {
	if (node.nodeType === 1) {
		node.value = value;
	}

	if (node.nodeType === 3) {
		node.nodeValue = value;
	}
}

function initDom(options) {
	this.id = options.el;

	var elem = document.getElementById(this.id);
	var dom = nodeToFragment(this, elem);

	elem.appendChild(dom);
}

module.exports = initDom;