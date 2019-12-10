//layer
+function ($) {
    $.commonLayer = function (options) {
        var default_options = {
            addclass:"",
            title: "",
            content: "",
        };
        var opts = $.extend(default_options, options);
         var l_win = "<div class='common-layer " +opts.addclass + "'>";
        if (opts.title && opts.title != "") {
            l_win += "<div class='common-layer-title common-layer-title-v'>" + opts.title + " <i class='iconfont common-layer-close'>&#xe610;</i></div>";
        }
        else {
            l_win += "<div class='common-layer-title '> <i class='iconfont common-layer-close'>&#xe610;</i></div>";
        }
         l_win += "<div class='common-layer-main'>" + opts.content + "</div>";
        //按钮
        if (opts.btns && opts.btns.length > 0) {
            l_win += "<div class='common-layer-btns'>";
            for (var i = 0; i < opts.btns.length; i++) {
            (function(i){
                var b = opts.btns[i];
                if (b.url && b.url != "") {
                    l_win += "<a href='" + b.url + "' class='common-layer-btn common-btn-" + b.style + "'id='layer-btn-order" + i + "'>" + b.title + "</a>";
                }
                else {
                   l_win += "<a href='javascript:' class='common-layer-btn common-btn-" + b.style + " layer-btn-sort-" + i + "'id='layer-btn-order" + i + "'>" + b.title + "</a>";
                   if (typeof b.onclick === "function") {
                             $(document).off("click","#layer-btn-order" + i);//去除click事件
                             $(document).on("click", "#layer-btn-order" + i, function () {
                                b.onclick();

                           });
                    }
                    else {
                          $(document).off("click","#layer-btn-order" + i);
                         $(document).on("click", "#layer-btn-order" + i, function () {
                            $.commonLayer.close();
                        });
                    }
                }
                 })(i);
            }
            l_win += "</div>";
        }
        $("body").append("<div class='common-layer-shadow'></div>");
        $("body").append(l_win);
        $("body").addClass("body-mode");
        $(document).on("click", ".common-layer-close,.common-layer-shadow", function () {
            $.commonLayer.close();
        });
        tipShow();
    }
    $.commonLayer.close = function () {
        $(".common-layer-shadow").remove();
        $(".common-layer").remove();
        $("body").removeClass("body-mode");
    }
    function tipShow(){
       var $form=$(".common-form-group");
      $form.each(function() {
          var k= $(this).find(".common-input").val();
          if($.trim(k) == ""){
                $(this).find(".common-notice").show();
          }else{
              $(this).find(".common-notice").hide();
            }
        });
    }
}(jQuery);
//select
+function ($) {
	$(document).on("click",".common-select .common-select-toggle",function(){
				var selected=$(this).hasClass("is-selected"),
				 $select =$(this).siblings("select"),
				 $sib=$(this).siblings(".common-selct-list"),
				 $par=$(this).parent(".common-select"),
				 tf= $par.hasClass("common-s-open"),
				 $icon=$(this).find(".icon-xiala"),				 
				  $span=$(this).find(".common-input");
				   $par.removeClass("error");
				   $par.find(".common-error").text("");
				  minW=$span.outerWidth();
				 if (!$select || $select.length <= 0) return;
				   var $ul = $sib.find(".select-list");
			        if (!$ul || $ul.length <= 0) return;
			        var options = $select.find("option");
			        if (!options || options.length <= 0) return;
			         $(".common-select .common-selct-list").slideUp(300,function(){
		              $(".common-select").removeClass("common-s-open");
		             });
			         	$(".common-select .icon-xiala").removeClass("icon-rotatet");
				if(selected){
				}else{
					$sib.css("min-width",minW);	
					//$sib.prepend('<i class="common-select-arrow"></i>');
					for (var i = 0; i < options.length; i++) {
			            var v = $(options[i]).attr("value"),
			             t = $(options[i]).text(),
			             b=$(options[i]).attr("selected");
			            if(b=="selected"){
			            	  $ul.append("<li data-value=\"" + v + "\" class='on'>" + t + "</li>");
			            }else{
			            $ul.append("<li data-value=\"" + v + "\">" + t + "</li>");
			            }
		             }
		              $sib.find(".common-select-arrow").show();
		             $sib.slideDown(300,function(){
		             	$par.addClass("common-s-open");
		             });

		             $(this).addClass("is-selected");
				}
				if(tf){
					$sib.find(".common-select-arrow").hide();
			          $sib.slideUp(300,function(){
		                 $par.removeClass("common-s-open");

		              });

			         	$icon.removeClass("icon-rotatet");
			       }else{
			       		$sib.find(".common-select-arrow").show();
			         	$sib.slideDown(300,function(){
		             	   $par.addClass("common-s-open");
		                });

			         	$icon.addClass("icon-rotatet");
			         }
			});
		$(document).on("click",".common-select .common-selct-list li",function(){
				var $pars=$(this).parents(".common-selct-list");
				var $parss=$pars.parent(".common-select");
				var $sibs=$pars.siblings(".common-select-toggle");
				var $span=$sibs.find(".common-input");
				var $icon=$sibs.find(".icon-xiala");
				$(this).addClass("on").siblings().removeClass("on");
				var t=$(this).text();
				$span.val(t);
				$pars.slideUp(300,function(){
					$parss.removeClass("common-s-open");
				});				
				$icon.removeClass("icon-rotatet");
				if($span.hasClass("on")) return;
				//$span.addClass("on");
				
			});
		$(document).on("click",function(e){
		 if($(e.target).closest(".common-select").length == 0){
			$(".common-select").removeClass("common-s-open");
			$(".common-select .common-selct-list").slideUp(300);
			$(".common-select .icon-xiala").removeClass("icon-rotatet");
            }
		});
}(jQuery);
//placeholder
//表单输入框模拟的placeholder的效果
+function ($) {
     var $form=$(".common-form-group");
      $form.each(function() {
          var k= $(this).find(".common-input").val();
          if($.trim(k) == ""){
                $(this).find(".common-notice").show();
          }else{
              $(this).find(".common-notice").hide();
            }
        });
     $(document).on("click",".common-notice",function(){
          $(this).siblings(".common-input").focus();
         });
    $(document).on("focus",".common-input",function(){
          var key = $(this).val();
            if ($.trim(key) == "") {
            }else{
                 $(this).siblings(".common-notice").hide();
                }
         });
    $(document).on("blur",".common-input",function(){
           var key = $(this).val();
            if ($.trim(key) == "") {
            }else{
                 $(this).siblings(".common-notice").hide();
                }
         });
    $(document).on("input propertychange keyup keydown",".common-input",function(){
          var key = $(this).val();
            if ($.trim(key) == "") {
                 $(this).siblings(".common-notice").show();
            }
            else {
                $(this).siblings(".common-notice").hide();
            }
            //已经输入框已经有错误提示后再次输入时提示框消失
            var $par=$(this).parent(".common-form"),
            $sib=$(this).siblings(".common-error"),
             isError=$par.hasClass("common-has-error");
            if(isError){
                $sib.empty();
                $par.removeClass("common-has-error");
                }

        });
}(jQuery);

