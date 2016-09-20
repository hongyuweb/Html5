$(document).ready(function () {
	/*banner carousel*/
	var btn = $("#slider-btn li");
	var sliderImg = $("#slider-back p");
	var $bannerTxt = $(".banner-txt");
	var $sliderTxt = $(".slider-txt");
	var $sliderLinkBtn = $(".banner-txt a");
	var iNow = 0;
	btn.each(function (index) {
		$(this).mouseover(function () {
			slide(index);
		});


		$(this).data("index");
	});

	function slide(index) {
		iNow = index;
		btn.eq(index).addClass("slider-active").siblings().removeClass();
		var bannerTxtActive = $bannerTxt.eq(index);
		var slideElements = bannerTxtActive.children();
		bannerTxtActive.siblings(".banner-txt").stop(true).fadeOut(100);
		//初始化
		bannerTxtActive.show();
		slideElements.each(function(){
			var $_self = $(this);
			$_self.css({
				opacity: 0,
				top: $_self.data("start_top")||0,
				left: $_self.data("start_left")||0
			});
			$_self.stop(true).delay(400).animate({
				opacity: 1,
				top: $_self.data("to_top"),
				left: $_self.data("to_left")
			}, 1200);
			if($_self.data("class")!==undefined){
				$_self.removeClass($_self.data("class"));
				setTimeout(function(){
					$_self.addClass($_self.data("class"));
				},0);
			}
		});

		sliderImg.eq(index).siblings().stop().animate({opacity: 0}, 600);
		sliderImg.eq(index).stop().animate({opacity: 1}, 600);

	}

	function autoRun() {
		iNow++;
		if (iNow == btn.length) {
			iNow = 0;
		}
		slide(iNow);
	}

	var timer = setInterval(autoRun, 6000);
	btn.hover(function () {
			clearInterval(timer);
		}, function () {
			timer = setInterval(autoRun, 6000);
		}
	);
	//banner初始化
	slide(0);
	//新闻切换
	var newsParent = $(".news-list");
	var news = newsParent.children("p");
	//news--current
	news.first().css({
		opacity: 1,
		top: 0
	}).siblings().css({
		opacity: 0,
		top: -60
	});

	var newsDown = function () {
		var newsCurrent = newsParent.children(".news--current");
		var nextItem = newsCurrent.next();
		if (nextItem.length == 0) {
			nextItem = newsParent.children().first();
		}

		nextItem.css({
			opacity: 0,
			top: -60
		});


		nextItem.animate({opacity: 1, top: 0}, 200, function () {
			nextItem.addClass("news--current");
		});
		newsCurrent.animate({opacity: 0, top: 60}, 200, function () {
			newsCurrent.removeClass("news--current");
		});
	};
	var newsUp = function () {
		var newsCurrent = newsParent.children(".news--current");
		var nextItem = newsCurrent.prev();
		if (nextItem.length == 0) {
			nextItem = newsParent.children().last();
		}

		nextItem.css({
			opacity: 0,
			top: 60
		});

		nextItem.animate({opacity: 1, top: 0}, 200, function () {
			nextItem.addClass("news--current");
		});
		newsCurrent.animate({opacity: 0, top: -60}, 200, function () {
			newsCurrent.removeClass("news--current");
		});
	};

	var newsIntervalId = null;
	function newsAuto() {
		clearInterval(newsIntervalId);
		newsIntervalId = setInterval(newsDown, 4000);
	}
	newsAuto();
	$(".news-left").hover(function(){
		clearInterval(newsIntervalId);
	},function() {
		newsAuto();
	});

	$("#prev-news").click(function () {
		newsUp();
	}).hover(function(){
		clearInterval(newsIntervalId);
	},function() {
		newsAuto();
	});

	$("#next-news").click(function () {
		newsDown();
	}).hover(function(){
			clearInterval(newsIntervalId);
	},function() {
			newsAuto();
	});


	//解决方案cover进入动画
	$(".solution-block").hover(function () {
		$(this).children(".covers").stop(true, true).delay(300).animate({"z-index": 10}, 10).animate({
			"top": 0,
			opacity: 1
		}, 300);
	}, function () {
		$(this).children(".covers").stop(true, true).animate({
			"top": 279,
		}, 400).animate({"z-index": -5}, 10);
	});


});

//页面滚动到视频链接位置时 banner出现动画
$(function () {
	$(window).scroll(function () {
		var videoBanner = $(".video-link");
		var videoBannerShowPosition = videoBanner.prev().offset().top - window.innerHeight + 200;
		if ($(window).scrollTop() > videoBannerShowPosition) {
			videoBanner.slideDown(300);
			$(".video-text").animate({
				opacity: 1,
				top: 20
			},1000);
			$(".v-btn").animate({
				opacity:1,
				top:100
			},1200);
		}
	});
});
//顶部导航
$(function () {
		/*导航按钮添加删除*/
		$("#Nav").hover(function(){
			$("#Nav a").removeClass("Nav_current")
		},function(){
			$("#Nav a").eq(0).addClass("Nav_current")
		})
		/*登录按钮添加删除*/
		$(" #login_box .reg_btn").hover(function(){
			$("#login_box a").removeClass("login_btn")
		},function(){
			$("#login_box a").addClass("login_btn")
		})
})
//浮动窗口
$(function(){ 
	$('.online,#popup_1').hover(function(){ 
		$("#popup_1").show()
	},function(){ 
		$("#popup_1").hide()
	}); 
	$('.QR_box,#popup_2').hover(function(){ 
		$("#popup_2").show()
	},function(){ 
		$("#popup_2").hide()
	}); 
}); 
//返回顶部
$(function(){	
var $toTop = $("#toTop");
$(document).scroll(function(){ 
	var  scrollTop =  $(document).scrollTop(),bodyHeight = $(".header").height(); 
	if(scrollTop > bodyHeight){ 
		$('#toTop').css('display','block');
	}else{
		$('#toTop').css('display','none');
	} 
})
	$toTop.click(function () {
		$('body,html').stop().animate({scrollTop: 0}, 300);
		return false;
	});
})

//我的客户
$(function(){	
var speed=10; //数字越大速度越慢 
var tab=document.getElementById("customer"); 
var tab1=document.getElementById("customer_1"); 
var tab2=document.getElementById("customer_2"); 
tab2.innerHTML=tab1.innerHTML; 
function Marquee(){ 
if(tab2.offsetWidth-tab.scrollLeft<=0) 
tab.scrollLeft-=tab1.offsetWidth 
else{ 
tab.scrollLeft++; 
} 
} 
var MyMar=setInterval(Marquee,speed); 
tab.onmouseover=function() {clearInterval(MyMar)}; 
tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
})

//功能显示二维码
$(function(){	
	var n
	$(".function dd").hover(function(){
		n=$(".function dd").index($(this))
		$(".function dd .QR").eq(n).show(100)
	},function(){
		$(".function dd .QR").eq(n).hide(40)
	})
})
//优势
$(function(){ 
	$('.advantage_icon img').mouseenter(function(){ 
		var wValue=1.2 * $(this).width(); 
		var hValue=1.2 * $(this).height(); 
	$(this).animate({
		width: wValue, 
		height: hValue, 
		left:("-"+(0.2 * $(this).width())/2), 
		top:("-"+(0.2 * $(this).height())/2)}, 200); 
	}).mouseleave(function(){ 
	$(this).animate({
		width: "120", 
		height: "120", 
		left:"0px", 
		top:"0px"}, 200 ); 
	}); 
}); 