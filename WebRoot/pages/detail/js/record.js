var appName = "/dssweb";
var model = "0";

$(function() {
	myData = GetUrlParam();
	if (myData.model != null)
		model = myData.model;
	pages = [ loadPage() ];
	thisPage = pages[0];
	var item = {
		id : myData.userId,
		name : myData.patientName,
		sex : myData.patientSex,
		number : myData.patientCode,
		doctor : myData.requestName,
		age : myData.patientAge,
		kind : myData.requestDept,
		imgSrc : getDefaultImageByAgeSex(
			myData.patientAge,
			myData.patientSex),
		telephone:myData.requestTel,
	};
	var html = loadTopHtml(item);
	$("#tabNames").find(".navslip").before(html);
	if (model == "0") {
		bindSlider();
	} else if (model == "1") {
		thisPage.changeTab(thisPage.tabPages[0], 2);
		tree = addTree().show();
		//		$(".l-page-tabName").remove();
		//		$(".navslip").remove();
		//		$("#tabNames").css("height","80px");
		$("#patientRight").remove();
		$("#tabName1").css("visibility", "hidden");
		$("#tabName0").css("visibility", "hidden");
		$("#tabName0").bind(eClick, function() {
			history.back();
		})
	}
	else if(model == "3"){
		thisPage.changeTab(thisPage.tabPages[0], 1);
	}
	fontSizeAdjust();
	var src = getDefaultImageByAgeSex(myData.patientAge, myData.patientSex);
	$("#tabName2").find("img").attr("src", src);

});
function loadPage() {
	var content = loadContent();
	return $("#page")
		.ligerPage(
			{
				title : "详情",
				backButton : false,
				backPage : "/allograph.html",
				propertyButton : false,
				prefixID : "scsContacts_cx",
				iconEnable : false,
				content : content
			});
}
function loadContent() {
	var detail = {
		tabPage : true,
		tabId : "myCollection",
		prefixID : "myCollection",
		tabName : "<div class='center'><div class='bar' ><img src=''></div><span>" + myData.bookName + "<span><div>",
		content : [ {
			id : "userCurrentFun",
			group : " ",
			type : "grid",
			unformat : true,
			hideGroup : true,
			hideGrouptTips : true,
			gridUrl : "/dssweb/SignDetail",
			gridParam : {
				caseHisRecordId : myData.caseHisRecordId,
				bookId : myData.bookId,
				caseHisId : myData.caseHisId,
				patientCode : myData.diagnoseId
			},
			emptyText : "没有找到内容",
			columns : [
				{
					cells : [ {
						class : "h2",
						render : function(item) {
							var skin = getPatientSkin(myData.bookName);
							$("#tabName0").find("img").attr("src", skin.icon);
							return formatData(item);
						}
					} ]
				},
			]
		} ]
	};

	var history = {
		tabPage : true,
		tabId : "scsStudentContacts",
		prefixID : "scsStudentContacts",
		tabName : "<div class='center'><div class='bar' ><img src='/dssweb/resource/images/icon/history.png'></div><span>历史审批<span><div>",
		labelWidth : 70,
		content : [ {
			group : "",
			hideGroup : true,
			hideGrouptTips : true,
			type : "grid",
			id : "teachersInfo",
			unformat : true,
			gridUrl : "/dssweb/SignHistoryOpinion",
			gridParam : {
				caseHisId : myData.caseHisId
			},
			columns : [ {
				cells : [ {
					render : function(item) {
						var html = $("<div></div>");
						var checkShow = $("<div id='checkShow'></div>");
						var checkInfo = $("<div id='checkInfo'></div>");
						var checkContent = $("<div id='checkContent'></div>");
						var checkBlank = $("<div id=checkBlank></div>");
						html.append(checkShow);
						checkShow.append(checkInfo).append(checkContent).append(checkBlank);
						checkInfo.append($("<span >" + item.checkName + "</span>" + "&nbsp" + "<span >" + item.rejectDate.replace("T"," ").substring(0,16) + "</span>"));
						checkContent.append((item.rejectReason=="")?"审核通过":item.rejectReason);
						return html.html();
					}
				} ]
			} ]
		} ],
		buttons:[ (model==3)?{
			id : "agreeCancelButton",
			backgroundColor : "blue",
			display : "同意撤销审签签名",
			onclick : agreeCancelSign,
		}:null,
		(model==3)?{
		    id : "disagreeCancelButton",
			backgroundColor : "red",
			display : "不同意撤销审签签名",
			onclick : disagreeCancelSign,
		    }:null,
		    ]
	}
	var userInfo = {
		tabPage : true,
		tabId : "scsStudentContacts",
		prefixID : "scsStudentContacts",
		tabName : "<div class='center'><div class='bar' ><img src='' style='border-radius:50%;margin-left:-10px;margin-top:-3px;'></div><span>患者详情<span><div>",
		labelWidth : 70,
		content : [ {
			id : "userInfoTree",
			group : "zhe",
			hideGroup : true,
			type : "grid",
			hideGroupTips : true,
			gridUrl : "/dssweb/Tree",
			gridParam : {
				patientCode : myData.diagnoseId
			},
			columns : [ {
				cells : [ {
					render : function(item) {
						if (tree == null) {
							tree = addTree();
							var height = thisPage.page.height();
							tree.css("height", height - 120 + "px");

							tree.find("#deTailsShow").css("height", height - 230 + "px");
							tree.hide();
						}

						var leaf = $('<div class="first"><div class="details" id="records">'
							+ item.bookName
							//							+ '</div><div class="date">'
							//							+ item.time 
							+ '</div></div>');
						leaf.bind(eClick, function(e) {
							treeClick(item, e.target);
						});
						if (item.index == 0) treeClick(item, leaf.find(".details"));
						tree.find("#deTailsShow").append(leaf);
					}
				}
				]
			} ]
		}, {
			id : "userInfo",
			group : "zhe",
			hideGroup : true,
			type : "grid",
			hideGroupTips : true,
			layLoad : false,
			unformat : true,
			gridUrl : "/dssweb/SignDetail",
			gridParam : {
			},
			columns : [
				{
					cells : [ {
						render : formatData
					} ]
				},
			]
		} ],
		
		
	};
	var goBack = {
		tabPage : true,
		tabId : "myCollection",
		prefixID : "myCollection",
		tabName : "<span>返回<span>",
	};
	var empty = {
		tabPage : true,
		tabId : "emptyTab",
		prefixID : "emptyTab",
		tabName : "",
		labelWidth : 70,
		content : []
	};
	switch (model) {
	case "0":
		var content = [ {
			group : " ",
			hideGroup : true,
			hideGrouptTips : true,
			type : "tabPage",
			onChange : sliderVisible,
			id : "myContacts",
			pages : [ detail, history, userInfo ]
		} ]
		return content;
	case "1":
		var content = [ {
			group : " ",
			hideGroup : true,
			hideGrouptTips : true,
			type : "tabPage",
			onChange : sliderVisible,
			id : "myContacts",
			pages : [ detail, history, userInfo ]
		} ]
		return content;
	case "2":
		var content = [ {
			group : " ",
			hideGroup : true,
			hideGrouptTips : true,
			type : "tabPage",
			onChange : sliderVisible,
			id : "myContacts",
			pages : [ detail, history, userInfo ]
		} ]
		return content;
	case "3":
		var content = [ {
			group : " ",
			hideGroup : true,
			hideGrouptTips : true,
			type : "tabPage",
			onChange : sliderVisible,
			id : "myContacts",
			pages : [ detail, history, userInfo ]
		}
		]
		return content;
	}
}
/***
 * 加载头部信息
 */
