/*
 * 加载基础包及第三方包	
 */
var appName="dssweb";
JSLoader.loadJavaScript("/dssweb/js/common/jsPkg/base/frameBasePkg.js");
/*
 * 加载应用组件包
 */
JSLoader.loadJavaScript("/dssweb/js/common/jsPkg/base/ligerUIPkg.js");
/*
 * 加载表单验证包
 */
JSLoader.loadJavaScript("/dssweb/js/common/jsPkg/base/formVaildate.js");
/*
 * 加载公共方法包
 */
JSLoader.loadJavaScript("/dssweb/js/common/jsPkg/base/appCommPkg.js");

document.onkeydown=doKey;
function doKey(e) {// 处理键盘事件
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	if(ev.keyCode == 8){//退格键
//		if(obj.getAttribute('readonly')==null||obj.getAttribute('readonly')=="") {return true;}
		if((obj.type=="text"||obj.type=="textarea"||obj.ltype=="textarea"||obj.ltype=="password"||obj.type=="password")&&
				((obj.getAttribute('readonly')!=""&&obj.getAttribute('readOnly')!="")
					&&obj.getAttribute('readonly')!='readonly'
					&&obj.getAttribute('readonly')!="true"
					&&!obj.getAttribute('readonly'))
					||obj.getAttribute('readonly')==false)
					//||!((obj.getAttribute('readonly')!=null&&obj.getAttribute('readonly').toString()=="")||obj.getAttribute('readonly'))
					{return true; }
		else {return false;}
	}else if(ev.keyCode == 13&&obj.type!="button"&&obj.type!="textarea"&&obj.type!="text") return false;
	else 
		{
		 
		return true;
	}
}