var appName = "/dssweb";
var model = "0";

$(function() {
	myData = GetUrlParam();
	if (myData.model != null)
		model = myData.model;
	
	pages = [ loadPage() ];
	thisPage = pages[0];
	fontSizeAdjust();

});
function loadPage() {
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
				myData.patientSex)
		};
	return $("#page")
		.ligerPage(
			{
				title : "详情",
				backButton : false,
				propertyButton : false,
				prefixID : "patientInfo",
				iconEnable : false,
				freezeStart:0,
				freezeEnd:0,
				content : [{
					id : "info",
					group : "zhe",
					hideGroup : true,
					type : "grid",
					hideGroupTips : true,
					gridData:item,
					unformat:true,
					columns:[{
						cells:[{
							render:loadTopHtml
						}]
					}]
				},{
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
									tree.show();
								}

								var leaf = $('<div class="first"><div class="details" id="records">'
									+ item.bookName
									//							+ '</div><div class="date">'
									//							+ item.time 
									+ '</div></div>');
								leaf.bind(eClick, function(e) {
									treeClick(item,e.target);
								});
								if(item.index==0) treeClick(item,leaf.find(".details"));
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
					unformat:true,
					gridUrl : "/dssweb/SignDetail",
					gridParam : {
						recordId : 100004,
						bookId : 3,
						caseHisId : 1482174,
						patientCode : 2904054
					},
					columns : [
						{
							cells : [ {
								render : formatData
							} ]
						},
					]
				} ]
			});
}
/***
 * 加载头部信息
 */
function loadTopHtml(item) {
	var html = $("<div style='    width: 100%; position:relative;z-index:9; '></div>");
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
	patientShow.append(patientBack).append(patientLeft)
//	.append(patientRight);
	patientBack.append('<img src="/dssweb/resource/images/icon/arrow_3.png "/>');
	patientLeft.append(patientImg).append(patientInfo);
	html.bind(eClick, function() {
		history.back(-1);
	});
	html.bind(eClick, function() {
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
	doctorCall.append("<a href='tel:123'><img src='/dssweb/resource/images/icon/tel.png' style='width:16px;height:16px;'/></a>");

	return html;
}

/***
 * tree点击事件
 */
function treeClick(data,target) {
	$(".leafSelected").removeClass("leafSelected");
	$(target).addClass("leafSelected");
	thisPage.grids[2].gridParam = {
		bookId : data.bookId,
		caseHisId : data.caseHisId,
		recordId : "",
		patientCode : myData.diagnoseId
	}
	thisPage.reLoadData(2, 2, "grid");
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
	var fontSizeContainer = $("<div id='fontSizeContainer' style='margin-top:-40px'></div>");
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
			"margin-top" : "-205px"
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