/**
 * 检测浏览器版本
 */
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}




/**
 * radio and checkbox
 */
// radio
+
function($) {
    var radioarr = $(".jyb-radio-group label");
    $.each(radioarr, function() {
        if ($(this).hasClass("checked")) {
            $(this).find(".iconfont").html("&#xe794;");
        } else {
            $(this).find(".iconfont").html("&#xe795;");
        }
    })

    $(document).on("click", ".jyb-radio-group label", function(e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            return;
        }
        $(this).addClass('checked').siblings().removeClass('checked');
        $(this).find(".iconfont").html("&#xe794;");
        $(this).siblings().find(".iconfont").html("&#xe795;");
    })
    var checkboxarr = $(".jyb-checkbox-group label");
    $.each(checkboxarr, function() {
        if ($(this).hasClass("checked")) {
            $(this).find(".iconfont").html("&#xe796;");
        } else {
            $(this).find(".iconfont").html("&#xe798;");
        }
    })

    $(document).on("click", ".jyb-checkbox-group label", function(e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            return;
        }
        if ($(this).hasClass("checked")) {
            $(this).removeClass("checked").find(".iconfont").html("&#xe798;");
        } else {
            $(this).addClass("checked").find(".iconfont").html("&#xe796;");
        }
    })
}(jQuery);
/**
 * 手机相册查看大图
 * */

