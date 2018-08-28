//*****************************************ligerUI-Layout-2.0
var appName="dssweb";
var loading1=$("<div class='loading full'><div><img src='/"+appName+"/js/UI2.0/skins/PC-A/images/layout/loading1.gif' width=0 height=0/></div><div id='text'></div></div>");
loading1.min="loading1";
var success1=$("<div class='loading'><div><img src='/"+appName+"/js/UI2.0/skins/PC-A/images/layout/success1.png' width=0 height=0/></div><div id='text'></div></div>");
success1.min="success1";
var error1=$("<div class='loading'a><div><img src='/"+appName+"/js/UI2.0/skins/PC-A/images/layout/error1.png' width=0 height=0/></div><div id='text'></div></div>");
error1.min="error1";
var warn1=$("<div class='loading'><div><img src='/"+appName+"/js/UI2.0/skins/PC-A/images/layout/warn1.png' width=0 height=0/></div><div id='text'></div></div>");
warn1.min="warn1";
var goEdit="/"+appName+"/js/UI2.0/skins/PC-A/images/layout/goEdit.png";
var noEdit="/"+appName+"/js/UI2.0/skins/PC-A/images/layout/noEdit.png";
var showButtons="/"+appName+"/js/UI2.0/skins/PC-A/images/layout/showButton.png";
var titleHeight=53;
myData= new Object();
paramData=new Object();
myData._id="mydata";
var colors={
		abank:"#079484",
		red:"#c00000",
		blue:"#0080c0",
		titleBlue:"#09a2da",
		green:"#32c000",
		yellow:"#bec000",
		orange:"#c04d00",
		lightBlue:"#00b0c0",
		gray:"#999999",
		white:"#ffffff",
		titleBlue2: "#176eb9",
		skyblue: "#2586d9"
	};