function loadTopHtml(item) {
	var html = $("<div style='    width: 100%;  position: absolute;'></div>");
	var patientShow = $("<div id='patientShow'></div>");
	var patientBack = $("<div id='patientBack'></div>");
	var patientLeft = $("<div id='patientLeft'></div>");
	var patientRight = $("<div id='patientRight'></div>");
	var patientImg = $("<div id='patientImg'></div>");
	var patientInfo = $("<div id='patientInfo'></div>");
	var patientName = $("<div id='patientName'></div>");
	var patientNumber = $("<div id='patientNumber'></div>");
	var doctorInfo = $("<div id='doctorInfo'></div>");
	var doctorType = $("<div id='doctorType'></div>");
	var doctorName = $("<div id='doctorName'></div>");
	var doctorCall = $("<div id='doctorCall'></div>");
	html.append(patientShow);
	patientShow.append(patientBack).append(patientLeft).append(patientRight);
	patientBack.append('<img src="/dssweb/resource/images/icon/arrow_3.png "/>');
	patientLeft.append(patientImg).append(patientInfo);
	patientLeft.bind(eClick, function() {
		history.back(-1);
	});
	patientBack.bind(eClick, function() {
		history.back(-1);
	});
	patientInfo.append(patientName).append(patientNumber);
	patientRight.append(doctorInfo).append(doctorCall);
	doctorInfo.append(doctorType).append(doctorName);
	patientImg.append("<img src=" + " '" + item.imgSrc + "'" + "/>");
	patientName.append($("<span >" + item.name + "</span>" + "&nbsp&nbsp&nbsp" + "<span >" + item.sex + "&nbsp" + item.age  + "</span>"));
	patientNumber.append(item.number);
	doctorType.append($("<span id='secret'><img src='/dssweb/resource/images/icon/eye.png' style='height:15px;    margin-right: 5px';/>" + item.kind + "</span>"));
	doctorName.append("提交医生" + "  " + item.doctor);
	if(item.telephone!=null&&item.telephone!="")
		doctorCall.append("<a href=tel://"+item.telephone+"><img src='/dssweb/resource/images/icon/tel.png' style='width:16px;height:16px;'/></a>");

	return html;
}