+
function($) {
    jQuery.extend({
        jybWatchBigPic: function(_this, hasnav) { // hasnav-是否有底部导航
            var $this = $(_this),
                $idx = Number($this.attr("data-swiper-slide-index")) + 1, // 查看的当前图片序号
                $title = $this.find("p").text(), // 当前图片标题
                $flag = 0,
                $pars = $this.parents('.m-watch-big-photo'), // swiper-container 父级
                $swiperbox = $pars.find(".swiper-container"), // swiper
                $swiperclone = $swiperbox.clone(); // 复制swiper
            if (hasnav) {
                var $clonegroup = $this.attr("data-group"), // nav分组number
                    $bannernav = $pars.find(".m-banner-nav-container"), // nav
                    $bannernavclone = $bannernav.clone(); // 复制 nav
            }

            var bigphotostr = '<div class="m-pop-big-photo hide">' +
                '<div class="m-pop-big-photo-top clearfloat">' +
                '<a class="m-pop-close-btn fl flex-box" href="javascript:;">' +
                '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve">' +
                '<path class="svgcfff" d="M8.5,12l8.7-8.2c0.4-0.4,0.5-1.1,0-1.6c-0.4-0.4-1.1-0.5-1.6,0l-9.5,9c-0.2,0.2-0.3,0.5-0.3,0.8 s0.1,0.6,0.3,0.8l9.5,9c0.2,0.2,0.5,0.3,0.8,0.3c0.3,0,0.6-0.1,0.8-0.3c0.4-0.4,0.4-1.1,0-1.6L8.5,12z"></path>' +
                '</svg>' +
                '</a>' +
                '<p class="m-pop-big-photo-title"></p>' +
                '</div>' +
                '<div class="m-pop-big-photo-swiper m-watch-big-photo"></div>' +
                '<div class="m-pop-big-photo-nav"></div>' +
                '</div>';
            $('body').append(bigphotostr);

            $(".m-pop-big-photo-title").html($title); // 填充标题
            $(".m-pop-big-photo-swiper").html($swiperclone); // 填充swiper

            if (hasnav) {
                $('.m-pop-big-photo-nav').html($bannernavclone); // 填充nav
            }
            $(".m-pop-big-photo").show();
            var mpopbigphotoswiper = new Swiper('.m-pop-big-photo-swiper .swiper-container', {
                pagination: '.m-pop-big-photo-swiper .swiper-pagination',
               	paginationType : 'fraction',
//              pagination: {
//				    el: '.m-pop-big-photo-swiper .swiper-pagination',
//				    type: 'fraction',
//				}, //适用于swiper.4x以上的
                loop: true, // 循环
                zoom: true, // 焦距功能：双击slide会放大，并且在手机端可双指触摸缩放。
                autoplayDisableOnInteraction: false,
                onSlideChangeEnd: function(swiper) {
                    var $par = $('.m-pop-big-photo-swiper .swiper-container'),
                        $slide = $par.find(".swiper-slide-active"), // 当前item
                        $thistitle = $slide.find("p").text(); // 标题

                    if (hasnav) {
                        var $group = $slide.attr("data-group"), // nav 分组
                            $nav = $(".m-pop-big-photo-nav .m-banner-nav-container"), // nav
                            $navitem = $nav.find("li"); // nav item
                        $navitem.removeClass("active").eq($group).addClass("active"); // nav active
                    }


                    if ($flag != 0) {
                        $(".m-pop-big-photo-title").text($thistitle);
                    }
                    $flag++;
                },
            });
            mpopbigphotoswiper.slideTo($idx,0);
            
            
            if (hasnav) {
                $('.m-pop-big-photo-nav li').removeClass("active").eq($clonegroup).addClass("active"); // 分组
            }
            //如果只有一个slide就锁住swiper
            if (mpopbigphotoswiper.slides.length <= 3) {
                mpopbigphotoswiper.lockSwipes();
            }

            $(document).on("click", ".m-pop-close-btn", function() {
                var $this = $(this),
                    $par = $this.parents('.m-pop-big-photo');
                $par.remove();
            }).on("click", ".m-pop-big-photo-nav .m-banner-nav-container li", function() { // pop photos nav-item click
                var $this = $(this),
                    $group = $this.index(),
                    $swiperlist = $(".m-pop-big-photo-swiper .swiper-container .swiper-slide");
                $this.addClass("active").siblings().removeClass("active");
                for (var i = 1, len = $swiperlist.length - 1; i < len; i++) {
                    if ($group == $($swiperlist[i]).attr("data-group")) {
                        mpopbigphotoswiper.slideTo(i, 300);
                        return;
                    }
                }
            })
        }
    });
}(jQuery);

