var imgUploadList=[];
var imgMinList=[];
var imgs=null;
// 图片处理
function imgUploade(no) {
	var f1= thisPage.page.find("#inputfile"+no);
	if (f1.val() == "") {
		return;
	}else{
		var files = f1[0].files;
		if( files.length>1){
			f1.val("");
			thisPage.showMessage("一次性选择的内容请勿超过1条！");
			return;
		}
		var unList=[];
		var imgList=[];
		for ( var intI = 0; intI < files.length; intI++) {
			var tempFile=files[intI];
			var name=tempFile.name;
			if((name.lastIndexOf(".jpg") != -1
						|| name.lastIndexOf(".png") != -1
						|| name.lastIndexOf(".gif")!= -1
						|| name.lastIndexOf(".bmp") != -1 || name
						.lastIndexOf(".jpeg") != -1)){
				imgList.push(tempFile);
			}else{
				unList.push(tempFile);
			}
		}
		var str="";
		for(var i in unList){
			var tempFile=unList[i];
			str+=(","+tempFile.name);
		}
		if(str.length>0)
			thisPage.showMessage("错误：不允许上传的文件类型（"+str.substr(1)+"）");
		for(var i in imgList){
			var tempFile=imgList[i];
			imgZip([tempFile],null,1000,800,function(data){
				if(no==1)
					myData.certPicA=data.type+","+data.url.replace("data:image/"+data.type+";base64,", "");
				else if(no==2)
					myData.certPicB=data.type+","+data.url.replace("data:image/"+data.type+";base64,", "");
				else if(no==3)
					myData.certPicD=data.type+","+data.url.replace("data:image/"+data.type+";base64,", "");
				else if(no==4)
					myData.certPicE=data.type+","+data.url.replace("data:image/"+data.type+";base64,", "");
				else if(no==5)
					myData.certPicC=data.type+","+data.url.replace("data:image/"+data.type+";base64,", "");
				else if(no==6)
					myData.certPicF=data.type+","+data.url.replace("data:image/"+data.type+";base64,", "");
				else 
					alert("error");
				showImg(data.url,no);
			});
		}
		f1.val("") ;//可以重复上传，否则重复选择文件视作noChange，无法触发change事件
	}
	
}

function showImg(src,no) {
	var imgHtml = ('<img style="margin-right:10px;margin-bottom:10px; width:100%;" src="'
			+ src+ '"/>');
	thisPage.page.find("#show"+no).html(imgHtml);
}

function addPic(no) {
	var f1=thisPage.page.find("#inputfile"+no);
	f1.unbind("change");
	f1.bind("change", function() {
        imgUploade(no);
    });
	f1.click();
}
