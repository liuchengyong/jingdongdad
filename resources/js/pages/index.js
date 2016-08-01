
var deviceAdapter = require('../common/deviceAdapter');

(function(){
	'use strict';
	var root = window;
	var App = root.App = window.App || {
		name : 'dreamMoniter',
		version : '0.0.1',
		resizeTimer : null,
		initialize: function(){
			root.addEventListener('load',this.pageLoad,false);
			root.addEventListener('resize',this.pageResize,false);
		},
		pageLoad:function(){
			deviceAdapter.setFrontSize();
		},


	};
})();

App.initialize();
console.log('JS initialized in version:', App.version);


