/*����˵����
TweenLite( $target, $duration, $vars );
$target ---> ִ�е�Ŀ�����
$duration ---> ����������ʱ��
$vars ---> ���� + ���ܺ��� ���ݸ�ʽ��Object
���������磺(opacity, left, top, width, height....�ȵ�)

���ܺ����磺
ease --> ���建������
onComplete --> �������н���ʱ����
onUpdate --> ������������ʱ����
delay --> �����ӳ�ָ��������ִ��


�÷����£�
TweenLite( target,1 ,{left:100, top:100, opacity:100, ease:Tween.Expo.easeOut, delay:2, onUpdate:Fun, onComplete:Fun});
*/

var TweenLite = function($target,$duration,$vars)
{
	var ease,onComplete,onUpdate,delay,vars = $vars,target = $target,speed = $duration;
	
	if(!target){return false;}
	if(vars.ease){ease = vars.ease;delete vars.ease;}else{ease = Tween.Linear;}
	if(vars.onComplete){onComplete = vars.onComplete;delete vars.onComplete;}
	if(vars.onUpdate){onUpdate = vars.onUpdate;delete vars.onUpdate;}
	if(vars.delay){delay = vars.delay;delete vars.delay;}
	var ifstop = false;
	var attrArr = [];
	var curArr = [];
	var initArr = [];
	for(var at in vars)
	{
		attrArr.push(at);
		curArr.push(vars[at]);
		var ato = 0;
		switch(at)
		{
			case "opacity":ato = parseInt(parseFloat(getStyle(target,'opacity'))*100);if(isNaN(ato)){ato = 100;}break;
			default:ato = parseInt(getStyle(target,at));break;	
		}
		initArr.push(ato);
	}
	if(delay)
	{
		if(target.delay){clearTimeout(target.delay);}
		target.delay = setTimeout(run,delay*1000);
	}else{run();}
	
	function run()
	{
		var s = (new Date()).getTime() / 1000;
		for(var attr in vars)
		{
			(
				function()
				{
					var t = (new Date()).getTime() / 1000 - s;
					for(var i=0,j=attrArr.length;i<j;i++)
					{
						var easeVars = ease(t,initArr[i],curArr[i]-initArr[i],speed);
						if(attrArr[i]=='opacity')
						{
							target.style["opacity"] = easeVars / 100;
							target.style["filter"] = "alpha(opacity:" + easeVars + ")";
							target.alpha = easeVars;
						}
						else
						{
							target.style[attrArr[i]] = attrArr[i]=="zIndex" ? Math.ceil(easeVars) : easeVars + "px";
						}
					}
					if(target.timer){clearTimeout(target.timer);}
					if(t<speed)
					{
						target.timer = setTimeout(arguments.callee, 10);
						if(onUpdate){onUpdate();}
					}
					else
					{
						if(!ifstop)
						{
							for(var i=0,j=attrArr.length;i<j;i++)
							{
								if(attrArr[i]=='opacity')
								{
									target.style["opacity"] = curArr[i] / 100;
									target.style["filter"] = "alpha(opacity:" + curArr[i] + ")";
									target.alpha = curArr[i];
								}
								else
								{
									target.style[attrArr[i]] = attrArr[i]=="zIndex" ? curArr[i] : curArr[i] + "px";
								}
							}
							ifstop = true;
							clearTimeout(target.timer);
							if(onComplete){onComplete()};
						}
					}
				}
			)();
		}
	}
	function getStyle(ta, at){return ta.currentStyle?ta.currentStyle[at]:getComputedStyle(ta, false)[at];}
}