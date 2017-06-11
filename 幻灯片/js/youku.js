window.onload = function()
{
	var $ = function(ids){return document.getElementById(ids);};
	
	var index = 0;
	var isAnim = true;
	var slide = $("slide");
	var box = $("box");
	var pages = box.getElementsByTagName("div");
	var ul = box.getElementsByTagName("ul");
	var len = pages.length;
	var dots = $("dots");
	var lbt = $("lbt");
	var rbt = $("rbt");
	var dotArr = [];
	var info = [];
	
	//实现无缝循环元素结构
	var page = document.createElement("div");
	page.className = "pages";
	page.innerHTML = pages[0].innerHTML;
	box.appendChild(page);
	page = document.createElement("div");
	page.className = "pages";
	page.innerHTML = pages[len - 1].innerHTML;
	box.insertBefore(page, pages[0]);
	box.style.width = (len + 2) * 915 + "px";
	
	var cdf = document.createDocumentFragment();
	for(var i = 0; i < len; i++)
	{
		var dots_i = document.createElement("i");
		dots_i.index = i;
		//逻辑与 当全部的条件均为真 则为真
		i || (dots_i.className = "active");
		dots_i.onclick = function()
		{
			for(var i = 0; i < len; i++)
			{
				dotArr[i].className = "";
			}
			dotArr[this.index].className = "active";
			index = this.index;
			TweenLite(box, .6, {marginLeft:-915 * (index + 1), ease:Tween.Expo.easeOut});
		};
		cdf.appendChild(dots_i);
		dotArr.push(dots_i);
	}
	dots.appendChild(cdf);
	
	for(var i = 0, j = ul.length; i < j; i++)
	{
		info.push(ul[i].getElementsByTagName("li")[1]);
		ul[i].index = i;
		ul[i].onmouseover = function()
		{
			info[this.index].className = "info active";
			TweenLite(info[this.index], .6, {top:170, ease:Tween.Expo.easeOut});
		};
		ul[i].onmouseout = function()
		{
			info[this.index].className = "info";
			TweenLite(info[this.index], .6, {top:190, ease:Tween.Expo.easeOut})
		};
	}
	
	lbt.onclick = function()
	{
		if(isAnim)
		{
			isAnim = false;
			for(var i = 0; i < len; i++)
			{
				dotArr[i].className = "";
			}
			dotArr[index ? index - 1 : len - 1].className = "active";
			TweenLite
			(
			 	box,
				.6,
				{
					marginLeft:-915 * index,
					ease:Tween.Expo.easeOut,
					onComplete:function()
					{
						index || (box.style.marginLeft = -(915 * len) + "px");
						index = index ? --index : len - 1;
						isAnim = true;
					}
				}
			);
		}
	};
	
	var anim = function()
	{
		if(isAnim)
		{
			isAnim = false;
			for(var i = 0; i < len; i++)
			{
				dotArr[i].className = "";
			}
			dotArr[index + 1 >= len ? 0 : index + 1].className = "active";
			TweenLite
			(
			 	box,
				.6,
				{
					marginLeft:-915 * (++index + 1),
					ease:Tween.Expo.easeOut,
					onComplete:function()
					{
						/*if(index >= len)
						{
							index = 0;
							box.style.marginLeft = "-915px";
						}*/
						index >= len && (index = 0, box.style.marginLeft = "-915px");
						isAnim = true;
					}
				}
			);
		}
	};
	
	rbt.onclick = function()
	{
		anim();
	};
	
	var autoPlay = function()
	{
		slide.time = setTimeout
		(
		 	function()
			{
				anim();
				autoPlay();
			},
			5000
		);
	};
	autoPlay();
	
	slide.onmouseover = function(){clearTimeout(slide.time);}
	slide.onmouseout = function(){autoPlay();}
};