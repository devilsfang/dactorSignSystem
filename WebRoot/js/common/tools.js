function showErrorMessage(response){
	var headers = response.getAllResponseHeaders();
	var appName="dssweb";
	var status = headers.substring((headers.indexOf("C-Result-Status:")+16),headers.indexOf("C-Result-Status:")+16+4);
	//根据此状态判断是否为异常类型及异常类型,600为成功，602为业务异常,603为系统异常
	if($.trim(status)=='603'){
		alert(response.responseText);
		window.location.href = '/'+appName+'/login.html';
	}
	else if($.trim(status)=='602'){
		alert(response.responseText);
		window.location.href = '/'+appName+'/login.html';
	}
	
}