var Vue = require('./main');

var vm = new Vue({
	el: 'app',
	data: {
		text: '123'
	}
});

vm.text = 111;

// setTimeout(function () {
// 	vm.text = 111;
// }, 2000)