/***
 * tree点击事件
 */
function treeClick(data, target) {
	$(".leafSelected").removeClass("leafSelected");
	$(target).addClass("leafSelected");
	thisPage.tabPages[0].pages[2].grids[1].gridParam = {
		bookId : data.bookId,
		caseHisId : data.caseHisId,
		caseHisRecordId : "",
		patientCode : myData.diagnoseId
	}
	thisPage.tabPages[0].pages[2].reLoadData(1, 1, "grid");
}


/**
 * 加载滑动按钮
 */
function bindSlider() {
	var html = $("<div id='sliderContainerLay'></div>")
	var sliderContainer = $("<div id='sliderContainer'></div>");
	var correct = $("<div id='correct'>批改</div>");
	var pass = $("<div id='pass'>通过</div>");
	var select = $(" <div id='select'><<<请滑动选择>>></div>");
	var slider = $("<div id='slider'></div>");
	var sliderBox = $("<div id='sliderBox'></div>");
	html.append(sliderContainer.append(correct).append(pass).append(select)).append(sliderBox.append(slider));

	$("body").append(html);

	var sliderjs = $("#slider");
	var xOld = 0;
	var startX;
	var xNow;
	sliderjs.bind("touchstart", function(e) {
		startX = e.originalEvent.touches[0].clientX;
	});

	sliderjs.bind("touchmove", function(e) {
		xNow = e.originalEvent.touches[0].clientX - startX;
		if (xNow > 20 || xNow < -20) {
			sliderjs.css("transform", "translateX(" + xNow + "px)");

		}
		if (xNow > 120) {
			//window.location.href = "test.html";
			$("#sliderContainer").css("animation", "pass 1s");
			$("#pass").css("color", "white");
			$("#correct").css("display", "none");
			$("#pass").css("display", "block");


		}
		if (xNow < -120) {
			//window.location.href = "test.html";
			$("#sliderContainer").css("animation", "correct 1s");
			$("#pass").css("display", "none");
			$("#correct").css("display", "block");
			$("#correct").css("color", "white");


		}

	});
	sliderjs.bind("touchend", function(e) {
		if (xNow > 120) {
			sliderjs.css("transform", "translateX(" + 0 + "px)");
			$("#sliderContainer").css("background-color", "#b9d1db");
			$("#pass").css("display", "block");
			$("#correct").css("display", "block");
			$("#pass").css("color", "#0378d8");
			$("#correct").css("color", "#da0301");
			showShade();
			sliderVisible(null, 1);
			setTimeout(function() {
				signTimeout();
			}, 5000)
			window.location.href = 'app://function=sign&param={"uniqueId":"'+myData.uniqueId+'"}&success=signSuccess&error=signError';

		} else if (xNow < -120) {
			loadOpinionPage();
		} else {
			sliderjs.css("transform", "translateX(" + 0 + "px)");
			$("#sliderContainer").css("background-color", "#b9d1db");
			$("#pass").css("display", "block");
			$("#correct").css("display", "block");
			$("#pass").css("color", "#0378d8");
			$("#correct").css("color", "#da0301");
		}
	});



}
/**
 * 当tab发生变化时
 * 改变滑动按钮的显示状态
 */
function sliderVisible(target, toIndex) {
	if (toIndex == 0) {
		if (model == "1") {
			return;
		}
		if(tree!=null)tree.hide();
		$("#sliderContainerLay").slideDown(300);
	} else if (toIndex == 1) {
		if(tree!=null)tree.hide();
		$("#sliderContainerLay").slideUp(300);
	} else {
		if(tree!=null)tree.show();
		$("#sliderContainerLay").slideUp(300);
	//		window.location.href = "/dssweb/pages/detail/patientDetails.html";
	}
}
/***
 * 对字体大小进行调整
 */
