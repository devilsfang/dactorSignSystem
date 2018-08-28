$(function() {
	methodBind();
	var url = GetUrlParam();
	loadIndex(url.p);
 
});
/**
 * 将Url转换为json参数
 */
function GetUrlParam() {
	var jsonData = {};
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1);
	var data = r.split("&");
	for (var p in data) {
		// 不传递方法参数
		if (typeof (data[p]) == "function") continue;
		// 不传递空值参数
		if (data[p] == null || data[p] == "") continue;
		var string = data[p].split("=");
		var ret = decodeURI(string[1]);
		if (ret.indexOf("%") >= 0)
			ret = decodeURI(unescape(string[1]));
		jsonData[string[0]] = ret;
	}
	return jsonData;
}
;
function loadIndex(index) {
	var notice = $("#notice");
	var downLoadNotice = $("#downLoadNotice");
	var userLogin = $("#userLogin");
	var certificate = $("#certificate");
	var doclist = $("#doclist");
	var record = $("#record");
	var returnN = $("*[name='return']");
	var noticeFirst = $("#noticeFirst");
	var noticeSecond = $("#noticeSecond");
	var noticeThird = $("#noticeThird");
	var noticeForth = $("#noticeForth");
	var noticeFifth = $("#noticeFifth");
	switch (index) {
	case "0":
		notice.css("display", "block");
		downLoadNotice.css("display", "none");
		userLogin.css("display", "none");
		certificate.css("display", "none");
		doclist.css("display", "none");
		record.css("display", "none");
		break;
	case "1":
		notice.css("display", "none");
		downLoadNotice.css("display", "block");
		userLogin.css("display", "none");
		certificate.css("display", "none");
		doclist.css("display", "none");
		record.css("display", "none");
		break;
	case "2":
		notice.css("display", "none");
		downLoadNotice.css("display", "none");
		userLogin.css("display", "block");
		certificate.css("display", "none");
		doclist.css("display", "none");
		record.css("display", "none");
		break;
	case "3":
		notice.css("display", "none");
		downLoadNotice.css("display", "none");
		userLogin.css("display", "none");
		certificate.css("display", "block");
		doclist.css("display", "none");
		record.css("display", "none");
		break;
	case "4":
		notice.css("display", "none");
		downLoadNotice.css("display", "none");
		userLogin.css("display", "none");
		certificate.css("display", "none");
		doclist.css("display", "block");
		record.css("display", "none");
		break;
	case "5":
		notice.css("display", "none");
		downLoadNotice.css("display", "none");
		userLogin.css("display", "none");
		certificate.css("display", "none");
		doclist.css("display", "none");
		record.css("display", "block");
		break;
	}
}
function methodBind() {
	$("#downLoad").click(function() {
		window.location.href = "/dssweb/pages/download/download.html"
	});
	var notice = $("#notice");
	var downLoadNotice = $("#downLoadNotice");
	var userLogin = $("#userLogin");
	var certificate = $("#certificate");
	var doclist = $("#doclist");
	var record = $("#record");
	var returnN = $("*[name='return']");
	var noticeFirst = $("#noticeFirst");
	var noticeSecond = $("#noticeSecond");
	var noticeThird = $("#noticeThird");
	var noticeForth = $("#noticeForth");
	var noticeFifth = $("#noticeFifth");
	returnN.click(function() {
		history.back();
//		window.location.href = "/dssweb/pages/download/operationNotice.html?p=0";
	});
	noticeFirst.click(function() {
		
		window.location.href = "/dssweb/pages/download/operationNotice.html?p=1";
	});
	noticeSecond.click(function() {
		
		window.location.href = "/dssweb/pages/download/operationNotice.html?p=2";
	});
	noticeThird.click(function() {
		window.location.href = "/dssweb/pages/download/operationNotice.html?p=3";
	});
	noticeForth.click(function() {
		
		window.location.href = "/dssweb/pages/download/operationNotice.html?p=4";
	});
	noticeFifth.click(function() {
		window.location.href = "/dssweb/pages/download/operationNotice.html?p=5";
	});
}