// JavaScript Document
$(function() {
	     checkSystem();
	     methodBind();
}); 

function checkSystem(){
         var u = navigator.userAgent;
         if (u.indexOf("Android") > -1 || u.indexOf("Linux") >-1)
             {
        	     var reg = /android [\d._]+/gi;
                 var v_info = u.match(reg);
                 version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号4.2.2
                 version = parseInt(version.split('.')[0]);// 得到版本号第一位
                 if(version>=4){
				 $("#andrioDownloadButton").css("display","block");
				 $("#appleDownloadButton").css("display","none");
				 $("#downloadInformation").css("visibility","visible");
				 $("#blendDownloadButton").css("display","none");
				$("#installStep").click(function(){
						 window.location.href="/dssweb/pages/download/andriodDownloadDetail.html"
						});
                 }else{
                 
                 }

				 
             }
             else if(u.indexOf("iPhone") > -1)
             {
                    
                $("#andrioDownloadButton").css("display","none");
			    $("#appleDownloadButton").css("display","block");
				$("#downloadInformation").css("visibility","hidden");
				$("#blendDownloadButton").css("display","none");
				$("#installStep").click(function(){
					 window.location.href="/dssweb/pages/download/appleDownloadDetail.html"
					});
             }
			 else{
				 $("#andrioDownloadButton").css("display","none");
    			 $("#appleDownloadButton").css("display","none");
    			 $("#downloadInformation").css("visibility","visible");
    			 $("#blendDownloadButton").css("display","block");
    			 $("#installStep").click(function(){
					 window.location.href="/dssweb/pages/download/blendDownloadDetail.html"
					});
				 }
	}

function methodBind(){

	$("#andrioDownloadButton").click(function(){
		 window.location.href="/dssweb/apk/dssApp.apk"
		});
/*	$("#appleDownloadButton").click(function(){
		 window.location.href="/dssweb/apk/mianfest.plist"
		});*/
	$("#andriodDownLoad").click(function(){
		 window.location.href="/dssweb/apk/dssApp.apk"
		});
/*	$("#appleDownLoad").click(function(){
		 window.location.href="/dssweb/apk/mianfest.plist"
		});*/

	
	
}