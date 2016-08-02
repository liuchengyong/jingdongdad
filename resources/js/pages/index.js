
var deviceAdapter = require('../common/deviceAdapter');
var TweenMax = require('gsap');
console.log(TweenLite);
(function(){
	'use strict';
	var root = window;
	var App = root.App = window.App || {
		name : 'dreamMoniter',
		version : '0.0.1',
		resizeTimer : null,
		initialize: function(){
			root.addEventListener('load',this.pageLoad,false);
			this.showQuestion(document.getElementById('q4'));
		},
		pageLoad:function(){
			deviceAdapter.setFrontSize();
		},
		showQuestion:function(element){
			var title = element.querySelector('.question-title');
			// TweenMax.from(title,2,{'margin-top':'1000px'});
			
		},

	};
})();

App.initialize();
console.log('JS initialized in version:', App.version);


