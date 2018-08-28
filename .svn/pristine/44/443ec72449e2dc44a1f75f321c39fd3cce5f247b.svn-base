(function($) {

	// 全局系统对象
	window['LFT'] = {};
	LFT.appName="";
	LFT.cookies = (function() {
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
							offset, end))
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
		}
		fn.prototype.remvoe = function(cookieName) {
			var expire = "";
			expire = new Date((new Date()).getTime() - 1);
			expire = "; expires=" + expire.toGMTString();
			document.cookie = cookieName + "=" + escape("") + ";path=/"
					+ expire;
			/* path=/ */
		};

		return new fn();
	})();
	var userAgent = navigator.userAgent.toLowerCase();

	// 修改jquery1.3 IE版本判断的bug
	$.myBrowser = {
		version : (userAgent.match(/(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [ 0, '0' ])[1],
		// version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) ||
		// [0,'0'])[1],
		safari : /webkit/.test(userAgent),
		opera : /opera/.test(userAgent),
		msie : /msie/.test(userAgent) && !/opera/.test(userAgent),
		mozilla : /mozilla/.test(userAgent)
				&& !/(compatible|webkit)/.test(userAgent)
	};

	// 返回JSON数据为表单赋值。data-json格式数据，prifexId-生成表单ID的前缀
	LFT.loadForm = function(data, prifexId, form) {
		for ( var p in data) {
			var ele = $("#" + prifexId + p);
			if (ele.is(":checkbox,:radio", form)) {
				ele.ligerGetCheckBoxManager().setValue(data[p]=="true" ? true : false);
				ele[0].checked = data[p]=="true" ? true : false;
			} else {
				ele.val(data[p]);
			}
			var select = $.ligerui.get($("#" + prifexId + p + "Name", form));
			if (select) {
				try {
					select.selectValue($.trim(data[p]));
				} catch (e) {
				}
				ele.val(data[p]);
			}
		}
	}

	// 重置表单
	LFT.resetForm = function(form) {
		$(':input', form).not(':button, :submit, :reset, :hidden').not(
				$("[readonly]")).val('').removeAttr('checked').removeAttr(
				'selected');
	}

	/*
	 * 流程式 Tab组件
	 */
	LFT.FlowPanel = function(param) {
		// 参数赋值
		var STEP_WIDTH = 126;
		if (param.needClickReload == null) {
			param.needClickReload == false;
		}
		this.config = param || {};
		// 初始化方法
		this.init = function(param) {
			this.flowSteps = param.flowSteps || {};
			for ( var i = 0; i < this.flowSteps.length; i++) {
				var flowStep = this.flowSteps[i];
				// 控件长度，固定值，如要修改，需同步修改css中图片的长度
				// 计算第一个控件与左边框的距离
				var leftLength = (param.width - this.flowSteps.length
						* STEP_WIDTH)
						/ (this.flowSteps.length + 1);
				var jlink = $("<div class='flow_container'></div>");
				jlink.attr("id", flowStep.id);
				jlink.attr("text", flowStep.text);
				jlink.attr("address", flowStep.url);
				jlink.attr("num", i);
				// 设置第I个控件与左边框的距离
				jlink.css({
					left : leftLength + i * (STEP_WIDTH + leftLength)
				});
				jlink.append("<div class='"
						+ (flowStep.checked == true ? "checked_img"
								: "unchecked_img") + "  flow_img' />");
				if (flowStep.top == "" || flowStep.top == null) {
					flowStep.top = '20px';
				}
				jlink.append("<span class='flow_text' style='top:"
						+ flowStep.top + "'>" + flowStep.text + "</span>");

				if (param.canClick != false) {
					addClickStep(jlink);
				}
				// 如果当前标签为选中状态，则添加tab
				if (flowStep.checked) {
					// 设置当前选中步骤
					param.checkedStep = flowStep;
					param.tab.addTabItem({
						tabid : flowStep.id + "_tab",
						text : flowStep.text,
						url : flowStep.url
					});
				}
				if (param.appendTo instanceof Object) {
					jlink.appendTo(param.appendTo);
				} else {
					jlink.appendTo($("#" + param.appendTo));
				}
			}
			function onResize() {
				var i = 0;
				$(".flow_container")
						.each(
								function() {
									var leftLength = (document.body.clientWidth - param.flowSteps.length
											* STEP_WIDTH)
											/ (param.flowSteps.length + 1);
									$(this)
											.css(
													{
														left : leftLength
																+ i
																* (STEP_WIDTH + leftLength)
													});
									i++;
								});
			}
			// 窗体变化时，修改控件位置
			$(window).resize(function() {
				onResize();
			});
			// 为第一个step添加事件
			if (param.canClick == true) {
				addClickStep($("#" + this.flowSteps[0].id));
			}
		};
		this.toStep = function(stepNum, reloadFlag) {
			if (this.flowSteps[stepNum]) {
				var flowStep = this.flowSteps[stepNum];
				if (param.tab.isTabItemExist(flowStep.id + "_tab")
						&& reloadFlag == true) {
					param.tab.reload(flowStep.id + "_tab");
				}
				param.tab.addTabItem({
					tabid : flowStep.id + "_tab",
					text : flowStep.text,
					url : flowStep.url
				});
				// 修改标签的显示状态:将选中状态的标签改为未选中
				$(".flow_img").each(function() {
					$(this).removeClass('checked_img');
					$(this).addClass('unchecked_img');
				});
				$(".flow_img", $('#' + flowStep.id)).each(function() {
					$(this).removeClass('unchecked_img');
					$(this).addClass('checked_img');
				});
				if (param.canClick == true) {
					addClickStep($("#" + flowStep.id));
				}
				// 设置当前选中步骤
				param.checkedStep = flowStep;
			}
		};
		// 添加step Click事件
		function addClickStep(link) {
			// 设置事件
			link.hover(function() {
				$(this).css({
					cursor : "pointer"
				});
			}, function() {
				// alert('hover out');
			}).click(function() {
				// 添加对应的tab
				if (param.needClickReload) {
					if (param.tab.isTabItemExist($(this).attr("id") + "_tab")) {
						param.tab.reload($(this).attr("id") + "_tab");
					}
				}
				param.tab.addTabItem({
					tabid : $(this).attr("id") + "_tab",
					text : $(this).attr("text"),
					url : $(this).attr("address")
				});
				// 修改标签的显示状态:将选中状态的标签改为未选中
				$(".flow_img").each(function() {
					$(this).removeClass('checked_img');
					$(this).addClass('unchecked_img');
				});
				// 将当前标签改为选中
				$(".flow_img", link).each(function() {
					$(this).removeClass('unchecked_img');
					$(this).addClass('checked_img');
				});
				if (param.flowSteps[$(this).attr("num")].click != null) {
					param.flowSteps[$(this).attr("num")].click(this);
				}
			});
		}
		;
		this.init(param);
	};

	/*
	 * ajax请求公共异常处理
	 */
	LFT.showErrorMessage = function(response) {
		var headers = response.getAllResponseHeaders();
		var status = headers.substring(
				(headers.indexOf("C-Result-Status:") + 16), headers
						.indexOf("C-Result-Status:") + 16 + 4);
		// 根据此状态判断是否为异常类型及异常类型,600为成功，602为业务异常,603为系统异常
		if ($.trim(status) == '603') {
			$.ligerDialog.error(response.responseText);
		} else if ($.trim(status) == '602') {
			$.ligerDialog.error(response.responseText);
		}else{
			$.ligerDialog.error(response.responseText);
		}
	};

	/*
	 * 桌面ajax请求异常处理
	 */
	LFT.showErrorMessageAndReLogin = function(response) {
		var headers = response.getAllResponseHeaders();
		var status = headers.substring(
				(headers.indexOf("C-Result-Status:") + 16), headers
						.indexOf("C-Result-Status:") + 16 + 4);
		// 根据此状态判断是否为异常类型及异常类型,600为成功，602为业务异常,603为系统异常
		if ($.trim(status) == '603') {
			alert(response.responseText);
			window.location.href = '/login.html';
		} else if ($.trim(status) == '602') {
			alert(response.responseText);
			window.location.href = '/login.html';
		}
	};

	/*
	 * 级联下拉框组件 form为级联下拉框所属的ligerForm表单对象
	 */
	LFT.CbxCascadeCmp = function(form) {
		var param = form.options;
		param.orgType = param.orgType || 0;
		// 参数赋值
		var STEP_WIDTH = 126;
		this.config = param || {};

		// 1、初始化下拉框集合:根据配置动态生成下拉框集合。
		this.init = function() {
			param.cbxFields = new Array();
			for ( var i = 0; i < param.fields.length; i++) {
				if (param.fields[i].isCascade) {
					param.cbxFields.push(param.fields[i]);
				}
			}
			for ( var i = 0; i < param.cbxFields.length; i++) {
				var cbxConfig = param.cbxFields[i];
				// 2、事件生成：遍历下拉框集合，为每一下拉框生成级联事件。
				// alert('param.prefixID + name = '+param.prefixID +
				// cbxConfig.comboboxName);
				var cbx = $.ligerui
						.get(param.prefixID + cbxConfig.comboboxName);
				cbx.bind('selected', function(value, text) {
					// 如果选中项不为空,根据选中项的值重新加载下一级下拉框数据
					// 查找当前选择下拉框的直接子下拉框和子孙下拉框
					var nextCbx = "";
					var childrenCbx = new Array();
					for ( var j = 0; j < param.cbxFields.length; j++) {
						var tmpConfig = param.cbxFields[j];
						// 如果子下拉框已经找到，则装载其它后代下拉框
						if (nextCbx != "") {
							var tmpCbx = $.ligerui.get(param.prefixID
									+ tmpConfig.comboboxName);
							childrenCbx.push(tmpCbx);
							continue;
						}
						// 根据名称确认当前点击的下拉框
						if (tmpConfig.name == this.options.valueFieldID) {
							// 如果当前下拉框还有下一级下拉框，则设为子下拉框
							if (j + 1 < param.cbxFields.length) {
								var nextCbxConfig = param.cbxFields[j + 1];
								nextCbx = $.ligerui.get(param.prefixID
										+ nextCbxConfig.comboboxName);
							}
							continue;
						}
					}
					// 清空所有子孙下拉框数据
					if (nextCbx != "")
						nextCbx.clearContent();
					for ( var j = 0; j < childrenCbx.length; j++) {
						childrenCbx[j].clearContent();
					}
					if (value != "") {
						if (childrenCbx.length > 0) {
							// ajax请求下一级下拉框后台数据
							var jqxhr = $.ajax({
								url : "/dssweb/commAjaxJson.do",
								data : ({
									sys_comId : 'desktopCommand',// command-
									// bean
									// id
									sys_funcId : 'getNextOrg',// command
									// 方法名
									orgCode : value,
									orgType : param.orgType
								}),
								dataType : 'json',
								type : "post",
								success : function(msg) {
									var obj = msg.ret_data;
									// 将后台数据赋值给下一级下拉框组件
									nextCbx.setData(obj);
									nextCbx
											.trigger('success',
													[ nextCbx.data ]);
								},
								error : function(response) {
									LFT.showErrorMessage(response);
								}
							});
						}
					}
				});
			}
		};
		// 3、初始数据装载：遍历下拉框集合，根据当前机构等级动态为各下拉框赋初值，并初始化下一级下拉框。
		this.loadDefaultValue = function() {
			var jqxhr = $
					.ajax({
						url : "/dssweb/commAjaxJson.do",
						data : ({
							sys_comId : 'desktopCommand',// command bean id
							sys_funcId : 'getInitOrgCascadeCbx'// command 方法名
							,
							orgType : param.orgType
						}),
						dataType : 'json',
						type : "post",
						success : function(msg) {
							var cbxDataList = msg.ret_data;
							// alert("cbxDataList =
							// "+JSON2.stringify(msg.ret_data));
							var usercbx = "";
							/*
							 * 获取当前用户能拥有的下拉框级别，及各级下拉框数据(获取当前用户所属机构，所属机构等级，所属机构的各层级机构id,text)
							 * 根据用户拥有的下拉框级别查找对应的下拉框
							 * 如果未找到,说明用户所属机构等级低于下拉框机构等级，则获取各级下拉框，并使用用户所属机构的上级机构为对应的同级下拉框赋唯一初值，
							 * 如果找到,则获取本级及上级所有下拉框，并使用用户所属机构的上级机构为对应的同级下拉框赋唯一初值
							 */

							var userOrg = null;
							var initOrg = null;
							/*
							 * 获取用户所属机构
							 */
							var i;
							for (i = 0; i < cbxDataList.length; i++) {
								var tempOrg = cbxDataList[i];
								if (tempOrg.userOrg) {
									userOrg = tempOrg;
									break;
								}

							}
							/*
							 * 当用户所属机构级别大于最高机构时,获取初始下拉框
							 */
							if (userOrg != null
									&& userOrg.orgLevel < param.cbxFields[0].level) {
								var nextCbx = $.ligerui.get(param.prefixID
										+ param.cbxFields[0].comboboxName);
								// 根据当前用户机构号，要获取的子孙机构级别，查询当前用户所属机构的某层级的子机构
								var jqxhr = $.ajax({
									url :"/dssweb/commAjaxJson.do",
									data : ({
										sys_comId : 'desktopCommand',
										sys_funcId : 'getChildOrgList',
										orgCode : userOrg.orgCode,
										orgType : param.orgType,
										orgLvl : param.cbxFields[0].level
									}),
									dataType : 'json',
									type : "post",
									success : function(msg) {
										var obj = msg.ret_data;
										// 将后台数据赋值给下一级下拉框组件
										nextCbx.setData(obj);
										nextCbx.trigger('success',
												[ nextCbx.data ]);
									},
									error : function(response) {
										LFT.showErrorMessage(response);
									}
								});
							} else {
								for ( var i = 0; i < param.cbxFields.length; i++) {
									for ( var j = 0; j < cbxDataList.length; j++) {
										var tempOrg = cbxDataList[j];
										if (tempOrg.orgLevel == param.cbxFields[i].level) {
											// 如果是当前用户的下拉框
											if (tempOrg.userOrg) {
												usercbx = $.ligerui
														.get(param.prefixID
																+ param.cbxFields[i].comboboxName);
												// 设置当前下拉框的初始值
												usercbx.inputText
														.val(tempOrg.orgName);
												usercbx.valueField
														.val(tempOrg.orgCode);
												// 判断是否有下一级下拉框，如果有，根据当前下拉框的初始值获取下级下拉框的data
												if (userOrg.orgLevel < param.cbxFields[param.cbxFields.length - 1].level) {
													var nextCbx = $.ligerui
															.get(param.prefixID
																	+ param.cbxFields[i + 1].comboboxName);
													// ajax请求下一级下拉框后台数据
													var jqxhr = $
															.ajax({
																url :"/dssweb/commAjaxJson.do",
																data : ({
																	sys_comId : 'desktopCommand',
																	sys_funcId : 'getNextOrg',
																	orgCode : tempOrg.orgCode,
																	orgType : param.orgType
																}),
																dataType : 'json',
																type : "post",
																success : function(
																		msg) {
																	var obj = msg.ret_data;
																	// 将后台数据赋值给下一级下拉框组件
																	nextCbx
																			.setData(obj);
																	nextCbx
																			.trigger(
																					'success',
																					[ nextCbx.data ]);
																},
																error : function(
																		response) {
																	LFT
																			.showErrorMessage(response);
																}
															});
												}
												break;
											} else {
												var tmpCbx = $.ligerui
														.get(param.prefixID
																+ param.cbxFields[i].comboboxName);
												// 设置下拉框的初始值
												tmpCbx.inputText
														.val(tempOrg.orgName);
												tmpCbx.valueField
														.val(tempOrg.orgCode);
											}
										}

									}
								}
							}
						},
						error : function(response) {
							LFT.showErrorMessage(response);
						}
					});
		};
	};
	/*
	 * 级联下拉框组件 form为级联下拉框所属的ligerForm表单对象-房屋信息
	 */
	LFT.CbxCascadeCmpForHouse = function(form) {
		var param = form.options;
		param.orgType = param.orgType || 0;
		// 参数赋值
		var STEP_WIDTH = 126;
		this.config = param || {};

		// 1、初始化下拉框集合:根据配置动态生成下拉框集合。
		this.init = function() {
			param.cbxFields = new Array();
			for ( var i = 0; i < param.fields.length; i++) {
				if (param.fields[i].isCascade) {
					param.cbxFields.push(param.fields[i]);
				}
			}
			for ( var i = 0; i < param.cbxFields.length; i++) {
				var cbxConfig = param.cbxFields[i];
				// 2、事件生成：遍历下拉框集合，为每一下拉框生成级联事件。
				// alert('param.prefixID + name = '+param.prefixID +
				// cbxConfig.comboboxName);
				var cbx = $.ligerui
						.get(param.prefixID + cbxConfig.comboboxName);
				cbx.bind('selected', function(value, text) {
					// 如果选中项不为空,根据选中项的值重新加载下一级下拉框数据
					// 查找当前选择下拉框的直接子下拉框和子孙下拉框
					var nextCbx = "";
					var childrenCbx = new Array();
					for ( var j = 0; j < param.cbxFields.length; j++) {
						var tmpConfig = param.cbxFields[j];
						// 如果子下拉框已经找到，则装载其它后代下拉框
						if (nextCbx != "") {
							var tmpCbx = $.ligerui.get(param.prefixID
									+ tmpConfig.comboboxName);
							childrenCbx.push(tmpCbx);
							continue;
						}
						// 根据名称确认当前点击的下拉框
						if (tmpConfig.name == this.options.valueFieldID) {
							// 如果当前下拉框还有下一级下拉框，则设为子下拉框
							if (j + 1 < param.cbxFields.length) {
								var nextCbxConfig = param.cbxFields[j + 1];
								nextCbx = $.ligerui.get(param.prefixID
										+ nextCbxConfig.comboboxName);
							}
							continue;
						}
					}
					// 清空所有子孙下拉框数据
					if (nextCbx != "")
						nextCbx.clearContent();
					for ( var j = 0; j < childrenCbx.length; j++) {
						childrenCbx[j].clearContent();
					}
					if (value != "") {
						if (childrenCbx.length > 0) {
							// ajax请求下一级下拉框后台数据
							var jqxhr = $.ajax({
								url :"/dssweb/commAjaxJson.do",
								data : ({
									sys_comId : 'wyCoordinatorsCaptureCommand',// command-
									// bean
									// id
									sys_funcId : 'getNextHouse',// command
									// 方法名
									superId : value
								}),
								dataType : 'json',
								type : "post",
								success : function(msg) {
									var obj = msg.ret_data;
									// 将后台数据赋值给下一级下拉框组件
									nextCbx.setData(obj);
									nextCbx
											.trigger('success',
													[ nextCbx.data ]);
								},
								error : function(response) {
									LFT.showErrorMessage(response);
								}
							});
						}
					}
				});
			}
		};
		// 3、初始数据装载：遍历下拉框集合，根据当前机构等级动态为各下拉框赋初值，并初始化下一级下拉框。
		this.loadDefaultValue = function() {
			var nextCbx = $.ligerui.get(param.prefixID
					+ param.cbxFields[0].comboboxName);
			var jqxhr = $.ajax({
				url :"/dssweb/commAjaxJson.do",
				data : ({
					sys_comId : 'wyCoordinatorsCaptureCommand',
					sys_funcId : 'getNextHouse',
					superId : 0
				}),
				dataType : 'json',
				type : "post",
				success : function(msg) {

					var obj = msg.ret_data;
					// 将后台数据赋值给下一级下拉框组件
					nextCbx.setData(obj);
					nextCbx.trigger('success', [ nextCbx.data ]);

				}
			});
		};
	};

	// 设置表单验证
	if(jQuery.metadata!=null)
	jQuery.metadata.setType("attr", "validate");

	// 获取url参数
	LFT.UrlParm = function() { // url参数
		var data, index;
		(function init() {
			data = [];
			index = {};
			var u = window.location.search.substr(1);
			if (u != '') {
				var parms = decodeURIComponent(u).split('&');
				for ( var i = 0, len = parms.length; i < len; i++) {
					if (parms[i] != '') {
						var p = parms[i].split("=");
						if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p |
							// p=
							data.push([ '' ]);
							index[p[0]] = data.length - 1;
						} else if (typeof (p[0]) == 'undefined' || p[0] == '') { // =c |
							// =
							data[0] = [ p[1] ];
						} else if (typeof (index[p[0]]) == 'undefined') { // c=aaa
							data.push([ p[1] ]);
							index[p[0]] = data.length - 1;
						} else {// c=aaa
							data[index[p[0]]].push(p[1]);
						}
					}
				}
			}
		})();
		return {
			// 获得参数,类似request.getParameter()
			parm : function(o) { // o: 参数名或者参数次序
				try {
					return (typeof (o) == 'number' ? data[o][0]
							: data[index[o]][0]);
				} catch (e) {
				}
			},
			// 获得参数组, 类似request.getParameterValues()
			parmValues : function(o) { // o: 参数名或者参数次序
				try {
					return (typeof (o) == 'number' ? data[o] : data[index[o]]);
				} catch (e) {
				}
			},
			// 是否含有parmName参数
			hasParm : function(parmName) {
				return typeof (parmName) == 'string' ? typeof (index[parmName]) != 'undefined'
						: false;
			},
			// 获得参数Map ,类似request.getParameterMap()
			parmMap : function() {
				var map = {};
				try {
					for ( var p in index) {
						map[p] = data[index[p]];
					}
				} catch (e) {
				}
				return map;
			}
		};
	}();

	// 设置表单是否可编辑
	LFT.disableForm = function(form, bool) {
		if (form instanceof Object) {
			$("input:not('hidden')", form).parent().each(function() {
				$(this).attr("disabled", "disabled");
			})
			$("input:not('hidden')", form).each(function() {
				$(this).attr("readonly", "readonly");
			})
		} else {
			alert(form + "不是一个对象");
		}
	}
	LFT.readonlyForm = function(form, bool) {
		if (form instanceof Object) {
			$("input:not('hidden')", form).each(function() {
				$(this).attr("readonly", "readonly");
			});
		} else {
			alert(form + "不是一个对象");
		}
	};
	/*
	 * 延迟加载TAB
	 */
	LFT.MyLazyTab = function(param) {
		this.config = param || {};
		var g = "";
		/*
		 * 初始化标签
		 */
		this.initTab = function() {
			/*
			 * 创建第一个标签，并加载内容
			 */
			g = $("#" + param.tabDiv).ligerTab();
			g
					.addTabItem({
						tabid : param.items[0].tabid,
						text : param.items[0].text,
						height : param.height,
						showClose : (param.items[0].showClose == null || param.items[0].showClose) ? true
								: false,
						url : param.items[0].url
					});

			/*
			 * 创建其它标签，延迟加载
			 */
			for ( var i = 1; i < param.items.length; i++) {
				var tabbid = param.items[i].tabid;
				var tabtext = param.items[i].text;
				var tabitem = $("<li><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div><div class='l-tab-links-item-close'></div></li>");
				tabitem.attr("tabid", tabbid);
				tabitem.attr("tabtext", tabtext);
				tabitem.attr("taburl", param.items[i].url);
				tabitem.attr("canClick", param.items[i].canClick);
				$("a", tabitem).text(tabtext);
				g.tab.links.ul.append(tabitem);
				if (param.items[i].showClose == undefined)
					param.items[i].showClose = true;
				if (param.items[i].showClose == false)
					$(".l-tab-links-item-close", tabitem).remove();
				/*
				 * 标签头被点击后，重新加载标签，实现标签的延迟加载
				 */
				tabitem
						.click(function() {
							if ($(this).attr("canClick") == false
									|| $(this).attr("canClick") == "false") {
								return;
							}
							if ($(this).attr("hasLoad")) {
								g.selectTabItem($(this).attr("tabid"));
								/*
								 * 点击标签后自动刷新标签页,暂不用
								 */
								g.reload($(this).attr("tabid"));
								return;
							}
							var tabbid = $(this).attr("tabid");
							/*
							 * 如果tab已经加载过，则选中当前tab即可，如果未加载过，则加载tab content
							 */
							var contentitem = $("<div class='l-tab-content-item'><div class='l-tab-loading' style='display:block;'></div><iframe frameborder='0'></iframe></div>");
							var iframeloading = $("div:first", contentitem);
							var iframe = $("iframe:first", contentitem);
							if (g.makeFullHeight) {
								var newheight = g.tab.height()
										- g.tab.links.height();
								contentitem.height(newheight);
							}
							contentitem.attr("tabid", tabbid);
							iframe.attr("name", tabbid).attr("id", tabbid)
									.attr("src", $(this).attr("taburl")).bind(
											'load.tab', function() {
												iframeloading.hide();
												/*
												 * 可在此添加事件处理
												 */
											});
							if (param.height)
								contentitem.height(param.height);
							g.tab.content.append(contentitem);
							g.selectTabItem(tabbid);
							if (g.setTabButton()) {
								g.moveToLastTabItem();
							}
							if (g.options.dragToMove && $.fn.ligerDrag) {
								g.drags = g.drags || [];
								this.each(function() {
									g.drags.push(g._applyDrag(this));
								});
							}
							g.trigger('afterAddTabItem', [ tabbid ]);
							$(this).attr("hasLoad", true);
						});
			}
		};
		this.toStep = function(tabbid) {
			var tableItem = $("li[tabid=" + tabbid + "]", g.tab.links.ul);
			if (g.isTabItemExist(tabbid) && tableItem.attr("hasLoad") == true) {
				g.selectTabItem(tableItem.attr(tabbid));
				/*
				 * toStep 更新页面
				 */
				// g.reload(tableItem.attr(tabbid));
				return;
			}
			/*
			 * 如果tab已经加载过，则选中当前tab即可，如果未加载过，则加载tab content
			 */
			var contentitem = $("<div class='l-tab-content-item'><div class='l-tab-loading' style='display:block;'></div><iframe frameborder='0'></iframe></div>");
			var iframeloading = $("div:first", contentitem);
			var iframe = $("iframe:first", contentitem);
			if (g.makeFullHeight) {
				var newheight = g.tab.height() - g.tab.links.height();
				contentitem.height(newheight);
			}
			contentitem.attr("tabid", tabbid);
			// alert('iframe =' + JSON2.stringify(iframe));
			iframe.attr("name", tabbid).attr("id", tabbid).attr("src",
					tableItem.attr("taburl")).bind('load.tab', function() {
				iframeloading.hide();
			});
			if (param.height)
				contentitem.height(param.height);
			g.tab.content.append(contentitem);
			g.selectTabItem(tabbid);
			if (g.setTabButton()) {
				g.moveToLastTabItem();
			}
			if (g.options.dragToMove && $.fn.ligerDrag) {
				g.drags = g.drags || [];
				this.each(function() {
					g.drags.push(g._applyDrag(this));
				});
			}
			g.trigger('afterAddTabItem', [ tabbid ]);
			tableItem.attr("hasLoad", true);
		};
		this.initTab();
		this.tab = g;
	};

	/*
	 * 添加拍照，上传像片按钮
	 */
	LFT.addPhotoButton = function(form, prefixID) {
		/*
		 * 调用Flex拍照上传功能
		 */
		step1_upload_phone = function(type) {
			var certNo = "";
			if ($("#" + prefixID + "certNo:input") != null) {
				certNo = $("#" + prefixID + "certNo:input").val() == null ? ""
						: $("#" + prefixID + "certNo:input").val();
			}
			if (certNo == "") {
				alert('请先输入身份证号!');
				return;
			}
			step1_photo_dialog = $.ligerDialog.open({
				url : '/flex/camera1.html?type=' + type + '&certNo='
						+ certNo,
				width : 710,
				height : 415,
				isHidden : false,
				title : '拍照上传',
				top : 0,
				name : 'step1_photo_camera1_iframe'
			});
			step1_photo_dialog
					.bind(
							"myBeforeClose",
							function(dia) {
								if (navigator.appName.indexOf("Microsoft") != -1) {
									photoUrl = step1_photo_camera1_iframe.window["camera1"
											+ "Ob"].loadFlexFunction();
								} else {
									photoUrl = step1_photo_camera1_iframe.window.document["camera1"
											+ "Em"].loadFlexFunction();
								}
								if (photoUrl != "empty") {
									var object = JSON2.parse(photoUrl);
									if (object.master != null
											&& object.master != "") {
										$("#masterImg").attr("src",
												"/" + object.master);
										$("#" + prefixID + "cardPhotos:input")
												.val("/" + object.master);
									} else if (object.place != null
											&& object.place != "") {
										$("#placeImg").attr("src",
												"/" + object.place);
										$("#" + prefixID + "spotPhotos:input")
												.val("/" + object.place);
									}
								}
							});
		};
		/*
		 * 上传照片
		 */
		ajaxFileUpload = function() {
			if ($("#upFile").val() == "") {
				alert("请选择上传的照片!");
				return;
			}

			var certNo = "";
			if ($("#" + prefixID + "certNo:input") != null) {
				certNo = $("#" + prefixID + "certNo:input").val() == null ? ""
						: $("#" + prefixID + "certNo:input").val();
			}
			if (certNo == "") {
				alert('请先输入身份证号!');
				return;
			}
			var updateTo = $("#selectPhoto").val();
			$.ajaxFileUpload({
				url : '/photoUploadAction.do?type=' + updateTo
						+ '&certNo=' + certNo, // 需要链接到服务器地址
				secureuri : false,
				fileElementId : 'upFile', // 文件选择框的id属性
				dataType : 'json', // 服务器返回的格式，可以是json
				success : function(data, status) // 相当于java中try语句块的用法
				{
					// 先设空值，以便清除缓存
					if (data.code == "0000") {
						$("#" + updateTo + "Img").attr('src', "");
						$.ligerDialog.success("上传成功，显示照片？", function() {
							// 先设空值，以便清除缓存
							$("#" + updateTo + "Img").attr('src',
									"/" + data.file[0].url);
							if (updateTo == "master") {
								$("#" + prefixID + "cardPhotos:input").val(
										"/" + data.file[0].url);
							} else {
								$("#" + prefixID + "spotPhotos:input").val(
										"/" + data.file[0].url);

							}
						});
					}
					// $('#result').html('添加成功');
				},
				error : function(data, status, e) // 相当于java中catch语句块的用法
				{
					$.ligerDialog.error('上传失败!');
				}
			});
		};

		$(
				'<ul>'
						+ '<li style="width:110px;text-align:center;">上传像片：</li>'
						// + '<li
						// style="width:110px;text-align:center;">上传像片至：</li>'
						// + '<li style="width:190px;text-align:center;">'
						+ '<li style="width:190px;text-align:center;display:none;">'
						+ '<select name="selectPhoto" id="selectPhoto">'
						// + '<option value="master" selected>身份证拍照</option>'
						+ '<option value="place">现场拍照</option>'
						+ '</select>'
						+ '</li>'
						// + '<li style="width:187px;text-align:center;">'
						// + '<input type="file" id="upFile" name="upFile"
						// class="l-button" style="margin-top:1px
						// ;width:187px"/>'
						// + '</li>'
						+ '<li style="width:300px;text-align:center;">'
						+ '<input type="file" id="upFile" name="upFile" class="l-button" style="margin-top:1px ;width:300px"/>'
						+ '</li>'
						+ '<li style="width:100px;text-align:center;">'
						+ '<input type="button" value="上传" onclick="ajaxFileUpload()" class="l-button" style="margin-top:1px" />'
						+ '</li>' + '</ul>').appendTo(form);

		$("#selectPhoto").ligerComboBox({
			width : 160
		});

		$(
				'<ul>'
						+ '<li style="width:110px;text-align:center;">'
						// + '<input type="button" value="身份证拍照"
						// onclick="step1_upload_phone(\'master\')"
						// class="l-button l-button-submit" />'
						+ '</li>'
						+ '<li style="width:100px;text-align:center;">'
						// + '<input type="button" value="现场拍照"
						// onclick="step1_upload_phone(\'place\')"
						// class="l-button l-button-submit" />'
						+ '<input type="button" value="拍照" onclick="step1_upload_phone(\'place\')" class="l-button l-button-submit" />'
						+ '</li>' + '</ul>').appendTo(form);
	};
	/*
	 * 获取Layout Center的高度
	 */
	LFT.getLayoutCenterHeight = function(layoutId) {
		return $(".l-layout-center:eq(0)", $("#" + layoutId)).height();
	};
	
	/**
	 * 密码修改中添加拍照，上传头像按钮
	 */
	LFT.addHeadloadButton = function(form, prefixID) {
		/*
		 * 上传照片
		 */
		fileUploade = function() {
			if ($("#upFile").val() == "") {
				alert("请选择上传的照片!");
				return;
			}
			var certNo = "";
			if ($("#" + prefixID + "certNo:input").val() != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			}

			$.ajaxFileUpload({
				url : '/oprPhotoUploadAction.do?type=change&certNo='
						+ certNo, // 需要链接到服务器地址
				secureuri : false,
				fileElementId : 'upFile', // 文件选择框的id属性
				dataType : 'json', // 服务器返回的格式，可以是json
				success : function(data, status) // 相当于java中try语句块的用法
				{
					
					if (data.code == "0000") {
						
						$("#uploadImg").attr('src',"/" + "");
						$.ligerDialog.success('上传成功', null, function() {
							$("#uploadImg").attr('src',
									"/" + data.file[0].url);
							$("#" + prefixID + "moveProof:input").val(
									"/" + data.file[0].url);
						});

					}
				},

				error : function(data, status, e) // 相当于java中catch语句块的用法
				{
					// $('#result').html('添加失败');
					$.ligerDialog.error('上传失败!');
				}
			});
		};
		$(
				'<ul><li style="width:190px;text-align:center;">'
						+ '<input type="file" id="upFile" name="upFile" class="l-button" style="width:150px ; height:21px; line-height:21px; "/>'
						+ '</li>'
						+ '<li style="width:180px;text-align:center;">'
						+ '<input type="button" value="上传" onclick="fileUploade()" class="l-button"/>'
						+ '</li>' + '</ul>').appendTo(form);
	};
	
	
	/**
	 * 公告中添加上传相片按钮
	 */
	LFT.addmsgloadButton = function(form, prefixID) {
		
		var imgs=document.getElementById('imgs');
//		var urlList=["/photoOnlineServlet?url=photo/140000000000/140600000000/140603000000/123456/20140705-131913-sdfeffgdfrfre.jpg",
//		            "/photoOnlineServlet?url=photo/140000000000/140600000000/140603000000/123456/20140705-131913-sdfeffgdfrfre.jpg",
//		            "/photoOnlineServlet?url=photo/140000000000/140600000000/140603000000/123456/20140705-131913-sdfeffgdfrfre.jpg"];
//		var imgsList=["img1","img2","img3"];
//		var nameList=["图片1","图片2","图片3"];
		var urlList = new Array();
		var imgsList = new Array();
		var nameList = new Array();
		/*
		 * 上传照片
		 */
		fileUploade = function() {
			if ($("#upFile").val() == "") {
				alert("请选择上传的图片!");
				return;
			}
			var certNo = "";

			if ($("#" + prefixID + "certNo:input").val() != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			}
			 var photofile = "";
			$.ajaxFileUpload({
				url : '/photoUploadAction.do?type=change&certNo='
						+ certNo, // 需要链接到服务器地址
				secureuri : false,
				fileElementId : 'upFile', // 文件选择框的id属性
				dataType : 'json', // 服务器返回的格式，可以是json
				success : function(data, status) // 相当于java中try语句块的用法
				{
					
					if (data.code == "0000") {
						$.ligerDialog.success('上传成功', null, function() {
//							alert(10);
							for(var i=0;i<data.size;i++){
								urlList.push("/" +data.file[i].url);
								nameList.push(data.file[i].myFileName);
								imgsList.push("img"+i);
								photofile +="/"+data.file[i].url+",";								 
							}
							if(photofile!=""){
								photofile = photofile.substring(0, photofile.length-1);
							}
							$("#" + prefixID + "images:input").val(photofile);
						});

					}
				},

				error : function(data, status, e) // 相当于java中catch语句块的用法
				{
					// $('#result').html('添加失败');
					$.ligerDialog.error('上传失败!');
				}
			});
		};
		 
		move=function(obj,step){
			 var thisbox=obj.parentElement.parentElement;
			 var index=0;
			 var newindex;
			 for(var i=0;i<imgsList.length;i++){
			 	if(imgsList[i]==thisbox.id){
					index=i;
					break;
				}
			 }
			 newindex=index+step;
			 if(newindex<0||newindex>=imgsList.length){
			 	alert('已经到边边上了');
			 }else{
//				 alert(1);
			 	var middle="";
				middle=nameList[index];
				nameList[index]=nameList[newindex];
				nameList[newindex]=middle;
				var midurl = "";
				midurl=urlList[index];
				urlList[index]=urlList[newindex];
				urlList[newindex]=midurl;
				 
				for (var i=0;i<imgsList.length;i++){
					$("#"+imgsList[i]).attr("src",urlList[i]);
					$("#name"+i).innerHtml(nameList[i]);
				}
			 }
			  
		};
		showImg = function(){
			if(urlList!=""){
			$(
			'<ul>'
			+ '<li style="width:65px;text-align:center;"></li>'
			+'<div class="imgs" id="imgs">'
			+'</div>'
			+'</ul>'
			).appendTo($("#noticeform"));
			var imgs=document.getElementById('imgs');
			 
			var imgHtml = "";
			for(var i=0;i<imgsList.length;i++){
				imgHtml+=
				("<div class='imgbox'  >"+
		   '<div class="img"><img id="'+imgsList[i]+'"width="100%" height="100%" src="'+urlList[i]+'" /></div>'+
		    ' <div class="delete">删除</div>'+
		      ' <div class="move">'+
		          ' <div class="left" onclick="move(this,-1);">左</div>'+
		         '  <div class="imgName" id=name"'+i+'" >'+nameList[i]+'</div>'+
		        '   <div class="left" onclick="move(this,1);">右</div>'+
		      ' </div>'+
		'   </div>');
			}
			imgs.innerHTML=imgHtml;
		}else{
			alert("请先上传照片!");
		}
		};
		$(
				'<ul id="noticeform">'
				+ '<li style="width:65px;text-align:center;">添加图片 :</li>'
				+'<li style="width:450px;text-align:left;">'
				+ '<input type="file" id="upFile" multiple="multiple" name="upFile" class="l-button" style="width:440px ; height:21px; line-height:21px; "/>'
				+ '</li>'
				+ '<li style="width:82px;text-align:right;">'
				+ '<input type="button" value="上传" onclick="fileUploade()" class="l-button"/>'
				+ '</li>' 
				+ '<li   style="width:82px;text-align:right;">'
				+ '<input type="button" value="预览" onclick="showImg()" class="l-button"/>'
				+ '</li>' 
				+ '</ul>'
				+'<ul >'
				+ '<li style="width:65px;text-align:center;">附件上传 :</li>'
				+'<li style="width:450px;text-align:left;">'
				+ '<input type="file" id="upFile" multiple="multiple" name="upFile" class="l-button" style="width:440px ; height:21px; line-height:21px; "/>'
				+ '</li>'
				+ '<li style="width:82px;text-align:right;">'
				+ '<input type="button" value="上传" onclick="fileUploade()" class="l-button"/>'
				+ '</li>' 
				+ '<li   style="width:82px;text-align:right;">'
				+ '<input type="button" value="预览" onclick="showImg()" class="l-button"/>'
				+ '</li>' 
				+ '</ul>'
				+ '<table id="table2">'
				+ '<tbody><tr><td style="width:82px;text-align:right;"> <div class="l-checkbox-wrapper"><a class="l-checkbox"></a><input type="checkbox" name="chbox" class="l-hidden" ligeruiid="CheckBox1000"></div></td><td>选项一</td>'
				+ '<td><div class="l-checkbox-wrapper"><a class="l-checkbox"></a><input type="checkbox" name="chbox" class="l-hidden" ligeruiid="CheckBox1001"></div></td><td>选项二</td>'
				+ '<td><div class="l-checkbox-wrapper"><a class="l-checkbox"></a><input type="checkbox" name="chbox" class="l-hidden" ligeruiid="CheckBox1002"></div></td><td>选项二</td></tr>'
				+ '</tbody></table>'
				).appendTo(form);
	};


	/*
	 * 户籍变化上传照片
	 */
	LFT.addUploadButton = function(form, prefixID) {
		/*
		 * 上传照片
		 */
		fileUpload = function() {
			if ($("#upFile").val() == "") {
				alert("请选择上传的照片!");
				return;
			}
			var certNo = "";
			if ($("#" + prefixID + "certNo:input").val() != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			} else if ($("#" + prefixID + "hhrId:input").val() != null) {
				certNo = "hhrId_" + $("#" + prefixID + "hhrId:input").val();
			} else if ($("#" + prefixID + "fpId:input").val() != null) {
				certNo = "fpId_" + $("#" + prefixID + "fpId:input").val();
			}

			$.ajaxFileUpload({
				url : '/photoUploadAction.do?type=change&certNo='
						+ certNo, // 需要链接到服务器地址
				secureuri : false,
				fileElementId : 'upFile', // 文件选择框的id属性
				dataType : 'json', // 服务器返回的格式，可以是json
				success : function(data, status) // 相当于java中try语句块的用法
				{
					if (data.code == "0000") {
//						alert(30);
						$("#uploadImg").attr('src',"/" + "");
						$.ligerDialog.success('上传成功', null, function() {
							$("#uploadImg").attr('src',
									"/" + data.file[0].url);
							$("#" + prefixID + "moveProof:input").val(
									"/" + data.file[0].url);
						});
						 

					}
				},

				error : function(data, status, e) // 相当于java中catch语句块的用法
				{
					// $('#result').html('添加失败');
					$.ligerDialog.error('上传失败!');
				}
			});
		};

		upload_photo_sece = function(type) {
			var certNo = "";
			if ($("#" + prefixID + "certNo:input").val() != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			} else if ($("#" + prefixID + "hhrId:input").val() != null) {
				certNo = "hhrId_" + $("#" + prefixID + "hhrId:input").val();
			} else if ($("#" + prefixID + "fpId:input").val() != null) {
				certNo = "fpId_" + $("#" + prefixID + "fpId:input").val();
			}
			photo_sece_dialog = $.ligerDialog.open({
				url : '/flex/camera1.html?type=' + type + '&certNo='
						+ certNo,
				width : 700,
				height : 400,
				isHidden : false,
				title : '拍照上传',
				name : step1_photo_camera1_iframe
			});
			photo_sece_dialog
					.bind(
							"myBeforeClose",
							function(dia) {
								if (navigator.appName.indexOf("Microsoft") != -1) {
									photoUrl = step1_photo_camera1_iframe.window["camera1"
											+ "Ob"].loadFlexFunction();
								} else {
									photoUrl = step1_photo_camera1_iframe.window.document["camera1"
											+ "Em"].loadFlexFunction();
								}
								if (photoUrl != "empty") {
									var object = JSON2.parse(photoUrl);
									$("#uploadImg").attr('src',
											"/" + object.place);
									$("#" + prefixID + "moveProof:input").val(
											"/" + object.place);
								}
							});
		};

		$(
				'<ul><li style="width:210px;text-align:center;">'
						+ '<input type="file" id="upFile" name="upFile" class="l-button" style="width:200px ; height:21px; line-height:21px; "/>'
						+ '</li>'
						+ '<li style="width:100px;text-align:center;">'
						+ '<input type="button" value="上传" onclick="fileUpload()" class="l-button"/>'
						+ '</li>'
						+ '<li style="width:100px;text-align:center;">'
						// + '<input type="button" value="现场拍照"
						// onclick="upload_photo_sece(\'change\')"
						// class="l-button" style="width: 80px;"/>'
						+ '<input type="button" value="拍照" onclick="upload_photo_sece(\'change\')" class="l-button" style="width: 80px;"/>'
						+ '</li></ul>').appendTo(form);
		 
	};

	LFT.getDate=function(formate,addYear,addMonth,addDate,showTime){
		var now=new Date();
		var year=now.getFullYear()+addYear;
		var month=now.getMonth()+1+addMonth;
		month="0"+month;
		month=month.substring(month.length-2);
		var day=now.getDate()+addDate;
		day="0"+day;
		day=day.substring(day.length-2);
		if(showTime){
			var hour="0"+now.getHours();
			hour=hour.substring(hour.length-2, hour.length);
			var minute="0"+now.getMinutes();
			minute=minute.substring(minute.length-2, minute.length);
			day+=(" "+hour+":"+minute);
		}
		if(formate=='-')
			return year+"-"+month+"-"+day;

		else
			return year + "年" + month + "月" + day + "日";
		
	};
	/*
	 * 得到月份的下拉列表
	 */
	LFT.getMonthData = function(emptyable, nullText) {
		if(nullText == null) {
			nullText = "请选择";
		}
		var monthArray = new Array();
		if (emptyable == null || emptyable)
			monthArray.push({
				"id" : "",
				"text" : nullText
			});
		for (var i = 1; i < 13; i++) {
			var istr = i.toString();
			var istrs = "0" + istr;
			istrs = istrs.substring(istrs.length - 2);
			monthArray.push({
				"id" : istrs,
				"text" : istr + "月"
			});
		}
		return monthArray;
	};
	/*
	 * 得到最近N年的下拉 @param 需要得到的年的数目
	 */
	LFT.getYearData = function(num, emptyable) {
		var reg = new RegExp("^[0-9]*[1-9][0-9]*$");
		var yearArray = new Array();
		if (!reg.test(num)) {
			alert("LFT.getYearData(num) 参数必须为正整数!");
			return yearArray;
		}
		if (emptyable == null || emptyable)
			yearArray.push({
				"id" : "",
				"text" : "请选择"
			});
		var nowDate = new Date();
		var yeartoday = nowDate.getFullYear();
		for (var i = 0; i < num; i++) {
			var they = yeartoday - i;

			var istr = i.toString();
			yearArray.push({
				"id" : they,
				"text" : they + "年"
			});
		}
		return yearArray;

	};
	/*
	 * 去世失踪添加拍照，上传像片按钮
	 */
	LFT.addPhotoDieButton = function(form, prefixID) {
		/*
		 * 调用Flex拍照上传功能
		 */
		step1_upload_phone = function(type) {
			var certNo = "";
			if ($("#" + prefixID + "certNo:input").val() != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			}
			step1_photo_dialog = $.ligerDialog.open({
				url : '/flex/camera1.html?type=' + type + '&certNo='
						+ certNo,
				width : 710,
				height : 415,
				isHidden : false,
				title : '拍照上传',
				top : 0,
				name : 'step1_photo_camera1_iframe'
			});
			step1_photo_dialog
					.bind(
							"myBeforeClose",
							function(dia) {
								if (navigator.appName.indexOf("Microsoft") != -1) {
									photoUrl = step1_photo_camera1_iframe.window["camera1"
											+ "Ob"].loadFlexFunction();
								} else {
									photoUrl = step1_photo_camera1_iframe.window.document["camera1"
											+ "Em"].loadFlexFunction();
								}
								if (photoUrl != "empty") {
									var object = JSON2.parse(photoUrl);
									if (object.dieImg != null
											&& object.dieImg != "") {
										$("#dieImg").attr("src",
												"/" + object.dieImg);
										$(
												"#"
														+ prefix_die_people_query_detail
														+ "deathProof:input")
												.val("/" + object.dieImg);
									}
								}
							});
		};
		/*
		 * 上传照片
		 */
		ajaxFileUpload = function() {
			if ($("#upFile").val() == "") {
				alert("请选择上传的照片!");
				return;
			}
			var certNo = "";
			if ($("#" + prefixID + "certNo:input").val() != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			}
			if (certNo == "") {
				alert("身份证不能为空!");
				return;
			}
			var updateTo = $("#selectPhoto").val();
			$.ajaxFileUpload({
				url : '/photoUploadAction.do?type=' + updateTo
						+ '&certNo=' + certNo, // 需要链接到服务器地址
				secureuri : false,
				fileElementId : 'upFile', // 文件选择框的id属性
				dataType : 'json', // 服务器返回的格式，可以是json
				success : function(data, status) // 相当于java中try语句块的用法
				{
					if (data.code == "0000") {
						// 先设空值，以便清除缓存
						$("#" + updateTo + "Img").attr('src', "");
						$.ligerDialog.success("上传成功，确定返回？", function() {
							$("#" + updateTo + "Img").attr('src',
									"/" + data.file[0].url);
							if (updateTo == "die") {
								$(
										"#" + prefix_die_people_query_detail
												+ "deathProof:input").val(
										"/" + data.file[0].url);

							}
						});
					}
				},
				error : function(data, status, e) // 相当于java中catch语句块的用法
				{
					$.ligerDialog.error('上传失败!');
				}
			});
		};

		$(
				'<ul>'
						+ '<li style="width:105px;height:24px;line-height:24px;margin-top: 10px;text-align:right;">死亡证明像片：</li>'
						+ '<li style="width:210px;text-align:center;display:none;">'
						+ '<select name="selectPhoto" id="selectPhoto">'
						+ '<option value="die" selected>死亡证明拍照</option>'
						+ '</select>'
						+ '</li>'
						+ '<li style="width:210px;text-align:center;">'
						+ '<input type="file" id="upFile" name="upFile" class="l-button" style="width:200px ; height:21px; line-height:21px; "/>'
						+ '</li>'
						+ '<li style="width:100px;text-align:center;">'
						+ '<input type="button" value="上传" onclick="ajaxFileUpload()" class="l-button"/>'
						+ '</li>' + '</ul>').appendTo(form);

		$("#selectPhoto").ligerComboBox({
			width : 190
		});

		$(
				'<ul>'
						+ '<li style="width:120px;text-align:center;">'
						+ '<input type="button" value="死亡证明拍照" onclick="step1_upload_phone(\'dieImg\')" class="l-button l-button-submit" />'
						+ '</li>' + '</ul>').appendTo(form);
	};

	/*
	 * 迁出照片拍照
	 */
	LFT.addPhotoChangeButton = function(form, prefixID) {
		/*
		 * 调用Flex拍照上传功能
		 */
		step1_upload_phone = function(type) {
			var certNo = "";
			if ($("#" + prefixID + "certNo:input") != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			}
			step1_photo_dialog = $.ligerDialog.open({
				url : '/flex/camera1.html?type=' + type + '&certNo='
						+ certNo,
				width : 710,
				height : 415,
				isHidden : false,
				title : '拍照上传',
				top : 0,
				name : 'step1_photo_camera1_iframe'
			});
			step1_photo_dialog
					.bind(
							"myBeforeClose",
							function(dia) {
								if (navigator.appName.indexOf("Microsoft") != -1) {
									photoUrl = step1_photo_camera1_iframe.window["camera1"
											+ "Ob"].loadFlexFunction();
								} else {
									photoUrl = step1_photo_camera1_iframe.window.document["camera1"
											+ "Em"].loadFlexFunction();
								}
								if (photoUrl != "empty") {
									var object = JSON2.parse(photoUrl);
									if (object.changeImg != null
											&& object.changeImg != "") {
										$("#changeImg").attr("src",
												"/" + object.changeImg);
										$("#" + prefixID + "moveProof:input")
												.val(
														"/"
																+ object.changeImg);
									}
								}
							});
		};
		/*
		 * 上传照片
		 */
		ajaxFileUpload = function() {
			if ($("#upFile").val() == "") {
				alert("请选择上传的照片!");
				return;
			}
			var certNo = "";
			if ($("#" + prefixID + "certNo:input") != null) {
				certNo = $("#" + prefixID + "certNo:input").val();
			}
			$.ajaxFileUpload({
				url : '/photoUploadAction.do?type=homeinfo&certNo='
						+ certNo, // 需要链接到服务器地址
				secureuri : false,
				fileElementId : 'upFile', // 文件选择框的id属性
				dataType : 'json', // 服务器返回的格式，可以是json
				success : function(data, status) // 相当于java中try语句块的用法
				{
					if (data.code == "0000") {
						$.ligerDialog.success("上传成功，确定返回？", function() {
							var updateTo = $("#selectPhoto").val();
							if (updateTo == "changeImg") {
								$("#" + prefixID + "moveProof:input").val(
										"/" + data.file[0].url);
							}
						});
					}
				},
				error : function(data, status, e) // 相当于java中catch语句块的用法
				{
					$.ligerDialog.error('上传失败!');
				}
			});
		};

		$(
				'<ul>'
						+ '<li style="width:100px;text-align:center;">上传像片至：</li>'
						+ '<li style="width:180px;text-align:center;">'
						+ '<select name="selectPhoto" id="selectPhoto">'
						+ '<option value="changeImg" selected>迁出证明拍照</option>'
						+ '</select>'
						+ '</li>'
						+ '<li style="width:180px;text-align:center;">'
						+ '<input type="file" id="upFile" name="upFile" class="l-button" style="width:180px ; height:22px; line-height:22px;   margin-top: 0px; "/>'
						+ '</li>'
						+ '<li style="width:99px;text-align:center;">'
						+ '<input type="button" value="上传" onclick="ajaxFileUpload()" class="l-button" style="height:22px; line-height:22px;   margin-top: 0px; "/>'
						+ '</li>' + '</ul>').appendTo(form);

		$("#selectPhoto").ligerComboBox({
			width : 160
		});

		$(
				'<ul>'
						+ '<li style="padding-left:100px;width:100px;text-align:center;">'
						+ '<input type="button" value="迁出证明拍照" onclick="step1_upload_phone(\'changeImg\')" class="l-button l-button-submit" />'
						+ '</li>' + '</ul>').appendTo(form);
	};

	/**
	 * 通用收缴单据列表打印功能,将用户最后一次查询的结果打印出来。 注:1、使用页面需添加 printSetDia,printObj 全局对象,即定义
	 * var printSetDia,printObj = null 2、后台需提供不分页的查询功能，即pagesize=0,全量查询
	 */
	LFT.printGridSearchList = function(grid) {
		// 获取最近一次列表查询的结果，打印成明细
		$.ajax({
			url : grid.get('url'),
			data : grid.get('parms'),
			dataType : 'json',
			type : "post",
			// async :false,
			success : function(msg) {
				// 获取列表数据
				printObj = new Object();
				printObj.data = msg.ret_data;
				var columns = grid.getColumns();
				// alert("columns =" +JSON2.stringify(columns));
				printObj.columns = new Array();
				// 如果列隐藏，不打印该列
				for ( var i = 0; i < columns.length; i++) {
					if (columns[i].hide || columns[i].ischeckbox) {
					} else {
						printObj.columns.push(columns[i]);
					}
				}
				if (printSetDia == null) {
					printSetDia = $.ligerDialog.open({
						url : '/pages/print/printSetDia.html',
						width : 700,
						height : 350,
						top : 20,
						isResize : true,
						load : true,
						isHidden : true,
						title : "打印明细设置"
					});
				} else {
					printSetDia.show();
				}
			},
			error : function(response) {
				LFT.showErrorMessage(response);
			}
		});
	};

	/**
	 * 打印收缴单据 需要客户端安装word 2010,并设置本网站为可信任网站，设置AX控件可使用
	 */
	LFT.printReceipts = function(object) {
		var twoDimensionPath = object[1].twoDimensionPath;
		var title = object[1].title;
		var stitle = object[1].stitle;
		var id = object[1].id;
		var tranDate = object[1].tranDate;
		var payer = object[1].payerName;
		var certNo = object[1].certNo;
		var payYear = object[1].payYear;
		var amountSelf = object[1].amountSelf;
		var operaterName = object[1].operaterName;
		var operaterId = object[1].operaterId;
		try {
			// 获取Word 过程
			// 请设置IE的可信任站点
			wdapp = new ActiveXObject("Word.Application");
		} catch (e) {
			alert("无法调用Office对象，请确保您的机器已安装了Office并已将本系统的站点名加入到IE的信任站点列表中！");
			wdapp = null;
			return;
		}
		// wdapp.Documents.Open("c:\PrinterTemp.docx"); //打开本地(客户端)word模板
		wdapp.Documents.Open("http://" + web_server_ip + ":" + web_server_port
				+"/pages/print/PrinterTemplate.doc");
		wddoc = wdapp.ActiveDocument;
		// wddoc.Bookmarks("twoDimensionPath").Range.Text =
		// twoDimensionPath;//找到Word中的Title标签，替换其内容
		wddoc.Bookmarks("title").Range.Text = title;
		wddoc.Bookmarks("stitle").Range.Text = stitle;
		wddoc.Bookmarks("id").Range.Text = $
				.trim(wddoc.Bookmarks("id").Range.Text + ": " + id);
		wddoc.Bookmarks("tranDate").Range.Text = $.trim(wddoc
				.Bookmarks("tranDate").Range.Text
				+ ": " + tranDate);
		wddoc.Bookmarks("payer").Range.Text = wddoc.Bookmarks("payer").Range.Text
				+ ": " + payer;
		wddoc.Bookmarks("certNo").Range.Text = wddoc.Bookmarks("certNo").Range.Text
				+ ": " + certNo;
		wddoc.Bookmarks("payYear").Range.Text = wddoc.Bookmarks("payYear").Range.Text
				+ ": " + payYear;
		wddoc.Bookmarks("amountSelf").Range.Text = wddoc
				.Bookmarks("amountSelf").Range.Text
				+ ": " + amountSelf;
		wddoc.Bookmarks("operaterName").Range.Text = $.trim(wddoc
				.Bookmarks("operaterName").Range.Text)
				+ ": " + operaterName;
		wddoc.Bookmarks("operaterId").Range.Text = wddoc
				.Bookmarks("operaterId").Range.Text
				+ ": " + operaterId;
		// var Selection = word.Selection;
		// Selection.InlineShapes.AddPicture("D:\Michael_QRCode1.png");
		var pictureRange = wddoc.Bookmarks("twoDimensionPath").Range;
		wddoc.Bookmarks("twoDimensionPath").Range.Text = "";
		// alert('in');
		// alert("http://"+web_server_ip+":"+web_server_port+top.CONFIG.serverpath+"/"
		// + twoDimensionPath);
		var inlineShape = pictureRange.InlineShapes.AddPicture("http://"
				+ web_server_ip + ":" + web_server_port + top.CONFIG.serverpath
				+ "/" + twoDimensionPath)// , false, false, 100, 0, 50, 50);
		// inlineShape.Borders.OutsideLineStyle =1;
		// var inlineShape
		// =pictureRange.InlineShapes.AddPicture("http://192.168.1.104:8080" +
		// twoDimensionPath);
		// var inlineShape =
		// wdapp.Application.Selection.InlineShapes.AddPicture("http://192.168.1.104:8080"
		// + twoDimensionPath);
		// inlineShape.width =100;
		// inlineShape.height =100;
		// wdapp.Application.Selection.InlineShapes.AddPicture("http://192.168.1.104:8080/"+LFT.appName+"/pages/print/Michael_QRCode1.png");
		// wdapp.ActiveDocument.ActiveWindow.View.Type = 1;
		wdapp.visible = false; // word模板是否可见
		wddoc.saveAs("c:\PrinterTemp.doc"); // 保存临时文件word
		wdapp.Application.Printout(); // 调用自动打印功能
		wdapp.quit();
		wdapp = null;
	};

	/**
	 * 打印村委会收缴单据 需要客户端安装word 2010,并设置本网站为可信任网站，设置AX控件可使用
	 */
	LFT.printReceiptsVillage = function(object) {
		/*
		 * var twoDimensionPath = object[1].twoDimensionPath; var title =
		 * object[1].title; var stitle = object[1].stitle; var id =
		 * object[1].id; var tranDate = object[1].tranDate; var ssorgNode =
		 * object[1].ssorgNode; var payOrgName = object[1].payOrgName; var
		 * payYear = object[1].payYear; var operaterName =
		 * object[1].operaterName; var operaterId = object[1].operaterId; var
		 * acountAmount = object[1].acountAmount; var acountUser =
		 * object[1].acountUser;
		 */
		var twoDimensionPath = object[1].twoDimensionPath;
		var title = object[1].title;
		var stitle = object[1].stitle;
		var id = object[1].id;
		var tranDate = object[1].tranDate;
		var ssorgNode = object[1].operaterId;
		var payOrgName = object[1].operaterName;
		var payYear = object[1].payYear;
		var operaterName = title;
		var operaterId = object[1].ssorgNode;
		var acountAmount = object[1].acountAmount;
		var acountUser = object[1].acountUser;

		// alert(id+","+tranDate+","+ssorgNode+","+payOrgName+","+payYear+","+operaterName+","+operaterId+","+acountAmount+","+acountUser);
		try {
			// 获取Word 过程
			// 请设置IE的可信任站点
			wdapp = new ActiveXObject("Word.Application");
		} catch (e) {
			alert("无法调用Office对象，请确保您的机器已安装了Office并已将本系统的站点名加入到IE的信任站点列表中！");
			wdapp = null;
			return;
		}
		// wdapp.Documents.Open("c:\PrinterTemplate.docx"); //打开本地(客户端)word模板
		wdapp.Documents.Open("http://" + web_server_ip + ":" + web_server_port
				+"/pages/print/PrinterTemplateVillage.doc");
		wddoc = wdapp.ActiveDocument;
		// wddoc.Bookmarks("twoDimensionPath").Range.Text =
		// twoDimensionPath;//找到Word中的Title标签，替换其内容
		wddoc.Bookmarks("title").Range.Text = title;
		wddoc.Bookmarks("stitle").Range.Text = stitle;
		wddoc.Bookmarks("id").Range.Text = $
				.trim(wddoc.Bookmarks("id").Range.Text + ": " + id);
		wddoc.Bookmarks("tranDate").Range.Text = $.trim(wddoc
				.Bookmarks("tranDate").Range.Text
				+ ": " + tranDate);
		wddoc.Bookmarks("ssorgNode").Range.Text = wddoc.Bookmarks("ssorgNode").Range.Text
				+ ": " + ssorgNode;
		wddoc.Bookmarks("payOrgName").Range.Text = wddoc
				.Bookmarks("payOrgName").Range.Text
				+ ": " + payOrgName;
		wddoc.Bookmarks("payYear").Range.Text = wddoc.Bookmarks("payYear").Range.Text
				+ ": " + payYear;
		wddoc.Bookmarks("acountAmount").Range.Text = wddoc
				.Bookmarks("acountAmount").Range.Text
				+ ": " + acountAmount;
		wddoc.Bookmarks("acountUser").Range.Text = wddoc
				.Bookmarks("acountUser").Range.Text
				+ ": " + acountUser;
		wddoc.Bookmarks("operaterName").Range.Text = $.trim(wddoc
				.Bookmarks("operaterName").Range.Text)
				+ ": " + operaterName;
		wddoc.Bookmarks("operaterId").Range.Text = wddoc
				.Bookmarks("operaterId").Range.Text
				+ ": " + operaterId;
		// var Selection = word.Selection;
		// Selection.InlineShapes.AddPicture("D:\Michael_QRCode1.png");
		// alert('in');
		var pictureRange = wddoc.Bookmarks("twoDimensionPath").Range;
		wddoc.Bookmarks("twoDimensionPath").Range.Text = "";
		var inlineShape = pictureRange.InlineShapes.AddPicture("http://"
				+ web_server_ip + ":" + web_server_port + top.CONFIG.serverpath
				+ "/" + twoDimensionPath)// , false, false, 100, 0, 50, 50);
		// inlineShape.Borders.OutsideLineStyle =1;
		// var inlineShape
		// =pictureRange.InlineShapes.AddPicture("http://192.168.1.104:8080" +
		// twoDimensionPath);
		// var inlineShape =
		// wdapp.Application.Selection.InlineShapes.AddPicture("http://192.168.1.104:8080"
		// + twoDimensionPath);
		// inlineShape.width =100;
		// inlineShape.height =100;
		// wdapp.Application.Selection.InlineShapes.AddPicture("http://192.168.1.104:8080/"+LFT.appName+"/pages/print/Michael_QRCode1.png");
		// wdapp.ActiveDocument.ActiveWindow.View.Type = 1;
		wdapp.visible = false; // word模板是否可见
		wddoc.saveAs("c:\PrinterTemp.doc"); // 保存临时文件word
		wdapp.Application.Printout(); // 调用自动打印功能
		wdapp.quit();
		wdapp = null;
	};

	/**
	 * 城乡居保打印收缴单据 需要客户端安装word 2010,并设置本网站为可信任网站，设置AX控件可使用
	 */
	LFT.printReceipts2 = function(object) {
		var twoDimensionPath = object[1].twoDimensionPath;
		var title = object[1].title;
		var stitle = object[1].stitle;
		var id = object[1].id;
		var tranDate = object[1].tranDate;
		// var ssorgNode = object[1].operaterId;
		// var payOrgName = object[1].operaterName;
		var payYear = object[1].payYear;
		var operaterName = object[1].operaterName;
		var operaterId = object[1].operaterId;
		var acountAmount = object[1].acountAmount;
		var acountUser = object[1].acountUser;
		var familyNo = object[1].familyNo;
		try {
			// 获取Word 过程
			// 请设置IE的可信任站点
			wdapp = new ActiveXObject("Word.Application");
		} catch (e) {
			alert("无法调用Office对象，请确保您的机器已安装了Office并已将本系统的站点名加入到IE的信任站点列表中！");
			wdapp = null;
			return;
		}
		// wdapp.Documents.Open("c:\PrinterTemplate.docx"); //打开本地(客户端)word模板
		wdapp.Documents.Open("http://" + web_server_ip + ":" + web_server_port
				+"/pages/print/PrinterReceiptsTemplate2.doc");
		wddoc = wdapp.ActiveDocument;
		// wddoc.Bookmarks("twoDimensionPath").Range.Text =
		// twoDimensionPath;//找到Word中的Title标签，替换其内容
		wddoc.Bookmarks("title").Range.Text = title;
		wddoc.Bookmarks("stitle").Range.Text = stitle;
		wddoc.Bookmarks("id").Range.Text = $
				.trim(wddoc.Bookmarks("id").Range.Text + ": " + id);
		wddoc.Bookmarks("tranDate").Range.Text = $.trim(wddoc
				.Bookmarks("tranDate").Range.Text
				+ ": " + tranDate);

		var tableform = wddoc.Tables(2);// 得到表格
		var list = object[1].list;
		for ( var i = 0; i < list.length; i++) {
			tableform.Rows.add();
			var tmp = list[i];
			tableform.Cell(i + 2, 1).range.Text = tmp.name;
			tableform.Cell(i + 2, 2).range.Text = tmp.certNo;
			tableform.Cell(i + 2, 3).range.Text = tmp.amountSelf;
		}

		wddoc.Bookmarks("payYear").Range.Text = wddoc.Bookmarks("payYear").Range.Text
				+ ": " + payYear;
		wddoc.Bookmarks("operaterName").Range.Text = $.trim(wddoc
				.Bookmarks("operaterName").Range.Text)
				+ ": " + operaterName;
		wddoc.Bookmarks("operaterId").Range.Text = wddoc
				.Bookmarks("operaterId").Range.Text
				+ ": " + operaterId;
		// var Selection = word.Selection;
		// Selection.InlineShapes.AddPicture("D:\Michael_QRCode1.png");
		wddoc.Bookmarks("familyNo").Range.Text = wddoc.Bookmarks("familyNo").Range.Text
				+ ": " + familyNo;
		var pictureRange = wddoc.Bookmarks("twoDimensionPath").Range;
		wddoc.Bookmarks("twoDimensionPath").Range.Text = "";
		var inlineShape = pictureRange.InlineShapes.AddPicture("http://"
				+ web_server_ip + ":" + web_server_port + top.CONFIG.serverpath
				+ "/" + twoDimensionPath);// , false, false, 100, 0, 50, 50);
		wdapp.visible = false; // word模板是否可见
		wddoc.saveAs("c:\PrinterTemp.doc"); // 保存临时文件word
		wdapp.Application.Printout(); // 调用自动打印功能
		wdapp.quit();
		wdapp = null;
	};

	/**
	 * 新农合打印收缴单据 需要客户端安装word 2010,并设置本网站为可信任网站，设置AX控件可使用
	 */
	LFT.printReceiptsXLH = function(object) {
		var twoDimensionPath = object[1].twoDimensionPath;
		var title = object[1].title;
		var stitle = object[1].stitle;
		var id = object[1].id;
		var tranDate = object[1].tranDate;
		// var ssorgNode = object[1].operaterId;
		// var payOrgName = object[1].operaterName;
		var payYear = object[1].payYear;
		var operaterName = object[1].operaterName;
		var operaterId = object[1].operaterId;
		var acountAmount = object[1].acountAmount;
		var acountUser = object[1].acountUser;
		var familyNo = object[1].familyNo;
		try {
			// 获取Word 过程
			// 请设置IE的可信任站点
			wdapp = new ActiveXObject("Word.Application");
		} catch (e) {
			alert("无法调用Office对象，请确保您的机器已安装了Office并已将本系统的站点名加入到IE的信任站点列表中！");
			wdapp = null;
			return;
		}
		// wdapp.Documents.Open("c:\PrinterTemplate.docx"); //打开本地(客户端)word模板
		wdapp.Documents.Open("http://" + web_server_ip + ":" + web_server_port
				+"/pages/print/PrinterReceiptsTemplateXLH.doc");
		wddoc = wdapp.ActiveDocument;
		// wddoc.Bookmarks("twoDimensionPath").Range.Text =
		// twoDimensionPath;//找到Word中的Title标签，替换其内容
		wddoc.Bookmarks("title").Range.Text = title;
		wddoc.Bookmarks("stitle").Range.Text = stitle;
		wddoc.Bookmarks("id").Range.Text = $
				.trim(wddoc.Bookmarks("id").Range.Text + ": " + id);
		wddoc.Bookmarks("tranDate").Range.Text = $.trim(wddoc
				.Bookmarks("tranDate").Range.Text
				+ ": " + tranDate);

		var tableform = wddoc.Tables(2);// 得到表格
		var list = object[1].list;
		for ( var i = 0; i < list.length; i++) {
			tableform.Rows.add();
			var tmp = list[i];
			tableform.Cell(i + 2, 1).range.Text = tmp.name;
			tableform.Cell(i + 2, 2).range.Text = tmp.certNo;
			tableform.Cell(i + 2, 3).range.Text = tmp.amountSelf;
		}

		wddoc.Bookmarks("payYear").Range.Text = wddoc.Bookmarks("payYear").Range.Text
				+ ": " + payYear;
		wddoc.Bookmarks("operaterName").Range.Text = $.trim(wddoc
				.Bookmarks("operaterName").Range.Text)
				+ ": " + operaterName;
		wddoc.Bookmarks("operaterId").Range.Text = wddoc
				.Bookmarks("operaterId").Range.Text
				+ ": " + operaterId;
		// var Selection = word.Selection;
		// Selection.InlineShapes.AddPicture("D:\Michael_QRCode1.png");
		wddoc.Bookmarks("familyNo").Range.Text = wddoc.Bookmarks("familyNo").Range.Text
				+ ": " + familyNo;
		var pictureRange = wddoc.Bookmarks("twoDimensionPath").Range;
		wddoc.Bookmarks("twoDimensionPath").Range.Text = "";
		var inlineShape = pictureRange.InlineShapes.AddPicture("http://"
				+ web_server_ip + ":" + web_server_port + top.CONFIG.serverpath
				+ "/" + twoDimensionPath);//, false, false, 100, 0, 50, 50);
		wdapp.visible = false; // word模板是否可见
		wddoc.saveAs("c:\PrinterTemp.doc"); // 保存临时文件word
		wdapp.Application.Printout(); // 调用自动打印功能
		wdapp.quit();
		wdapp = null;
	};
	
	/**
	 * 比较两个日期的大小，大于返回正数，等于返回0，小于返回负数
	 */
	LFT.dateCompare = function(startDate, endDate, format) {
		if(format == null || format == "") {
			format = "-";
		}
		
		var startArr = startDate.split(format);
		var s = new Date(startArr[0], startArr[1], startArr[2]);
		var ls = s.getTime();
		
		var endArr = endDate.split(format);
		var e = new Date(endArr[0], endArr[1], endArr[2]);
		var le = e.getTime();
		return ls - le;
	};

})(jQuery);