dialogShow=function(text,front,width,loader){
	try{
		if(!loader) {
			loader=loading1.clone();
			loader.min=loading1.min;
		}
		var parenter=$(".jp-container:last").find("form");
		var C=parenter.parents(".l-page-panel").ligerGetPageManager();
		if(!front) front=$(".loading:last");
		if(width){
			if(width.indexOf("%")){
				width=$(".l-page-header")[0].clientWidth*width.substring(0,width.length-1)/100;
			}
		}else width=70;
		var loadermin=loader.min.substring(0,1);
		if(!text){
			switch(loadermin){
			case "l":
				text="加载中...";
				break;
			case "e":
				text="错误！";
				break;
			case "s":
				text="成功！";
				break;
			case "w":
				text="警告！";
				break;
			}
		}
		var texts=text.split("<br/>");
		var rows=0;
		for(var i=0;i<texts.length;i++){
			rows+=Math.ceil(lenFor(texts[i])*7/width);
		}
		var height=0;
		if(rows==1) height=52;
		else {
			height=(rows>10?10:rows)*32+20;
			loader.find("#text").css("text-align","left")
		}
		var img=loader.find("img");
		var div=img.parent();
		div.css({"padding":"0px"});
		img.css({"width":"0px","height":"0px"});
		loader.show();
		if(front.length!=0) {;
			front.after(loader.css({"width":"0px","height":"0px"}));
			front.parent().slideDown(100);
		}else{
			parenter.append(loader.css({"width":"0px","height":"0px"}));
		}

		loader.animate({ width:"52px",height:"52px"},300);
		div.animate({ padding:"10px"},300);
		img.animate({width:"32px",height:"32px"}, 300,function(){
			loader.animate({ width:(width+100)+"px",height:height+"px"},300,function(){
					loader.find("#text").css("width",width+"px");
					loader.find("#text").html(text);
					if(C) C.onResize(false);// 第一次页面加载时的pageManager是获取不到的。但是后续的弹出可以。
					return true;
				});	
		});
	}catch(e){
		return false;
		// alert(e);
	}
};
dialogHide=function(parent){
	try{
		var hider=parent;
		var finder=parent?parent:$(".l-page-panel:last");
		
		var loader=finder.find(".loading");
		loader.html("");
		loader.animate({ height:"0px",width:"0px",marginTop:"0px",marginBottom:"0px"},200,function(){
			loader.remove();
			if(hider) hider.hide();
			});
		 
		
	}catch(e){
		alert(e);
	}
};
function showShade(s){
	var shade=$(".shade");
	if(shade.length){
		shade.show();
	}else{
		if(s==null||s==true){
			var shadeColor=$(".l-page-panel:last").css("background-color");
			var height="100%";
			try{
				height=thisPage.page.find("form").css("height");
			}catch(exception){
				
			}
			$(".l-page-content:last").append($("<div class='shade'></div>").css(
					{
						"background-color":shadeColor,
						"height":height,
						"opacity":0.5
					}).bind("touchstart",function(e){
						e.stopPropagation();
						 e.preventDefault();
					}));
		}
		//$(".l-page-content:last").append($("<div class='shade'></div>").css("background-color","#666"));
		else{
			$(".l-page-header-title:last").append($("<div class='shade'></div>").css("background-color",$(".l-page-header-title:last").css("background-color")));
		}
	}
}
function hideShade(){
	var shade=$(".shade");
	if(shade.length){
		shade.fadeOut(function(){
			shade.remove();
		});
		
	}
}
function myConfirm(str,buttons){
	var shade=$("<div class='sshade'></div>").css({"background-color": "#fff"}).bind("touchstart",function(e){
//		shade.remove();buts.remove();
//		thisPage.page.css({"-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
		e.stopPropagation();
		e.preventDefault();
		buts.css({"webkitTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
		buts.css({"transform":"translate(0px,0px) scale(1) translateZ(0px)"});
		buts.css({"mozTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
		buts.css({"oTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
		shade.css({"filter": "Alpha(opacity =   0)",
		"-ms-filter": "opacity(0)",
		"opacity": "0",
		"-webkit-filter": "opacity(0)",
		"-moz-filter": "opacity(0)"});
		setTimeout(function(){
			thisPage.page.css({"-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
			shade.remove();buts.remove();
		},300);
	});
	shade.bind(eClick,function(e){
//		shade.remove();buts.remove();
//		thisPage.page.css({"-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
		e.stopPropagation();
		e.preventDefault();
		buts.css({"webkitTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
		buts.css({"transform":"translate(0px,0px) scale(1) translateZ(0px)"});
		buts.css({"mozTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
		buts.css({"oTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
		shade.css({"filter": "Alpha(opacity =   0)",
		"-ms-filter": "opacity(0)",
		"opacity": "0",
		"-webkit-filter": "opacity(0)",
		"-moz-filter": "opacity(0)"});
		setTimeout(function(){
			thisPage.page.css({"-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
			shade.remove();buts.remove();
		},300);
	});
	$("body").append(shade);
	shade.css({"height":"100%"});
	shade.css({"filter": "Alpha(opacity =   0)",
		"-ms-filter": "opacity(0)",
		"opacity": "0",
		"-webkit-filter": "opacity(0)",
		"-moz-filter": "opacity(0)"});
	thisPage.page.css({"-webkit-filter":"blur(3px)","-ms-filter":"blur(3px)","filter":"blur(3px)","-moz-filter":"blur(3px)"});
	var string=$("<div style='position: absolute; left: 0px; top:120px; z-index:10000; width:100%;text-align:center;font-size:20px;line-height:30px;font-weight:600;'>"+str+"</div>");
	var butsH=67*buttons.length-2;
	var buts=$("<div class='ease_out' style='position: absolute; left: 0px;height:"+butsH+"px;  bottom: -"+(butsH+2)+"px; z-index:10001; width:100%;'></div>");
	shade.append(string);
	$("body").append(buts);
	$(buttons).each(
		function(H, I) {
			var B=$("<div class='l-page-button'>"+I.text+"</div>");
			
			if(I.id){
				if(I.id.indexOf("exit")>-1||I.id.indexOf("cancel")>-1){
					B.css("color",colors.gray);
					B.css("background-color","#fff");
				}
				if(I.id.indexOf("save")>-1||I.id.indexOf("add")>-1){
					B.css("background-color",colors.abank);
					B.css("color","#fff");
				}
				if(I.id.indexOf("delete")>-1||I.id.indexOf("remove")>-1){
					B.css("background-color",colors.red);
					B.css("color","#fff");
				}
			}
			if(I.color){
				B.css("color",colors[I.color]?colors[I.color]:I.color);
				B.css("background-color","#fff");
			}
				
			if(I.backgroundColor){
				B.css("background-color",colors[I.backgroundColor]?colors[I.backgroundColor]:I.backgroundColor);
				if(!I.color) B.css("color","#fff");
			}
			I.color=B.css("color");
			I.backgroundColor=B.css("background-color");
			buts.append(B);
			B.bind(eClick,function(){
				var thisP=thisPage;
				if(I.func)
					I.func();
//				shade.remove();buts.remove();
//				thisPage.page.css({"-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
//				
				buts.css({"webkitTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
				buts.css({"transform":"translate(0px,0px) scale(1) translateZ(0px)"});
				buts.css({"mozTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
				buts.css({"oTransform":"translate(0px,0px) scale(1) translateZ(0px)"});
				shade.css({"filter": "Alpha(opacity =   0)",
				"-ms-filter": "opacity(0)",
				"opacity": "0",
				"-webkit-filter": "opacity(0)",
				"-moz-filter": "opacity(0)"});
				setTimeout(function(){
					thisP.page.css({"-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
					shade.remove();buts.remove();string.remove();
				},300);
			})
		});
	setTimeout(function(){
		shade.addClass("ease_out");
		shade.css({"filter": "Alpha(opacity =   90)",
			"-ms-filter": "opacity(0.9)",
			"opacity": "0.9",
			"-webkit-filter": "opacity(0.9)",
			"-moz-filter": "opacity(0.9)"});
		buts.css({"webkitTransform":"translate(0px,-"+butsH+"px) scale(1) translateZ(0px)"});
		buts.css({"transform":"translate(0px,-"+butsH+"px) scale(1) translateZ(0px)"});
		buts.css({"mozTransform":"translate(0px,-"+butsH+"px) scale(1) translateZ(0px)"});
		buts.css({"oTransform":"translate(0px,-"+butsH+"px) scale(1) translateZ(0px)"});
	},1);
	
}
(function(A) {
	A.fn.ligerLayout = function(C) {
		return A.ligerui.run.call(this, "ligerLayout", arguments)
	};
	A.fn.ligerGetLayoutManager = function() {
		return A.ligerui.run.call(this, "ligerGetLayoutManager", arguments)
	};
	var B = 0;
	A.ligerDefaults.Layout = {
		topHeight : 50,
		bottomHeight : 50,
		leftWidth : 110,
		centerWidth : 100,
		rightWidth : 170,
		InWindow : true,
		heightDiff : 0,
		height : "100%",
		onHeightChanged : null,
		isLeftCollapse : false,
		isRightCollapse : false,
		allowLeftCollapse : true,
		allowRightCollapse : true,
		allowLeftResize : true,
		allowRightResize : true,
		allowTopResize : false,
		allowBottomResize : false,
		space : 0,
		onEndResize : null,
		minLeftWidth : 80,
		minRightWidth : 80,
		topBgColor:'#D0F5FD',
		centerBgColor:'#F6F6F6',
		bottomBgColor:'#ccc'
	};
	A.ligerMethos.Layout = {};
	A.ligerui.controls.Layout = function(D, C) {
		A.ligerui.controls.Layout.base.constructor.call(this, D, C)
	};
	A.ligerui.controls.Layout
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "Layout"
						},
						__idPrev : function() {
							return "Layout"
						},
						_extendMethods : function() {
							return A.ligerMethos.Layout
						},
						_render : function() {
							var F = this, H = this.options;
							F.layout = A(this.element);
							F.layout.addClass("l-layout");
							F.width = F.layout.width();
							if (A("> div[position=top]", F.layout).length > 0) {
								F.top = A("> div[position=top]", F.layout)
										.wrap(
												'<div class="l-layout-top" style="top:0px;background-color:'+H.topBgColor+'"></div>')
										.parent();
								F.top.content = A("> div[position=top]", F.top);
								if (!F.top.content.hasClass("l-layout-content")) {
									F.top.content.addClass("l-layout-content")
								}
								F.topHeight = H.topHeight;
								if (F.topHeight) {
									F.top.height(F.topHeight)
								}
							}
							if (A("> div[position=bottom]", F.layout).length > 0) {
								F.bottom = A("> div[position=bottom]", F.layout)
										.wrap(
												'<div class="l-layout-bottom" style="background-color:'+H.bottomBgColor+'"></div>')
										.parent();
								F.bottom.content = A("> div[position=bottom]",
										F.bottom);
								if (!F.bottom.content
										.hasClass("l-layout-content")) {
									F.bottom.content
											.addClass("l-layout-content")
								}
								F.bottomHeight = H.bottomHeight;
								if (F.bottomHeight) {
									F.bottom.height(F.bottomHeight)
								}
								
							}
							if (A("> div[position=left]", F.layout).length > 0) {
								F.left = A("> div[position=left]", F.layout)
										.wrap(
												'<div class="l-layout-left" style="left:0px;"></div>')
										.parent();
								F.left.content = A("> div[position=left]",
										F.left);
								if (!F.left.content
										.hasClass("l-layout-content")) {
									F.left.content.addClass("l-layout-content")
								}
								if (!H.allowLeftCollapse) {
									A(".l-layout-header-toggle", F.left.header)
											.remove()
								}
								F.leftWidth = H.leftWidth;
								if (F.leftWidth) {
									F.left.width(F.leftWidth)
								}
							}
							if (A("> div[position=center]", F.layout).length > 0) {
								F.center = A("> div[position=center]", F.layout)
										.wrap(
												'<div class="l-layout-center" style="background-color:'+H.centerBgColor+'" ></div>')
										.parent();
								F.center.content = A("> div[position=center]",
										F.center);
								F.center.content.addClass("l-layout-content");
								F.centerWidth = H.centerWidth;
								if (F.centerWidth) {
									F.center.width(F.centerWidth)
								}
							}
							if (A("> div[position=right]", F.layout).length > 0) {
								F.right = A("> div[position=right]", F.layout)
										.wrap(
												'<div class="l-layout-right"></div>')
										.parent();
								if (!H.allowRightCollapse) {
									A(".l-layout-header-toggle", F.right.header)
											.remove()
								}
								F.right.content = A("> div[position=right]",
										F.right);
								if (!F.right.content
										.hasClass("l-layout-content")) {
									F.right.content
											.addClass("l-layout-content")
								}
								F.rightWidth = H.rightWidth;
								if (F.rightWidth) {
									F.right.width(F.rightWidth)
								}
							}
							F.layout.lock = A("<div class='l-layout-lock'></div>");
							F.layout.append(F.layout.lock);
							F._addDropHandle();
							F.isLeftCollapse = H.isLeftCollapse;
							F.isRightCollapse = H.isRightCollapse;
							F.leftCollapse = A('<div class="l-layout-collapse-left" style="display: none; "><div class="l-layout-collapse-left-toggle"></div></div>');
							F.rightCollapse = A('<div class="l-layout-collapse-right" style="display: none; "><div class="l-layout-collapse-right-toggle"></div></div>');
							F.layout.append(F.leftCollapse).append(
									F.rightCollapse);
							F.leftCollapse.toggle = A(
									"> .l-layout-collapse-left-toggle",
									F.leftCollapse);
							F.rightCollapse.toggle = A(
									"> .l-layout-collapse-right-toggle",
									F.rightCollapse);
							F._setCollapse();
							F._bulid();
							A(window).resize(function() {
								F._onResize();
							});
							F.set(H)
						},
						setLeftCollapse : function(D) {
							var C = this, E = this.options;
							if (!C.left) {
								return false
							}
							C.isLeftCollapse = D;
							if (C.isLeftCollapse) {
								C.leftCollapse.show();
								C.leftDropHandle && C.leftDropHandle.hide();
								C.left.hide()
							} else {
								C.leftCollapse.hide();
								C.leftDropHandle && C.leftDropHandle.show();
								C.left.show()
							}
							C._onResize()
						},
						setRightCollapse : function(D) {
							var C = this, E = this.options;
							if (!C.right) {
								return false
							}
							C.isRightCollapse = D;
							C._onResize();
							if (C.isRightCollapse) {
								C.rightCollapse.show();
								C.rightDropHandle && C.rightDropHandle.hide();
								C.right.hide()
							} else {
								C.rightCollapse.hide();
								C.rightDropHandle && C.rightDropHandle.show();
								C.right.show()
							}
							C._onResize()
						},
						_bulid : function() {
							var C = this, D = this.options;
							C.middleTop = 0;
							if (C.top) {
								C.middleTop += C.top.height();
								C.middleTop += parseInt(C.top
										.css("borderTopWidth"));
								C.middleTop += parseInt(C.top
										.css("borderBottomWidth"));
								C.middleTop += D.space
							}
							if (C.left) {
								C.left.css({
									top : C.middleTop
								});
								C.leftCollapse.css({
									top : C.middleTop
								})
							}
							if (C.center) {
								C.center.css({
									top : C.middleTop
								})
							}
							if (C.right) {
								C.right.css({
									top : C.middleTop
								});
								C.rightCollapse.css({
									top : C.middleTop
								})
							}
							if (C.left) {
								C.left.css({
									left : 0
								})
							}
							C._onResize()
						},
						_setCollapse : function() {
							var C = this, D = this.options;
							C.leftCollapse.hover(function() {
								A(this).addClass("l-layout-collapse-left-over")
							}, function() {
								A(this).removeClass(
										"l-layout-collapse-left-over")
							});
							C.leftCollapse.toggle.hover(function() {
								A(this).addClass(
										"l-layout-collapse-left-toggle-over")
							}, function() {
								A(this).removeClass(
										"l-layout-collapse-left-toggle-over")
							});
							C.rightCollapse.hover(function() {
								A(this)
										.addClass(
												"l-layout-collapse-right-over")
							}, function() {
								A(this).removeClass(
										"l-layout-collapse-right-over")
							});
							C.rightCollapse.toggle.hover(function() {
								A(this).addClass(
										"l-layout-collapse-right-toggle-over")
							}, function() {
								A(this).removeClass(
										"l-layout-collapse-right-toggle-over")
							});
							C.leftCollapse.toggle.click(function() {
								C.setLeftCollapse(false)
							});
							C.rightCollapse.toggle.click(function() {
								C.setRightCollapse(false)
							});
							if (C.left && C.isLeftCollapse) {
								C.leftCollapse.show();
								C.leftDropHandle && C.leftDropHandle.hide();
								C.left.hide()
							}
							if (C.right && C.isRightCollapse) {
								C.rightCollapse.show();
								C.rightDropHandle && C.rightDropHandle.hide();
								C.right.hide()
							}
						},
						_addDropHandle : function() {
							var C = this, D = this.options;
							if (C.left) {
								C.leftDropHandle = A("<div class='l-layout-drophandle-left'></div>");
								C.layout.append(C.leftDropHandle);
								C.leftDropHandle && C.leftDropHandle.show();
								if(D.allowLeftResize)C.leftDropHandle.mousedown(function(E) {
									C._start("leftresize", E)
								});
								else{
									C.leftDropHandle.css("cursor","default");
								}
							}
							if (C.right) {
								C.rightDropHandle = A("<div class='l-layout-drophandle-right'></div>");
								C.layout.append(C.rightDropHandle);
								C.rightDropHandle && C.rightDropHandle.show();
								if(D.allowRightResize)C.rightDropHandle.mousedown(function(E) {
									C._start("rightresize", E)
								});
								else{
									C.rightDropHandle.css("cursor","default");
								}
							}
							if (C.top && D.allowTopResize) {
								C.topDropHandle = A("<div class='l-layout-drophandle-top'></div>");
								C.layout.append(C.topDropHandle);
								C.topDropHandle.show();
								C.topDropHandle.mousedown(function(E) {
									C._start("topresize", E)
								})
							}
							if (C.bottom && D.allowBottomResize) {
								C.bottomDropHandle = A("<div class='l-layout-drophandle-bottom'></div>");
								C.layout.append(C.bottomDropHandle);
								C.bottomDropHandle.show();
								C.bottomDropHandle.mousedown(function(E) {
									C._start("bottomresize", E)
								})
							}
							C.draggingxline = A("<div class='l-layout-dragging-xline'></div>");
							C.draggingyline = A("<div class='l-layout-dragging-yline'></div>");
							C.layout.append(C.draggingxline).append(
									C.draggingyline)
						},
						_setDropHandlePosition : function() {
							var C = this, D = this.options;
							if (C.leftDropHandle) {
								C.leftDropHandle.css({
									left : C.left.width()
											+ parseInt(C.left.css("left")),
									height : C.middleHeight,
									top : C.middleTop
								})
							}
							if (C.rightDropHandle) {
								C.rightDropHandle.css({
									left : parseInt(C.right.css("left"))
											- D.space,
									height : C.middleHeight,
									top : C.middleTop
								})
							}
							if (C.topDropHandle) {
								C.topDropHandle.css({
									top : C.top.height()
											+ parseInt(C.top.css("top")),
									width : C.top.width()
								})
							}
							if (C.bottomDropHandle) {
								C.bottomDropHandle.css({
									top : parseInt(C.bottom.css("top"))
											- D.space,
									width : C.bottom.width()
								})
							}
						},
						_onResize : function() {
							var H = this, I = this.options;
							var C = H.layout.height();
							var F = 0;
							var J = A(window)[0].innerHeight;
							var E = null;
							if (typeof (I.height) == "string"
									&& I.height.indexOf("%") > 0) {
								var D = H.layout.parent();
								if (I.InWindow
										|| D[0].tagName.toLowerCase() == "body") {
									E = J;
									E -= parseInt(A("body").css("paddingTop"));
									E -= parseInt(A("body")
											.css("paddingBottom"))
								} else {
									E = D.height()
								}
								F = E * parseFloat(I.height) * 0.01;
								if (I.InWindow
										|| D[0].tagName.toLowerCase() == "body") {
									F -= (H.layout.offset().top - parseInt(A(
											"body").css("paddingTop")))
								}
							} else {
								F = parseInt(I.height)
							}
							F += I.heightDiff;
							H.layout.height(F);
							H.layoutHeight = H.layout.height();
							H.middleWidth = H.layout.width();
							H.middleHeight = H.layout.height();
							if (H.top) {
								H.middleHeight -= H.top.height();
								H.middleHeight -= parseInt(H.top
										.css("borderTopWidth"));
								H.middleHeight -= parseInt(H.top
										.css("borderBottomWidth"));
								H.middleHeight -= I.space
							}
							if (H.bottom) {
								H.middleHeight -= H.bottom.height();
								H.middleHeight -= parseInt(H.bottom
										.css("borderTopWidth"));
								H.middleHeight -= parseInt(H.bottom
										.css("borderBottomWidth"));
								H.middleHeight -= I.space
							}
							H.middleHeight -= 0;
							if (H.hasBind("heightChanged")
									&& H.layoutHeight != C) {
								H.trigger("heightChanged", [ {
									layoutHeight : H.layoutHeight,
									diff : H.layoutHeight - C,
									middleHeight : H.middleHeight
								} ])
							}
							if (H.center) {
								H.centerWidth = H.middleWidth;
								if (H.left) {
									if (H.isLeftCollapse) {
										H.centerWidth -= H.leftCollapse.width();
										H.centerWidth -= parseInt(H.leftCollapse
												.css("borderLeftWidth"));
										H.centerWidth -= parseInt(H.leftCollapse
												.css("borderRightWidth"));
										H.centerWidth -= parseInt(H.leftCollapse
												.css("left"));
										H.centerWidth -= I.space
									} else {
										H.centerWidth -= H.leftWidth;
										H.centerWidth -= parseInt(H.left
												.css("borderLeftWidth"));
										H.centerWidth -= parseInt(H.left
												.css("borderRightWidth"));
										H.centerWidth -= parseInt(H.left
												.css("left"));
										H.centerWidth -= I.space
									}
								}
								if (H.right) {
									if (H.isRightCollapse) {
										H.centerWidth -= H.rightCollapse
												.width();
										H.centerWidth -= parseInt(H.rightCollapse
												.css("borderLeftWidth"));
										H.centerWidth -= parseInt(H.rightCollapse
												.css("borderRightWidth"));
										H.centerWidth -= parseInt(H.rightCollapse
												.css("right"));
										H.centerWidth -= I.space
									} else {
										H.centerWidth -= H.rightWidth;
										H.centerWidth -= parseInt(H.right
												.css("borderLeftWidth"));
										H.centerWidth -= parseInt(H.right
												.css("borderRightWidth"));
										H.centerWidth -= I.space
									}
								}
								H.centerLeft = 0;
								if (H.left) {
									if (H.isLeftCollapse) {
										H.centerLeft += H.leftCollapse.width();
										H.centerLeft += parseInt(H.leftCollapse
												.css("borderLeftWidth"));
										H.centerLeft += parseInt(H.leftCollapse
												.css("borderRightWidth"));
										H.centerLeft += parseInt(H.leftCollapse
												.css("left"));
										H.centerLeft += I.space
									} else {
										H.centerLeft += H.left.width();
										H.centerLeft += parseInt(H.left
												.css("borderLeftWidth"));
										H.centerLeft += parseInt(H.left
												.css("borderRightWidth"));
										H.centerLeft += I.space
									}
								}
								H.center.css({
									left : H.centerLeft
								});
								H.center.width(H.centerWidth);
								H.center.height(H.middleHeight);
								var G = H.middleHeight;
								if (H.center.header) {
									G -= H.center.header.height()
								}
								H.center.content.height(G)
							}
							if (H.left) {
								H.leftCollapse.height(H.middleHeight);
								H.left.height(H.middleHeight);
								H.left.content.height(H.middleHeight);
							}
							if (H.right) {
								H.rightCollapse.height(H.middleHeight);
								H.right.height(H.middleHeight);
								H.rightLeft = 0;
								if (H.left) {
									if (H.isLeftCollapse) {
										H.rightLeft += H.leftCollapse.width();
										H.rightLeft += parseInt(H.leftCollapse
												.css("borderLeftWidth"));
										H.rightLeft += parseInt(H.leftCollapse
												.css("borderRightWidth"));
										H.rightLeft += I.space
									} else {
										H.rightLeft += H.left.width();
										H.rightLeft += parseInt(H.left
												.css("borderLeftWidth"));
										H.rightLeft += parseInt(H.left
												.css("borderRightWidth"));
										H.rightLeft += parseInt(H.left
												.css("left"));
										H.rightLeft += I.space
									}
								}
								if (H.center) {
									H.rightLeft += H.center.width();
									H.rightLeft += parseInt(H.center
											.css("borderLeftWidth"));
									H.rightLeft += parseInt(H.center
											.css("borderRightWidth"));
									H.rightLeft += I.space
								}
								H.right.css({
									left : H.rightLeft
								})
							}
							if (H.bottom) {
								H.bottomTop = H.layoutHeight
										- H.bottom.height() - 2;
								H.bottom.css({
									top : H.bottomTop
								})
							}
							H._setDropHandlePosition()
						},
						_start : function(F, E) {
							var C = this, D = this.options;
							C.dragtype = F;
							if (F == "leftresize" || F == "rightresize") {
								C.xresize = {
									startX : E.pageX
								};
								C.draggingyline.css({
									left : E.pageX - C.layout.offset().left,
									height : C.middleHeight,
									top : C.middleTop
								}).show();
								A("body").css("cursor", "col-resize")
							} else {
								if (F == "topresize" || F == "bottomresize") {
									C.yresize = {
										startY : E.pageY
									};
									C.draggingxline.css({
										top : E.pageY - C.layout.offset().top,
										width : C.layout.width()
									}).show();
									A("body").css("cursor", "row-resize")
								} else {
									return
								}
							}
							C.layout.lock.width(C.layout.width());
							C.layout.lock.height(C.layout.height());
							C.layout.lock.show();
							if (A.support.boxModel) {
								A("body").bind("selectstart", function() {
									return false
								})
							}
							A(document).bind("mouseup", function() {
								C._stop.apply(C, arguments)
							});
							A(document).bind("mousemove", function() {
								C._drag.apply(C, arguments)
							})
						},
						_drag : function(E) {
							var C = this, D = this.options;
							if (C.xresize) {
								C.xresize.diff = E.pageX - C.xresize.startX;
								C.draggingyline.css({
									left : E.pageX - C.layout.offset().left
								});
								A("body").css("cursor", "col-resize")
							} else {
								if (C.yresize) {
									C.yresize.diff = E.pageY - C.yresize.startY;
									C.draggingxline.css({
										top : E.pageY - C.layout.offset().top
									});
									A("body").css("cursor", "row-resize")
								}
							}
						},
						_stop : function(F) {
							var C = this, E = this.options;
							var D;
							if (C.xresize && C.xresize.diff != undefined) {
								D = C.xresize.diff;
								if (C.dragtype == "leftresize") {
									if (E.minLeftWidth) {
										if (C.leftWidth + C.xresize.diff < E.minLeftWidth) {
											return
										}
									}
									C.leftWidth += C.xresize.diff;
									C.left.width(C.leftWidth);
									if (C.center) {
										C.center.width(
												C.center.width()
														- C.xresize.diff).css(
												{
													left : parseInt(C.center
															.css("left"))
															+ C.xresize.diff
												})
									} else {
										if (C.right) {
											C.right
													.width(
															C.left.width()
																	- C.xresize.diff)
													.css(
															{
																left : parseInt(C.right
																		.css("left"))
																		+ C.xresize.diff
															})
										}
									}
								} else {
									if (C.dragtype == "rightresize") {
										if (E.minRightWidth) {
											if (C.rightWidth - C.xresize.diff < E.minRightWidth) {
												return
											}
										}
										C.rightWidth -= C.xresize.diff;
										C.right.width(C.rightWidth).css(
												{
													left : parseInt(C.right
															.css("left"))
															+ C.xresize.diff
												});
										if (C.center) {
											C.center.width(C.center.width()
													+ C.xresize.diff)
										} else {
											if (C.left) {
												C.left.width(C.left.width()
														+ C.xresize.diff)
											}
										}
									}
								}
							} else {
								if (C.yresize && C.yresize.diff != undefined) {
									D = C.yresize.diff;
									if (C.dragtype == "topresize") {
										C.top.height(C.top.height()
												+ C.yresize.diff);
										C.middleTop += C.yresize.diff;
										C.middleHeight -= C.yresize.diff;
										if (C.left) {
											C.left.css({
												top : C.middleTop
											}).height(C.middleHeight);
											C.leftCollapse.css({
												top : C.middleTop
											}).height(C.middleHeight)
										}
										if (C.center) {
											C.center.css({
												top : C.middleTop
											}).height(C.middleHeight)
										}
										if (C.right) {
											C.right.css({
												top : C.middleTop
											}).height(C.middleHeight);
											C.rightCollapse.css({
												top : C.middleTop
											}).height(C.middleHeight)
										}
									} else {
										if (C.dragtype == "bottomresize") {
											C.bottom.height(C.bottom.height()
													- C.yresize.diff);
											C.middleHeight += C.yresize.diff;
											C.bottomTop += C.yresize.diff;
											C.bottom.css({
												top : C.bottomTop
											});
											if (C.left) {
												C.left.height(C.middleHeight);
												C.leftCollapse
														.height(C.middleHeight)
											}
											if (C.center) {
												C.center.height(C.middleHeight)
											}
											if (C.right) {
												C.right.height(C.middleHeight);
												C.rightCollapse
														.height(C.middleHeight)
											}
										}
									}
								}
							}
							C.trigger("endResize", [
									{
										direction : C.dragtype ? C.dragtype
												.replace(/resize/, "") : "",
										diff : D
									}, F ]);
							C._setDropHandlePosition();
							C.draggingxline.hide();
							C.draggingyline.hide();
							C.xresize = C.yresize = C.dragtype = false;
							C.layout.lock.hide();
							if (A.support.boxModel) {
								A("body").unbind("selectstart")
							}
							A(document).unbind("mousemove", C._drag);
							A(document).unbind("mouseup", C._stop);
							A("body").css("cursor", "")
						}
					})
})(jQuery);
// *****************************************ligerUI-ligerMenu-2.0
(function(A) {
	A.fn.ligerMenu = function() {
		return A.ligerui.run.call(this, "ligerMenu", arguments);
	};
	A.ligerDefaults = A.ligerDefaults || {};
	A.ligerDefaults.Menu = {
		color:'#666',
		bgColor:'#fff',
		hoverColor:'#ccc',
		bgHoverColor:'#fff',
		activeColor:'#999',
		bgActiveColor:'#fff',
		radius:'18px',
		lineHeight:'36px',
		menus:[],
		menuObjs:[],
		appendID : true,
		prefixID : ""
	};
	
	A.ligerui.controls.Menu = function(C, B) {
		A.ligerui.controls.Menu.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Menu.ligerExtend(A.ligerui.core.UIComponent, {
		__getType : function() {
			return "Menu"
		},
		__idPrev : function() {
			return "Menu"
		},
		_init : function() {
			A.ligerui.controls.Menu.base._init.call(this)
		},
		_render : function() {
			var D = this, E = this.options;
			var C = A(this.element);
			var B=$("<div class='menu-box'></div>");
			var R=$("<div class='m-menu-icon-box-r'></div>");
			var L=$("<div class='m-menu-icon-box-l'></div>");
			var m=0;
			if (E.icons && E.icons.length) {
				A(E.icons).each(
					function(H, I) {
						var O=$("<div class='m-menu-icon'></div>");
						O.css({"backgroundImage":"url("+I.img+")"});
						O.bind("mouseover",function(){
							O.css({"backgroundPosition":"0px 0px"})
							});
						O.bind("mouseout",function(){
							O.css({"backgroundPosition":"0px -36px"})
						});
						if(I.position=="right")
							R.append(O);
						else
							L.append(O);
						if(I.onclick) O.bind(eClick,I.onclick);
					}
				);
				if(R.length>0) C.append(R);
				if(R.length>0) C.append(L);
				// B.css("width",140*E.menus.length+"px");
				
				// m=40*E.icons.length;
				// B.css("max-width",D.element.offsetWidth-m+"px");
			}
			if (E.menus && E.menus.length) {
				var w=0;
				A(E.menus).each(
					function(H, I) {
						var M;
						if(I.isOpend)
							M=$("<div class='m-menu m-menu-on ease' id="+I.id+"></div>");
						else
							M=$("<div class='m-menu m-menu-off ease' id="+I.id+"></div>");
						if(I.text) M.append(I.text);
						if(I.onclick) M.bind(eClick,function(bt){
							D.click(bt,I.onclick);
							});
						B.append(M);
						E.menuObjs.push(M);
						var wplus=16*I.text.length;
						if(wplus<60) wplus=60;
						wplus+=50;
						w+=wplus;
					}
				);
				B.css("width",w+"px");
			}
			C.append(B);
		},
		click:function(bt,onclick){
			var E = this.options;
			A(E.menuObjs).each(
					function(H, I) {
						I.removeClass("m-menu-on").addClass("m-menu-off");
						if(I[0].id==$(bt.target)[0].id) I.removeClass("m-menu-off").addClass("m-menu-on");
					}
				);
			onclick();
		},
		select:function(id){
			var E = this.options;
			A(E.menuObjs).each(
					function(H, I) {
						I.removeClass("m-menu-on").addClass("m-menu-off");
						if(I[0].id==id) I.removeClass("m-menu-off").addClass("m-menu-on");
					}
				);
		}
	})
})(jQuery);
// *****************************************ligerUI-Page-2.0
(function(A) {
	A.fn.ligerPage = function(B) {
		return A.ligerui.run.call(this, "ligerPage", arguments)
	};
	A.fn.ligerGetPageManager = function() {
		return A.ligerui.get(this)
	};	
	A.ligerDefaults.Page = {
		height:'100%',
		data:{},
		title : null,
		titleHeight:48,
		subTitle : null,
		backButton : true,
		propertyButton : false,
		iconEnable:false,
		content:[],
 		labelWidth:40,
		prefixID : "",
		_focus:null,
		onBeforeSubmit:null,
		onAfterLoad:null
	};
	A.ligerMethos.Page = {};
	A.ligerui.controls.Page = function(C, B) {
		A.ligerui.controls.Page.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Page
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "Page"
						},
						__idPrev : function() {
							return "Page"
						},
						_extendMethods : function() {
							return A.ligerMethos.Page
						},
						_render : function() {
							var C = this, D = this.options;
							C.page = A(C.element);
							C.groups=[];
							if (!C.page.hasClass("l-page-panel")) {
								C.page.addClass("l-page-panel")
							}
							C.titlePanelHeight=0;
							if(D.title||D.subTitle){
								C.titlePanelHeight=D.titleHeight;
								var T=$("<div class='l-page-header'></div>");
								if(D.titleBgColor)
									T.css("background-color",eval("colors."+D.titleBgColor));
								if(D.title&&D.title.length>0)
								{
									var t1=$("<div class='l-page-header-title'>"+D.title+"</div>");
									if(eClick=="tap") 
										myAppTitle(D.title);
									T.append(t1);
									if(D.titleColor)
										t1.css("color",eval("colors."+D.titleColor));
								}
								if(typeof(D.subTitles)=="function"){
									D.subTitle=D.subTitle();
								}
//								var wrap=$("<div class='wrap'></div>");
								var messageBox =$("<div class='messageBox ease' name='massage'>"+(D.subTitle?D.subTitle:"")+"</div>");
								C.page.append(messageBox);
								var mask = $("<div class='mask'>")
								C.page.append(mask);
								mask.hide();
//								T.append(wrap);
//								if(D.titleColor)
//									t2.css("color",eval("colors."+D.titleColor));
								if(D.backButton) {
									T.append($("<div class='l-page-header-backButton'>"+D.backButton+"</div>").bind(eClick ,function(){
										if(D.backPage) window.location.href=D.backPage;
										else if(D.onBack) D.onBack(C);
										else C.endEdit(C.page)}).css("color",eval("colors."+D.titleColor)));
								}
								if(D.propertyButton) {
									C.property=function(){
										myConfirm("点击空白关闭",D.propertyButton);
									};
									if(eClick=="tap") 
										myAppProperty(C.property);
									T.append($("<div class='l-page-header-propertyButton'><div><div><span></span><span></span><span></span></div></div></div>").bind(eClick,
											C.property
									).css("color",eval("colors."+D.titleColor)));
								
								}
								C.page.append(T);
									if(eClick=="tap") T.remove();
							}
							// 创建内容下拉容器，再初始化数据和样式。
							if(D.tabPage){
								C.page.content=$("<form/>");
								C.page.append($("<div id='"+D.prefixID+"c'></div>").append(C.page.content));
								C.loadData();
								C.validtor=C._validtor();
								C.page.content.append($(D.foot));
							}else{
								C.page.content=$("<form/>");
								C.page.append($("<div class='l-page-content jp-container' id='"+D.prefixID+"c'></div>").append(C.page.content));
								C.loadData();
								
								C.validtor=C._validtor();
								C.page.content.append($(D.foot));
								A(window).resize(function() {
									 C.onResize();
									 $(".resizeFontEnable").trigger("resizeFont");
								})
								C.onResize(true);
								C.showPage(); 
							}

							C.page.content.bind('touchstart', function (e) {
					            var touch = e.originalEvent.touches[0];
					            C.page.startPosition = {
					                x: touch.pageX,
					                y: touch.pageY
					            }
					        });

							C.page.content.bind('touchmove', function (e) {
					            var touch = e.originalEvent.touches[0];
					            C.page.endPosition = {
					                x: touch.pageX,
					                y: touch.pageY
					            }
					            C.page.deltaX =  C.page.endPosition.x -  C.page.startPosition.x;
					            C.page.deltaY =  C.page.endPosition.y -  C.page.startPosition.y;
					            C.page. moveLength = Math.sqrt(Math.pow(Math.abs( C.page.deltaX ), 2) + Math.pow(Math.abs(C.page.deltaY), 2));
					        });
							//滑动后退
							if(!D.disTouchBack)
								C.page.content.bind("swipeRight",function(e){
									if(pages.length>1&&  C.page.deltaX>160) thisPage.endEdit();})
							C.page.content.parent().css("overflow","auto");
							C.page.content.parent().bind("tap",function(e){
								e.stopPropagation();
							});
							var pc = $.extend({}, D);
							delete pc.content;
							delete pc.buttons;
							C.set(pc);//绑定on事件的方法。
						},
						_addRow:function(G,afterRow,rid,icon,multi,submit,select,unselect){
							var R=$("<tr id='"+rid+"'></tr>");
							var first = $("<td width='15px'></td>");
							R.append(first);
							if(G.iconEnable) {
								if(icon) R.append($("<td class='l-page-icon'><div><img width='30px' height='30px' src='"+icon+"'></img></div></td>"));
								else R.append($("<td class='l-page-icon'></td>"));	
							}
							if(afterRow)
								R.insertAfter(afterRow);
							else G.append(R);
							R.bind(eClick,function(e){
								var i=R.find("input");
								if(i.length==0) return;
								else i=i.get(0);
								switch(i.type){
									case "text":
										setTimeout(function(){i.focus();}, 100 );
										setTimeout(function(){ var t=$(i).parents("tr").offset().top;var top= t- 120; thisPage.page.find(".jp-container").scrollTop(thisPage.page.find(".jp-container").scrollTop()+top);}, 500 );
										break;
									case "hidden":
										i=$(i).next();
										i.trigger("change",[G,multi,R,submit,select,unselect]);
										break;	
									default:
										setTimeout(function(){i.focus();}, 100 );
									
								}
								
							});
							R.id=G.id+"r"+rid;
							R.index=rid;
							return R;
						},
						_changeSelect:function(e,group,multi,row,submit,select,unselect){// 改变选中状态
							var c=$(row).find(".l-page-listbox");
							var s=c.css("background-position");
							var t=["0px 0px","left center","left bottom"];
							c.css("background-position",(s==t[0]?(multi?t[2]:t[0]):t[0]));
							if(s==t[0]){// 如果是选中状态变为非选中状态
								if(multi){// 多选则取消选中，单选则不进行任何操作。
									for (var i in group.selectedRows) {
										if (group.selectedRows[i]==row) {
											group.selectedRows.splice(i,1);
											group.selectedText.splice(i,1);
											group.selectedValue.splice(i,1);
										}
									}
								}else{
									return;
								}
							}
							else{// 如果是非选中状态变为选中状态
								if(!multi) {// 单选先去掉原选中的，再选择本次选择的
									for(var i in group.selectedRows){
										group.selectedRows[i].find(".l-page-listbox").css("background-position",t[1]);
									}
									group.selectedRows.shift();
									group.selectedText.shift();
									group.selectedValue.shift();
								}
								group.selectedRows.push(row);
								group.selectedText.push(row.find("[name=text]").html());
								group.selectedValue.push(row.find("input").val());
							}
							var values="";
							var texts="";
							for(var i in group.selectedRows){
								values+=(","+ group.selectedRows[i].find("input").val());
								texts+=(","+ group.selectedRows[i].find("[name='text']").html());
							}
							group.children("input")[0].value=values.substr(1);
							group.children("input")[1].value=texts.substr(1);
							if(s==t[0]){// 如果是选中状态变为非选中状态
								if(unselect!=null) unselect(row,row.find("input").val(),row.find("[name=text]").html());
							}else{
								if(select!=null) select(row,row.find("input").val(),row.find("[name=text]").html());
							}
							if((group.length==1||!multi)&&submit){
								thisPage.trigger("_submit", [true]); 
							}
							 
						},
						_changeCheck:function (value,text,box){
							var re={};
							if(box.classList.contains("l-page-checked")){
								box.classList.remove("l-page-checked");
								box.getElementsByClassName("l-page-checkIcon")[0].classList.remove("l-page-checkIconS");
								var valueArray=value.split(",");
								var textArray=text.split(",");
								for(i in valueArray){
									if (valueArray[i]==box.attributes.value.value){
										if(i==0) {
											value=value.replace(valueArray[i]+(valueArray.length==1?"":","),"");
											text=text.replace(textArray[i]+(textArray.length==1?"":","),"");
										}
										else {
											value=value.replace(","+valueArray[i],"");
											text=text.replace(","+textArray[i],"");
										}
										break;	
									}
								}
								re.value=value;
								re.text=text;
								return re;
							}else{
								box.classList.add("l-page-checked");
								box.getElementsByClassName("l-page-checkIcon")[0].classList.add("l-page-checkIconS");
								if(value==null || value=="") {
									value=box.attributes.value.value;
									text=box.attributes.text.value;
								}
								else {
									value+=(","+box.attributes.value.value);
									text+=(","+box.attributes.text.value);
								}
								re.value=value;
								re.text=text;
								return re;
							}
						},
						_changeRadio:function (value,text,box){
							var re={};
							if(box.tagName==null||box.tagName!="DIV")
								box=box[0];
							if(!box.classList.contains("l-page-checked")){
								var old=$(box).parent().find(".l-page-checked");
								old.removeClass("l-page-checked");
								old.find(".l-page-radioIcon").removeClass("l-page-checkIconS");
								box.firstChild.classList.add("l-page-checked");
								box.getElementsByClassName("l-page-radioIcon")[0].classList.add("l-page-checkIconS");
								re.value=box.attributes.value.value;
								re.text=box.attributes.text.value;
								return re;
							}
						},
						selectAll:function(){
							
						},
						unselectAll:function(){
							
						},
						selectRow:function(row){// row为index或行对象
							$(row).children(".l-page-checkbox").css("background-position","left top");	
						},
						unselectRow:function(row){
							$(row).children(".l-page-checkbox").css("background-position","left center");	
						},
						onResize : function(first) {
							//return ;
							var B = this, C = this.options;
							if(B.id.indexOf("tabpage")==0){ 
								setTimeout(function(){
									C.parent.onResize();
								},50);
								return;
							}
							if(B.page.parent().length==0) return;// remove的page将无法进行resize操作。
							if (B.page.parent()[0].tagName.toLowerCase() == "body") {
								var D = A(window)[0].innerHeight;
								var W= A(window).width();
								B.setHeight(D);
								B.setWidth(W);
							} else {
								var D = (C.heightDiff?C.heightDiff:0)
										+ (B.page.parent().height()
												* parseFloat(C.height) * 0.01);
								var W=(B.page.parent().width()
										* parseFloat(C.width) * 0.01);
								B.setHeight(D);
								B.setWidth(W);
							}							
							if(eClick=="click"&&!C.tabPage){
								$(B.page).find(".jspVerticalBar").parent().remove();
								scorllbar(C.prefixID+'c') ;
							}
								
						},
						showPage:function(unanimate){
							var B = this, C = this.options;
//							window.location.href=window.location.href+"#"+B.id;
//							if(unanimate) return;
//							B.page.css({
//							"position":"absolute",
//							"top":0,"left":B.page.width()});
//							B.page.animate({left: '0px',"boxShadow":"0px 0px 50px #CCC"},100,
//									function(){
//								if(C._focus)
//									C._focus.focus().val(C._focus.val());
//								B.page.css("boxShadow","");
//							}); 
							var P=B.page;
							var w=P.width();
							P.css({
								"position":"absolute",
								"top":0,
								"webkitTransform":"translate("+w/2+"px,0px)",
								"transform":"translate("+w/2+"px,0px)",
								"mozTransform":"translate("+w/2+"px,0px)",
								"oTransform":"translate("+w/2+"px,0px)"});
							var prevs=[];
							var prev=P.prev();
							prevs.push(prev);
							while(prev!=null&&prev.length>0&&!prev.hasClass("l-page-panel")){
								prev=prev.prev();
								prevs.push(prev);
							}
							for(i in prevs){
								var prev=prevs[i];
								if(prev.length>0){
									prev.addClass("ease_out");
									prev.css("webkitTransform","translate(-50px,0px)");
									prev.css("transform","translate(-50px,0px)");
									prev.css("mozTransform","translate(-50px,0px)");
									prev.css("oTransform","translate(-50px,0px)");
									var sd=$("<div class='ease_out ssshade'></div>");
									prev.append(sd);
									sd.addClass("ease_out");
								}
							}
							setTimeout(function(){
								$(".ssshade").css({"filter": "Alpha(opacity =   60)",
									"-ms-filter": "opacity(0.6)",
									"opacity": "0.6",
									"-webkit-filter": "opacity(0.6)",
									"-moz-filter": "opacity(0.6)"});
								},1);
							P.css("z-index","1");
							setTimeout(function(){
								P.addClass("ease_out");
								P.css("webkitTransform","translate(0px,0px)");
								P.css("transform","translate(0px,0px)");
								P.css("mozTransform","translate(0px,0px)");
								P.css("oTransform","translate(0px,0px)");
//								
							},1);
							setTimeout(function(){
								P.removeClass("ease_out");
								P.css({
									"left":"0px",
									"webkitTransform":"translate(0px,0px)",
									"transform":"translate(0px,0px)"
								});
							},301);//此代码可以解决浏览器长宽翻倍
							P.find(".l-page-searchbar").slideDown();
						},
						setHeight : function(B) {
							var C = this, D = this.options;
							if(C.page.height()!=B) C.page.removeClass("ease_out");
							C.page.height(B);
							var head=$(".l-page-header");
							B -= (head.height()+1);//65的title高度需要进行补差
							A("> .l-page-content", C.page).height(B)
						},
						setWidth : function(B) {
							var C = this, D = this.options;
							if(C.page.width()!=B) C.page.removeClass("ease_out");
							C.page.width(B);
							B -= 0;
							A("> .l-page-content", C.page).css("width",B+"px");
						},
						buildContent: function ()
						{
							var C=this,D = C.options;
							if (D.content && D.content.length) {
								var G=null;
								C.rid=0;
								C.gid=0;
								A(D.content).each(
									function(H, I) {
										if(I) C.insertRow(I);
									}
								);
								var Gs=C.page.content.find("table");
								A(Gs).each(
									function(H, I){
										if(I.parentNode.tagName=="TD"||I.parentNode.tagName=="td") return;
										if(I.rows.length<=0) return;
										A(I.rows[I.rows.length-1].cells).each(
											function(h, i){
												if(!$(i).hasClass("l-page-label"))
													$(i).addClass("l-page-bottom-border");
											}
										);
									}
								);
								C.page.content.append($("<div class='l-page-foot'></div>"));
							}
							C.bind("_submit",function(disAnimate){this._submit(C,disAnimate);});
							if (D.buttons && D.buttons.length) {
								var Bs=$("<div class='l-page-button-box ease'></div>");
								C.page.content.append(Bs);
								A(D.buttons).each(
									function(H, I) {
										if(I){
										if(!(I.id.indexOf("save")>-1&&D.autoSubmit)){
											var B=$("<div class='l-page-button ease' id='"+I.id+"'>"+I.display+"</div>");
											
											if(I.id){
												if(I.id.indexOf("exit")>-1||I.id.indexOf("cancel")>-1){
													B.css("color",colors.gray);
													B.css("background-color","#fff");
												}
												if(I.id.indexOf("save")>-1||I.id.indexOf("add")>-1){
													B.css("background-color",colors.abank);
													B.css("color","#fff");
												}
												if(I.id.indexOf("delete")>-1||I.id.indexOf("remove")>-1){
													B.css("background-color",colors.red);
													B.css("color","#fff");
												}
											}
											if(I.color){
												B.css("color",colors[I.color]?colors[I.color]:I.color);
												B.css("background-color","#fff");
											}
												
											if(I.backgroundColor){
												B.css("background-color",colors[I.backgroundColor]?colors[I.backgroundColor]:I.backgroundColor);
												if(!I.color) B.css("color","#fff");
											}
											I.color=B.css("color");
											I.backgroundColor=B.css("background-color");
											
											Bs.append(B);
											//if(I.tips)C.page.content.append($("<div class='l-page-button-tips'>"+I.tips+"</div>"));
											
											B.bind(eClick,I.onclick);
											if(eClick=="click"){
												B.bind("mousedown",function(){
													B.addClass("l-page-button-press");
												});
												B.bind("mouseup",function(){B.removeClass("l-page-button-press");});
												B.bind("mouseout",function(){B.removeClass("l-page-button-press");});
//												B.bind("mousedown",function(){B.css({"background-color":"#227ac7","color":"#fff"})});
//												B.bind("mouseup",function(){B.css({"background-color":I.backgroundColor,"color":I.color})});
//												B.bind("mouseout",function(){B.css({"background-color":I.backgroundColor,"color":I.color})});
											}else{
												B.removeClass("ease");
												B.bind("touchstart",function(){
													B.addClass("l-page-button-press");
												});
												B.bind("touchend",function(){B.removeClass("l-page-button-press");});
												B.bind("touchcancel",function(){B.removeClass("l-page-button-press");});
												B.bind("touchmove",function(){B.removeClass("l-page-button-press");});
//												B.bind("touchstart",function(){B.css({"background-color":"#227ac7","color":"#fff"})});
//												B.bind("touchend",function(){B.css({"background-color":"#2586d9","color":"#fff"})});
//												B.bind("touchcancel",function(){B.css({"background-color":"#2586d9 ","color":"#fff"})});
//												B.bind("touchmove",function(){B.css({"background-color":I.backgroundColor,"color":I.color})});
												
											}
										}
										}
									}
								);
							}
							C.onResize();
							if(D.onAfterLoad!=null) D.onAfterLoad(C);
							//freeze冻结设置
							if(D.freezeStart!=null){
								var objDivContainer = $("<div class='freezeDivContainer'></div>");																
								var objDiv=[];
								for(var i=D.freezeStart;i<=D.freezeEnd;i++){
									var title=C.page.content.find(".l-page-group-title").eq(i);
									var group=title.next();
									var tips=group.next();
									objDiv.push(title);
									objDiv.push(group);
									objDiv.push(tips);
								}
								var start=C.page.content.children()[D.freezeStart];
								$(start).before(objDivContainer);
								objDivContainer.append(objDiv);
								var backColor=C.page.css("background-color");
								var next = 	objDivContainer.next();
								var parent = C.page.content.parent();
								var offsetTop = objDivContainer.position().top;
								var headHeight = $(".l-page-header").height();
								if(headHeight==null) headHeight=0;
								var replaceBox = $("<div style='height:"+objDivContainer.height()+"px;'></div>");
								parent.bind("scroll",function(){
									var scrollTop = parent.scrollTop();
								    if(scrollTop > offsetTop) {
								    	next.before(replaceBox);
								    	objDivContainer.css({"position":"absolute","top":headHeight,"z-index":"1","width":"100%","background-color":backColor, "box-shadow": "0px 1px 2px #ccc"});
								    	
								    	

								       $("body").append(objDivContainer);
								    } else {
								    	if(!objDivContainer.attr("style")) return;
								    	replaceBox.after(objDivContainer);
								    	objDivContainer.removeAttr("style");
								        replaceBox.remove();
								 }
								});
							}
						},
						clearAll: function ()
						{
							var g = this;
							g.page.html("");
						},
						clearForm: function ()
						{
							var g = this;
							g.page.find("input").val("");
							g.page.find(".l-page-checked").removeClass("l-page-checked");
							g.page.find(".l-page-checkIconS").removeClass("l-page-checkIconS");
						},
						Ajax:function(url,param,async,silence,suback,errback,shade){
							var C=this;
							showShade(shade);
//							if(!silence) dialogShow();
							var ret;
							$.ajax({
							    url: url, 
							    data: param,
							    dataType: 'json',
							 	type: "post",
							 	async : async==null?true:async,
							    success: function(msg){
								hideShade();
									if(!silence) dialogHide();
									ret=msg;
									if(ret.IsError || ret.ret_code == "9999"
										|| ret.ret_code == "8888"){
										if(!silence) dialogShow(ret.ret_msg,null,"60%",error1);
								    	if(ret.ret_msg!=null) C.showMessage(ret.ret_msg,"red",false);
										ret=false;
										if(errback) errback();
									}else{
										if(msg.ret_data&&msg.ret_data.length>500){
											C.showMessage("返回的数据过多，请分页显示！","red",false);
											return false;
										}
										C.options.data=msg.ret_data?msg.ret_data:{};
										C.options.data.code=msg.ret_code;
										C.options.data.count=msg.ret_count;
										C.options.data.msg=msg.ret_msg;
										if(!silence) C.showMessage(ret.ret_msg,"gray",false);//dialogShow(ret.ret_msg,null,null,success1);
										//if(ret.ret_msg!=null) C.showMessage(ret.ret_msg,"gray",false);
										ret=true;
										if(suback) suback(msg);
									}
									
							    }, error:function(response) {
							    	hideShade();
							    	if(!silence) dialogHide();
							    	var msg=response.responseText;
							    	msg=msg.replace("&","<br/>");
							    	if(msg.indexOf("重新登录")>-1){
							    		userLogOut();
							    		//msg=msg.replace("重新登录","<a onclick='userLogOut()'> ☛ 重新登录 ☚ </a>");
							    	}
							    	if(!silence) dialogShow(msg,null,"60%",error1);
							    	if(msg!=null) C.showMessage(msg,"red",false);
							    	else C.showMessage("出错了！","red",false);
							    	ret=false;
							    	if(errback) errback(response);
							 	}
							});
							return ret;
						},
						loadData:function(){
							var C = this,D = this.options;
							if(D.url){
								this.Ajax(D.url, D.param,false,D.content && D.content.length,
									function(){
									C.baseData=C.options.data;
									myData=C.baseData;
									C.buildContent(C)},
									function(){
										var B=$("<div class='l-page-button ease'>返回</div>");
										C.page.content.append(B);
										B.bind(eClick,function (){
											C.hidePage();
										});
									}
								)
							}else{
								C.buildContent(C);
							}
						},
						_validtor:function(){
							var va=this.page.find("form").validate({
								rules: this.options.rules,
								messages:this.options.messages,
// errorContainer: this.page.find("[name='massage']"),
								// errorLabelContainer:
								// this.page.find(".validatorContain"),
								errorPlacement:function(error,element){
									element.parents("div").next("div").children(".validatorContain").eq(0).html(error);
//									error.appendTo();
								},
								wrapper: 'li'
							});
							this.page.find("form").unbind("click");
							return va;
						},
						onEdit:function(I){
							if(I.editUrl) {
								window.location.href=I.editUrl;
								return;
							}
							var B=this,C=this.options;
							var P=$('<div id="'+C.prefixID+I.id+'Editpage"></div>');
							$("body").append(P);
							var Q=P.ligerPage({
								title:I.editerTitle?I.editerTitle:I.display,
								titleColor:C.titleColor,
								titleBgColor:C.titleBgColor,
								subTitle : (typeof(I.editerSubTitle)=="function")?I.editerSubTitle():I.editerSubTitle,
								backButton : C.title,
								propertyButton : false,
								prefixID : C.prefixID+I.id+"Edit",
								iconEnable:I.icon,
								rules:I.editerRules,
								messages:I.editerMessages,
								onBeforeSubmit:I.onBeforeSubmit,
								onSubmit:I.onSubmit,
								autoSubmit:I.autoSubmit,
								onAfterSubmit:I.onAfterSubmit,
								onAfterRemove:I.onAfterRemove,
								url:I.editerUrl,
								param:I.editerParam,
								data:C.data,
								freezeStart:I.editFreezeStart,
								freezeEnd:I.editFreezeEnd,
								labelWidth:I.editerLabelWidth==null?"40":I.editerLabelWidth,
								buttons:I.editButtons?I.editButtons:[{
									id:C.prefixID+I.id+"save",
									display:"保 存",
									onclick:function (){
										B._submit(Q);
									}
								},{
									id:C.prefixID+I.id+"cancel",
									display:"取 消",
									tips:"点击【取消】放弃编辑",
									onclick:function (){B.endEdit(P)}
								}],
								content:I.editContent?I.editContent:[{
									group:I.editGroup?I.editGroup:"对“"+I.display+"”进行编辑",
									groupTips:I.editTips,
									data:I.editerData,
									icon:I.icon,
									id:I.id,
									type:I.editerType,
									onKeyUp:I.onKeyUp,
									border:I.border,
									display:I.editerDisplay,
									gridData:I.gridData,
									gridUrl:I.gridUrl,
									gridParam:I.gridParam,
									columns:I.editerColumns,
									onClick:I.editerOnclick,
									pageEnable:I.editerPageEnable,
									pageSize:I.editerPageSize,
									editerMulti:I.editerMulti,
									editEnable:false
								}],
								rules:I.rules
							});
							pages.push(Q);
							thisPage=Q;
							if(I.onAfterLoadEdit!=null)
								I.onAfterLoadEdit(Q);

						},
						_submit:function(Q,disAnimate,param){
							if(!Q) Q=this;
							if(!Q.validtor.form()){
								Q.onResize();
								return false;
							}
							if(Q.trigger("beforeSubmit", {})==false){
								return false;
							}
							if(Q.trigger("submit", param)==false){
								return false;
							}
							if(Q.trigger("afterSubmit", {})==false){
								return false;
							}
							this.endEdit(Q.page,function(){
								Q.trigger("afterRemove", {});
							},disAnimate);
							
						},
						endEdit:function(P,afterRemove,disAnimate){
							if(!P) P=this.page;
							if(P.next().hasClass("pc-tab")) P.next().remove();
							if(disAnimate){
								pages.splice(pages.length-1,1);
								thisPage=pages[pages.length-1];
								if(afterRemove) afterRemove();
								//P.animate({left: 0-P.width(),"boxShadow":"0px 0px 0px #CCC"},400,function(){P.remove();});
								//P.slideUp(function(){P.remove();});
								P.prev().removeClass("ease_out");
								P.prev().css("webkitTransform","translate(0px,0px)");
								P.prev().css("transform","translate(0px,0px)");
								P.prev().css("mozTransform","translate(0px,0px)");
								P.prev().css("oTransform","translate(0px,0px)");
//								P.prev().css("left","0px");
								P.prev().children(".ssshade").remove();
								P.remove();
							}
							else{
//								P.css("boxShadow","0px 0px 50px #CCC");
//								P.animate({left: P.width(),"boxShadow":"0px 0px 0px #CCC"},100,function(){P.remove();pages.splice(pages.length-1,1);thisPage=pages[pages.length-1];
//								setTimeout(function(){
//									P.css({
//										"left":P.width()
//									});
//								});
									var sds =[];
									var sd = P.prev().children(".ssshade");
									sds.push(sd);
									while(sd!=null&&sd.length>0){
										sd= sd.parent().prev().children(".ssshade");
										sds.push(sd);
									}
									for(i in sds) {
										var sditem =sds[i];
										sds[i].css({"filter": "Alpha(opacity = 0)",
											"-ms-filter": "opacity(0)",
											"opacity": "0",
											"-webkit-filter": "opacity(0)",
											"-moz-filter": "opacity(0)"});
									}
								setTimeout(function(){
									for(i in sds) {
										sds[i].remove();
									}
									P.remove();pages.splice(pages.length-1,1);thisPage=pages[pages.length-1];
									if(afterRemove) afterRemove();
									
								},300);
								
//								});
								var prevs=[];
								var prev=P.prev();
								var next = P.next();
								prevs.push(next);
								prevs.push(prev);
								while(prev!=null&&prev.length>0&&!prev.hasClass("l-page-panel")){
									prev=prev.prev();
									prevs.push(prev);
								}
								prevs[0].css("webkitTransform","translate("+P.width()+"px,0px)");
								prevs[0].css("webkitTransform","translate("+P.width()+"px,0px)");
								prevs[0].css("webkitTransform","translate("+P.width()+"px,0px)");
								prevs[0].css("webkitTransform","translate("+P.width()+"px,0px)");
								
								next.remove();
								prevs.splice(0,1);
								for(i in prevs){
									var prev1=prevs[i];
//								P.addClass("ease_out");
									if(prev1.length>0)
									{
										prev1.addClass("ease_out");
										prev1.css("webkitTransform","translate(0px,0px)");
										prev1.css("transform","translate(0px,0px)");
										prev1.css("mozTransform","translate(0px,0px)");
										prev1.css("oTransform","translate(0px,0px)");
//										P.prev().css("left","0px");
									}
								}
								
								P.css("webkitTransform","translate("+P.width()+"px,0px)");
								P.css("transform","translate("+P.width()+"px,0px)");
								P.css("mozTransform","translate("+P.width()+"px,0px)");
								P.css("oTransform","translate("+P.width()+"px,0px)");
//								P.css("left",P.width()+"px");
							
							}
						},
						hidePage:function(){
							this.endEdit();
							//P=this.page;
							//P.animate({left: P.width(),"boxShadow":"0px 0px 0px #CCC"},100,function(){P.remove();pages.splice(pages.length-1,1);thisPage=pages[pages.length-1];});
						},
						goPage:function(C,I,G,afterRow){
								if(I.gridUrl){
									C.Ajax(I.gridUrl, I.gridParam, true, true, 
										function(ret){
											//G.parent().slideUp(100,function(){
												I.gridData=ret.ret_data;
												C.buildGrid(G,I,afterRow,true);
												//C.onResize(null,true);
											//});
										},function(){
											I.gridData=[];
											C.buildGrid(G,I,afterRow,true);
										},true
									);
								}else if(I.gridData){
									C.buildGrid(G,I,afterRow,true);
								}
						},
						clear:function(C,I,G,afterRow){
							I.gridData=[];
							C.buildGrid(G,I,afterRow);
						},
						__reLoadList:function(C,I,G,afterRow){
							G.parent().slideUp(300,function(){
								var L=I.data;
								if(L.url){
									if(!C.Ajax(L.url, L.param,true,true,function(retdata){
										L=retdata.ret_data;
										C.buildList(G,I,L,afterRow);
										C.onResize();
									}))
									return;
								}else if(typeof(L)=="function"){
									L=L();
									C.buildList(G,I,L,afterRow);
								}else{
									C.buildList(G,I,L,afterRow);
								}
							});	
						},
						__reLoadRadio:function(C,I,G,afterRow){
							G.parent().slideUp(300,function(){
								var L=I.data;
								if(L.url){
									if(!C.Ajax(L.url, L.param,true,true,function(retdata){
										L=retdata.ret_data;
										C.buildRadioButton(G,I,L,afterRow);
										C.onResize();
									}))
									return;
								}else if(typeof(L)=="function"){
									L=L();
									C.buildRadioButton(G,I,L,afterRow);
								}else{
									C.buildRadioButton(G,I,L,afterRow);
								}
							});	
						},
						reLoadData:function(gindex,Iindex,type){
							var C=this;
							switch(type){
								case "grid":
									if(C.grids[Iindex].gridParam!=null) C.grids[Iindex].gridParam.page=1;
									C.goPage(C,C.grids[Iindex],C.groups[gindex],C.grids[Iindex].afterRow);
									break;
								case "list":
									C.__reLoadList(C,C.lists[Iindex],C.groups[gindex],C.lists[Iindex].afterRow);
									break;
								case "radioButton":
									C.__reLoadRadio(C,C.radioButtons[Iindex],C.groups[gindex],C.radioButtons[Iindex].afterRow);
									break;
							}
						},
						flushGroup:function(gindex,name,tips){
							var C=this;
							if(name!=null)C.groups[gindex].parent().prev().html(name);
							if(tips!=null)C.groups[gindex].parent().next().html(tips+'<div class="validatorContain"></div>');
						},
						
						
						showMessage:function(message,color,_alert){
							if(message==null||message.length==0) return;
							if(_alert==true)
								$(".mask").show();
							
//							var fcolor=color?eval("colors."+color):colors.orange;
							if(this.parent!=null){
								this.parent.showMessage(message,color,_alert);
								return;
							}
							var msg=$(this.page).find("[name=massage]");
//							msg.addClass("l-panel-titleMessage");
//							msg.html("<font color='"+fcolor+"'>"+message+"</font>").fadeIn();
							msg.text(message);
							msg.show ().delay (3000).fadeOut (function(){
								$(".mask").fadeOut(300);
							});
//							setTimeout(function(){
//										msg.html(thisPage?thisPage.options.subTitle:"");
//										msg.removeClass("l-panel-titleMessage");
//										},5000);
						},
						
						
						resizeFont:function(parent){
							parent=$(parent);
							var font=parent.html();
							var maxW=parent.innerWidth();
							var length=font.length+1;
							var newW=16;
							var newH=45;// 目前就定值为45了，否则没法计算。
							newW=maxW/length;
							if(newW<9) {
								newW=9;
								newH=20;
							}else if(newW>16){
								newW=16;
								newH=45;	
							}	
							parent.css("font-size",newW+"px");
							parent.css("line-height",newH+"px");
						},
						insertRow:function(I,after){
							var afterRow=null;
							var C=this, D=this.options;
							var G=C.groups[C.groups.length-1];
							if(I.group||G==null){
								var group=$("<div class='l-page-group-title'>"+(I.group?I.group:"")+"</div>");
								C.page.content.append(group);
								if (I.hideGroup) group.hide();
								G=$("<table border='0' cellspacing='0' cellpadding='0' class='l-page-group'></table>");
								C.groups.push(G);
								G.page=C.page;
								G.iconEnable=(I.iconEnable==null)?D.iconEnable:I.iconEnable;
								G.selectedRows=[];
								G.selectedText=[];
								G.selectedValue=[];
								G.index=C.gid;
								G.id="g"+(C.gid++);
								G.name=I.group;
								C.rid=0;
								C.page.content.append($("<div style='overflow:hidden; width=100%;'></div>").append(G));
								var groupTips=$("<div class='l-page-group-tips'>"+(I.groupTips?I.groupTips:"")+"</div>").append($("<div class='validatorContain'></div>"));
								C.page.content.append(groupTips);
								if (I.hideGroupTips) groupTips.hide();
							}
							if(after){
								afterRow=C.page.find("#"+after).parents("tr");
								C.rid=afterRow.id+1;
								G=afterRow.parent();
							}
							I.afterRow=afterRow;
							I.G=G;
							// 根据不同的类型显示不同的内容
							switch(I.type){
								case "label":
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									var Lb=$("<td class='l-page-label resizeFontEnable' width='"+D.labelWidth+"%'>"+I.display+"</td>");
									R.append(Lb);
									Lb.bind("resizeFont",C.resizeFont(Lb));
									Lb.trigger("resizeFont");
									var value="";
									if(typeof(I.render)=="function"){
										value=I.render(D.data);
									}else
										value=eval("D.data."+(I.editerType=="list"?(I.id+"Text"):I.id));
									R.append($("<td class='l-page-value' align='right' name='"+(I.editerType=="list"?(I.id+"Text"):I.id)+"' id='"+D.prefixID+I.id+"'></td>").html(value?value:""));
									if(I.editEnable){// 是否可以编辑
										R.append($("<td align='right' class='l-page-label' width=25><img width=25px height=36px src='"+goEdit+"'></img></td>"));
										R.bind(eClick,function(){
											if(I.onClick!=null) {
												if(I.onClick()) C.onEdit(I);
											}
											else C.onEdit(I);
										})
//										R.bind(eClick,function(){C.onEdit(I)});
									}else{
										var lock=$("<td align='right' class='l-page-label' width=25></td>");
										if(!I.hideLock)
											lock.append($("<img width=25px height=36px src='"+noEdit+"'></img>"));												
										R.append(lock);
									}
									break;
								case "labelHidden":
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									var Lb=$("<td class='l-page-label' width='"+D.labelWidth+"%'>"+I.display+"</td>");
									R.append(Lb);
									Lb.bind("resizeFont",C.resizeFont(Lb));
									Lb.trigger("resizeFont");
									var value=eval("D.data."+I.id);
									R.append($("<td class='l-page-value' align='right' name='"+I.id+"'  id='"+D.prefixID+I.id+"'></td>").html(value?"****":"空"));
									if(I.editEnable){// 是否可以编辑
										R.append($("<td align='right' class='l-page-label' width=25><img width=25px height=36px src='"+goEdit+"'></img></td>"));
										R.bind(eClick,function(){C.onEdit(I)});
									}else{
										R.append($("<td class='l-page-label'></td>"));
									}
									break;
								case "text":
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									var Lb=$("<td class='l-page-label' width='"+(I.display!=null?D.labelWidth+"%":1)+"'>"+(I.display!=null?I.display:"")+"</td>");
									R.append(Lb);
									Lb.bind("resizeFont",C.resizeFont(Lb));
									Lb.trigger("resizeFont");
									var ipt=$("<input type='text' maxlength='"+(I.maxLength||20)+"' name='"+I.id+"' id='"+I.id+"'/>");
									if(I.rows!=null) ipt=$("<textarea maxlength='"+(I.maxLength||20)+"' rows=1 name='"+I.id+"' id='"+I.id+"'  placeholder='"+(I.value!=null?I.value:"")+"'></textarea>");
									ipt.bind("keyup",I.onKeyUp);
									ipt.bind("blur",I.onBlur);
									ipt.bind("focus",I.onFocus);
									if(I.border!=null){
										ipt.bind("focus",function(){
											ipt.css("border",I.border);
										});
										ipt.bind("blur",function(){
											ipt.css("border","0px solid #ff0000");
										});
									}
									if(I.rows!=null){
										var extra =0;
										var elem = ipt[0];
										var minRows=I.minRows;
										var maxRows=I.maxRows;
										var minHeight = 30*minRows;
										var maxHeight = 30*maxRows;
									
										var /*isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
								        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),*/
								                addEvent = function (type, callback) {
								                        elem.addEventListener ?
								                                elem.addEventListener(type, callback, false) :
								                                elem.attachEvent('on' + type, callback);
								                },
								                getStyle = elem.currentStyle ? function (name) {
								                        var val = elem.currentStyle[name];
								                        
								                        if (name === 'height' && val.search(/px/i) !== 1) {
								                                var rect = elem.getBoundingClientRect();
								                                return rect.bottom - rect.top -
								                                        parseFloat(getStyle('paddingTop')) -
								                                        parseFloat(getStyle('paddingBottom')) + 'px';        
								                        };
								                        
								                        return val;
								                } : function (name) {
								                                return getComputedStyle(elem, null)[name];
								                };
								                //minHeight = parseFloat(getStyle('height'));
								        
								        
								        elem.style.resize = 'none';
							               
								        var change = function () {
								        	 var scrollTop, height,
						                        padding = 0,
						                        style = elem.style;
							                if (elem._length === elem.value.length) return;
							                elem._length = elem.value.length;
							                
							                /*if (!isFirefox && !isOpera) {
							                        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
							                };*/
							                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
							                
							                elem.style.height = minHeight + 'px';
							                if (elem.scrollHeight > minHeight) {
							                	
							                        if (maxHeight && elem.scrollHeight > maxHeight) {
							                                height = maxHeight - padding;
							                                style.overflowY = 'auto';
							                        } else {
							                                height = elem.scrollHeight - padding;
							                                style.overflowY = 'scroll';
							                        };
							                        style.height = height + extra + 'px';
							                        scrollTop += parseInt(style.height) - elem.currHeight;
							                        document.body.scrollTop = scrollTop;
							                        document.documentElement.scrollTop = scrollTop;
							                        elem.currHeight = parseInt(style.height);
							                };
								                
								        };
								       
							        	addEvent('propertychange', change);
								        addEvent('input', change);
								        addEvent('focus', change);
								        change();
										
									}
									
									var value=eval("D.data."+I.id);
									ipt.val(value?value:"");
									R.append($("<td class='l-page-text l-page-bottom-border' id='"+D.prefixID+I.id+"'></td>").append(ipt));
									if(D._focus==null){
										D._focus=ipt;
									}
									var end;
									if(I.plus){
										switch(I.plus.type){
										case "button":
											end=$("<td class='l-page-label' width='"+I.plus.width+"'><div id='"+I.plus.id+"' class='l-row-button'>"+(I.plus.display?I.plus.display:I.plus.id)+"</div></td>");
											end.children("#"+I.plus.id).bind(eClick,I.plus.onclick);
											break;
										case "img":
											end=$("<td class='l-page-label' width='"+I.plus.width+"'><div id='"+I.plus.id+"' >"+(I.plus.display?I.plus.display:I.plus.id)+"</div></td>");
											end.find("img").bind(eClick,I.plus.onclick);
											break;
										default:
											end=$("<td class='l-page-label' width='"+I.plus.width+"'><div id='"+I.plus.id+"' >"+(I.plus.display?I.plus.display:I.plus.id)+"</div></td>");
										}
									}else{
										end=$("<td class='l-page-label l-row-message' width='1'></td>");
									}
									R.append(end);
									break;
								case "password":
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									var Lb=$("<td class='l-page-label' width='"+D.labelWidth+"%'>"+I.display+"</td>");
									R.append(Lb);
									Lb.bind("resizeFont",C.resizeFont(Lb));
									Lb.trigger("resizeFont");
									var ipt=$("<input maxlength='"+(I.maxLength||10)+"' type='password' name='"+I.id+"' id='"+I.id+"'/>");
									R.append($("<td class='l-page-text l-page-bottom-border' id='"+D.prefixID+I.id+"'></td>").append(ipt));
									if(D._focus==null){
										D._focus=ipt;
									}
									R.append($("<td class='l-page-label' width='1'></td>"));
									break;
								case "button":
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									var Lb=$("<div class='flex'style='background-color:#fff'></div>");
									G.after(Lb);
									G.remove();
									for(i in I.buttons){
										var l=I.buttons[i];
										var butt=$("<div class='l-page-row-button'></div>");
										Lb.append(butt);
										butt.css("background-color",l.backgroundColor);
										butt.css("color",l.color);
										var wrap=$("<div class='wrap'></div>");
										butt.append(wrap);
										var display=$("<div class='l-page-row-button-display'>"+(l.icon?("<img height=15 src='"+l.icon+"'/>"):"")+l.display+"</div>");
										wrap.append(display);
										butt.bind(eClick,l.onclick);
										if(i==I.buttons.length-1) butt.css("border-right","none");
										
									}
									break;
								case "datePicker":
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									var Lb=$("<td class='l-page-label resizeFontEnable' width='"+D.labelWidth+"%'>"+I.display+"</td>");
									R.append(Lb);
									Lb.bind("resizeFont",C.resizeFont(Lb));
									Lb.trigger("resizeFont");
									var value="";
									if(typeof(I.render)=="function"){
										value=I.render(D.data);
									}else
										value=eval("D.data."+(I.editerType=="list"?(I.id+"Text"):I.id));
//									R.append($("<td class='l-page-value' align='right' name='"+I.id+"Text"+"' id='"+D.prefixID+I.id+"'></td>").html(value?value:""));
									R.append($("<td align='left' class='l-page-label'><input class='noBorder  l-date-icon' id='"+D.prefixID+I.id+"' type='text' value='"+(value?value:"")+"' /></td>"));
									var input=R.find("input");
									//var plu=$("<ul><span>"+P.display+"</span><li class='l-date-icon' id='"+P.keyword+"s' >- 点击选择 -</li><input id='"+P.keyword+"' type='hidden' value='' /></ul>");
									var currYear = (new Date()).getFullYear();	
									var opt={};
									opt.date = {preset : 'date'};
									opt.datetime = {preset : 'datetime'};
//									opt.time = {preset : 'time'};
									opt.default = {
										theme: 'android-ics light', //皮肤样式
								        display: 'modal', //显示方式 
								        mode: 'scroller', //日期选择模式
										dateFormat: 'yyyy-mm-dd',
										lang: 'zh',
										showNow: true,
										nowText: "现在",
								        startYear: currYear - 10, //开始年份
								        endYear: currYear + 10 //结束年份
									};
									if(I.stepMinute) opt.default.stepMinute=I.stepMinute;
									var optDateTime = $.extend(opt['datetime'], opt['default']);
								  	var optTime = $.extend(opt['time'], opt['default']);
								  	switch(I.mode){
									  	case "dateTime":
									  		input.mobiscroll(optDateTime).datetime(optDateTime);
									  		break;
									  	case "time":
									  		input.mobiscroll(optTime).time(optTime);
									  		break;									  		
									  	default :
									  		input.mobiscroll($.extend(opt['date'], opt['default']));	
								  	}
								  	input.bind("change",function(){
								  		if(value==""||value==null||value!=input.val()){
								  			value=input.val();
									  		eval("myData."+I.id+"=input.val()");
								  			if(I.onChange) I.onChange(input.val());
								  		}
								  	})
//									R.bind(eClick,function(){
//										if (document.getElementById("DateHS") != null) {
//											var boxObj = $("#DateHS");
//											boxObj.slideUp(function(){boxObj.remove()});
//										} else {
//											HS_setDate($("#"+I.id)[0],$("#"+D.prefixID+I.id)[0], document.body, I.callBack);
//											$("#DateHS").css({
//												"left" : 0,
//												"bottom" : 0,
//												"position" : "absolute",
//												"z-index" : "99999",
//												width:"100%"
//											}).hide().slideDown();
//										}
//									})
									break;
								case "datePickerStep":
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									/*左*/
									var Lb=$("<td class='l-page-label resizeFontEnable' width='6%'>"+"<img src='/dssweb/js/UI2.0/skins/PC-A/images/icon/time_left.png' style='height:16px;margin:20px 0px 20px 0px'>"+"</td>");
									R.append(Lb);
									Lb.bind("resizeFont",C.resizeFont(Lb));
									Lb.trigger("resizeFont");
									Lb.bind(eClick,function(){
										var y = input.val().slice(0,4);
										var m = parseInt(input.val().slice(5,7));
										var d = input.val().slice(8,10);
										var day = new Date(y,m,0);
										//获取天数：
										var daycount = day.getDate(); 
										
										/*字符串转换时间*/
										function getDate(strDate){
											  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, 
											   function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
											  return date;
										};
										var today = new Array(
												'星期日', '星期一',
												'星期二', '星期三',
												'星期四', '星期五', '星期六');
										if(I.stepType=="day"){
											var d = parseInt(input.val().slice(8,10))-1;
											var day = new Date(y,m-1,0);
											//获取天数：
											var daycount = day.getDate(); 
											var wm = getMonthWeek(y,m,daycount);
											if(d<1){
												d=daycount;
												m=parseInt(m)-1;
												if(m<1){
													m=12;
													y=parseInt(y)-1;
												}
											};
											if(d<10){d="0"+d};
											if(m<10){m="0"+m};
											var strDate = y+"-"+m+"-"+d;
											var newDate = getDate(strDate);
											var w = today[newDate
													.getDay()]; 
											week_0 = w;
											week.html(week_0);
											var ymd= y+"年"+m+"月"+d+"日";
											input.val(ymd);
											
										}else{
											if(I.stepType=="week"){
												var d = parseInt(input.val().slice(8,10))-7;
												var w = getMonthWeek(y,m,d);
												var day = new Date(y,m-1,0);
												//获取天数：
												var daycount = day.getDate(); 
												var wm = getMonthWeek(y,m-1,daycount);
												if(d<1){
													var d_0 = 7-parseInt(input.val().slice(8,10));
													var d_1 = daycount-d_0;
													d=d_1;
													m=parseInt(m)-1;
													if(m<1){
														m=12;
														y=parseInt(y)-1;
													}
												};
												if(d<10){d="0"+d};
												if(m<10){m="0"+m};
												var strDate = y+"-"+m+"-"+d;
												var newDate = getDate(strDate);
												var w = today[newDate
														.getDay()]; 
												week_0 = w;
												week.html(week_0);
												var ymd= y+"年"+m+"月"+d+"日";
												input.val(ymd);
											}else{
												if(I.stepType=="month"){
													var day0 = new Date(y,m,0);
													var daycount0 = day0.getDate();
													m1=parseInt(m)-1;
													if(m1<1){
														m1=12;
														y=parseInt(y)-1;
													};
													var day1 = new Date(y,m1,0);
													var daycount1 = day1.getDate();
//													d0=d;
//													if(d<10){d="0"+d};
													if(m1<10){m1="0"+m1};
//													var d1 = daycount;
//													var d2=d1-d0;
													var d3=d;
													if (daycount1<daycount0 && d>daycount1){
														d3=daycount1;
													}
//													if(d3==0){
//														d3=d1;
//													}else{
//														if(d3<0){
//															d3=1;
//														}
//													}
													var strDate = y+"-"+m1+"-"+d3;
													var newDate = getDate(strDate);
													var w = today[newDate
															.getDay()]; 
													week_0 = w;
													week.html(week_0);
													if(d3<10){d3="0"+parseInt(d3)};
													input.val(y+"年"+m1+"月"+d3+"日");
												}else{
													
												}
											}
										}
										I.onChange(input.val());   
									});
									var value="";
									if(typeof(I.render)=="function"){
										value=I.render(D.data);
									}else
										value=eval("D.data."+(I.editerType=="list"?(I.id+"Text"):I.id));
//										R.append($("<td class='l-page-value' align='right' name='"+I.id+"Text"+"' id='"+D.prefixID+I.id+"'></td>").html(value?value:""));
									/*中*/
									R.append($("<td align='center' class='l-page-label'><div class='l-date-step-iconbox'><input class='noBorder l-date-step-icon' id='"+D.prefixID+I.id+"' type='text' value='"+(value?value:"")+"' /></div></td>"));
									var input=R.find("input");
									var currYear = (new Date()).getFullYear();	
									var opt={};
									opt.date = {preset : 'date'};
									opt.datetime = {preset : 'datetime'};
									opt.time = {preset : 'time'};
									/*选择器样式*/
									opt.default = {
										theme: 'android-ics light', //皮肤样式
								        display: 'modal', //显示方式 
								        mode: 'scroller', //日期选择模式
										dateFormat: 'yyyy年mm月dd日',
										lang: 'zh',
										showNow: true,
										nowText: "现在",
								        startYear: currYear - 10, //开始年份
								        endYear: currYear + 10 //结束年份
									};
									/*wgz*/
									var mydt= new Date();
								    var Y = mydt.getFullYear();
								    M = (mydt.getMonth()+1);
								    D = mydt.getDate();
								    var getMonthWeek = function (a, b, c) { 
								    	var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
								    	return Math.ceil( (d + 6 - w) / 7 ); 
								    };
								    var getYearWeek = function (a, b, c) { 
								    	var date1 = new Date(a, parseInt(b) - 1, c), 
								    	date2 = new Date(a, 0, 1), d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000); 
								    	return Math.ceil( (d + ((date2.getDay() + 1) - 1)) / 7 ); 
								    }; 
								    if(D<10){D="0"+D};
									if(M<10){M="0"+M};
								  	input.val(Y+"年"+M+"月"+D+"日");
								  	function getDate(strDate){
										  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, 
										   function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
										  return date;
									};
									var strDate_0 = Y+"-"+M+"-"+D;
									var newDate_0 = getDate(strDate_0);
									var today = new Array(
											'星期日', '星期一',
											'星期二', '星期三',
											'星期四', '星期五', '星期六');
									var week_0 = today[newDate_0
											.getDay()];
									var week = $("<span class='l-date-step-week'>"+week_0+"</span>");
									$(".l-date-step-iconbox").append(week);
								  	$('.l-date-step-icon').change(function(){
										var y = input.val().slice(0,4);
										var m = parseInt(input.val().slice(5,7));
										var d = input.val().slice(8,10);
										var day = new Date(y,m,0);
										var strDate = y+"-"+m+"-"+d;
										var newDate = getDate(strDate);
										var w = today[newDate
												.getDay()]; 
										week_0 = w;
										week.html(week_0);
										if(m<10){m="0"+m};
										input.val(y+"年"+m+"月"+d+"日");
								  	});
								  	var cudate = input.val();
									/*右  wgz*/
									var Rb = $("<td class='l-page-label resizeFontEnable' width='6%'>"+"<img src='/dssweb/js/UI2.0/skins/PC-A/images/icon/time_right.png' style='float:right;height:16px;margin:20px 0px 20px 0px'>"+"</td>");
									R.append(Rb);
									Rb.bind(eClick,function(){
										var y = input.val().slice(0,4);
										var m = parseInt(input.val().slice(5,7));
										var d = input.val().slice(8,10);
										var day = new Date(y,m,0);
										//获取天数：
										var daycount = day.getDate(); 
//										
//										I.onChange(input.val());
//										
										/*字符串转换时间*/
										function getDate(strDate){
											  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, 
											   function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
											  return date;
										};
										var today = new Array(
												'星期日', '星期一',
												'星期二', '星期三',
												'星期四', '星期五', '星期六');
										if(I.stepType=="day"){
											var d = parseInt(input.val().slice(8,10))+1;
											var wm = getMonthWeek(y,m,daycount);
											if(d>daycount){
												d=1;
												m=parseInt(m)+1;
												if(m>12){
													m=1;
													y=parseInt(y)+1;
												}
											};
											if(d<10){d="0"+d};
											if(m<10){m="0"+m};
											var strDate = y+"-"+m+"-"+d;
											var newDate = getDate(strDate);
											var w = today[newDate
													.getDay()]; 
											week_0 = w;
											week.html(week_0);
											var ymd= y+"年"+m+"月"+d+"日";
											input.val(ymd);
											
										}else{
											if(I.stepType=="week"){
												var d = parseInt(input.val().slice(8,10))+7;
												var w = getMonthWeek(y,m,d);
												var wm = getMonthWeek(y,m,daycount);
												if(d>daycount){
													var d_0 = daycount-parseInt(input.val().slice(8,10));
													var d_1 = 7-d_0;
													d=d_1;
													m=parseInt(m)+1;
													if(m>12){
														m=1;
														y=parseInt(y)+1;
													}
												};
												if(d<10){d="0"+d};
												if(m<10){m="0"+m};
												var strDate = y+"-"+m+"-"+d;
												var newDate = getDate(strDate);
												var w = today[newDate
														.getDay()]; 
												week_0 = w;
												week.html(week_0);
												var ymd= y+"年"+m+"月"+d+"日";
//												alert(I.stepType);
												input.val(ymd);
											}else{
												if(I.stepType=="month"){
													var day0 = new Date(y,m,0);
													var daycount0 = day0.getDate();
													m1=parseInt(m)+1;
													if(m>12){
														m1=1;
//														d="0"+1;
														y=parseInt(y)+1;
													};
//													if(d<10){d="0"+d};
													if(m1<10){m1="0"+m1};
													var day1 = new Date(y,m1,0);
													var daycount1 = day1.getDate();
													d0 = daycount0-parseInt(d);
													d1=daycount1-parseInt(d0);
													d2=d;
													if(daycount0>daycount1 && d>daycount1){
														d2=daycount1;
													};
													var strDate = y+"-"+m1+"-"+d2;
													var newDate = getDate(strDate);
													var w = today[newDate
															.getDay()]; 
													week_0 = w;
													week.html(week_0);
													input.val(y+"年"+m1+"月"+d2+"日");
												}else{
													
												}
											}
										}
										I.onChange(input.val());   
									});
									Rb.trigger("resizeFont");
									R.append($("<td width='15px'></td>"));/*wgz*/
									if(I.stepMinute) opt.default.stepMinute=I.stepMinute;
									var optDateTime = $.extend(opt['datetime'], opt['default']);
								  	var optTime = $.extend(opt['time'], opt['default']);
								  	switch(I.mode){
									  	case "dateTime":
									  		input.mobiscroll(optDateTime).datetime(optDateTime);
									  		break;
									  	case "time":
									  		input.mobiscroll(optTime).time(optTime);
									  		break;									  		
									  	default :
									  		input.mobiscroll($.extend(opt['date'], opt['default']));	
								  	}
								  	input.bind("change",function(){
								  		I.onChange(input.val());
								  	});
									break;
								case "list":
									if(C.lists)C.lists.push(I);
									else C.lists=[I];
									var L=I.data;
									if(L.url){
										if(!C.Ajax(L.url, L.param,true,true,function(retdata){
											L=retdata.ret_data;
											C.buildList(G,I,L,afterRow);
											C.onResize();
										}))
										return;
									}else if(typeof(L)=="function"){
										L=L();
										C.buildList(G,I,L,afterRow);
									}else{
										C.buildList(G,I,L,afterRow);
									}
									break;
								case "switch":
									if(C.switchs)C.switchs.push(I);
									else C.switchs=[I];
									var L=I.data;
									if(L.url){
										if(!C.Ajax(L.url, L.param,true,true,function(retdata){
											L=retdata.ret_data;
											if(L.constructor==Array) L=L[0];
											C.buildSwitch(G,I,L,afterRow);
											C.onResize();
										}))
										return;
									}else if(typeof(L)=="function"){
										L=L();
										C.buildSwitch(G,I,L,afterRow);
									}else{
										C.buildSwitch(G,I,L,afterRow);
									}
									break;
								case "checkBox":
									if(C.checkBoxs)C.checkBoxs.push(I);
									else C.checkBoxs=[I];
									var L=I.data;
									if(L.url){
										if(!C.Ajax(L.url, L.param,true,true,function(retdata){
											L=retdata.ret_data;
											C.buildCheckBox(G,I,L,afterRow);
											C.onResize();
										}))
										return;
									}else if(typeof(L)=="function"){
										L=L();
										C.buildCheckBox(G,I,L,afterRow);
									}else{
										C.buildCheckBox(G,I,L,afterRow);
									}
									break;
								case "radioButton":
									if(C.radioButtons)C.radioButtons.push(I);
									else C.radioButtons=[I];
									var L=I.data;
									if(L.url){
										if(!C.Ajax(L.url, L.param,true,true,function(retdata){
											L=retdata.ret_data;
											C.buildRadioButton(G,I,L,afterRow);
											C.onResize();
										}))
										return;
									}else if(typeof(L)=="function"){
										L=L();
										C.buildRadioButton(G,I,L,afterRow);
									}else{
										C.buildRadioButton(G,I,L,afterRow);
									}
									break;
								case "menus":
									if(I.url){
										C.Ajax(I.url, I.param, true, true, 
												function(ret){
													if(I.content!=null)
														I.content=I.content.concat(ret.ret_data);
													else I.content=ret.ret_data;
													C.buildMenus(G,I,afterRow);
													C.onResize();
												}
											);
									}else{
										C.buildMenus(G,I,afterRow);	
									}
									break;
								case "img":
									if(I.url){
										C.Ajax(I.url, I.param, true, true, 
												function(ret){
													I.content=ret.ret_data;
													C.buildImg(G,I,afterRow);
													C.onResize();
												}
											);
									}else{
										C.buildImg(G,I,afterRow);	
									}
									break;
								case "url":
									if(I.url){
										var p=I.url.indexOf("?");
										if(p>-1){
											I.param=I.url.substr(p+1);
											I.url=I.url.substring(0,p);
											var ps=I.param.split("&");
											I.param={};
											$.each(ps,function(H, P){
												var k=P.split("=");
												eval(k[0]+"="+k[1]);
											});
										}
										var f=$('<tr class="noHover"></tr>').append($("<td></td>").load(I.url));
										
										G.append(f);
									}else{	
									}
									break;
								case "tabPage":
									C.buildTabPage(G,I,afterRow);
									break;
								case "grid":
									if(C.grids)C.grids.push(I);
									else C.grids=[I];
									if(I.backgroundImg)
										G.css("background","url("+I.backgroundImg+")");
//									if(I.layLoad||I.layLoad==null){
										if(I.pageEnable){
											if(I.gridParam==null) I.gridParam={};
											I.gridParam.page=1;
											I.gridParam.pagesize=I.pageSize?I.pageSize:10;
											if(I.autoPage){
												var scrollObj;
												if(eClick=="click")
													scrollObj=$(window)
												else	if($(C.page).hasClass("l-page-tabPage")){
													scrollObj=C.page.parents(".l-page-content");
												}else{
													scrollObj=C.page.children(".l-page-content");
												}
												scrollObj.scroll(function(e){
													C.autoPage(I,e);
												});
											}
										}
										if(I.search){
											var SB=$("<div class='l-page-searchbar'><div>点击搜索</div><div class='search2'><img src='/"+appName+"/js/UI2.0/skins/PC-A/images/icon/search.png' width=100%/></div></div>");
											C.page.content.children().eq(0).before($("<div id='sbSpace' style='height:30px;'></div>"));
											C.page.content.children().eq(0).before(SB);
											var shade=$("<div class='sshade'></div>").css({"background-color": "#fff","top":"0px"});
											var s=$("<div class='l-page-search'><input maxlength='10'/><div id='search' class='search'><img src='/"+appName+"/js/UI2.0/skins/PC-A/images/icon/search.png' width=100%/></div><div id='ret' class='bt'>取消</div></div>");
											C.page.append(shade);
											C.page.append(s);
											/***
											 * 设置高级搜索条件
											 */
											var plus=$("<div class='l-searchPlus-box'></div>");
											shade.append("<div style='height:40px;'></div>");
											shade.append(plus);
											var text=$("<ul><span>"+I.search.display+"</span></ul>");
											plus.append(text);
											$(I.search.plus).each(
													function(H, P){
														switch(P.type){
														case "text":
															text.children("span").html(text.children("span").html()+"/"+P.display);
															break;
														case "timePicker":
															var plu=$("<ul><span>"+P.display+"</span><li class='l-date-icon' id='"+P.keyword+"s' >- 点击选择 -</li><input id='"+P.keyword+"' type='hidden' value='' /></ul>");
															if(eClick=='tap'){
																plu.children("li").bind("tap",function(e){
																	s.children("input").blur();
																	if (document.getElementById("DateHS") != null) {
																		var boxObj = $("#DateHS");
																		boxObj.slideUp(function(){boxObj.remove()});
																	} else {
																		HS_setDate($("#"+P.keyword)[0],$("#"+P.keyword+"s")[0], document.body, callBack);
																		$("#DateHS").css({
																			"left" : 0,
																			"bottom" : 0,
																			"position" : "absolute",
																			"z-index" : "99999",
																			width:"100%"
																		}).hide().slideDown();
																	}
																});
															}else{
																plu.children("li").bind("click",function(){
																	if (document.getElementById("DateHS") != null) {
																		var boxObj = $("#DateHS");
																		boxObj.slideUp(function(){boxObj.remove()});
																	} else {
																		HS_setDate($("#"+P.keyword)[0],$("#"+P.keyword+"s")[0], document.body, callBack);
																		$("#DateHS").css({
																			"left" : 0,
																			"bottom" : 0,
																			"position" : "absolute",
																			"z-index" : "99999",
																			width:"100%"
																		}).hide().slideDown();
																	}
																});
															}
															plus.append(plu);
															break;
														}
													});

											shade.hide();
											s.hide();
											SB.hide();
											SB.bind(eClick,function(){
												C.page.content.parent().css({"overflow":"hidden","-webkit-filter":"blur(3px)","-ms-filter":"blur(3px)","filter":"blur(3px)","-moz-filter":"blur(3px)"});
												shade.css({"height":C.page.content.parent()[0].offsetHeight}).fadeIn();
												s.css({"height":"30px"});
												var w=s.prev()[0].offsetWidth;
												s.children("input").css({"height":"20px","line-height":"12px","font-size":"12px","width":w-10+"px"});
												s.children("#search").css({"height":"20px","width":"20px","right":"5px"});
												
												s.show();
												s.children("#search").animate({"height":"30px","width":"30px","right":"70px"});
												s.animate({"height":"40px","background-color":"#EAEAEA"});
												s.children("input").animate({"height":"30px","line-height":"16px","font-size":"16px","width":w-75+"px","padding-left":"5px"},function(){
													s.children("input").focus();
												});
											});
											s.find("#ret").bind(eClick,function(){
												var w=s.prev()[0].offsetWidth;
												var v=s.children("input").val();
												var pl=(w-20-lenFor(v)*6)/2;
												//alert(pl);
												s.animate({"height":"30px","background-color":"#EAEAEA"});
												s.children("input").animate({"height":"20px","font-size":"12","line-height":"20px","width":w-10+"px","padding-left":pl+"px"},function(){
													if(v)SB.children().eq(0).html(v);
													else SB.children().eq(0).html("点击搜索");
													s.hide();
													s.children("input").blur();
												});
												s.children("#search").animate({"height":"20px","width":"20px","right":"5px"});
												C.page.content.parent().css({"overflow":"auto","-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
												shade.fadeOut();
												$("#DateHS").remove();//去掉日期选择框
											});
											s.children("#search").bind(eClick,function(){
												var w=s.prev()[0].offsetWidth;
												var v=s.children("input").val();
												var pl=(w-20-lenFor(v)*6)/2;
												//alert(pl);
												s.animate({"height":"30px","background-color":"#EAEAEA"});
												s.children("input").animate({"height":"20px","font-size":"12","line-height":"20px","width":w-10+"px","padding-left":pl+"px"},function(){
													if(v) SB.children().eq(0).html(v);
													else SB.children().eq(0).html("点击搜索");
													s.hide();
													s.children("input").blur();
												});
												s.children("#search").animate({"height":"20px","width":"20px","right":"5px"});
												C.page.content.parent().css({"overflow":"auto","-webkit-filter":"blur(0px)","-ms-filter":"blur(0px)","filter":"blur(0px)","-moz-filter":"blur(0px)"});
												shade.fadeOut();
												$("#DateHS").remove();//去掉日期选择框
												//开始搜索
												I.gridParam.page=1;
												eval("I.gridParam."+I.search.keyword+"='"+v+"'");
												$(I.search.plus).each(
														function(H, P){
															switch(P.type){
															case "text":
																eval("I.gridParam."+P.keyword+"='"+v+"'");
																break;
															case "timePicker":
																eval("I.gridParam."+P.keyword+"='"+$("#"+P.keyword).val()+"'");
																break;
															}
														});
												G.parent().slideUp(300,function(){
													if(I.gridUrl){
														C.Ajax(I.gridUrl, I.gridParam, true, true, 
															function(ret){
																I.gridData=ret.ret_data;
																C.buildGrid(G,I,afterRow,true);
																C.onResize();
															}
														);
													}
													if(I.gridData&&(I.layLoad||I.layLoad==null)){
														C.buildGrid(G,I,afterRow,true);
													}
												});	
											});
											s.children("input").bind("keyup",function(key){
												var ev = key || window.event;// 获取event对象
												if(ev.keyCode == 13){//回车
													s.children("#search").trigger(eClick);
												}
											});
										}
										G.parent().next().hide();
										G.parent().prev().hide();
										if(I.gridUrl&&(I.layLoad||I.layLoad==null)){
											C.Ajax(I.gridUrl, I.gridParam, true, true, 
												function(ret){
													I.gridData=ret.ret_data;
													C.buildGrid(G,I,afterRow,true);
													//C.onResize();
												},function(ret){
													I.gridData=[];
													C.buildGrid(G,I,afterRow,true);
												}
											);
										}
										if(I.gridData&&(I.layLoad||I.layLoad==null)){
											C.buildGrid(G,I,afterRow,true);
										}
										
										if(I.selectMulti){
											C.page.content.append($("<div class='l-page-group-title'>以下为选中的项，点击可修改选中状态</div>"));
											var P=$("<table border='0' cellspacing='0' cellpadding='0' class='l-page-group'><tr class='l-page-bottom-border'><td><div class='pageSelect'>水电费刘思童</div><div class='pageSelect'>刘思童</div><div class='pageSelect pageSelectCancel'>刘思童</div><div class='pageSelect pageSelectCancel'>刘地方思童</div><div class='pageSelect pageSelectCancel'>刘思童</div><div class='pageSelect'>刘思童</div><div class='pageSelect'>思童</div><div class='pageSelect'>刘思童</div><div class='pageSelect'>刘童</div><div class='pageSelect'>思童</div></td></tr><tr><td align='center' class='h1' style='color:#39C'>共14个 1900元</td></tr></table>");
											P.id="g"+(C.gid++);
											C.page.content.append(P);
										}
//									}
									break;
								case "iframe":
									if(I.url){
										C.Ajax(I.url, I.param, true, true, 
												function(ret){
													I.content=ret.ret_data;
													C.buildIframe(G,I,afterRow);
													C.onResize();
												}
											);
									}else{
										C.buildIframe(G,I,afterRow);	
									}
									break;
								default:
									var R=C._addRow(G,afterRow,C.rid,I.icon);
									C.rid++;
									R.append($("<td class='l-page-label' width='"+D.labelWidth+"%'>"+I.display+"</td>"));
									R.append($("<td class='l-page-value' align='right'  id='"+D.prefixID+I.id+"'></td>"));
									R.append($("<td class='l-page-label'></td>"));
									break;
							}
							
							//C.onResize();
						},
						buildList:function(G,I,L,afterRow){
							var C=this,D=this.options;
							G.html("");
							var listValue=$("<input type='hidden' value=''  name='"+I.id+"'/>");
							var listText=$("<input type='hidden' value=''  name='"+I.id+"Text'/>");
							G.append(listValue).append(listText);
							var R=null;
							if(L==null) L=[];
							for(var i=0;i<L.length;i++){
								var l=L[i];
								if(I.data.text) {
									if(typeof(I.data.text)=="function")
										l.text=I.data.text(l);
									else l.text=eval("l."+I.data.text);
								}
								if(I.data.text) l.id=eval("l."+I.data.value);
								R=C._addRow(G,afterRow,C.rid,I.icon,I.editerMulti,D.autoSubmit,I.onSelect,I.onUnSelect);
								C.rid++;
								var Lb=$("<td class='l-page-label' name='text'  width='"+D.labelWidth+"%'>"+l.text+"</td>");
								R.append(Lb);
								//Lb.bind("resizeFont",C.resizeFont(Lb));
								//Lb.trigger("resizeFont");
								var ck=$("<div class='l-page-listbox' name="+I.id+" value='"+l.id+"'/>");
								var t=["0px 0px","left center","left bottom"];
								if((l.id&&((eval("D.data."+I.id))&&(eval("D.data."+I.id)).split(",").indexOf(l.id)>-1))||(l.selected&&!eval("D.data."+I.id))){
									ck.css("background-position",t[0]);
									if(G.selectedRows){
										G.selectedRows.push(R);
										G.selectedText.push(l.text);
										G.selectedValue.push(l.id);
										listValue.val(listValue.val()+(listValue.val().length==0?"":",")+l.id);
										listText.val(listText.val()+(listText.val().length==0?"":",")+l.text);
									}
								}else{
									ck.css("background-position",(I.editerMulti?t[2]:t[1]));
								}
								if(I.initValue){
									if((","+I.initValue+",").indexOf(","+l.id+",")>-1){
										ck.css("background-position",t[0]);
										if(G.selectedRows){
											G.selectedRows.push(R);
											G.selectedText.push(l.text);
											G.selectedValue.push(l.id);
											listValue.val(listValue.val()+(listValue.val().length==0?"":",")+l.id);
											listText.val(listText.val()+(listText.val().length==0?"":",")+l.text);
										}
									}
								}
								ck.bind("change",C._changeSelect);
								var ipt=$("<input type='hidden' value='"+l.id+"' />");
								R.append($("<td class='l-page-text l-page-bottom-border' id='"+D.prefixID+I.id+"'></td>").append(ipt).append(ck));
								if(D._focus==null){
									D._focus=ipt;
								}
								R.append($("<td class='l-page-label' width='1'></td>"));
							}
							if(R) {
								R.children("td:first").addClass("l-page-bottom-border");
								R.children("td[class='l-page-icon']").addClass("l-page-bottom-border");
							}
							G.parent().slideDown(function(){
								C.onResize();
							});
						},
						buildSwitch:function(G,I,L,afterRow){
							var C=this,D=this.options;
							G.html("");
							var switchValue=$("<input type='hidden' value=''  name='"+I.id+"'/>");
							G.append(switchValue);
							var value=L[I.data.value];
							switchValue.val(value);
							if(L==null) L=[];
							//---
							var R=C._addRow(G,afterRow,C.rid,I.icon);
							C.rid++;
							var Lb=$("<td class='l-page-switchDisplay l-page-bottom-border resizeFontEnable' >"+I.display+"</td>");
							R.append(Lb);
							var Rb=$("<td class='l-page-value' align='right' name='"+I.id+"' id='"+D.prefixID+I.id+" width=52'></td>");
							var Sb=$("<div class='l-page-switchBox l-page-switchBox-on ' >   </div>");
							var Sbi=$("<div class='l-page-switchBox-icon switch-on ' >   </div>");
							Sb.append(Sbi);
							Rb.append(Sb);
							R.append(Rb);
							if(value=="7402"){
								Sb.removeClass("l-page-switchBox-on");
								Sb.addClass("l-page-switchBox-off");
								Sbi.removeClass("switch-on");
								Sbi.addClass("switch-off");
							}
							Sb.addClass("ease");
							Sbi.addClass("ease");
							
							Lb.bind("resizeFont",C.resizeFont(Lb));
							Lb.trigger("resizeFont");
							R.append($("<td class='l-page-label' width='1'></td>"));
							if(I.tips){
								Lb.html(Lb.html()+"<br/><span class='l-page-switch-tips'>"+I.tips+"</span>");
							}
							if(R) {
								R.children("td:first").addClass("l-page-bottom-border");
							}
							R.bind(eClick,function(){
								var box=Sb;
								var icon=box.children().eq(0);
								if(icon.hasClass("switch-busy")) return;
								if(box.hasClass("l-page-switchBox-off")){
									icon.addClass("switch-busy");
									thisPage.Ajax(
											I.on.url,
											I.on.param,true,false,
											function(){
												icon.removeClass("switch-busy");
												box.removeClass("l-page-switchBox-off");
												box.addClass("l-page-switchBox-on");
												icon.removeClass("switch-off");
												icon.addClass("switch-on");
												if(I.onAfterChange) I.onAfterChange(I.on.param);
											},  function(response){
												icon.removeClass("switch-busy");
												thisPage.showMessage(response.responseText,"red",false);
											});
								}else{
									icon.addClass("switch-busy");
									thisPage.Ajax(
											I.off.url,
											I.off.param,true,false,
											function(){
												icon.removeClass("switch-busy");
												box.removeClass("l-page-switchBox-on");
												box.addClass("l-page-switchBox-off");
												icon.removeClass("switch-on");
												icon.addClass("switch-off");
												if(I.onAfterChange) I.onAfterChange(I.off.param);
											},  function(response){
												icon.removeClass("switch-busy");
												thisPage.showMessage(response.responseText,"red",false);
											});
								}
							})
							G.parent().slideDown(function(){
								C.onResize();
							});
						},
						buildCheckBox:function(G,I,L,afterRow){
							var C=this,D=this.options;
							G.html("");
							var listValue=$("<input type='hidden' value=''  id='"+I.id+"'  name='"+I.id+"'/>");
							var listText=$("<input type='hidden' value='' id='"+I.id+"Text' name='"+I.id+"Text'/>");
							G.append(listValue).append(listText);
							var R=C._addRow(G,afterRow,C.rid,I.icon,true,false);
							C.rid++;
							var Lb=$("<td class='l-page-label' name='text'  width='"+I.labelWidth+"%'>"+I.display+"</td>");
							var Rb=$("<td class='l-page-text l-page-bottom-border' id='"+D.prefixID+I.id+"'></td>");
							R.append(Lb);
							R.append(Rb);
							if(L==null) L=[];
							for(var i=0;i<L.length;i++){
								var l=L[i];
								if(I.data.text) {
									if(typeof(I.data.text)=="function")
										l.text=I.data.text(l);
									else l.text=eval("l."+I.data.text);
								}
								if(I.data.text) l.id=eval("l."+I.data.value);
								var ck=$("<div class='l-page-checkbox' name="+I.id+" value='"+l.id+"' text='"+l.text+"'>"+l.text+"<div class='l-page-checkIcon'></div></div>");
								if((l.id&&((eval("D.data."+I.id))&&(eval("D.data."+I.id)).split(",").indexOf(l.id)>-1))||(l.selected&&!eval("D.data."+I.id))){
									var re=C._changeCheck(listValue.val(),listText.val(),ck[0]);
									listValue.val(re.value);
									listText.val(re.text);
								}
								if(I.initValue){
									if(I.initValue==l.id){
										var re=C._changeCheck(listValue.val(),listText.val(),ck[0]);
										listValue.val(re.value);
										listText.val(re.text);
									}
								}
								ck.bind(eClick,function(){
									//alert(this.attributes.text.value);
									var re=C._changeCheck(listValue.val(),listText.val(),this);
									listValue.val(re.value);
									listText.val(re.text);
									if(I.onChange) I.onChange(listValue.val(),listText.val());
								});
								//var ipt=$("<input type='hidden' value='"+l.id+"' />");
								Rb.append(ck);
								
							}
							//R.append($("<td class='l-page-label' width='1'></td>"));
							if(R) {
								R.children("td:first").addClass("l-page-bottom-border");
								R.children("td[class='l-page-icon']").addClass("l-page-bottom-border");
							}
						},
						buildRadioButton:function(G,I,L,afterRow){
							var C=this,D=this.options;
							G.html("");
							var listValue=$("<input type='hidden' value=''  id='"+I.id+"' name='"+I.id+"'/>");
							var listText=$("<input type='hidden' value=''  id='"+I.id+"Text' name='"+I.id+"Text'/>");
							G.append(listValue).append(listText);
							var R=C._addRow(G,afterRow,C.rid,I.icon,true,false);
							C.rid++;
							if(I.btnsameLine ==true||I.btnsameLine ==null){
								var Lb=$("<td class='l-page-label' name='text'  width='"+I.labelWidth+"%'>"+I.display+"</td>");
								var Rb=$("<td align='right' class='l-page-text l-page-bottom-border l-page-text-position' id='"+D.prefixID+I.id+"'></td>");
								R.append(Lb);
								R.append(Rb);
							}else{
								var Lb=$("<td class='l-page-label' name='text'  width='"+I.labelWidth+"%'><span class='l-page-label-text'>"+I.display+"</span></td>");
								var Rb=$("<div class='l-page-text l-page-bottom-border l-page-text-position' id='"+D.prefixID+I.id+"'></div>");
								R.append(Lb);
								Lb.append(Rb);
							}
							if(L==null) L=[];
							for(var i=0;i<L.length;i++){
								var l=L[i];
								if(I.data.text) {
									if(typeof(I.data.text)=="function")
										l.text=I.data.text(l);
									else l.text=eval("l."+I.data.text);
								}
								if(I.data.text) l.id=eval("l."+I.data.value);
								var ck=$("<div class='l-page-radiobox' name="+I.id+" value='"+l.id+"' text='"+l.text+"'>"+"<div class='l-page-rdbox'>"+"<div class='l-page-radioIcon'></div>"+"<a class='l-page-radiobox-text'>"+l.text+"</a>"+"</div></div>");
								if((l.id&&((eval("D.data."+I.id))&&(eval("D.data."+I.id)).split(",").indexOf(l.id)>-1))||(l.selected&&!eval("D.data."+I.id))){
									var re=C._changeRadio(listValue.val(),listText.val(),ck);
									listValue.val(re.value);
									listText.val(re.text);
								}
								if(I.initValue){
									if(I.initValue==l.id){
										var re=C._changeRadio(listValue.val(),listText.val(),ck);
										listValue.val(re.value);
										listText.val(re.text);
									}
								}
								ck.bind(eClick,function(){
									//alert(this.attributes.text.value);
									var re=C._changeRadio(listValue.val(),listText.val(),this);
									if(re!=null){
										listValue.val(re.value);
										listText.val(re.text);
										if(I.onChange) I.onChange(listValue.val(),listText.val());
									}
								});
								//var ipt=$("<input type='hidden' value='"+l.id+"' />");
								Rb.append(ck);
								
							}
							//R.append($("<td class='l-page-label' width='1'></td>"));
							if(R) {
								R.children("td:first").addClass("l-page-bottom-border");
								R.children("td[class='l-page-icon']").addClass("l-page-bottom-border");
							}
							G.parent().slideDown(function(){
								C.onResize();
							});
						},
//						buildRadioButton:function(G,I,L,afterRow){
//							var C=this,D=this.options;
//							G.html("");
//							var listValue=$("<input type='hidden' value=''  name='"+I.id+"'/>");
//							var listText=$("<input type='hidden' value=''  name='"+I.id+"Text'/>");
//							G.append(listValue).append(listText);
//							var R=C._addRow(G,afterRow,C.rid,I.icon,true,false);
//							C.rid++;
//							var Lb=$("<td class='l-page-label' name='text'  width='"+I.labelWidth+"%'><span class='l-page-label-text'>"+I.display+"</span></td>");
//							var Rb=$("<div class='l-page-text l-page-bottom-border l-page-text-position' id='"+I.prefixID+I.id+"'></div>");
//							R.append(Lb);
//							Lb.append(Rb);
//							if(L==null) L=[];
//							for(var i=0;i<L.length;i++){
//								var l=L[i];
//								if(I.data.text) {
//									if(typeof(I.data.text)=="function")
//										l.text=I.data.text(l);
//									else l.text=eval("l."+I.data.text);
//								}
//								if(I.data.text) l.id=eval("l."+I.data.value);
//								var ck=$("<div class='l-page-radiobox' name="+I.id+" value='"+l.id+"' text='"+l.text+"'>"+"<div class='l-page-rdbox'>"+"<div class='l-page-radioIcon'></div>"+"<a class='l-page-radiobox-text'>"+l.text+"</a>"+"</div></div>");
//								if((l.id&&((eval("D.data."+I.id))&&(eval("D.data."+I.id)).split(",").indexOf(l.id)>-1))||(l.selected&&!eval("D.data."+I.id))){
//									var re=C._changeRadio(listValue.val(),listText.val(),ck);
//									listValue.val(re.value);
//									listText.val(re.text);
//								}
//								ck.bind(eClick,function(){
//									//alert(this.attributes.text.value);
//									var re=C._changeRadio(listValue.val(),listText.val(),this);
//									if(re!=null){
//										listValue.val(re.value);
//										listText.val(re.text);
//										if(I.onChange) I.onChange(listValue.val(),listText.val());
//									}
//								});
//								//var ipt=$("<input type='hidden' value='"+l.id+"' />");
//								Rb.append(ck);
//								
//							}
//							//R.append($("<td class='l-page-label' width='1'></td>"));
//							if(R) {
//								R.children("td:first").addClass("l-page-bottom-border");
//								R.children("td[class='l-page-icon']").addClass("l-page-bottom-border");
//							}
//							G.parent().slideDown(function(){
//								C.onResize();
//							});
//						},
						buildTabPage:function(G,I,afterRow){
							var C=this,D=this.options;
							if(!I.hideGroup)
								G.parent().prev().show();
							if(!I.hideGroupTips)
								G.parent().next().show();
							if(I.onBeforeBuild) I.onBeforeBuild(C,I);
							var tabNames=$("<div class='flex ease pc-tab' id='tabNames'/>");
							replaceEmptyItem(I.pages);
							var cont=$("<div class='flex ease' id='tabpages' style='width:"+I.pages.length+"00%'/>");
							G.after(cont);
							G.parent().before(tabNames);							
							G.remove();
							if(I.hideTabNames||I.pages.length==1) tabNames.hide();
							/*window.onload=
						        function(){
						            
					        }*/
							
//							设置滑块
							var slip = $("<div class='navslip ease'></div>");
							tabNames.append(slip);
							
							for(var i=0;i<I.pages.length;i++){
								var l=I.pages[i];
								var page=$("<div class='l-page-tabPage ease' id='tabpage"+i+"'></div>");
								cont.append(page);
//								l.onAfterLoad=function(P){
//									if(P.id=="tabpage0")
//										page.css("height","auto");
//									else
//										page.css("height","1px");
//								}
								l.parent=C;
								//开始处理name
								var name=$("<div class='l-page-tabName ease' id='tabName"+i+"'>"+l.tabName+"</div>");
								name.index=i;
								tabNames.append(name);
								page.css("height","auto");
								if(i==0)
									name.addClass("l-page-tabed");
								else
									page.css("height","1");
								var tabPage=page.ligerPage(l);
								tabPage.parent=C;
								tabPage.index=i;
								cont.slip=slip;
								if(cont.pages) {
									cont.pages.push(tabPage);
									cont.names.push(name);
								}
								else {
									cont.pages=[tabPage];
									cont.names=[name];
								}
								
								name.bind(eClick,function(){
									C.changeTab(cont,this.id.replace("tabName",""),I.onChange);
								});
							}
							
//							设置滑块初始宽度
							var slip_width = name.width();
							slip.css({
				                'width':slip_width
				            });
							
							C.onResize();
							if(C.tabPages) C.tabPages.push(cont);
							else C.tabPages=[cont];
							cont.nowTabIndex=0;
//							if(I.onChange)
//								I.onChange(cont,0);
							window.onresize=function(){
								C.changeTab(cont,cont.nowTabIndex);
							};
							
							var oDiv = tabNames[0];
							var next=tabNames.next();
							var parent=oDiv.offsetParent;
				            C.H =oDiv.offsetTop;
				            var headHeight=$(".l-page-header").height();
				            var replaceBox=$("<div style='height:"+$(oDiv).height()+"px;'></div>");
				            parent.onscroll=function()
				            {
				            	var s = parent.scrollTop;
				            	
//				            	if(tabNames.css("position")!="fixed"&&oDiv.offsetTop>C.H) C.H=oDiv.offsetTop;
//				                if(s>C.H) {
//				                	tabNames.css({"position":"fixed","top":headHeight,"z-index":"999"});
//				                    tabNames.after(replaceBox);
//				                } else {
//				                	tabNames.removeAttr("style");
//				                    replaceBox.remove();
//				                }
				                
				            	if(tabNames.css("position")!="absolute"&&oDiv.offsetTop>C.H) C.H=oDiv.offsetTop;
				                if(s>C.H) {
				                	
				                	tabNames.css({"position":"absolute","top":headHeight,"z-index":"1"});
				                	
				                	next.before(replaceBox);
//				                   tabNames.after();
				                   $("body").append(tabNames);
				                } else {
				                	if(!tabNames.attr("style")) return;
				                	replaceBox.after(tabNames);
				                	tabNames.removeAttr("style");
				                    replaceBox.remove();
				                }
				            }
				            if(I.onAfterBuild) I.onAfterBuild(C,cont);
						},
						changeTab:function(tabPage,newIndex,onChange){
							var C=this;
							var oldIndex=tabPage.nowTabIndex;
							if(oldIndex==newIndex) {
								$(".jp-container").scrollTop(C.H);
								return;
							}
							var width=window.document.body.offsetWidth;
							width=newIndex*width;
							tabPage.nowTabIndex=newIndex;
							tabPage.css("transform","translate(-"+width+"px,0px)");
							tabPage.names[oldIndex].removeClass("l-page-tabed");
							tabPage.names[newIndex].addClass("l-page-tabed");
							setTimeout(function(){
								tabPage.pages[oldIndex].page.css("height","1px");
							},300);
							tabPage.pages[newIndex].page.css("height","auto");
//							$(".jp-container").scrollTop(C.H);
							if(oldIndex==newIndex) return;
							tabPage.slip.css({
								"left": tabPage.names[newIndex][0].offsetLeft
							});
							C.onResize();
							thisPage.onResize();
							if(onChange)
								onChange(tabPage,newIndex);
						},
						buildGrid:function(G,I,afterRow,clear){
							if(!I.autoPage||clear) G.html("");
							if(!I.hideGroup)
								G.parent().prev().show();
							if(!I.hideGroupTips)
								G.parent().next().show();
							var C=this,R=null;
							if(I.gridData=="baseData") I.gridData=[C.baseData];
							I.dom=G;
							if(I.onBeforBuild!=null)
								if(I.onBeforBuild(I)==false) return;
							if((I.gridData.length==0||I.gridData.count==0)&&I.emptyText){
								I.gridData=[{
									noData:true
								}]
							}
							var _i=0;
							if(I.emptyText==null&&(I.gridData.length==0||I.gridData.count==0)){
								G.parent().prev().hide();
								G.parent().next().hide();
								return;
							}
							$(I.gridData).each(
								function(H, data) {
									data.base=I.gridData;
									data.index=_i++;
									R=C._addRow(G,afterRow,C.rid++);
									if(I.unformat) R.html("");
									if(data.noData) {
										var td=$("<td class='emptytext'></td>");
										td.addClass("l-page-bottom-border");
										R.append(td);
										if(typeof(I.emptyText)=="function"){
											td.append(I.emptyText());
										}else td.append(I.emptyText||"没有找到任何东西~(๑•́ ₃ •̀๑)");
										return;
									}
									for(var j in I.columns){
										var td=$("<td valign='middle' align='"+(I.columns[j].align!=null?I.columns[j].align:"left")+"'"+(I.columns[j].width?("width='"+I.columns[j].width+"'"):"")+(I.columns[j].class?("class='"+I.columns[j].class+"'"):"")+"></td>");
										td.addClass("l-page-bottom-border");
										R.append(td);
										if(I.interleave){
											td.addClass("interleave");
											td.siblings().addClass("interleave");
											td.removeClass("l-page-bottom-border");
											td.siblings().removeClass("l-page-bottom-border");
										}
										for(var m in I.columns[j].cells){	
											var txt=eval("data."+I.columns[j].cells[m].display);
											if(I.columns[j].cells[m].render){
												txt=I.columns[j].cells[m].render(data);
											}
											if(txt=="") txt="&nbsp;";
											if(!txt) txt=I.columns[j].cells[m].display;
											var cell=$("<span class='"+I.columns[j].cells[m].class+"' id='"+I.columns[j].cells[m].display+"'></span>");
											cell.append(txt?txt:" ");
											td.append(cell);
											if(m!=I.columns[j].cells.length-1
													&&(I.columns[j].cells[m*1+1].newLine==null||I.columns[j].cells[m*1+1].newLine==true))
												td.append($("<br>"));
												
										}
									}
									//R.append($("<td width=15></td>"));
									var H=R;
									var tdright = $("<td align='right' class='l-page-label' width=25><img width=25px height=36px src='"+goEdit+"'></img></td>");
									if(I.onClick && !I.hideArrow) R.append(tdright).bind(eClick,function(){I.onClick(data,H);});
									if(I.onClick && I.hideArrow) R.bind(eClick,function(){I.onClick(data,H);});
									if(I.interleave){
										tdright.addClass("interleave");
									}
									if(I.buttons) {
										R.append($("<td align='right' class='l-page-label' width=25><div id='a' style ='width:30px;  height:14; background:url("+showButtons+");background-repeat:no-repeat;background-size:14px 14px;background-position:0px 7px;'></div></td>"));
										R.bind(eClick,function(event){
											if(this.buttonRow&&$(this).css("background-color")=="rgb(247, 253, 151)"){
												// 设定背景图的坐标偏移量
												$(this).find("#a").css("background-position","0px 7px");
												$(this).css("background-color","");
												$(this).find("td").css("background-color","");
												$(this).find("span").css("color","");
												this.buttonRow.remove();
												this.buttonRow=null;
											}else{
												$(this).find("#a").css("background-position","0px -7px");
												var nowRow=$(this).parent().find(".rowButton");
												if(nowRow){
													var nowRowtr=nowRow.prev();
													nowRowtr.css("background-color","");
													nowRowtr.find("span").css("color","");
													nowRowtr.find("td").css("background-color","");
													nowRow.remove();
												}
												$(this).css("background-color","#f7fd97");
												$(this).find("td").css("background-color","#f7fd97");
												$(this).find("span").css("color","#000");
												var bR=C._addRow(G,this,C.rid++);
												bR.html("").addClass("rowButton");
												this.buttonRow=bR;
												var td=$("<td colspan='"+(3+I.columns.length)+"' class='l-page-bottom-border' style='background-color:#f7fd97;padding:0px 0px 10px 0px;' ></td>");
												bR.append(td);
												$(I.buttons).each(
													function(H, button) {
														button.element=$("<div class='l-row-button' style='margin-right:10px;margin-top:10px;'>"+button.display+"</div>").bind(eClick,function(){button.onClick(data)});
														td.append(button.element);
													}
												);
											}
											C.onResize();
											event.stopPropagation();//停止事件冒泡；目前没实际用处
										});
									}
								}
							);
							if(R) R.children("td:first").addClass("l-page-bottom-border");
							if(G.find("tr").length==0){
								G.parent().prev().hide();
								G.parent().next().hide();
								G.parent().hide();
							}else{
								if(I.pageEnable){	
									var P=$("<div class='l-page-group-title'></div><table height=40 border='0' cellspacing='0' cellpadding='0' class='l-page-group'><tr><td align='center' class='l-page-bottom-border' heigth=40> <table><tr><td>" +
											"<div class='pageBt' id='prev'>上一页</div> <div class='pageBt'>    <input type='text' id='nowPage' value='1' />        <span id='count' title='共3000条 299页'></span>        <span id='go' title='跳转'>▶</span>        </div>      <div class='pageBt' id='next'>下一页</div>" +
											"</td></tr></table></td></tr></table>");
									var table=P.eq(1).find("table");
									table.css({
										"position":"absolute",
										"width":"auto",
										"top":"50%",
										"right":"50%",
										"z-index":2,
										"margin-right" : "-133px",
										"margin-top" : "-20px"
									});
									table.id="g"+(C.gid++);
									//C.page.content.append(P);
									if(G.pagePanel)G.pagePanel.remove();
									G.after(P);
									G.pagePanel=P;
									var total=I.gridData.count;
									var pages= Math.ceil(total/I.gridParam.pagesize);
									P.find("#nowPage").val(I.gridParam.page);
									P.find("#count").attr("title","共 "+(I.gridData.count||0)+" 条").html(pages||0);
									P.find("#next").bind(eClick,function(){
										if(I.gridParam.page==pages) return;
										I.gridParam.page++;
										C.goPage(C,I,G,afterRow)});
									P.find("#prev").bind(eClick,function(){
										if(I.gridParam.page==1) return;
										I.gridParam.page--;
										C.goPage(C,I,G,afterRow)});
									
									P.find("#nowPage").bind("blur",function(key){
										this.value=parseInt(this.value);
										this.value=(this.value=="NaN")?1:this.value;
										if(this.value<=0) this.value=1;
										if(this.value>pages) this.value=pages;
									});
									P.find("#nowPage").bind("keyup",function(key){
										var ev = key || window.event;// 获取event对象
										if(ev.keyCode == 13){//回车
											this.value=parseInt(this.value);
											this.value=(this.value=="NaN")?1:this.value;
											if(this.value<=0) this.value=1;
											if(this.value>pages) this.value=pages;
											I.gridParam.page=this.value;
											C.goPage(C,I,G,afterRow);
											return false;
										}
									});
									P.find("#nowPage").bind("keydown",function(key){
										var ev = key || window.event;// 获取event对象
										if(ev.keyCode == 13){//回车
											this.value=parseInt(this.value);
											this.value=(this.value=="NaN")?1:this.value;
											if(this.value<=0) this.value=1;
											if(this.value>pages) this.value=pages;
											I.gridParam.page=this.value;
											C.goPage(C,I,G,afterRow);
											return false;
										}
									});
									P.find("#go").bind(eClick,function(){
										var n=P.find("#nowPage")[0];
										n.value=parseInt(n.value);
										n.value=(n.value=="NaN")?1:n.value;
										if(n.value<=0) n.value=1;
										if(n.value>pages) n.value=pages;
										I.gridParam.page=n.value;
										C.goPage(C,I,G,afterRow)});
									var start=(I.gridParam.page-1)*I.gridParam.pagesize+1;
									$(P[0]).html("本页从第 "+start+" 条至第 "+(start+I.gridData.length-1)+" 条&nbsp;&nbsp;&nbsp;共 "+(total||0)+" 条");
								}	
								if(I.autoPage) P.hide();
							}
							G.parent().slideDown(function(){
								C.onResize();
							});
							if(I.onAfterLoad!=null) I.onAfterLoad(I);
							
						},
						buildMenus:function(G,I,afterRow){
							var C=this,D=this.options;
							var R=C._addRow(G,afterRow,C.rid,I.icon);
							C.rid++;
							R.html("");
							R.addClass("noHover");
							var Lb=$("<td class='l-page-label resizeFontEnable'></td>");
							Lb.css("padding","0px");
							R.append(Lb);
							Lb.bind("resizeFont",C.resizeFont(Lb));
							Lb.trigger("resizeFont");
							var menusBox=$("<div class='l-page-menusContainer ' style='width:200%'></div>");
							Lb.append(menusBox);
							C.buildMenuBox(I,menusBox);
							
						},
						buildMenuBox:function(I,menusBox,second){
							var C=this;
							var W=C.page[0].scrollWidth;
							var menus=$("<div class='l-page-menusContainer'></div>");
							menusBox.append(menus);
							menus.css({
								"float":"left",
								"width":"50%",
								"background-color":"#fff"
							});
//							menus.css("webkitTransform","translate("+W+"px,0px)");
//							menus.css("transform","translate("+W+"px,0px)");
//							menus.css("mozTransform","translate("+W+"px,0px)");
//							menus.css("oTransform","translate("+W+"px,0px)");
							A(I.content).each(
									function(H, V){
										if(V==null) return;
										var div=$("<div class='l-page-menus '></div>");
										var box=$("<div class='l-page-menus-box '></div>");
										div.append(box);
										if(V.icon) box.append($("<img width='"+(I.size?I.size:45)+"px' src='"+V.icon+"'/  >"));
										if(V.title) box.append("<div class='resizeFontEnable'>"+V.title+"</div>");
										if(V.url) box.bind(eClick,function(){
											if(V.target=="_blank")
												window.open(V.url);
											else if(V.target=="_top"||V.target=="_parent")
												top.location.href=V.url;
											else
												window.location.href=V.url;
										});
										if(V.onClick) box.bind(eClick,function(){
											V.onClick(V);
										});
										else if(V.resId) box.bind(eClick,function(){
											C.Ajax(I.url, {superId:V.resId}, true, true, 
													function(ret){
														I.content=[{
															Back:true,
															url : "",
															resId:'',
															icon : "/"
																	+ appName
																	+ "/js/UI2.0/skins/PC-A/images/icon/_back.png",
															title : "返回"
														}];
														I.content=I.content.concat(ret.ret_data);
//														box.parent().parent().slideUp();
														C.buildMenuBox(I,menusBox,true);
														C.onResize();
													}
												);
										});
										else if(V.Plus) box.bind(eClick,function(){
											//展开按钮
										});
										else if(V.Minus) box.bind(eClick,function(){
											//收起按钮
										});
										else if(V.Back) box.bind(eClick,function(){
											menusBox.css("webkitTransform","translate(0px,0px)");
											menusBox.css("transform","translate(0px,0px)");
											menusBox.css("mozTransform","translate(0px,0px)");
											menusBox.css("oTransform","translate(0px,0px)");
											setTimeout(function(){
												menus.remove();
											},300);
//											box.parent().parent().animate({
//												height:'0px'
//											},function(){
//												box.parents("tr").remove();
//												this.focus();
//												C.onResize();
//											});
//
//											box.parents("tr").prev().children().children().slideDown();
										});
										menus.append(div);
										
									});
							if(second)
							setTimeout(
									function(){
//										menus.prev().css({
//											"margin-left":"-"+W+"px"
//										});
										menusBox.addClass("ease_out");
										menusBox.css("webkitTransform","translate(-"+W+"px,0px)");
										menusBox.css("transform","translate(-"+W+"px,0px)");
										menusBox.css("mozTransform","translate(-"+W+"px,0px)");
										menusBox.css("oTransform","translate(-"+W+"px,0px)");
										
									},1
							);
						},
						buildImg:function(G,I,afterRow){
							var C=this,D=this.options,R,Lb;
							if(I.appendTo) {
								R=$("#"+I.appendTo);
								R.html("");
								Lb=$("<div class='l-page-label resizeFontEnable' style='overflow:hidden;'><div  style='width:100%;overflow:hidden; position: relative; height:auto;'></div></div>");
								Lb.css("padding","0px");
								R.append(Lb);
							}
							else{
								R=C._addRow(G,afterRow,C.rid,I.icon);
								C.rid++;
								R.html("");
								Lb =$("<td class='l-page-label resizeFontEnable' style='overflow:hidden;'><div  style='width:100%;overflow:hidden; position: relative; height:auto;'></div></td>");
								Lb.css("padding","0px");
								R.append(Lb);
							}
							
							I.content.push(I.content[0]);
							I.content.unshift(I.content[I.content.length-2]);
							var content=$("<div style='width:"+I.content.length+"00%;position: absolute; top: 0;'></div>");
							Lb.children().append(content);
							var buts=$("<div class='l-page-img-buts'><div></div></div>");
							Lb.children().append(buts);
							var i=0;
							var slide=function(){
								if($(this).hasClass("selected")) return;
								amt($(this));
							};
							var amt=function(span){
								var buts=span.parent().parent();
								var width=buts[0].offsetWidth;
								var next=span[0].id;
								buts.children().children(".selected").removeClass("selected");
								buts.children().children().eq(next-1).addClass("selected");
								var imgs=buts.prev();
								next;
								imgs.animate({left: 0-width*(next)+"px"}, "slow");
							}
							var amt2=function(img,step){
								var span=$(img).parent().next().find(".selected");
								var buts=$(img).parent().next();
								var width=buts[0].offsetWidth;
								var len=buts.children().children().length;
								var next=span[0].id*1+step;
								var imgs=buts.prev();
								imgs.animate({left: 0-width*next+"px"}, "slow",function(){
									if(next==len) imgs.css("left",0-width*len+"px");
									if(next==1) imgs.css("left",0-width+"px");
								});
								if(next==len+1) next=1;
								if(next==0) next=len;
								buts.children().children(".selected").removeClass("selected");
								buts.children().children().eq(next-1).addClass("selected");
							}
							var amt3=function(){
								var span=content.parent().find(".selected");
								var buts=span.parent().parent();
								var width=buts[0].offsetWidth;
								var len=buts.children().children().length;
								var next=span[0].id*1+1;
								var imgs=buts.prev();
								imgs.animate({left: 0-width*next+"px"}, "slow",function(){
									if(next==len) imgs.css("left",0-width*len+"px");
									if(next==1) imgs.css("left",0-width+"px");
								});
								if(next==len+1) next=1;
								if(next==0) next=len;
								buts.children().children(".selected").removeClass("selected");
								buts.children().children().eq(next-1).addClass("selected");
							}
							A(I.content).each(
									function(H, V){
										var img=$("<img  src='"+ V.src +"' title='"+V.display+"'/>")
										content.append(img);
										if(V.onClick) img.bind("click",function(){
											V.onClick(V);
										});
										if(V.url) img.bind("click",function(){
											var pDoc=$("<div id='pageF"+V.id+"'></div>");
											$("body").append(pDoc);
											var page=pDoc.ligerPage(
													{
														title : G.name,
														subTitle : "",
														backButton : "返回",
														propertyButton : false,
														content : [{
															type:"url",
															url:V.url
														}]
													});
											pages.push(page);
											thisPage=page;
										});
										if(eClick=="tap"){
											img.bind("touchstart",function(e){
												clearInterval(I.content.auto);
												var touch=e.originalEvent;
												img.touch={
														x0:touch.touches[0].pageX,
														y0:touch.touches[0].pageY,
														x1:touch.touches[0].pageX,
														y1:touch.touches[0].pageY
												}
												e.stopPropagation();
											});
											img.bind("touchmove",function(e){
												var touch=e.originalEvent;
												
												if(img.move==null){
													if(Math.abs(img.touch.y1-touch.touches[0].pageY)<Math.abs(img.touch.x1-touch.touches[0].pageX)&&Math.abs(img.touch.x1-touch.touches[0].pageX)>20){
														img.move=true;
													}
												}else if(img.move){
													img.touch.x2=touch.touches[0].pageX;
													img.touch.y2=touch.touches[0].pageY;
													var x=img.touch.x2-img.touch.x1;
													img.touch.x1=img.touch.x2;
													img.touch.y1=img.touch.y2;
													img.parent().css("left",(x+img.parent().css("left").replace("px","")*1)+"px");
													e.stopPropagation();
													e.preventDefault();
													//去掉冒泡
												}
											});
											img.bind("touchend",function(e){
												if(img.move){
													var touch=e.originalEvent;
													var x=img.touch.x2-img.touch.x0;
													img.touch=null;
													img.move=null;
													if(x>50) amt2(this,-1);
													else if(x<-50) amt2(this,1);
													else {
														var rest=img.parent().css("left").replace("px","")*1-x;
														img.parent().animate({left: rest+"px"}, "fast");
													}
													e.stopPropagation();
												}
												I.content.auto=setInterval(amt3,3000);
											});
											
							
										}else{
											
											img.bind("mouseover",function(e){
												clearInterval(I.content.auto);
											});
											img.bind("mouseout",function(e){
												I.content.auto=setInterval(amt3,3000);
											});	
										}
										var but=$("<span id='"+i+"' class='"+(i!=1?"":"selected")+"'></span>");
										i++;
										if(i!=1&&i!=I.content.length){
											buts.children().append(but);
											but.bind(eClick,slide);
											but.bind("mouseover",function(e){
												clearInterval(I.content.auto);
												e.stopPropagation();
											});
											but.bind("mouseout",function(e){
												I.content.auto=setInterval(amt3,3000);
												e.stopPropagation();
											});	
										}
									});
							if(eClick=="click"){
								buts.css("height","36px");
								buts.children().css("height","20px");
								buts.children().children().css({"height":"12px","width":"12px","margin":"4px 10px"});
							}
							I.content.auto=setInterval(amt3,3000);
							buts.bind("mouseover",function(e){
								clearInterval(I.content.auto);
							});
							buts.bind("mouseout",function(e){
								I.content.auto=setInterval(amt3,3000);
							});	
							Lb.bind("resizeFont",function(){ 
								var w=$("body")[0].offsetWidth;
								Lb.children().children().eq(0).css("left",0-w);
								Lb.parent().attr("width",w);
								Lb.parent().css("width",w+"px");
								Lb.find("img").attr("width",w);
								Lb.children().css("height",w*(I.height?I.height:(1/3.2))+"px");
								C.onResize();
							});
							Lb.trigger("resizeFont");
						},
						autoPage:function(grid,e){ 
							var C=this;
//							if(eClick=="click"){
////								1.获取到jspPane的top变化
////								2.若top值到达某一个数值以上，则加载数据
////								3.这个数值的影响参数有：屏幕高度、内容的高度
//								var cH=$(".jspContainer").height();
//								var pH=$(".jspPane").height();
//								var changeH=$(".jspPane").css("top").replace("px","");
//								if((cH-changeH)==pH)
//									C.addNextPage(grid);
//							}else{
								if(e.target.scrollHeight-e.target.scrollTop-e.target.offsetHeight<=1)
									C.addNextPage(grid);
//							}
						},
						addNextPage:function(I){
							var C=this;
							if(I.gridParam.page*I.pageSize>=I.gridData.count){
								C.flushGroup(I.G.id.substr(1), null,
								I.lastDataMsg?I.lastDataMsg:"已经没有更多新的数据了！╮(╯﹏╰）╭");
								return;
							}
							I.gridParam.page++;
							if(I.gridUrl){
								C.Ajax(I.gridUrl, I.gridParam, true, true, 
									function(ret){
										I.gridData=ret.ret_data;
										C.buildGrid(I.G,I,I.afterRow);
									}
								);
							}else if(I.gridData){
								C.buildGrid(I.G,I,I.afterRow);
							}
						}
					})
					
					
})(jQuery);