var fontSizeNow=getCookie("fontSeter")||14;
var fontSizeMax=24;
var fontSizeMin=12;
function flushFontSize(){
	$(".fontSeter").css({
		"font-size" : fontSizeNow+"px",
	});
	setCookie("fontSeter",fontSizeNow);
}
function fontSizeAdjust() {
	var fontSizeContainer = $("<div id='fontSizeContainer'></div>");
	var fontTop = $("<div id='fontTop'><span>字号</span></div>");
	var fontAdjustContainer = $("<div id='fontAdjustContainer'></div>");
	var sizeAdd = $("<div id='sizeAdd'><div class='horizontal'></div><div class='vertical'></div></div>");
	var sizeDecrease = $("<div id='sizeDecrease'><div class='horizontal'></div></div>");
	var arrow = $("<div id='recover' style='width: 50px; height: 40px'><img id='picture' src='/dssweb/resource/images/icon/arrow_5.png' style='width: 20px; height: 10px'></div>")

	fontAdjustContainer.append(sizeDecrease);
	fontAdjustContainer.append(sizeAdd);
	fontAdjustContainer.append(arrow);

	fontSizeContainer.append(fontTop);
	fontSizeContainer.append(fontAdjustContainer);
	$("body").append(fontSizeContainer);
	fontTop.bind(eClick, function() {

		$("#fontAdjustContainer").css({
			"margin-top" : "0px"
		});
		$("#fontTop").css({
			"margin-top" : "-70px"
		});



	});
	arrow.bind(eClick, function() {

		$("#fontAdjustContainer").css({
			"margin-top" : "-185px"
		});
		$("#fontTop").css({
			"margin-top" : "-35px"
		});
	});
	sizeAdd.bind(eClick, function() {
		if(fontSizeNow<fontSizeMax){
			fontSizeNow=fontSizeNow*1+2;
			flushFontSize()
		}
	})
	sizeDecrease.bind(eClick, function() {

		if(fontSizeNow>fontSizeMin){
			fontSizeNow=fontSizeNow*1-2;
			flushFontSize()
		}
	})


}
/***
 * 加载驳回意见页面
 */
function loadOpinionPage() {
	$("#sliderContainerLay").remove();
	var P = $('<div id="opinionPage"></div>');
	$("body").append(P);
	pages.push(P.ligerPage({
		title : "批改意见",
		backButton : false,
		//backPage : "/" ,
		propertyButton : false,
		prefixID : "opinionPage",
		iconEnable : false,
		labelWidth : 0,
		content : [ {
			id : "opion",
			group : "<div style='text-align:center;font-size:14px;color:#333;line-height:36px; margin-top:15px;'>" +
				"<div style='text-align:center; margin:0 auto; width:120px'>" +
				"<div style='float:left; margin-top:8px'><img src='/dssweb/resource/images/icon/history.png' style='width:20px'/></div>" + "<div style='float:right'>请输入批改意见</div></div>" + "<div class='exitOp'></div></div>",
			/*	hideGroup:false,*/
			type : "text",
			rows : true,
			maxLength : 300,
			minRows : 3,
			maxRows : 10,
			display : " "
		} ]
	}
	));
	thisPage = pages[pages.length - 1];

	thisPage.groups[0].find(".l-row-message").attr("width", "15");

	//这里用了一种重写endEdit的方式将afterRemove注入进去
	var oldFunc = thisPage.endEdit;
	thisPage.endEdit = function() {
		oldFunc(thisPage.page, function() {
			bindSlider();
			fontSizeAdjust();
		});
	}
	var submitButton = $('<div id="bottomContainer"></div>')
	var doctor = $('<div id="doctor"></div>');
	var phone = $('<div id="phone"></div>');
	var empty = $('<div id="empty">清空</div>');
	var submit = $('<div id="submit">提交</div>');
	var doctorTop = $('<div style="margin-top:5px" ></div>');
	var doctorBottom = $('<div style="margin-top:3px";></div>');
	var phoneTop = $('<div style="margin-top:5px" ></div>');
	var phoneBottom = $('<div style="margin-top:3px;" ></div>');
	submitButton.append(doctor).append(phone).append(empty).append(submit);
	doctor.append(doctorTop).append(doctorBottom);
	if(myData.requestTel!=null&&myData.requestTel!="")
		phone.append(phoneTop).append(phoneBottom);
	doctorTop.append($('<img src="/dssweb/resource/images/icon/upDoctor.png" style="width:20px"/>'));
	doctorBottom.append($("<span style='color:gray'>" + myData.requestDept + " 提交医生： " + myData.requestName + "</span>"));
	phoneTop.append($('<a href="tel://'+myData.requestTel+'"><img src="/dssweb/resource/images/icon/tel2.png" style="width:18px;  "/></a>'));
	phoneBottom.append($("<span style='color:gray'>给提交者拨打电话</span>"));
	//submitButton.append(empty).append(submit);
	submit.bind(eClick, submitOp);

	$("body").append(submitButton);
	
	submitButton.show();
	$(".exitOp").bind(eClick, function() {
		thisPage.endEdit(thisPage.page, function() {
			bindSlider();
			fontSizeAdjust();
		});
	})
	empty.bind(eClick, function() {
		$("#opion").val("");
	})
}
var tree;
var iconInit_i = 1;
function addTree() {
	var tree = $('<div id="rightShow"></div>');
	var show = $('<div id="deTailsShow"></div>');
	var icon = $('<div class="icon" id="icon1"><div id="icon2"><img id="picture" src="/dssweb/resource/images/icon/Arrow.png"style="width: 30px; height: 30px"></div></div>');
	$("body").append(tree);
	tree.append(show).append(icon);
	icon.bind(eClick, function() {
		if (iconInit_i % 2 == 1) {
			$("#deTailsShow").css({
				"margin-right" : "-80px"
			});
			$("#icon2").css({
				transform : "rotate(180deg)"
			});
		} else {
			$("#icon2").css({
				transform : "rotate(0deg)"
			});
			$("#deTailsShow").css({
				"margin-right" : "0px"
			});

		}
		iconInit_i++;
	});
	return tree;
}


