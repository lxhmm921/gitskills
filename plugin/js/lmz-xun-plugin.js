/**
 * 资讯详情内容中点击图片查看大图
 * data-xun="xun-detail-box"  父元素公共类名
 * <div class="check-bigimg-box" data-swiper-slide-index="0">
		<img src="images/10-20190126154537246.jpg" alt="" />
	</div>    //图片格式
 * 
 * 
 * 
 * */

var arr=[];
$("[data-xun=xun-detail-box] img").each(function(){
	var src=$(this).attr("src");
	arr.push(src);
	return arr;
})
function bigImg(){
	var html='<div class="bifImg-box">'+
	    		'<div class="m-watch-big-photo jgphoto-mini-list">'+
					'<div class="swiper-container">'+
						'<dl class="jgdet-photo-list clearfloat swiper-wrapper">';
	
	for(var i=0;i<arr.length;i++){
		 html += '<dd data-swiper-slide-index="'+i+'" class="swiper-slide" >'+
			'<div class="swiper-zoom-container">'+
				'<img src="'+arr[i]+'" alt="" />'+
				'<p></p>'+
			'</div>'+
		'</dd>';
	}
				html+='</dl>'+
		                '<div class="swiper-pagination"></div>'+
					'</div>'+
				'</div>'+
	    	'</div>';
			
	$("body").append(html);
}
bigImg();
$(window).on("load",function(){
	$(document).on("click","[data-xun=xun-detail-box] img",function(){
		var src=$(this).attr("src");
		for(var i=0;i<arr.length;i++){
			if(src == arr[i]){
				var num=i;
				break;
			}
		}
		var num=num+1;
		var _this=".jgphoto-mini-list .swiper-slide:nth-child("+num+")";
        $.jybWatchBigPic(_this, false);
    })
})