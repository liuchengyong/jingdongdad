
var deviceAdapter = require('../common/deviceAdapter');
var attachFastClick = require('fastclick');

(function(){
	'use strict';
	var root = window;
	var App = root.App = window.App || {
		name : 'dreamMoniter',
		version : '0.0.1',
		video:null,
		resizeTimer : null,
		answerList:[],
		questionTitle:['怀宝宝的时候，Ta每天会踢妈妈的肚子几次？','当宝宝跑远了，你最后是怎么抓住Ta的','宝宝最爱玩的球类是？',
		'给宝宝洗澡的时候，Ta','什么时候，你发现宝宝的弹跳能力很出色？','你是怎么发现宝宝有耐力的？'],
		resultsTitle:['你的宝宝未来会拯救中国足球，来测测你的宝宝是什么奥运冠军','你的宝宝未来会成为游泳奥运冠军，来测测你的宝宝是什么奥运冠军',
		'你的宝宝未来会成为田径奥运冠军，来测测你的宝宝是什么奥运冠军','宝宝还有惊人潜能等你开发，来测测你的宝宝是什么奥运冠军'],
		initialize: function(){
			deviceAdapter.setFrontSize();
			root.addEventListener('load',this.pageLoad.bind(this),false);
		},
		pageLoad:function(){
			var imgs = document.querySelectorAll('img[data-src]');
			this.root = $('#app');
			this.video = document.getElementById("music");
			loadImage(imgs,0,this.pageStart.bind(this));
		},
		btnStartInit:function(){
			var S_width = $(window).width() > 500 ? 500 : $(window).width();
			var S_height = $(window).width() > 500 ? 890 : $(window).height();

			var imgLeft = (S_width - 750*S_height/1334)/2;
			$('#main img').css('left',imgLeft+'px');
			$('.question-gif').css('left',imgLeft+'px');
			$('.result-gif').css('left',imgLeft+'px');
			$('.result-loading-content').css('left',imgLeft+'px');

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
				$('#main').remove();
				$this.showQuestion(1);
			});
		},
		pageStart:function(){
			attachFastClick(document.body);
			
			
			$('#share').on('click',this.share.hide);
			$('.musicOpen').on('click',this.videoEvent.close.bind(this));
			$('.musicClose').on('click',this.videoEvent.open.bind(this));

			this.questions = [$('#q1'),$('#q2'),$('#q3'),$('#q4'),$('#q5'),$('#q6')];
			this.results = [$('#r1'),$('#r2'),$('#r3'),$('#r4')];
			this.resultsLoad = $('#resultLoad');

			this.video.play();
			this.btnStartInit();

			$('.question').remove();
			$('.result').remove();
			$('.result-loading').remove();

			$('#load').remove();

			$('#main').css('display','block');
			$('.musicOpen').css('display','block');
			
		},
		showQuestion:function(index){
			document.title = this.questionTitle[index-1];
			wxShare({title:this.questionTitle[index-1]});
			var element = this.questions[index-1];
			this.root.append(element);
			var $this = this;
			TweenMax.staggerFrom(element.find('.item'),0.5,{y:800,},0.1,function(){
				element.find('.question-gif').css('display','block');
				element.data('isClick',false);
				element.on('click',$this.clickNextQuestion.bind($this,index));
			});
		},
		hideQuestion:function(index,callback){
			var element = this.questions[index-1];
			element.off('click');
			element.find('.question-gif').css('display','none');
			TweenMax.staggerTo(element.find('.item'),1,{y:-800,},0.1,callback);
		},
		resetQuestion:function(index){
			TweenMax.set(this.questions[index-1].find('.item'),{y:0});
		},
		clickNextQuestion:function(index,event){
			if(this.questions[index-1].data('isClick')){
				return;
			}
			this.questions[index-1].data('isClick',true);
			var $target = $(event.target);
			var $this = this;
			if($target.hasClass('qestion-a')){
				this.answerList.push('A');
			}else if($target.hasClass('qestion-b')){
				this.answerList.push('B');
			}else if($target.hasClass('qestion-c')){
				this.answerList.push('C');
			}else{
				this.questions[index-1].data('isClick',false);
				return;
			}
			TweenMax.to($target,0.2,{y:10,opacity:0.8,onComplete:function(){
				if(index < 6){
					$this.hideQuestion(index,function(){
						$this.questions[index-1].remove();
						TweenMax.set($target,{y:0,opacity:1});
						$this.resetQuestion(index);
						index++;
						$this.showQuestion(index);
					})
				}else{
					$this.hideQuestion(index,$this.showResultLoading.bind($this,index,$target));
				}
			}});
		},
		showResultLoading:function(index,element){
			this.questions[index-1].remove();
			this.resetQuestion(index);
			TweenMax.set(element,{y:0,opacity:1});
			this.root.append(this.resultsLoad);
			
			var $this = this;
			setTimeout(function(){
				$this.resultsLoad.remove();
				$this.checkResult($this.answerList);
			},2000);
		},
		checkResult:function(list){
			if(list[0] === 'C'){
				this.showResult(1);
			}else if(list[1] === 'C'){
				this.showResult(3);
			}else if(list[2] === 'C'){
				this.showResult(1);
			}else if(list[3] === 'A'){
				this.showResult(2);
			}else if(list[5] === 'A'){
				this.showResult(3);
			}else{
				this.showResult(4);
			}
		},
		showResult:function(index){
			document.title = this.resultsTitle[index-1];
			wxShare({title:this.resultsTitle[index-1]});
			var element = this.results[index-1];
			var $this = this;
			this.root.append(element);
			TweenMax.staggerFrom(element.find('.item'),0.5,{y:800,},0.1,function(){
				element.find('.result-gif').css('display',"block");
				element.data('isClick',false);
				element.on('click',$this.userOperate.bind($this,index));
			});
		},
		userOperate:function(index,event){
			var element = this.results[index-1];
			if(element.data('isClick')){
				return;
			}
			element.data('isClick',true);
			var $target = $(event.target);
			if($target.hasClass('result-share')){
				element.data('isClick',false);
				this.share.show();
			}else if($target.hasClass('result-again')){
				element.off('click');
				element.find('.result-gif').css('display','none');
				element.remove();
				this.answerList = [];
				$('#q1').css('display','block');
				this.showQuestion(1);
			}else if($target.hasClass('result-shop')){
				element.data('isClick',false);
				location.href= 'http://h5.m.jd.com/active/3gCShXCnp1cBr91avxxhhHzXbDZz/index.html';
			}else{
				element.data('isClick',false);
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
		},
		videoEvent:{
			close:function(){
				$('.musicClose').css('display','block');
				$('.musicOpen').css('display','none');
				this.video.pause();
			},
			open:function(){
				$('.musicClose').css('display','none');
				$('.musicOpen').css('display','block');
				this.video.play();
			}
		}
	};
})();

function loadImage(list,index,callback){
	var $img = $(list[index]);
	$img.attr('src','http://obbbnmuwc.bkt.clouddn.com' + $img.attr('data-src'));
	$img.on('load',function(){
		var porgrass = Math.round((index+1)*100/list.length);
		$('#loading-porgrass').text(porgrass + '%');
		if(index >= list.length - 1){
			callback();
			return;
		}
		loadImage(list,++index,callback);
	});
}

App.initialize();
console.log('JS initialized in version:', App.version);


