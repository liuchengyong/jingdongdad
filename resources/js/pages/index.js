
var deviceAdapter = require('../common/deviceAdapter');
var TweenMax = require('gsap');
var $ = require('jquery');
var attachFastClick = require('fastclick');


(function(){
	'use strict';
	var root = window;
	var App = root.App = window.App || {
		name : 'dreamMoniter',
		version : '0.0.1',
		resizeTimer : null,
		answerList:[],
		initialize: function(){
			deviceAdapter.setFrontSize();
			root.addEventListener('load',this.pageLoad.bind(this),false);
			// this.showResult($('#r4'));
		},
		pageLoad:function(){
			var imgs = document.querySelectorAll('img[data-src]');
			loadImage(imgs,0,this.pageStart.bind(this));
		},
		btnStartInit:function(){
			var S_width = $(window).width() > 500 ? 500 : $(window).width();
			var S_height = $(window).width() > 500 ? 890 : $(window).height();
			var left = 206*S_width/750;
			var bottom = 66*S_height/1334;
			var width = 323*S_width/750;
			var height = 89*S_height/1334;
			$('#btnStart').css({
				left:left+'px',
				bottom:bottom+'px',
				width:width+'px',
				height:height+'px'
			});
			var $this = this;
			$('#btnStart').on('click',function(){
				$('#q1').css('display','block');
				$this.showQuestion($('#q1'),1);
			});
		},
		pageStart:function(){
			attachFastClick(document.body);
			$('#load').css('display','none');
			$('#main').css('display','block');
			$('#share').on('click',this.share.hide);
			this.btnStartInit();
		},
		showQuestion:function(element,index){
			// console.log(element);
			TweenMax.from(element.find('.question-title'),0.5,{y:1000,delay:0});
			TweenMax.from(element.find('.question-text'),0.5,{y:1000,delay:0.1});
			TweenMax.from(element.find('.question-gif'),0.5,{y:1000,delay:0.2});
			TweenMax.from(element.find('.qestion-a'),0.5,{y:1000,delay:0.3});
			TweenMax.from(element.find('.qestion-b'),0.5,{y:1000,delay:0.4});
			TweenMax.from(element.find('.qestion-c'),0.5,{y:1000,delay:0.5});
			element.off();
			element.on('click',this.clickNextQuestion.bind(this,index));
		},
		clickNextQuestion:function(index,event){
			var $target = $(event.target);
			if($target.hasClass('qestion-a')){
				this.answerList.push('A');
			}else if($target.hasClass('qestion-b')){
				this.answerList.push('B');
			}else if($target.hasClass('qestion-c')){
				this.answerList.push('C');
			}else{
				return;
			}
			
			if(index < 6){
				$('#q' + index).css('display','none');
				index++;
				$('#q' + index).css('display','block');
				this.showQuestion($('#q' + index),index);
			}else{
				$('#q' + index).css('display','none');
				console.log(this.answerList);
				this.checkResult(this.answerList);
			}
		},
		checkResult:function(list){
			if(list[0] === 'C'){
				this.showResult($('#r1'));
			}else if(list[1] === 'C'){
				this.showResult($('#r3'));
			}else if(list[2] === 'C'){
				this.showResult($('#r1'));
			}else if(list[3] === 'A'){
				this.showResult($('#r2'));
			}else if(list[5] === 'A'){
				this.showResult($('#r3'));
			}else{
				this.showResult($('#r4'));
			}
		},
		showResult:function(element){
			element.css('display','block');
			TweenMax.from(element.find('.result-head'),0.5,{y:500,delay:0});
			TweenMax.from(element.find('.result-title'),0.5,{y:500,delay:0.1});
			TweenMax.from(element.find('.result-gif'),0.5,{y:500,delay:0.2});
			TweenMax.from(element.find('.result-award'),0.5,{y:500,delay:0.3});
			TweenMax.from(element.find('.result-share'),0.5,{y:500,delay:0.4});
			TweenMax.from(element.find('.result-again'),0.5,{y:500,delay:0.4});
			TweenMax.from(element.find('.result-shop'),0.5,{y:500,delay:0.5});
			element.off();
			element.on('click',this.userOperate.bind(this,element));
		},
		userOperate:function(element,event){
			var $target = $(event.target);
			if($target.hasClass('result-share')){
				this.share.show();
			}else if($target.hasClass('result-again')){
				element.css('display','none');
				this.answerList = [];
				$('#q1').css('display','block');
				this.showQuestion($('#q1'),1);
			}else if($target.hasClass('result-shop')){
				location.href= 'http://h5.m.jd.com/active/3gCShXCnp1cBr91avxxhhHzXbDZz/index.html';
			}else{
				return;
			}
		},
		share:{
			show:function(){
				document.getElementById('share').style.display = 'block';
			},
			hide:function(){
				document.getElementById('share').style.display = 'none';
			}
		}
	};
})();

function loadImage(list,index,callback){
	var $img = $(list[index]);
	$img.attr('src',$img.attr('data-src'));
	$img.on('load',function(){
		// $('#blog').text(`第${index}张,${this.src}加载完毕`)
		// console.log(`第${index}张,${this.src}加载完毕`);
		if(index >= list.length - 1){
			// console.log("全部加载完毕");
			callback();
			return;
		}
		loadImage(list,++index,callback);
	});
}

App.initialize();
console.log('JS initialized in version:', App.version);


