
(function($) {

	//全局系统对象
	window['LG'] = {};

	LG.cookies = (function() {
		var fn = function() {
		};
		fn.prototype.get = function(name) {
			var cookieValue = "";
			var search = name + "=";
			if (document.cookie.length > 0) {
				offset = document.cookie.indexOf(search);
				if (offset != -1) {
					offset += search.length;
					end = document.cookie.indexOf(";", offset);
					if (end == -1)
						end = document.cookie.length;
					cookieValue = decodeURIComponent(document.cookie.substring(
							offset, end));
				}
			}
			return cookieValue;
		};
		fn.prototype.set = function(cookieName, cookieValue, DayValue) {
			var expire = "";
			var day_value = 1;
			if (DayValue != null) {
				day_value = DayValue;
			}
			expire = new Date((new Date()).getTime() + day_value * 86400000);
			expire = "; expires=" + expire.toGMTString();
			document.cookie = cookieName + "="
					+ encodeURIComponent(cookieValue) + ";path=/" + expire;
		};
		fn.prototype.remvoe = function(cookieName) {
			var expire = "";
			expire = new Date((new Date()).getTime() - 1);
			expire = "; expires=" + expire.toGMTString();
			document.cookie = cookieName + "=" + escape("") + ";path=/"
					+ expire;
			/*path=/*/
		};

		return new fn();
	})();

	//右下角的提示框
	LG.tip = function(message) {
		if (LG.wintip) {
			LG.wintip.set('content', message);
			LG.wintip.show();
		} else {
			LG.wintip = $.ligerDialog.tip({
				content : message
			});
		}
		setTimeout(function() {
			LG.wintip.hide();
		}, 4000);
	};

	//预加载图片
	LG.prevLoadImage = function(rootpath, paths) {
		for ( var i in paths) {
			$('<img />').attr('src', rootpath + paths[i]);
		}
	};
	//显示loading
	LG.showLoading = function(message) {
		message = message || "请稍候...";
		$('body').append("<div class='jloading'>" + message + "</div>");
		$.ligerui.win.mask();
	};
	//隐藏loading
	LG.hideLoading = function(message) {
		$('body > div.jloading').remove();
		$.ligerui.win.unmask({
			id : new Date().getTime()
		});
	};
	//显示成功提示窗口
	LG.showSuccess = function(message, callback) {
		if (typeof (message) == "function" || arguments.length == 0) {
			callback = message;
			message = "操作成功!";
		}
		$.ligerDialog.success(message, '提示信息', callback);
	};
	//显示失败提示窗口
	LG.showError = function(message, callback) {
		if (typeof (message) == "function" || arguments.length == 0) {
			callback = message;
			message = "操作失败!";
		}
		$.ligerDialog.error(message, '提示信息', callback);
	};

	//预加载dialog的图片
	LG.prevDialogImage = function(rootPath) {
		rootPath = rootPath || "";
		LG.prevLoadImage(rootPath + 'lib/ligerUI/skins/Aqua/images/win/',
				[ 'dialog-icons.gif' ]);
		LG.prevLoadImage(rootPath + 'lib/ligerUI/skins/Gray/images/win/',
				[ 'dialogicon.gif' ]);
	};

	//提交服务器请求
	//返回json格式
	//1,提交给类 options.type  方法 options.method 处理
	//2,并返回 AjaxResult(这也是一个类)类型的的序列化好的字符串
	LG.ajax = function(options) {
		var p = options || {};
		var ashxUrl = options.ashxUrl || "../handler/ajax.ashx?";
		var url = p.url || ashxUrl + $.param({
			type : p.type,
			method : p.method
		});
		$.ajax({
			cache : false,
			async : true,
			url : url,
			data : p.data,
			dataType : 'json',
			type : 'post',
			beforeSend : function() {
				LG.loading = true;
				if (p.beforeSend)
					p.beforeSend();
				else
					LG.showLoading(p.loading);
			},
			complete : function() {
				LG.loading = false;
				if (p.complete)
					p.complete();
				else
					LG.hideLoading();
			},
			success : function(result) {
				if (!result)
					return;
				if (!result.IsError) {
					if (p.success)
						p.success(result.Data, result.Message);
				} else {
					if (p.error)
						p.error(result.Message);
				}
			},
			error : function(result, b) {
				LG.tip('发现系统错误 <BR>错误码：' + result.status);
			}
		});
	};

	//获取当前页面的MenuNo
	//优先级1：如果页面存在MenuNo的表单元素，那么加载它的值
	//优先级2：加载QueryString，名字为MenuNo的值
	LG.getPageMenuNo = function() {
		var menuno = $("#MenuNo").val();
		if (!menuno) {
			menuno = getQueryStringByName("MenuNo");
		}
		return menuno;
	};

	//创建按钮
	LG.createButton = function(options) {
		var p = $.extend({
			appendTo : $('body')
		}, options || {});
		var btn = $('<div class="button button2 buttonnoicon" style="width:60px"><div class="button-l"> </div><div class="button-r"> </div> <span></span></div>');
		if (p.icon) {
			btn.removeClass("buttonnoicon");
			btn.append('<div class="button-icon"> <img src="../' + p.icon
					+ '" /> </div> ');
		}
		//绿色皮肤
		if (p.green) {
			btn.removeClass("button2");
		}
		if (p.width) {
			btn.width(p.width);
		}
		if (p.click) {
			btn.click(p.click);
		}
		if (p.text) {
			$("span", btn).html(p.text);
		}
		if (typeof (p.appendTo) == "string")
			p.appendTo = $(p.appendTo);
		btn.appendTo(p.appendTo);
	};

	//创建过滤规则(查询表单)
	LG.bulidFilterGroup = function(form) {
		if (!form)
			return null;
		var group = {
			op : "and",
			rules : []
		};
		$(":input", form).not(":submit, :reset, :image,:button, [disabled]")
				.each(function() {
					if (!this.name)
						return;
					if (!$(this).hasClass("field"))
						return;
					if ($(this).val() == null || $(this).val() == "")
						return;
					var ltype = $(this).attr("ltype");
					var optionsJSON = $(this).attr("ligerui"), options = null;
					if (optionsJSON) {
						options = JSON2.parse(optionsJSON);
					}
					var op = $(this).attr("op") || "like";
					//get the value type(number or date)
					var type = $(this).attr("vt") || "string";
					var value = $(this).val();
					var name = this.name;
					//如果是下拉框，那么读取下拉框关联的隐藏控件的值(ID值,常用与外表关联)
					if (ltype == "select" && options && options.valueFieldID) {
						value = $("#" + options.valueFieldID).val();
						name = options.valueFieldID;
					}
					group.rules.push({
						op : op,
						field : name,
						value : value,
						type : type
					});
				});
		return group;
	};

	//附加表单搜索按钮：搜索、高级搜索
	LG.appendSearchButtons = function(form, grid) {
		if (!form)
			return;
		form = $(form);
		//搜索按钮 附加到第一个li  高级搜索按钮附加到 第二个li
		var container = $(
				'<ul><li style="margin-right:8px"></li><li></li></ul><div class="l-clear"></div>')
				.appendTo(form);
		LG.addSearchButtons(form, grid, container.find("li:eq(0)"), container
				.find("li:eq(1)"));

	};

	//创建表单搜索按钮：搜索、高级搜索
	LG.addSearchButtons = function(form, grid, btn1Container, btn2Container) {
		if (!form)
			return;
		if (btn1Container) {
			LG.createButton({
				appendTo : btn1Container,
				text : '搜索',
				click : function() {
					var rule = LG.bulidFilterGroup(form);
					if (rule.rules.length) {
						grid.set('parms', {
							where : JSON2.stringify(rule)
						});
					} else {
						grid.set('parms', {});
					}
					grid.loadData();
				}
			});
		}
		if (btn2Container) {
			LG.createButton({
				appendTo : btn2Container,
				width : 80,
				text : '高级搜索',
				click : function() {
					grid.showFilter();
				}
			});
		}
	};

	//快速设置表单底部默认的按钮:保存、取消
	LG.setFormDefaultBtn = function(cancleCallback, savedCallback) {
		//表单底部按钮
		var buttons = [];
		if (cancleCallback) {
			buttons.push({
				text : '取消',
				onclick : cancleCallback
			});
		}
		if (savedCallback) {
			buttons.push({
				text : '保存',
				onclick : savedCallback
			});
		}
		LG.addFormButtons(buttons);
	};

	//增加表单底部按钮,比如：保存、取消
	LG.addFormButtons = function(buttons) {
		if (!buttons)
			return;
		var formbar = $("body > div.form-bar");
		if (formbar.length == 0)
			formbar = $(
					'<div class="form-bar"><div class="form-bar-inner"></div></div>')
					.appendTo('body');
		if (!(buttons instanceof Array)) {
			buttons = [ buttons ];
		}
		$(buttons)
				.each(
						function(i, o) {
							var btn = $('<div class="l-dialog-btn"><div class="l-dialog-btn-l"></div><div class="l-dialog-btn-r"></div><div class="l-dialog-btn-inner"></div></div> ');
							$("div.l-dialog-btn-inner:first", btn).html(
									o.text || "BUTTON");
							if (o.onclick) {
								btn.bind('click', function() {
									o.onclick(o);
								});
							}
							if (o.width) {
								btn.width(o.width);
							}
							$("> div:first", formbar).append(btn);
						});
	};

	//填充表单数据
	LG.loadForm = function(mainform, options, callback) {
		options = options || {};
		if (!mainform)
			mainform = $("form:first");
		var p = $.extend({
			beforeSend : function() {
				LG.showLoading('正在加载表单数据中...');
			},
			complete : function() {
				LG.hideLoading();
			},
			success : function(data) {
				var preID = options.preID || "";
				//根据返回的属性名，找到相应ID的表单元素，并赋值
				for ( var p in data) {
					var ele = $("[name=" + (preID + p) + "]", mainform);
					//针对复选框和单选框 处理
					if (ele.is(":checkbox,:radio")) {
						ele[0].checked = data[p] ? true : false;
					} else {
						ele.val(data[p]);
					}
				}
				//下面是更新表单的样式
				var managers = $.ligerui.find($.ligerui.controls.Input);
				for ( var i = 0, l = managers.length; i < l; i++) {
					//改变了表单的值，需要调用这个方法来更新ligerui样式
					var o = managers[i];
					o.updateStyle();
					if (managers[i] instanceof $.ligerui.controls.TextBox)
						o.checkValue();
				}
				if (callback)
					callback(data);
			},
			error : function(message) {
				LG.showError('数据加载失败!<BR>错误信息：' + message);
			}
		}, options);
		LG.ajax(p);
	};

	//带验证、带loading的提交
	LG.submitForm = function(mainform, dialog, success, error) {
		if (!mainform) {
			mainform = $("form:first");
		}
		var pre_ = mainform.attr("id") + '_';
		//mainform.valid()方法触发表单验证
		if (mainform.valid()) {
			if (dialog != "" && dialog != null) {
				dialog.hidden();
			}
			mainform
					.ajaxSubmit({
						dataType : 'json',
						success : success,
						beforeSubmit : function(formData, jqForm, options) {
							//针对复选框和单选框 处理
							$(":checkbox,:radio", jqForm).each(function() {
								if (!existInFormData(formData, this.name)) {
									formData.push({
										name : this.name,
										type : this.type,
										value : this.checked
									});
								}
							});
							for ( var i = 0, l = formData.length; i < l; i++) {
								var o = formData[i];
								if (o.type == "checkbox" || o.type == "radio") {
									o.value = $("[name=" + o.name + "]", jqForm)[0].checked ? "true"
											: "false";
								}
							}
						},
						beforeSend : function(a, b, c) {
							LG.showLoading('正在保存数据中...');

						},
						complete : function() {
							if ($('#' + pre_ + 'subtn') != null) {
								$('#' + pre_ + 'subtn').show();
							}
							LG.hideLoading();
						},
						error : function(result) {
							if ($('#' + pre_ + 'subtn') != null) {
								$('#' + pre_ + 'subtn').show();
							}
							LG.hideLoading();
							LFT.showErrorMessage(result);
							return false;
							//LG.tip('发现系统错误 <BR>错误码：' + result.status);
						}
					});
		} else {
			if ($('#' + pre_ + 'subtn') != null) {
				$('#' + pre_ + 'subtn').show();
			}
			LG.showInvalid();
		}
		function existInFormData(formData, name) {
			for ( var i = 0, l = formData.length; i < l; i++) {
				var o = formData[i];
				if (o.name == name)
					return true;
			}
			return false;
		}
	};

	//提示 验证错误信息
	LG.showInvalid = function(validator) {
		validator = validator || LG.validator;
		if (!validator)
			return;
		var message = '<div class="invalid">存在' + validator.errorList.length
				+ '个字段验证不通过，请检查!</div>';
		//top.LG.tip(message);
		$.ligerDialog.error(message);
	};

	//表单验证
	LG.validate = function(form, options) {
		if (typeof (form) == "string")
			form = $(form);
		else if (typeof (form) == "object" && form.NodeType == 1)
			form = $(form);

		//验证失败，显示错误样式并显示提示气泡
		options = $.extend({
			errorPlacement : function(lable, element) {
				//alert('element.attr("id") = '+element.attr("id"));
				if (!element.attr("id"))
					element.attr("id", new Date().getTime());
				if (element.hasClass("l-textarea")) {
					element.addClass("l-textarea-invalid");
				} else if (element.hasClass("l-text-field")) {
					element.parent().addClass("l-text-invalid");
				}
				$(element).removeAttr("title").ligerHideTip();
				$(element).attr("title", lable.html()).ligerTip({
					content : lable.html(),
					appendIdTo : element,
					distanceX : 5,
					distanceY : -3,
					auto : true
				});

			},
			success : function(lable) {
				if (!lable.attr("for"))
					return;
				var element = $("#" + lable.attr("for"));
				if (element.hasClass("l-textarea")) {
					element.removeClass("l-textarea-invalid");
				} else if (element.hasClass("l-text-field")) {
					element.parent().removeClass("l-text-invalid");
				}
				$(element).removeAttr("title").ligerHideTip();
			}
		}, options || {});
		LG.validator = form.validate(options);
		return LG.validator;
	};

	LG.loadToolbar = function(grid, toolbarBtnItemClick) {
		var MenuNo = LG.getPageMenuNo();
		LG.ajax({
			loading : '正在加载工具条中...',
			type : 'AjaxSystem',
			method : 'GetMyButtons',
			data : {
				HttpContext : true,
				MenuNo : MenuNo
			},
			success : function(data) {
				if (!grid.toolbarManager)
					return;
				if (!data || !data.length)
					return;
				var items = [];
				for ( var i = 0, l = data.length; i < l; i++) {
					var o = data[i];
					items[items.length] = {
						click : toolbarBtnItemClick,
						text : o.BtnName,
						img : rootPath + o.BtnIcon,
						id : o.BtnNo
					};
					items[items.length] = {
						line : true
					};
				}
				grid.toolbarManager.set('items', items);
			}
		});
	};

	//关闭Tab项,如果tabid不指定，那么关闭当前显示的
	LG.closeCurrentTab = function(tabid) {
		if (!tabid) {
			tabid = $(
					"#framecenter > .l-tab-content > .l-tab-content-item:visible")
					.attr("tabid");
		}
		if (tab) {
			tab.removeTabItem(tabid);
		}
	};

	//关闭Tab项并且刷新父窗口
	LG.closeAndReloadParent = function(tabid, parentMenuNo) {
		LG.closeCurrentTab(tabid);
		var menuitem = $("#mainmenu ul.menulist li[menuno=" + parentMenuNo
				+ "]");
		var parentTabid = menuitem.attr("tabid");
		var iframe = window.frames[parentTabid];
		if (tab) {
			tab.selectTabItem(parentTabid);
		}
		if (iframe && iframe.f_reload) {
			iframe.f_reload();
		} else if (tab) {
			tab.reload(parentTabid);
		}
	};

	//覆盖页面grid的loading效果
	LG.overrideGridLoading = function() {
		$.extend($.ligerDefaults.Grid, {
			onloading : function() {
				LG.showLoading('正在加载表格数据中...');
			},
			onloaded : function() {
				LG.hideLoading();
			}
		});
	};

	//根据字段权限调整 页面配置
	LG.adujestConfig = function(config, forbidFields) {
		if (config.Form && config.Form.fields) {
			for ( var i = config.Form.fields.length - 1; i >= 0; i--) {
				var field = config.Form.fields[i];
				if ($.inArray(field.name, forbidFields) != -1)
					config.Form.fields.splice(i, 1);
			}
		}
		if (config.Grid && config.Grid.columns) {
			for ( var i = config.Grid.columns.length - 1; i >= 0; i--) {
				var column = config.Grid.columns[i];
				if ($.inArray(column.name, forbidFields) != -1)
					config.Grid.columns.splice(i, 1);
			}
		}
		if (config.Search && config.Search.fields) {
			for ( var i = config.Search.fields.length - 1; i >= 0; i--) {
				var field = config.Search.fields[i];
				if ($.inArray(field.name, forbidFields) != -1)
					config.Search.fields.splice(i, 1);
			}
		}
	};

	//查找是否存在某一个按钮
	LG.findToolbarItem = function(grid, itemID) {
		if (!grid.toolbarManager)
			return null;
		if (!grid.toolbarManager.options.items)
			return null;
		var items = grid.toolbarManager.options.items;
		for ( var i = 0, l = items.length; i < l; i++) {
			if (items[i].id == itemID) {
				return items[i];
			}
		}
		return null;
	};

	//设置grid的双击事件(带权限控制)
	LG.setGridDoubleClick = function(grid, btnID, btnItemClick) {
		btnItemClick = btnItemClick || toolbarBtnItemClick;
		if (!btnItemClick)
			return;
		grid.bind('dblClickRow', function(rowdata) {
			var item = LG.findToolbarItem(grid, btnID);
			if (!item)
				return;
			grid.select(rowdata);
			btnItemClick(item);
		});
	};

	/*
	 * 设置新增、修改Form表单底部按钮，带提交、重置、取消功能
	 */
	LG.setFormSaveButtonLFT = function(form, dialog, grid, beforeSubmit,
			successCallBack, errorCallBack,reset) {
		//添加按钮到表单底部
		var pre_ = form.attr("id") + '_';
		var resetbutton='<input id="'
			+ pre_
			+ 'retbtn" type="button" value="清空" class="l-button l-button-reset"/>';
		if(reset==false){
			resetbutton="";
		}
		$(
				'<ul><table align="center" style="font-size: inherit;"><tr><td colspan="2"><input type="button" value="提交" id="'
						+ pre_
						+ 'subtn" class="l-button l-button-submit"/>'
						+ resetbutton+'</td></tr></table></ul>')
				.appendTo(form);
		$('#' + pre_ + 'subtn').bind(
				'click',
				function() {
					$('#' + pre_ + 'subtn').hide();
					//$('#'+ pre_ + 'subtn').disabled ='disabled';
					var flag = true;
					if (beforeSubmit != null) {
						flag = beforeSubmit(form, dialog, grid);
					}
					if (flag) {
						LG.submitForm(form, dialog, function(data) {
							if (data.IsError || data.ret_code == "9999"
									|| data.ret_code == "8888") {
								
								if (errorCallBack != null) {
									// edit by hllian, 修改错误事件到错误提示框确认之后
									LG.showError('错误:' + data.ret_msg, function() {
										errorCallBack(form, dialog, grid, data);
									});
								}else {
									LG.showError('错误:' + data.ret_msg);
								}
							} else {
								//$.ligerDialog.tip({  title: '提示信息',content:'保存成功！'+num++ });
								LG.showSuccess('操作成功', function() {
									if (grid != "" && grid != null) {
										grid.ligerGetGridManager().loadData();
									}
									//@lxl 2013-05-14 增加保存返回对象
									if (successCallBack != null) {
										successCallBack(form, dialog, grid,
												data);
									}
								});
							}
						});
					} else {
						$('#' + pre_ + 'subtn').show();
					}
				});
		$('#' + pre_ + 'retbtn').bind('click', function() {
			LG.clearForm(form);
		});
	};

	/*
	 * 设置下一步按钮
	 */
	LG.nextButtonLFT = function(form, dialog, grid, beforeSubmit,
			successCallBack) {
		//添加按钮到表单底部
		var pre_ = form.attr("id") + '_';
		$(
				'<ul><table align="center"><tr><td colspan="2"><input type="button" value="下一步" id="'
						+ pre_ + 'subtn" class="l-button l-button-submit"/>')
				.appendTo(form);
		$('#' + pre_ + 'subtn').bind('click', function() {
			var flag = true;
			if (beforeSubmit != null) {
				flag = beforeSubmit(form, dialog, grid);
			}
			if (flag) {
				if (successCallBack != null) {
					successCallBack(form, dialog, grid, data);
				}
			}
		});
	};
	
	/**
	 * 搜索功能
	 */
	LG.searchContentLFT = function(params){
		/* 参数初始化 */
		if(params.prefixID == null) {
			params.prefixID = params.form.attr('id') + '_';
		}
		
		// 实时搜索
		if(params.searchAfterKeyUp == null) {
			params.searchAfterKeyUp = false;
		}
		
		var form = params.form;
		form.options = params;
		var grid = params.grid;
		var conditions = params.conditions;
		var prefixID = params.prefixID;
		var searchTips = params.searchTips || "请输入搜索内容";

		// 默认搜索条件
		var defaultCondition = params.defaultCondition;
		
		// 标志
		var selectFlag = false;
		if(params.fields != null && params.fields.length > 0) {
			selectFlag = true;
		}
		
		var conditionFlag = false;
		if(params.conditions != null && params.conditions.length > 0) {
			conditionFlag = true;
		}
		
		if(params.conditions == null) {
			if(params.defaultCondition == null) {
				alert('LG.searchContentLFT\nerror:未指定搜索条件！');
				return;
			}
		}else if(params.conditions.length == 1) {
			if(params.defaultCondition == null) {
				defaultCondition = params.conditions[0].name;
				conditionFlag = false;
			}else {
				conditionFlag = true;
			}
		}else {
			if(params.defaultCondition == null) {
				defaultCondition = params.conditions[0].name;
			}
			conditionFlag = true;
		}
		
		
		/* 控件创建 */
		// group
		var groupDiv = null;
		if(params.group) {
			form.addClass('l-form');
			groupDiv = $('<div></div>');
			groupDiv.addClass('l-group');
			if(params.groupicon) {
				groupDiv.addClass('l-group-hasicon');
				var groupImg = $('<img></img>');
				groupImg.attr('src', params.groupicon);
				groupImg.appendTo(groupDiv);
			}
			var groupSpan = $('<span></span>');
			groupSpan.html(params.group);
			groupSpan.appendTo(groupDiv);
			
			groupDiv.appendTo(form);
		}
		
		// 1.搜索输入框
		var searchInputDiv = $('<div></div>');
		searchInputDiv.addClass('l-text');
		searchInputDiv.css({
			width : params.inputWidth + 'px',
			height : '22px',
			'margin-top' : '0px'
			});
		var searchInput = $('<input type="text" />');
		searchInput.css({
			width : (params.inputWidth - 2) + 'px'
		});
		searchInput.addClass('l-text-field s-defaultText');
		searchInput.attr('name', defaultCondition);
		searchInput.val(params.searchTips);
		searchInput.appendTo(searchInputDiv);
		// 2.搜索按钮
		var searchButton = $('<input type="button" value="搜索" />');
		searchButton.addClass('l-button l-button-submit');
		searchButton.css('margin-top', '0px');
		var searchMainTable = $('<table></table>');
		var searchMainTr = $('<tr></tr>');
		var searchInputTd = $('<td></td>');
		var searchSpaceTd = $('<td></td>');
		searchSpaceTd.css('width', params.space);
		var searchButtonTd = $('<td></td>');
		
		// 组合
		searchInputDiv.appendTo(searchInputTd);
		searchButton.appendTo(searchButtonTd);
		searchInputTd.appendTo(searchMainTr);
		searchSpaceTd.appendTo(searchMainTr);
		searchButtonTd.appendTo(searchMainTr);
		/* searchMainTable -- 搜索主控件 */
		searchMainTr.appendTo(searchMainTable);  
		
		// 3.select搜索条件
		var searchSelectTable = null;
		if(selectFlag) {
			searchSelectTable = $('<table></table>');
			var searchSelectTr = $('<tr></tr>');
			var fields = params.fields;
			for(var i = 0; i < fields.length; i++) {
				var selectTd = $('<td></td>');
				var selectInput = $('<select></select>');
				selectInput.attr('id',prefixID + fields[i].comboboxName);
				selectInput.appendTo(selectTd);
				// 将fields.width赋给 options
				if(fields[i].options.width == null) {
					fields[i].options.width = fields[i].width;
				}
				selectInput.ligerComboBox(fields[i].options);
				if(i > 0) {
					var spaceTd = $('<td></td>');
					spaceTd.css('width', params.space);
					spaceTd.appendTo(searchSelectTr);
				}
				selectTd.appendTo(searchSelectTr);
			}
			/* searchSelectTable -- 下拉条件搜索主控件 */
			searchSelectTr.appendTo(searchSelectTable);
		}
		
		// 4.下拉框搜索功能
		var searchConditionBox = null;
		if(conditionFlag) {
			$(".s-box-select").remove();
			searchConditionBox = $('<div></div>'); 
			searchConditionBox.addClass('s-box-select');
			searchConditionBox.css("min-width", params.inputWidth);
			for ( var i = 0; i < conditions.length; i++) {
				var searchOption = $('<div></div>');
				searchOption.addClass('s-box-item');
				searchOption.attr('id', prefixID + conditions[i].name);
				searchOption.attr('name', conditions[i].name);
				var inText = '包含&nbsp<span style="color:#8EC8F0; font-weight:bold;"></span>&nbsp的'
						+ conditions[i].display;
				searchOption.html(inText);
				searchOption.appendTo(searchConditionBox);
			}
			/* searchConditionBox -- 下拉条件搜索主控件 */
			searchConditionBox.appendTo('body');
		}
		// 5.主体布局
		var searchContent = $('<ul></ul>');
		searchContent.css({
			'margin-top': '10px',
			'margin-left' : '20px'
		});
		var searchTable = $('<table></table>');
		if(selectFlag) {
			var selectTr = $('<tr></tr>');
			var selectTd = $('<td></td>');
			searchSelectTable.appendTo(selectTd);
			selectTd.appendTo(selectTr);
			selectTr.appendTo(searchTable);
		}
		var mainTr = $('<tr></tr>');
		var mainTd = $('<td></td>');
		searchMainTable.appendTo(mainTd);
		mainTd.appendTo(mainTr);
		mainTr.appendTo(searchTable);
		
		// 控件定位
		if(params.alignValue == 'left') {
			searchTable.css('margin-right','auto');
		}else if(params.alignValue == 'right') {
			searchTable.css('margin-left','auto');
		}else if(params.alignValue == 'center') {
			searchTable.css({
				'margin-left':'auto',
				'margin-right':'auto'
			});
		}
		searchTable.appendTo(searchContent);
		
		searchContent.appendTo(form);
		/* 事件绑定 */
		searchInput.val(searchTips);
		searchInput.addClass("s-defaultText");
		// input 获取焦点时清除默认样式
		searchInput.bind('click', function() {
			if (searchInput.val() == searchTips) {
				searchInput.val("");
				searchInput.removeClass("s-defaultText");
			}
			if(conditionFlag) {
				if (searchInput.val() != "") {
					syncContent();
					searchConditionBox.slideToggle("fast");
				} else {
					searchConditionBox.slideUp("fast");
				}
			}
		});	
		
		// input 失去焦点事件
		searchInput.bind('blur', function(){
			if (searchInput.val() == "") {
				searchInput.val(searchTips);
				searchInput.addClass("s-defaultText");
			}
		});
		searchInput.bind('keypress', function(){
			
			if(event.keyCode==13){
				searchButton.click();
				return false;
			}
		});
		
		// 搜索值改变时弹出下拉列表
			searchInput.bind('keyup', function(){
				 
				var val = searchInput.val();
				if(event.keyCode==13){
					
		        }else if(params.searchAfterKeyUp) {
					searchButton.click();
				}else {
					if(conditionFlag){
						if (val.length != 0) {
							syncContent();
							searchConditionBox.slideDown("fast");
						} else {
							searchConditionBox.slideUp("fast");
						}
					}
				}
			});
		if(conditionFlag){
			// 下拉列表项搜索事件
			// 下拉列表中的搜索事件
			for ( var i = 0; i < conditions.length; i++) {
				$('#' + prefixID + conditions[i].name).bind('click', function() {
					var name = $(this).attr('name');
					searchInput.attr('name', name);
					searchConditionBox.slideUp("fast");
					searchAction();
				});
			}
		}
		
		searchButton.bind('click', function(){
			if(conditionFlag){
					searchConditionBox.slideUp("fast");
				}
			
			searchInput.attr('name', defaultCondition);
			searchAction();
		});
		
		/* 重用方法 */
		// 修正下拉框位置
		function positionInit() {
			var _x = searchInputDiv.offset().left;
			var _y = searchInputDiv.offset().top;
			var _h = searchInputDiv.height() + 2;
			searchConditionBox.css("left", _x);
			searchConditionBox.css("top", _y + _h);
		}
		// 同步输入框内容
		function syncContent() {
			var val = searchInput.val();
			if (val.length > 0) {
				var childObj = searchConditionBox.children();
				for ( var i = 0; i < childObj.length; i++) {
					$($(childObj[i]).children()[0]).text(val);
				}
			}
			positionInit();
		}
		
		// 搜索方法
		function searchAction() {
			if (!form) {
				form = $("form:first");
			}
			if (form.valid()) {
				// form 提交的表单
				var rule = LG.searchParam(form);
//				alert("new rule ="+JSON2.stringify(rule));
				// 注，此处是直接使用的parms的地址，修改param，grid.parms也会变
				var param = grid.get('parms');
				// 设置页面从头开始
				// param.push({ name: 'page', value: 1 });
				if (rule.length) {
					var conditionParam = new Array();
					for(var i = 0; i < conditions.length; i++) {
						var tempRule = {
								name : conditions[i].name,
								value : ""
							};
						conditionParam.push(tempRule);
					}
					
					conditionParam.push({name : defaultCondition, value : ""});
					
					for ( var i = 0; i < conditionParam.length; i++) {
						var flag = false;
						var tempRule = {
							name : conditionParam[i].name,
							value : ""
						};
						for ( var j = 0; j < rule.length; j++) {
							if (rule[j].name == tempRule.name) {
								if (rule[j].value == searchTips) {
									rule[j].value = "";
								}
								flag = true;
								break;
							}
						}
						if (!flag) {
							rule.push(tempRule);
						}
					}

					for ( var i = 0; i < rule.length; i++) {
						// 如果字段同名，则覆盖
						var tmpRule = rule[i];
						for ( var j = 0; j < param.length; j++) {
							if (tmpRule.name == param[j].name) {
								param.splice(j, 1);
							}
						}
						tmpRule.value = $.trim(tmpRule.value);
						param.push(tmpRule);
					}
				}
				
				// 点击搜索时，将搜索页面初始化为1(从第一页开始搜索)
				grid.options.newPage = 1;
//				alert("new rule =" + JSON2.stringify(param));
				grid.loadData();
			} else {
				LG.showInvalid();
			}
		}
		
		// 判断是否存在级联下拉框
//		var cascadeFlag = false;
//		if(selectFlag) {
//			for(var i = 0; i < params.fields.length; i++) {
//				if(params.fields[i].isCascade) {
//					cascadeFlag = true;
//					break;
//				}
//			}
//		}
		
		// 级联下拉框数据加载
//		if(cascadeFlag) {
//			// 创建级联下拉框
//			var cbxCascadeCmp = new LFT.CbxCascadeCmp(form);
//			// 初始化下拉框，添加级联操作
//			cbxCascadeCmp.init();
//			// 根据用户所属机构限定下拉框数据范围
//			cbxCascadeCmp.loadDefaultValue();
//		}
	};

	/*
	 * 创建搜索输入框 
	 * @author hllian 
	 * @param form 组件添加的目标表单
	 * @param grid 搜索目标列表 
	 * @param input 要绑定的搜索输入框 
	 * @param conditions 搜索条件
	 */
	LG.createSearchLFT = function(form, grid, input, conditions) {
		var defaultSearchText = "请输入查询内容...";
		var searchInput = null; // 搜索输入框
		var searchBtn = null; // 搜索按钮
		var searchComboBox = null; // 搜索下拉列表

		if (conditions != null && conditions.length > 1) {
			// 创建搜索分类下拉列表
			var searchBoxHtml = '<div id="' + form.attr('id')
					+ '_searchComboBox" class="s-box-select" >';
			// 遍历条件，创建条件
			for ( var i = 0; i < conditions.length; i++) {
				searchBoxHtml += '<div class="s-box-item" id="'
						+ form.attr('id') + '_searchBtn_' + conditions[i].name
						+ '" name="' + conditions[i].name + '">';
				if(!conditions[i].isFuzzy) {
					searchBoxHtml += conditions[i].text + '为&nbsp<span style="color:#8EC8F0; font-weight:bold;"></span>&nbsp的记录</div>';
				}
				else {
					searchBoxHtml += '包含&nbsp<span style="color:#8EC8F0; font-weight:bold;"></span>&nbsp的'
						+ conditions[i].text + '</div>';
				}
			}
			searchBoxHtml += '</div>';
			$(searchBoxHtml).appendTo('body').addClass('l-box-select-absolute');
			searchComboBox = $('#' + form.attr('id') + '_searchComboBox'); // 搜索下拉列表
		}
		// 创建搜索按钮
		var searchBtnHtml = '<ul style="margin-top: 10px;"><table align="center"><tr>';
		// 如果未指定搜索输入框 input，则自动创建输入框
		if (input == null) {
			searchBtnHtml += '<td><div class="l-text" style="margin-top:8px; margin-right:10px; width:200px; height:22px;"><input class="l-text-field" id="'
					+ form.attr('id')
					+ '_searchInput" name="'
					+ conditions[0].name + '" /></div></td>';
		}
		searchBtnHtml += '<td><input type="button" value="搜索" id="'
				+ form.attr('id')
				+ 'mysearchBtn" class="l-button l-button-submit" /></td>';
		searchBtnHtml += '</tr></table></ul>';
		$(searchBtnHtml).appendTo(form);
		searchBtn = $('#' + form.attr('id') + 'mysearchBtn'); // 搜索按钮

		if (input != null) {
			searchInput = $(input);
		} else {
			searchInput = $('#' + form.attr('id') + '_searchInput');
		}

		// 内容初始化
		$(searchInput).val(defaultSearchText);
		$(searchInput).addClass("s-defaultText");
		// 初始化下拉列表宽度
		if(searchComboBox != null) {
			var minWidth = 200;
			var divArr = $(".l-text");
			for(var i = 0; i < divArr.length; i++) {
				if($(divArr[i]).find("input").attr("id") == $(searchInput).attr("id")) {
					minWidth = $(divArr[i]).width();
				}
			}
			$(searchComboBox).css("min-width", minWidth);
		}

		// 为控件添加事件

		// 修正下拉框位置
		function comboPosition() {
			var _x = $(searchInput).offset().left - 1;
			var _y = $(searchInput).offset().top;
			var _h = $(searchInput).height() + 1;
			$(searchComboBox).css("left", _x);
			$(searchComboBox).css("top", _y + _h);
			// 定位时同步输入框内容
		}
		
		// 同步输入框内容
		function syncContent () {
			var val = $(searchInput).val();
			if (val.length > 0) {
				var childObj = $(searchComboBox).children();
				for ( var i = 0; i < childObj.length; i++) {
					$($(childObj[i]).children()[0]).text(val);
				}
			}
		}


		if (searchComboBox != null) {
			// 弹出下拉列表
			$(searchInput).bind('keyup', function() {
				var val = $(this).val();
				if (val.length != 0) {
					syncContent();
					comboPosition();
					$(searchComboBox).slideDown("fast");
				} else {
					$(searchComboBox).slideUp("fast");
				}
			});

			// 下拉列表中的搜索事件
			for ( var i = 0; i < conditions.length; i++) {
				$('#' + form.attr('id') + '_searchBtn_' + conditions[i].name)
						.bind('click', function() {
							var name = "";
							if (conditions[i] != null) {
								name = conditions[i].name;
							} else {
								name = $(this).attr('name');
							}
							$(searchInput).attr('name', name);
							$(searchComboBox).slideUp("fast");
							// 调用搜索按钮的事件来完成搜索
							$(searchBtn).click();
						});
			}
		}

		$(searchInput).bind('blur', function(e) {
			if ($(this).val() == "") {
				$(searchInput).val(defaultSearchText);
				$(searchInput).addClass("s-defaultText");
			}
		});

		// 弹出下拉列表-非空值获得焦点
		$(searchInput).bind('click', function() {
			if ($(this).val() == defaultSearchText) {
				$(this).val("");
				$(this).removeClass("s-defaultText");
			}
			if (searchComboBox != null && $(this).val() != "") {
				syncContent();
				comboPosition();
				// $(searchComboBox).slideDown("fast");
				$(searchComboBox).slideToggle("fast");
			} else {
				$(searchComboBox).slideUp("fast");
			}

		});

		// 搜索按钮事件
		$(searchBtn).bind('click', function() {
			if (!form) {
				form = $("form:first");
			}
			if (form.valid()) {
				var rule = LG.searchParam(form);
				// alert("new rule ="+JSON2.stringify(rule));
				// 注，此处是直接使用的parms的地址，修改param，grid.parms也会变
				var param = grid.get('parms');
				// 设置页面从头开始
				// param.push({ name: 'page', value: 1 });
				if (rule.length) {
					/*
					 * 修改开始标记 如果 rule 中有不存在的 conditions字段，则将其以空值加入
					 * 为了防止改变搜索项目后，之前的搜索记录不会被清空的错误 Edit By hlLian 2014/03/18
					 * 23:44
					 */
					for ( var i = 0; i < conditions.length; i++) {
						var flag = false;
						var tempRule = {
							name : conditions[i].name,
							value : ""
						};
						for ( var j = 0; j < rule.length; j++) {
							if (rule[j].name == tempRule.name) {
								if (rule[j].value == defaultSearchText) {
									rule[j].value = "";
								}
								flag = true;
								break;
							}
						}
						if (!flag) {
							rule.push(tempRule);
						}
					}
					/* 修改结束标记 */

					for ( var i = 0; i < rule.length; i++) {
						// 如果字段同名，则覆盖
						var tmpRule = rule[i];
						for ( var j = 0; j < param.length; j++) {
							if (tmpRule.name == param[j].name) {
								param.splice(j, 1);
							}
						}
						tmpRule.value = $.trim(tmpRule.value);
						param.push(tmpRule);
					}
				}
				// 点击搜索时，将搜索页面初始化为1(从第一页开始搜索)
				grid.options.newPage = 1;
				// alert("new rule =" + JSON2.stringify(param));
				grid.loadData();
			} else {
				LG.showInvalid();
			}
		});
	};

	//设置表格搜索表单底部按钮  带搜索功能
	LG.appendSearchButtonLFT = function(form, grid, needReset) {
		if (needReset == false) {
			if(form.find("#"+form.attr('id')+"mysearchBtn").length==0){
			$(
					'<ul><table align="center"><tr><td colspan="2"><input type="button" value="搜索" id="'
							+ form.attr('id')
							+ 'mysearchBtn" class="l-button l-button-submit"/>')
					.appendTo(form);
			}else{
				form.find("#"+form.attr('id')+"mysearchBtn").unbind("click");
			}
		} else {
			if(form.find("#"+form.attr('id')+"mysearchBtn").length==0){
			$(
					'<ul><table align="center"><tr><td><input type="button" value="搜索" id="'
							+ form.attr('id')
							+ 'mysearchBtn" class="l-button l-button-submit" />'
							+ '<input id="'
							+ form.attr('id')
							+ 'myRetbtn" type="button" value="重置" class="l-button l-button-reset"/></td></tr></table></ul>')
					.appendTo(form);
			}
		}

		//搜索按钮
		$('#' + form.attr('id') + 'mysearchBtn').bind('click', function() {
			if (!form) {
				form = $("form:first");
			}
			if (form.valid()) {
				var rule = LG.searchParam(form);
				//alert("new rule ="+JSON2.stringify(rule));
				//注，此处是直接使用的parms的地址，修改param，grid.parms也会变
				var param = grid.get('parms');
				//设置页面从头开始
				//param.push({ name: 'page', value: 1 });
				if (rule.length) {
					for ( var i = 0; i < rule.length; i++) {
						//如果字段同名，则覆盖
						var tmpRule = rule[i];
						for ( var j = 0; j < param.length; j++) {
							if (tmpRule.name == param[j].name) {
								param.splice(j, 1);
							}
						}
						tmpRule.value = $.trim(tmpRule.value);
						param.push(tmpRule);
					}
				}
				//点击搜索时，将搜索页面初始化为1(从第一页开始搜索)

				grid.options.newPage = 1;
				// alert("new rule ="+JSON2.stringify(param)); 
				grid.trigger("reload");
				grid.loadData();
			} else {
				LG.showInvalid();
			}
		});

		$('#' + form.attr('id') + 'myRetbtn').bind('click',	function() {
			$(':input', form).not(':button, :submit, :reset, :hidden').each(
					function() {
						var readonly = $(this).attr("readonly");
						var canReSet = $(this).attr("canReSet");
						// var name = $(this).attr("name");
						if (readonly && canReSet) {
						
						} else {
							if ($(this).attr("ltype") == "select") {
								
							} else {
								$(this).val("").removeAttr('selected').removeAttr('checked');
							}
						}
					});
			});
	};

	//创建过滤规则(查询表单)
	LG.searchParam = function(form) {
		if (!form)
			return null;
		//var pa
		var group = new Array();

		$(":input", form).not(":submit, :reset, :image,:button, [disabled]")
				.each(function() {
					if (!this.name)
						return;
					if ($(this).val() == null)
						return;
					var ltype = $(this).attr("ltype");
					var optionsJSON = $(this).attr("ligerui"), options = null;
					if (optionsJSON) {
						options = JSON2.parse(optionsJSON);
					}
					var value = $(this).val();
					var name = this.name;

					//如果是下拉框，那么读取下拉框关联的隐藏控件的值(ID值,常用与外表关联)
					if (ltype == "select" && options && options.valueFieldID) {
						value = $("#" + options.valueFieldID).val();
						name = options.valueFieldID;
					}
					var obj = new Object();
					obj.name = this.name;
					obj.value = (this.className.indexOf('l-text-field-null')>=0)?"":$(this).val();
					group.push(obj);
				});
		return group;
	};

	//根据代码集ID，代码值获取展示的代码名称
	LG.setCbxTextByCodeId = function(data, codeItemId) {
		if (data != null)
			for ( var i = 0; i < data.length; i++) {
				var tmp = data[i];
				if (tmp.id == "") {
					continue;
				} else if (tmp.id == codeItemId) {
					return tmp.text;
				}
			}
		return "";
	};

	/**
	 * 清空表单数据
	 */
	LG.clearForm = function(form) {
		$(':input', form).not(':button, :submit, :reset').each(
				function() {
					var readonly = $(this).attr("readonly");
					var canReSet = $(this).attr("canReSet");
					var name = $(this).attr("name");
					if (readonly && canReSet) {

					} else {
						//alert($(this).attr("ltype"));
						if ($(this).attr("ltype") == "select") {
							var g = $.ligerui.get($(this));
							g.setValue("");
							if (g.options.tree != null
									&& g.options.tree != null) {
								g.inputText.val("");
								g.valueField.val("");
							}
						} else {
							$(this).val("").removeAttr('selected').removeAttr(
									'checked');
						}
					}
				});
	};
	/*
	 * 清除表单验证标识
	 */
	LG.clearFormValidateCSS = function(form) {
		$(":input", form).not(":submit, :reset, :image,:button, [disabled]")
				.each(function() {
					if (!this.name)
						return;
					element = $("#" + prefixID + this.name);
					if (element.hasClass("l-textarea")) {
						element.removeClass("l-textarea-invalid");
					} else if (element.hasClass("l-text-field")) {
						element.parent().removeClass("l-text-invalid");
					}
					$(element).removeAttr("title").ligerHideTip();
				});
		$(".l-verify-tip").each(function() {
			$(this).remove();
		});
	};

	/*
	 * 为表单添加自定义按钮
	 * form 对象表单
	 * text 按钮名称
	 * width 长度
	 * clickCallBack 回调处理
	 * 
	 */
	LG.appendCustomButtonLFT = function(form, text, width, clickCallBack) {
		if (width == null && width == "") {
			width = 50;
			//$('#myCustomBtn').attr("style",width+"px");
		}
		$(
				'<ul><table align="center"><tr><td><input type="button" value="'
						+ text
						+ '" style="width:'
						+ width
						+ 'px" id="'
						+ form.attr('id')
						+ 'myCustomBtn" class="l-button" /></td></tr></table></ul>')
				.appendTo(form);
		//调用回调方法
		$('#' + form.attr('id') + 'myCustomBtn').bind('click', clickCallBack);
	};
	
	/**
	 * 放大镜
	 */
	LG.addZoomForInput = function(param) {
		var I = param.input;
		var F = param.input.parent("div");
		
		// 定位
		var _h = param.height || 32;
		var _min_w = param.minWidth || F.width();
		var _c = param.color || "red";
		var _fSize = param.fontSize || 16;
		var _fWeight = param.fontWeight || 600;
		var _fFamily = param.font || "Arial";
		var format = param.format || "money";
		
		// 画个框框
		var C = $("<div></div>");
		var S = $("<span style='margin:0 8px 0 8px;'></span>");
		C.addClass("s-box-select");
		
		S.css({
			"color" : _c,
			"font-family" : _fFamily,
			"font-size" : _fSize + "px",
			"font-weight" : _fWeight,
			"line-height" : _h + "px"
		});
		// 插入HTML
		S.appendTo(C);
		C.appendTo("body");

		// 格式化金额：默认
		function formatMonty(number) {
			number = number.toString();
		     var arrStr = number.split('.'),
		         floatPart = arrStr[1] || "00",
		         step = 3,
		         len = 0;
		     number = arrStr[0];
		     len = number.length;
		      
		     if(len > step) {
		         var c1 = len%step,
		             c2 = parseInt(len/step),
		             arr = [],
		             first = number.substr(0, c1);
		         if(first != '') {
		             arr.push(first);
		         };
		         for(var i=0; i<c2; i++) {
		             arr.push(number.substr(c1 + i*step, step));                                    
		         };
		         number = arr.join(',');
		     };
		     return "¥ " + number + '.' + floatPart;
		}
		
		// 格式化手机
		function formatPhone(number) {
			number = number.toString();
			var temp = "";
			for(var i = 0; i < number.length; i++) {
				if(i == 3 || i == 8) {
					temp += "-";
				}
				temp += number.charAt(i);
			}
			return temp;
		}
		
		// 定义位置
		function resetPosition() {
			var _x = param.x || F.offset().left;
			var _y = null;
			if(param.position == "top") {
				_y = param.y || F.offset().top - _h - 4;
			}else {
				_y = param.y || F.offset().top + F.height() + 2;
			}
			
			C.css({
				"left" : _x,
				"top" : _y,
//				"width" : "auto",
				"min-width" : _min_w,
				"height" : _h
			});
		}
		
		this.setText = function(value) {
			if(value != null && value != "") {
				if(format == "money") {
					S.text(formatMonty(value));
				}else if(format == "phone") {
					S.text(formatPhone(value));
				}
				resetPosition();
				C.show();
			}else {
				C.hide();
			}
		};
		
		this.showZoom = function() {
			// 显示之前重定位
			resetPosition();
			var value = I.val();
			if(value != null && value != "") {
				C.show();
			}
		};
		
		this.hideZoom = function() {
			C.hide();
		};
		
		return this;
	};
	
	/**
	 * 判断字符串是否为合法的日期
	 * 日期分隔符"-"
	 */
	LG.isDate = function(dateStr) {
		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
		if (dateStr == "") return false;
	    if (!(reg.test(dateStr) && RegExp.$2 <= 12 && RegExp.$3 <= 31)){
	    	return false;
	    }
	    return true;
	};
	
	/**
	 * 日期转字符串
	 */
	LG.dateToStr = function(date, format){
		if(typeof(date) == "string") return date;
		format = format || "-";
		var month = ("0" + (date.getMonth() + 1)).substring(("0" + (date.getMonth() + 1)).length - 2);
		var day = ("0" + (date.getDate())).substring(("0" + date.getDate()).length - 2);
		return date.getFullYear() + format + month + format + day;
	};
	
	/**
	 * 字符串转日期，日期分隔符"-"
	 */
	LG.strToDate = function(dateStr) {
		return new Date(Date.parse(dateStr.replace(/-/g, "/")));
	};
	
	/**
	 * 日期比较，如果是字符串，先转为化日期对象
	 */
	LG.dateCompare = function(startDate, endDate, format) {
		format = format || "-";
		if(typeof(startDate) == "string") {
			startDate = LG.strToDate(startDate, format);
		}
		if(typeof(endDate) == "string") {
			endDate = LG.strToDate(endDate, format);
		}
		if(startDate == endDate) return 0;
		if(startDate > endDate) return 1;
		if(startDate < endDate) return -1;
	};
	
	/**
	 * 从地址栏获取参数
	 */
	LG.getArgsFromHref = function(url, argName) {
		// 分隔地址args[0]与参数args[1]
		var args = url.split("?");
	    var retval = new Object;
	    
	    // 无参数
	    if(args[0] == url) {
	    	return retval; 
	    }
	    var str = args[1];
	    args = str.split("&");
	    for(var i = 0; i < args.length; i ++) {
	    	str = args[i];
	      	var arg = str.split("=");
	      	if(arg.length <= 1) continue;
	      	if(argName) {
	      		// 存在Key,返回对应的值
	      		if(arg[0] == argName) retval = arg[1];
	      		break;
	      	}else {
	      		// 不存在Key, 返回整个参数对象
	      		retval[arg[0]] = arg[1];
	      	}
	    }
	    return retval; 
	};
	
	/**
	 * 将对象转换为url字符参数
	 */
	LG.generateUrlParam = function(object) {
		var urlParam = "";
		if(object) {
			// 遍历属性值
			for(var p in object) {
				// 不传递方法参数
				if(typeof(object[p]) == "function") continue;
				// 不传递空值参数
				if(object[p] == null || object[p] == "") continue;
				urlParam += p + "=" + object[p] + "&";
			}
		}
		// 去掉末位的&
		urlParam = urlParam.substring(0, urlParam.length - 1);
		return urlParam;
	};
	
	/**
	 * 判断对象是否为null或""
	 */
	LG.isEmpty = function(str) {
		if(str == null || str == "") {
			return true;
		}else {
			return false;
		}
		
	};
	
	/**
	 * 字符串格式化
	 * @param num 要格式化的数据（字符串或者数字）
	 * @param f 要保留的小数位数
	 * @param withFix 当小数点后为零时，是否只保留整数
	 * @returns
	 */
	LG.formatNum = function(num, f, withFix) {
		if(num == null) {
			return 0;
		}
		
		if(withFix == null) {
			withFix = true;
		}
		if(typeof(num) == "string") {
			num = parseFloat(num);
		}
		var numA = num.toFixed(f);
		var numB = num.toFixed(0);
		if(!withFix && (numA - numB == 0)) {
			return numB;
		}
		return numA;
	}
})(jQuery);
