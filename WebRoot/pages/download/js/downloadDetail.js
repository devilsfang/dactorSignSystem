// JavaScript Document
$(function() {
	     methodBind();

}); 

function methodBind(){
	$("#appleStep").click(function(){
		 window.location.href="/dssweb/pages/download/appleDownloadDetail.html"
		});
	$("#andriodStep").click(function(){
		 window.location.href="/dssweb/pages/download/andriodDownloadDetail.html"
		});
}