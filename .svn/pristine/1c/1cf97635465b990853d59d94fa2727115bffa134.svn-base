function imgZip(files, showImgContext, maxWidth, maxHeight,back) {
	var cnvObj = $('<canvas id="myCanvas" style="display: none"></canvas>');
	var cntxObj = $('<canvas id="canvas" style="display: none"></canvas>');
	$("body").append(cnvObj).append(cntxObj);
	var Cnv = cnvObj[0];
	var Cntx = Cnv.getContext('2d');
	var tempImg = new Image();
	var agoW, agoH;
	var retObjList=[];
	for ( var intI = 0; intI < files.length; intI++) {
		var retObj={};
		retObjList.push(retObj);
		
		var tmpFile = files[intI];
		retObj.name=tmpFile.name;
		retObj.type=tmpFile.type.substr(tmpFile.type.indexOf("/")+1);
		var reader = new FileReader();
		reader.readAsDataURL(tmpFile);
		reader.onload = function(e) {
			url = e.target.result;
			tempImg.src = url;
			tempImg.onload = function() {
				agoW = tempImg.width;
				agoH = tempImg.height;
				var m = agoW / agoH;
				var ysW, ysH;
				if (m > 1) {
					if(maxWidth>agoW) maxWidth=agoW;
					ysW = maxWidth;
					ysH = maxWidth / m;
				} else {
					if(maxHeight>agoH) maxHeight=agoH;
					ysH = maxHeight;
					ysW = maxHeight * m;
				}
				tempImg.style.width = ysW;
				tempImg.style.height = ysH;
				Cnv.width = ysW;
				Cnv.height = ysH;
				Cntx.drawImage(tempImg, 0, 0, ysW, ysH);
				var showImg = $("<img/>");
				if(showImgContext) showImgContext.append(showImg);
				showImg[0].src = Cnv.toDataURL(tmpFile.type);
				retObj.url=showImg[0].src;
				retObj.width=ysW;
				retObj.height=ysH;
				retObj.proportion=m;
				if(back) back(retObj);
			}
		}
	}
	cnvObj.remove();
	cntxObj.remove();
	return retObjList;
}

function imgZipToMin(files, showImgContext, minWidth, minHeight,back) {

	var cnvObj = $('<canvas id="myCanvas" style="display: none"></canvas>');
	var cntxObj = $('<canvas id="canvas" style="display: none"></canvas>');
	$("body").append(cnvObj).append(cntxObj);
	var Cnv = cnvObj[0];
	var Cntx = Cnv.getContext('2d');
	var tempImg = new Image();
	var agoW, agoH;
	var retObjList=[];
	for ( var intI = 0; intI < files.length; intI++) {
		var retObj={};
		retObjList.push(retObj);
		
		var tmpFile = files[intI];
		retObj.name=tmpFile.name;
		retObj.type=tmpFile.type.substr(tmpFile.type.indexOf("/")+1);
		var reader = new FileReader();
		reader.readAsDataURL(tmpFile);
		reader.onload = function(e) {
			url = e.target.result;
			tempImg.src = url;
			tempImg.onload = function() {
				agoW = tempImg.width;
				agoH = tempImg.height;
				var m = agoW / agoH;
				
				var R, startW, startH
				if (m < 1) {
					ysW = minWidth;
					ysH = minWidth / m;
					startW = 0;
					R = agoW;
					startH =  (agoH - R) / 2;

				} else {
					ysH = minHeight;
					ysW = minHeight * m;

					startH = 0;
					R = agoH;
					startW = (agoW - R) / 2;

				}
				Cnv.width = minWidth;
				Cnv.height = minHeight;
				Cntx.drawImage(tempImg, startW, startH, R, R, 0, 0, minWidth,
						minHeight);
				
				var showImg = $("<img/>");
				if(showImgContext) showImgContext.append(showImg);
				showImg[0].src = Cnv.toDataURL(tmpFile.type);
				retObj.url=showImg[0].src;
				retObj.width=ysW;
				retObj.height=ysH;
				retObj.proportion=m;
				if(back) back(retObj);
			}
		}
	}
	cnvObj.remove();
	cntxObj.remove();
	return retObjList;
}

function getUrl(fil, id) {
	var agoWidth, agoHeight;
	var maxWidth = '500';
	var maxHeight = '500';
	var minHeight = '100';
	var minWidth = '100';

	var Cnv = document.getElementById("myCanvas");
	var Cntx = Cnv.getContext('2d');//
	var imgss = new Image();//

	var ago = document.getElementById("ago");
	var ys = document.getElementById("ys");
	var ysmin = document.getElementById("ysmin");
	var min = document.getElementById("min");
	var min2 = document.getElementById("min2");

	var out = document.getElementById("out");

	for ( var intI = 0; intI < fil.length; intI++) {
		var tmpFile = fil[intI];
		var reader = new FileReader();
		reader.readAsDataURL(tmpFile);
		reader.onload = function(e) {
			url = e.target.result;
			ago.src = url;

			imgss.src = url;

			ago.onload = function() {
				agoWidth = ago.width;
				agoHeight = ago.height;
				var m = agoWidth / agoHeight;

				var ysW, ysH;
				if (m > 1) {
					ysW = maxWidth;
					ysH = maxWidth / m;
				} else {
					ysH = maxHeight;
					ysW = maxHeight * m;
				}
				ago.style.width = ysW;
				ago.style.height = ysH;
				Cnv.width = ysW;
				Cnv.height = ysH;
				Cntx.drawImage(ago, 0, 0, ysW, ysH);

				ys.src = Cnv.toDataURL("image/png");

				if (m < 1) {
					ysW = minWidth;
					ysH = minWidth / m;
				} else {
					ysH = minHeight;
					ysW = minHeight * m;
				}
				ago.style.width = ysW;
				ago.style.height = ysH;
				Cnv.width = ysW;
				Cnv.height = ysH;
				Cntx.drawImage(ago, 0, 0, ysW, ysH);

				ysmin.src = Cnv.toDataURL("image/png");

				var startW, startH
				if (m < 1) {
					ysW = minWidth;
					ysH = minWidth / m;
					startW = 0;
					startH = 0 - (ysH - minHeight) / 2;
				} else {
					ysH = minHeight;
					ysW = minHeight * m;

					startH = 0;
					startW = (ysW - minWidth) / 2;
				}
				ago.style.width = ysW;
				ago.style.height = ysH;
				Cnv.width = minWidth;
				Cnv.height = minHeight;

				Cntx.drawImage(ysmin, startW, startH, minWidth,
						minHeight, 0, 0, minWidth, minHeight);

				min.src = Cnv.toDataURL("image/png");
				out.innerHTML = startW + "_" + startH + "_" + minWidth + "_"
						+ minHeight;

				var R, startW, startH
				if (m < 1) {
					ysW = minWidth;
					ysH = minWidth / m;
					startW = 0;
					R = agoWidth;
					startH = 0 - (agoHeight - R) / 2;

				} else {
					ysH = minHeight;
					ysW = minHeight * m;

					startH = 0;
					R = agoHeight;
					startW = (agoWidth - R) / 2;

				}
				ago.style.width = ysW;
				ago.style.height = ysH;
				Cnv.width = minWidth;
				Cnv.height = minHeight;

				Cntx.drawImage(ago, startW, startH, R, R, 0, 0, minWidth,
						minHeight);

				min2.src = Cnv.toDataURL("image/png");
				out.innerHTML = startW + "_" + startH + "_" + minWidth + "_"
						+ minHeight;
			}
		}
	}
}