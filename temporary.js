(function(factory){
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(window['jQuery'] || window['Zepto']);
	}
})(function($){

	/* 
var ratio = 750/1250;
	var width = $('html').width();
	var height = $('html').height();
	var realRatio = width/height;
	if (realRatio <= ratio) {
		$("#canvasa").addClass("widCan");
		$("#app").addClass("widCan");
		var oCanHei = width/ratio;
		$("#app").css({height:oCanHei+"px"});
	} else {
		$("#canvasa").addClass("heiCan");
		$("#app").addClass("heiCan");
		var oCanWid = ratio*height;
		$("#app").css({width:oCanWid+"px"});
	}
	*/

	function loadEndFn(){
		H5.share( shareData );		//share
		H5.music();			//music



		



	}

	function preventDefault(ev) {
		ev.preventDefault();
		return false;
	}
	$('#app')[0].addEventListener('touchmove', preventDefault, false);
	$('#app')[0].addEventListener('touchstart', preventDefault, false);

	$('.wordimg-bg')[0].addEventListener('touchmove', preventDefault, false);
	$('.wordimg-bg')[0].addEventListener('touchstart', preventDefault, false);

	$('.people-img')[0].addEventListener('touchmove', preventDefault, false);
	$('.people-img')[0].addEventListener('touchstart', preventDefault, false);

	$('.bornbox-bg')[0].addEventListener('touchmove', preventDefault, false);
	$('.bornbox-bg')[0].addEventListener('touchstart', preventDefault, false);

	var dev = /dev|10.236./.test(location.href);
	
	var pubPath = dev ? 'static/images/' : 'http://static.ws.126.net/f2e/auto/h5_special/180713h5_gqcq_10year/static/images/';

	console.log(pubPath);

	function Nyphile(){
		this.btntimer = setInterval(function () {
			$('#btnimg').addClass("btndown");
			setTimeout(function () {
				$('#btnimg').removeClass("btndown");
			},250);
		},500);
		this.canvas = $("#canvasa")[0];
		this.ctx = this.canvas.getContext("2d");
		this.imgList = [
		{
			link : pubPath+"p1.jpg",
			imgW : "750",
			imgH : "1250"
		},
		{
			link : pubPath+"p2_3.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "272",
			areaH: "450",
			areaL: "1223",
			areaT: "1806"
		},
		{
			link : pubPath+"p3_4.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "152",
			areaH: "246",
			areaL: "900",
			areaT: "1876"
		},
		{
			link : pubPath+"p4_3.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "117",
			areaH: "186",
			areaL: "999",
			areaT: "1780"
		},
		{
			link : pubPath+"p5.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "466",
			areaH: "751",
			areaL: "1176",
			areaT: "1431"
		},
		{
			link : pubPath+"p6_6.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "78",
			areaH: "127",
			areaL: "1075",
			areaT: "1408"
		},
		{
			link : pubPath+"p7_5.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "150",
			areaH: "241",
			areaL: "1056",
			areaT: "1172"
		},
		{
			link : pubPath+"p8_4.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "62",
			areaH: "102",
			areaL: "708",
			areaT: "1508"
		},
		{
			link : pubPath+"p9_4.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "440",
			areaH: "709",
			areaL: "1410",
			areaT: "1423"
		},
		{
			link : pubPath+"p10_4.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "236",
			areaH: "379",
			areaL: "1436",
			areaT: "2329"
		},
		{
			link : pubPath+"p11.jpg",
			imgW : "1875",
			imgH : "3015",
			areaW: "230",
			areaH: "371",
			areaL: "1008",
			areaT: "2259"
		}
		];
		this.imgAuto = function () {

		}
		this.ratio = 1;
		this.index = 0;
		this.fps = 60;
		this.scale = 0.990;
		this.scaleSlow = 0.993;
		this.scaleReturn = 0.8;
		this.w = 750;
		this.h = 1206;
		this.gif_timer = null;
		this.imgs = [pubPath+"start.png",
		pubPath+"btnface_2.png",
		pubPath+"btnback.png",
		pubPath+"againbtn.png",
		pubPath+"btns_bg.png",
		pubPath+"sharebtn.png",
		pubPath+"words.png",
		];
	}
	Nyphile.prototype.initCanvas = function(){};
	Nyphile.prototype.preImg = function(list){

		var loadedimages = 0, self = this;
		var postaction = function(){}  
		var arr = list;
		function imageloadpost(){
			loadedimages++
			if(loadedimages == arr.length ){
				postaction()
			}
		}
		for (var i=0; i<arr.length; i++){
			var img = new Image();
			img.src = arr[i];
			img.onload = function(){
				imageloadpost()
			}


			img.onerror = function(){
				console.log("img失败"+this.i)
				imageloadpost()
			}
		}
		return {
			done:function(f){
				postaction=f || postaction
			}
		}//图片加载完成的回调
	}
	Nyphile.prototype.preload = function(){

		var loadedimages = 0, self = this;
		var postaction = function(){}  
		var arr = this.imgList;
		function imageloadpost(){
			loadedimages++
			if(loadedimages == arr.length ){
				postaction(self.imgList)
			}
		}
		for (var i=0; i<arr.length; i++){
			this.imgList[i].image = new Image();
			this.imgList[i].image.src = arr[i].link;
			this.imgList[i].image.i = i;
			this.imgList[i].image.name = i;
			this.imgList[i].image.className = "item";
			this.imgList[i].image.onload = function(){
				$(".collection").append(self.imgList[this.i].image)
				imageloadpost()

			}


			this.imgList[i].image.onerror = function(){

				console.log("失败"+this.i)
				imageloadpost()
				$(".collection").append(self.imgList[this.i].image)

			}
		}
		return {
			done:function(f){
				postaction=f || postaction
			}
		}//加载完成的回调
	}
	Nyphile.prototype.return = function(){
		var self = this;
		this.hideend();//隐藏最后页面

		var then = new Date().getTime();
		clearInterval(this.gif_timer)
		cancelAnimationFrame(this.timer)
		self.timer = requestAnimationFrame(doAnimation);
		function doAnimation(){
			var now = new Date().getTime();
			if(self.index == -1){
				self.index = 0;
				self.showCover();
				return;
			}
			if(now - then < 1000/self.fps){

				self.timer = requestAnimationFrame(doAnimation)
				return;
			}

			then = now;

			self.ratio = 1 / self.scaleReturn * self.ratio

			self.timer = requestAnimationFrame(doAnimation)
			self.drawReturn();
		}
	}
	Nyphile.prototype.init = function(){
		
		var self = this;

		this.initCanvas();//为空方法
		this.preload().done(function(){
			self.preImg(self.imgs).done(function(){
				H5.share( shareData );		//share
				H5.music();			//music
				$(".loading").hide();//等待图片加载的图层消失，打鼓的图层

				self.domList = $(".collection .item").sort(function(a,b){
					return a.name - b.name;
				})//获取图片的dom列表并且根据name升序排序

				self.img_oversize = self.domList[self.index + 1].image;//获取超出屏幕的图片，也就是下面的图片
				self.img_minisize = self.domList[self.index].image;//获取在屏幕内的图片，也就是上面的图片
				self.draw();

				$("#btn").bind("touchstart", self.touchHandler.bind(self));
				$("#btn").bind("touchend", self.touchendHandler.bind(self));
			})

		});

		$(".return").bind("touchend", self.return.bind(self));//在看一遍
		$(".toimg").bind("touchend",function () {
			$(".wordimg-box").show();
		});

		var oBornBtn = document.getElementsByClassName('bornbtn-gaga')[0];

		var oEndInput = document.getElementById('endinput');
		var oBtnBox = document.getElementsByClassName('btns-box')[0];var oWarnwordsBox = document.getElementsByClassName('warnwords-box')[0];
		var oBornimg = document.getElementsByClassName('bornimg')[0];
		var oBornimgBoxOut = document.getElementsByClassName('bornimg-box-out')[0];

		

		oBornBtn.addEventListener('click',function (ev) {
			
			var reg    = new RegExp(NETEASE_KEYWORDS, "g");
			var value = oEndInput.value;
			
			if (value == "") {
				alert("请输入内容");
			} else {
				var result = reg.test(value);
				if (false) {
					alert("不该这么写吧！");
					return;
				} else {

					oBtnBox.style.display = "none";
					var opt = {
						backgroundColor: "transparent"
					}
					html2canvas(document.querySelector("#wordimg"), opt).then(function (canvas) {


						var data = canvas.toDataURL();
						if (H5.device.isNewApp) {

							oWarnwordsBox.innerHTML = "截屏保存图片，赢大礼";

						}

						oBornimg.setAttribute("src", data);

						oBornimgBoxOut.style.display = "block";

					});

				}

				


			}

			ev.preventDefault();
			return false;
		})



		$("#endinput").focus(function () {
			$(".endwords").hide();
		});

		$(".intro").click(function () {
			$(".introwords-box").show();
		});

		$(".closebtns").click(function () {
			$(".introwords-box").hide();
		})


		
	}
	Nyphile.prototype.touchendHandler = function(e){
		e.stopPropagation();e.preventDefault();
		var self = this;






		$('#btnimg').removeClass("btndown");

		if(self.imgList[self.index + 1] && self.imgList[self.index + 1].gif){
			self.willPause = true;



		}else{
			self.willPause = false;
			cancelAnimationFrame(this.timer)
		}
	}
	Nyphile.prototype.touchHandler = function(e){
		e.stopPropagation();e.preventDefault();//阻止默认事件
		clearInterval(this.btntimer);//清除按钮运动
		cancelAnimationFrame(this.timer) //清除动画执行函数
		this.willPause = false; //

		$("#btnimg").addClass('btndown');
		$("#start").hide();



		var self = this;
		var then = new Date().getTime(); // 获取当前的时间戳
		clearInterval(this.gif_timer)
		self.timer = requestAnimationFrame(doAnimation);
		function doAnimation(){
			var now = new Date().getTime();
			if(self.index + 1 == self.imgList.length){

				return;
			}//如果没图片了停止执行
			if(now - then < 1000/self.fps){

				self.timer = requestAnimationFrame(doAnimation)
				return;
			}//如果执行当前函数记录的时间戳与未执行前记录的时间戳差值小于60Hz的间隔将返回从新执行

			then = now;

			if(self.imgList[self.index+1].limitMax && self.imgList[self.index+1].limitMin && self.ratio < self.imgList[self.index+1].limitMax && self.ratio > self.imgList[self.index+1].limitMin){
				self.ratio = self.scaleSlow * self.ratio
			}else{

				self.ratio = self.scale * self.ratio
			}
			self.timer = requestAnimationFrame(doAnimation)
			self.draw()
		}
	}
	Nyphile.prototype.draw = function(){

		if(this.index + 1 == this.imgList.length){
			return;
		}
		if(this.ratio < this.imgList[this.index+1].areaW/this.imgList[this.index+1].imgW){


			if(this.willPause){
				this.ratio = this.imgList[this.index+1].areaW/this.imgList[this.index+1].imgW
				cancelAnimationFrame(this.timer);


			}else{
				console.log(this.ratio)
				this.index++;
				this.ratio = 1;
				if(!this.imgList[this.index + 1]){

					this.showend();
					return;
				}
			}
		}
		this.imgNext = this.imgList[this.index + 1], this.imgCur = this.imgList[this.index];
		this.img_oversize = this.domList[this.index + 1]
		this.img_minisize = this.domList[this.index]
		this.drawImgOversize(this.img_oversize, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.ratio)
		this.drawImgMinisize(this.img_minisize, this.imgCur.imgW,  this.imgCur.imgH, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.ratio)
	}
	Nyphile.prototype.showCover = function(){


		$("#btn").show();
		$("#start").show();
		this.ratio = 1;
	}
	Nyphile.prototype.drawReturn = function(){

		if(this.ratio > 1){
			this.index--;
			this.ratio = this.imgList[this.index+1].areaW/this.imgList[this.index+1].imgW
		}

		if(this.index == -1){
			this.index = 0;
			this.showCover();
			cancelAnimationFrame(this.timer)
			return;
		}

		this.imgNext = this.imgList[this.index + 1], this.imgCur = this.imgList[this.index];
		this.img_oversize = this.domList[this.index + 1]
		this.img_minisize = this.domList[this.index]
		this.drawImgOversize(this.img_oversize, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.ratio)
		this.drawImgMinisize(this.img_minisize, this.imgCur.imgW,  this.imgCur.imgH, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.ratio)
	}
	Nyphile.prototype.hideend = function(){


		$(".endpage").hide();
		$(".word-box").removeClass("active");
		$(".btn-box").removeClass("active");
		$(".share").removeClass("active");
		$(".return").removeClass("active");
		$(".toimg").removeClass("active");
	}
	Nyphile.prototype.showend = function(){






		$("#btn").hide();
		$(".endpage").show();
		setTimeout(function () {
			$(".word-box").addClass("active");
			setTimeout(function () {
				$(".btn-box").addClass("active");
				setTimeout(function () {
					$(".share").addClass("active");
					setTimeout(function () {
						$(".return").addClass("active");
						setTimeout(function () {
							$(".toimg").addClass("active");
						},300);
					},300);
				},300);
			},300);
		},50)
	}
	Nyphile.prototype.drawImgOversize = function (img,imgW,imgH,areaW,areaH,areaL,areaT,ratio){
		this.ctx.drawImage(img, areaL-(areaW/ratio-areaW)*(areaL/(imgW-areaW)), areaT-(areaH/ratio-areaH)*(areaT/(imgH-areaH)), areaW/ratio, areaH/ratio, 0, 0, 750, 1250)
		/* 
		后面图层的
		sx = areaL-(areaW/ratio-areaW)*(areaL/(imgW-areaW));
		sy = areaT-(areaH/ratio-areaH)*(areaT/(imgH-areaH));
		sWidth = areaW/ratio;
		sHeight = areaH/ratio;
		dx = 0;
		dy = 0;
		dWidth = 750;
		dHeight = 1206;
		*/
	}
	Nyphile.prototype.drawImgMinisize = function (img,imgW,imgH,nxtImgW,nxtImgH,areaW,areaH,areaL,areaT,ratio){
		this.ctx.drawImage(img, 0, 0, imgW, imgH, (areaW/ratio-areaW)*(areaL/(nxtImgW-areaW))*ratio*750/areaW, (areaH/ratio-areaH)*(areaT/(nxtImgH-areaH))*ratio*1250/areaH, 750*ratio, 1250*ratio)

		/* 
		img : 为当前的图片，也就是前面的图层图片
		imgW : 当前图片的~
		imgH : 当前图片的~
		nxtImgW : 后面图片的~
		nxtImgH : 后面图片的~
		areaW : 后面图片的~
		areaH : 后面图片的~
		areaL : 后面图片的~
		areaT : 后面图片的~
		
		前面图层的
		sx = 0;
		sy = 0;
		sWidth = imgW;
		sHeight = imgH;
		dx = (areaW/ratio-areaW)*(areaL/(nxtImgW-areaW))*ratio*750/areaW;
		dx化简 (areaL/(nxtImgW-areaW))*(750-dWidth);
		dy = (areaH/ratio-areaH)*(areaT/(nxtImgH-areaH))*ratio*1206/areaH;
		dy化简 dy = (areaT/(nxtImgH-areaH))*(1206 - dHeight);
		dWidth = 750*ratio;
		dHeight = 1206*ratio;
		*/
	}
	Nyphile.prototype.playMusic = function (index) {

		if (index == 3) {

		}
	}
	window.nyphile = new Nyphile();
	nyphile.init();
})