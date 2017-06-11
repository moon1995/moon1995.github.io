(
	function()
	{
		var $ = function(_id){return document.getElementById(_id);};
		
		var magnifier = function()
		{
			var content = $("content");
			var preview = $("preview");
			var mask = $("mask");
			var pics = $("pics");
			var picbar = $("picbar");
			var picbarli = picbar.getElementsByTagName("li");
			var picbarlen = picbarli.length;
			var imglist = [];
			var zoom = $("zoom");
			var zoompic = zoom.getElementsByTagName("img")[0];
			var pw = preview.offsetWidth;
			var ph = preview.offsetHeight;
			zoompic.src = pics.src.replace("images/s", "images/b");
			
			for(var i = 0; i < picbarlen; i++)
			{
				picbarli[i].index = i;
				imglist.push(picbarli[i].getElementsByTagName("img")[0]);
				
				picbarli[i].onmouseover = function()
				{
					for(var j = 0; j < picbarlen; j++){picbarli[j].className = "";}
					picbarli[this.index].className = "active";
					pics.src = imglist[this.index].src.replace("images/t", "images/s");
					zoompic.src = pics.src.replace("images/s", "images/b");
				};
			}
			
			preview.onmouseover = function()
			{
				mask.style.display = zoom.style.display = "block";
				TweenLite(mask, .6, {opacity:50, ease:Tween.Expo.easeOut});
				TweenLite(zoom, .6, {opacity:100, ease:Tween.Expo.easeOut});
			};
			preview.onmouseout = function()
			{
				TweenLite(mask, .6, {opacity:0, ease:Tween.Expo.easeOut, onComplete:function(){mask.style.display= "none";}});
				TweenLite(zoom, .6, {opacity:0, ease:Tween.Expo.easeOut, onComplete:function(){zoom.style.display= "none";}});
			};
			
			preview.onmousemove = function(e)
			{
				e = e || window.event;
				
				//x = �������������ߵĿ�� - content�������������ߵĿ�� - ��ɫ����ק����Ŀ�� / 2 �Ӷ�����궨λ���м� �߶ȵļ��� ���һ��
				var x = e.clientX - content.offsetLeft - preview.offsetLeft - mask.offsetWidth / 2;
				var y = e.clientY - content.offsetTop - preview.offsetTop - mask.offsetHeight / 2;
				var w = pw - mask.offsetWidth;
				var h = ph - mask.offsetHeight;
				
				x < 0 && (x = 0);
				x > w && (x = w);
				y < 0 && (y = 0);
				y > h && (y = h);
								
				mask.style.left = x + "px";
				mask.style.top = y + "px";
				
				//zoompic.style.left = -(x / pw) * zoompic.offsetWidth + "px";
				//zoompic.style.top = -(y / ph) * zoompic.offsetHeight + "px";
				
				TweenLite(zoompic, 1, {left:-(x / pw) * zoompic.offsetWidth, top:-(y / ph) * zoompic.offsetHeight, ease:Tween.Circ.easeOut});
			};
		};
		
		window.onload = function()
		{
			magnifier();
		};
	}
)();