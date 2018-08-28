/*******************************************************************************
 * 加载框架包
 */
var appName="dssweb";
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/jquery-1.11.2.min.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/base-min.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/tool.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/myImgTool.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/source/jquery.validate.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/validator.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/idCardValidator.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/imgMover.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/jquery.animate-shadow.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/jquery.jscrollpane.min.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/jquery.mousewheel.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/jsloader.js");

JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/myLigerui-min.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/scroll-startstop.events.jquery.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/scrollbar.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/json2.js");
JSLoader.loadJavaScript("/"+appName+"/js/parameter.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/mobiscroll_002.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/mobiscroll_004.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/mobiscroll.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/mobiscroll_003.js");
JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/mobiscroll_005.js");

JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/myAPP.js");
JSLoader.loadStyleSheet("/"+appName+"/js/UI2.0/skins/PC-A/css/ligerui-all.css");
JSLoader.loadStyleSheet("/"+appName+"/js/UI2.0/skins/PC-A/css/mobiscroll.css");
/*
 * 智能机浏览器版本信息:
 * 
 */
var browser = {
	versions : function() {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {// 移动终端浏览器版本信息
		trident : u.indexOf('Trident') > -1, // IE内核
		presto : u.indexOf('Presto') > -1, // opera内核
		webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
		gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
		//mobile : !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
		mobile : !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
		ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
		android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
		iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
		iPad : u.indexOf('iPad') > -1, // 是否iPad
		webApp : u.indexOf('Safari') == -1
	// 是否web应该程序，没有头部与底部
	}
}(),
language : (navigator.browserLanguage || navigator.language).toLowerCase()
}
if (browser.versions.mobile) {
	JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/userPhone.js");
	JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/source/zepto.js");
	eClick = "tap";
	lClick="longTap";
} else {
	JSLoader.loadJavaScript("/"+appName+"/js/UI2.0/js/userPC.js");
	eClick = "click";
	lClick="dblclick";
}

// document.writeln("语言版本: "+browser.language);
// document.writeln(" 是否为移动终端: "+browser.versions.mobile);
// document.writeln(" ios终端: "+browser.versions.ios);
// document.writeln(" android终端: "+browser.versions.android);
// document.writeln(" 是否为iPhone: "+browser.versions.iPhone);
// document.writeln(" 是否iPad: "+browser.versions.iPad);
// document.writeln(navigator.userAgent);

document.onkeydown = doKey;
function doKey(e) {// 处理键盘事件
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	if (ev.keyCode == 8) {// 退格键
	// if(obj.getAttribute('readonly')==null||obj.getAttribute('readonly')=="")
	// {return true;}
		if ((obj.type == "text" || obj.type == "textarea"
				|| obj.ltype == "textarea" || obj.ltype == "password" || obj.type == "password")
				&& ((obj.getAttribute('readonly') != "" && obj
						.getAttribute('readOnly') != "")
						&& obj.getAttribute('readonly') != 'readonly'
						&& obj.getAttribute('readonly') != "true" && !obj
						.getAttribute('readonly'))
				|| obj.getAttribute('readonly') == false)
		// ||!((obj.getAttribute('readonly')!=null&&obj.getAttribute('readonly').toString()=="")||obj.getAttribute('readonly'))
		{
			return true;
		} else {
			return false;
		}
	} else if (ev.keyCode == 13 && obj.type != "button"
			&& obj.type != "textarea" && obj.type != "text")
		return false;
	else {

		return true;
	}
}
function __goBack(){
	if(pages==null||pages.length==1){
		history.back();
	}
	else{
		thisPage.endEdit();
		history.pushState(null, null, document.URL);
	}
}
//alert(document.referrer);
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function (e) {
//	alert(e);
	__goBack();
});
defaultFoot="山西卫宁软件有限公司";