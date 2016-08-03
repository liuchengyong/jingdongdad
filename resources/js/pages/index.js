
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
		question:['怀宝宝的时候，Ta每天会踢妈妈的肚子几次？','当宝宝跑远了，你最后是怎么抓住Ta的','宝宝最爱玩的球类是？',
		'给宝宝洗澡的时候，Ta','什么时候，你发现宝宝的弹跳能力很出色？','你是怎么发现宝宝有耐力的？'],
		results:['我的宝宝未来会拯救中国足球，来测测你的宝宝是什么奥运冠军','我的宝宝未来会成为游泳奥运冠军，来测测你的宝宝是什么奥运冠军',
		'我的宝宝未来会成为田径奥运冠军，来测测你的宝宝是什么奥运冠军','宝宝还有惊人潜能等你开发，来测测你的宝宝是什么奥运冠军'],
		initialize: function(){
			root.addEventListener('load',this.pageLoad.bind(this),false);
			// this.showResult($('#r4'));
		},
		pageLoad:function(){
			deviceAdapter.setFrontSize();
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
			document.title = this.question[index-1];
			element.css('display','block');
			TweenMax.from(element.find('.question-title'),0.5,{y:1000,delay:0});
			TweenMax.from(element.find('.question-text'),0.5,{y:1000,delay:0.1});
			TweenMax.from(element.find('.question-gif'),0.5,{y:1000,delay:0.2});
			TweenMax.from(element.find('.qestion-a'),0.5,{y:1000,delay:0.3});
			TweenMax.from(element.find('.qestion-b'),0.5,{y:1000,delay:0.4});
			TweenMax.from(element.find('.qestion-c'),0.5,{y:1000,delay:0.5});
			
			element.on('click',this.clickNextQuestion.bind(this,index));
		},
		hideQuestion:function(element,callback){
			TweenMax.to(element.find('.question-title'),0.5,{y:-1000,delay:0});
			TweenMax.to(element.find('.question-text'),0.5,{y:-1000,delay:0.1});
			TweenMax.to(element.find('.question-gif'),0.5,{y:-1000,delay:0.2});
			TweenMax.to(element.find('.qestion-a'),0.5,{y:-1000,delay:0.3});
			TweenMax.to(element.find('.qestion-b'),0.5,{y:-1000,delay:0.4});
			TweenMax.to(element.find('.qestion-c'),0.5,{y:-1000,delay:0.5,onComplete:callback});
			element.off();
		},
		resetQuestion:function(element){
			TweenMax.set(element.find('.question-title'),{y:0});
			TweenMax.set(element.find('.question-text'),{y:0});
			TweenMax.set(element.find('.question-gif'),{y:0});
			TweenMax.set(element.find('.qestion-a'),{y:0});
			TweenMax.set(element.find('.qestion-b'),{y:0});
			TweenMax.set(element.find('.qestion-c'),{y:0});
		},
		clickNextQuestion:function(index,event){
			var $target = $(event.target);
			var $this = this;
			if($target.hasClass('qestion-a')){
				this.answerList.push('A');
			}else if($target.hasClass('qestion-b')){
				this.answerList.push('B');
			}else if($target.hasClass('qestion-c')){
				this.answerList.push('C');
			}else{
				return;
			}
			TweenMax.to($target,0.1,{y:10,opacity:0.8,onComplete:function(){
				if(index < 6){
					$this.hideQuestion($('#q' + index),function(){
						$('#q' + index).css('display','none');
						TweenMax.set($target,{y:0,opacity:1});
						$this.resetQuestion($('#q' + index));
						index++;
						$('#q' + index).css('display','block');
						$this.showQuestion($('#q' + index),index);
					})
					
				}else{
					$this.hideQuestion($('#q' + index),function(){
						$('#q' + index).css('display','none');
						TweenMax.set($target,{y:0,opacity:1});
						$this.resetQuestion($('#q' + index));
						console.log($this.answerList);
						$this.checkResult($this.answerList);
					});
				}
			}});
			
		},
		checkResult:function(list){
			if(list[0] === 'C'){
				this.showResult($('#r1'),1);
			}else if(list[1] === 'C'){
				this.showResult($('#r3'),3);
			}else if(list[2] === 'C'){
				this.showResult($('#r1'),1);
			}else if(list[3] === 'A'){
				this.showResult($('#r2'),2);
			}else if(list[5] === 'A'){
				this.showResult($('#r3'),3);
			}else{
				this.showResult($('#r4'),4);
			}
		},
		showResult:function(element,index){
			document.title = this.results[index-1];
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
	console.log('http://obbbnmuwc.bkt.clouddn.com' + $img.attr('data-src'));
	$img.attr('src','http://obbbnmuwc.bkt.clouddn.com' + $img.attr('data-src'));
	$img.on('load',function(){
		// $('#blog').text(`第${index}张,${this.src}加载完毕`)
		// console.log(`第${index}张,${this.src}加载完毕`);
		var porgrass = Math.round((index+1)*100/list.length);
		$('#loading-porgrass').text(porgrass + '%');
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