/***
 * 驳回意见提交
 */
function submitOp() {
	var opin = $("#opion").val();
	if(opin==null||opin==""){
		thisPage.showMessage("请输入批改意见");
		return; 
	}
	thisPage.Ajax("/dssweb/SignOpinionFill", {
		recordId : myData.recordId,
		diagnoseId : myData.diagnoseId,
//		iRecordId : 100022,
//		iDiagnoseId : 2904054,
		checkId : myData.userId,
		checkContent : opin,
		status : 2,
	}, true, true, function(data) {
		window.location.href="/dssweb/pages/list/allRecord.html?userId="+myData.userId;
	}, function() {}, true);
}
/***
 * 同意取消审签提交
 */
function agreeCancelSign(){
	myConfirm("同意撤销审签签名后您的审核<br/>签名将会失效，允许提交医生<br/>再次编辑后重新提交审核。",[{
	              id:"delete",
	              text:"确定撤销签名",
	              func:function(){
	            	  thisPage.Ajax("/dssweb/SignOpinionFill", {
	            		    recordId : myData.recordId,
	            			diagnoseId : myData.diagnoseId,
	            			checkId : myData.userId,
	            			checkContent : "",
	            			status : 1,
	            		}, true, true, function(data) {
	            			window.history.back();
	            		}, function() {}, true);
	              }
	},{
		id:"cancel",
		text:"不同意撤销"
	}]);
	
}
/***
 * 不同意取消审签提交
 */
function disagreeCancelSign(){
	myConfirm("取消撤销审签签名后您的审核<br/>签名将会继续生效。",[{
	              id:"delete",
	              text:"取消撤销签名",
	              func:function(){
	            	  thisPage.Ajax("/dssweb/SignOpinionFill", {
	            		    recordId : myData.recordId,
	            			diagnoseId : myData.diagnoseId,
	            			checkId : myData.userId,
	            			checkContent : "",
	            			status : 2,
	            		}, true, true, function(data) {
	            			window.history.back();
	            		}, function() {}, true);
	              }
	},{
		id:"cancel",
		text:"返回"
	}]);
	
}
/***
 * 签名超时
 */
function signTimeout() {
	hideShade();
	thisPage.showMessage("签名超时，请核对证书信息后重试");
	sliderVisible(null, 0);
}

/***
 * 签名成功的回调
 */
function signSuccess(data) {
	hideShade();
	thisPage.Ajax("/dssweb/SignOpinionFill", {
		recordId : myData.recordId,
		diagnoseId : myData.diagnoseId,
//		iRecordId : 100022,
//		iDiagnoseId : 2904054,
		checkId : myData.userId,
		checkContent : "",
		status : 1,
	}, true, true, function(data) {
		thisPage.showMessage("签名成功，即将返回首页");
		setTimeout(function(){
			history.back();
		},2000);
	}, function() {}, true);
}

/***
 * 签名失败的回调
 */
function signError(data) {
	hideShade();
	thisPage.showMessage("签名失败，请核对证书信息后重试");
	sliderVisible(null, 0);
}