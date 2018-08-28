(function(A) {
	A.fn.ligerForm = function() {
		return A.ligerui.run.call(this, "ligerForm", arguments);
	};
	A.ligerDefaults = A.ligerDefaults || {};
	A.ligerDefaults.Form = {
		inputWidth : 180,
		labelWidth : 90,
		space : 40,
		rightToken : "：",
		labelAlign : "left",
		align : "left",
		fields : [],
		appendID : true,
		prefixID : "",
		toJSON : A.ligerui.toJSON
	};
	A.ligerDefaults.Form.editorBulider = function(F) {
		var C = this, E = this.options;
		var D = {};
		if (E.inputWidth) {
			D.width = E.inputWidth;
		}
		if (F.is("select")) {
			F.ligerComboBox(D);
		} else {
			if (F.is(":text") || F.is(":password")) {
				var B = F.attr("ltype");
				switch (B) {
				case "select":
				case "combobox":
					D.prefixID = E.prefixID;
					F.ligerComboBox(D);
					break;
				case "spinner":
					F.ligerSpinner(D);
					break;
				case "date":
					F.ligerDateEditor(D);
					break;
				case "float":
				case "number":
					D.number = true;
					F.ligerTextBox(D);
					break;
				case "int":
				case "digits":
					D.digits = true;
				default:
					F.ligerTextBox(D);
					break
				}
			} else {
				if (F.is(":radio")) {
					F.ligerRadio(D)
				} else {
					if (F.is(":checkbox")) {
						F.ligerCheckBox(D)
					} else {
						if (F.is("textarea")) {
							F.addClass("l-textarea")
						}
					}
				}
			}
		}
	};
	A.ligerui.controls.Form = function(C, B) {
		A.ligerui.controls.Form.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Form.ligerExtend(A.ligerui.core.UIComponent, {
		__getType : function() {
			return "Form"
		},
		__idPrev : function() {
			return "Form"
		},
		_init : function() {
			A.ligerui.controls.Form.base._init.call(this)
		},
		_render : function() {
			var D = this, E = this.options;
			var C = A(this.element);
			if (E.fields && E.fields.length) {
				if (!C.hasClass("l-form")) {
					C.addClass("l-form")
				}
				var B = [];
				var F = false;
				A(E.fields).each(
						function(H, I) {
							if (I.type == "select") {
							}
							var G = I.name || I.id;
							if (!G) {
								return
							}
							if (I.type == "hidden") {
								B.push('<input type="hidden" id="' + E.prefixID
										+ G + '" name="' + G + '" />');
								return
							}
							var J = I.renderToNewLine || I.newline;
							if (J == null) {
								J = true;
							}
							if (I.merge) {
								J = false;
							}
							if (I.group) {
								J = true;
							}
							if (J) {
								if (F) {
									B.push("</ul>");
									F = false;
								}
								if (I.group) {
									B.push('<div class="l-group');
									if (I.groupicon) {
										B.push(" l-group-hasicon")
									}
									B.push('">');
									if (I.groupicon) {
										B.push('<img src="' + I.groupicon
												+ '" />')
									}
									B
											.push("<span>" + I.group
													+ "</span></div>")
								}
								B.push("<ul>");
								F = true;
							}
							B.push(D._buliderLabelContainer(I));
							B.push(D._buliderControlContainer(I));
							B.push(D._buliderSpaceContainer(I))
						});
				if (F) {
					B.push("</ul>");
					F = false;
				}
				C.append(B.join(""));
			}
			A("input,select,textarea", C).each(function() {
				E.editorBulider.call(D, A(this));
			});
		},
		_buliderLabelContainer : function(H) {
			var F = this, G = this.options;
			var D = H.label || H.display;
			var B = H.labelWidth || H.labelwidth || G.labelWidth;
			var E = H.labelAlign || G.labelAlign;
			if (D) {
				D += G.rightToken;
			}
			var C = [];
			C.push('<li style="');
			if (B) {
				C.push("width:" + B + "px;")
			}
			if (E) {
				C.push("text-align:" + E + ";")
			}
			C.push('">');
			if (D) {
				C.push(D);
			}
			if (H.validate) {
				if (H.validate.required) {
					C.push("<font color=red>*</font>");
				}
			}
			C.push("</li>");
			return C.join("")
		},
		_buliderControlContainer : function(F) {
			var D = this, E = this.options;
			var C = F.width || E.inputWidth;
			var G = F.align || F.textAlign || F.textalign || E.align;
			var B = [];
			B.push('<li style="');
			if (C) {
				B.push("width:" + C + "px;");
			}
			if (G) {
				B.push("text-align:" + G + ";");
			}
			B.push('">');
			B.push(D._buliderControl(F));
			B.push("</li>");
			return B.join("");
		},
		_buliderSpaceContainer : function(F) {
			var C = this, E = this.options;
			var D = F.space || F.spaceWidth || E.space;
			var B = [];
			B.push('<li style="');
			if (D) {
				B.push("width:" + D + "px;");
			}
			B.push('">');
			B.push("</li>");
			return B.join("")
		},
		_buliderControl : function(I) {
			var G = this, H = this.options;
			var E = I.width || H.inputWidth;
			var C = I.name || I.id;
			var B = [];
			if (I.comboboxName && I.type == "select") {
				B.push('<input type="hidden" id="' + H.prefixID + C
						+ '" name="' + C + '" />')
			}
			if (I.textarea || I.type == "textarea") {
				B.push("<textarea ")
			} else {
				if (I.type == "checkbox") {
					B.push('<input type="checkbox" ')
				} else {
					if (I.type == "radio") {
						B.push('<input type="radio" ')
					} else {
						if (I.type == "password") {
							B.push('<input type="password" ')
						} else {
							B.push('<input type="text" ')
						}
					}
				}
			}
			if (I.cssClass) {
				B.push('class="' + I.cssClass + '" ')
			}
			if (I.type) {
				B.push('ltype="' + I.type + '" ')
			}
			if (I.attr) {
				for ( var F in I.attr) {
					B.push(F + '="' + I.attr[F] + '" ')
				}
			}
			if (I.comboboxName && I.type == "select") {
				B.push('name="' + I.comboboxName + '"');
				if (H.appendID) {
					B.push(' id="' + H.prefixID + I.comboboxName + '" ')
				}
			} else {
				B.push('name="' + C + '"');
				if (H.appendID) {
					B.push(' id="' + H.prefixID + C + '" ')
				}
			}
			var D = A.extend({
				width : E - 2
			}, I.options || {});
			
			// 将传入的事件转为字符串
			// Jun 20, 2014 2:42:49 PM, Edited by HlLian
			// Edit Start Position
			
			// B.push(" ligerui='" + H.toJSON(D) + "' ");
			
			var attrligerui = H.toJSON(D);
			attrligerui = attrligerui.replace(/("on[a-zA-Z]+"):"([^\"]+)"/g, '$1:$2');// 替换事件
			B.push(" ligerui='" + attrligerui + "' ");
			// Edit End Position
			
			if (I.validate) {
				B.push(" validate='" + H.toJSON(I.validate) + "' ")
			}
			B.push(" />");
			return B.join("")
		}
	})
})(jQuery);
(function(A) {
	A.fn.ligerButton = function(B) {
		return A.ligerui.run.call(this, "ligerButton", arguments)
	};
	A.fn.ligerGetButtonManager = function() {
		return A.ligerui.run.call(this, "ligerGetButtonManager", arguments)
	};
	A.ligerDefaults.Button = {
		width : 100,
		text : "Button",
		disabled : false
	};
	A.ligerMethos.Button = {};
	A.ligerui.controls.Button = function(C, B) {
		A.ligerui.controls.Button.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Button
			.ligerExtend(
					A.ligerui.controls.Input,
					{
						__getType : function() {
							return "Button"
						},
						__idPrev : function() {
							return "Button"
						},
						_extendMethods : function() {
							return A.ligerMethos.Button
						},
						_render : function() {
							var B = this, C = this.options;
							B.button = A(B.element);
							B.button.addClass("l-btn");
							B.button
									.append('<div class="l-btn-l"></div><div class="l-btn-r"></div><span></span>');
							C.click && B.button.click(function() {
								if (!C.disabled) {
									C.click()
								}
							});
							B.set(C)
						},
						_setEnabled : function(B) {
							if (B) {
								this.button.removeClass("l-btn-disabled")
							}
						},
						_setDisabled : function(B) {
							if (B) {
								this.button.addClass("l-btn-disabled");
								this.options.disabled = true
							}
						},
						_setWidth : function(B) {
							this.button.width(B)
						},
						_setText : function(B) {
							A("span", this.button).html(B)
						},
						setValue : function(B) {
							this.set("text", B)
						},
						getValue : function() {
							return this.options.text
						},
						setEnabled : function() {
							this.set("disabled", false)
						},
						setDisabled : function() {
							this.set("disabled", true)
						}
					})
})(jQuery);
(function(B) {
	var A = B.ligerui;
	B(".l-dialog-btn").live("mouseover", function() {
		B(this).addClass("l-dialog-btn-over")
	}).live("mouseout", function() {
		B(this).removeClass("l-dialog-btn-over")
	});
	B(".l-dialog-tc .l-dialog-close").live("mouseover", function() {
		B(this).addClass("l-dialog-close-over")
	}).live("mouseout", function() {
		B(this).removeClass("l-dialog-close-over")
	});
	B.ligerDialog = function() {
		return A.run.call(null, "ligerDialog", arguments, {
			isStatic : true
		})
	};
	B.ligerui.DialogImagePath = "../../lib/ligerUI/skins/Aqua/images/win/";
	function C(E) {
		for ( var D in E) {
			B("<img />").attr("src", A.DialogImagePath + E[D])
		}
	}
	B.ligerDefaults.Dialog = {
		cls : null,
		id : null,
		buttons : null,
		isDrag : true,
		width : 280,
		height : null,
		content : "",
		target : null,
		url : null,
		load : false,
		onLoaded : null,
		type : "none",
		left : null,
		top : null,
		modal : true,
		name : null,
		isResize : false,
		allowClose : true,
		opener : null,
		timeParmName : null,
		closeWhenEnter : null,
		isHidden : true,
		show : true,
		title : "提示",
		showMax : false,
		showToggle : false,
		showMin : false,
		slide : B.browser.msie ? false : true,
		fixedType : null,
		showType : null,
		hasLoad : false
	};
	B.ligerDefaults.DialogString = {
		titleMessage : "提示",
		ok : "确定",
		yes : "是",
		no : "否",
		cancel : "取消",
		waittingMessage : "正在等待中,请稍候..."
	};
	B.ligerMethos.Dialog = B.ligerMethos.Dialog || {};
	A.controls.Dialog = function(D) {
		A.controls.Dialog.base.constructor.call(this, null, D)
	};
	A.controls.Dialog
			.ligerExtend(
					A.core.Win,
					{
						__getType : function() {
							return "Dialog"
						},
						__idPrev : function() {
							return "Dialog"
						},
						_extendMethods : function() {
							return B.ligerMethos.Dialog
						},
						_render : function() {
							var G = this, J = this.options;
							G.set(J, true);
							var E = B('<div class="l-dialog"><table class="l-dialog-table" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td class="l-dialog-tl"></td><td class="l-dialog-tc"><div class="l-dialog-tc-inner"><div class="l-dialog-icon"></div><div class="l-dialog-title"></div><div class="l-dialog-winbtns"><div class="l-dialog-winbtn l-dialog-close"></div></div></div></td><td class="l-dialog-tr"></td></tr><tr><td class="l-dialog-cl"></td><td class="l-dialog-cc"><div class="l-dialog-body"><div class="l-dialog-image"></div> <div class="l-dialog-content"></div><div class="l-dialog-buttons"><div class="l-dialog-buttons-inner"></div></td><td class="l-dialog-cr"></td></tr><tr><td class="l-dialog-bl"></td><td class="l-dialog-bc"></td><td class="l-dialog-br"></td></tr></tbody></table></div>');
							B("body").append(E);
							G.dialog = E;
							G.element = E[0];
							G.dialog.body = B(".l-dialog-body:first", G.dialog);
							G.dialog.header = B(".l-dialog-tc-inner:first",
									G.dialog);
							G.dialog.winbtns = B(".l-dialog-winbtns:first",
									G.dialog.header);
							G.dialog.buttons = B(".l-dialog-buttons:first",
									G.dialog);
							G.dialog.content = B(".l-dialog-content:first",
									G.dialog);
							G.set(J, false);
							if (J.allowClose == false) {
								B(".l-dialog-close", G.dialog).remove()
							}
							if (J.target || J.url || J.type == "none") {
								J.type = null;
								G.dialog.addClass("l-dialog-win")
							}
							if (J.cls) {
								G.dialog.addClass(J.cls)
							}
							if (J.id) {
								G.dialog.attr("id", J.id)
							}
							G.mask();
							if (J.isDrag) {
								G._applyDrag()
							}
							if (J.isResize) {
								G._applyResize()
							}
							if (J.type) {
								G._setImage()
							} else {
								B(".l-dialog-image", G.dialog).remove();
								G.dialog.content
										.addClass("l-dialog-content-noimage")
							}
							if (!J.show) {
								G.unmask();
								G.dialog.hide()
							}
							if (J.target) {
								G.dialog.content.prepend(J.target);
								B(J.target).show()
							} else {
								if (J.url) {
									if (J.timeParmName) {
										J.url += J.url.indexOf("?") == -1 ? "?"
												: "&";
										J.url += J.timeParmName + "="
												+ new Date().getTime()
									}
									if (J.load) {
										G.dialog.body.load(J.url, function() {
											G._saveStatus();
											G.trigger("loaded")
										})
									} else {
										G.jiframe = B("<iframe frameborder='0'></iframe>");
										var D = J.name ? J.name : "ligerwindow"
												+ new Date().getTime();
										G.jiframe.attr("name", D);
										G.jiframe.attr("id", D);
										G.dialog.content.prepend(G.jiframe);
										G.dialog.content
												.addClass("l-dialog-content-nopadding");
										setTimeout(function() {
											G.jiframe.attr("src", J.url);
											G.frame = window.frames[G.jiframe
													.attr("name")]
										}, 0)
									}
								}
							}
							if (J.opener) {
								G.dialog.opener = J.opener
							}
							if (J.buttons) {
								B(J.buttons)
										.each(
												function(L, M) {
													var K = B('<div class="l-dialog-btn"><div class="l-dialog-btn-l"></div><div class="l-dialog-btn-r"></div><div class="l-dialog-btn-inner"></div></div>');
													B(".l-dialog-btn-inner", K)
															.html(M.text);
													B(
															".l-dialog-buttons-inner",
															G.dialog.buttons)
															.prepend(K);
													M.width && K.width(M.width);
													M.onclick
															&& K
																	.click(function() {
																		M
																				.onclick(
																						M,
																						G,
																						L)
																	})
												})
							} else {
								G.dialog.buttons.remove()
							}
							B(".l-dialog-buttons-inner", G.dialog.buttons)
									.append("<div class='l-clear'></div>");
							B(".l-dialog-title", G.dialog).bind("selectstart",
									function() {
										return false
									});
							G.dialog.click(function() {
								A.win.setFront(G)
							});
							B(".l-dialog-tc .l-dialog-close", G.dialog).click(
									function() {
										if (J.isHidden) {
											G.hide()
										} else {
											G.close()
										}
									});
							if (!J.fixedType) {
								var I = 0;
								var H = 0;
								var F = J.width || G.dialog.width();
								if (J.slide == true) {
									J.slide = "fast"
								}
								if (J.left != null) {
									I = J.left
								} else {
									J.left = I = 0.5 * (B(window).width() - F)
								}
								if (J.top != null) {
									H = J.top
								} else {
									J.top = H = 0.5
											* (B(window).height() - G.dialog
													.height())
											+ B(window).scrollTop() - 10
								}
								if (I < 0) {
									J.left = I = 0
								}
								if (H < 0) {
									J.top = H = 0
								}
								G.dialog.css({
									left : I,
									top : H
								})
							}
							G.show();
							B("body").bind("keydown.dialog", function(L) {
								var K = L.which;
								if (K == 13) {
									G.enter()
								} else {
									if (K == 27) {
										G.esc()
									}
								}
							});
							G._updateBtnsWidth();
							G._saveStatus();
							G._onReisze()
						},
						_borderX : 12,
						_borderY : 32,
						doMax : function(E) {
							var G = this, J = this.options;
							var F = B(window).width(), D = B(window).height(), I = 0, H = 0;
							if (A.win.taskbar) {
								D -= A.win.taskbar.outerHeight();
								if (A.win.top) {
									H += A.win.taskbar.outerHeight()
								}
							}
							if (E) {
								G.dialog.body.animate({
									width : F - G._borderX
								}, J.slide);
								G.dialog.animate({
									left : I,
									top : H
								}, J.slide);
								G.dialog.content.animate({
									height : D - G._borderY
											- G.dialog.buttons.outerHeight()
								}, J.slide, function() {
									G._onReisze()
								})
							} else {
								G.set({
									width : F,
									height : D,
									left : I,
									top : H
								});
								G._onReisze()
							}
						},
						max : function() {
							var D = this, E = this.options;
							if (D.winmax) {
								D.winmax.addClass("l-dialog-recover");
								D.doMax(E.slide);
								if (D.wintoggle) {
									if (D.wintoggle.hasClass("l-dialog-extend")) {
										D.wintoggle
												.addClass("l-dialog-toggle-disabled l-dialog-extend-disabled")
									} else {
										D.wintoggle
												.addClass("l-dialog-toggle-disabled l-dialog-collapse-disabled")
									}
								}
								if (D.resizable) {
									D.resizable.set({
										disabled : true
									})
								}
								if (D.draggable) {
									D.draggable.set({
										disabled : true
									})
								}
								D.maximum = true;
								B(window).bind("resize.dialogmax", function() {
									D.doMax(false)
								})
							}
						},
						recover : function() {
							var D = this, E = this.options;
							if (D.winmax) {
								D.winmax.removeClass("l-dialog-recover");
								if (E.slide) {
									D.dialog.body.animate({
										width : D._width - D._borderX
									}, E.slide);
									D.dialog.animate({
										left : D._left,
										top : D._top
									}, E.slide);
									D.dialog.content.animate({
										height : D._height
												- D._borderY
												- D.dialog.buttons
														.outerHeight()
									}, E.slide, function() {
										D._onReisze()
									})
								} else {
									D.set({
										width : D._width,
										height : D._height,
										left : D._left,
										top : D._top
									});
									D._onReisze()
								}
								if (D.wintoggle) {
									D.wintoggle
											.removeClass("l-dialog-toggle-disabled l-dialog-extend-disabled l-dialog-collapse-disabled")
								}
								B(window).unbind("resize.dialogmax")
							}
							if (this.resizable) {
								this.resizable.set({
									disabled : false
								})
							}
							if (D.draggable) {
								D.draggable.set({
									disabled : false
								})
							}
							D.maximum = false
						},
						min : function() {
							var E = this, F = this.options;
							var D = A.win.getTask(this);
							if (F.slide) {
								E.dialog.body.animate({
									width : 1
								}, F.slide);
								D.y = D.offset().top + D.height();
								D.x = D.offset().left + D.width() / 2;
								E.dialog.animate({
									left : D.x,
									top : D.y
								}, F.slide, function() {
									E.dialog.hide()
								})
							} else {
								E.dialog.hide()
							}
							E.unmask();
							E.minimize = true;
							E.actived = false
						},
						active : function() {
							var F = this, I = this.options;
							if (F.minimize) {
								var E = F.width == "" ? F._width : F.width, D = F.height == "" ? F._height
										: F.height, H = F._left, G = F._top;
								if (F.maximum) {
									E = B(window).width();
									D = B(window).height();
									H = G = 0;
									if (A.win.taskbar) {
										D -= A.win.taskbar.outerHeight();
										if (A.win.top) {
											G += A.win.taskbar.outerHeight()
										}
									}
								}
								if (I.slide) {
									F.dialog.body.animate({
										width : E - F._borderX
									}, I.slide);
									F.dialog.animate({
										left : H,
										top : G
									}, I.slide)
								} else {
									F.set({
										width : E,
										height : D,
										left : H,
										top : G
									})
								}
							}
							F.actived = true;
							F.minimize = false;
							A.win.setFront(F);
							F.show()
						},
						toggle : function() {
							var D = this, E = this.options;
							if (!D.wintoggle) {
								return
							}
							if (D.wintoggle.hasClass("l-dialog-extend")) {
								D.extend()
							} else {
								D.collapse()
							}
						},
						collapse : function() {
							var D = this, E = this.options;
							if (!D.wintoggle) {
								return
							}
							if (E.slide) {
								D.dialog.content.animate({
									height : 1
								}, E.slide)
							} else {
								D.dialog.content.height(1)
							}
							if (this.resizable) {
								this.resizable.set({
									disabled : true
								})
							}
						},
						extend : function() {
							var E = this, F = this.options;
							if (!E.wintoggle) {
								return
							}
							var D = E._height - E._borderY
									- E.dialog.buttons.outerHeight();
							if (F.slide) {
								E.dialog.content.animate({
									height : D
								}, F.slide)
							} else {
								E.dialog.content.height(D)
							}
							if (this.resizable) {
								this.resizable.set({
									disabled : false
								})
							}
						},
						_updateBtnsWidth : function() {
							var E = this;
							var D = B(">div", E.dialog.winbtns).length;
							E.dialog.winbtns.width(22 * D)
						},
						_setLeft : function(D) {
							if (!this.dialog) {
								return
							}
							if (D != null) {
								this.dialog.css({
									left : D
								})
							}
						},
						_setTop : function(D) {
							if (!this.dialog) {
								return
							}
							if (D != null) {
								this.dialog.css({
									top : D
								})
							}
						},
						_setWidth : function(D) {
							if (!this.dialog) {
								return
							}
							if (D >= this._borderX) {
								this.dialog.body.width(D - this._borderX)
							}
						},
						_setHeight : function(F) {
							var E = this, G = this.options;
							if (!this.dialog) {
								return
							}
							if (F >= this._borderY) {
								var D = F - this._borderY
										- E.dialog.buttons.outerHeight();
								E.dialog.content.height(D)
							}
						},
						_setShowMax : function(E) {
							var D = this, F = this.options;
							if (E) {
								if (!D.winmax) {
									D.winmax = B(
											'<div class="l-dialog-winbtn l-dialog-max"></div>')
											.appendTo(D.dialog.winbtns)
											.hover(
													function() {
														if (B(this)
																.hasClass(
																		"l-dialog-recover")) {
															B(this)
																	.addClass(
																			"l-dialog-recover-over")
														} else {
															B(this)
																	.addClass(
																			"l-dialog-max-over")
														}
													},
													function() {
														B(this)
																.removeClass(
																		"l-dialog-max-over l-dialog-recover-over")
													})
											.click(
													function() {
														if (B(this)
																.hasClass(
																		"l-dialog-recover")) {
															D.recover()
														} else {
															D.max()
														}
													})
								}
							} else {
								if (D.winmax) {
									D.winmax.remove();
									D.winmax = null
								}
							}
							D._updateBtnsWidth()
						},
						_setShowMin : function(E) {
							var D = this, F = this.options;
							if (E) {
								if (!D.winmin) {
									D.winmin = B(
											'<div class="l-dialog-winbtn l-dialog-min"></div>')
											.appendTo(D.dialog.winbtns)
											.hover(
													function() {
														B(this)
																.addClass(
																		"l-dialog-min-over")
													},
													function() {
														B(this)
																.removeClass(
																		"l-dialog-min-over")
													}).click(function() {
												D.min()
											});
									A.win.addTask(D)
								}
							} else {
								if (D.winmin) {
									D.winmin.remove();
									D.winmin = null
								}
							}
							D._updateBtnsWidth()
						},
						_setShowToggle : function(E) {
							var D = this, F = this.options;
							if (E) {
								if (!D.wintoggle) {
									D.wintoggle = B(
											'<div class="l-dialog-winbtn l-dialog-collapse"></div>')
											.appendTo(D.dialog.winbtns)
											.hover(
													function() {
														if (B(this)
																.hasClass(
																		"l-dialog-toggle-disabled")) {
															return
														}
														if (B(this)
																.hasClass(
																		"l-dialog-extend")) {
															B(this)
																	.addClass(
																			"l-dialog-extend-over")
														} else {
															B(this)
																	.addClass(
																			"l-dialog-collapse-over")
														}
													},
													function() {
														B(this)
																.removeClass(
																		"l-dialog-extend-over l-dialog-collapse-over")
													})
											.click(
													function() {
														if (B(this)
																.hasClass(
																		"l-dialog-toggle-disabled")) {
															return
														}
														if (D.wintoggle
																.hasClass("l-dialog-extend")) {
															if (D
																	.trigger("extend") == false) {
																return
															}
															D.wintoggle
																	.removeClass("l-dialog-extend");
															D.extend();
															D
																	.trigger("extended")
														} else {
															if (D
																	.trigger("collapse") == false) {
																return
															}
															D.wintoggle
																	.addClass("l-dialog-extend");
															D.collapse();
															D
																	.trigger("collapseed")
														}
													})
								}
							} else {
								if (D.wintoggle) {
									D.wintoggle.remove();
									D.wintoggle = null
								}
							}
						},
						enter : function() {
							var E = this, F = this.options;
							var D;
							if (F.closeWhenEnter != undefined) {
								D = F.closeWhenEnter
							} else {
								if (F.type == "warn" || F.type == "error"
										|| F.type == "success"
										|| F.type == "question") {
									D = true
								}
							}
							if (D) {
								E.close()
							}
						},
						esc : function() {
						},
						_removeDialog : function() {
							var D = this, E = this.options;
							if (E.showType && E.fixedType) {
								D.dialog.animate({
									bottom : -1 * E.height
								}, function() {
									D.dialog.remove();
									delete A.managers[D.id]
								})
							} else {
								D.dialog.remove();
								delete A.managers[D.id]
							}
						},
						close : function() {
							var D = this, E = this.options;
							if (D.trigger("myBeforeClose", D) == false) {
								return
							}
							A.win.removeTask(this);
							D.unmask();
							D._removeDialog();
							B("body").unbind("keydown.dialog")
						},
						_getVisible : function() {
							return this.dialog.is(":visible")
						},
						_setUrl : function(D) {
							var E = this, F = this.options;
							F.url = D;
							if (F.load) {
							} else {
								if (E.jiframe) {
									E.jiframe.attr("src", F.url)
								}
							}
						},
						_setContent : function(D) {
							this.dialog.content.html(D)
						},
						_setTitle : function(E) {
							var D = this;
							var F = this.options;
							if (E) {
								B(".l-dialog-title", D.dialog).html(E)
							}
						},
						_hideDialog : function() {
							var D = this, E = this.options;
							if (E.showType && E.fixedType) {
								D.dialog.animate({
									bottom : -1 * E.height
								}, function() {
									D.dialog.hide()
								})
							} else {
								D.dialog.hide()
							}
						},
						hidden : function() {
							var D = this;
							A.win.removeTask(D);
							D.dialog.hide();
							D.unmask();
							D.trigger("hidden", D)
						},
						show : function() {
							var D = this, E = this.options;
							D.mask();
							if (E.fixedType) {
								if (E.showType) {
									D.dialog.css({
										bottom : -1 * E.height
									}).addClass("l-dialog-fixed");
									D.dialog.show().animate({
										bottom : 0
									})
								} else {
									D.dialog.show().css({
										bottom : 0
									})
								}
							} else {
								D.dialog.show()
							}
							B.ligerui.win.setFront.ligerDefer(B.ligerui.win,
									100, [ D ]);
							D.trigger("show", D)
						},
						setUrl : function(D) {
							this._setUrl(D)
						},
						_saveStatus : function() {
							var D = this;
							D._width = D.dialog.body.width();
							D._height = D.dialog.body.height();
							var F = 0;
							var E = 0;
							if (!isNaN(parseInt(D.dialog.css("top")))) {
								F = parseInt(D.dialog.css("top"))
							}
							if (!isNaN(parseInt(D.dialog.css("left")))) {
								E = parseInt(D.dialog.css("left"))
							}
							D._top = F;
							D._left = E
						},
						_applyDrag : function() {
							var D = this, E = this.options;
							if (B.fn.ligerDrag) {
								D.draggable = D.dialog
										.ligerDrag({
											handler : ".l-dialog-title",
											animate : false,
											onStartDrag : function() {
												A.win.setFront(D)
											},
											onStopDrag : function() {
												if (E.target) {
													var G = A
															.find(B.ligerui.controls.DateEditor);
													var F = A
															.find(B.ligerui.controls.ComboBox);
													B(B.merge(G, F))
															.each(
																	function() {
																		if (this.updateSelectBoxPosition) {
																			this
																					.updateSelectBoxPosition()
																		}
																	})
												}
												D._saveStatus()
											}
										})
							}
						},
						_onReisze : function() {
							var G = this, H = this.options;
							if (H.target) {
								var E = B(H.target).liger();
								if (!E) {
									E = B(H.target).find(":first").liger()
								}
								if (!E) {
									return
								}
								var F = G.dialog.content.height();
								var D = G.dialog.content.width();
								E.trigger("resize", [ {
									width : D,
									height : F
								} ])
							}
						},
						_applyResize : function() {
							var D = this, E = this.options;
							if (B.fn.ligerResizable) {
								D.resizable = D.dialog
										.ligerResizable({
											onStopResize : function(I, H) {
												var G = 0;
												var F = 0;
												if (!isNaN(parseInt(D.dialog
														.css("top")))) {
													G = parseInt(D.dialog
															.css("top"))
												}
												if (!isNaN(parseInt(D.dialog
														.css("left")))) {
													F = parseInt(D.dialog
															.css("left"))
												}
												if (I.diffLeft) {
													D.set({
														left : F + I.diffLeft
													})
												}
												if (I.diffTop) {
													D.set({
														top : G + I.diffTop
													})
												}
												if (I.newWidth) {
													D.set({
														width : I.newWidth
													});
													D.dialog.body.css({
														width : I.newWidth
																- D._borderX
													})
												}
												if (I.newHeight) {
													D.set({
														height : I.newHeight
													})
												}
												D._onReisze();
												D._saveStatus();
												return false
											},
											animate : false
										})
							}
						},
						_setImage : function() {
							var D = this, E = this.options;
							if (E.type) {
								if (E.type == "success" || E.type == "donne"
										|| E.type == "ok") {
									B(".l-dialog-image", D.dialog).addClass(
											"l-dialog-image-donne").show();
									D.dialog.content.css({
										paddingLeft : 64,
										paddingBottom : 30
									})
								} else {
									if (E.type == "error") {
										B(".l-dialog-image", D.dialog)
												.addClass(
														"l-dialog-image-error")
												.show();
										D.dialog.content.css({
											paddingLeft : 64,
											paddingBottom : 30
										})
									} else {
										if (E.type == "warn") {
											B(".l-dialog-image", D.dialog)
													.addClass(
															"l-dialog-image-warn")
													.show();
											D.dialog.content.css({
												paddingLeft : 64,
												paddingBottom : 30
											})
										} else {
											if (E.type == "question") {
												B(".l-dialog-image", D.dialog)
														.addClass(
																"l-dialog-image-question")
														.show();
												D.dialog.content.css({
													paddingLeft : 64,
													paddingBottom : 40
												})
											}
										}
									}
								}
							}
						}
					});
	A.controls.Dialog.prototype.hide = A.controls.Dialog.prototype.hidden;
	B.ligerDialog.open = function(D) {
		return B.ligerDialog(D)
	};
	B.ligerDialog.close = function() {
		var E = A.find(A.controls.Dialog.prototype.__getType());
		for ( var D in E) {
			var F = E[D];
			F.destroy.ligerDefer(F, 5)
		}
		A.win.unmask()
	};
	B.ligerDialog.show = function(F) {
		var E = A.find(A.controls.Dialog.prototype.__getType());
		if (E.length) {
			for ( var D in E) {
				E[D].show();
				return
			}
		}
		return B.ligerDialog(F)
	};
	B.ligerDialog.hide = function() {
		var E = A.find(A.controls.Dialog.prototype.__getType());
		for ( var D in E) {
			var F = E[D];
			F.hide()
		}
	};
	B.ligerDialog.tip = function(D) {
		D = B.extend({
			showType : "slide",
			width : 240,
			modal : false,
			height : 100
		}, D || {});
		B.extend(D, {
			fixedType : "se",
			type : "none",
			isDrag : false,
			isResize : false,
			showMax : false,
			showToggle : false,
			showMin : false
		});
		return B.ligerDialog.open(D)
	};
	B.ligerDialog.alert = function(F, G, E, H) {
		F = F || "";
		if (typeof (G) == "function") {
			H = G;
			E = null
		} else {
			if (typeof (E) == "function") {
				H = E
			}
		}
		var D = function(K, I, J) {
			I.close();
			if (H) {
				H(K, I, J)
			}
		};
		p = {
			content : F,
			buttons : [ {
				text : B.ligerDefaults.DialogString.ok,
				onclick : D
			} ]
		};
		if (typeof (G) == "string" && G != "") {
			p.title = G
		}
		if (typeof (E) == "string" && E != "") {
			p.type = E
		}
		B.extend(p, {
			showMax : false,
			showToggle : false,
			showMin : false
		});
		return B.ligerDialog(p)
	};
	B.ligerDialog.confirm = function(E, F, G) {
		if (typeof (F) == "function") {
			G = F;
			type = null
		}
		var D = function(I, H) {
			H.close();
			if (G) {
				G(I.type == "ok")
			}
		};
		p = {
			type : "question",
			content : E,
			buttons : [ {
				text : B.ligerDefaults.DialogString.yes,
				onclick : D,
				type : "ok"
			}, {
				text : B.ligerDefaults.DialogString.no,
				onclick : D,
				type : "no"
			} ]
		};
		if (typeof (F) == "string" && F != "") {
			p.title = F
		}
		B.extend(p, {
			showMax : false,
			showToggle : false,
			showMin : false
		});
		return B.ligerDialog(p)
	};
	B.ligerDialog.warning = function(E, F, G) {
		if (typeof (F) == "function") {
			G = F;
			type = null
		}
		var D = function(I, H) {
			H.close();
			if (G) {
				G(I.type)
			}
		};
		p = {
			type : "question",
			content : E,
			buttons : [ {
				text : B.ligerDefaults.DialogString.yes,
				onclick : D,
				type : "yes"
			}, {
				text : B.ligerDefaults.DialogString.no,
				onclick : D,
				type : "no"
			}, {
				text : B.ligerDefaults.DialogString.cancel,
				onclick : D,
				type : "cancel"
			} ]
		};
		if (typeof (F) == "string" && F != "") {
			p.title = F
		}
		B.extend(p, {
			showMax : false,
			showToggle : false,
			showMin : false
		});
		return B.ligerDialog(p)
	};
	
	// 添加自定义警告提示框
	// May 7, 2014 11:32:50 AM, Edited by HlLian
	// Y ：Yes 对应的按钮名称，N ：No对应的按钮名称
	// Edit Start Position
	B.ligerDialog.warningUDF = function(E, Y, N, F, G) {
		if (typeof (F) == "function") {
			G = F;
			type = null
		}
		var D = function(I, H) {
			H.close();
			if (G) {
				G(I.type)
			}
		};
		p = {
			type : "question",
			content : E,
			buttons : [ {
				text : Y,
				onclick : D,
				type : "yes"
			}, {
				text : N,
				onclick : D,
				type : "no"
			}, {
				text : B.ligerDefaults.DialogString.cancel,
				onclick : D,
				type : "cancel"
			} ]
		};
		if (typeof (F) == "string" && F != "") {
			p.title = F
		}
		B.extend(p, {
			showMax : false,
			showToggle : false,
			showMin : false
		});
		return B.ligerDialog(p)
	};
	// Edit End Position
	
	B.ligerDialog.waitting = function(D) {
		D = D || B.ligerDefaults.Dialog.waittingMessage;
		return B.ligerDialog.open({
			cls : "l-dialog-waittingdialog",
			type : "none",
			content : '<div style="padding:4px">' + D + "</div>",
			allowClose : false
		})
	};
	B.ligerDialog.closeWaitting = function() {
		var E = A.find(A.controls.Dialog);
		for ( var D in E) {
			var F = E[D];
			if (F.dialog.hasClass("l-dialog-waittingdialog")) {
				F.close()
			}
		}
	};
	B.ligerDialog.success = function(E, F, D) {
		return B.ligerDialog.alert(E, F, "success", D)
	};
	B.ligerDialog.error = function(E, F, D) {
		return B.ligerDialog.alert(E, F, "error", D)
	};
	B.ligerDialog.warn = function(E, F, D) {
		return B.ligerDialog.alert(E, F, "warn", D)
	};
	B.ligerDialog.question = function(D, E) {
		return B.ligerDialog.alert(D, E, "question")
	};
	B.ligerDialog.prompt = function(H, E, G, I) {
		var F = B('<input type="text" class="l-dialog-inputtext"/>');
		if (typeof (G) == "function") {
			I = G
		}
		if (typeof (E) == "function") {
			I = E
		} else {
			if (typeof (E) == "boolean") {
				G = E
			}
		}
		if (typeof (G) == "boolean" && G) {
			F = B('<textarea class="l-dialog-textarea"></textarea>')
		}
		if (typeof (E) == "string" || typeof (E) == "int") {
			F.val(E)
		}
		var D = function(L, J, K) {
			J.close();
			if (I) {
				I(L.type == "yes", F.val())
			}
		};
		p = {
			title : H,
			target : F,
			width : 320,
			buttons : [ {
				text : B.ligerDefaults.DialogString.ok,
				onclick : D,
				type : "yes"
			}, {
				text : B.ligerDefaults.DialogString.cancel,
				onclick : D,
				type : "cancel"
			} ]
		};
		return B.ligerDialog(p)
	}
})(jQuery);
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
		allowTopResize : true,
		allowBottomResize : true,
		space : 3,
		onEndResize : null,
		minLeftWidth : 80,
		minRightWidth : 80
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
												'<div class="l-layout-top" style="top:0px;"></div>')
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
												'<div class="l-layout-bottom"></div>')
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
								var D = F.bottom.content.attr("title");
								if (D) {
									F.bottom.header = A('<div class="l-layout-header"></div>');
									F.bottom.prepend(F.bottom.header);
									F.bottom.header.html(D);
									F.bottom.content.attr("title", "")
								}
							}
							if (A("> div[position=left]", F.layout).length > 0) {
								F.left = A("> div[position=left]", F.layout)
										.wrap(
												'<div class="l-layout-left" style="left:0px;"></div>')
										.parent();
								F.left.header = A('<div class="l-layout-header"><div class="l-layout-header-toggle"></div><div class="l-layout-header-inner"></div></div>');
								F.left.prepend(F.left.header);
								F.left.header.toggle = A(
										".l-layout-header-toggle",
										F.left.header);
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
								var E = F.left.content.attr("title");
								if (E) {
									F.left.content.attr("title", "");
									A(".l-layout-header-inner", F.left.header)
											.html(E)
								}
								F.leftWidth = H.leftWidth;
								if (F.leftWidth) {
									F.left.width(F.leftWidth)
								}
							}
							if (A("> div[position=center]", F.layout).length > 0) {
								F.center = A("> div[position=center]", F.layout)
										.wrap(
												'<div class="l-layout-center" ></div>')
										.parent();
								F.center.content = A("> div[position=center]",
										F.center);
								F.center.content.addClass("l-layout-content");
								var C = F.center.content.attr("title");
								if (C) {
									F.center.content.attr("title", "");
									F.center.header = A('<div class="l-layout-header"></div>');
									F.center.prepend(F.center.header);
									F.center.header.html(C)
								}
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
								F.right.header = A('<div class="l-layout-header"><div class="l-layout-header-toggle"></div><div class="l-layout-header-inner"></div></div>');
								F.right.prepend(F.right.header);
								F.right.header.toggle = A(
										".l-layout-header-toggle",
										F.right.header);
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
								var G = F.right.content.attr("title");
								if (G) {
									F.right.content.attr("title", "");
									A(".l-layout-header-inner", F.right.header)
											.html(G)
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
								F._onResize()
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
							A(
									"> .l-layout-left .l-layout-header,> .l-layout-right .l-layout-header",
									C.layout).hover(function() {
								A(this).addClass("l-layout-header-over")
							}, function() {
								A(this).removeClass("l-layout-header-over")
							});
							A(".l-layout-header-toggle", C.layout).hover(
									function() {
										A(this).addClass(
												"l-layout-header-toggle-over")
									},
									function() {
										A(this).removeClass(
												"l-layout-header-toggle-over")
									});
							A(".l-layout-header-toggle", C.left).click(
									function() {
										C.setLeftCollapse(true)
									});
							A(".l-layout-header-toggle", C.right).click(
									function() {
										C.setRightCollapse(true)
									});
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
							if (C.left && D.allowLeftResize) {
								C.leftDropHandle = A("<div class='l-layout-drophandle-left'></div>");
								C.layout.append(C.leftDropHandle);
								C.leftDropHandle && C.leftDropHandle.show();
								C.leftDropHandle.mousedown(function(E) {
									C._start("leftresize", E)
								})
							}
							if (C.right && D.allowRightResize) {
								C.rightDropHandle = A("<div class='l-layout-drophandle-right'></div>");
								C.layout.append(C.rightDropHandle);
								C.rightDropHandle && C.rightDropHandle.show();
								C.rightDropHandle.mousedown(function(E) {
									C._start("rightresize", E)
								})
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
// B++;
// if (B > 10) {
// return
// }
							var H = this, I = this.options;
							var C = H.layout.height();
							var F = 0;
							var J = A(window).height();
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
							H.middleHeight -= 2;
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
								H.left.height(H.middleHeight)
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
							if (A.browser.msie || A.browser.safari) {
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
							if (A.browser.msie || A.browser.safari) {
								A("body").unbind("selectstart")
							}
							A(document).unbind("mousemove", C._drag);
							A(document).unbind("mouseup", C._stop);
							A("body").css("cursor", "")
						}
					})
})(jQuery);
(function(A) {
	A.fn.ligerTextBox = function() {
		return A.ligerui.run.call(this, "ligerTextBox", arguments)
	};
	A.fn.ligerGetTextBoxManager = function() {
		return A.ligerui.run.call(this, "ligerGetTextBoxManager", arguments)
	};
	A.ligerDefaults.TextBox = {
		onChangeValue : null,
		width : null,
		disabled : false,
		value : null,
		nullText : null,
		digits : false,
		number : false
	};
	A.ligerui.controls.TextBox = function(C, B) {
		A.ligerui.controls.TextBox.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.TextBox
			.ligerExtend(
					A.ligerui.controls.Input,
					{
						__getType : function() {
							return "TextBox"
						},
						__idPrev : function() {
							return "TextBox"
						},
						_init : function() {
							A.ligerui.controls.TextBox.base._init.call(this);
							var B = this, C = this.options;
							if (!C.width) {
								C.width = A(B.element).width()
							}
							if (A(this.element).attr("readonly")) {
								C.disabled = true
							}
						},
						_render : function() {
							var B = this, C = this.options;
							B.inputText = A(this.element);
							B.wrapper = B.inputText.wrap(
									'<div class="l-text"></div>').parent();
							B.wrapper
									.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
							if (!B.inputText.hasClass("l-text-field")) {
								B.inputText.addClass("l-text-field")
							}
							this._setEvent();
							B.set(C);
							B.checkValue()
						},
						_getValue : function() {
							return this.inputText.val()
						},
						_setNullText : function() {
							this.checkNotNull()
						},
						checkValue : function() {
							var C = this, D = this.options;
							var B = C.inputText.val();
							if (D.number
									&& !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
											.test(B) || D.digits
									&& !/^\d+$/.test(B)) {
								C.inputText.val(C.value || 0);
								return
							}
							C.value = B
						},
						checkNotNull : function() {
							var B = this, C = this.options;
							if (C.nullText && !C.disabled) {
								if (!B.inputText.val()) {
									B.inputText.addClass("l-text-field-null")
											.val(C.nullText)
								}
							}
						},
						_setEvent : function() {
							var B = this, C = this.options;
							B.inputText.bind("blur.textBox", function() {
								B.trigger("blur");
								B.checkNotNull();
								B.checkValue();
								B.wrapper.removeClass("l-text-focus")
							}).bind(
									"focus.textBox",
									function() {
										B.trigger("focus");
										if (C.nullText) {
											if (A(this).hasClass(
													"l-text-field-null"))
												A(this).removeClass(
												"l-text-field-null").val("");;
											
										}
										B.wrapper.addClass("l-text-focus")
									}).change(function() {
								B.trigger("changeValue", [ this.value ])
							});
							B.wrapper.hover(function() {
								B.trigger("mouseOver");
								B.wrapper.addClass("l-text-over")
							}, function() {
								B.trigger("mouseOut");
								B.wrapper.removeClass("l-text-over")
							})
						},
						_setDisabled : function(B) {
							if (B) {
								this.inputText.attr("readonly", "readonly");
								this.wrapper.addClass("l-text-disabled")
							} else {
								this.inputText.removeAttr("readonly");
								this.wrapper.removeClass("l-text-disabled")
							}
						},
						_setWidth : function(B) {
							if (B > 20) {
								this.wrapper.css({
									width : B
								});
								this.inputText.css({
									width : B - 4
								})
							}
						},
						_setHeight : function(B) {
							if (B > 10) {
								this.wrapper.height(B);
								this.inputText.height(B - 2)
							}
						},
						_setValue : function(B) {
							if (B != null) {
								this.inputText.val(B)
							}
						},
						_setLabel : function(D) {
							var C = this, E = this.options;
							if (!C.labelwrapper) {
								C.labelwrapper = C.wrapper.wrap(
										'<div class="l-labeltext"></div>')
										.parent();
								var B = A('<div class="l-text-label" style="float:left;">'
										+ D + ":&nbsp</div>");
								C.labelwrapper.prepend(B);
								C.wrapper.css("float", "left");
								if (!E.labelWidth) {
									E.labelWidth = B.width()
								} else {
									C._setLabelWidth(E.labelWidth)
								}
								B.height(C.wrapper.height());
								if (E.labelAlign) {
									C._setLabelAlign(E.labelAlign)
								}
								C.labelwrapper
										.append('<br style="clear:both;" />');
								C.labelwrapper
										.width(E.labelWidth + E.width + 2)
							} else {
								C.labelwrapper.find(".l-text-label").html(
										D + ":&nbsp")
							}
						},
						_setLabelWidth : function(C) {
							var B = this, D = this.options;
							if (!B.labelwrapper) {
								return
							}
							B.labelwrapper.find(".l-text-label").width(C)
						},
						_setLabelAlign : function(C) {
							var B = this, D = this.options;
							if (!B.labelwrapper) {
								return
							}
							B.labelwrapper.find(".l-text-label").css(
									"text-align", C)
						},
						updateStyle : function() {
							var B = this, C = this.options;
							if (B.inputText.attr("disabled")
									|| B.inputText.attr("readonly")) {
								B.wrapper.addClass("l-text-disabled");
								B.options.disabled = true
							} else {
								B.wrapper.removeClass("l-text-disabled");
								B.options.disabled = false
							}
							if (B.inputText.hasClass("l-text-field-null")
									&& B.inputText.val() != C.nullText) {
								B.inputText.removeClass("l-text-field-null")
							}
							B.checkValue()
						}
					})
})(jQuery);
(function(A) {
	A.fn.ligerCheckBox = function(B) {
		return A.ligerui.run.call(this, "ligerCheckBox", arguments)
	};
	A.fn.ligerGetCheckBoxManager = function() {
		return A.ligerui.run.call(this, "ligerGetCheckBoxManager", arguments)
	};
	A.ligerDefaults.CheckBox = {
		disabled : false
	};
	A.ligerMethos.CheckBox = {};
	A.ligerui.controls.CheckBox = function(C, B) {
		A.ligerui.controls.CheckBox.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.CheckBox.ligerExtend(A.ligerui.controls.Input, {
		__getType : function() {
			return "CheckBox"
		},
		__idPrev : function() {
			return "CheckBox"
		},
		_extendMethods : function() {
			return A.ligerMethos.CheckBox
		},
		_render : function() {
			var B = this, C = this.options;
			B.input = A(B.element);
			B.link = A('<a class="l-checkbox"></a>');
			B.wrapper = B.input.addClass("l-hidden").wrap(
					'<div class="l-checkbox-wrapper"></div>').parent();
			B.wrapper.prepend(B.link);
			B.link.click(function() {
				if (B.input.attr("disabled")) {
					return false
				}
				if (C.disabled) {
					return false
				}
				if (B.trigger("beforeClick", [ B.element ]) == false) {
					return false
				}
				if (A(this).hasClass("l-checkbox-checked")) {
					B._setValue(false)
				} else {
					B._setValue(true)
				}
				B.input.trigger("change")
			});
			B.wrapper.hover(function() {
				if (!C.disabled) {
					A(this).addClass("l-over")
				}
			}, function() {
				A(this).removeClass("l-over")
			});
			this.set(C);
			this.updateStyle()
		},
		_setCss : function(B) {
			this.wrapper.css(B)
		},
		_setValue : function(C) {
			var B = this, D = this.options;
			if (!C) {
				B.input[0].checked = false;
				B.link.removeClass("l-checkbox-checked")
			} else {
				B.input[0].checked = true;
				B.link.addClass("l-checkbox-checked")
			}
		},
		_setDisabled : function(B) {
			if (B) {
				this.input.attr("disabled", true);
				this.wrapper.addClass("l-disabled")
			} else {
				this.input.attr("disabled", false);
				this.wrapper.removeClass("l-disabled")
			}
		},
		_getValue : function() {
			return this.element.checked
		},
		updateStyle : function() {
			if (this.input.attr("disabled")) {
				this.wrapper.addClass("l-disabled");
				this.options.disabled = true
			}
			if (this.input[0].checked) {
				this.link.addClass("l-checkbox-checked")
			} else {
				this.link.removeClass("l-checkbox-checked")
			}
		}
	})
})(jQuery);
(function(A) {
	A.fn.ligerComboBox = function(B) {
		return A.ligerui.run.call(this, "ligerComboBox", arguments)
	};
	A.fn.ligerGetComboBoxManager = function() {
		return A.ligerui.run.call(this, "ligerGetComboBoxManager", arguments)
	};
	A.ligerDefaults.ComboBox = {
		resize : true,
		isMultiSelect : false,
		isShowCheckBox : false,
		columns : false,
		selectBoxWidth : false,
		selectBoxHeight : false,
		onBeforeSelect : false,
		onSelected : null,
		initValue : null,
		initText : null,
		valueField : "id",
		textField : "text",
		valueFieldID : null,
		slide : true,
		split : ";",
		data : null,
		tree : null,
		treeLeafOnly : true,
		grid : null,
		onStartResize : null,
		onEndResize : null,
		hideOnLoseFocus : true,
		url : null,
		onSuccess : null,
		onError : null,
		onBeforeOpen : null,
		render : null,
		absolute : true
	};
	A.ligerMethos.ComboBox = A.ligerMethos.ComboBox || {};
	A.ligerui.controls.ComboBox = function(C, B) {
		A.ligerui.controls.ComboBox.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.ComboBox
			.ligerExtend(
					A.ligerui.controls.Input,
					{
						__getType : function() {
							return "ComboBox"
						},
						_extendMethods : function() {
							return A.ligerMethos.ComboBox
						},
						_init : function() {
							A.ligerui.controls.ComboBox.base._init.call(this);
							var B = this.options;
							if (B.columns) {
								B.isShowCheckBox = true
							}
							if (B.isMultiSelect) {
								B.isShowCheckBox = true
							}
						},
						_render : function() {
							var B = this, C = this.options;
							B.data = C.data;
							B.inputText = null;
							B.select = null;
							B.textFieldID = "";
							B.valueFieldID = "";
							B.valueField = null;
							if (this.element.tagName.toLowerCase() == "input") {
								this.element.readOnly = true;
								B.inputText = A(this.element);
								B.textFieldID = this.element.id
							} else {
								if (this.element.tagName.toLowerCase() == "select") {
									A(this.element).hide();
									B.select = A(this.element);
									C.isMultiSelect = false;
									C.isShowCheckBox = false;
									B.textFieldID = this.element.id + "_txt";
									B.inputText = A('<input type="text" readonly="true"/>');
									B.inputText.attr("id", B.textFieldID)
											.insertAfter(A(this.element))
								} else {
									return
								}
							}
							if (B.inputText[0].name == undefined) {
								B.inputText[0].name = B.textFieldID
							}
							B.valueField = null;
							if (C.valueFieldID) {
								if (C.valueFieldID != ""
										&& C.valueFieldID != null) {
									B.valueField = A("#" + C.prefixID
											+ C.valueFieldID + ":input")
								} else {
									B.valueField = A("#" + C.valueFieldID
											+ ":input")
								}
								if (B.valueField.length == 0) {
									B.valueField = A('<input type="hidden"/>');
									B.valueField[0].id = B.valueField[0].name = C.valueFieldID
								}
							} else {
								B.valueField = A('<input type="hidden"/>');
								B.valueField[0].id = B.valueField[0].name = B.textFieldID
										+ "_val"
							}
							if (B.valueField[0].name == undefined) {
								B.valueField[0].name = B.valueField[0].id
							}
							B.link = A('<div class="l-trigger"><div class="l-trigger-icon"></div></div>');
							B.selectBox = A('<div class="l-box-select"><div class="l-box-select-inner"><table cellpadding="0" cellspacing="0" border="0" class="l-box-select-table" style="font-size:inherit;"></table></div></div>');
							B.selectBox.table = A("table:first", B.selectBox);
							B.wrapper = B.inputText
									.wrap(
											'<div class="l-text l-text-combobox"></div>')
									.parent();
							B.wrapper
									.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
							B.wrapper.append(B.link);
							B.textwrapper = B.wrapper.wrap(
									'<div class="l-text-wrapper"></div>')
									.parent();
							if (C.absolute) {
								B.selectBox.appendTo("body").addClass(
										"l-box-select-absolute")
							} else {
								B.textwrapper.append(B.selectBox)
							}
							B.textwrapper.append(B.valueField);
							B.inputText.addClass("l-text-field");
							if (C.isShowCheckBox && !B.select) {
								A("table", B.selectBox).addClass(
										"l-table-checkbox")
							} else {
								C.isShowCheckBox = false;
								A("table", B.selectBox).addClass(
										"l-table-nocheckbox")
							}
							B.link.hover(function() {
								if (C.disabled) {
									return
								}
								this.className = "l-trigger-hover"
							}, function() {
								if (C.disabled) {
									return
								}
								this.className = "l-trigger"
							}).mousedown(function() {
								if (C.disabled) {
									return
								}
								this.className = "l-trigger-pressed"
							}).mouseup(function() {
								if (C.disabled) {
									return
								}
								this.className = "l-trigger-hover"
							}).click(function() {
								if (C.disabled) {
									return
								}
								if (B.trigger("beforeOpen") == false) {
									return false
								}
								B._toggleSelectBox(B.selectBox.is(":visible"))
							});
							B.inputText.click(function() {
								if (C.disabled) {
									return
								}
								if (B.trigger("beforeOpen") == false) {
									return false
								}
								B._toggleSelectBox(B.selectBox.is(":visible"))
							}).blur(function() {
								if (C.disabled) {
									return
								}
								B.wrapper.removeClass("l-text-focus")
							}).focus(function() {
								if (C.disabled) {
									return
								}
								B.wrapper.addClass("l-text-focus")
							});
							B.wrapper.hover(function() {
								if (C.disabled) {
									return
								}
								B.wrapper.addClass("l-text-over")
							}, function() {
								if (C.disabled) {
									return
								}
								B.wrapper.removeClass("l-text-over")
							});
							B.resizing = false;
							B.selectBox.hover(null, function(E) {
								if (C.hideOnLoseFocus
										&& B.selectBox.is(":visible")
										&& !B.boxToggling && !B.resizing) {
									B._toggleSelectBox(true)
								}
							});
							var D = A("tr", B.selectBox.table).length;
							if (!C.selectBoxHeight && D < 8) {
								C.selectBoxHeight = D * 30
							}
							if (C.selectBoxHeight) {
								B.selectBox.height(C.selectBoxHeight)
							}
							B.bulidContent();
							B.set(C);
							if (C.selectBoxWidth) {
								B.selectBox.width(C.selectBoxWidth)
							} else {
								B.selectBox
										.css("width", B.wrapper.css("width"))
							}
						},
						destroy : function() {
							if (this.wrapper) {
								this.wrapper.remove()
							}
							if (this.selectBox) {
								this.selectBox.remove()
							}
							this.options = null;
							A.ligerui.remove(this)
						},
						_setDisabled : function(B) {
							if (B) {
								this.wrapper.addClass("l-text-disabled")
							} else {
								this.wrapper.removeClass("l-text-disabled")
							}
						},
						_setLable : function(B) {
							var C = this, D = this.options;
							if (B) {
								if (C.labelwrapper) {
									C.labelwrapper.find(".l-text-label:first")
											.html(B + ":&nbsp")
								} else {
									C.labelwrapper = C.textwrapper.wrap(
											'<div class="l-labeltext"></div>')
											.parent();
									C.labelwrapper
											.prepend('<div class="l-text-label" style="float:left;display:inline;">'
													+ B + ":&nbsp</div>");
									C.textwrapper.css("float", "left")
								}
								if (!D.labelWidth) {
									D.labelWidth = A(".l-text-label",
											C.labelwrapper).outerWidth()
								} else {
									A(".l-text-label", C.labelwrapper)
											.outerWidth(D.labelWidth)
								}
								A(".l-text-label", C.labelwrapper).width(
										D.labelWidth);
								A(".l-text-label", C.labelwrapper).height(
										C.wrapper.height());
								C.labelwrapper
										.append('<br style="clear:both;" />');
								if (D.labelAlign) {
									A(".l-text-label", C.labelwrapper).css(
											"text-align", D.labelAlign)
								}
								C.textwrapper.css({
									display : "inline"
								});
								C.labelwrapper.width(C.wrapper.outerWidth()
										+ D.labelWidth + 2)
							}
						},
						_setWidth : function(C) {
							var B = this;
							if (C > 20) {
								B.wrapper.css({
									width : C
								});
								B.inputText.css({
									width : C - 20
								});
								B.textwrapper.css({
									width : C
								})
							}
						},
						_setHeight : function(C) {
							var B = this;
							if (C > 10) {
								B.wrapper.height(C);
								B.inputText.height(C - 2);
								B.link.height(C - 4);
								B.textwrapper.css({
									width : C
								})
							}
						},
						_setResize : function(B) {
							if (B && A.fn.ligerResizable) {
								var C = this;
								C.selectBox.ligerResizable({
									handles : "se,s,e",
									onStartResize : function() {
										C.resizing = true;
										C.trigger("startResize")
									},
									onEndResize : function() {
										C.resizing = false;
										if (C.trigger("endResize") == false) {
											return false
										}
									}
								});
								C.selectBox
										.append("<div class='l-btn-nw-drop'></div>")
							}
						},
						findTextByValue : function(E) {
							var B = this, F = this.options;
							if (E == undefined) {
								return ""
							}
							var D = "";
							var C = function(I) {
								var G = E.toString().split(F.split);
								for ( var H = 0; H < G.length; H++) {
									if (G[H] == I) {
										return true
									}
								}
								return false
							};
							A(B.data).each(function(H, I) {
								var J = I[F.valueField];
								var G = I[F.textField];
								if (C(J)) {
									D += G + F.split
								}
							});
							if (D.length > 0) {
								D = D.substr(0, D.length - 1)
							}
							return D
						},
						findValueByText : function(F) {
							var C = this, E = this.options;
							if (!F && F == "") {
								return ""
							}
							var D = function(I) {
								var G = F.toString().split(E.split);
								for ( var H = 0; H < G.length; H++) {
									if (G[H] == I) {
										return true
									}
								}
								return false
							};
							var B = "";
							A(C.data).each(function(H, I) {
								var J = I[E.valueField];
								var G = I[E.textField];
								if (D(G)) {
									B += J + E.split
								}
							});
							if (B.length > 0) {
								B = B.substr(0, B.length - 1)
							}
							return B
						},
						removeItem : function() {
						},
						insertItem : function() {
						},
						addItem : function() {
						},
						_setValue : function(E) {
							var D = this, F = this.options;
							var G = D.findTextByValue(E);
							if (F.tree) {
								D.selectValueByTree(E)
							} else {
								if (!F.isMultiSelect) {
									D._changeValue(E, G);
									A("tr[value=" + E + "] td", D.selectBox)
											.addClass("l-selected");
									A("tr[value!=" + E + "] td", D.selectBox)
											.removeClass("l-selected")
								} else {
									D._changeValue(E, G);
									var B = E.toString().split(F.split);
									A("table.l-table-checkbox :checkbox",
											D.selectBox).each(function() {
										this.checked = false
									});
									for ( var C = 0; C < B.length; C++) {
										A(
												"table.l-table-checkbox tr[value="
														+ B[C] + "] :checkbox",
												D.selectBox).each(function() {
											this.checked = true
										})
									}
								}
							}
						},
						selectValue : function(B) {
							this._setValue(B);
						},
						bulidContent : function() {
							var B = this, C = this.options;
							this.clearContent();
							if (B.select) {
								B.setSelect();
							} else {
								if (B.data) {
									B.setData(B.data);
								} else {
									if (C.tree) {
										B.setTree(C.tree);
									} else {
										if (C.grid) {
											B.setGrid(C.grid);
										} else {
											if (C.url) {
												A.ajax({
															type : "post",
															url : C.url,
															cache : false,
															dataType : "json",
															success : function(
																	E) {
																B.data = [ 
// 不添加“请选择”选项
// {
// id : "",
// text : "请选择"
// }
																           ];
																for ( var D = 0; D < E.ret_data.length; D++) {
																	B.data
																			.push(E.ret_data[D])
																}
																B
																		.setData(B.data);
																B
																		.trigger(
																				"success",
																				[ B.data ])
															},
															error : function(D,
																	E) {
																B
																		.trigger(
																				"error",
																				[
																						D,
																						E ])
															}
														})
											}
										}
									}
								}
							}
						},
						clearContent : function() {
							var B = this, C = this.options;
							A("table", B.selectBox).html("");
							B.inputText.val("");
							B.valueField.val("")
						},
						setSelect : function() {
							var B = this, C = this.options;
							this.clearContent();
							A("option", B.select).each(
									function(E) {
										var G = A(this).val();
										var D = A(this).html();
										var F = A("<tr><td index='" + E
												+ "' value='" + G + "'>" + D
												+ "</td>");
										A("table.l-table-nocheckbox",
												B.selectBox).append(F);
										A("td", F).hover(function() {
											A(this).addClass("l-over")
										}, function() {
											A(this).removeClass("l-over")
										})
									});
							A("td:eq(" + B.select[0].selectedIndex + ")",
									B.selectBox)
									.each(
											function() {
												if (A(this).hasClass(
														"l-selected")) {
													B.selectBox.hide();
													return
												}
												A(".l-selected", B.selectBox)
														.removeClass(
																"l-selected");
												A(this).addClass("l-selected");
												if (B.select[0].selectedIndex != A(
														this).attr("index")
														&& B.select[0].onchange) {
													B.select[0].selectedIndex = A(
															this).attr("index");
													B.select[0].onchange()
												}
												var D = parseInt(A(this).attr(
														"index"));
												B.select[0].selectedIndex = D;
												B.select.trigger("change");
												B.selectBox.hide();
												var E = A(this).attr("value");
												var F = A(this).html();
												if (C.render) {
													B.inputText.val(C.render(E,
															F))
												} else {
													B.inputText.val(F)
												}
											});
							B._addClickEven()
						},
						setData : function(E) {
							var H = this, B = this.options;
							this.clearContent();
							if (!E || !E.length) {
								return
							}
							if (H.data != E) {
								H.data = E
							}
							if (B.columns) {
								H.selectBox.table.headrow = A("<tr class='l-table-headerow'><td width='18px'></td></tr>");
								H.selectBox.table
										.append(H.selectBox.table.headrow);
								H.selectBox.table.addClass("l-box-select-grid");
								for ( var D = 0; D < B.columns.length; D++) {
									var J = A("<td columnindex='" + D
											+ "' columnname='"
											+ B.columns[D].name + "'>"
											+ B.columns[D].header + "</td>");
									if (B.columns[D].width) {
										J.width(B.columns[D].width)
									}
									H.selectBox.table.headrow.append(J)
								}
							}
							for ( var F = 0; F < E.length; F++) {
								var C = E[F][B.valueField];
								var G = E[F][B.textField];
								if (!B.columns) {
									A("table.l-table-checkbox", H.selectBox)
											.append(
													"<tr value='"
															+ C
															+ "'><td style='width:18px;'  index='"
															+ F
															+ "' value='"
															+ C
															+ "' text='"
															+ G
															+ "' ><input type='checkbox' /></td><td index='"
															+ F + "' value='"
															+ C
															+ "' align='left'>"
															+ G + "</td>");
									A("table.l-table-nocheckbox", H.selectBox)
											.append(
													"<tr value='" + C
															+ "'><td index='"
															+ F + "' value='"
															+ C
															+ "' align='left'>"
															+ G + "</td>")
								} else {
									var I = A("<tr value='"
											+ C
											+ "'><td style='width:18px;'  index='"
											+ F
											+ "' value='"
											+ C
											+ "' text='"
											+ G
											+ "' ><input type='checkbox' /></td></tr>");
									A("td", H.selectBox.table.headrow).each(
											function() {
												var K = A(this).attr(
														"columnname");
												if (K) {
													var L = A("<td>" + E[F][K]
															+ "</td>");
													I.append(L)
												}
											});
									H.selectBox.table.append(I)
								}
							}
							if (B.isShowCheckBox && A.fn.ligerCheckBox) {
								A("table input:checkbox", H.selectBox)
										.ligerCheckBox()
							}
							A(".l-table-checkbox input:checkbox", H.selectBox)
									.change(
											function() {
												if (this.checked
														&& H
																.hasBind("beforeSelect")) {
													var K = null;
													if (A(this).parent().get(0).tagName
															.toLowerCase() == "div") {
														K = A(this).parent()
																.parent()
													} else {
														K = A(this).parent()
													}
													if (K != null
															&& H
																	.trigger(
																			"beforeSelect",
																			[
																					K
																							.attr("value"),
																					K
																							.attr("text") ]) == false) {
														H.selectBox
																.slideToggle("fast");
														return false
													}
												}
												if (!B.isMultiSelect) {
													if (this.checked) {
														A("input:checked",
																H.selectBox)
																.not(this)
																.each(
																		function() {
																			this.checked = false;
																			A(
																					".l-checkbox-checked",
																					A(
																							this)
																							.parent())
																					.removeClass(
																							"l-checkbox-checked")
																		});
														H.selectBox
																.slideToggle("fast")
													}
												}
												H._checkboxUpdateValue()
											});
							A("table.l-table-nocheckbox td", H.selectBox)
									.hover(function() {
										A(this).addClass("l-over")
									}, function() {
										A(this).removeClass("l-over")
									});
							H._addClickEven();
							H._dataInit()
						},
						setTree : function(B) {
							var C = this, D = this.options;
							this.clearContent();
							C.selectBox.table.remove();
							if (B.checkbox != false) {
								B.onCheck = function() {
									var E = C.treeManager.getChecked();
									var F = [];
									var G = [];
									A(E).each(function(H, I) {
										if (D.treeLeafOnly && I.data.children) {
											return
										}
										F.push(I.data[D.valueField]);
										G.push(I.data[D.textField])
									});
									C._changeValue(F.join(D.split), G
											.join(D.split))
								}
							} else {
								B.onSelect = function(E) {
									if (D.treeLeafOnly && E.data.children) {
										return
									}
									var F = E.data[D.valueField];
									var G = E.data[D.textField];
									C._changeValue(F, G)
								};
								B.onCancelSelect = function(E) {
									C._changeValue("", "")
								}
							}
							B.onAfterAppend = function(G, E) {
								if (!C.treeManager) {
									return
								}
								var F = null;
								if (D.initValue) {
									F = D.initValue
								} else {
									if (C.valueField.val() != "") {
										F = C.valueField.val()
									}
								}
								C.selectValueByTree(F)
							};
							C.tree = A("<ul></ul>");
							A("div:first", C.selectBox).append(C.tree);
							C.tree.ligerTree(B);
							C.treeManager = C.tree.ligerGetTreeManager()
						},
						selectValueByTree : function(D) {
							var C = this, E = this.options;
							if (D != null) {
								var F = "";
								var B = D.toString().split(E.split);
								A(B).each(function(G, H) {
									C.treeManager.selectNode(H.toString());
									F += C.treeManager.getTextByID(H);
									if (G < B.length - 1) {
										F += E.split
									}
								});
								C._changeValue(D, F)
							}
						},
						setGrid : function(C) {
							var D = this, E = this.options;
							this.clearContent();
							D.selectBox.table.remove();
							D.grid = A("div:first", D.selectBox);
							C.columnWidth = C.columnWidth || 120;
							C.width = "100%";
							C.height = "100%";
							C.heightDiff = -2;
							C.InWindow = false;
							D.gridManager = D.grid.ligerGrid(C);
							E.hideOnLoseFocus = false;
							if (C.checkbox != false) {
								var B = function() {
									var F = D.gridManager.getCheckedRows();
									var G = [];
									var H = [];
									A(F).each(function(I, J) {
										G.push(J[E.valueField]);
										H.push(J[E.textField])
									});
									D._changeValue(G.join(E.split), H
											.join(E.split))
								};
								D.gridManager.bind("CheckAllRow", B);
								D.gridManager.bind("CheckRow", B)
							} else {
								D.gridManager.bind("SelectRow", function(J, H,
										F) {
									var G = J[E.valueField];
									var I = J[E.textField];
									D._changeValue(G, I)
								});
								D.gridManager.bind("UnSelectRow", function(H,
										G, F) {
									D._changeValue("", "")
								})
							}
							D.bind("show", function() {
								if (D.gridManager) {
									D.gridManager._updateFrozenWidth()
								}
							});
							D.bind("endResize", function() {
								if (D.gridManager) {
									D.gridManager._updateFrozenWidth();
									D.gridManager.setHeight(D.selectBox
											.height() - 2)
								}
							})
						},
						_getValue : function() {
							return A(this.valueField).val()
						},
						getValue : function() {
							return this._getValue()
						},
						updateStyle : function() {
							var B = this, C = this.options;
							B._dataInit()
						},
						_dataInit : function() {
							var B = this, D = this.options;
							var C = null;
							if (D.initValue != null && D.initText != null) {
								B._changeValue(D.initValue, D.initText)
							}
							if (D.initValue != null) {
								C = D.initValue;
								if (D.tree) {
									if (C) {
										B.selectValueByTree(C)
									}
								} else {
									var E = B.findTextByValue(C);
									B._changeValue(C, E)
								}
							} else {
								if (D.initText != null) {
									C = B.findValueByText(D.initText);
									B._changeValue(C, D.initText)
								} else {
									if (B.valueField.val() != "") {
										C = B.valueField.val();
										if (D.tree) {
											if (C) {
												B.selectValueByTree(C)
											}
										} else {
											var E = B.findTextByValue(C);
											B._changeValue(C, E)
										}
									}
								}
							}
							if (!D.isShowCheckBox && C != null) {
								A("table tr", B.selectBox).find("td:first")
										.each(function() {
											if (C == A(this).attr("value")) {
												A(this).addClass("l-selected")
											}
										})
							}
							if (D.isShowCheckBox && C != null) {
								A(":checkbox", B.selectBox)
										.each(
												function() {
													var H = null;
													var G = A(this);
													if (G.parent().get(0).tagName
															.toLowerCase() == "div") {
														H = G.parent().parent()
													} else {
														H = G.parent()
													}
													if (H == null) {
														return
													}
													var F = C.toString().split(
															D.split);
													A(F)
															.each(
																	function(I,
																			J) {
																		if (J == H
																				.attr("value")) {
																			A(
																					".l-checkbox",
																					H)
																					.addClass(
																							"l-checkbox-checked");
																			G[0].checked = true
																		}
																	})
												})
							}
						},
						_changeValue : function(E, C) {
							var B = this, D = this.options;
							B.valueField.val(E);
							if (D.render) {
								B.inputText.val(D.render(E, C))
							} else {
								B.inputText.val(C)
							}
							B.selectedValue = E;
							B.selectedText = C;
							B.inputText.trigger("change").focus();
							B.trigger("selected", [ E, C ])
						},
						_checkboxUpdateValue : function() {
							var D = this, E = this.options;
							var B = "";
							var C = "";
							A("input:checked", D.selectBox).each(
									function() {
										var F = null;
										if (A(this).parent().get(0).tagName
												.toLowerCase() == "div") {
											F = A(this).parent().parent()
										} else {
											F = A(this).parent()
										}
										if (!F) {
											return
										}
										B += F.attr("value") + E.split;
										C += F.attr("text") + E.split
									});
							if (B.length > 0) {
								B = B.substr(0, B.length - 1)
							}
							if (C.length > 0) {
								C = C.substr(0, C.length - 1)
							}
							D._changeValue(B, C)
						},
						_addClickEven : function() {
							var B = this, C = this.options;
							A(".l-table-nocheckbox td", B.selectBox)
									.click(
											function() {
												var E = A(this).attr("value");
												var D = parseInt(A(this).attr(
														"index"));
												var F = A(this).html();
												if (B.hasBind("beforeSelect")
														&& B.trigger(
																"beforeSelect",
																[ E, F ]) == false) {
													if (C.slide) {
														B.selectBox
																.slideToggle("fast")
													} else {
														B.selectBox.hide()
													}
													return false
												}
												if (A(this).hasClass(
														"l-selected")) {
													if (C.slide) {
														B.selectBox
																.slideToggle("fast")
													} else {
														B.selectBox.hide()
													}
													return
												}
												A(".l-selected", B.selectBox)
														.removeClass(
																"l-selected");
												A(this).addClass("l-selected");
												if (B.select) {
													if (B.select[0].selectedIndex != D) {
														B.select[0].selectedIndex = D;
														B.select
																.trigger("change")
													}
												}
												if (C.slide) {
													B.boxToggling = true;
													B.selectBox
															.hide(
																	"fast",
																	function() {
																		B.boxToggling = false
																	})
												} else {
													B.selectBox.hide()
												}
												B._changeValue(E, F)
											})
						},
						updateSelectBoxPosition : function() {
							var B = this, D = this.options;
							if (D.absolute) {
								B.selectBox.css({
									left : B.wrapper.offset().left,
									top : B.wrapper.offset().top + 1
											+ B.wrapper.outerHeight()
								})
							} else {
								var E = B.wrapper.offset().top
										- A(window).scrollTop();
								var C = B.selectBox.height() + textHeight + 4;
								if (E + C > A(window).height() && E > C) {
									B.selectBox.css("marginTop", -1
											* (B.selectBox.height()
													+ textHeight + 5))
								}
							}
						},
						_toggleSelectBox : function(C) {
							var D = this, E = this.options;
							var F = D.wrapper.height();
							D.boxToggling = true;
							if (C) {
								if (E.slide) {
									D.selectBox.slideToggle("fast", function() {
										D.boxToggling = false
									})
								} else {
									D.selectBox.hide();
									D.boxToggling = false
								}
							} else {
								D.updateSelectBoxPosition();
								if (E.slide) {
									D.selectBox
											.slideToggle(
													"fast",
													function() {
														D.boxToggling = false;
														if (!E.isShowCheckBox
																&& A(
																		"td.l-selected",
																		D.selectBox).length > 0) {
															var G = (A(
																	"td.l-selected",
																	D.selectBox)
																	.offset().top - D.selectBox
																	.offset().top);
															A(
																	".l-box-select-inner",
																	D.selectBox)
																	.animate(
																			{
																				scrollTop : G
																			})
														}
													})
								} else {
									D.selectBox.show();
									D.boxToggling = false;
									if (!D.tree
											&& !D.grid
											&& !E.isShowCheckBox
											&& A("td.l-selected", D.selectBox).length > 0) {
										var B = (A("td.l-selected", D.selectBox)
												.offset().top - D.selectBox
												.offset().top);
										A(".l-box-select-inner", D.selectBox)
												.animate({
													scrollTop : B
												})
									}
								}
							}
							D.isShowed = D.selectBox.is(":visible");
							D.trigger("toggle", [ C ]);
							D.trigger(C ? "hide" : "show")
						}
					});
	A.ligerui.controls.ComboBox.prototype.setValue = A.ligerui.controls.ComboBox.prototype.selectValue;
	A.ligerui.controls.ComboBox.prototype.setInputValue = A.ligerui.controls.ComboBox.prototype._changeValue
})(jQuery);
(function($) {
	var l = $.ligerui;
	$.fn.ligerGrid = function(options) {
		return $.ligerui.run.call(this, "ligerGrid", arguments)
	};
	$.fn.ligerGetGridManager = function() {
		return $.ligerui.run.call(this, "ligerGetGridManager", arguments)
	};
	$.ligerDefaults.Grid = {
		title : null,
		width : "auto",
		height : "auto",
		columnWidth : null,
		resizable : true,
		url : false,
		usePager : true,
		page : 1,
		pageSize : 10,
		pageSizeOptions : [ 10, 20, 30, 40, 50,500 ],
		parms : [],
		columns : [],
		minColToggle : 1,
		dataType : "server",
		dataAction : "server",
		showTableToggleBtn : false,
		switchPageSizeApplyComboBox : false,
		allowAdjustColWidth : true,
		checkbox : false,
		allowHideColumn : true,
		enabledEdit : false,
		isScroll : true,
		onDragCol : null,
		onToggleCol : null,
		onChangeSort : null,
		onSuccess : null,
		onDblClickRow : null,
		onBeforeSelectRow : null,
		onSelectRow : null,
		onUnSelectRow : null,
		onBeforeCheckRow : null,
		onCheckRow : null,
		onBeforeCheckAllRow : null,
		onCheckAllRow : null,
		onBeforeShowData : null,
		onAfterShowData : null,
		onError : null,
		onSubmit : null,
		dateFormat : "yyyy-MM-dd",
		InWindow : true,
		statusName : "__status",
		method : "post",
		async : true,
		fixedCellHeight : true,
		heightDiff : 0,
		cssClass : null,
		root : "ret_data",
		record : "ret_count",
		pageParmName : "page",
		pagesizeParmName : "pagesize",
		sortnameParmName : "sortname",
		sortorderParmName : "sortorder",
		onReload : null,
		onToFirst : null,
		onToPrev : null,
		onToNext : null,
		onToLast : null,
		allowUnSelectRow : false,
		alternatingRow : true,
		mouseoverRowCssClass : "l-grid-row-over",
		// hllian 修改排序功能开关默认值为 false
		enabledSort : false,
		rowAttrRender : null,
		groupColumnName : null,
		groupColumnDisplay : "分组",
		groupRender : null,
		totalRender : null,
		delayLoad : false,
		where : null,
		selectRowButtonOnly : false,
		onAfterAddRow : null,
		onBeforeEdit : null,
		onBeforeSubmitEdit : null,
		onAfterEdit : null,
		onLoading : null,
		onLoaded : null,
		onContextmenu : null,
		whenRClickToSelect : false,
		contentType : null,
		checkboxColWidth : 27,
		detailColWidth : 29,
		clickToEdit : true,
		detailToEdit : false,
		onEndEdit : null,
		minColumnWidth : 80,
		tree : null,
		isChecked : null,
		frozen : true,
		frozenDetail : false,
		frozenCheckbox : true,
		detailHeight : 260,
		rownumbers : false,
		frozenRownumbers : true,
		rownumbersColWidth : 26,
		colDraggable : false,
		rowDraggable : false,
		rowDraggingRender : null,
		autoCheckChildren : true,
		onRowDragDrop : null,
		rowHeight : 22,
		headerRowHeight : 23,
		toolbar : null,
		headerImg : null,
		// 注册afterBeginEdit事件
		onAfterBeginEdit : null
	};
	$.ligerDefaults.GridString = {
		errorMessage : "发生错误",
		pageStatMessage : "显示从{from}到{to}，总 {total} 条 。每页显示：{pagesize}",
		pageTextMessage : "Page",
		loadingMessage : "加载中...",
		findTextMessage : "查找",
		noRecordMessage : "没有符合条件的记录存在",
		isContinueByDataChanged : "数据已经改变,如果继续将丢失数据,是否继续?",
		cancelMessage : "取消",
		saveMessage : "保存",
		applyMessage : "应用",
		draggingMessage : "{count}行"
	};
	$.ligerMethos.Grid = $.ligerMethos.Grid || {};
	$.ligerDefaults.Grid.sorters = $.ligerDefaults.Grid.sorters || {};
	$.ligerDefaults.Grid.formatters = $.ligerDefaults.Grid.formatters || {};
	$.ligerDefaults.Grid.editors = $.ligerDefaults.Grid.editors || {};
	$.ligerDefaults.Grid.sorters.date = function(val1, val2) {
		return val1 < val2 ? -1 : val1 > val2 ? 1 : 0
	};
	$.ligerDefaults.Grid.sorters["int"] = function(val1, val2) {
		return parseInt(val1) < parseInt(val2) ? -1
				: parseInt(val1) > parseInt(val2) ? 1 : 0
	};
	$.ligerDefaults.Grid.sorters["float"] = function(val1, val2) {
		return parseFloat(val1) < parseFloat(val2) ? -1
				: parseFloat(val1) > parseFloat(val2) ? 1 : 0
	};
	$.ligerDefaults.Grid.sorters.string = function(val1, val2) {
		return val1.localeCompare(val2)
	};
	$.ligerDefaults.Grid.formatters.date = function(value, column) {
		function getFormatDate(date, dateformat) {
			var g = this, p = this.options;
			if (isNaN(date)) {
				return null
			}
			var format = dateformat;
			var o = {
				"M+" : date.getMonth() + 1,
				"d+" : date.getDate(),
				"h+" : date.getHours(),
				"m+" : date.getMinutes(),
				"s+" : date.getSeconds(),
				"q+" : Math.floor((date.getMonth() + 3) / 3),
				S : date.getMilliseconds()
			};
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (date.getFullYear() + "")
						.substr(4 - RegExp.$1.length))
			}
			for ( var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1,
							RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
									.substr(("" + o[k]).length))
				}
			}
			return format
		}
		if (!value) {
			return ""
		}
		if (typeof (value) == "string" && /^\/Date/.test(value)) {
			value = value.replace(/^\//, "new ").replace(/\/$/, "");
			eval("value = " + value)
		}
		if (value instanceof Date) {
			var format = column.format || this.options.dateFormat
					|| "yyyy-MM-dd";
			return getFormatDate(value, format)
		} else {
			return value.toString()
		}
	};
	$.ligerDefaults.Grid.editors.date = {
		create : function(container, editParm) {
			var column = editParm.column;
			var input = $("<input type='text'/>");
			container.append(input);
			var options = {};
			var ext = column.editor.p || column.editor.ext;
			if (ext) {
				var tmp = typeof (ext) == "function" ? ext(editParm.record,
						editParm.rowindex, editParm.value, column) : ext;
				$.extend(options, tmp)
			}
			input.ligerDateEditor(options);
			return input
		},
		getValue : function(input, editParm) {
			return input.liger("option", "value")
		},
		setValue : function(input, value, editParm) {
			input.liger("option", "value", value)
		},
		resize : function(input, width, height, editParm) {
			input.liger("option", "width", width);
			input.liger("option", "height", height)
		},
		destroy : function(input, editParm) {
			input.liger("destroy")
		}
	};
	$.ligerDefaults.Grid.editors.select = $.ligerDefaults.Grid.editors.combobox = {
		create : function(container, editParm) {
			var column = editParm.column;
			var input = $("<input type='text'/>");
			container.append(input);
			var options = {
				data : column.editor.data,
				slide : false,
				valueField : column.editor.valueField
						|| column.editor.valueColumnName,
				textField : column.editor.textField
						|| column.editor.displayColumnName
			};
			var ext = column.editor.p || column.editor.ext;
			if (ext) {
				var tmp = typeof (ext) == "function" ? ext(editParm.record,
						editParm.rowindex, editParm.value, column) : ext;
				$.extend(options, tmp)
			}
			input.ligerComboBox(options);
			return input
		},
		getValue : function(input, editParm) {
			return input.liger("option", "value")
		},
		setValue : function(input, value, editParm) {
			input.liger("option", "value", value)
		},
		resize : function(input, width, height, editParm) {
			input.liger("option", "width", width);
			input.liger("option", "height", height)
		},
		destroy : function(input, editParm) {
			input.liger("destroy")
		}
	};
	$.ligerDefaults.Grid.editors["int"] = $.ligerDefaults.Grid.editors["float"] = $.ligerDefaults.Grid.editors.spinner = {
		create : function(container, editParm) {
			var column = editParm.column;
			var input = $("<input type='text'/>");
			container.append(input);
			input.css({
				border : "#6E90BE"
			});
			var options = {
				type : column.editor.type == "float" ? "float" : "int"
			};
			if (column.editor.minValue != undefined) {
				options.minValue = column.editor.minValue
			}
			if (column.editor.maxValue != undefined) {
				options.maxValue = column.editor.maxValue
			}
			input.ligerSpinner(options);
			return input
		},
		getValue : function(input, editParm) {
			var column = editParm.column;
			var isInt = column.editor.type == "int";
			if (isInt) {
				return parseInt(input.val(), 10)
			} else {
				return parseFloat(input.val())
			}
		},
		setValue : function(input, value, editParm) {
			input.val(value)
		},
		resize : function(input, width, height, editParm) {
			input.liger("option", "width", width);
			input.liger("option", "height", height)
		},
		destroy : function(input, editParm) {
			input.liger("destroy")
		}
	};
	$.ligerDefaults.Grid.editors.string = $.ligerDefaults.Grid.editors.text = {
		create : function(container, editParm) {
			var input = $("<input type='text' class='l-text-editing'/>");
			container.append(input);
			input.ligerTextBox();
			return input
		},
		getValue : function(input, editParm) {
			return input.val()
		},
		setValue : function(input, value, editParm) {
			input.val(value)
		},
		resize : function(input, width, height, editParm) {
			input.liger("option", "width", width);
			input.liger("option", "height", height)
		},
		destroy : function(input, editParm) {
			input.liger("destroy")
		}
	};
	$.ligerDefaults.Grid.editors.chk = $.ligerDefaults.Grid.editors.checkbox = {
		create : function(container, editParm) {
			var input = $("<input type='checkbox' />");
			container.append(input);
			input.ligerCheckBox();
			return input
		},
		getValue : function(input, editParm) {
			return input[0].checked ? 1 : 0
		},
		setValue : function(input, value, editParm) {
			input.val(value ? true : false)
		},
		resize : function(input, width, height, editParm) {
			input.liger("option", "width", width);
			input.liger("option", "height", height)
		},
		destroy : function(input, editParm) {
			input.liger("destroy")
		}
	};
	$.ligerui.controls.Grid = function(element, options) {
		$.ligerui.controls.Grid.base.constructor.call(this, element, options)
	};
	$.ligerui.controls.Grid
			.ligerExtend(
					$.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "$.ligerui.controls.Grid"
						},
						__idPrev : function() {
							return "grid"
						},
						_extendMethods : function() {
							return $.ligerMethos.Grid
						},
						_init : function() {
							$.ligerui.controls.Grid.base._init.call(this);
							var g = this, p = this.options;
							p.dataType = p.url ? "server" : "local";
							if (p.dataType == "local") {
								p.data = p.data || [];
								p.dataAction = "local"
							}
							if (p.isScroll == false) {
								p.height = "auto"
							}
							if (!p.frozen) {
								p.frozenCheckbox = false;
								p.frozenDetail = false;
								p.frozenRownumbers = false
							}
							if (p.detailToEdit) {
								p.enabledEdit = true;
								p.clickToEdit = false;
								p.detail = {
									height : "auto",
									onShowDetail : function(record, container,
											callback) {
										$(container).addClass(
												"l-grid-detailpanel-edit");
										g
												.beginEdit(
														record,
														function(rowdata,
																column) {
															var editContainer = $("<div class='l-editbox'></div>");
															editContainer
																	.width(120)
																	.height(
																			p.rowHeight + 1);
															editContainer
																	.appendTo(container);
															return editContainer
														});
										function removeRow() {
											$(container).parent().parent()
													.remove();
											g.collapseDetail(record)
										}
										$("<div class='l-clear'></div>")
												.appendTo(container);
										$(
												"<div class='l-button'>"
														+ p.saveMessage
														+ "</div>").appendTo(
												container).click(function() {
											g.endEdit(record);
											removeRow()
										});
										$(
												"<div class='l-button'>"
														+ p.applyMessage
														+ "</div>").appendTo(
												container).click(function() {
											g.submitEdit(record)
										});
										$(
												"<div class='l-button'>"
														+ p.cancelMessage
														+ "</div>").appendTo(
												container).click(function() {
											g.cancelEdit(record);
											removeRow()
										})
									}
								}
							}
							if (p.tree) {
								p.tree.childrenName = p.tree.childrenName
										|| "children";
								p.tree.isParent = p.tree.isParent
										|| function(rowData) {
											var exist = p.tree.childrenName in rowData;
											return exist
										};
								p.tree.isExtend = p.tree.isExtend
										|| function(rowData) {
											if ("isextend" in rowData
													&& rowData.isextend == false) {
												return false
											}
											return true
										}
							}
						},
						_render : function() {
							var g = this, p = this.options;
							g.grid = $(g.element);
							g.grid.addClass("l-panel");
							var gridhtmlarr = [];
							gridhtmlarr
									.push("        <div class='l-panel-header'><span class='l-panel-header-text'></span></div>");
							gridhtmlarr
									.push("                    <div class='l-grid-loading'></div>");
							gridhtmlarr
									.push("        <div class='l-panel-topbar'></div>");
							gridhtmlarr
									.push("        <div class='l-panel-bwarp'>");
							gridhtmlarr
									.push("            <div class='l-panel-body'>");
							gridhtmlarr
									.push("                <div class='l-grid'>");
							gridhtmlarr
									.push("                    <div class='l-grid-dragging-line'></div>");
							gridhtmlarr
									.push("                    <div class='l-grid-popup'><table cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");
							gridhtmlarr
									.push("                  <div class='l-grid1'>");
							gridhtmlarr
									.push("                      <div class='l-grid-header l-grid-header1'>");
							gridhtmlarr
									.push("                          <div class='l-grid-header-inner'><table class='l-grid-header-table' cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");
							gridhtmlarr.push("                      </div>");
							gridhtmlarr
									.push("                      <div class='l-grid-body l-grid-body1'>");
							gridhtmlarr.push("                      </div>");
							gridhtmlarr.push("                  </div>");
							gridhtmlarr
									.push("                  <div class='l-grid2'>");
							gridhtmlarr
									.push("                      <div class='l-grid-header l-grid-header2'>");
							gridhtmlarr
									.push("                          <div class='l-grid-header-inner'><table class='l-grid-header-table' cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");
							gridhtmlarr.push("                      </div>");
							gridhtmlarr
									.push("                      <div class='l-grid-body l-grid-body2 l-scroll'>");
							gridhtmlarr.push("                      </div>");
							gridhtmlarr.push("                  </div>");
							gridhtmlarr.push("                 </div>");
							gridhtmlarr.push("              </div>");
							gridhtmlarr.push("         </div>");
							gridhtmlarr
									.push("         <div class='l-panel-bar'>");
							gridhtmlarr
									.push("            <div class='l-panel-bbar-inner'>");
							gridhtmlarr
									.push("                <div class='l-bar-group  l-bar-message'><span class='l-bar-text'></span></div>");
							gridhtmlarr
									.push("            <div class='l-bar-group l-bar-selectpagesize'></div>");
							gridhtmlarr
									.push("                <div class='l-bar-separator'></div>");
							gridhtmlarr
									.push("                <div class='l-bar-group'>");
							gridhtmlarr
									.push("                    <div class='l-bar-button l-bar-btnfirst'><span></span></div>");
							gridhtmlarr
									.push("                    <div class='l-bar-button l-bar-btnprev'><span></span></div>");
							gridhtmlarr.push("                </div>");
							gridhtmlarr
									.push("                <div class='l-bar-separator'></div>");
							gridhtmlarr
									.push("                <div class='l-bar-group'><span class='pcontrol'> <input type='text' size='4' value='1' style='width:20px' maxlength='3' /> / <span id = 'pcontrol_pageCount'></span></span></div>");
							gridhtmlarr
									.push("                <div class='l-bar-separator'></div>");
							gridhtmlarr
									.push("                <div class='l-bar-group'>");
							gridhtmlarr
									.push("                     <div class='l-bar-button l-bar-btnnext'><span></span></div>");
							gridhtmlarr
									.push("                    <div class='l-bar-button l-bar-btnlast'><span></span></div>");
							gridhtmlarr.push("                </div>");
							gridhtmlarr
									.push("                <div class='l-bar-separator'></div>");
							gridhtmlarr
									.push("                <div class='l-bar-group'>");
							gridhtmlarr
									.push("                     <div class='l-bar-button l-bar-btnload'><span></span></div>");
							gridhtmlarr.push("                </div>");
							gridhtmlarr
									.push("                <div class='l-bar-separator'></div>");
							gridhtmlarr
									.push("                <div class='l-clear'></div>");
							gridhtmlarr.push("            </div>");
							gridhtmlarr.push("         </div>");
							g.grid.html(gridhtmlarr.join(""));
							g.header = $(".l-panel-header:first", g.grid);
							g.body = $(".l-panel-body:first", g.grid);
							g.toolbar = $(".l-panel-bar:first", g.grid);
							g.popup = $(".l-grid-popup:first", g.grid);
							g.gridloading = $(".l-grid-loading:first", g.grid);
							g.draggingline = $(".l-grid-dragging-line", g.grid);
							g.topbar = $(".l-panel-topbar:first", g.grid);
							g.gridview = $(".l-grid:first", g.grid);
							g.gridview.attr("id", g.id + "grid");
							g.gridview1 = $(".l-grid1:first", g.gridview);
							g.gridview2 = $(".l-grid2:first", g.gridview);
							g.gridheader = $(".l-grid-header:first",
									g.gridview2);
							g.gridbody = $(".l-grid-body:first", g.gridview2);
							g.f = {};
							g.f.gridheader = $(".l-grid-header:first",
									g.gridview1);
							g.f.gridbody = $(".l-grid-body:first", g.gridview1);
							g.currentData = null;
							g.changedCells = {};
							g.editors = {};
							g.editor = {
								editing : false
							};
							if (p.height == "auto") {
								g.bind("SysGridHeightChanged", function() {
									if (g.enabledFrozen()) {
										g.gridview.height(Math
												.max(g.gridview1.height(),
														g.gridview2.height()))
									}
								})
							}
							var pc = $.extend({}, p);
							this._bulid();
							this._setColumns(p.columns);
							delete pc.columns;
							delete pc.data;
							delete pc.url;
							g.set(pc);
							if (!p.delayLoad) {
								if (p.url) {
									g.set({
										url : p.url
									})
								} else {
									if (p.data) {
										g.set({
											data : p.data
										})
									}
								}
							}
						},
						_setFrozen : function(frozen) {
							if (frozen) {
								this.grid.addClass("l-frozen")
							} else {
								this.grid.removeClass("l-frozen")
							}
						},
						_setCssClass : function(value) {
							this.grid.addClass(value)
						},
						_setLoadingMessage : function(value) {
							this.gridloading.html(value)
						},
						_setHeight : function(h) {
							var g = this, p = this.options;
							g.unbind("SysGridHeightChanged");
							if (h == "auto") {
								g.bind("SysGridHeightChanged", function() {
									if (g.enabledFrozen()) {
										g.gridview.height(Math
												.max(g.gridview1.height(),
														g.gridview2.height()))
									}
								});
								return
							}
							if (typeof h == "string" && h.indexOf("%") > 0) {
								if (p.inWindow) {
									h = $(window).height() * parseFloat(h)
											* 0.01
								} else {
									h = g.grid.parent().height()
											* parseFloat(h) * 0.01
								}
							}
							if (p.title) {
								h -= 24
							}
							if (p.usePager) {
								h -= 32
							}
							if (p.totalRender) {
								h -= 25
							}
							if (p.toolbar) {
								h -= g.topbar.outerHeight()
							}
							var gridHeaderHeight = p.headerRowHeight
									* (g._columnMaxLevel - 1)
									+ p.headerRowHeight - 1;
							h -= gridHeaderHeight;
							if (h > 0) {
								g.gridbody.height(h);
								if (h > 18) {
									g.f.gridbody.height(h - 18)
								}
								g.gridview.height(h + gridHeaderHeight)
							}
						},
						_updateFrozenWidth : function() {
							var g = this, p = this.options;
							if (g.enabledFrozen()) {
								g.gridview1.width(g.f.gridtablewidth);
								var view2width = g.gridview.width()
										- g.f.gridtablewidth;
								g.gridview2.css({
									left : g.f.gridtablewidth
								});
								if (view2width > 0) {
									g.gridview2.css({
										width : view2width
									})
								}
							}
						},
						_setWidth : function(value) {
							var g = this, p = this.options;
							if (g.enabledFrozen()) {
								g._onResize()
							}
						},
						_setUrl : function(value) {
							this.options.url = value;
							if (value) {
								this.options.dataType = "server";
								this.loadData(true)
							} else {
								this.options.dataType = "local"
							}
						},
						_setData : function(value) {
							this.loadData(this.options.data)
						},
						loadData : function(loadDataParm) {
							var g = this, p = this.options;
							g.loading = true;
							var clause = null;
							var loadServer = true;
							if (typeof (loadDataParm) == "function") {
								clause = loadDataParm;
								loadServer = false
							} else {
								if (typeof (loadDataParm) == "boolean") {
									loadServer = loadDataParm
								} else {
									if (typeof (loadDataParm) == "object"
											&& loadDataParm) {
										loadServer = false;
										p.dataType = "local";
										p.data = loadDataParm
									}
								}
							}
							if (!p.newPage) {
								p.newPage = 1
							}
							if (p.dataAction == "server") {
								if (!p.sortOrder) {
									p.sortOrder = "asc"
								}
							}
							var param = [];
							if (p.parms) {
								if (p.parms.length) {
									$(p.parms).each(function() {
										param.push({
											name : this.name,
											value : this.value
										})
									})
								} else {
									if (typeof p.parms == "object") {
										for ( var name in p.parms) {
											param.push({
												name : name,
												value : p.parms[name]
											})
										}
									}
								}
							}
							if (p.dataAction == "server") {
								if (p.usePager) {
									param.push({
										name : p.pageParmName,
										value : p.newPage
									});
									param.push({
										name : p.pagesizeParmName,
										value : p.pageSize
									})
								}
								if (p.sortName) {
									param.push({
										name : p.sortnameParmName,
										value : p.sortName
									});
									param.push({
										name : p.sortorderParmName,
										value : p.sortOrder
									})
								}
							}
							$(".l-bar-btnload span", g.toolbar).addClass(
									"l-disabled");
							if (p.dataType == "local") {
								g.filteredData = g.data = p.data;
								if (clause) {
									g.filteredData[p.root] = g._searchData(
											g.filteredData[p.root], clause)
								}
								if (p.usePager) {
									g.currentData = g
											._getCurrentPageData(g.filteredData)
								} else {
									g.currentData = g.filteredData
								}
								g._showData()
							} else {
								if (p.dataAction == "local" && !loadServer) {
									if (g.data && g.data[p.root]) {
										g.filteredData = g.data;
										if (clause) {
											g.filteredData[p.root] = g
													._searchData(
															g.filteredData[p.root],
															clause)
										}
										g.currentData = g
												._getCurrentPageData(g.filteredData);
										g._showData()
									}
								} else {
									g.loadServerData(param, clause)
								}
							}
							g.loading = false
						},
						loadServerData : function(param, clause) {
							var g = this, p = this.options;
							var ajaxOptions = {
								type : p.method,
								url : p.url,
								data : param,
								async : p.async,
								dataType : "json",
								beforeSend : function() {
									if (g.hasBind("loading")) {
										g.trigger("loading")
									} else {
										g.toggleLoading(true)
									}
								},
								success : function(data) {
									g.trigger("success", [ data, g ]);
									if (!data || !data[p.root]
											|| !data[p.root].length) {
										g.currentData = g.data = {};
										g.currentData[p.root] = g.data[p.root] = [];
										g.currentData[p.record] = g.data[p.record] = 0;
										g._showData();
										return
									}
									g.data = data;
									if (p.dataAction == "server") {
										g.currentData = g.data
									} else {
										g.filteredData = g.data;
										if (clause) {
											g.filteredData[p.root] = g
													._searchData(
															g.filteredData[p.root],
															clause)
										}
										if (p.usePager) {
											g.currentData = g
													._getCurrentPageData(g.filteredData)
										} else {
											g.currentData = g.filteredData
										}
									}
									g._showData.ligerDefer(g, 10,
											[ g.currentData ])
								},
								complete : function() {
									g.trigger("complete", [ g ]);
									if (g.hasBind("loaded")) {
										g.trigger("loaded", [ g ])
									} else {
										g.toggleLoading.ligerDefer(g, 10,
												[ false ])
									}
								},
								error : function(XMLHttpRequest, textStatus,
										errorThrown) {
									g.currentData = g.data = {};
									g.currentData[p.root] = g.data[p.root] = [];
									g.currentData[p.record] = g.data[p.record] = 0;
									g.toggleLoading
											.ligerDefer(g, 10, [ false ]);
									$(".l-bar-btnload span", g.toolbar)
											.removeClass("l-disabled");
									g.trigger("error", [ XMLHttpRequest,
											textStatus, errorThrown ])
								}
							};
							if (p.contentType) {
								ajaxOptions.contentType = p.contentType
							}
							$.ajax(ajaxOptions)
						},
						toggleLoading : function(show) {
							this.gridloading[show ? "show" : "hide"]()
						},
						_createEditor : function(editor, container, editParm,
								width, height) {
							var editorInput = editor
									.create(container, editParm);
							if (editor.setValue) {
								editor.setValue(editorInput, editParm.value,
										editParm)
							}
							if (editor.resize) {
								editor.resize(editorInput, width, height,
										editParm)
							}
							return editorInput
						},
						beginEdit : function(rowParm, containerBulider) {
							var g = this, p = this.options;
							if (!p.enabledEdit || p.clickToEdit) {
								return
							}
							var rowdata = g.getRow(rowParm);
							if (rowdata._editing) {
								return
							}
							if (g.trigger("beginEdit", {
								record : rowdata,
								rowindex : rowdata.__index
							}) == false) {
								return
							}
							g.editors[rowdata.__id] = {};
							rowdata._editing = true;
							g.reRender({
								rowdata : rowdata
							});
							containerBulider = containerBulider
									|| function(rowdata, column) {
										var cellobj = g.getCellObj(rowdata,
												column);
										var container = $(cellobj).html("");
										g.setCellEditing(rowdata, column, true);
										return container
									};
							for ( var i = 0, l = g.columns.length; i < l; i++) {
								var column = g.columns[i];
								if (!column.name || !column.editor
										|| !column.editor.type
										|| !p.editors[column.editor.type]) {
									continue
								}
								var editor = p.editors[column.editor.type];
								var editParm = {
									record : rowdata,
									value : rowdata[column.name],
									column : column,
									rowindex : rowdata.__index,
									grid : g
								};
								var container = containerBulider(rowdata,
										column);
								var width = container.width(), height = container
										.height();
								var editorInput = g._createEditor(editor,
										container, editParm, width, height);
								g.editors[rowdata.__id][column.__id] = {
									editor : editor,
									input : editorInput,
									editParm : editParm,
									container : container
								}
							}
							g.trigger("afterBeginEdit", [ editorInput, editParm ]);
						},
						cancelEdit : function(rowParm) {
							var g = this;
							if (rowParm == undefined) {
								for ( var rowid in g.editors) {
									g.cancelEdit(rowid)
								}
							} else {
								var rowdata = g.getRow(rowParm);
								if (!g.editors[rowdata.__id]) {
									return
								}
								if (g.trigger("cancelEdit", {
									record : rowdata,
									rowindex : rowdata.__index
								}) == false) {
									return
								}
								for ( var columnid in g.editors[rowdata.__id]) {
									var o = g.editors[rowdata.__id][columnid];
									if (o.editor.destroy) {
										o.editor.destroy(o.input, o.editParm)
									}
								}
								delete g.editors[rowdata.__id];
								delete rowdata._editing;
								g.reRender({
									rowdata : rowdata
								})
							}
						},
						addEditRow : function(rowdata) {
//							alert(1);
							this.submitEdit();
							rowdata = this.add(rowdata);
							this.beginEdit(rowdata)
						},
						submitEdit : function(rowParm) {
							var g = this, p = this.options;
							if (rowParm == undefined) {
								for ( var rowid in g.editors) {
									g.submitEdit(rowid)
								}
							} else {
								var rowdata = g.getRow(rowParm);
								var newdata = {};
								if (!g.editors[rowdata.__id]) {
									return
								}
								for ( var columnid in g.editors[rowdata.__id]) {
									var o = g.editors[rowdata.__id][columnid];
									var column = o.editParm.column;
									if (column.name) {
										newdata[column.name] = o.editor
												.getValue(o.input, o.editParm)
									}
								}
								if (g.trigger("beforeSubmitEdit", {
									record : rowdata,
									rowindex : rowdata.__index,
									newdata : newdata
								}) == false) {
									return false
								}
								g.updateRow(rowdata, newdata);
								g.trigger("afterSubmitEdit", {
									record : rowdata,
									rowindex : rowdata.__index,
									newdata : newdata
								})
							}
						},
						endEdit : function(rowParm) {
							var g = this, p = this.options;
							if (g.editor.editing) {
								var o = g.editor;
								g.trigger("sysEndEdit", [ g.editor.editParm ]);
								g.trigger("endEdit", [ g.editor.editParm ]);
								if (o.editor.destroy) {
									o.editor.destroy(o.input, o.editParm)
								}
								g.editor.container.remove();
								g.reRender({
									rowdata : g.editor.editParm.record,
									column : g.editor.editParm.column
								});
								g.trigger("afterEdit", [ g.editor.editParm ]);
								g.editor = {
									editing : false
								}
							} else {
								if (rowParm != undefined) {
									var rowdata = g.getRow(rowParm);
									if (!g.editors[rowdata.__id]) {
										return
									}
									if (g.submitEdit(rowParm) == false) {
										return false
									}
									for ( var columnid in g.editors[rowdata.__id]) {
										var o = g.editors[rowdata.__id][columnid];
										if (o.editor.destroy) {
											o.editor.destroy(o.input,
													o.editParm)
										}
									}
									delete g.editors[rowdata.__id];
									delete rowdata._editing;
									g.trigger("afterEdit", {
										record : rowdata,
										rowindex : rowdata.__index
									})
								} else {
									for ( var rowid in g.editors) {
										g.endEdit(rowid)
									}
								}
							}
						},
						setWidth : function(w) {
							return this._setWidth(w)
						},
						setHeight : function(h) {
							return this._setHeight(h)
						},
						enabledCheckbox : function() {
							return this.options.checkbox ? true : false
						},
						enabledFrozen : function() {
							var g = this, p = this.options;
							if (!p.frozen) {
								return false
							}
							var cols = g.columns || [];
							if (g.enabledDetail() && p.frozenDetail
									|| g.enabledCheckbox() && p.frozenCheckbox
									|| p.frozenRownumbers && p.rownumbers) {
								return true
							}
							for ( var i = 0, l = cols.length; i < l; i++) {
								if (cols[i].frozen) {
									return true
								}
							}
							this._setFrozen(false);
							return false
						},
						enabledDetailEdit : function() {
							if (!this.enabledDetail()) {
								return false
							}
							return this.options.detailToEdit ? true : false
						},
						enabledDetail : function() {
							if (this.options.detail
									&& this.options.detail.onShowDetail) {
								return true
							}
							return false
						},
						enabledGroup : function() {
							return this.options.groupColumnName ? true : false
						},
						deleteSelectedRow : function() {
							if (!this.selected) {
								return
							}
							for ( var i in this.selected) {
								var o = this.selected[i];
								if (o.__id in this.records) {
									this._deleteData
											.ligerDefer(this, 10, [ o ])
								}
							}
							this.reRender.ligerDefer(this, 20)
						},
						removeRange : function(rowArr) {
							var g = this, p = this.options;
							$.each(rowArr, function() {
								g._removeData(this)
							});
							g.reRender()
						},
						remove : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							g._removeData(rowParm);
							g.reRender()
						},
						deleteRange : function(rowArr) {
							var g = this, p = this.options;
							$.each(rowArr, function() {
								g._deleteData(this)
							});
							g.reRender()
						},
						deleteRow : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							if (!rowdata) {
								return
							}
							g._deleteData(rowdata);
							g.reRender();
							g.isDataChanged = true
						},
						_deleteData : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							rowdata[p.statusName] = "delete";
							if (p.tree) {
								var children = g.getChildren(rowdata, true);
								if (children) {
									for ( var i = 0, l = children.length; i < l; i++) {
										children[i][p.statusName] = "delete"
									}
								}
							}
							g.deletedRows = g.deletedRows || [];
							g.deletedRows.push(rowdata);
							g._removeSelected(rowdata)
						},
						updateCell : function(arg, value, rowParm) {
							var g = this, p = this.options;
							var column, cellObj, rowdata;
							if (typeof (arg) == "string") {
								for ( var i = 0, l = g.columns.length; i < l; i++) {
									if (g.columns[i].name == arg) {
										g.updateCell(i, value, rowParm)
									}
								}
								return
							}
							if (typeof (arg) == "number") {
								column = g.columns[arg];
								rowdata = g.getRow(rowParm);
								cellObj = g.getCellObj(rowdata, column)
							} else {
								if (typeof (arg) == "object" && arg.__id) {
									column = arg;
									rowdata = g.getRow(rowParm);
									cellObj = g.getCellObj(rowdata, column)
								} else {
									cellObj = arg;
									var ids = cellObj.id.split("|");
									var columnid = ids[ids.length - 1];
									column = g._columns[columnid];
									var row = $(cellObj).parent();
									rowdata = rowdata || g.getRow(row[0])
								}
							}
							if (value != null && column.name) {
								rowdata[column.name] = value;
								if (rowdata[p.statusName] != "add") {
									rowdata[p.statusName] = "update"
								}
								g.isDataChanged = true
							}
							g.reRender({
								rowdata : rowdata,
								column : column
							})
						},
						addRows : function(rowdataArr, neardata, isBefore,
								parentRowData) {
							var g = this, p = this.options;
							$(rowdataArr).each(
									function() {
										g.addRow(this, neardata, isBefore,
												parentRowData)
									})
						},
						_createRowid : function() {
							return "r" + (1000 + this.recordNumber)
						},
						_isRowId : function(str) {
							return (str in this.records)
						},
						_addNewRecord : function(o, previd, pid) {
							var g = this, p = this.options;
							g.recordNumber++;
							o.__id = g._createRowid();
							o.__previd = previd;
							if (previd && previd != -1) {
								var prev = g.records[previd];
								if (prev.__nextid && prev.__nextid != -1) {
									var prevOldNext = g.records[prev.__nextid];
									if (prevOldNext) {
										prevOldNext.__previd = o.__id
									}
								}
								prev.__nextid = o.__id;
								o.__index = prev.__index + 1
							} else {
								o.__index = 0
							}
							if (p.tree) {
								if (pid && pid != -1) {
									var parent = g.records[pid];
									o.__pid = pid;
									o.__level = parent.__level + 1
								} else {
									o.__pid = -1;
									o.__level = 1
								}
								o.__hasChildren = o[p.tree.childrenName] ? true
										: false
							}
							if (o[p.statusName] != "add") {
								o[p.statusName] = "nochanged"
							}
							g.rows[o.__index] = o;
							g.records[o.__id] = o;
							return o
						},
						_getRows : function(data) {
							var g = this, p = this.options;
							var targetData = [];
							function load(data) {
								if (!data || !data.length) {
									return
								}
								for ( var i = 0, l = data.length; i < l; i++) {
									var o = data[i];
									targetData.push(o);
									if (o[p.tree.childrenName]) {
										load(o[p.tree.childrenName])
									}
								}
							}
							load(data);
							return targetData
						},
						_updateGridData : function() {
							var g = this, p = this.options;
							g.recordNumber = 0;
							g.rows = [];
							g.records = {};
							var previd = -1;
							function load(data, pid) {
								if (!data || !data.length) {
									return
								}
								for ( var i = 0, l = data.length; i < l; i++) {
									var o = data[i];
									g.formatRecord(o);
									if (o[p.statusName] == "delete") {
										continue
									}
									g._addNewRecord(o, previd, pid);
									previd = o.__id;
									if (o.__hasChildren) {
										load(o[p.tree.childrenName], o.__id)
									}
								}
							}
							load(g.currentData[p.root], -1);
							return g.rows
						},
						_moveData : function(from, to, isAfter) {
							var g = this, p = this.options;
							var fromRow = g.getRow(from);
							var toRow = g.getRow(to);
							var fromIndex, toIndex;
							var listdata = g._getParentChildren(fromRow);
							fromIndex = $.inArray(fromRow, listdata);
							listdata.splice(fromIndex, 1);
							listdata = g._getParentChildren(toRow);
							toIndex = $.inArray(toRow, listdata);
							listdata.splice(toIndex + (isAfter ? 1 : 0), 0,
									fromRow)
						},
						move : function(from, to, isAfter) {
							this._moveData(from, to, isAfter);
							this.reRender()
						},
						moveRange : function(rows, to, isAfter) {
							for ( var i in rows) {
								this._moveData(rows[i], to, isAfter)
							}
							this.reRender()
						},
						up : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							var listdata = g._getParentChildren(rowdata);
							var index = $.inArray(rowdata, listdata);
							if (index == -1 || index == 0) {
								return
							}
							var selected = g.getSelected();
							g.move(rowdata, listdata[index - 1], false);
							g.select(selected)
						},
						down : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							var listdata = g._getParentChildren(rowdata);
							var index = $.inArray(rowdata, listdata);
							if (index == -1 || index == listdata.length - 1) {
								return
							}
							var selected = g.getSelected();
							g.move(rowdata, listdata[index + 1], true);
							g.select(selected)
						},
						addRow : function(rowdata, neardata, isBefore,
								parentRowData) {
							var g = this, p = this.options;
							rowdata = rowdata || {};
							g._addData(rowdata, parentRowData, neardata,
									isBefore);
							g.reRender();
							rowdata[p.statusName] = "add";
							if (p.tree) {
								var children = g.getChildren(rowdata, true);
								if (children) {
									for ( var i = 0, l = children.length; i < l; i++) {
										children[i][p.statusName] = "add"
									}
								}
							}
							g.isDataChanged = true;
							p.total = p.total ? (p.total + 1) : 1;
							p.pageCount = Math.ceil(p.total / p.pageSize);
							g._buildPager();
							g.trigger("SysGridHeightChanged");
							g.trigger("afterAddRow", [ rowdata ]);
							return rowdata
						},
						updateRow : function(rowDom, newRowData) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowDom);
							g.isDataChanged = true;
							$.extend(rowdata, newRowData || {});
							if (rowdata[p.statusName] != "add") {
								rowdata[p.statusName] = "update"
							}
							g.reRender.ligerDefer(g, 10, [ {
								rowdata : rowdata
							} ]);
							return rowdata
						},
						setCellEditing : function(rowdata, column, editing) {
							var g = this, p = this.options;
							var cell = g.getCellObj(rowdata, column);
							var methodName = editing ? "addClass"
									: "removeClass";
							$(cell)[methodName]("l-grid-row-cell-editing");
							if (rowdata.__id != 0) {
								var prevrowobj = $(g.getRowObj(rowdata.__id))
										.prev();
								if (!prevrowobj.length) {
									return
								}
								var prevrow = g.getRow(prevrowobj[0]);
								var cellprev = g.getCellObj(prevrow, column);
								if (!cellprev) {
									return
								}
								$(cellprev)[methodName]
										("l-grid-row-cell-editing-topcell")
							}
							if (column.__previd != -1
									&& column.__previd != null) {
								var cellprev = $(g.getCellObj(rowdata, column))
										.prev();
								$(cellprev)[methodName]
										("l-grid-row-cell-editing-leftcell")
							}
						},
						reRender : function(e) {
							var g = this, p = this.options;
							e = e || {};
							var rowdata = e.rowdata, column = e.column;
							if (column
									&& (column.isdetail || column.ischeckbox)) {
								return
							}
							if (rowdata && rowdata[p.statusName] == "delete") {
								return
							}
							if (rowdata && column) {
								var cell = g.getCellObj(rowdata, column);
								$(cell).html(g._getCellHtml(rowdata, column));
								if (!column.issystem) {
									g.setCellEditing(rowdata, column, false)
								}
							} else {
								if (rowdata) {
									$(g.columns).each(function() {
										g.reRender({
											rowdata : rowdata,
											column : this
										})
									})
								} else {
									if (column) {
										for ( var rowid in g.records) {
											g.reRender({
												rowdata : g.records[rowid],
												column : column
											})
										}
										for ( var i = 0; i < g.totalNumber; i++) {
											var tobj = document
													.getElementById(g.id
															+ "|total" + i
															+ "|" + column.__id);
											$("div:first", tobj)
													.html(
															g
																	._getTotalCellContent(
																			column,
																			g.groups
																					&& g.groups[i] ? g.groups[i]
																					: g.currentData[p.root]))
										}
									} else {
										g._showData()
									}
								}
							}
						},
						getData : function(status, removeStatus,rowids) {
							var g = this, p = this.options;
							var data = [];
							for ( var rowid in g.records) {
								var o = $.extend(true, {}, g.records[rowid]);
								
								if (o[p.statusName] == status
										|| status == undefined) {
									if (rowids!=null) rowids.push(rowid);
									data.push(g.formatRecord(o, removeStatus))
								}
							}
							return data
						},
						formatRecord : function(o, removeStatus) {
							delete o.__id;
							delete o.__previd;
							delete o.__nextid;
							delete o.__index;
							if (this.options.tree) {
								delete o.__pid;
								delete o.__level;
								delete o.__hasChildren
							}
							if (removeStatus) {
								delete o[this.options.statusName]
							}
							return o
						},
						getUpdated : function() {
							return this.getData("update", true)
						},
						getDeleted : function() {
							return this.deletedRows
						},
						getAdded : function() {
							return this.getData("add", true)
						},
						getColumn : function(columnParm) {
							var g = this, p = this.options;
							if (typeof columnParm == "string") {
								if (g._isColumnId(columnParm)) {
									return g._columns[columnParm]
								} else {
									return g.columns[parseInt(columnParm)]
								}
							} else {
								if (typeof (columnParm) == "number") {
									return g.columns[columnParm]
								} else {
									if (typeof columnParm == "object"
											&& columnParm.nodeType == 1) {
										var ids = columnParm.id.split("|");
										var columnid = ids[ids.length - 1];
										return g._columns[columnid]
									}
								}
							}
							return columnParm
						},
						getColumnType : function(columnname) {
							var g = this, p = this.options;
							for (i = 0; i < g.columns.length; i++) {
								if (g.columns[i].name == columnname) {
									if (g.columns[i].type) {
										return g.columns[i].type
									}
									return "string"
								}
							}
							return null
						},
						isTotalSummary : function() {
							var g = this, p = this.options;
							for ( var i = 0; i < g.columns.length; i++) {
								if (g.columns[i].totalSummary) {
									return true
								}
							}
							return false
						},
						getColumns : function(columnLevel) {
							var g = this, p = this.options;
							var columns = [];
							for ( var id in g._columns) {
								var col = g._columns[id];
								if (columnLevel != undefined) {
									if (col.__level == columnLevel) {
										columns.push(col)
									}
								} else {
									if (col.__leaf) {
										columns.push(col)
									}
								}
							}
							return columns
						},
						changeSort : function(columnName, sortOrder) {
							var g = this, p = this.options;
							if (g.loading) {
								return true
							}
							if (p.dataAction == "local") {
								var columnType = g.getColumnType(columnName);
								if (!g.sortedData) {
									g.sortedData = g.filteredData
								}
								if (p.sortName == columnName) {
									g.sortedData[p.root].reverse()
								} else {
									g.sortedData[p.root].sort(function(data1,
											data2) {
										return g._compareData(data1, data2,
												columnName, columnType)
									})
								}
								if (p.usePager) {
									g.currentData = g
											._getCurrentPageData(g.sortedData)
								} else {
									g.currentData = g.sortedData
								}
								g._showData()
							}
							p.sortName = columnName;
							p.sortOrder = sortOrder;
							if (p.dataAction == "server") {
								g.loadData(p.where)
							}
						},
						changePage : function(ctype) {
							var g = this, p = this.options;
							if (g.loading) {
								return true
							}
							if (p.dataAction != "local" && g.isDataChanged
									&& !confirm(p.isContinueByDataChanged)) {
								return false
							}
							p.pageCount = parseInt($(".pcontrol span",
									g.toolbar).html());
							switch (ctype) {
							case "first":
								if (p.page == 1) {
									return
								}
								p.newPage = 1;
								break;
							case "prev":
								if (p.page == 1) {
									return
								}
								if (p.page > 1) {
									p.newPage = parseInt(p.page) - 1
								}
								break;
							case "next":
								if (p.page >= p.pageCount) {
									return
								}
								p.newPage = parseInt(p.page) + 1;
								break;
							case "last":
								if (p.page >= p.pageCount) {
									return
								}
								p.newPage = p.pageCount;
								break;
							case "input":
								var nv = parseInt($(".pcontrol input",
										g.toolbar).val());
								if (isNaN(nv)) {
									nv = 1
								}
								if (nv < 1) {
									nv = 1
								} else {
									if (nv > p.pageCount) {
										nv = p.pageCount
									}
								}
								$(".pcontrol input", g.toolbar).val(nv);
								p.newPage = nv;
								break
							}
							if (p.newPage == p.page) {
								return false
							}
							if (p.newPage == 1) {
								$(".l-bar-btnfirst span", g.toolbar).addClass(
										"l-disabled");
								$(".l-bar-btnprev span", g.toolbar).addClass(
										"l-disabled")
							} else {
								$(".l-bar-btnfirst span", g.toolbar)
										.removeClass("l-disabled");
								$(".l-bar-btnprev span", g.toolbar)
										.removeClass("l-disabled")
							}
							if (p.newPage == p.pageCount) {
								$(".l-bar-btnlast span", g.toolbar).addClass(
										"l-disabled");
								$(".l-bar-btnnext span", g.toolbar).addClass(
										"l-disabled")
							} else {
								$(".l-bar-btnlast span", g.toolbar)
										.removeClass("l-disabled");
								$(".l-bar-btnnext span", g.toolbar)
										.removeClass("l-disabled")
							}
							g.trigger("changePage", [ p.newPage ]);
							if (p.dataAction == "server") {
								g.loadData(p.where)
							} else {
								g.currentData = g
										._getCurrentPageData(g.filteredData);
								g._showData()
							}
						},
						getSelectedRow : function() {
							for ( var i in this.selected) {
								var o = this.selected[i];
								if (o.__id in this.records) {
									return o
								}
							}
							return null
						},
						getSelectedRows : function() {
							var arr = [];
							for ( var i in this.selected) {
								var o = this.selected[i];
								if (o.__id in this.records) {
									arr.push(o)
								}
							}
							return arr
						},
						getSelectedRowObj : function() {
							for ( var i in this.selected) {
								var o = this.selected[i];
								if (o.__id in this.records) {
									return this.getRowObj(o)
								}
							}
							return null
						},
						getSelectedRowObjs : function() {
							var arr = [];
							for ( var i in this.selected) {
								var o = this.selected[i];
								if (o.__id in this.records) {
									arr.push(this.getRowObj(o))
								}
							}
							return arr
						},
						getCellObj : function(rowParm, column) {
							var rowdata = this.getRow(rowParm);
							column = this.getColumn(column);
							return document.getElementById(this._getCellDomId(
									rowdata, column))
						},
						getRowObj : function(rowParm, frozen) {
							var g = this, p = this.options;
							if (rowParm == null) {
								return null
							}
							if (typeof (rowParm) == "string") {
								if (g._isRowId(rowParm)) {
									return document.getElementById(g.id
											+ (frozen ? "|1|" : "|2|")
											+ rowParm)
								} else {
									return document
											.getElementById(g.id
													+ (frozen ? "|1|" : "|2|")
													+ g.rows[parseInt(rowParm)]["__id"])
								}
							} else {
								if (typeof (rowParm) == "number") {
									return document.getElementById(g.id
											+ (frozen ? "|1|" : "|2|")
											+ g.rows[rowParm]["__id"])
								} else {
									if (typeof (rowParm) == "object"
											&& rowParm.__id) {
										return g
												.getRowObj(rowParm.__id, frozen)
									}
								}
							}
							return rowParm
						},
						getRow : function(rowParm) {
							var g = this, p = this.options;
							if (rowParm == null) {
								return null
							}
							if (typeof (rowParm) == "string") {
								if (g._isRowId(rowParm)) {
									return g.records[rowParm]
								} else {
									return g.rows[parseInt(rowParm)]
								}
							} else {
								if (typeof (rowParm) == "number") {
									return g.rows[parseInt(rowParm)]
								} else {
									if (typeof (rowParm) == "object"
											&& rowParm.nodeType == 1
											&& !rowParm.__id) {
										return g._getRowByDomId(rowParm.id)
									}
								}
							}
							return rowParm
						},
						_setColumnVisible : function(column, hide) {
							var g = this, p = this.options;
							if (!hide) {
								column._hide = false;
								document.getElementById(column.__domid).style.display = "";
								if (column.__pid != -1) {
									var pcol = g._columns[column.__pid];
									if (pcol._hide) {
										document.getElementById(pcol.__domid).style.display = "";
										this._setColumnVisible(pcol, hide)
									}
								}
							} else {
								column._hide = true;
								document.getElementById(column.__domid).style.display = "none";
								if (column.__pid != -1) {
									var hideall = true;
									var pcol = this._columns[column.__pid];
									for ( var i = 0; pcol
											&& i < pcol.columns.length; i++) {
										if (!pcol.columns[i]._hide) {
											hideall = false;
											break
										}
									}
									if (hideall) {
										pcol._hide = true;
										document.getElementById(pcol.__domid).style.display = "none";
										this._setColumnVisible(pcol, hide)
									}
								}
							}
						},
						toggleCol : function(columnparm, visible, toggleByPopup) {
							var g = this, p = this.options;
							var column;
							if (typeof (columnparm) == "number") {
								column = g.columns[columnparm]
							} else {
								if (typeof (columnparm) == "object"
										&& columnparm.__id) {
									column = columnparm
								} else {
									if (typeof (columnparm) == "string") {
										if (g._isColumnId(columnparm)) {
											column = g._columns[columnparm]
										} else {
											$(g.columns)
													.each(
															function() {
																if (this.name == columnparm) {
																	g
																			.toggleCol(
																					this,
																					visible,
																					toggleByPopup)
																}
															});
											return
										}
									}
								}
							}
							if (!column) {
								return
							}
							var columnindex = column.__leafindex;
							var headercell = document
									.getElementById(column.__domid);
							if (!headercell) {
								return
							}
							headercell = $(headercell);
							var cells = [];
							for ( var i in g.rows) {
								var obj = g.getCellObj(g.rows[i], column);
								if (obj) {
									cells.push(obj)
								}
							}
							for ( var i = 0; i < g.totalNumber; i++) {
								var tobj = document.getElementById(g.id
										+ "|total" + i + "|" + column.__id);
								if (tobj) {
									cells.push(tobj)
								}
							}
							var colwidth = column._width;
							if (visible && column._hide) {
								if (column.frozen) {
									g.f.gridtablewidth += (parseInt(colwidth) + 1)
								} else {
									g.gridtablewidth += (parseInt(colwidth) + 1)
								}
								g._setColumnVisible(column, false);
								$(cells).show()
							} else {
								if (!visible && !column._hide) {
									if (column.frozen) {
										g.f.gridtablewidth -= (parseInt(colwidth) + 1)
									} else {
										g.gridtablewidth -= (parseInt(colwidth) + 1)
									}
									g._setColumnVisible(column, true);
									$(cells).hide()
								}
							}
							if (column.frozen) {
								$("div:first", g.f.gridheader).width(
										g.f.gridtablewidth);
								$("div:first", g.f.gridbody).width(
										g.f.gridtablewidth)
							} else {
								$("div:first", g.gridheader).width(
										g.gridtablewidth + 40);
								$("div:first", g.gridbody).width(
										g.gridtablewidth)
							}
							g._updateFrozenWidth();
							if (!toggleByPopup) {
								$(":checkbox[columnindex=" + columnindex + "]",
										g.popup)
										.each(
												function() {
													this.checked = visible;
													if ($.fn.ligerCheckBox) {
														var checkboxmanager = $(
																this)
																.ligerGetCheckBoxManager();
														if (checkboxmanager) {
															checkboxmanager
																	.updateStyle()
														}
													}
												})
							}
						},
						setColumnWidth : function(columnparm, newwidth) {
							var g = this, p = this.options;
							if (!newwidth) {
								return
							}
							newwidth = parseInt(newwidth, 10);
							var column;
							if (typeof (columnparm) == "number") {
								column = g.columns[columnparm]
							} else {
								if (typeof (columnparm) == "object"
										&& columnparm.__id) {
									column = columnparm
								} else {
									if (typeof (columnparm) == "string") {
										if (g._isColumnId(columnparm)) {
											column = g._columns[columnparm]
										} else {
											$(g.columns)
													.each(
															function() {
																if (this.name == columnparm) {
																	g
																			.setColumnWidth(
																					this,
																					newwidth)
																}
															});
											return
										}
									}
								}
							}
							if (!column) {
								return
							}
							var mincolumnwidth = p.minColumnWidth;
							if (column.minWidth) {
								mincolumnwidth = column.minWidth
							}
							newwidth = newwidth < mincolumnwidth ? mincolumnwidth
									: newwidth;
							var diff = newwidth - column._width;
							if (g.trigger("beforeChangeColumnWidth", [ column,
									newwidth ]) == false) {
								return
							}
							column._width = newwidth;
							if (column.frozen) {
								g.f.gridtablewidth += diff;
								$("div:first", g.f.gridheader).width(
										g.f.gridtablewidth);
								$("div:first", g.f.gridbody).width(
										g.f.gridtablewidth)
							} else {
								g.gridtablewidth += diff;
								$("div:first", g.gridheader).width(
										g.gridtablewidth + 40);
								$("div:first", g.gridbody).width(
										g.gridtablewidth)
							}
							$(document.getElementById(column.__domid)).css(
									"width", newwidth);
							var cells = [];
							for ( var rowid in g.records) {
								var obj = g
										.getCellObj(g.records[rowid], column);
								if (obj) {
									cells.push(obj)
								}
								if (!g.enabledDetailEdit() && g.editors[rowid]
										&& g.editors[rowid][column.__id]) {
									var o = g.editors[rowid][column.__id];
									if (o.editor.resize) {
										o.editor.resize(o.input, newwidth,
												o.container.height(),
												o.editParm)
									}
								}
							}
							for ( var i = 0; i < g.totalNumber; i++) {
								var tobj = document.getElementById(g.id
										+ "|total" + i + "|" + column.__id);
								if (tobj) {
									cells.push(tobj)
								}
							}
							$(cells).css("width", newwidth).find(
									"> div.l-grid-row-cell-inner:first").css(
									"width", newwidth - 8);
							g._updateFrozenWidth();
							g.trigger("afterChangeColumnWidth", [ column,
									newwidth ])
						},
						changeHeaderText : function(columnparm, headerText) {
							var g = this, p = this.options;
							var column;
							if (typeof (columnparm) == "number") {
								column = g.columns[columnparm]
							} else {
								if (typeof (columnparm) == "object"
										&& columnparm.__id) {
									column = columnparm
								} else {
									if (typeof (columnparm) == "string") {
										if (g._isColumnId(columnparm)) {
											column = g._columns[columnparm]
										} else {
											$(g.columns)
													.each(
															function() {
																if (this.name == columnparm) {
																	g
																			.changeHeaderText(
																					this,
																					headerText)
																}
															});
											return
										}
									}
								}
							}
							if (!column) {
								return
							}
							var columnindex = column.__leafindex;
							var headercell = document
									.getElementById(column.__domid);
							$(".l-grid-hd-cell-text", headercell).html(
									headerText);
							if (p.allowHideColumn) {
								$(":checkbox[columnindex=" + columnindex + "]",
										g.popup).parent().next().html(
										headerText)
							}
						},
						changeCol : function(from, to, isAfter) {
							var g = this, p = this.options;
							if (!from || !to) {
								return
							}
							var fromCol = g.getColumn(from);
							var toCol = g.getColumn(to);
							fromCol.frozen = toCol.frozen;
							var fromColIndex, toColIndex;
							var fromColumns = fromCol.__pid == -1 ? p.columns
									: g._columns[fromCol.__pid].columns;
							var toColumns = toCol.__pid == -1 ? p.columns
									: g._columns[toCol.__pid].columns;
							fromColIndex = $.inArray(fromCol, fromColumns);
							toColIndex = $.inArray(toCol, toColumns);
							var sameParent = fromColumns == toColumns;
							var sameLevel = fromCol.__level == toCol.__level;
							toColumns.splice(toColIndex + (isAfter ? 1 : 0), 0,
									fromCol);
							if (!sameParent) {
								fromColumns.splice(fromColIndex, 1)
							} else {
								if (isAfter) {
									fromColumns.splice(fromColIndex, 1)
								} else {
									fromColumns.splice(fromColIndex + 1, 1)
								}
							}
							g._setColumns(p.columns);
							g.reRender()
						},
						collapseDetail : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							if (!rowdata) {
								return
							}
							for ( var i = 0, l = g.columns.length; i < l; i++) {
								if (g.columns[i].isdetail) {
									var row = g.getRowObj(rowdata);
									var cell = g.getCellObj(rowdata,
											g.columns[i]);
									$(row).next("tr.l-grid-detailpanel").hide();
									$(".l-grid-row-cell-detailbtn:first", cell)
											.removeClass("l-open");
									g.trigger("SysGridHeightChanged");
									return
								}
							}
						},
						extendDetail : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							if (!rowdata) {
								return
							}
							for ( var i = 0, l = g.columns; i < l; i++) {
								if (g.columns[i].isdetail) {
									var row = g.getRowObj(rowdata);
									var cell = g.getCellObj(rowdata,
											g.columns[i]);
									$(row).next("tr.l-grid-detailpanel").show();
									$(".l-grid-row-cell-detailbtn:first", cell)
											.addClass("l-open");
									g.trigger("SysGridHeightChanged");
									return
								}
							}
						},
						getParent : function(rowParm) {
							var g = this, p = this.options;
							if (!p.tree) {
								return null
							}
							var rowdata = g.getRow(rowParm);
							if (!rowdata) {
								return null
							}
							if (rowdata.__pid in g.records) {
								return g.records[rowdata.__pid]
							} else {
								return null
							}
						},
						getChildren : function(rowParm, deep) {
							var g = this, p = this.options;
							if (!p.tree) {
								return null
							}
							var rowData = g.getRow(rowParm);
							if (!rowData) {
								return null
							}
							var arr = [];
							function loadChildren(data) {
								if (data[p.tree.childrenName]) {
									for ( var i = 0, l = data[p.tree.childrenName].length; i < l; i++) {
										var o = data[p.tree.childrenName][i];
										if (o.__status == "delete") {
											continue
										}
										arr.push(o);
										if (deep) {
											loadChildren(o)
										}
									}
								}
							}
							loadChildren(rowData);
							return arr
						},
						isLeaf : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							if (!rowdata) {
								return
							}
							return rowdata.__hasChildren ? false : true
						},
						hasChildren : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = this.getRow(rowParm);
							if (!rowdata) {
								return
							}
							return (rowdata[p.tree.childrenName] && rowdata[p.tree.childrenName].length) ? true
									: false
						},
						existRecord : function(record) {
							for ( var rowid in this.records) {
								if (this.records[rowid] == record) {
									return true
								}
							}
							return false
						},
						_removeSelected : function(rowdata) {
							var g = this, p = this.options;
							if (p.tree) {
								var children = g.getChildren(rowdata, true);
								if (children) {
									for ( var i = 0, l = children.length; i < l; i++) {
										var index2 = $.inArray(children[i],
												g.selected);
										if (index2 != -1) {
											g.selected.splice(index2, 1)
										}
									}
								}
							}
							var index = $.inArray(rowdata, g.selected);
							if (index != -1) {
								g.selected.splice(index, 1)
							}
						},
						_getParentChildren : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							var listdata;
							if (p.tree && g.existRecord(rowdata)
									&& rowdata.__pid in g.records) {
								listdata = g.records[rowdata.__pid][p.tree.childrenName]
							} else {
								listdata = g.currentData[p.root]
							}
							return listdata
						},
						_removeData : function(rowdata) {
							var g = this, p = this.options;
							var listdata = g._getParentChildren(rowdata);
							var index = $.inArray(rowdata, listdata);
							if (index != -1) {
								listdata.splice(index, 1)
							}
							g._removeSelected(rowdata)
						},
						_addData : function(rowdata, parentdata, neardata,
								isBefore) {
							var g = this, p = this.options;
							var listdata = g.currentData[p.root];
							if (neardata) {
								if (p.tree) {
									if (parentdata) {
										listdata = parentdata[p.tree.childrenName]
									} else {
										if (neardata.__pid in g.records) {
											listdata = g.records[neardata.__pid][p.tree.childrenName]
										}
									}
								}
								var index = $.inArray(neardata, listdata);
								listdata.splice(index == -1 ? -1 : index
										+ (isBefore ? 0 : 1), 0, rowdata)
							} else {
								if (p.tree && parentdata) {
									listdata = parentdata[p.tree.childrenName]
								}
								listdata.push(rowdata)
							}
						},
						_appendData : function(rowdata, parentdata, neardata,
								isBefore) {
							var g = this, p = this.options;
							rowdata[p.statusName] = "update";
							g._removeData(rowdata);
							g._addData(rowdata, parentdata, neardata, isBefore)
						},
						appendRange : function(rows, parentdata, neardata,
								isBefore) {
							var g = this, p = this.options;
							var toRender = false;
							$.each(rows, function(i, item) {
								if (item.__id && g.existRecord(item)) {
									if (g.isLeaf(parentdata)) {
										g.upgrade(parentdata)
									}
									g._appendData(item, parentdata, neardata,
											isBefore);
									toRender = true
								} else {
									g.appendRow(item, parentdata, neardata,
											isBefore)
								}
							});
							if (toRender) {
								g.reRender()
							}
						},
						appendRow : function(rowdata, parentdata, neardata,
								isBefore) {
							var g = this, p = this.options;
							if ($.isArray(rowdata)) {
								g.appendRange(rowdata, parentdata, neardata,
										isBefore);
								return
							}
							if (rowdata.__id && g.existRecord(rowdata)) {
								g._appendData(rowdata, parentdata, neardata,
										isBefore);
								g.reRender();
								return
							}
							if (parentdata && g.isLeaf(parentdata)) {
								g.upgrade(parentdata)
							}
							g.addRow(rowdata, neardata,
									isBefore ? true : false, parentdata)
						},
						upgrade : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							if (!rowdata || !p.tree) {
								return
							}
							rowdata[p.tree.childrenName] = rowdata[p.tree.childrenName]
									|| [];
							rowdata.__hasChildren = true;
							var rowobjs = [ g.getRowObj(rowdata) ];
							if (g.enabledFrozen()) {
								rowobjs.push(g.getRowObj(rowdata, true))
							}
							$("> td > div > .l-grid-tree-space:last", rowobjs)
									.addClass(
											"l-grid-tree-link l-grid-tree-link-open")
						},
						demotion : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							if (!rowdata || !p.tree) {
								return
							}
							var rowobjs = [ g.getRowObj(rowdata) ];
							if (g.enabledFrozen()) {
								rowobjs.push(g.getRowObj(rowdata, true))
							}
							$("> td > div > .l-grid-tree-space:last", rowobjs)
									.removeClass(
											"l-grid-tree-link l-grid-tree-link-open l-grid-tree-link-close");
							if (g.hasChildren(rowdata)) {
								var children = g.getChildren(rowdata);
								for ( var i = 0, l = children.length; i < l; i++) {
									g.deleteRow(children[i])
								}
							}
							rowdata.__hasChildren = false
						},
						collapse : function(rowParm) {
							var g = this, p = this.options;
							var targetRowObj = g.getRowObj(rowParm);
							var linkbtn = $(".l-grid-tree-link", targetRowObj);
							if (linkbtn.hasClass("l-grid-tree-link-close")) {
								return
							}
							g.toggle(rowParm)
						},
						expand : function(rowParm) {
							var g = this, p = this.options;
							var targetRowObj = g.getRowObj(rowParm);
							var linkbtn = $(".l-grid-tree-link", targetRowObj);
							if (linkbtn.hasClass("l-grid-tree-link-open")) {
								return
							}
							g.toggle(rowParm)
						},
						toggle : function(rowParm) {
							if (!rowParm) {
								return
							}
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							var targetRowObj = [ g.getRowObj(rowdata) ];
							if (g.enabledFrozen()) {
								targetRowObj.push(g.getRowObj(rowdata, true))
							}
							var level = rowdata.__level, indexInCollapsedRows;
							var linkbtn = $(".l-grid-tree-link:first",
									targetRowObj);
							var opening = true;
							g.collapsedRows = g.collapsedRows || [];
							if (linkbtn.hasClass("l-grid-tree-link-close")) {
								linkbtn.removeClass("l-grid-tree-link-close")
										.addClass("l-grid-tree-link-open");
								indexInCollapsedRows = $.inArray(rowdata,
										g.collapsedRows);
								if (indexInCollapsedRows != -1) {
									g.collapsedRows.splice(
											indexInCollapsedRows, 1)
								}
							} else {
								opening = false;
								linkbtn.addClass("l-grid-tree-link-close")
										.removeClass("l-grid-tree-link-open");
								indexInCollapsedRows = $.inArray(rowdata,
										g.collapsedRows);
								if (indexInCollapsedRows == -1) {
									g.collapsedRows.push(rowdata)
								}
							}
							var children = g.getChildren(rowdata, true);
							for ( var i = 0, l = children.length; i < l; i++) {
								var o = children[i];
								var currentRow = $([ g.getRowObj(o.__id) ]);
								if (g.enabledFrozen()) {
									currentRow = currentRow.add(g.getRowObj(
											o.__id, true))
								}
								if (opening) {
									$(".l-grid-tree-link", currentRow)
											.removeClass(
													"l-grid-tree-link-close")
											.addClass("l-grid-tree-link-open");
									currentRow.show()
								} else {
									$(".l-grid-tree-link", currentRow)
											.removeClass(
													"l-grid-tree-link-open")
											.addClass("l-grid-tree-link-close");
									currentRow.hide()
								}
							}
						},
						_bulid : function() {
							var g = this;
							g._clearGrid();
							g._initBuildHeader();
							g._initHeight();
							g._initFootbar();
							g._buildPager();
							g._setEvent()
						},
						_setColumns : function(columns) {
							var g = this;
							g._initColumns();
							g._initBuildGridHeader();
							g._initBuildPopup()
						},
						_initBuildHeader : function() {
							var g = this, p = this.options;
							if (p.title) {
								$(".l-panel-header-text", g.header).html(
										p.title);
								if (p.headerImg) {
									g.header
											.append(
													"<img src='" + p.headerImg
															+ "' />").addClass(
													"l-panel-header-hasicon")
								}
							} else {
								g.header.hide()
							}
							if (p.toolbar) {
								if ($.fn.ligerToolBar) {
									g.toolbarManager = g.topbar
											.ligerToolBar(p.toolbar)
								}
							} else {
								g.topbar.remove()
							}
						},
						_createColumnId : function(column) {
							if (column.id != null) {
								return column.id.toString()
							}
							return "c" + (100 + this._columnCount)
						},
						_isColumnId : function(str) {
							return (str in this._columns)
						},
						_initColumns : function() {
							var g = this, p = this.options;
							g._columns = {};
							g._columnCount = 0;
							g._columnLeafCount = 0;
							g._columnMaxLevel = 1;
							if (!p.columns) {
								return
							}
							function removeProp(column, props) {
								for ( var i in props) {
									if (props[i] in column) {
										delete column[props[i]]
									}
								}
							}
							function setColumn(column, level, pid, previd) {
								removeProp(column, [ "__id", "__pid",
										"__previd", "__nextid", "__domid",
										"__leaf", "__leafindex", "__level",
										"__colSpan", "__rowSpan" ]);
								if (level > g._columnMaxLevel) {
									g._columnMaxLevel = level
								}
								g._columnCount++;
								column.__id = g._createColumnId(column);
								column.__domid = g.id + "|hcell|" + column.__id;
								g._columns[column.__id] = column;
								if (!column.columns || !column.columns.length) {
									column.__leafindex = g._columnLeafCount++
								}
								column.__level = level;
								column.__pid = pid;
								column.__previd = previd;
								if (!column.columns || !column.columns.length) {
									column.__leaf = true;
									return 1
								}
								var leafcount = 0;
								var newid = -1;
								for ( var i = 0, l = column.columns.length; i < l; i++) {
									var col = column.columns[i];
									leafcount += setColumn(col, level + 1,
											column.__id, newid);
									newid = col.__id
								}
								column.__leafcount = leafcount;
								return leafcount
							}
							var lastid = -1;
							if (p.rownumbers) {
								var frozenRownumbers = g.enabledGroup() ? false
										: p.frozen && p.frozenRownumbers;
								var col = {
									isrownumber : true,
									issystem : true,
									width : p.rownumbersColWidth,
									frozen : frozenRownumbers
								};
								setColumn(col, 1, -1, lastid);
								lastid = col.__id
							}
							if (g.enabledDetail()) {
								var frozenDetail = g.enabledGroup() ? false
										: p.frozen && p.frozenDetail;
								var col = {
									isdetail : true,
									issystem : true,
									width : p.detailColWidth,
									frozen : frozenDetail
								};
								setColumn(col, 1, -1, lastid);
								lastid = col.__id
							}
							if (g.enabledCheckbox()) {
								var frozenCheckbox = g.enabledGroup() ? false
										: p.frozen && p.frozenCheckbox;
								var col = {
									ischeckbox : true,
									issystem : true,
									width : p.detailColWidth,
									frozen : frozenCheckbox
								};
								setColumn(col, 1, -1, lastid);
								lastid = col.__id
							}
							for ( var i = 0, l = p.columns.length; i < l; i++) {
								var col = p.columns[i];
								setColumn(col, 1, -1, lastid);
								lastid = col.__id
							}
							for ( var id in g._columns) {
								var col = g._columns[id];
								if (col.__leafcount > 1) {
									col.__colSpan = col.__leafcount
								}
								if (col.__leaf
										&& col.__level != g._columnMaxLevel) {
									col.__rowSpan = g._columnMaxLevel
											- col.__level + 1
								}
							}
							g.columns = g.getColumns();
							$(g.columns)
									.each(
											function(i, column) {
												column.columnname = column.name;
												column.columnindex = i;
												column.type = column.type
														|| "string";
												column.islast = i == g.columns.length - 1;
												column.isSort = column.isSort == false ? false
														: true;
												column.frozen = column.frozen ? true
														: false;
												column._width = g
														._getColumnWidth(column);
												column._hide = column.hide ? true
														: false
											})
						},
						_getColumnWidth : function(column) {
							var g = this, p = this.options;
							if (column._width) {
								return column._width
							}
							var colwidth;
							if (column.width) {
								colwidth = column.width
							} else {
								if (p.columnWidth) {
									colwidth = p.columnWidth
								}
							}
							if (!colwidth) {
								var lwidth = 4;
								if (g.enabledCheckbox()) {
									lwidth += p.checkboxColWidth
								}
								if (g.enabledDetail()) {
									lwidth += p.detailColWidth
								}
								colwidth = parseInt((g.grid.width() - lwidth)
										/ g.columns.length)
							}
							if (typeof (colwidth) == "string"
									&& colwidth.indexOf("%") > 0) {
								column._width = colwidth = parseInt(parseInt(colwidth)
										* 0.01
										* (g.grid.width() - g.columns.length))
							}
							if (column.minWidth && colwidth < column.minWidth) {
								colwidth = column.minWidth
							}
							if (column.maxWidth && colwidth > column.maxWidth) {
								colwidth = column.maxWidth
							}
							column._width = colwidth;
							return colwidth
						},
						_createHeaderCell : function(column) {
							var g = this, p = this.options;
							var jcell = $("<td class='l-grid-hd-cell'><div class='l-grid-hd-cell-inner'><span class='l-grid-hd-cell-text'></span></div></td>");
							jcell.attr("id", column.__domid);
							if (!column.__leaf) {
								jcell.addClass("l-grid-hd-cell-mul")
							}
							if (column.columnindex == g.columns.length - 1) {
								jcell.addClass("l-grid-hd-cell-last")
							}
							if (column.isrownumber) {
								jcell.addClass("l-grid-hd-cell-rownumbers");
								jcell
										.html("<div class='l-grid-hd-cell-inner'></div>")
							}
							if (column.ischeckbox) {
								jcell.addClass("l-grid-hd-cell-checkbox");
								jcell
										.html("<div class='l-grid-hd-cell-inner'><div class='l-grid-hd-cell-text l-grid-hd-cell-btn-checkbox'></div></div>")
							}
							if (column.isdetail) {
								jcell.addClass("l-grid-hd-cell-detail");
								jcell
										.html("<div class='l-grid-hd-cell-inner'><div class='l-grid-hd-cell-text l-grid-hd-cell-btn-detail'></div></div>")
							}
							if (column.heightAlign) {
								$(".l-grid-hd-cell-inner:first", jcell).css(
										"textAlign", column.heightAlign)
							}
							if (column.__colSpan) {
								jcell.attr("colSpan", column.__colSpan)
							}
							if (column.__rowSpan) {
								jcell.attr("rowSpan", column.__rowSpan);
								jcell.height(p.headerRowHeight
										* column.__rowSpan)
							} else {
								jcell.height(p.headerRowHeight)
							}
							if (column.__leaf) {
								jcell.width(column._width);
								jcell.attr("columnindex", column.__leafindex)
							}
							if (column._hide) {
								jcell.hide()
							}
							if (column.name) {
								jcell.attr({
									columnname : column.name
								})
							}
							var headerText = "";
							if (column.display && column.display != "") {
								headerText = column.display
							} else {
								if (column.headerRender) {
									headerText = column.headerRender(column)
								} else {
									headerText = "&nbsp;"
								}
							}
							$(".l-grid-hd-cell-text:first", jcell).html(
									headerText);
							if (!column.issystem && column.__leaf
									&& column.resizable !== false
									&& $.fn.ligerResizable) {
								g.colResizable[column.__id] = jcell
										.ligerResizable({
											handles : "e",
											onStartResize : function(e, ev) {
												this.proxy.hide();
												g.draggingline
														.css(
																{
																	height : g.body
																			.height(),
																	top : 0,
																	left : ev.pageX
																			- g.grid
																					.offset().left
																			+ parseInt(g.body[0].scrollLeft)
																}).show()
											},
											onResize : function(e, ev) {
												g.colresizing = true;
												g.draggingline
														.css({
															left : ev.pageX
																	- g.grid
																			.offset().left
																	+ parseInt(g.body[0].scrollLeft)
														});
												$("body").add(jcell).css(
														"cursor", "e-resize")
											},
											onStopResize : function(e) {
												g.colresizing = false;
												$("body").add(jcell).css(
														"cursor", "default");
												g.draggingline.hide();
												g
														.setColumnWidth(
																column,
																column._width
																		+ e.diffX);
												return false
											}
										})
							}
							return jcell
						},
						_initBuildGridHeader : function() {
							var g = this, p = this.options;
							g.gridtablewidth = 0;
							g.f.gridtablewidth = 0;
							if (g.colResizable) {
								for ( var i in g.colResizable) {
									g.colResizable[i].destroy()
								}
								g.colResizable = null
							}
							g.colResizable = {};
							$("tbody:first", g.gridheader).html("");
							$("tbody:first", g.f.gridheader).html("");
							for ( var level = 1; level <= g._columnMaxLevel; level++) {
								var columns = g.getColumns(level);
								var islast = level == g._columnMaxLevel;
								var tr = $("<tr class='l-grid-hd-row'></tr>");
								var trf = $("<tr class='l-grid-hd-row'></tr>");
								if (!islast) {
									tr.add(trf).addClass("l-grid-hd-mul")
								}
								$("tbody:first", g.gridheader).append(tr);
								$("tbody:first", g.f.gridheader).append(trf);
								$(columns)
										.each(
												function(i, column) {
													(column.frozen ? trf : tr)
															.append(g
																	._createHeaderCell(column));
													if (column.__leaf) {
														var colwidth = column._width;
														if (!column.frozen) {
															g.gridtablewidth += (parseInt(colwidth) ? parseInt(colwidth)
																	: 0) + 1
														} else {
															g.f.gridtablewidth += (parseInt(colwidth) ? parseInt(colwidth)
																	: 0) + 1
														}
													}
												})
							}
							if (g._columnMaxLevel > 0) {
								var h = p.headerRowHeight * g._columnMaxLevel;
								g.gridheader.add(g.f.gridheader).height(h);
								if (p.rownumbers && p.frozenRownumbers) {
									g.f.gridheader.find("td:first").height(h)
								}
							}
							g._updateFrozenWidth();
							$("div:first", g.gridheader).width(
									g.gridtablewidth + 40)
						},
						_initBuildPopup : function() {
							var g = this, p = this.options;
							$(":checkbox", g.popup).unbind();
							$("tbody tr", g.popup).remove();
							$(g.columns)
									.each(
											function(i, column) {
												if (column.issystem) {
													return
												}
												if (column.isAllowHide == false) {
													return
												}
												var chk = 'checked="checked"';
												if (column._hide) {
													chk = ""
												}
												var header = column.display;
												$("tbody", g.popup)
														.append(
																'<tr><td class="l-column-left"><input type="checkbox" '
																		+ chk
																		+ ' class="l-checkbox" columnindex="'
																		+ i
																		+ '"/></td><td class="l-column-right">'
																		+ header
																		+ "</td></tr>")
											});
							if ($.fn.ligerCheckBox) {
								$("input:checkbox", g.popup)
										.ligerCheckBox(
												{
													onBeforeClick : function(
															obj) {
														if (!obj.checked) {
															return true
														}
														if ($("input:checked",
																g.popup).length <= p.minColToggle) {
															return false
														}
														return true
													}
												})
							}
							if (p.allowHideColumn) {
								$("tr", g.popup).hover(function() {
									$(this).addClass("l-popup-row-over")
								}, function() {
									$(this).removeClass("l-popup-row-over")
								});
								var onPopupCheckboxChange = function() {
									if ($("input:checked", g.popup).length + 1 <= p.minColToggle) {
										return false
									}
									g
											.toggleCol(parseInt($(this).attr(
													"columnindex")),
													this.checked, true)
								};
								if ($.fn.ligerCheckBox) {
									$(":checkbox", g.popup).bind("change",
											onPopupCheckboxChange)
								} else {
									$(":checkbox", g.popup).bind("click",
											onPopupCheckboxChange)
								}
							}
						},
						_initHeight : function() {
							var g = this, p = this.options;
							if (p.height == "auto") {
								g.gridbody.height("auto");
								g.f.gridbody.height("auto")
							}
							if (p.width) {
								g.grid.width(p.width)
							}
							g._onResize.call(g)
						},
						_initFootbar : function() {
							var g = this, p = this.options;
							if (p.usePager) {
								var optStr = "";
								var selectedIndex = -1;
								$(p.pageSizeOptions).each(
										function(i, item) {
											var selectedStr = "";
											if (p.pageSize == item) {
												selectedIndex = i
											}
											optStr += "<option value='" + item
													+ "' " + selectedStr + " >"
													+ item + "</option>"
										});
								$(".l-bar-selectpagesize", g.toolbar).append(
										"<select name='rp'>" + optStr
												+ "</select>");
								if (selectedIndex != -1) {
									$(".l-bar-selectpagesize select", g.toolbar)[0].selectedIndex = selectedIndex
								}
								if (p.switchPageSizeApplyComboBox
										&& $.fn.ligerComboBox) {
									$(".l-bar-selectpagesize select", g.toolbar)
											.ligerComboBox(
													{
														onBeforeSelect : function() {
															if (p.url
																	&& g.isDataChanged
																	&& !confirm(p.isContinueByDataChanged)) {
																return false
															}
															return true
														},
														width : 45
													})
								}
							} else {
								g.toolbar.hide()
							}
						},
						_searchData : function(data, clause) {
							var g = this, p = this.options;
							var newData = new Array();
							for ( var i = 0; i < data.length; i++) {
								if (clause(data[i], i)) {
									newData[newData.length] = data[i]
								}
							}
							return newData
						},
						_clearGrid : function() {
							var g = this, p = this.options;
							for ( var i in g.rows) {
								var rowobj = $(g.getRowObj(g.rows[i]));
								if (g.enabledFrozen()) {
									rowobj = rowobj.add(g.getRowObj(g.rows[i],
											true))
								}
								rowobj.unbind()
							}
							g.gridbody.html("");
							g.f.gridbody.html("");
							g.recordNumber = 0;
							g.records = {};
							g.rows = [];
							g.selected = [];
							g.totalNumber = 0;
							g.editorcounter = 0
						},
						_fillGridBody : function(data, frozen) {
							var g = this, p = this.options;
							var gridhtmlarr = [ '<div class="l-grid-body-inner"><table class="l-grid-body-table" cellpadding=0 cellspacing=0><tbody>' ];
							if (g.enabledGroup()) {
								var groups = [];
								var groupsdata = [];
								g.groups = groupsdata;
								for ( var rowparm in data) {
									var item = data[rowparm];
									var groupColumnValue = item[p.groupColumnName];
									var valueIndex = $.inArray(
											groupColumnValue, groups);
									if (valueIndex == -1) {
										groups.push(groupColumnValue);
										valueIndex = groups.length - 1;
										groupsdata.push([])
									}
									groupsdata[valueIndex].push(item)
								}
								$(groupsdata)
										.each(
												function(i, item) {
													if (groupsdata.length == 1) {
														gridhtmlarr
																.push('<tr class="l-grid-grouprow l-grid-grouprow-last l-grid-grouprow-first"')
													}
													if (i == groupsdata.length - 1) {
														gridhtmlarr
																.push('<tr class="l-grid-grouprow l-grid-grouprow-last"')
													} else {
														if (i == 0) {
															gridhtmlarr
																	.push('<tr class="l-grid-grouprow l-grid-grouprow-first"')
														} else {
															gridhtmlarr
																	.push('<tr class="l-grid-grouprow"')
														}
													}
													gridhtmlarr
															.push(' groupindex"='
																	+ i + '" >');
													gridhtmlarr
															.push('<td colSpan="'
																	+ g.columns.length
																	+ '" class="l-grid-grouprow-cell">');
													gridhtmlarr
															.push('<span class="l-grid-group-togglebtn">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
													if (p.groupRender) {
														gridhtmlarr
																.push(p
																		.groupRender(
																				groups[i],
																				item,
																				p.groupColumnDisplay))
													} else {
														gridhtmlarr
																.push(p.groupColumnDisplay
																		+ ":"
																		+ groups[i])
													}
													gridhtmlarr.push("</td>");
													gridhtmlarr.push("</tr>");
													gridhtmlarr.push(g
															._getHtmlFromData(
																	item,
																	frozen));
													if (g.isTotalSummary()) {
														gridhtmlarr
																.push(g
																		._getTotalSummaryHtml(
																				item,
																				"l-grid-totalsummary-group",
																				frozen))
													}
												})
							} else {
								gridhtmlarr.push(g._getHtmlFromData(data,
										frozen))
							}
							gridhtmlarr.push("</tbody></table></div>");
							(frozen ? g.f.gridbody : g.gridbody)
									.html(gridhtmlarr.join(""));
							if (!g.enabledGroup()) {
								g._bulidTotalSummary(frozen)
							}
							$("> div:first", g.gridbody)
									.width(g.gridtablewidth);
							g._onResize()
						},
						_showData : function() {
							
							var g = this, p = this.options;
							var data = g.currentData[p.root];
							if (p.usePager) {
								if (p.dataAction == "server" && g.data
										&& g.data[p.record]) {
									p.total = g.data[p.record]
								} else {
									if (g.filteredData
											&& g.filteredData[p.root]) {
										p.total = g.filteredData[p.root].length
									} else {
										if (g.data && g.data[p.root]) {
											p.total = g.data[p.root].length
										} else {
											if (data) {
												p.total = data.length
											}
										}
									}
								}
								p.page = p.newPage;
								if (!p.total) {
									p.total = 0
								}
								if (!p.page) {
									p.page = 1
								}
								p.pageCount = Math.ceil(p.total / p.pageSize);
								if (!p.pageCount) {
									p.pageCount = 1
								}
								g._buildPager()
							}
							$(".l-bar-btnloading:first", g.toolbar)
									.removeClass("l-bar-btnloading");
							if (g.trigger("beforeShowData", [ g.currentData ]) == false) {
								return
							}
							g._clearGrid();
							g.isDataChanged = false;
							if (!data) {
								return
							}
							$(".l-bar-btnload:first span", g.toolbar)
									.removeClass("l-disabled");
							g._updateGridData();
//							alert(1);
							if (g.enabledFrozen()) {
								g._fillGridBody(g.rows, true)
							}
							g._fillGridBody(g.rows, false);
//							alert(3);
							g.trigger("SysGridHeightChanged");
							if (p.totalRender) {
								$(".l-panel-bar-total", g.element).remove();
								$(".l-panel-bar", g.element).before(
										'<div class="l-panel-bar-total">'
												+ p.totalRender(g.data,
														g.filteredData)
												+ "</div>")
							}
							if (p.mouseoverRowCssClass) {
								for ( var i in g.rows) {
									var rowobj = $(g.getRowObj(g.rows[i]));
									if (g.enabledFrozen()) {
										rowobj = rowobj.add(g.getRowObj(
												g.rows[i], true))
									}
									rowobj.bind("mouseover.gridrow",
											function() {
												g._onRowOver(this, true)
											}).bind("mouseout.gridrow",
											function() {
												g._onRowOver(this, false)
											})
								}
							}
							g.gridbody.trigger("scroll.grid");
							g.trigger("afterShowData", [ g.currentData ])
						},
						_getRowDomId : function(rowdata, frozen) {
							return this.id + "|" + (frozen ? "1" : "2") + "|"
									+ rowdata.__id
						},
						_getCellDomId : function(rowdata, column) {
							return this._getRowDomId(rowdata, column.frozen)
									+ "|" + column.__id
						},
						_getHtmlFromData : function(data, frozen) {
							if (!data) {
								return ""
							}
							var g = this, p = this.options;
							var gridhtmlarr = [];
							for ( var rowparm in data) {
								var item = data[rowparm];
								var rowid = item.__id;
								if (!item) {
									continue
								}
								gridhtmlarr.push("<tr");
								gridhtmlarr.push(' id="'
										+ g._getRowDomId(item, frozen) + '"');
								gridhtmlarr.push(' class="l-grid-row');
								if (!frozen && g.enabledCheckbox()
										&& p.isChecked && p.isChecked(item)) {
									g.select(item);
									gridhtmlarr.push(" l-selected")
								} else {
									if (g.isSelected(item)) {
										gridhtmlarr.push(" l-selected")
									}
								}
								if (item.__index % 2 == 1 && p.alternatingRow) {
									gridhtmlarr.push(" l-grid-row-alt")
								}
								gridhtmlarr.push('" ');
								if (p.rowAttrRender) {
									gridhtmlarr.push(p.rowAttrRender(item,
											rowid))
								}
								if (p.tree && g.collapsedRows
										&& g.collapsedRows.length) {
									var isHide = function() {
										var pitem = g.getParent(item);
										while (pitem) {
											if ($.inArray(pitem,
													g.collapsedRows) != -1) {
												return true
											}
											pitem = g.getParent(pitem)
										}
										return false
									};
									if (isHide()) {
										gridhtmlarr
												.push(' style="display:none;" ')
									}
								}
								gridhtmlarr.push(">");
								$(g.columns)
										.each(
												function(columnindex, column) {
													if (frozen != column.frozen) {
														return
													}
													gridhtmlarr.push("<td");
													gridhtmlarr.push(' id="'
															+ g._getCellDomId(
																	item, this)
															+ '"');
													if (this.isrownumber) {
														gridhtmlarr
																.push(' class="l-grid-row-cell l-grid-row-cell-rownumbers" style="width:'
																		+ this.width
																		+ 'px"><div class="l-grid-row-cell-inner"');
														if (p.fixedCellHeight) {
															gridhtmlarr
																	.push(' style = "height:'
																			+ p.rowHeight
																			+ 'px;" ')
														}
														gridhtmlarr
																.push(">"
																		+ (parseInt(item.__index) + 1)
																		+ "</div></td>");
														return
													}
													if (this.ischeckbox) {
														gridhtmlarr
																.push(' class="l-grid-row-cell l-grid-row-cell-checkbox" style="width:'
																		+ this.width
																		+ 'px"><div class="l-grid-row-cell-inner"');
														if (p.fixedCellHeight) {
															gridhtmlarr
																	.push(' style = "height:'
																			+ p.rowHeight
																			+ 'px;" ')
														}
														gridhtmlarr
																.push('><span class="l-grid-row-cell-btn-checkbox"></span></div></td>');
														return
													} else {
														if (this.isdetail) {
															gridhtmlarr
																	.push(' class="l-grid-row-cell l-grid-row-cell-detail" style="width:'
																			+ this.width
																			+ 'px"><div class="l-grid-row-cell-inner"');
															if (p.fixedCellHeight) {
																gridhtmlarr
																		.push(' style = "height:'
																				+ p.rowHeight
																				+ 'px;" ')
															}
															gridhtmlarr
																	.push('><span class="l-grid-row-cell-detailbtn"></span></div></td>');
															return
														}
													}
													var colwidth = this._width;
													gridhtmlarr
															.push(' class="l-grid-row-cell ');
													if (g.changedCells[rowid
															+ "_"
															+ this["__id"]]) {
														gridhtmlarr
																.push("l-grid-row-cell-edited ")
													}
													if (this.islast) {
														gridhtmlarr
																.push("l-grid-row-cell-last ")
													}
													gridhtmlarr.push('"');
													gridhtmlarr
															.push(' style = "');
													gridhtmlarr
															.push("width:"
																	+ colwidth
																	+ "px; ");
													if (column._hide) {
														gridhtmlarr
																.push("display:none;")
													}
													gridhtmlarr.push(' ">');
													gridhtmlarr.push(g
															._getCellHtml(item,
																	column));
													gridhtmlarr.push("</td>")
												});
								gridhtmlarr.push("</tr>")
							}
							return gridhtmlarr.join("")
						},
						_getCellHtml : function(rowdata, column) {
							var g = this, p = this.options;
							if (column.isrownumber) {
								return '<div class="l-grid-row-cell-inner">'
										+ (parseInt(rowdata.__index) + 1)
										+ "</div>"
							}
							var htmlarr = [];
							htmlarr.push('<div class="l-grid-row-cell-inner"');
							htmlarr.push(' style = "width:'
									+ parseInt(column._width - 8) + "px;");
							if (p.fixedCellHeight) {
								htmlarr.push("height:" + p.rowHeight
										+ "px;min-height:" + p.rowHeight
										+ "px; ")
							}
							if (column.align) {
								htmlarr
										.push("text-align:" + column.align
												+ ";")
							}
							var content = g._getCellContent(rowdata, column);
							htmlarr.push('">' + content + "</div>");
							return htmlarr.join("")
						},
						_getCellContent : function(rowdata, column) {
							if (!rowdata || !column) {
								return ""
							}
							if (column.isrownumber) {
								return parseInt(rowdata.__index) + 1
							}
							var rowid = rowdata.__id;
							var rowindex = rowdata.__index;
							var value=null;
							if(column.name){
								var i=column.name.indexOf(".");
								if(i>0){
									value=eval("rowdata."+column.name);
								}else{
									value= rowdata[column.name];
								}
							}
//							var value = column.name ? rowdata[column.name]
//									: null;
							var g = this, p = this.options;
							var content = "";
							if (column.render) {
								content = column.render.call(g, rowdata,
										rowindex, value, column)
							} else {
								if (p.formatters[column.type]) {
									content = p.formatters[column.type].call(g,
											value, column)
								} else {
									if (value != null) {
										content = value.toString()
									}
								}
							}
							if (p.tree
									&& (p.tree.columnName != null
											&& p.tree.columnName == column.name || p.tree.columnId != null
											&& p.tree.columnId == column.id)) {
								content = g._getTreeCellHtml(content, rowdata)
							}
							return content || ""
						},
						_getTreeCellHtml : function(oldContent, rowdata) {
							var level = rowdata.__level;
							var g = this, p = this.options;
							var isExtend = $.inArray(rowdata, g.collapsedRows
									|| []) == -1;
							var isParent = p.tree.isParent(rowdata);
							var content = "";
							level = parseInt(level) || 1;
							for ( var i = 1; i < level; i++) {
								content += "<div class='l-grid-tree-space'></div>"
							}
							if (isExtend && isParent) {
								content += "<div class='l-grid-tree-space l-grid-tree-link l-grid-tree-link-open'></div>"
							} else {
								if (isParent) {
									content += "<div class='l-grid-tree-space l-grid-tree-link l-grid-tree-link-close'></div>"
								} else {
									content += "<div class='l-grid-tree-space'></div>"
								}
							}
							content += "<span class='l-grid-tree-content'>"
									+ oldContent + "</span>";
							return content
						},
						_applyEditor : function(obj) {
							var g = this, p = this.options;
							var rowcell = obj;
							var ids = rowcell.id.split("|");
							var columnid = ids[ids.length - 1];
							var column = g._columns[columnid];
							var row = $(rowcell).parent();
							var rowdata = g.getRow(row[0]);
							var rowid = rowdata.__id;
							var rowindex = rowdata.__index;
							if (!column || !column.editor) {
								return
							}
							var columnname = column.name;
							var columnindex = column.columnindex;
							if (column.editor.type
									&& p.editors[column.editor.type]) {
								var currentdata = rowdata[columnname];
								var editParm = {
									record : rowdata,
									value : currentdata,
									column : column,
									rowindex : rowindex
								};
								if (g.trigger("beforeEdit", [ editParm ]) == false) {
									return false
								}
								var editor = p.editors[column.editor.type];
								var jcell = $(rowcell), offset = $(rowcell)
										.offset();
								jcell.html("");
								g.setCellEditing(rowdata, column, true);
								var width = $(rowcell).width(), height = $(
										rowcell).height();
								var container = $(
										"<div class='l-grid-editor'></div>")
										.appendTo("body");
								if ($.browser.mozilla) {
									container.css({
										left : offset.left,
										top : offset.top
									}).show()
								} else {
									container.css({
										left : offset.left + 1,
										top : offset.top + 1
									}).show()
								}
								var editorInput = g._createEditor(editor,
										container, editParm, width, height);
								g.editor = {
									editing : true,
									editor : editor,
									input : editorInput,
									editParm : editParm,
									container : container
								};
								editorInput.attr('class','text');
								// $('<input class="l-button"
								// style="float:right" type="button" value="保存"
								// id="editor_save"/><div
								// style="float:right;width:10px;height:10px;display:block;"></div><input
								// class="l-button" style="float:right"
								// type="reset" name="button" id="button"
								// value="取消" id="editor_cancel"/>')
								// .appendTo(container);
								g.unbind("sysEndEdit");
								g
										.bind(
												"sysEndEdit",
												function() {
													var newValue = editor
															.getValue(
																	editorInput,
																	editParm);
													if (newValue != currentdata) {
														$(rowcell)
																.addClass(
																		"l-grid-row-cell-edited");
														g.changedCells[rowid
																+ "_"
																+ column.__id] = true;
														if (column.editor.onChange) {
															column.editor
																	.onChange(
																			rowcell,
																			newValue)
														}
														editParm.value = newValue;
														if (g
																._checkEditAndUpdateCell(editParm)) {
															if (column.editor.onChanged) {
																column.editor
																		.onChanged(
																				rowcell,
																				newValue)
															}
														}
													}
												})
												
											// 添加开始编辑后事件
											g.trigger("afterBeginEdit", [ editorInput, editParm ]);
							}
						},
						_checkEditAndUpdateCell : function(editParm) {
							var g = this, p = this.options;
							if (g.trigger("beforeSubmitEdit", [ editParm ]) == false) {
								return false
							}
							g.updateCell(editParm.column, editParm.value,
									editParm.record);
							if (editParm.column.render || g.enabledTotal()) {
								g.reRender({
									column : editParm.column
								})
							}
							g.reRender({
								rowdata : editParm.record
							});
							return true
						},
						_getCurrentPageData : function(source) {
							var g = this, p = this.options;
							var data = {};
							data[p.root] = [];
							if (!source || !source[p.root]
									|| !source[p.root].length) {
								data[p.record] = 0;
								return data
							}
							data[p.record] = source[p.root].length;
							if (!p.newPage) {
								p.newPage = 1
							}
							for (i = (p.newPage - 1) * p.pageSize; i < source[p.root].length
									&& i < p.newPage * p.pageSize; i++) {
								data[p.root].push(source[p.root][i])
							}
							return data
						},
						_compareData : function(data1, data2, columnName,
								columnType) {
							var g = this, p = this.options;
							var val1 = data1[columnName], val2 = data2[columnName];
							if (val1 == null && val2 != null) {
								return 1
							} else {
								if (val1 == null && val2 == null) {
									return 0
								} else {
									if (val1 != null && val2 == null) {
										return -1
									}
								}
							}
							if (p.sorters[columnType]) {
								return p.sorters[columnType]
										.call(g, val1, val2)
							} else {
								return val1 < val2 ? -1 : val1 > val2 ? 1 : 0
							}
						},
						_getTotalCellContent : function(column, data) {
							var g = this, p = this.options;
							var totalsummaryArr = [];
							if (column.totalSummary) {
								var isExist = function(type) {
									for ( var i = 0; i < types.length; i++) {
										if (types[i].toLowerCase() == type
												.toLowerCase()) {
											return true
										}
									}
									return false
								};
								var sum = 0, count = 0, avg = 0;
								var max = parseFloat(data[0][column.name]);
								var min = parseFloat(data[0][column.name]);
								for ( var i = 0; i < data.length; i++) {
									count += 1;
									var value = parseFloat(data[i][column.name]);
									if (!value) {
										continue
									}
									sum += value;
									if (value > max) {
										max = value
									}
									if (value < min) {
										min = value
									}
								}
								avg = sum * 1 / data.length;
								if (column.totalSummary.render) {
									var renderhtml = column.totalSummary
											.render({
												sum : sum,
												count : count,
												avg : avg,
												min : min,
												max : max
											}, column, g.data);
									totalsummaryArr.push(renderhtml)
								} else {
									if (column.totalSummary.type) {
										var types = column.totalSummary.type
												.split(",");
										if (isExist("sum")) {
											totalsummaryArr
													.push("<div>Sum="
															+ sum.toFixed(2)
															+ "</div>")
										}
										if (isExist("count")) {
											totalsummaryArr.push("<div>Count="
													+ count + "</div>")
										}
										if (isExist("max")) {
											totalsummaryArr
													.push("<div>Max="
															+ max.toFixed(2)
															+ "</div>")
										}
										if (isExist("min")) {
											totalsummaryArr
													.push("<div>Min="
															+ min.toFixed(2)
															+ "</div>")
										}
										if (isExist("avg")) {
											totalsummaryArr
													.push("<div>Avg="
															+ avg.toFixed(2)
															+ "</div>")
										}
										if (isExist('应收总计'))
						                    totalsummaryArr.push("<div>应收总计=" + sum.toFixed(2) + "元</div>");
						                if (isExist('缴费项'))
						                    totalsummaryArr.push("<div>缴费项=" + count + "项</div>");
									}
								}
							}
							return totalsummaryArr.join("")
						},
						_getTotalSummaryHtml : function(data, classCssName,
								frozen) {
							var g = this, p = this.options;
							var totalsummaryArr = [];
							if (classCssName) {
								totalsummaryArr
										.push('<tr class="l-grid-totalsummary '
												+ classCssName + '">')
							} else {
								totalsummaryArr
										.push('<tr class="l-grid-totalsummary">')
							}
							$(g.columns)
									.each(
											function(columnindex, column) {
												if (this.frozen != frozen) {
													return
												}
												if (this.isrownumber) {
													totalsummaryArr
															.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-rownumbers" style="width:'
																	+ this.width
																	+ 'px"><div>&nbsp;</div></td>');
													return
												}
												if (this.ischeckbox) {
													totalsummaryArr
															.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-checkbox" style="width:'
																	+ this.width
																	+ 'px"><div>&nbsp;</div></td>');
													return
												} else {
													if (this.isdetail) {
														totalsummaryArr
																.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-detail" style="width:'
																		+ this.width
																		+ 'px"><div>&nbsp;</div></td>');
														return
													}
												}
												totalsummaryArr
														.push('<td class="l-grid-totalsummary-cell');
												if (this.islast) {
													totalsummaryArr
															.push(" l-grid-totalsummary-cell-last")
												}
												totalsummaryArr.push('" ');
												totalsummaryArr.push('id="'
														+ g.id + "|total"
														+ g.totalNumber + "|"
														+ column.__id + '" ');
												totalsummaryArr.push('width="'
														+ this._width + '" ');
												columnname = this.columnname;
												if (columnname) {
													totalsummaryArr
															.push('columnname="'
																	+ columnname
																	+ '" ')
												}
												totalsummaryArr
														.push('columnindex="'
																+ columnindex
																+ '" ');
												totalsummaryArr
														.push('><div class="l-grid-totalsummary-cell-inner"');
												if (column.align) {
													totalsummaryArr
															.push(' style="text-Align:'
																	+ column.align
																	+ ';"')
												}
												totalsummaryArr.push(">");
												totalsummaryArr.push(g
														._getTotalCellContent(
																column, data));
												totalsummaryArr
														.push("</div></td>")
											});
							totalsummaryArr.push("</tr>");
							if (!frozen) {
								g.totalNumber++
							}
							return totalsummaryArr.join("")
						},
						_bulidTotalSummary : function(frozen) {
							var g = this, p = this.options;
							if (!g.isTotalSummary()) {
								return false
							}
							if (!g.currentData
									|| g.currentData[p.root].length == 0) {
								return false
							}
							var totalRow = $(g._getTotalSummaryHtml(
									g.currentData[p.root], null, frozen));
							$("tbody:first", frozen ? g.f.gridbody : g.gridbody)
									.append(totalRow)
						},
						_buildPager : function() {
							var g = this, p = this.options;
							$(".pcontrol input", g.toolbar).val(p.page);
							if (!p.pageCount) {
								p.pageCount = 1
							}
							$(".pcontrol span", g.toolbar).html.ligerDefer($(
									".pcontrol span", g.toolbar), 10,
									[ p.pageCount ]);
							$(".pcontrol span", g.toolbar).html(p.pageCount);
							var r1 = parseInt((p.page - 1) * p.pageSize) + 1;
							var r2 = parseInt(r1) + parseInt(p.pageSize) - 1;
							if (!p.total) {
								p.total = 0
							}
							if (p.total < r2) {
								r2 = p.total
							}
							if (!p.total) {
								r1 = r2 = 0
							}
							if (r1 < 0) {
								r1 = 0
							}
							if (r2 < 0) {
								r2 = 0
							}
							var stat = p.pageStatMessage;
							stat = stat.replace(/{from}/, r1);
							stat = stat.replace(/{to}/, r2);
							stat = stat.replace(/{total}/, p.total);
							stat = stat.replace(/{pagesize}/, p.pageSize);
							$(".l-bar-text", g.toolbar).html(stat);
							if (!p.total) {
								$(
										".l-bar-btnfirst span,.l-bar-btnprev span,.l-bar-btnnext span,.l-bar-btnlast span",
										g.toolbar).addClass("l-disabled")
							}
							if (p.page == 1) {
								$(".l-bar-btnfirst span", g.toolbar).addClass(
										"l-disabled");
								$(".l-bar-btnprev span", g.toolbar).addClass(
										"l-disabled")
							} else {
								if (p.page > p.pageCount && p.pageCount > 0) {
									$(".l-bar-btnfirst span", g.toolbar)
											.removeClass("l-disabled");
									$(".l-bar-btnprev span", g.toolbar)
											.removeClass("l-disabled")
								}
							}
							if (p.page == p.pageCount) {
								$(".l-bar-btnlast span", g.toolbar).addClass(
										"l-disabled");
								$(".l-bar-btnnext span", g.toolbar).addClass(
										"l-disabled")
							} else {
								if (p.page < p.pageCount && p.pageCount > 0) {
									$(".l-bar-btnlast span", g.toolbar)
											.removeClass("l-disabled");
									$(".l-bar-btnnext span", g.toolbar)
											.removeClass("l-disabled")
								}
							}
						},
						_getRowIdByDomId : function(domid) {
							var ids = domid.split("|");
							var rowid = ids[2];
							return rowid
						},
						_getRowByDomId : function(domid) {
							return this.records[this._getRowIdByDomId(domid)]
						},
						_getSrcElementByEvent : function(e) {
							var g = this;
							var obj = (e.target || e.srcElement);
							var jobjs = $(obj).parents().add(obj);
							var fn = function(parm) {
								for ( var i = 0, l = jobjs.length; i < l; i++) {
									if (typeof parm == "string") {
										if ($(jobjs[i]).hasClass(parm)) {
											return jobjs[i]
										}
									} else {
										if (typeof parm == "object") {
											if (jobjs[i] == parm) {
												return jobjs[i]
											}
										}
									}
								}
								return null
							};
							if (fn("l-grid-editor")) {
								return {
									editing : true,
									editor : fn("l-grid-editor")
								}
							}
							if (fn("l-box-dateeditor")) {
								return {
									editing : true
								}
							}
							if (jobjs.index(this.element) == -1) {
								return {
									out : true
								}
							}
							var indetail = false;
							if (jobjs.hasClass("l-grid-detailpanel")
									&& g.detailrows) {
								for ( var i = 0, l = g.detailrows.length; i < l; i++) {
									if (jobjs.index(g.detailrows[i]) != -1) {
										indetail = true;
										break
									}
								}
							}
							var r = {
								grid : fn("l-panel"),
								indetail : indetail,
								frozen : fn(g.gridview1[0]) ? true : false,
								header : fn("l-panel-header"),
								gridheader : fn("l-grid-header"),
								gridbody : fn("l-grid-body"),
								total : fn("l-panel-bar-total"),
								popup : fn("l-grid-popup"),
								toolbar : fn("l-panel-bar")
							};
							if (r.gridheader) {
								r.hrow = fn("l-grid-hd-row");
								r.hcell = fn("l-grid-hd-cell");
								r.hcelltext = fn("l-grid-hd-cell-text");
								r.checkboxall = fn("l-grid-hd-cell-checkbox");
								if (r.hcell) {
									var columnid = r.hcell.id.split("|")[2];
									r.column = g._columns[columnid]
								}
							}
							if (r.gridbody) {
								r.row = fn("l-grid-row");
								r.cell = fn("l-grid-row-cell");
								r.checkbox = fn("l-grid-row-cell-btn-checkbox");
								r.groupbtn = fn("l-grid-group-togglebtn");
								r.grouprow = fn("l-grid-grouprow");
								r.detailbtn = fn("l-grid-row-cell-detailbtn");
								r.detailrow = fn("l-grid-detailpanel");
								r.totalrow = fn("l-grid-totalsummary");
								r.totalcell = fn("l-grid-totalsummary-cell");
								r.rownumberscell = $(r.cell).hasClass(
										"l-grid-row-cell-rownumbers") ? r.cell
										: null;
								r.detailcell = $(r.cell).hasClass(
										"l-grid-row-cell-detail") ? r.cell
										: null;
								r.checkboxcell = $(r.cell).hasClass(
										"l-grid-row-cell-checkbox") ? r.cell
										: null;
								r.treelink = fn("l-grid-tree-link");
								r.editor = fn("l-grid-editor");
								if (r.row) {
									r.data = this._getRowByDomId(r.row.id)
								}
								if (r.cell) {
									r.editing = $(r.cell).hasClass(
											"l-grid-row-cell-editing")
								}
								if (r.editor) {
									r.editing = true
								}
								if (r.editing) {
									r.out = false
								}
							}
							if (r.toolbar) {
								r.first = fn("l-bar-btnfirst");
								r.last = fn("l-bar-btnlast");
								r.next = fn("l-bar-btnnext");
								r.prev = fn("l-bar-btnprev");
								r.load = fn("l-bar-btnload");
								r.button = fn("l-bar-button")
							}
							return r
						},
						_setEvent : function() {
							var g = this, p = this.options;
							g.grid.bind("mousedown.grid", function(e) {
								g._onMouseDown.call(g, e)
							});
							g.grid.bind("dblclick.grid", function(e) {
								g._onDblClick.call(g, e)
							});
							g.grid.bind("contextmenu.grid", function(e) {
								return g._onContextmenu.call(g, e)
							});
							$(document).bind("mouseup.grid", function(e) {
								g._onMouseUp.call(g, e)
							});
							$(document).bind("click.grid", function(e) {
								g._onClick.call(g, e)
							});
							$(window).bind("resize.grid", function(e) {
								g._onResize.call(g)
							});
							$(document).bind("keydown.grid", function(e) {
								if (e.ctrlKey) {
									g.ctrlKey = true
								}
							});
							$(document).bind("keyup.grid", function(e) {
								delete g.ctrlKey
							});
							g.gridbody.bind("scroll.grid", function() {
								var scrollLeft = g.gridbody.scrollLeft();
								var scrollTop = g.gridbody.scrollTop();
								if (scrollLeft != null) {
									g.gridheader[0].scrollLeft = scrollLeft
								}
								if (scrollTop != null) {
									g.f.gridbody[0].scrollTop = scrollTop
								}
								g.endEdit();
								g.trigger("SysGridHeightChanged")
							});
							$("select", g.toolbar)
									.change(
											function() {
												if (g.isDataChanged
														&& !confirm(p.isContinueByDataChanged)) {
													return false
												}
												p.newPage = 1;
												p.pageSize = this.value;
												g.loadData(p.where)
											});
							$("span.pcontrol :text", g.toolbar).blur(
									function(e) {
										g.changePage("input")
									});
							$("div.l-bar-button", g.toolbar).hover(function() {
								$(this).addClass("l-bar-button-over")
							}, function() {
								$(this).removeClass("l-bar-button-over")
							});
							if ($.fn.ligerDrag && p.colDraggable) {
								g.colDroptip = $(
										"<div class='l-drag-coldroptip' style='display:none'><div class='l-drop-move-up'></div><div class='l-drop-move-down'></div></div>")
										.appendTo("body");
								g.gridheader
										.add(g.f.gridheader)
										.ligerDrag(
												{
													revert : true,
													animate : false,
													proxyX : 0,
													proxyY : 0,
													proxy : function(draggable,
															e) {
														var src = g
																._getSrcElementByEvent(e);
														if (src.hcell
																&& src.column) {
															var content = $(
																	".l-grid-hd-cell-text:first",
																	src.hcell)
																	.html();
															var proxy = $(
																	"<div class='l-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div></div>")
																	.appendTo(
																			"body");
															proxy
																	.append(content);
															return proxy
														}
													},
													onRevert : function() {
														return false
													},
													onRendered : function() {
														this.set("cursor",
																"default");
														g.children[this.id] = this
													},
													onStartDrag : function(
															current, e) {
														if (e.button == 2) {
															return false
														}
														if (g.colresizing) {
															return false
														}
														this.set("cursor",
																"default");
														var src = g
																._getSrcElementByEvent(e);
														if (!src.hcell
																|| !src.column
																|| src.column.issystem
																|| src.hcelltext) {
															return false
														}
														if ($(src.hcell)
																.css("cursor")
																.indexOf(
																		"resize") != -1) {
															return false
														}
														this.draggingColumn = src.column;
														g.coldragging = true;
														var gridOffset = g.grid
																.offset();
														this.validRange = {
															top : gridOffset.top,
															bottom : gridOffset.top
																	+ g.gridheader
																			.height(),
															left : gridOffset.left - 10,
															right : gridOffset.left
																	+ g.grid
																			.width()
																	+ 10
														}
													},
													onDrag : function(current,
															e) {
														this.set("cursor",
																"default");
														var column = this.draggingColumn;
														if (!column) {
															return false
														}
														if (g.colresizing) {
															return false
														}
														if (g.colDropIn == null) {
															g.colDropIn = -1
														}
														var pageX = e.pageX;
														var pageY = e.pageY;
														var visit = false;
														var gridOffset = g.grid
																.offset();
														var validRange = this.validRange;
														if (pageX < validRange.left
																|| pageX > validRange.right
																|| pageY > validRange.bottom
																|| pageY < validRange.top) {
															g.colDropIn = -1;
															g.colDroptip.hide();
															this.proxy
																	.find(
																			".l-drop-icon:first")
																	.removeClass(
																			"l-drop-yes")
																	.addClass(
																			"l-drop-no");
															return
														}
														for ( var colid in g._columns) {
															var col = g._columns[colid];
															if (column == col) {
																visit = true;
																continue
															}
															if (col.issystem) {
																continue
															}
															var sameLevel = col.__level == column.__level;
															var isAfter = !sameLevel ? false
																	: visit ? true
																			: false;
															if (column.frozen != col.frozen) {
																isAfter = col.frozen ? false
																		: true
															}
															if (g.colDropIn != -1
																	&& g.colDropIn != colid) {
																continue
															}
															var cell = document
																	.getElementById(col.__domid);
															var offset = $(cell)
																	.offset();
															var range = {
																top : offset.top,
																bottom : offset.top
																		+ $(
																				cell)
																				.height(),
																left : offset.left - 10,
																right : offset.left + 10
															};
															if (isAfter) {
																var cellwidth = $(
																		cell)
																		.width();
																range.left += cellwidth;
																range.right += cellwidth
															}
															if (pageX > range.left
																	&& pageX < range.right
																	&& pageY > range.top
																	&& pageY < range.bottom) {
																var height = p.headerRowHeight;
																if (col.__rowSpan) {
																	height *= col.__rowSpan
																}
																g.colDroptip
																		.css(
																				{
																					left : range.left + 5,
																					top : range.top - 9,
																					height : height + 9 * 2
																				})
																		.show();
																g.colDropIn = colid;
																g.colDropDir = isAfter ? "right"
																		: "left";
																this.proxy
																		.find(
																				".l-drop-icon:first")
																		.removeClass(
																				"l-drop-no")
																		.addClass(
																				"l-drop-yes");
																break
															} else {
																if (g.colDropIn != -1) {
																	g.colDropIn = -1;
																	g.colDroptip
																			.hide();
																	this.proxy
																			.find(
																					".l-drop-icon:first")
																			.removeClass(
																					"l-drop-yes")
																			.addClass(
																					"l-drop-no")
																}
															}
														}
													},
													onStopDrag : function(
															current, e) {
														var column = this.draggingColumn;
														g.coldragging = false;
														if (g.colDropIn != -1) {
															g.changeCol
																	.ligerDefer(
																			g,
																			0,
																			[
																					column,
																					g.colDropIn,
																					g.colDropDir == "right" ]);
															g.colDropIn = -1
														}
														g.colDroptip.hide();
														this.set("cursor",
																"default")
													}
												})
							}
							if ($.fn.ligerDrag && p.rowDraggable) {
								g.rowDroptip = $(
										"<div class='l-drag-rowdroptip' style='display:none'></div>")
										.appendTo("body");
								g.gridbody
										.add(g.f.gridbody)
										.ligerDrag(
												{
													revert : true,
													animate : false,
													proxyX : 0,
													proxyY : 0,
													proxy : function(draggable,
															e) {
														var src = g
																._getSrcElementByEvent(e);
														if (src.row) {
															var content = p.draggingMessage
																	.replace(
																			/{count}/,
																			draggable.draggingRows ? draggable.draggingRows.length
																					: 1);
															if (p.rowDraggingRender) {
																content = p
																		.rowDraggingRender(
																				draggable.draggingRows,
																				draggable,
																				g)
															}
															var proxy = $(
																	"<div class='l-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div>"
																			+ content
																			+ "</div>")
																	.appendTo(
																			"body");
															return proxy
														}
													},
													onRevert : function() {
														return false
													},
													onRendered : function() {
														this.set("cursor",
																"default");
														g.children[this.id] = this
													},
													onStartDrag : function(
															current, e) {
														if (e.button == 2) {
															return false
														}
														if (g.colresizing) {
															return false
														}
														if (!g.columns.length) {
															return false
														}
														this.set("cursor",
																"default");
														var src = g
																._getSrcElementByEvent(e);
														if (!src.cell
																|| !src.data
																|| src.checkbox) {
															return false
														}
														var ids = src.cell.id
																.split("|");
														var column = g._columns[ids[ids.length - 1]];
														if (src.rownumberscell
																|| src.detailcell
																|| src.checkboxcell
																|| column == g.columns[0]) {
															if (g
																	.enabledCheckbox()) {
																this.draggingRows = g
																		.getSelecteds();
																if (!this.draggingRows
																		|| !this.draggingRows.length) {
																	return false
																}
															} else {
																this.draggingRows = [ src.data ]
															}
															this.draggingRow = src.data;
															this.set("cursor",
																	"move");
															g.rowdragging = true;
															this.validRange = {
																top : g.gridbody
																		.offset().top,
																bottom : g.gridbody
																		.offset().top
																		+ g.gridbody
																				.height(),
																left : g.grid
																		.offset().left - 10,
																right : g.grid
																		.offset().left
																		+ g.grid
																				.width()
																		+ 10
															}
														} else {
															return false
														}
													},
													onDrag : function(current,
															e) {
														var rowdata = this.draggingRow;
														if (!rowdata) {
															return false
														}
														var rows = this.draggingRows ? this.draggingRows
																: [ rowdata ];
														if (g.colresizing) {
															return false
														}
														if (g.rowDropIn == null) {
															g.rowDropIn = -1
														}
														var pageX = e.pageX;
														var pageY = e.pageY;
														var visit = false;
														var validRange = this.validRange;
														if (pageX < validRange.left
																|| pageX > validRange.right
																|| pageY > validRange.bottom
																|| pageY < validRange.top) {
															g.rowDropIn = -1;
															g.rowDroptip.hide();
															this.proxy
																	.find(
																			".l-drop-icon:first")
																	.removeClass(
																			"l-drop-yes l-drop-add")
																	.addClass(
																			"l-drop-no");
															return
														}
														for ( var i in g.rows) {
															var rd = g.rows[i];
															var rowid = rd.__id;
															if (rowdata == rd) {
																visit = true
															}
															if ($.inArray(rd,
																	rows) != -1) {
																continue
															}
															var isAfter = visit ? true
																	: false;
															if (g.rowDropIn != -1
																	&& g.rowDropIn != rowid) {
																continue
															}
															var rowobj = g
																	.getRowObj(rowid);
															var offset = $(
																	rowobj)
																	.offset();
															var range = {
																top : offset.top - 4,
																bottom : offset.top
																		+ $(
																				rowobj)
																				.height()
																		+ 4,
																left : g.grid
																		.offset().left,
																right : g.grid
																		.offset().left
																		+ g.grid
																				.width()
															};
															if (pageX > range.left
																	&& pageX < range.right
																	&& pageY > range.top
																	&& pageY < range.bottom) {
																var lineTop = offset.top;
																if (isAfter) {
																	lineTop += $(
																			rowobj)
																			.height()
																}
																g.rowDroptip
																		.css(
																				{
																					left : range.left,
																					top : lineTop,
																					width : range.right
																							- range.left
																				})
																		.show();
																g.rowDropIn = rowid;
																g.rowDropDir = isAfter ? "bottom"
																		: "top";
																if (p.tree
																		&& pageY > range.top + 5
																		&& pageY < range.bottom - 5) {
																	this.proxy
																			.find(
																					".l-drop-icon:first")
																			.removeClass(
																					"l-drop-no l-drop-yes")
																			.addClass(
																					"l-drop-add");
																	g.rowDroptip
																			.hide();
																	g.rowDropInParent = true
																} else {
																	this.proxy
																			.find(
																					".l-drop-icon:first")
																			.removeClass(
																					"l-drop-no l-drop-add")
																			.addClass(
																					"l-drop-yes");
																	g.rowDroptip
																			.show();
																	g.rowDropInParent = false
																}
																break
															} else {
																if (g.rowDropIn != -1) {
																	g.rowDropIn = -1;
																	g.rowDropInParent = false;
																	g.rowDroptip
																			.hide();
																	this.proxy
																			.find(
																					".l-drop-icon:first")
																			.removeClass(
																					"l-drop-yes  l-drop-add")
																			.addClass(
																					"l-drop-no")
																}
															}
														}
													},
													onStopDrag : function(
															current, e) {
														var rows = this.draggingRows;
														g.rowdragging = false;
														for ( var i = 0; i < rows.length; i++) {
															var children = rows[i].children;
															if (children) {
																rows = $
																		.grep(
																				rows,
																				function(
																						node,
																						i) {
																					var isIn = $
																							.inArray(
																									node,
																									children) == -1;
																					return isIn
																				})
															}
														}
														if (g.rowDropIn != -1) {
															if (p.tree) {
																var neardata, prow;
																if (g.rowDropInParent) {
																	prow = g
																			.getRow(g.rowDropIn)
																} else {
																	neardata = g
																			.getRow(g.rowDropIn);
																	prow = g
																			.getParent(neardata)
																}
																g
																		.appendRange(
																				rows,
																				prow,
																				neardata,
																				g.rowDropDir != "bottom");
																g
																		.trigger(
																				"rowDragDrop",
																				{
																					rows : rows,
																					parent : prow,
																					near : neardata,
																					after : g.rowDropDir == "bottom"
																				})
															} else {
																g
																		.moveRange(
																				rows,
																				g.rowDropIn,
																				g.rowDropDir == "bottom");
																g
																		.trigger(
																				"rowDragDrop",
																				{
																					rows : rows,
																					parent : prow,
																					near : g
																							.getRow(g.rowDropIn),
																					after : g.rowDropDir == "bottom"
																				})
															}
															g.rowDropIn = -1
														}
														g.rowDroptip.hide();
														this.set("cursor",
																"default")
													}
												})
							}
						},
						_onRowOver : function(rowParm, over) {
							if (l.draggable.dragging) {
								return
							}
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							var methodName = over ? "addClass" : "removeClass";
							if (g.enabledFrozen()) {
								$(g.getRowObj(rowdata, true))[methodName]
										(p.mouseoverRowCssClass)
							}
							$(g.getRowObj(rowdata, false))[methodName]
									(p.mouseoverRowCssClass)
						},
						_onMouseUp : function(e) {
							var g = this, p = this.options;
							if (l.draggable.dragging) {
								var src = g._getSrcElementByEvent(e);
								if (src.hcell && src.column) {
									g.trigger("dragdrop", [ {
										type : "header",
										column : src.column,
										cell : src.hcell
									}, e ])
								} else {
									if (src.row) {
										g.trigger("dragdrop", [ {
											type : "row",
											record : src.data,
											row : src.row
										}, e ])
									}
								}
							}
						},
						_onMouseDown : function(e) {
							var g = this, p = this.options
						},
						_onContextmenu : function(e) {
							var g = this, p = this.options;
							var src = g._getSrcElementByEvent(e);
							if (src.row) {
								if (p.whenRClickToSelect) {
									g.select(src.data)
								}
								if (g.hasBind("contextmenu")) {
									return g.trigger("contextmenu", [ {
										data : src.data,
										rowindex : src.data.__index,
										row : src.row
									}, e ])
								}
							} else {
								if (src.hcell) {
									if (!p.allowHideColumn) {
										return true
									}
									var columnindex = $(src.hcell).attr(
											"columnindex");
									if (columnindex == undefined) {
										return true
									}
									var left = (e.pageX - g.body.offset().left + parseInt(g.body[0].scrollLeft));
									if (columnindex == g.columns.length - 1) {
										left -= 50
									}
									g.popup.css({
										left : left,
										top : g.gridheader.height() + 1
									});
									g.popup.toggle();
									return false
								}
							}
						},
						_onDblClick : function(e) {
							var g = this, p = this.options;
							var src = g._getSrcElementByEvent(e);
							if (src.row) {
								g.trigger("dblClickRow", [ src.data,
										src.data.__id, src.row ])
							}
						},
						_onClick : function(e) {
							var obj = (e.target || e.srcElement);
							var g = this, p = this.options;
							var src = g._getSrcElementByEvent(e);
						 
							if (src.out) {
								if (g.editor.editing && !$.ligerui.win.masking) {
									g.endEdit()
								}
								if (p.allowHideColumn) {
									g.popup.hide()
								}
								return
							}
							if (src.indetail || src.editing) {
								return
							}
							if (g.editor.editing) {
								g.endEdit()
							}
							if (p.allowHideColumn) {
								if (!src.popup) {
									g.popup.hide()
								}
							}
							if (src.checkboxall) {
								var row = $(src.hrow);
								var uncheck = row.hasClass("l-checked");
								if (g.trigger("beforeCheckAllRow", [ !uncheck,
										g.element ]) == false) {
									return false
								}
								if (uncheck) {
									row.removeClass("l-checked")
								} else {
									row.addClass("l-checked")
								}
								g.selected = [];
								for ( var rowid in g.records) {
									if (uncheck) {
										g.unselect(g.records[rowid])
									} else {
										g.select(g.records[rowid])
									}
								}
								g.trigger("checkAllRow",
										[ !uncheck, g.element ])
							} else {
								if (src.hcelltext) {
									var hcell = $(src.hcelltext).parent()
											.parent();
									if (!p.enabledSort || !src.column) {
										return
									}
									if (src.column.isSort == false) {
										return
									}
									if (p.url
											&& g.isDataChanged
											&& !confirm(p.isContinueByDataChanged)) {
										return
									}
									var sort = $(".l-grid-hd-cell-sort:first",
											hcell);
									var columnName = src.column.name;
									if (!columnName) {
										return
									}
									if (sort.length > 0) {
										if (sort
												.hasClass("l-grid-hd-cell-sort-asc")) {
											sort
													.removeClass(
															"l-grid-hd-cell-sort-asc")
													.addClass(
															"l-grid-hd-cell-sort-desc");
											hcell
													.removeClass(
															"l-grid-hd-cell-asc")
													.addClass(
															"l-grid-hd-cell-desc");
											g.changeSort(columnName, "desc")
										} else {
											if (sort
													.hasClass("l-grid-hd-cell-sort-desc")) {
												sort
														.removeClass(
																"l-grid-hd-cell-sort-desc")
														.addClass(
																"l-grid-hd-cell-sort-asc");
												hcell
														.removeClass(
																"l-grid-hd-cell-desc")
														.addClass(
																"l-grid-hd-cell-asc");
												g.changeSort(columnName, "asc")
											}
										}
									} else {
										hcell
												.removeClass(
														"l-grid-hd-cell-desc")
												.addClass("l-grid-hd-cell-asc");
										$(src.hcelltext)
												.after(
														"<span class='l-grid-hd-cell-sort l-grid-hd-cell-sort-asc'>&nbsp;&nbsp;</span>");
										g.changeSort(columnName, "asc")
									}
									$(".l-grid-hd-cell-sort", g.gridheader)
											.add(
													$(".l-grid-hd-cell-sort",
															g.f.gridheader))
											.not(
													$(
															".l-grid-hd-cell-sort:first",
															hcell)).remove()
								} else {
									if (src.detailbtn && p.detail) {
										var item = src.data;
										var row = $([ g.getRowObj(item, false) ]);
										if (g.enabledFrozen()) {
											row = row.add(g.getRowObj(item,
													true))
										}
										var rowid = item.__id;
										if ($(src.detailbtn).hasClass("l-open")) {
											if (p.detail.onCollapse) {
												p.detail
														.onCollapse(
																item,
																$(
																		".l-grid-detailpanel-inner:first",
																		nextrow)[0])
											}
											row.next("tr.l-grid-detailpanel")
													.hide();
											$(src.detailbtn).removeClass(
													"l-open")
										} else {
											var nextrow = row
													.next("tr.l-grid-detailpanel");
											if (nextrow.length > 0) {
												nextrow.show();
												if (p.detail.onExtend) {
													p.detail
															.onExtend(
																	item,
																	$(
																			".l-grid-detailpanel-inner:first",
																			nextrow)[0])
												}
												$(src.detailbtn).addClass(
														"l-open");
												g
														.trigger("SysGridHeightChanged");
												return
											}
											$(src.detailbtn).addClass("l-open");
											var frozenColNum = 0;
											for ( var i = 0; i < g.columns.length; i++) {
												if (g.columns[i].frozen) {
													frozenColNum++
												}
											}
											var detailRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>");
											var detailFrozenRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>");
											detailRow.attr("id", g.id
													+ "|detail|" + rowid);
											g.detailrows = g.detailrows || [];
											g.detailrows.push(detailRow[0]);
											g.detailrows
													.push(detailFrozenRow[0]);
											var detailRowInner = $("div:first",
													detailRow);
											detailRowInner.parent().attr(
													"colSpan",
													g.columns.length
															- frozenColNum);
											row.eq(0).after(detailRow);
											if (frozenColNum > 0) {
												detailFrozenRow
														.find("td:first").attr(
																"colSpan",
																frozenColNum);
												row.eq(1)
														.after(detailFrozenRow)
											}
											if (p.detail.onShowDetail) {
												p.detail
														.onShowDetail(
																item,
																detailRowInner[0],
																function() {
																	g
																			.trigger("SysGridHeightChanged")
																});
												$("div:first", detailFrozenRow)
														.add(detailRowInner)
														.show()
														.height(
																p.detail.height
																		|| p.detailHeight)
											} else {
												if (p.detail.render) {
													detailRowInner
															.append(p.detail
																	.render());
													detailRowInner.show()
												}
											}
											g.trigger("SysGridHeightChanged")
										}
									} else {
										 if (src.groupbtn) {
											var grouprow = $(src.grouprow);
											var opening = true;
											if ($(src.groupbtn)
													.hasClass(
															"l-grid-group-togglebtn-close")) {
												$(src.groupbtn)
														.removeClass(
																"l-grid-group-togglebtn-close");
												if (grouprow
														.hasClass("l-grid-grouprow-last")) {
													$("td:first", grouprow)
															.width("auto")
												}
											} else {
												opening = false;
												$(src.groupbtn)
														.addClass(
																"l-grid-group-togglebtn-close");
												if (grouprow
														.hasClass("l-grid-grouprow-last")) {
													$("td:first", grouprow)
															.width(
																	g.gridtablewidth)
												}
											}
											var currentRow = grouprow
													.next(".l-grid-row,.l-grid-totalsummary-group,.l-grid-detailpanel");
											while (true) {
												if (currentRow.length == 0) {
													break
												}
												if (opening) {
													currentRow.show();
													if (currentRow
															.hasClass("l-grid-detailpanel")
															&& !currentRow
																	.prev()
																	.find(
																			"td.l-grid-row-cell-detail:first span.l-grid-row-cell-detailbtn:first")
																	.hasClass(
																			"l-open")) {
														currentRow.hide()
													}
												} else {
													currentRow.hide()
												}
												currentRow = currentRow
														.next(".l-grid-row,.l-grid-totalsummary-group,.l-grid-detailpanel")
											}
											g.trigger("SysGridHeightChanged")
										}else if (src.grouprow) {
											
											var groupbtn = src.grouprow.children[0].children[0];
											groupbtn.click();
										
										}else {
											if (src.treelink) {
												g.toggle(src.data)
											} else {
												if (src.row
														&& g.enabledCheckbox()) {
													var selectRowButtonOnly = p.selectRowButtonOnly ? true
															: false;
													if (p.enabledEdit) {
														selectRowButtonOnly = true
													}
													if (src.checkbox
															|| !selectRowButtonOnly) {
														var row = $(src.row);
														var uncheck = row
																.hasClass("l-selected");
														if (g
																.trigger(
																		"beforeCheckRow",
																		[
																				!uncheck,
																				src.data,
																				src.data.__id,
																				src.row ]) == false) {
															return false
														}
														var met = uncheck ? "unselect"
																: "select";
														g[met](src.data);
														if (p.tree
																&& p.autoCheckChildren) {
															var children = g
																	.getChildren(
																			src.data,
																			true);
															for ( var i = 0, l = children.length; i < l; i++) {
																g[met]
																		(children[i])
															}
														}
														g.trigger("checkRow", [
																!uncheck,
																src.data,
																src.data.__id,
																src.row ])
													}
													if (!src.checkbox
															&& src.cell
															&& p.enabledEdit
															&& p.clickToEdit) {
														g
																._applyEditor(src.cell)
													}
												} else {
													if (src.row
															&& !g
																	.enabledCheckbox()) {
														if (src.cell
																&& p.enabledEdit
																&& p.clickToEdit) {
															g
																	._applyEditor(src.cell)
														}
														if ($(src.row)
																.hasClass(
																		"l-selected")) {
															if (!p.allowUnSelectRow) {
																$(src.row)
																		.addClass(
																				"l-selected-again");
																return
															}
															g
																	.unselect(src.data)
														} else {
															g.select(src.data)
														}
													} else {
														if (src.toolbar) {
															if (src.first) {
																if (g
																		.trigger(
																				"toFirst",
																				[ g.element ]) == false) {
																	return false
																}
																g
																		.changePage("first")
															} else {
																if (src.prev) {
																	if (g
																			.trigger(
																					"toPrev",
																					[ g.element ]) == false) {
																		return false
																	}
																	g
																			.changePage("prev")
																} else {
																	if (src.next) {
																		if (g
																				.trigger(
																						"toNext",
																						[ g.element ]) == false) {
																			return false
																		}
																		g
																				.changePage("next")
																	} else {
																		if (src.last) {
																			if (g
																					.trigger(
																							"toLast",
																							[ g.element ]) == false) {
																				return false
																			}
																			g
																					.changePage("last")
																		} else {
																			if (src.load) {
																				if ($(
																						"span",
																						src.load)
																						.hasClass(
																								"l-disabled")) {
																					return false
																				}
																				if (g
																						.trigger(
																								"reload",
																								[ g.element ]) == false) {
																					return false
																				}
																				if (p.url
																						&& g.isDataChanged
																						&& !confirm(p.isContinueByDataChanged)) {
																					return false
																				}
																				g
																						.loadData(p.where)
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						},
						select : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							var rowid = rowdata.__id;
							var rowobj = g.getRowObj(rowid);
							var rowobj1 = g.getRowObj(rowid, true);
							
							// edit by hllian, Mar 22, 2015 3:12:29 PM, 添加选择前事件
							if(p.onBeforeSelectRow != null) {
								var flag = g.trigger("beforeSelectRow", [ rowdata, rowid, rowobj ]);
								if(!flag) {
									return;
								}
							}
							
							if (!g.enabledCheckbox() && !g.ctrlKey) {
								for ( var i in g.selected) {
									var o = g.selected[i];
									if (o.__id in g.records) {
										$(g.getRowObj(o)).removeClass(
												"l-selected l-selected-again");
										if (g.enabledFrozen()) {
											$(g.getRowObj(o, true))
													.removeClass(
															"l-selected l-selected-again")
										}
									}
								}
								g.selected = []
							}
							if (rowobj) {
								$(rowobj).addClass("l-selected")
							}
							if (rowobj1) {
								$(rowobj1).addClass("l-selected")
							}
							g.selected[g.selected.length] = rowdata;
							g.trigger("selectRow", [ rowdata, rowid, rowobj ])
						},
						unselect : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							var rowid = rowdata.__id;
							var rowobj = g.getRowObj(rowid);
							var rowobj1 = g.getRowObj(rowid, true);
							$(rowobj)
									.removeClass("l-selected l-selected-again");
							if (g.enabledFrozen()) {
								$(rowobj1).removeClass(
										"l-selected l-selected-again")
							}
							g._removeSelected(rowdata);
							g
									.trigger("unSelectRow", [ rowdata, rowid,
											rowobj ])
						},
						isSelected : function(rowParm) {
							var g = this, p = this.options;
							var rowdata = g.getRow(rowParm);
							for ( var i in g.selected) {
								if (g.selected[i] == rowdata) {
									return true
								}
							}
							return false
						},
						_onResize : function() {
							var g = this, p = this.options;
							if (p.height && p.height != "auto") {
								var windowHeight = $(window).height();
								var h = 0;
								var parentHeight = null;
								if (typeof (p.height) == "string"
										&& p.height.indexOf("%") > 0) {
									var gridparent = g.grid.parent();
									if (p.InWindow) {
										parentHeight = windowHeight;
										parentHeight -= parseInt($("body").css(
												"paddingTop"));
										parentHeight -= parseInt($("body").css(
												"paddingBottom"))
									} else {
										parentHeight = gridparent.height()
									}
									h = parentHeight * parseFloat(p.height)
											* 0.01;
									if (p.InWindow
											|| gridparent[0].tagName
													.toLowerCase() == "body") {
										h -= (g.grid.offset().top - parseInt($(
												"body").css("paddingTop")))
									}
								} else {
									h = parseInt(p.height)
								}
								h += p.heightDiff;
								g.windowHeight = windowHeight;
								g._setHeight(h)
							}
							if (g.enabledFrozen()) {
								var gridView1Width = g.gridview1.width();
								var gridViewWidth = g.gridview.width();
								g.gridview2.css({
									width : gridViewWidth - gridView1Width
								})
							}
							g.trigger("SysGridHeightChanged")
						}
					});
	$.ligerui.controls.Grid.prototype.enabledTotal = $.ligerui.controls.Grid.prototype.isTotalSummary;
	$.ligerui.controls.Grid.prototype.add = $.ligerui.controls.Grid.prototype.addRow;
	$.ligerui.controls.Grid.prototype.update = $.ligerui.controls.Grid.prototype.updateRow;
	$.ligerui.controls.Grid.prototype.append = $.ligerui.controls.Grid.prototype.appendRow;
	$.ligerui.controls.Grid.prototype.getSelected = $.ligerui.controls.Grid.prototype.getSelectedRow;
	$.ligerui.controls.Grid.prototype.getSelecteds = $.ligerui.controls.Grid.prototype.getSelectedRows;
	$.ligerui.controls.Grid.prototype.getCheckedRows = $.ligerui.controls.Grid.prototype.getSelectedRows;
	$.ligerui.controls.Grid.prototype.getCheckedRowObjs = $.ligerui.controls.Grid.prototype.getSelectedRowObjs;
	$.ligerui.controls.Grid.prototype.setOptions = $.ligerui.controls.Grid.prototype.set
})(jQuery);
(function(A) {
	A.fn.ligerDateEditor = function() {
		return A.ligerui.run.call(this, "ligerDateEditor", arguments)
	};
	A.fn.ligerGetDateEditorManager = function() {
		return A.ligerui.run.call(this, "ligerGetDateEditorManager", arguments)
	};
	A.ligerDefaults.DateEditor = {
		format : "yyyy-MM-dd hh:mm",
		showTime : false,
		onChangeDate : false,
		absolute : true
	};
	A.ligerDefaults.DateEditorString = {
		dayMessage : [ "日", "一", "二", "三", "四", "五", "六" ],
		monthMessage : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
				"十月", "十一月", "十二月" ],
		todayMessage : "今天",
		closeMessage : "关闭"
	};
	A.ligerMethos.DateEditor = {};
	A.ligerui.controls.DateEditor = function(C, B) {
		A.ligerui.controls.DateEditor.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.DateEditor
			.ligerExtend(
					A.ligerui.controls.Input,
					{
						__getType : function() {
							return "DateEditor"
						},
						__idPrev : function() {
							return "DateEditor"
						},
						_extendMethods : function() {
							return A.ligerMethos.DateEditor
						},
						_render : function() {
							var D = this, E = this.options;
							if (!E.showTime && E.format.indexOf(" hh:mm") > -1) {
								E.format = E.format.replace(" hh:mm", "")
							}
							if (this.element.tagName.toLowerCase() != "input"
									|| this.element.type != "text") {
								return
							}
							D.inputText = A(this.element);
							if (!D.inputText.hasClass("l-text-field")) {
								D.inputText.addClass("l-text-field")
							}
							D.link = A('<div class="l-trigger"><div class="l-trigger-icon"></div></div>');
							D.text = D.inputText.wrap(
									'<div class="l-text l-text-date"></div>')
									.parent();
							D.text
									.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
							D.text.append(D.link);
							D.textwrapper = D.text.wrap(
									'<div class="l-text-wrapper"></div>')
									.parent();
							var C = "";
							C += "<div class='l-box-dateeditor' style='display:none'>";
							C += "    <div class='l-box-dateeditor-header'>";
							C += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-prevyear'><span></span></div>";
							C += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-prevmonth'><span></span></div>";
							C += "        <div class='l-box-dateeditor-header-text'><a class='l-box-dateeditor-header-month'></a> , <a  class='l-box-dateeditor-header-year'></a></div>";
							C += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-nextmonth'><span></span></div>";
							C += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-nextyear'><span></span></div>";
							C += "    </div>";
							C += "    <div class='l-box-dateeditor-body'>";
							C += "        <table cellpadding='0' cellspacing='0' border='0' class='l-box-dateeditor-calendar'>";
							C += "            <thead>";
							C += "                <tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
							C += "            </thead>";
							C += "            <tbody>";
							C += "                <tr class='l-first'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
							C += "            </tbody>";
							C += "        </table>";
							C += "        <ul class='l-box-dateeditor-monthselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
							C += "        <ul class='l-box-dateeditor-yearselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
							C += "        <ul class='l-box-dateeditor-hourselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
							C += "        <ul class='l-box-dateeditor-minuteselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
							C += "    </div>";
							C += "    <div class='l-box-dateeditor-toolbar'>";
							C += "        <div class='l-box-dateeditor-time'></div>";
							C += "        <div class='l-button l-button-today'></div>";
							C += "        <div class='l-button l-button-close'></div>";
							C += "        <div class='l-clear'></div>";
							C += "    </div>";
							C += "</div>";
							D.dateeditor = A(C);
							if (E.absolute) {
								D.dateeditor.appendTo("body").addClass(
										"l-box-dateeditor-absolute")
							} else {
								D.textwrapper.append(D.dateeditor)
							}
							D.header = A(".l-box-dateeditor-header",
									D.dateeditor);
							D.body = A(".l-box-dateeditor-body", D.dateeditor);
							D.toolbar = A(".l-box-dateeditor-toolbar",
									D.dateeditor);
							D.body.thead = A("thead", D.body);
							D.body.tbody = A("tbody", D.body);
							D.body.monthselector = A(
									".l-box-dateeditor-monthselector", D.body);
							D.body.yearselector = A(
									".l-box-dateeditor-yearselector", D.body);
							D.body.hourselector = A(
									".l-box-dateeditor-hourselector", D.body);
							D.body.minuteselector = A(
									".l-box-dateeditor-minuteselector", D.body);
							D.toolbar.time = A(".l-box-dateeditor-time",
									D.toolbar);
							D.toolbar.time.hour = A("<a></a>");
							D.toolbar.time.minute = A("<a></a>");
							D.buttons = {
								btnPrevYear : A(
										".l-box-dateeditor-header-prevyear",
										D.header),
								btnNextYear : A(
										".l-box-dateeditor-header-nextyear",
										D.header),
								btnPrevMonth : A(
										".l-box-dateeditor-header-prevmonth",
										D.header),
								btnNextMonth : A(
										".l-box-dateeditor-header-nextmonth",
										D.header),
								btnYear : A(".l-box-dateeditor-header-year",
										D.header),
								btnMonth : A(".l-box-dateeditor-header-month",
										D.header),
								btnToday : A(".l-button-today", D.toolbar),
								btnClose : A(".l-button-close", D.toolbar)
							};
							var B = new Date();
							D.now = {
								year : B.getFullYear(),
								month : B.getMonth() + 1,
								day : B.getDay(),
								date : B.getDate(),
								hour : B.getHours(),
								minute : B.getMinutes()
							};
							D.currentDate = {
								year : B.getFullYear(),
								month : B.getMonth() + 1,
								day : B.getDay(),
								date : B.getDate(),
								hour : B.getHours(),
								minute : B.getMinutes()
							};
							D.selectedDate = null;
							D.usedDate = null;
							A("td", D.body.thead).each(function(F, G) {
								A(G).html(E.dayMessage[F])
							});
							A("li", D.body.monthselector).each(function(G, F) {
								A(F).html(E.monthMessage[G])
							});
							D.buttons.btnToday.html(E.todayMessage);
							D.buttons.btnClose.html(E.closeMessage);
							if (E.showTime) {
								D.toolbar.time.show();
								D.toolbar.time.append(D.toolbar.time.hour)
										.append(":").append(
												D.toolbar.time.minute);
								A("li", D.body.hourselector).each(
										function(F, G) {
											var H = F;
											if (F < 10) {
												H = "0" + F.toString()
											}
											A(this).html(H)
										});
								A("li", D.body.minuteselector).each(
										function(F, G) {
											var H = F;
											if (F < 10) {
												H = "0" + F.toString()
											}
											A(this).html(H)
										})
							}
							D.bulidContent();
							if (D.inputText.val() != "") {
								D.onTextChange()
							}
							D.dateeditor.hover(null, function(F) {
								if (D.dateeditor.is(":visible")
										&& !D.editorToggling) {
									D.toggleDateEditor(true)
								}
							});
							D.link.hover(function() {
								if (E.disabled) {
									return
								}
								this.className = "l-trigger-hover"
							}, function() {
								if (E.disabled) {
									return
								}
								this.className = "l-trigger"
							}).mousedown(function() {
								if (E.disabled) {
									return
								}
								this.className = "l-trigger-pressed"
							}).mouseup(function() {
								if (E.disabled) {
									return
								}
								this.className = "l-trigger-hover"
							}).click(function() {
								if (E.disabled) {
									return
								}
								D.bulidContent();
								D.toggleDateEditor(D.dateeditor.is(":visible"))
							});
							if (E.disabled) {
								D.inputText.attr("readonly", "readonly");
								D.text.addClass("l-text-disabled")
							}
							if (E.initValue) {
								D.inputText.val(E.initValue)
							}
							D.buttons.btnClose.click(function() {
								D.toggleDateEditor(true)
							});
							A("td", D.body.tbody)
									.hover(
											function() {
												if (A(this)
														.hasClass(
																"l-box-dateeditor-today")) {
													return
												}
												A(this)
														.addClass(
																"l-box-dateeditor-over")
											},
											function() {
												A(this)
														.removeClass(
																"l-box-dateeditor-over")
											})
									.click(
											function() {
												A(".l-box-dateeditor-selected",
														D.body.tbody)
														.removeClass(
																"l-box-dateeditor-selected");
												if (!A(this)
														.hasClass(
																"l-box-dateeditor-today")) {
													A(this)
															.addClass(
																	"l-box-dateeditor-selected")
												}
												D.currentDate.date = parseInt(A(
														this).html());
												D.currentDate.day = new Date(
														D.currentDate.year,
														D.currentDate.month - 1,
														1).getDay();
												if (A(this).hasClass(
														"l-box-dateeditor-out")) {
													if (A("tr", D.body.tbody)
															.index(
																	A(this)
																			.parent()) == 0) {
														if (--D.currentDate.month == 0) {
															D.currentDate.month = 12;
															D.currentDate.year--
														}
													} else {
														if (++D.currentDate.month == 13) {
															D.currentDate.month = 1;
															D.currentDate.year++
														}
													}
												}
												D.selectedDate = {
													year : D.currentDate.year,
													month : D.currentDate.month,
													date : D.currentDate.date
												};
												D.showDate();
												D.editorToggling = true;
												D.dateeditor
														.slideToggle(
																"fast",
																function() {
																	D.editorToggling = false
																})
											});
							A(".l-box-dateeditor-header-btn", D.header)
									.hover(
											function() {
												A(this)
														.addClass(
																"l-box-dateeditor-header-btn-over")
											},
											function() {
												A(this)
														.removeClass(
																"l-box-dateeditor-header-btn-over")
											});
							D.buttons.btnYear.click(function() {
								if (!D.body.yearselector.is(":visible")) {
									A("li", D.body.yearselector).each(
											function(G, H) {
												var F = D.currentDate.year
														+ (G - 4);
												if (F == D.currentDate.year) {
													A(this).addClass(
															"l-selected")
												} else {
													A(this).removeClass(
															"l-selected")
												}
												A(this).html(F)
											})
								}
								D.body.yearselector.slideToggle()
							});
							D.body.yearselector.hover(function() {
							}, function() {
								A(this).slideUp()
							});
							A("li", D.body.yearselector).click(function() {
								D.currentDate.year = parseInt(A(this).html());
								D.body.yearselector.slideToggle();
								D.bulidContent()
							});
							D.buttons.btnMonth.click(function() {
								A("li", D.body.monthselector).each(
										function(F, G) {
											if (D.currentDate.month == F + 1) {
												A(this).addClass("l-selected")
											} else {
												A(this).removeClass(
														"l-selected")
											}
										});
								D.body.monthselector.slideToggle()
							});
							D.body.monthselector.hover(function() {
							}, function() {
								A(this).slideUp("fast")
							});
							A("li", D.body.monthselector).click(
									function() {
										var F = A("li", D.body.monthselector)
												.index(this);
										D.currentDate.month = F + 1;
										D.body.monthselector.slideToggle();
										D.bulidContent()
									});
							D.toolbar.time.hour.click(function() {
								A("li", D.body.hourselector).each(
										function(F, G) {
											if (D.currentDate.hour == F) {
												A(this).addClass("l-selected")
											} else {
												A(this).removeClass(
														"l-selected")
											}
										});
								D.body.hourselector.slideToggle()
							});
							D.body.hourselector.hover(function() {
							}, function() {
								A(this).slideUp("fast")
							});
							A("li", D.body.hourselector).click(
									function() {
										var F = A("li", D.body.hourselector)
												.index(this);
										D.currentDate.hour = F;
										D.body.hourselector.slideToggle();
										D.bulidContent()
									});
							D.toolbar.time.minute.click(function() {
								A("li", D.body.minuteselector).each(
										function(F, G) {
											if (D.currentDate.minute == F) {
												A(this).addClass("l-selected")
											} else {
												A(this).removeClass(
														"l-selected")
											}
										});
								D.body.minuteselector.slideToggle("fast",
										function() {
											var F = A("li", this).index(
													A("li.l-selected", this));
											if (F > 29) {
												var G = (A("li.l-selected",
														this).offset().top - A(
														this).offset().top);
												A(this).animate({
													scrollTop : G
												})
											}
										})
							});
							D.body.minuteselector.hover(function() {
							}, function() {
								A(this).slideUp("fast")
							});
							A("li", D.body.minuteselector).click(
									function() {
										var F = A("li", D.body.minuteselector)
												.index(this);
										D.currentDate.minute = F;
										D.body.minuteselector
												.slideToggle("fast");
										D.bulidContent()
									});
							D.buttons.btnPrevMonth.click(function() {
								if (--D.currentDate.month == 0) {
									D.currentDate.month = 12;
									D.currentDate.year--
								}
								D.bulidContent()
							});
							D.buttons.btnNextMonth.click(function() {
								if (++D.currentDate.month == 13) {
									D.currentDate.month = 1;
									D.currentDate.year++
								}
								D.bulidContent()
							});
							D.buttons.btnPrevYear.click(function() {
								D.currentDate.year--;
								D.bulidContent()
							});
							D.buttons.btnNextYear.click(function() {
								D.currentDate.year++;
								D.bulidContent()
							});
							D.buttons.btnToday.click(function() {
								D.currentDate = {
									year : D.now.year,
									month : D.now.month,
									day : D.now.day,
									date : D.now.date
								};
								D.selectedDate = {
									year : D.now.year,
									month : D.now.month,
									day : D.now.day,
									date : D.now.date
								};
								D.showDate();
								D.dateeditor.slideToggle("fast")
							});
							D.inputText.change(function() {
								D.onTextChange()
							}).blur(function() {
								D.text.removeClass("l-text-focus")
							}).focus(function() {
								D.text.addClass("l-text-focus")
							});
							D.text.hover(function() {
								D.text.addClass("l-text-over")
							}, function() {
								D.text.removeClass("l-text-over")
							});
							if (E.label) {
								D.labelwrapper = D.textwrapper.wrap(
										'<div class="l-labeltext"></div>')
										.parent();
								D.labelwrapper
										.prepend('<div class="l-text-label" style="float:left;display:inline;">'
												+ E.label + ":&nbsp</div>");
								D.textwrapper.css("float", "left");
								if (!E.labelWidth) {
									E.labelWidth = A(".l-text-label",
											D.labelwrapper).outerWidth()
								} else {
									A(".l-text-label", D.labelwrapper)
											.outerWidth(E.labelWidth)
								}
								A(".l-text-label", D.labelwrapper).width(
										E.labelWidth);
								A(".l-text-label", D.labelwrapper).height(
										D.text.height());
								D.labelwrapper
										.append('<br style="clear:both;" />');
								if (E.labelAlign) {
									A(".l-text-label", D.labelwrapper).css(
											"text-align", E.labelAlign)
								}
								D.textwrapper.css({
									display : "inline"
								});
								D.labelwrapper.width(D.text.outerWidth()
										+ E.labelWidth + 2)
							}
							D.set(E)
						},
						destroy : function() {
							if (this.textwrapper) {
								this.textwrapper.remove()
							}
							if (this.dateeditor) {
								this.dateeditor.remove()
							}
							this.options = null;
							A.ligerui.remove(this)
						},
						bulidContent : function() {
							var E = this, F = this.options;
							var C = new Date(E.currentDate.year,
									E.currentDate.month - 1, 1).getDay();
							var B = E.currentDate.month;
							var H = E.currentDate.year;
							if (++B == 13) {
								B = 1;
								H++
							}
							var G = new Date(H, B - 1, 0).getDate();
							var D = new Date(E.currentDate.year,
									E.currentDate.month - 1, 0).getDate();
							E.buttons.btnMonth
									.html(F.monthMessage[E.currentDate.month - 1]);
							E.buttons.btnYear.html(E.currentDate.year);
							E.toolbar.time.hour.html(E.currentDate.hour);
							E.toolbar.time.minute.html(E.currentDate.minute);
							if (E.toolbar.time.hour.html().length == 1) {
								E.toolbar.time.hour.html("0"
										+ E.toolbar.time.hour.html())
							}
							if (E.toolbar.time.minute.html().length == 1) {
								E.toolbar.time.minute.html("0"
										+ E.toolbar.time.minute.html())
							}
							A("td", this.body.tbody).each(function() {
								this.className = ""
							});
							A("tr", this.body.tbody)
									.each(
											function(I, J) {
												A("td", J)
														.each(
																function(L, N) {
																	var M = I
																			* 7
																			+ (L - C);
																	var K = M + 1;
																	if (E.selectedDate
																			&& E.currentDate.year == E.selectedDate.year
																			&& E.currentDate.month == E.selectedDate.month
																			&& M + 1 == E.selectedDate.date) {
																		if (L == 0
																				|| L == 6) {
																			A(N)
																					.addClass(
																							"l-box-dateeditor-holiday")
																		}
																		A(N)
																				.addClass(
																						"l-box-dateeditor-selected");
																		A(N)
																				.siblings()
																				.removeClass(
																						"l-box-dateeditor-selected")
																	} else {
																		if (E.currentDate.year == E.now.year
																				&& E.currentDate.month == E.now.month
																				&& M + 1 == E.now.date) {
																			if (L == 0
																					|| L == 6) {
																				A(
																						N)
																						.addClass(
																								"l-box-dateeditor-holiday")
																			}
																			A(N)
																					.addClass(
																							"l-box-dateeditor-today")
																		} else {
																			if (M < 0) {
																				K = D
																						+ K;
																				A(
																						N)
																						.addClass(
																								"l-box-dateeditor-out")
																						.removeClass(
																								"l-box-dateeditor-selected")
																			} else {
																				if (M > G - 1) {
																					K = K
																							- G;
																					A(
																							N)
																							.addClass(
																									"l-box-dateeditor-out")
																							.removeClass(
																									"l-box-dateeditor-selected")
																				} else {
																					if (L == 0
																							|| L == 6) {
																						A(
																								N)
																								.addClass(
																										"l-box-dateeditor-holiday")
																								.removeClass(
																										"l-box-dateeditor-selected")
																					} else {
																						N.className = ""
																					}
																				}
																			}
																		}
																	}
																	A(N)
																			.html(
																					K)
																})
											})
						},
						updateSelectBoxPosition : function() {
							var B = this, C = this.options;
							if (C.absolute) {
								B.dateeditor.css({
									left : B.text.offset().left,
									top : B.text.offset().top + 1
											+ B.text.outerHeight()
								})
							} else {
								if (B.text.offset().top + 4 > B.dateeditor
										.height()
										&& B.text.offset().top
												+ B.dateeditor.height()
												+ textHeight + 4
												- A(window).scrollTop() > A(
												window).height()) {
									B.dateeditor.css("marginTop", -1
											* (B.dateeditor.height()
													+ textHeight + 5));
									B.showOnTop = true
								} else {
									B.showOnTop = false
								}
							}
						},
						toggleDateEditor : function(B) {
							var C = this, D = this.options;
							var E = C.text.height();
							C.editorToggling = true;
							if (B) {
								C.dateeditor.hide("fast", function() {
									C.editorToggling = false
								})
							} else {
								C.updateSelectBoxPosition();
								C.dateeditor.slideDown("fast", function() {
									C.editorToggling = false
								})
							}
						},
						showDate : function() {
							var C = this, D = this.options;
							if (!this.selectedDate) {
								return
							}
							var B = C.selectedDate.year + "/"
									+ C.selectedDate.month + "/"
									+ C.selectedDate.date;
							this.currentDate.hour = parseInt(
									C.toolbar.time.hour.html(), 10);
							this.currentDate.minute = parseInt(
									C.toolbar.time.minute.html(), 10);
							if (D.showTime) {
								B += " " + this.currentDate.hour + ":"
										+ this.currentDate.minute
							}
							this.inputText.val(B);
							this.inputText.trigger("change").focus()
						},
						isDateTime : function(B) {
							var D = this, E = this.options;
							var C = B
									.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
							if (C == null) {
								return false
							}
							var F = new Date(C[1], C[3] - 1, C[4]);
							if (F == "NaN") {
								return false
							}
							return (F.getFullYear() == C[1]
									&& (F.getMonth() + 1) == C[3] && F
									.getDate() == C[4])
						},
						isLongDateTime : function(B) {
							var E = this, F = this.options;
							var C = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
							var D = B.match(C);
							if (D == null) {
								return false
							}
							var G = new Date(D[1], D[3] - 1, D[4], D[5], D[6]);
							if (G == "NaN") {
								return false
							}
							return (G.getFullYear() == D[1]
									&& (G.getMonth() + 1) == D[3]
									&& G.getDate() == D[4]
									&& G.getHours() == D[5] && G.getMinutes() == D[6])
						},
						getFormatDate : function(C) {
							var D = this, F = this.options;
							if (C == "NaN") {
								return null
							}
							var E = F.format;
							var G = {
								"M+" : C.getMonth() + 1,
								"d+" : C.getDate(),
								"h+" : C.getHours(),
								"m+" : C.getMinutes(),
								"s+" : C.getSeconds(),
								"q+" : Math.floor((C.getMonth() + 3) / 3),
								S : C.getMilliseconds()
							};
							if (/(y+)/.test(E)) {
								E = E.replace(RegExp.$1, (C.getFullYear() + "")
										.substr(4 - RegExp.$1.length))
							}
							for ( var B in G) {
								if (new RegExp("(" + B + ")").test(E)) {
									E = E
											.replace(
													RegExp.$1,
													RegExp.$1.length == 1 ? G[B]
															: ("00" + G[B])
																	.substr(("" + G[B]).length))
								}
							}
							return E
						},
						onTextChange : function() {
							var C = this, D = this.options;
							var E = C.inputText.val();
							if (E == "") {
								C.selectedDate = null;
								return true
							}
							if (!D.showTime && !C.isDateTime(E)) {
								if (!C.usedDate) {
									C.inputText.val("")
								} else {
									C.inputText
											.val(C.getFormatDate(C.usedDate))
								}
							} else {
								if (D.showTime && !C.isLongDateTime(E)) {
									if (!C.usedDate) {
										C.inputText.val("")
									} else {
										C.inputText.val(C
												.getFormatDate(C.usedDate))
									}
								} else {
									E = E.replace(/-/g, "/");
									var B = C.getFormatDate(new Date(E));
									if (B == null) {
										if (!C.usedDate) {
											C.inputText.val("")
										} else {
											C.inputText.val(C
													.getFormatDate(C.usedDate))
										}
									}
									C.usedDate = new Date(E);
									C.selectedDate = {
										year : C.usedDate.getFullYear(),
										month : C.usedDate.getMonth() + 1,
										day : C.usedDate.getDay(),
										date : C.usedDate.getDate(),
										hour : C.usedDate.getHours(),
										minute : C.usedDate.getMinutes()
									};
									C.currentDate = {
										year : C.usedDate.getFullYear(),
										month : C.usedDate.getMonth() + 1,
										day : C.usedDate.getDay(),
										date : C.usedDate.getDate(),
										hour : C.usedDate.getHours(),
										minute : C.usedDate.getMinutes()
									};
									// edit by hllian, 在赋值后触发oninput事件
									C.inputText.val(B).trigger("input");
									C.trigger("changeDate", [ B ]);
									if (A(C.dateeditor).is(":visible")) {
										C.bulidContent()
									}
								}
							}
						},
						_setHeight : function(C) {
							var B = this;
							if (C > 4) {
								B.text.css({
									height : C
								});
								B.inputText.css({
									height : C
								});
								B.textwrapper.css({
									height : C
								})
							}
						},
						_setWidth : function(C) {
							var B = this;
							if (C > 20) {
								B.text.css({
									width : C
								});
								B.inputText.css({
									width : C - 20
								});
								B.textwrapper.css({
									width : C
								})
							}
						},
						_setValue : function(C) {
							var B = this;
							if (!C) {
								B.inputText.val("")
							}
							if (typeof C == "string") {
								B.inputText.val(C)
							} else {
								if (typeof C == "object") {
									if (C instanceof Date) {
										B.inputText.val(B.getFormatDate(C));
										B.onTextChange()
									}
								}
							}
						},
						_getValue : function() {
							return this.usedDate
						},
						setEnabled : function() {
							var B = this, C = this.options;
							this.inputText.removeAttr("readonly");
							this.text.removeClass("l-text-disabled");
							C.disabled = false
						},
						setDisabled : function() {
							var B = this, C = this.options;
							this.inputText.attr("readonly", "readonly");
							this.text.addClass("l-text-disabled");
							C.disabled = true
						}
					})
})(jQuery);
(function(A) {
	A.fn.ligerSpinner = function() {
		return A.ligerui.run.call(this, "ligerSpinner", arguments)
	};
	A.fn.ligerGetSpinnerManager = function() {
		return A.ligerui.run.call(this, "ligerGetSpinnerManager", arguments)
	};
	A.ligerDefaults.Spinner = {
		type : "float",
		isNegative : true,
		decimalplace : 2,
		step : 0.1,
		interval : 50,
		onChangeValue : false,
		minValue : null,
		maxValue : null,
		disabled : false
	};
	A.ligerMethos.Spinner = {};
	A.ligerui.controls.Spinner = function(C, B) {
		A.ligerui.controls.Spinner.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Spinner
			.ligerExtend(
					A.ligerui.controls.Input,
					{
						__getType : function() {
							return "Spinner"
						},
						__idPrev : function() {
							return "Spinner"
						},
						_extendMethods : function() {
							return A.ligerMethos.Spinner
						},
						_init : function() {
							A.ligerui.controls.Spinner.base._init.call(this);
							var B = this.options;
							if (B.type == "float") {
								B.step = 0.1;
								B.interval = 50
							} else {
								if (B.type == "int") {
									B.step = 1;
									B.interval = 100
								} else {
									if (B.type == "time") {
										B.step = 1;
										B.interval = 100
									}
								}
							}
						},
						_render : function() {
							var B = this, C = this.options;
							B.interval = null;
							B.inputText = null;
							B.value = null;
							B.textFieldID = "";
							if (this.element.tagName.toLowerCase() == "input"
									&& this.element.type
									&& this.element.type == "text") {
								B.inputText = A(this.element);
								if (this.element.id) {
									B.textFieldID = this.element.id
								}
							} else {
								B.inputText = A('<input type="text"/>');
								B.inputText.appendTo(A(this.element))
							}
							if (B.textFieldID == "" && C.textFieldID) {
								B.textFieldID = C.textFieldID
							}
							B.link = A('<div class="l-trigger"><div class="l-spinner-up"><div class="l-spinner-icon"></div></div><div class="l-spinner-split"></div><div class="l-spinner-down"><div class="l-spinner-icon"></div></div></div>');
							B.wrapper = B.inputText.wrap(
									'<div class="l-text"></div>').parent();
							B.wrapper
									.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
							B.wrapper.append(B.link).after(B.selectBox).after(
									B.valueField);
							B.link.up = A(".l-spinner-up", B.link);
							B.link.down = A(".l-spinner-down", B.link);
							B.inputText.addClass("l-text-field");
							if (C.disabled) {
								B.wrapper.addClass("l-text-disabled")
							}
							if (!B._isVerify(B.inputText.val())) {
								B.value = B._getDefaultValue();
								B.inputText.val(B.value)
							}
							B.link.up.hover(function() {
								if (!C.disabled) {
									A(this).addClass("l-spinner-up-over")
								}
							}, function() {
								clearInterval(B.interval);
								A(document).unbind("selectstart.spinner");
								A(this).removeClass("l-spinner-up-over")
							}).mousedown(
									function() {
										if (!C.disabled) {
											B._uping.call(B);
											B.interval = setInterval(
													function() {
														B._uping.call(B)
													}, C.interval);
											A(document).bind(
													"selectstart.spinner",
													function() {
														return false
													})
										}
									}).mouseup(function() {
								clearInterval(B.interval);
								B.inputText.trigger("change").focus();
								A(document).unbind("selectstart.spinner")
							});
							B.link.down.hover(function() {
								if (!C.disabled) {
									A(this).addClass("l-spinner-down-over")
								}
							}, function() {
								clearInterval(B.interval);
								A(document).unbind("selectstart.spinner");
								A(this).removeClass("l-spinner-down-over")
							}).mousedown(
									function() {
										if (!C.disabled) {
											B.interval = setInterval(
													function() {
														B._downing.call(B)
													}, C.interval);
											A(document).bind(
													"selectstart.spinner",
													function() {
														return false
													})
										}
									}).mouseup(function() {
								clearInterval(B.interval);
								B.inputText.trigger("change").focus();
								A(document).unbind("selectstart.spinner")
							});
							B.inputText.change(function() {
								var D = B.inputText.val();
								B.value = B._getVerifyValue(D);
								B.trigger("changeValue", [ B.value ]);
								B.inputText.val(B.value)
							}).blur(function() {
								B.wrapper.removeClass("l-text-focus")
							}).focus(function() {
								B.wrapper.addClass("l-text-focus")
							});
							B.wrapper.hover(function() {
								if (!C.disabled) {
									B.wrapper.addClass("l-text-over")
								}
							}, function() {
								B.wrapper.removeClass("l-text-over")
							});
							B.set(C)
						},
						_setWidth : function(C) {
							var B = this;
							if (C > 20) {
								B.wrapper.css({
									width : C
								});
								B.inputText.css({
									width : C - 20
								})
							}
						},
						_setHeight : function(C) {
							var B = this;
							if (C > 10) {
								B.wrapper.height(C);
								B.inputText.height(C - 2);
								B.link.height(C - 4)
							}
						},
						_setDisabled : function(B) {
							if (B) {
								this.wrapper.addClass("l-text-disabled")
							} else {
								this.wrapper.removeClass("l-text-disabled")
							}
						},
						setValue : function(B) {
							this.inputText.val(B)
						},
						getValue : function() {
							return this.inputText.val()
						},
						_round : function(B, F) {
							var D = this, E = this.options;
							var C = 1;
							for (; F > 0; C *= 10, F--) {
							}
							for (; F < 0; C /= 10, F++) {
							}
							return Math.round(B * C) / C
						},
						_isInt : function(E) {
							var B = this, C = this.options;
							var D = C.isNegative ? /^-?\d+$/ : /^\d+$/;
							if (!D.test(E)) {
								return false
							}
							if (parseFloat(E) != E) {
								return false
							}
							return true
						},
						_isFloat : function(E) {
							var B = this, C = this.options;
							var D = C.isNegative ? /^-?\d+(\.\d+)?$/
									: /^\d+(\.\d+)?$/;
							if (!D.test(E)) {
								return false
							}
							if (parseFloat(E) != E) {
								return false
							}
							return true
						},
						_isTime : function(E) {
							var C = this, D = this.options;
							var B = E.match(/^(\d{1,2}):(\d{1,2})$/);
							if (B == null) {
								return false
							}
							if (B[1] > 24 || B[2] > 60) {
								return false
							}
							return true
						},
						_isVerify : function(E) {
							var B = this, D = this.options;
							if (D.type == "float") {
								if (!B._isFloat(E)) {
									return false
								}
								var C = parseFloat(E);
								if (D.minValue != undefined && D.minValue > C) {
									return false
								}
								if (D.maxValue != undefined && D.maxValue < C) {
									return false
								}
								return true
							} else {
								if (D.type == "int") {
									if (!B._isInt(E)) {
										return false
									}
									var C = parseInt(E);
									if (D.minValue != undefined
											&& D.minValue > C) {
										return false
									}
									if (D.maxValue != undefined
											&& D.maxValue < C) {
										return false
									}
									return true
								} else {
									if (D.type == "time") {
										return B._isTime(E)
									}
								}
							}
							return false
						},
						_getVerifyValue : function(D) {
							var C = this, E = this.options;
							var B = null;
							if (E.type == "float") {
								B = C._round(D, E.decimalplace)
							} else {
								if (E.type == "int") {
									B = parseInt(D)
								} else {
									if (E.type == "time") {
										B = D
									}
								}
							}
							if (!C._isVerify(B)) {
								return C.value
							} else {
								return B
							}
						},
						_isOverValue : function(C) {
							var B = this, D = this.options;
							if (D.minValue != null && D.minValue > C) {
								return true
							}
							if (D.maxValue != null && D.maxValue < C) {
								return true
							}
							return false
						},
						_getDefaultValue : function() {
							var B = this, C = this.options;
							if (C.type == "float" || C.type == "int") {
								return 0
							} else {
								if (C.type == "time") {
									return "00:00"
								}
							}
						},
						_addValue : function(B) {
							var C = this, E = this.options;
							var D = C.inputText.val();
							D = parseFloat(D) + B;
							if (C._isOverValue(D)) {
								return
							}
							C.inputText.val(D);
							C.inputText.trigger("change")
						},
						_addTime : function(F) {
							var C = this, E = this.options;
							var D = C.inputText.val();
							var B = D.match(/^(\d{1,2}):(\d{1,2})$/);
							newminute = parseInt(B[2]) + F;
							if (newminute < 10) {
								newminute = "0" + newminute
							}
							D = B[1] + ":" + newminute;
							if (C._isOverValue(D)) {
								return
							}
							C.inputText.val(D);
							C.inputText.trigger("change")
						},
						_uping : function() {
							var B = this, C = this.options;
							if (C.type == "float" || C.type == "int") {
								B._addValue(C.step)
							} else {
								if (C.type == "time") {
									B._addTime(C.step)
								}
							}
						},
						_downing : function() {
							var B = this, C = this.options;
							if (C.type == "float" || C.type == "int") {
								B._addValue(-1 * C.step)
							} else {
								if (C.type == "time") {
									B._addTime(-1 * C.step)
								}
							}
						},
						_isDateTime : function(B) {
							var D = this, E = this.options;
							var C = B
									.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
							if (C == null) {
								return false
							}
							var F = new Date(C[1], C[3] - 1, C[4]);
							if (F == "NaN") {
								return false
							}
							return (F.getFullYear() == C[1]
									&& (F.getMonth() + 1) == C[3] && F
									.getDate() == C[4])
						},
						_isLongDateTime : function(B) {
							var E = this, F = this.options;
							var C = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
							var D = B.match(C);
							if (D == null) {
								return false
							}
							var G = new Date(D[1], D[3] - 1, D[4], D[5], D[6]);
							if (G == "NaN") {
								return false
							}
							return (G.getFullYear() == D[1]
									&& (G.getMonth() + 1) == D[3]
									&& G.getDate() == D[4]
									&& G.getHours() == D[5] && G.getMinutes() == D[6])
						}
					})
})(jQuery);
(function(A) {
	A.fn.ligerToolBar = function(B) {
		return A.ligerui.run.call(this, "ligerToolBar", arguments)
	};
	A.fn.ligerGetToolBarManager = function() {
		return A.ligerui.run.call(this, "ligerGetToolBarManager", arguments)
	};
	A.ligerDefaults.ToolBar = {
		showTime : 2000	// 消息框显示时间
	};
	A.ligerMethos.ToolBar = {};
	A.ligerui.controls.ToolBar = function(C, B) {
		A.ligerui.controls.ToolBar.base.constructor.call(this, C, B)
	}; 
	A.ligerui.controls.ToolBar
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "ToolBar"
						},
						__idPrev : function() {
							return "ToolBar"
						},
						_extendMethods : function() {
							return A.ligerMethos.ToolBar
						},
						_render : function() {
							var B = this, C = this.options;
							B.toolBar = A(this.element);
							B.toolBar.addClass("l-toolbar");
							B.set(C)
						},
						_setItems : function(B) {
							var C = this;
							A(B).each(function(D, E) {
								C.addItem(E)
							})
						},
						addItem : function(D) {
							var C = this, E = this.options;
							if (D.line || D.type == "line") {
								C.toolBar.append('<div class="l-bar-separator"></div>');
								return
							}
							
							// edit by hllian at 2014-8-29
				            if (D.type == "search") {
				            	C.addSearchItem(D);
				            	return;
				            }
				            
				            // edit by hllian at 2014-9-16
				            if(D.type == "tip") {
				            	C.addTipItem(D);
				            	return;
				            }
				            
				            if(D.type == "message") {
				            	C.addMsgItem(D);
				            	return;
				            }
				            
							var B = A('<div class="l-toolbar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div></div>');
							C.toolBar.append(B);
							D.id && B.attr("toolbarid", D.id);
							if (D.img) {
								B.append("<img src='" + D.img + "' />");
								B.addClass("l-toolbar-item-hasicon")
							} else {
								if (D.icon) {
									B.append("<div class='l-icon l-icon-"
											+ D.icon + "'></div>");
									B.addClass("l-toolbar-item-hasicon")
								}
							}
							D.text && A("span:first", B).html(D.text);
							D.disable && B.addClass("l-toolbar-item-disable");
							D.hide && B.hide();
							D.click && B.click(function() {
								B.hide();
								D.click(D);
								B.show()
							});
							B.hover(function() {
								A(this).addClass("l-panel-btn-over")
							}, function() {
								A(this).removeClass("l-panel-btn-over")
							})
						},
						addMsgItem : function(D) {
							var C = this; var P = D.options; 
							var B = A('<div class="l-toolbar-item-message"><div class="l-panel-msg-l"></div><div class="l-panel-msg"><span></span></div><div class="l-panel-msg-r"></div></div>');
							C.toolBar.append(B);
							D.id && B.attr("toolbarid", D.id);
							D.text && A("span:first", B).html(D.text);
							B.addClass("l-toolbar-item-disable");
							// 设置鼠标指针为默认样式
							B.css("cursor", "default");
							B.click(function() {
								B.fadeOut("fast");
							});
							B.hide();
						},
						addTipItem : function(D) {
							var C = this; var P = D.options; 
							var B = A('<div class="l-toolbar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div></div>');
							C.toolBar.append(B);
							D.id && B.attr("toolbarid", D.id);
							if (D.img) {
								B.append("<img src='" + D.img + "' />");
								B.addClass("l-toolbar-item-hasicon")
							} else {
								if (D.icon) {
									B.append("<div class='l-icon l-icon-"
											+ D.icon + "'></div>");
									B.addClass("l-toolbar-item-hasicon")
								}
							}
							var H = "";
							// 设置文本颜色
							if(D.color) {
								H = "<font color='" + D.color + "'>" + D.text + "</font>"
							}else {
								H = D.text;
							}
							D.text && A("span:first", B).html(H);
							B.addClass("l-toolbar-item-disable");
							// 设置鼠标指针为默认样式
							B.css("cursor", "default");
						},
						addSearchItem : function(D) {
							var C = this; var P = D.options; var F = P.conditions;
							P.width = P.width || 200;
							P.position = P.position || 'right';
							P.defaultCondition = P.defaultCondition || F[0].name;
							P.searchTips = P.searchTips || '请输入搜索内容';
							P.inputId = P.inputId || D.id + '_input';
							
							// create search input
							var searchInputDiv = A('<div class="l-text"></div>');
							searchInputDiv.css({
								width : P.width + 'px',
								height : '22px',
								'margin-top' : 0,
								'float' : P.position
								});
							
							var searchInput = A('<input id="' + P.inputId + '" type="text" class="l-text-field s-defaultText" style="width:' + (P.width - 2) + 'px;"/>');
							searchInput.attr('name', P.defaultCondition);
							searchInput.val(P.searchTips);
							searchInput.appendTo(searchInputDiv);
							
							// 添加搜索按钮
							var B = A('<div class="l-toolbar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div></div>');
							B.css({
								'float' : P.position,
								'margin-right' : '4px'
							});
							C.toolBar.append(B);
							D.id && B.attr("toolbarid", D.id);
//							var appName="dssweb";
							B.append("<img src='/js/desktop/ligerUI/skins/icons/search.gif' />");
							B.addClass("l-toolbar-item-hasicon")
							D.text && A("span:first", B).html(D.text);
							D.disable && B.addClass("l-toolbar-item-disable");
							D.click && B.click(function() {
								B.hide();
								D.click(D);
								B.show()
							});
							B.hover(function() {
								A(this).addClass("l-panel-btn-over")
							}, function() {
								A(this).removeClass("l-panel-btn-over")
							})
							
							searchInput.bind('focus', function() {
								var val = searchInput.val();
								if(val == P.searchTips) {
									searchInput.val("");
								}
							});
							
							searchInput.bind('blur', function() {
								var val = searchInput.val();
								if(val == "") {
									searchInput.val(P.searchTips);
								}
							});
							
							C.toolBar.append(searchInputDiv);
						},
						hideItem : function (D) {
							var C = this, E = this.options;
							var T = A("div[toolbarid='" + D + "']");
							T.hide();
						},
						showItem : function (D) {
							var C = this, E = this.options;
							var T = A("div[toolbarid='" + D + "']");
							T.show();
						},
						showMessage : function(M, T) {
							// D: itemId, M: message, T: type[success, error,
							// warn]
							var C = this, E = this.options; 
							if(A("#ligerToolBarMsg_hllian").length > 0) {
								// 如果元素已存在，移除
								A(".t-msg-item").remove();
								clearTimeout(C.timer);
							}
							B = A('<div id="ligerToolBarMsg_hllian" class="t-msg-item"></div>');
							B.append(A("<span></span>"));
							C.toolBar.append(B);
							
							// 建立消息框
							if(T == "success") {
								B.addClass("msg-success");
							}else if(T == "warn") {
								B.addClass("msg-warn");
							}else if(T == "error") {
								B.addClass("msg-error");
							}
							
							M && A("span:first", B).html(M);
							// 定位
							B.fadeIn("fast");
							// 自动关闭
							C.timer = setTimeout(function() {
								B.fadeOut('fast', function() {
									B.remove();
									C.timer = undefined;
								});
							}, E.showTime);
							
							// 单击时关闭消息
							B.bind("click", function() {
								B.fadeOut('fast', function() {
									B.remove();
									C.timer = undefined;
								});
							});
							
							B.hover(function() {
								clearTimeout(C.timer);
							}, function() {
								C.timer = setTimeout(function() {
									B.fadeOut('fast', function() {
										B.remove();
										C.timer = undefined;
									});
								}, E.showTime);
							});
						}
					})
})(jQuery);
(function(B) {
	var A = B.ligerui;
	B.fn.ligerDrag = function(C) {
		return A.run.call(this, "ligerDrag", arguments, {
			idAttrName : "ligeruidragid",
			hasElement : false,
			propertyToElemnt : "target"
		})
	};
	B.fn.ligerGetDragManager = function() {
		return A.run.call(this, "ligerGetDragManager", arguments, {
			idAttrName : "ligeruidragid",
			hasElement : false,
			propertyToElemnt : "target"
		})
	};
	B.ligerDefaults.Drag = {
		onStartDrag : false,
		onDrag : false,
		onStopDrag : false,
		handler : null,
		proxy : true,
		revert : false,
		animate : true,
		onRevert : null,
		onEndRevert : null,
		receive : null,
		onDragEnter : null,
		onDragOver : null,
		onDragLeave : null,
		onDrop : null,
		disabled : false,
		proxyX : null,
		proxyY : null
	};
	A.controls.Drag = function(C) {
		A.controls.Drag.base.constructor.call(this, null, C)
	};
	A.controls.Drag.ligerExtend(A.core.UIComponent, {
		__getType : function() {
			return "Drag"
		},
		__idPrev : function() {
			return "Drag"
		},
		_render : function() {
			var C = this, D = this.options;
			this.set(D);
			C.cursor = "move";
			C.handler.css("cursor", C.cursor);
			C.handler.bind("mousedown.drag", function(E) {
				if (D.disabled) {
					return
				}
				if (E.button == 2) {
					return
				}
				C._start.call(C, E)
			}).bind("mousemove.drag", function() {
				if (D.disabled) {
					return
				}
				C.handler.css("cursor", C.cursor)
			})
		},
		_rendered : function() {
			this.options.target.ligeruidragid = this.id
		},
		_start : function(E) {
			var C = this, D = this.options;
			if (C.reverting) {
				return
			}
			if (D.disabled) {
				return
			}
			C.current = {
				target : C.target,
				left : C.target.offset().left,
				top : C.target.offset().top,
				startX : E.pageX || E.screenX,
				startY : E.pageY || E.clientY
			};
			if (C.trigger("startDrag", [ C.current, E ]) == false) {
				return false
			}
			C.cursor = "move";
			C._createProxy(D.proxy, E);
			if (D.proxy && !C.proxy) {
				return false
			}
			(C.proxy || C.handler).css("cursor", C.cursor);
			B(document).bind("selectstart.drag", function() {
				return false
			});
			B(document).bind("mousemove.drag", function() {
				C._drag.apply(C, arguments)
			});
			A.draggable.dragging = true;
			B(document).bind("mouseup.drag", function() {
				A.draggable.dragging = false;
				C._stop.apply(C, arguments)
			})
		},
		_drag : function(G) {
			var E = this, F = this.options;
			if (!E.current) {
				return
			}
			var D = G.pageX || G.screenX;
			var C = G.pageY || G.screenY;
			E.current.diffX = D - E.current.startX;
			E.current.diffY = C - E.current.startY;
			(E.proxy || E.handler).css("cursor", E.cursor);
			if (E.receive) {
				E.receive.each(function(H, K) {
					var J = B(K);
					var I = J.offset();
					if (D > I.left && D < I.left + J.width() && C > I.top
							&& C < I.top + J.height()) {
						if (!E.receiveEntered[H]) {
							E.receiveEntered[H] = true;
							E.trigger("dragEnter",
									[ K, E.proxy || E.target, G ])
						} else {
							E
									.trigger("dragOver", [ K,
											E.proxy || E.target, G ])
						}
					} else {
						if (E.receiveEntered[H]) {
							E.receiveEntered[H] = false;
							E.trigger("dragLeave",
									[ K, E.proxy || E.target, G ])
						}
					}
				})
			}
			if (E.hasBind("drag")) {
				if (E.trigger("drag", [ E.current, G ]) != false) {
					E._applyDrag()
				} else {
					E._removeProxy()
				}
			} else {
				E._applyDrag()
			}
		},
		_stop : function(E) {
			var C = this, D = this.options;
			B(document).unbind("mousemove.drag");
			B(document).unbind("mouseup.drag");
			B(document).unbind("selectstart.drag");
			if (C.receive) {
				C.receive.each(function(F, G) {
					if (C.receiveEntered[F]) {
						C.trigger("drop", [ G, C.proxy || C.target, E ])
					}
				})
			}
			if (C.proxy) {
				if (D.revert) {
					if (C.hasBind("revert")) {
						if (C.trigger("revert", [ C.current, E ]) != false) {
							C._revert(E)
						} else {
							C._removeProxy()
						}
					} else {
						C._revert(E)
					}
				} else {
					C._applyDrag(C.target);
					C._removeProxy()
				}
			}
			C.cursor = "move";
			C.trigger("stopDrag", [ C.current, E ]);
			C.current = null;
			C.handler.css("cursor", C.cursor)
		},
		_revert : function(D) {
			var C = this;
			C.reverting = true;
			C.proxy.animate({
				left : C.current.left,
				top : C.current.top
			}, function() {
				C.reverting = false;
				C._removeProxy();
				C.trigger("endRevert", [ C.current, D ]);
				C.current = null
			})
		},
		_applyDrag : function(C) {
			var D = this, F = this.options;
			C = C || D.proxy || D.target;
			var H = {}, G = false;
			var E = C == D.target;
			if (D.current.diffX) {
				if (E || F.proxyX == null) {
					H.left = D.current.left + D.current.diffX
				} else {
					H.left = D.current.startX + F.proxyX + D.current.diffX
				}
				G = true
			}
			if (D.current.diffY) {
				if (E || F.proxyY == null) {
					H.top = D.current.top + D.current.diffY
				} else {
					H.top = D.current.startY + F.proxyY + D.current.diffY
				}
				G = true
			}
			if (C == D.target && D.proxy && F.animate) {
				D.reverting = true;
				C.animate(H, function() {
					D.reverting = false
				})
			} else {
				C.css(H)
			}
		},
		_setReceive : function(C) {
			this.receiveEntered = {};
			if (!C) {
				return
			}
			if (typeof C == "string") {
				this.receive = B(C)
			} else {
				this.receive = C
			}
		},
		_setHandler : function(C) {
			var D = this, E = this.options;
			if (!C) {
				D.handler = B(E.target)
			} else {
				D.handler = (typeof C == "string" ? B(C, E.target) : C)
			}
		},
		_setTarget : function(C) {
			this.target = B(C)
		},
		_setCursor : function(C) {
			this.cursor = C;
			(this.proxy || this.handler).css("cursor", C)
		},
		_createProxy : function(C, F) {
			if (!C) {
				return
			}
			var D = this, E = this.options;
			if (typeof C == "function") {
				D.proxy = C.call(this.options.target, D, F)
			} else {
				if (C == "clone") {
					D.proxy = D.target.clone().css("position", "absolute");
					D.proxy.appendTo("body")
				} else {
					D.proxy = B("<div class='l-draggable'></div>");
					D.proxy.width(D.target.width()).height(D.target.height());
					D.proxy.attr("dragid", D.id).appendTo("body")
				}
			}
			D.proxy.css(
					{
						left : E.proxyX == null ? D.current.left
								: D.current.startX + E.proxyX,
						top : E.proxyY == null ? D.current.top
								: D.current.startY + E.proxyY
					}).show()
		},
		_removeProxy : function() {
			var C = this;
			if (C.proxy) {
				C.proxy.remove();
				C.proxy = null
			}
		}
	})
})(jQuery);
(function(A) {
	A.fn.ligerResizable = function(B) {
		return A.ligerui.run.call(this, "ligerResizable", arguments, {
			idAttrName : "ligeruiresizableid",
			hasElement : false,
			propertyToElemnt : "target"
		})
	};
	A.fn.ligerGetResizableManager = function() {
		return A.ligerui.run.call(this, "ligerGetResizableManager", arguments,
				{
					idAttrName : "ligeruiresizableid",
					hasElement : false,
					propertyToElemnt : "target"
				})
	};
	A.ligerDefaults.Resizable = {
		handles : "n, e, s, w, ne, se, sw, nw",
		maxWidth : 2000,
		maxHeight : 2000,
		minWidth : 20,
		minHeight : 20,
		scope : 3,
		animate : false,
		onStartResize : function(B) {
		},
		onResize : function(B) {
		},
		onStopResize : function(B) {
		},
		onEndResize : null
	};
	A.ligerui.controls.Resizable = function(B) {
		A.ligerui.controls.Resizable.base.constructor.call(this, null, B)
	};
	A.ligerui.controls.Resizable.ligerExtend(A.ligerui.core.UIComponent, {
		__getType : function() {
			return "Resizable"
		},
		__idPrev : function() {
			return "Resizable"
		},
		_render : function() {
			var B = this, C = this.options;
			B.target = A(C.target);
			B.set(C);
			B.target.mousemove(function(E) {
				if (C.disabled) {
					return
				}
				B.dir = B._getDir(E);
				if (B.dir) {
					B.target.css("cursor", B.dir + "-resize")
				} else {
					if (B.target.css("cursor").indexOf("-resize") > 0) {
						B.target.css("cursor", "default")
					}
				}
				if (C.target.ligeruidragid) {
					var D = A.ligerui.get(C.target.ligeruidragid);
					if (D && B.dir) {
						D.set("disabled", true)
					} else {
						if (D) {
							D.set("disabled", false)
						}
					}
				}
			}).mousedown(function(D) {
				if (C.disabled) {
					return
				}
				if (B.dir) {
					B._start(D)
				}
			})
		},
		_rendered : function() {
			this.options.target.ligeruiresizableid = this.id
		},
		_getDir : function(H) {
			var G = this, B = this.options;
			var D = "";
			var K = G.target.offset();
			var C = G.target.width();
			var I = G.target.height();
			var J = B.scope;
			var F = H.pageX || H.screenX;
			var E = H.pageY || H.screenY;
			if (E >= K.top && E < K.top + J) {
				D += "n"
			} else {
				if (E <= K.top + I && E > K.top + I - J) {
					D += "s"
				}
			}
			if (F >= K.left && F < K.left + J) {
				D += "w"
			} else {
				if (F <= K.left + C && F > K.left + C - J) {
					D += "e"
				}
			}
			if (B.handles == "all" || D == "") {
				return D
			}
			if (A.inArray(D, G.handles) != -1) {
				return D
			}
			return ""
		},
		_setHandles : function(B) {
			if (!B) {
				return
			}
			this.handles = B.replace(/(\s*)/g, "").split(",")
		},
		_createProxy : function() {
			var B = this;
			B.proxy = A('<div class="l-resizable"></div>');
			B.proxy.width(B.target.width()).height(B.target.height());
			B.proxy.attr("resizableid", B.id).appendTo("body")
		},
		_removeProxy : function() {
			var B = this;
			if (B.proxy) {
				B.proxy.remove();
				B.proxy = null
			}
		},
		_start : function(D) {
			var B = this, C = this.options;
			B._createProxy();
			B.proxy.css({
				left : B.target.offset().left,
				top : B.target.offset().top,
				position : "absolute"
			});
			B.current = {
				dir : B.dir,
				left : B.target.offset().left,
				top : B.target.offset().top,
				startX : D.pageX || D.screenX,
				startY : D.pageY || D.clientY,
				width : B.target.width(),
				height : B.target.height()
			};
			A(document).bind("selectstart.resizable", function() {
				return false
			});
			A(document).bind("mouseup.resizable", function() {
				B._stop.apply(B, arguments)
			});
			A(document).bind("mousemove.resizable", function() {
				B._drag.apply(B, arguments)
			});
			B.proxy.show();
			B.trigger("startResize", [ B.current, D ])
		},
		changeBy : {
			t : [ "n", "ne", "nw" ],
			l : [ "w", "sw", "nw" ],
			w : [ "w", "sw", "nw", "e", "ne", "se" ],
			h : [ "n", "ne", "nw", "s", "se", "sw" ]
		},
		_drag : function(F) {
			var D = this, E = this.options;
			if (!D.current) {
				return
			}
			if (!D.proxy) {
				return
			}
			D.proxy.css("cursor", D.current.dir == "" ? "default"
					: D.current.dir + "-resize");
			var C = F.pageX || F.screenX;
			var B = F.pageY || F.screenY;
			D.current.diffX = C - D.current.startX;
			D.current.diffY = B - D.current.startY;
			D._applyResize(D.proxy);
			D.trigger("resize", [ D.current, F ])
		},
		_stop : function(D) {
			var B = this, C = this.options;
			if (B.hasBind("stopResize")) {
				if (B.trigger("stopResize", [ B.current, D ]) != false) {
					B._applyResize()
				}
			} else {
				B._applyResize()
			}
			B._removeProxy();
			B.trigger("endResize", [ B.current, D ]);
			A(document).unbind("selectstart.resizable");
			A(document).unbind("mousemove.resizable");
			A(document).unbind("mouseup.resizable")
		},
		_applyResize : function(B) {
			var C = this, D = this.options;
			var E = {
				left : C.current.left,
				top : C.current.top,
				width : C.current.width,
				height : C.current.height
			};
			var F = false;
			if (!B) {
				B = C.target;
				F = true;
				if (!isNaN(parseInt(C.target.css("top")))) {
					E.top = parseInt(C.target.css("top"))
				} else {
					E.top = 0
				}
				if (!isNaN(parseInt(C.target.css("left")))) {
					E.left = parseInt(C.target.css("left"))
				} else {
					E.left = 0
				}
			}
			if (A.inArray(C.current.dir, C.changeBy.l) > -1) {
				E.left += C.current.diffX;
				C.current.diffLeft = C.current.diffX
			} else {
				if (F) {
					delete E.left
				}
			}
			if (A.inArray(C.current.dir, C.changeBy.t) > -1) {
				E.top += C.current.diffY;
				C.current.diffTop = C.current.diffY
			} else {
				if (F) {
					delete E.top
				}
			}
			if (A.inArray(C.current.dir, C.changeBy.w) > -1) {
				E.width += (C.current.dir.indexOf("w") == -1 ? 1 : -1)
						* C.current.diffX;
				C.current.newWidth = E.width
			} else {
				if (F) {
					delete E.width
				}
			}
			if (A.inArray(C.current.dir, C.changeBy.h) > -1) {
				E.height += (C.current.dir.indexOf("n") == -1 ? 1 : -1)
						* C.current.diffY;
				C.current.newHeight = E.height
			} else {
				if (F) {
					delete E.height
				}
			}
			if (F && D.animate) {
				B.animate(E)
			} else {
				B.css(E)
			}
		}
	})
})(jQuery);
(function(B) {
	var A = B.ligerui;
	A.windowCount = 0;
	B.ligerWindow = function(C) {
		return A.run.call(null, "ligerWindow", arguments, {
			isStatic : true
		})
	};
	B.ligerWindow.show = function(C) {
		return B.ligerWindow(C)
	};
	B.ligerDefaults.Window = {
		showClose : true,
		showMax : true,
		showToggle : true,
		showMin : true,
		title : "window",
		load : false,
		onLoaded : null,
		modal : false
	};
	B.ligerMethos.Window = {};
	A.controls.Window = function(C) {
		A.controls.Window.base.constructor.call(this, null, C)
	};
	A.controls.Window
			.ligerExtend(
					A.core.Win,
					{
						__getType : function() {
							return "Window"
						},
						__idPrev : function() {
							return "Window"
						},
						_extendMethods : function() {
							return B.ligerMethos.Window
						},
						_render : function() {
							var F = this, I = this.options;
							F.window = B('<div class="l-window"><div class="l-window-header"><div class="l-window-header-buttons"><div class="l-window-toggle"></div><div class="l-window-max"></div><div class="l-window-close"></div><div class="l-clear"></div></div><div class="l-window-header-inner"></div></div><div class="l-window-content"></div></div>');
							F.element = F.window[0];
							F.window.content = B(".l-window-content", F.window);
							F.window.header = B(".l-window-header", F.window);
							F.window.buttons = B(
									".l-window-header-buttons:first", F.window);
							if (I.url) {
								if (I.load) {
									F.window.content.load(I.url, function() {
										F.trigger("loaded")
									});
									F.window.content
											.addClass("l-window-content-scroll")
								} else {
									var D = B("<iframe frameborder='0' src='"
											+ I.url + "'></iframe>");
									var C = "ligeruiwindow" + A.windowCount++;
									if (I.name) {
										C = I.name
									}
									D.attr("name", C).attr("id", C);
									I.framename = C;
									D.appendTo(F.window.content);
									F.iframe = D
								}
							} else {
								if (I.content) {
									var E = B("<div>" + I.content + "</div>");
									E.appendTo(F.window.content)
								} else {
									if (I.target) {
										F.window.content.append(I.target);
										I.target.show()
									}
								}
							}
							this.mask();
							F.active();
							B("body").append(F.window);
							F.set({
								width : I.width,
								height : I.height
							});
							var H = 0;
							var G = 0;
							if (I.left != null) {
								H = I.left
							} else {
								I.left = H = 0.5 * (B(window).width() - F.window
										.width())
							}
							if (I.top != null) {
								G = I.top
							} else {
								I.top = G = 0.5
										* (B(window).height() - F.window
												.height())
										+ B(window).scrollTop() - 10
							}
							if (H < 0) {
								I.left = H = 0
							}
							if (G < 0) {
								I.top = G = 0
							}
							F.set(I);
							I.framename
									&& B(">iframe", F.window.content).attr(
											"name", I.framename);
							if (!I.showToggle) {
								B(".l-window-toggle", F.window).remove()
							}
							if (!I.showMax) {
								B(".l-window-max", F.window).remove()
							}
							if (!I.showClose) {
								B(".l-window-close", F.window).remove()
							}
							F._saveStatus();
							if (B.fn.ligerDrag) {
								F.draggable = F.window.drag = F.window
										.ligerDrag({
											handler : ".l-window-header-inner",
											onStartDrag : function() {
												F.active()
											},
											onStopDrag : function() {
												F._saveStatus()
											},
											animate : false
										})
							}
							if (B.fn.ligerResizable) {
								F.resizeable = F.window.resizable = F.window
										.ligerResizable({
											onStartResize : function() {
												F.active();
												B(".l-window-max", F.window)
														.removeClass(
																"l-window-regain")
											},
											onStopResize : function(M, L) {
												var K = 0;
												var J = 0;
												if (!isNaN(parseInt(F.window
														.css("top")))) {
													K = parseInt(F.window
															.css("top"))
												}
												if (!isNaN(parseInt(F.window
														.css("left")))) {
													J = parseInt(F.window
															.css("left"))
												}
												if (M.diffTop) {
													F.window.css({
														top : K + M.diffTop
													})
												}
												if (M.diffLeft) {
													F.window.css({
														left : J + M.diffLeft
													})
												}
												if (M.newWidth) {
													F.window.width(M.newWidth)
												}
												if (M.newHeight) {
													F.window.content
															.height(M.newHeight - 28)
												}
												F._saveStatus();
												return false
											}
										});
								F.window
										.append("<div class='l-btn-nw-drop'></div>")
							}
							B(".l-window-toggle", F.window).click(
									function() {
										if (B(this).hasClass(
												"l-window-toggle-close")) {
											F.collapsed = false;
											B(this).removeClass(
													"l-window-toggle-close")
										} else {
											F.collapsed = true;
											B(this).addClass(
													"l-window-toggle-close")
										}
										F.window.content.slideToggle()
									}).hover(function() {
								if (F.window.drag) {
									F.window.drag.set("disabled", true)
								}
							}, function() {
								if (F.window.drag) {
									F.window.drag.set("disabled", false)
								}
							});
							B(".l-window-close", F.window).click(function() {
								if (F.trigger("close") == false) {
									return false
								}
								F.window.hide();
								A.win.removeTask(F)
							}).hover(function() {
								if (F.window.drag) {
									F.window.drag.set("disabled", true)
								}
							}, function() {
								if (F.window.drag) {
									F.window.drag.set("disabled", false)
								}
							});
							B(".l-window-max", F.window)
									.click(
											function() {
												if (B(this).hasClass(
														"l-window-regain")) {
													if (F.trigger("regain") == false) {
														return false
													}
													F.window.width(F._width)
															.css({
																left : F._left,
																top : F._top
															});
													F.window.content
															.height(F._height - 28);
													B(this).removeClass(
															"l-window-regain")
												} else {
													if (F.trigger("max") == false) {
														return false
													}
													F.window
															.width(
																	B(window)
																			.width() - 2)
															.css({
																left : 0,
																top : 0
															});
													F.window.content
															.height(
																	B(window)
																			.height() - 28)
															.show();
													B(this).addClass(
															"l-window-regain")
												}
											})
						},
						_saveStatus : function() {
							var C = this;
							C._width = C.window.width();
							C._height = C.window.height();
							var E = 0;
							var D = 0;
							if (!isNaN(parseInt(C.window.css("top")))) {
								E = parseInt(C.window.css("top"))
							}
							if (!isNaN(parseInt(C.window.css("left")))) {
								D = parseInt(C.window.css("left"))
							}
							C._top = E;
							C._left = D
						},
						min : function() {
							this.window.hide();
							this.minimize = true;
							this.actived = false
						},
						_setShowMin : function(D) {
							var C = this, E = this.options;
							if (D) {
								if (!C.winmin) {
									C.winmin = B(
											'<div class="l-window-min"></div>')
											.prependTo(C.window.buttons).click(
													function() {
														C.min()
													});
									A.win.addTask(C)
								}
							} else {
								if (C.winmin) {
									C.winmin.remove();
									C.winmin = null
								}
							}
						},
						_setLeft : function(C) {
							if (C != null) {
								this.window.css({
									left : C
								})
							}
						},
						_setTop : function(C) {
							if (C != null) {
								this.window.css({
									top : C
								})
							}
						},
						_setWidth : function(C) {
							if (C > 0) {
								this.window.width(C)
							}
						},
						_setHeight : function(C) {
							if (C > 28) {
								this.window.content.height(C - 28)
							}
						},
						_setTitle : function(C) {
							if (C) {
								B(".l-window-header-inner", this.window.header)
										.html(C)
							}
						},
						_setUrl : function(C) {
							var D = this, E = this.options;
							E.url = C;
							if (E.load) {
								D.window.content.html("").load(E.url,
										function() {
											if (D.trigger("loaded") == false) {
												return false
											}
										})
							} else {
								if (D.jiframe) {
									D.jiframe.attr("src", E.url)
								}
							}
						},
						hide : function() {
							var C = this, D = this.options;
							this.unmask();
							this.window.hide()
						},
						show : function() {
							var C = this, D = this.options;
							this.mask();
							this.window.show()
						},
						remove : function() {
							var C = this, D = this.options;
							this.unmask();
							this.window.remove()
						},
						active : function() {
							// alert("g._height = " + E._height);
							var E = this, H = this.options;
							if (E.minimize) {
								var D = E._width, C = E._height, G = E._left, F = E._top;
								if (E.maximum) {
									D = B(window).width();
									C = B(window).height();
									G = F = 0;
									if (A.win.taskbar) {
										C -= A.win.taskbar.outerHeight();
										if (A.win.top) {
											F += A.win.taskbar.outerHeight()
										}
									}
								}
								E.set({
									width : D,
									height : C,
									left : G,
									top : F
								})
							}
							E.actived = true;
							E.minimize = false;
							A.win.setFront(E);
							E.show();
							A.win.setFront(this)
						},
						setUrl : function(C) {
							return _setUrl(C)
						}
					})
})(jQuery);
(function(A) {
	A.fn.ligerTree = function(B) {
		return A.ligerui.run.call(this, "ligerTree", arguments)
	};
	A.fn.ligerGetTreeManager = function() {
		return A.ligerui.run.call(this, "ligerGetTreeManager", arguments)
	};
	A.ligerDefaults.Tree = {
		url : null,
		data : null,
		checkbox : true,
		autoCheckboxEven : true,
		parentIcon : "folder",
		childIcon : "leaf",
		textFieldName : "text",
		attribute : [ "id", "url" ],
		treeLine : true,
		nodeWidth : 200,
		statusName : "__status",
		isLeaf : null,
		single : false,
		onBeforeExpand : function() {
		},
		onContextmenu : function() {
		},
		onExpand : function() {
		},
		onBeforeCollapse : function() {
		},
		onCollapse : function() {
		},
		onBeforeSelect : function() {
		},
		onSelect : function() {
		},
		onBeforeCancelSelect : function() {
		},
		onCancelselect : function() {
		},
		onCheck : function() {
		},
		onSuccess : function() {
		},
		onError : function() {
		},
		onClick : function() {
		},
		idFieldName : "id",
		parentIDFieldName : null,
		topParentIDValue : 0,
		onBeforeAppend : function() {
		},
		onAppend : function() {
		},
		onAfterAppend : function() {
		},
		slide : true,
		iconFieldName : "icon",
		nodeDraggable : false,
		nodeDraggingRender : null,
		btnClickToToggleOnly : true,
		isStaticTree : false
	};
	A.ligerui.controls.Tree = function(C, B) {
		A.ligerui.controls.Tree.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Tree
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						_init : function() {
							A.ligerui.controls.Tree.base._init.call(this);
							var B = this, C = this.options;
							if (C.single) {
								C.autoCheckboxEven = false
							}
						},
						_render : function() {
							var B = this, C = this.options;
							B.set(C, true);
							B.tree = A(B.element);
							B.tree.addClass("l-tree");
							B.sysAttribute = [ "isexpand", "ischecked", "href",
									"style" ];
							B.loading = A("<div class='l-tree-loading'></div>");
							B.tree.after(B.loading);
							B.data = [];
							B.maxOutlineLevel = 1;
							B.treedataindex = 0;
							B._applyTree();
							B._setTreeEven();
							B.set(C, false)
						},
						_setTreeLine : function(B) {
							if (B) {
								this.tree.removeClass("l-tree-noline")
							} else {
								this.tree.addClass("l-tree-noline")
							}
						},
						_setUrl : function(B) {
							if (B) {
								this.loadData(null, B)
							}
						},
						_setData : function(B) {
							if (B) {
								this.append(null, B)
							}
						},
						setData : function(B) {
							this.set("data", B)
						},
						getData : function() {
							return this.data
						},
						hasChildren : function(B) {
							if (this.options.isLeaf) {
								return this.options.isLeaf(B)
							}
							return B.children ? true : false
						},
						getParent : function(F, E) {
							var D = this;
							F = D.getNodeDom(F);
							var C = D.getParentTreeItem(F, E);
							if (!C) {
								return null
							}
							var B = A(C).attr("treedataindex");
							return D._getDataNodeByTreeDataIndex(D.data, B)
						},
						getParentTreeItem : function(H, G) {
							var D = this;
							H = D.getNodeDom(H);
							var F = A(H);
							if (F.parent().hasClass("l-tree")) {
								return null
							}
							if (G == undefined) {
								if (F.parent().parent("li").length == 0) {
									return null
								}
								return F.parent().parent("li")[0]
							}
							var E = parseInt(F.attr("outlinelevel"));
							var C = F;
							for ( var B = E - 1; B >= G; B--) {
								C = C.parent().parent("li")
							}
							return C[0]
						},
						getChecked : function() {
							var C = this, D = this.options;
							if (!this.options.checkbox) {
								return null
							}
							var B = [];
							A(".l-checkbox-checked", C.tree)
									.parent()
									.parent("li")
									.each(
											function() {
												var E = parseInt(A(this).attr(
														"treedataindex"));
												B
														.push({
															target : this,
															data : C
																	._getDataNodeByTreeDataIndex(
																			C.data,
																			E)
														})
											});
							return B
						},
						getSelected : function() {
							var C = this, E = this.options;
							var B = {};
							B.target = A(".l-selected", C.tree).parent("li")[0];
							if (B.target) {
								var D = parseInt(A(B.target).attr(
										"treedataindex"));
								B.data = C._getDataNodeByTreeDataIndex(C.data,
										D);
								return B
							}
							return null
						},
						upgrade : function(C) {
							var B = this, D = this.options;
							A(".l-note", C).each(
									function() {
										A(this).removeClass("l-note").addClass(
												"l-expandable-open")
									});
							A(".l-note-last", C).each(
									function() {
										A(this).removeClass("l-note-last")
												.addClass("l-expandable-open")
									});
							A("." + B._getChildNodeClassName(), C)
									.each(
											function() {
												A(this)
														.removeClass(
																B
																		._getChildNodeClassName())
														.addClass(
																B
																		._getParentNodeClassName(true))
											})
						},
						demotion : function(C) {
							var B = this, D = this.options;
							if (!C && C[0].tagName.toLowerCase() != "li") {
								return
							}
							var E = A(C).hasClass("l-last");
							A(".l-expandable-open", C).each(
									function() {
										A(this)
												.removeClass(
														"l-expandable-open")
												.addClass(
														E ? "l-note-last"
																: "l-note")
									});
							A(".l-expandable-close", C).each(
									function() {
										A(this).removeClass(
												"l-expandable-close").addClass(
												E ? "l-note-last" : "l-note")
									});
							A("." + B._getParentNodeClassName(true), C)
									.each(
											function() {
												A(this)
														.removeClass(
																B
																		._getParentNodeClassName(true))
														.addClass(
																B
																		._getChildNodeClassName())
											})
						},
						collapseAll : function() {
							var B = this, C = this.options;
							A(".l-expandable-open", B.tree).click()
						},
						expandAll : function() {
							var B = this, C = this.options;
							A(".l-expandable-close", B.tree).click()
						},
						expandNode : function(D) {
							/* create by hllian 展开指定节点 */
							var B = this, C = this.options;
							var T = A(D).children(":first").children(":first");
							if(T.hasClass("l-expandable-close")) {
								A(T).click();
							}
						},
						getExpandState : function(D) {
							/* 获取节点展开状态，展开返回true，未展开返回false */
							var B = this, C = this.options;
							var T = A(D).children(":first").children(":first");
							if(T.hasClass("l-expandable-close")) {
								return false;
							}else if(T.hasClass("l-expandable-open")) {
								return true;
							}
						},
						loadData : function(E, C, G) {
							var D = this, F = this.options;
							D.loading.show();
							var B = G ? "post" : "get";
							G = G || [];
							A.ajax({
								type : B,
								url : C,
								data : G,
								dataType : "json",
								success : function(H) {
									if (!H) {
										return
									}
									if (H.ret_data) {
										H = H.ret_data;
										D.loading.hide();
										D.append(E, H);
										D.trigger("success", [ H ])
									} else {
										D.loading.hide();
										D.append(E, H);
										D.trigger("success", [ H ])
									}
								},
								error : function(H, K, J) {
									try {
										D.loading.hide();
										D.trigger("error", [ H, K, J ])
									} catch (I) {
									}
								}
							})
						},
						clear : function() {
							var B = this, C = this.options;
							A("> li", B.tree).each(function() {
								B.remove(this)
							})
						},
						getNodeDom : function(C) {
							var B = this, D = this.options;
							if (C == null) {
								return C
							}
							if (typeof (C) == "string"
									|| typeof (C) == "number") {
								return A("li[treedataindex=" + C + "]", B.tree)
										.get(0)
							} else {
								if (typeof (C) == "object"
										&& "treedataindex" in C) {
									return B.getNodeDom(C.treedataindex)
								}
							}
							return C
						},
						remove : function(F) {
							var C = this, G = this.options;
							F = C.getNodeDom(F);
							var E = parseInt(A(F).attr("treedataindex"));
							var D = C._getDataNodeByTreeDataIndex(C.data, E);
							if (D) {
								C._setTreeDataStatus([ D ], "delete")
							}
							var B = C.getParentTreeItem(F);
							if (G.checkbox) {
								C._setParentCheckboxStatus(A(F))
							}
							A(F).remove();
							C._updateStyle(B ? A("ul:first", B) : C.tree)
						},
						_updateStyle : function(B) {
							var C = this, E = this.options;
							var F = A(" > li", B);
							var D = F.length;
							if (!D) {
								return
							}
							F.each(function(G, H) {
								if (G == 0 && !A(this).hasClass("l-first")) {
									A(this).addClass("l-first")
								}
								if (G == D - 1 && !A(this).hasClass("l-last")) {
									A(this).addClass("l-last")
								}
								if (G == 0 && G == D - 1) {
									A(this).addClass("l-onlychild")
								}
								A("> div .l-note,> div .l-note-last", this)
										.removeClass("l-note l-note-last")
										.addClass(
												G == D - 1 ? "l-note-last"
														: "l-note");
								C._setTreeItem(this, {
									isLast : G == D - 1
								})
							})
						},
						update : function(G, C) {
							var D = this, F = this.options;
							G = D.getNodeDom(G);
							var E = parseInt(A(G).attr("treedataindex"));
							nodedata = D._getDataNodeByTreeDataIndex(D.data, E);
							for ( var B in C) {
								nodedata[B] = C[B];
								if (B == F.textFieldName) {
									A("> .l-body > span", G).text(C[B])
								}
							}
						},
						append : function(H, L, J, N) {
							var I = this, C = this.options;
							H = I.getNodeDom(H);
							if (I.trigger("beforeAppend", [ H, L ]) == false) {
								return false
							}
							if (!L || !L.length) {
								return false
							}
							if (C.idFieldName && C.parentIDFieldName) {
								L = I.arrayToTree(L, C.idFieldName,
										C.parentIDFieldName)
							}
							I._addTreeDataIndexToData(L);
							I._setTreeDataStatus(L, "add");
							if (J != null) {
								J = I.getNodeDom(J)
							}
							I.trigger("append", [ H, L ]);
							I._appendData(H, L);
							if (H == null) {
								var D = I._getTreeHTMLByData(L, 1, [], true);
								D[D.length - 1] = D[0] = "";
								if (J != null) {
									A(J)[N ? "after" : "before"](D.join(""));
									I._updateStyle(H ? A("ul:first", H)
											: I.tree)
								} else {
									if (A("> li:last", I.tree).length > 0) {
										I._setTreeItem(
												A("> li:last", I.tree)[0], {
													isLast : false
												})
									}
									I.tree.append(D.join(""))
								}
								A(".l-body", I.tree).hover(function() {
									A(this).addClass("l-over")
								}, function() {
									A(this).removeClass("l-over")
								});
								I._upadteTreeWidth();
								I.trigger("afterAppend", [ H, L ]);
								return
							}
							var B = A(H);
							var M = parseInt(B.attr("outlinelevel"));
							var G = A("> ul", B).length > 0;
							if (!G) {
								B.append("<ul class='l-children'></ul>");
								I.upgrade(H)
							}
							var F = [];
							for ( var E = 1; E <= M - 1; E++) {
								var K = A(I.getParentTreeItem(H, E));
								F.push(K.hasClass("l-last"))
							}
							F.push(B.hasClass("l-last"));
							var D = I._getTreeHTMLByData(L, M + 1, F, true);
							D[D.length - 1] = D[0] = "";
							if (J != null) {
								A(J)[N ? "after" : "before"](D.join(""));
								I._updateStyle(H ? A("ul:first", H) : I.tree)
							} else {
								if (A("> .l-children > li:last", B).length > 0) {
									I._setTreeItem(A("> .l-children > li:last",
											B)[0], {
										isLast : false
									})
								}
								A(">.l-children", H).append(D.join(""))
							}
							I._upadteTreeWidth();
							A(">.l-children .l-body", H).hover(function() {
								A(this).addClass("l-over")
							}, function() {
								A(this).removeClass("l-over")
							});
							I.trigger("afterAppend", [ H, L ])
						},
						cancelSelect : function(D) {
							var C = this, H = this.options;
							var B = C.getNodeDom(D);
							var I = A(B);
							var F = parseInt(I.attr("treedataindex"));
							var E = C._getDataNodeByTreeDataIndex(C.data, F);
							var G = A(">div:first", I);
							if (H.checkbox) {
								A(".l-checkbox", G).removeClass(
										"l-checkbox-checked").addClass(
										"l-checkbox-unchecked")
							} else {
								G.removeClass("l-selected")
							}
							C.trigger("cancelSelect", [ {
								data : E,
								target : I[0]
							} ])
						},
						selectNode : function(C) {
							var B = this, H = this.options;
							var G = null;
							if (typeof (C) == "function") {
								G = C
							} else {
								if (typeof (C) == "object") {
									var I = A(C);
									var E = parseInt(I.attr("treedataindex"));
									var D = B._getDataNodeByTreeDataIndex(
											B.data, E);
									var F = A(">div:first", I);
									if (H.checkbox) {
										A(".l-checkbox", F).removeClass(
												"l-checkbox-unchecked")
												.addClass("l-checkbox-checked")
									} else {
										F.addClass("l-selected")
									}
									B.trigger("select", [ {
										data : D,
										target : I[0]
									} ]);
									return
								} else {
									G = function(J) {
										if (!J[H.idFieldName]) {
											return false
										}
										return J[H.idFieldName].toString() == C
												.toString()
									}
								}
							}
							A("li", B.tree).each(
									function() {
										var L = A(this);
										var K = parseInt(L
												.attr("treedataindex"));
										var J = B._getDataNodeByTreeDataIndex(
												B.data, K);
										if (G(J, K)) {
											B.selectNode(this)
										} else {
											B.cancelSelect(this)
										}
									})
						},
						getTextByID : function(E) {
							var B = this, D = this.options;
							var C = B.getDataByID(E);
							if (!C) {
								return null
							}
							return C[D.textFieldName]
						},
						getDataByID : function(E) {
							var B = this, D = this.options;
							var C = null;
							A("li", B.tree).each(
									function() {
										if (C) {
											return
										}
										var H = A(this);
										var G = parseInt(H
												.attr("treedataindex"));
										var F = B._getDataNodeByTreeDataIndex(
												B.data, G);
										if (F[D.idFieldName].toString() == E
												.toString()) {
											C = F
										}
									});
							return C
						},
						arrayToTree : function(F, B, H) {
							if (!F || !F.length) {
								return []
							}
							var K = [];
							var D = {};
							var I = F.length;
							for ( var G = 0; G < I; G++) {
								var C = F[G];
								D[C[B]] = C
							}
							for ( var G = 0; G < I; G++) {
								var E = F[G];
								var J = D[E[H]];
								if (!J) {
									K.push(E);
									continue
								}
								J.children = J.children || [];
								J.children.push(E)
							}
							return K
						},
						_getDataNodeByTreeDataIndex : function(E, D) {
							var C = this, F = this.options;
							for ( var B = 0; B < E.length; B++) {
								if (E[B].treedataindex == D) {
									return E[B]
								}
								if (E[B].children) {
									var G = C._getDataNodeByTreeDataIndex(
											E[B].children, D);
									if (G) {
										return G
									}
								}
							}
							return null
						},
						_setTreeDataStatus : function(D, B) {
							var C = this, E = this.options;
							A(D).each(function() {
								this[E.statusName] = B;
								if (this.children) {
									C._setTreeDataStatus(this.children, B)
								}
							})
						},
						_addTreeDataIndexToData : function(C) {
							var B = this, D = this.options;
							A(C).each(function() {
								if (this.treedataindex != undefined) {
									return
								}
								this.treedataindex = B.treedataindex++;
								if (this.children) {
									B._addTreeDataIndexToData(this.children)
								}
							})
						},
						_addToNodes : function(C) {
							var B = this, D = this.options;
							B.nodes = B.nodes || [];
							if (A.inArray(C, B.nodes) == -1) {
								B.nodes.push(C)
							}
							if (C.children) {
								A(C.children).each(function(E, F) {
									B._addToNodes(F)
								})
							}
						},
						_appendData : function(F, E) {
							var B = this, G = this.options;
							var D = parseInt(A(F).attr("treedataindex"));
							var C = B._getDataNodeByTreeDataIndex(B.data, D);
							if (B.treedataindex == undefined) {
								B.treedataindex = 0
							}
							if (C && C.children == undefined) {
								C.children = []
							}
							A(E).each(function(H, I) {
								if (C) {
									C.children[C.children.length] = I
								} else {
									B.data[B.data.length] = I
								}
								B._addToNodes(I)
							})
						},
						_setTreeItem : function(F, C) {
							var D = this, G = this.options;
							if (!C) {
								return
							}
							F = D.getNodeDom(F);
							var E = A(F);
							var B = parseInt(E.attr("outlinelevel"));
							if (C.isLast != undefined) {
								if (C.isLast == true) {
									E.removeClass("l-last").addClass("l-last");
									A("> div .l-note", E).removeClass("l-note")
											.addClass("l-note-last");
									A(".l-children li", E).find(
											".l-box:eq(" + (B - 1) + ")")
											.removeClass("l-line")
								} else {
									if (C.isLast == false) {
										E.removeClass("l-last");
										A("> div .l-note-last", E).removeClass(
												"l-note-last").addClass(
												"l-note");
										A(".l-children li", E).find(
												".l-box:eq(" + (B - 1) + ")")
												.removeClass("l-line")
												.addClass("l-line")
									}
								}
							}
						},
						_upadteTreeWidth : function() {
							var B = this, C = this.options;
							var D = B.maxOutlineLevel * 22;
							if (C.checkbox) {
								D += 22
							}
							if (C.parentIcon || C.childIcon) {
								D += 22
							}
							D += C.nodeWidth;
							B.tree.width(D)
						},
						_getChildNodeClassName : function() {
							var B = this, C = this.options;
							return "l-tree-icon-" + C.childIcon
						},
						_getParentNodeClassName : function(C) {
							var D = this, E = this.options;
							var B = "l-tree-icon-" + E.parentIcon;
							if (C) {
								B += "-open"
							}
							return B
						},
						_getTreeHTMLByData : function(I, O, J, L) {
							var M = this, C = this.options;
							if (M.maxOutlineLevel < O) {
								M.maxOutlineLevel = O
							}
							J = J || [];
							O = O || 1;
							var P = [];
							if (!L) {
								P
										.push('<ul class="l-children" style="display:none">')
							} else {
								P.push("<ul class='l-children'>")
							}
							for ( var K = 0; K < I.length; K++) {
								var H = K == 0;
								var F = K == I.length - 1;
								var N = false;
								var D = I[K];
								if (D.isexpand == true || D.isexpand == "true") {
									N = true
								}
								P.push("<li ");
								if (D.treedataindex != undefined) {
									P.push('treedataindex="' + D.treedataindex
											+ '" ')
								}
								if (N) {
									P.push("isexpand=" + D.isexpand + " ")
								}
								P.push("outlinelevel=" + O + " ");
								for ( var G = 0; G < M.sysAttribute.length; G++) {
									if (A(this).attr(M.sysAttribute[G])) {
										I[dataindex][M.sysAttribute[G]] = A(
												this).attr(M.sysAttribute[G])
									}
								}
								for ( var G = 0; G < C.attribute.length; G++) {
									if (D[C.attribute[G]]) {
										P.push(C.attribute[G] + '="'
												+ D[C.attribute[G]] + '" ')
									}
								}
								P.push('class="');
								H && P.push("l-first ");
								F && P.push("l-last ");
								H && F && P.push("l-onlychild ");
								P.push('"');
								P.push(">");
								P.push('<div class="l-body">');
								for ( var E = 0; E <= O - 2; E++) {
									if (J[E]) {
										P.push('<div class="l-box"></div>')
									} else {
										P
												.push('<div class="l-box l-line"></div>')
									}
								}
								if (M.hasChildren(D)) {
									if (N) {
										P
												.push('<div class="l-box l-expandable-open"></div>')
									} else {
										P
												.push('<div class="l-box l-expandable-close"></div>')
									}
									if (C.checkbox) {
										if (D.ischecked) {
											P
													.push('<div class="l-box l-checkbox l-checkbox-checked"></div>')
										} else {
											P
													.push('<div class="l-box l-checkbox l-checkbox-unchecked"></div>')
										}
									}
									if (C.parentIcon) {
										P
												.push('<div class="l-box l-tree-icon ');
										P.push(M._getParentNodeClassName(false)
												+ " ");
										if (C.iconFieldName
												&& D[C.iconFieldName]) {
											P.push("l-tree-icon-none")
										}
										P.push('">');
										if (C.iconFieldName
												&& D[C.iconFieldName]) {
											P.push('<img src="'
													+ D[C.iconFieldName]
													+ '" />')
										}
										P.push("</div>")
									}
								} else {
									if (F) {
										P
												.push('<div class="l-box l-note-last"></div>')
									} else {
										P
												.push('<div class="l-box l-note"></div>')
									}
									if (C.checkbox) {
										if (D.ischecked) {
											P
													.push('<div class="l-box l-checkbox l-checkbox-checked"></div>')
										} else {
											P
													.push('<div class="l-box l-checkbox l-checkbox-unchecked"></div>')
										}
									}
									if (C.childIcon) {
										P
												.push('<div class="l-box l-tree-icon ');
										P
												.push(M
														._getChildNodeClassName()
														+ " ");
										if (C.iconFieldName
												&& D[C.iconFieldName]) {
											P.push("l-tree-icon-none")
										}
										P.push('">');
										if (C.iconFieldName
												&& D[C.iconFieldName]) {
											P.push('<img src="'
													+ D[C.iconFieldName]
													+ '" />')
										}
										P.push("</div>")
									}
								}
								P.push("<span>" + D[C.textFieldName]
										+ "</span></div>");
								if (M.hasChildren(D) && C.isStaticTree) {
									var B = [];
									for ( var E = 0; E < J.length; E++) {
										B.push(J[E])
									}
									B.push(F);
									P.push(M._getTreeHTMLByData(D.children,
											O + 1, B, N).join(""))
								}
								P.push("</li>")
							}
							P.push("</ul>");
							return P
						},
						_getDataByTreeHTML : function(D) {
							var B = this, E = this.options;
							var C = [];
							A("> li", D)
									.each(
											function(G, H) {
												var I = C.length;
												C[I] = {
													treedataindex : B.treedataindex++
												};
												C[I][E.textFieldName] = A(
														"> span,> a", this)
														.html();
												for ( var F = 0; F < B.sysAttribute.length; F++) {
													if (A(this).attr(
															B.sysAttribute[F])) {
														C[I][B.sysAttribute[F]] = A(
																this)
																.attr(
																		B.sysAttribute[F])
													}
												}
												for ( var F = 0; F < E.attribute.length; F++) {
													if (A(this).attr(
															E.attribute[F])) {
														C[I][E.attribute[F]] = A(
																this).attr(
																E.attribute[F])
													}
												}
												if (A("> ul", this).length > 0) {
													C[I].children = B
															._getDataByTreeHTML(A(
																	"> ul",
																	this))
												}
											});
							return C
						},
						_applyTree : function() {
							var C = this, D = this.options;
							C.data = C._getDataByTreeHTML(C.tree);
							var B = C._getTreeHTMLByData(C.data, 1, [], true);
							B[B.length - 1] = B[0] = "";
							C.tree.html(B.join(""));
							C._upadteTreeWidth();
							A(".l-body", C.tree).hover(function() {
								A(this).addClass("l-over")
							}, function() {
								A(this).removeClass("l-over")
							})
						},
						_applyTreeEven : function(C) {
							var B = this, D = this.options;
							A("> .l-body", C).hover(function() {
								A(this).addClass("l-over")
							}, function() {
								A(this).removeClass("l-over")
							})
						},
						_getSrcElementByEvent : function(I) {
							var E = this;
							var H = (I.target || I.srcElement);
							var B = H.tagName.toLowerCase();
							var G = A(H).parents().add(H);
							var C = function(K) {
								for ( var J = G.length - 1; J >= 0; J--) {
									if (A(G[J]).hasClass(K)) {
										return G[J]
									}
								}
								return null
							};
							if (G.index(this.element) == -1) {
								return {
									out : true
								}
							}
							var D = {
								tree : C("l-tree"),
								node : C("l-body"),
								checkbox : C("l-checkbox"),
								icon : C("l-tree-icon"),
								text : B == "span"
							};
							if (D.node) {
								var F = parseInt(A(D.node).parent().attr(
										"treedataindex"));
								D.data = E._getDataNodeByTreeDataIndex(E.data,
										F)
							}
							return D
						},
						_setTreeEven : function() {
							var B = this, C = this.options;
							if (B.hasBind("contextmenu")) {
								B.tree
										.bind(
												"contextmenu",
												function(G) {
													var F = (G.target || G.srcElement);
													var H = null;
													if (F.tagName.toLowerCase() == "a"
															|| F.tagName
																	.toLowerCase() == "span"
															|| A(F).hasClass(
																	"l-box")) {
														H = A(F).parent()
																.parent()
													} else {
														if (A(F).hasClass(
																"l-body")) {
															H = A(F).parent()
														} else {
															if (F.tagName
																	.toLowerCase() == "li") {
																H = A(F)
															}
														}
													}
													if (!H) {
														return
													}
													var E = parseInt(H
															.attr("treedataindex"));
													var D = B
															._getDataNodeByTreeDataIndex(
																	B.data, E);
													return B.trigger(
															"contextmenu", [ {
																data : D,
																target : H[0]
															}, G ])
												})
							}
							B.tree
									.click(function(I) {
										var H = (I.target || I.srcElement);
										var K = null;
										if (H.tagName.toLowerCase() == "a"
												|| H.tagName.toLowerCase() == "span"
												|| A(H).hasClass("l-box")) {
											K = A(H).parent().parent()
										} else {
											if (A(H).hasClass("l-body")) {
												K = A(H).parent()
											} else {
												K = A(H)
											}
										}
										if (!K) {
											return
										}
										var G = parseInt(K
												.attr("treedataindex"));
										var F = B._getDataNodeByTreeDataIndex(
												B.data, G);
										var E = A("div.l-body:first", K)
												.find(
														"div.l-expandable-open:first,div.l-expandable-close:first");
										var D = A(H).hasClass(
												"l-expandable-open")
												|| A(H).hasClass(
														"l-expandable-close");
										if (!A(H).hasClass("l-checkbox") && !D) {
											if (A(">div:first", K).hasClass(
													"l-selected")) {
												if (B.trigger(
														"beforeCancelSelect",
														[ {
															data : F,
															target : K[0]
														} ]) == false) {
													return false
												}
												A(">div:first", K).removeClass(
														"l-selected");
												B.trigger("cancelSelect", [ {
													data : F,
													target : K[0]
												} ])
											} else {
												if (B.trigger("beforeSelect",
														[ {
															data : F,
															target : K[0]
														} ]) == false) {
													return false
												}
												A(".l-body", B.tree)
														.removeClass(
																"l-selected");
												A(">div:first", K).addClass(
														"l-selected");
												B.trigger("select", [ {
													data : F,
													target : K[0]
												} ])
											}
										}
										if (A(H).hasClass("l-checkbox")) {
											if (C.autoCheckboxEven) {
												if (A(H).hasClass(
														"l-checkbox-unchecked")) {
													A(H)
															.removeClass(
																	"l-checkbox-unchecked")
															.addClass(
																	"l-checkbox-checked");
													A(
															".l-children .l-checkbox",
															K)
															.removeClass(
																	"l-checkbox-unchecked")
															.addClass(
																	"l-checkbox-checked");
													B.trigger("check", [ {
														data : F,
														target : K[0]
													}, true ])
												} else {
													if (A(H)
															.hasClass(
																	"l-checkbox-checked")) {
														A(H)
																.removeClass(
																		"l-checkbox-checked")
																.addClass(
																		"l-checkbox-unchecked");
														A(
																".l-children .l-checkbox",
																K)
																.removeClass(
																		"l-checkbox-checked")
																.addClass(
																		"l-checkbox-unchecked");
														B.trigger("check", [ {
															data : F,
															target : K[0]
														}, false ])
													}
												}
												B._setParentCheckboxStatus(K)
											} else {
												if (A(H).hasClass(
														"l-checkbox-unchecked")) {
													A(H)
															.removeClass(
																	"l-checkbox-unchecked")
															.addClass(
																	"l-checkbox-checked");
													if (C.single) {
														A(".l-checkbox", B.tree)
																.not(H)
																.removeClass(
																		"l-checkbox-checked")
																.addClass(
																		"l-checkbox-unchecked")
													}
													B.trigger("check", [ {
														data : F,
														target : K[0]
													}, true ])
												} else {
													if (A(H)
															.hasClass(
																	"l-checkbox-checked")) {
														A(H)
																.removeClass(
																		"l-checkbox-checked")
																.addClass(
																		"l-checkbox-unchecked");
														B.trigger("check", [ {
															data : F,
															target : K[0]
														}, false ])
													}
												}
											}
										} else {
											if (E.hasClass("l-expandable-open")
													&& (!C.btnClickToToggleOnly || D)) {
												if (B.trigger("beforeCollapse",
														[ {
															data : F,
															target : K[0]
														} ]) == false) {
													return false
												}
												E
														.removeClass(
																"l-expandable-open")
														.addClass(
																"l-expandable-close");
												if (C.slide) {
													A("> .l-children", K)
															.slideToggle("fast")
												} else {
													A("> .l-children", K)
															.toggle()
												}
												A(
														"> div ."
																+ B
																		._getParentNodeClassName(true),
														K)
														.removeClass(
																B
																		._getParentNodeClassName(true))
														.addClass(
																B
																		._getParentNodeClassName());
												B.trigger("collapse", [ {
													data : F,
													target : K[0]
												} ])
											} else {
												if (E
														.hasClass("l-expandable-close")
														&& (!C.btnClickToToggleOnly || D)) {
													if (B.trigger(
															"beforeExpand", [ {
																data : F,
																target : K[0]
															} ]) == false) {
														return false
													}
													E
															.removeClass(
																	"l-expandable-close")
															.addClass(
																	"l-expandable-open");
													var J = function() {
														B.trigger("expand", [ {
															data : F,
															target : K[0]
														} ])
													};
													if (C.slide) {
														A("> .l-children", K)
																.slideToggle(
																		"fast",
																		J)
													} else {
														A("> .l-children", K)
																.toggle();
														J()
													}
													A(
															"> div ."
																	+ B
																			._getParentNodeClassName(),
															K)
															.removeClass(
																	B
																			._getParentNodeClassName())
															.addClass(
																	B
																			._getParentNodeClassName(true))
												}
											}
										}
										B.trigger("click", [ {
											data : F,
											target : K[0]
										} ])
									});
							if (A.fn.ligerDrag && C.nodeDraggable) {
								B.nodeDroptip = A(
										"<div class='l-drag-nodedroptip' style='display:none'></div>")
										.appendTo("body");
								B.tree
										.ligerDrag({
											revert : true,
											animate : false,
											proxyX : 20,
											proxyY : 20,
											proxy : function(D, J) {
												var K = B
														._getSrcElementByEvent(J);
												if (K.node) {
													var I = "dragging";
													if (C.nodeDraggingRender) {
														I = C
																.nodeDraggingRender(
																		D.draggingNodes,
																		D, B)
													} else {
														I = "";
														var G = false;
														for ( var F in D.draggingNodes) {
															var H = D.draggingNodes[F];
															if (G) {
																I += ","
															}
															I += H.text;
															G = true
														}
													}
													var E = A(
															"<div class='l-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div>"
																	+ I
																	+ "</div>")
															.appendTo("body");
													return E
												}
											},
											onRevert : function() {
												return false
											},
											onRendered : function() {
												this.set("cursor", "default");
												B.children[this.id] = this
											},
											onStartDrag : function(G, F) {
												if (F.button == 2) {
													return false
												}
												this.set("cursor", "default");
												var H = B
														._getSrcElementByEvent(F);
												if (H.checkbox) {
													return false
												}
												if (C.checkbox) {
													var E = B.getChecked();
													this.draggingNodes = [];
													for ( var D in E) {
														this.draggingNodes
																.push(E[D].data)
													}
													if (!this.draggingNodes
															|| !this.draggingNodes.length) {
														return false
													}
												} else {
													this.draggingNodes = [ H.data ]
												}
												this.draggingNode = H.data;
												this.set("cursor", "move");
												B.nodedragging = true;
												this.validRange = {
													top : B.tree.offset().top,
													bottom : B.tree.offset().top
															+ B.tree.height(),
													left : B.tree.offset().left,
													right : B.tree.offset().left
															+ B.tree.width()
												}
											},
											onDrag : function(N, O) {
												var Q = this.draggingNode;
												if (!Q) {
													return false
												}
												var E = this.draggingNodes ? this.draggingNodes
														: [ Q ];
												if (B.nodeDropIn == null) {
													B.nodeDropIn = -1
												}
												var J = O.pageX;
												var G = O.pageY;
												var R = false;
												var S = this.validRange;
												if (J < S.left || J > S.right
														|| G > S.bottom
														|| G < S.top) {
													B.nodeDropIn = -1;
													B.nodeDroptip.hide();
													this.proxy
															.find(
																	".l-drop-icon:first")
															.removeClass(
																	"l-drop-yes l-drop-add")
															.addClass(
																	"l-drop-no");
													return
												}
												for ( var K = 0, F = B.nodes.length; K < F; K++) {
													var I = B.nodes[K];
													var M = I.treedataindex;
													if (Q.treedataindex == M) {
														R = true
													}
													if (A.inArray(I, E) != -1) {
														continue
													}
													var T = R ? true : false;
													if (B.nodeDropIn != -1
															&& B.nodeDropIn != M) {
														continue
													}
													var D = A(
															"li[treedataindex="
																	+ M
																	+ "] div:first",
															B.tree);
													var H = D.offset();
													var L = {
														top : H.top,
														bottom : H.top
																+ D.height(),
														left : B.tree.offset().left,
														right : B.tree.offset().left
																+ B.tree
																		.width()
													};
													if (J > L.left
															&& J < L.right
															&& G > L.top
															&& G < L.bottom) {
														var P = H.top;
														if (T) {
															P += D.height()
														}
														B.nodeDroptip
																.css(
																		{
																			left : L.left,
																			top : P,
																			width : L.right
																					- L.left
																		})
																.show();
														B.nodeDropIn = M;
														B.nodeDropDir = T ? "bottom"
																: "top";
														if (G > L.top + 7
																&& G < L.bottom - 7) {
															this.proxy
																	.find(
																			".l-drop-icon:first")
																	.removeClass(
																			"l-drop-no l-drop-yes")
																	.addClass(
																			"l-drop-add");
															B.nodeDroptip
																	.hide();
															B.nodeDropInParent = true
														} else {
															this.proxy
																	.find(
																			".l-drop-icon:first")
																	.removeClass(
																			"l-drop-no l-drop-add")
																	.addClass(
																			"l-drop-yes");
															B.nodeDroptip
																	.show();
															B.nodeDropInParent = false
														}
														break
													} else {
														if (B.nodeDropIn != -1) {
															B.nodeDropIn = -1;
															B.nodeDropInParent = false;
															B.nodeDroptip
																	.hide();
															this.proxy
																	.find(
																			".l-drop-icon:first")
																	.removeClass(
																			"l-drop-yes  l-drop-add")
																	.addClass(
																			"l-drop-no")
														}
													}
												}
											},
											onStopDrag : function(I, H) {
												var D = this.draggingNodes;
												B.nodedragging = false;
												if (B.nodeDropIn != -1) {
													for ( var F = 0; F < D.length; F++) {
														var E = D[F].children;
														if (E) {
															D = A
																	.grep(
																			D,
																			function(
																					K,
																					J) {
																				var L = A
																						.inArray(
																								K,
																								E) == -1;
																				return L
																			})
														}
													}
													for ( var F in D) {
														var G = D[F];
														if (B.nodeDropInParent) {
															B.remove(G);
															B
																	.append(
																			B.nodeDropIn,
																			[ G ])
														} else {
															B.remove(G);
															B
																	.append(
																			B
																					.getParent(B.nodeDropIn),
																			[ G ],
																			B.nodeDropIn,
																			B.nodeDropDir == "bottom")
														}
													}
													B.nodeDropIn = -1
												}
												B.nodeDroptip.hide();
												this.set("cursor", "default")
											}
										})
							}
						},
						_setParentCheckboxStatus : function(F) {
							var D = this, E = this.options;
							var B = A(".l-checkbox-unchecked", F.parent()).length == 0;
							var C = A(".l-checkbox-checked", F.parent()).length == 0;
							if (B) {
								F.parent().prev().find(".l-checkbox")
										.removeClass("l-checkbox-unchecked")
										.addClass("l-checkbox-checked")
							} else {
								if (C) {
									F.parent().prev().find("> .l-checkbox")
											.removeClass("l-checkbox-checked")
											.addClass("l-checkbox-unchecked")
								} else {
									F
											.parent()
											.prev()
											.find("> .l-checkbox")
											.removeClass(
													"l-checkbox-unchecked l-checkbox-checked")
											.addClass("l-checkbox-checked")
								}
							}
							if (F.parent().parent("li").length > 0) {
								D._setParentCheckboxStatus(F.parent().parent(
										"li"))
							}
						}
					})
})(jQuery);
(function(A) {
	A.fn.ligerTab = function(B) {
		return A.ligerui.run.call(this, "ligerTab", arguments)
	};
	A.fn.ligerGetTabManager = function() {
		return A.ligerui.run.call(this, "ligerGetTabManager", arguments)
	};
	A.ligerDefaults.Tab = {
		height : null,
		heightDiff : 0,
		changeHeightOnResize : false,
		contextmenu : true,
		dblClickToClose : false,
		dragToMove : false,
		onBeforeOverrideTabItem : null,
		onAfterOverrideTabItem : null,
		onBeforeRemoveTabItem : null,
		onAfterRemoveTabItem : null,
		onBeforeAddTabItem : null,
		onAfterAddTabItem : null,
		onBeforeSelectTabItem : null,
		onAfterSelectTabItem : null
	};
	A.ligerDefaults.TabString = {
		closeMessage : "关闭当前页",
		closeOtherMessage : "关闭其他",
		closeAllMessage : "关闭所有",
		reloadMessage : "刷新"
	};
	A.ligerMethos.Tab = {};
	A.ligerui.controls.Tab = function(C, B) {
		A.ligerui.controls.Tab.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Tab
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "Tab"
						},
						__idPrev : function() {
							return "Tab"
						},
						_extendMethods : function() {
							return A.ligerMethos.Tab
						},
						_render : function() {
							var C = this, E = this.options;
							if (E.height) {
								C.makeFullHeight = true
							}
							C.tab = A(this.element);
							C.tab.addClass("l-tab");
							if (E.contextmenu && A.ligerMenu) {
								C.tab.menu = A.ligerMenu({
									width : 100,
									items : [
											{
												text : E.closeMessage,
												id : "close",
												click : function() {
													C._menuItemClick.apply(C,
															arguments)
												}
											},
											{
												text : E.closeOtherMessage,
												id : "closeother",
												click : function() {
													C._menuItemClick.apply(C,
															arguments)
												}
											},
											{
												text : E.closeAllMessage,
												id : "closeall",
												click : function() {
													C._menuItemClick.apply(C,
															arguments)
												}
											},
											{
												text : E.reloadMessage,
												id : "reload",
												click : function() {
													C._menuItemClick.apply(C,
															arguments)
												}
											} ]
								})
							}
							C.tab.content = A('<div class="l-tab-content"></div>');
							A("> div", C.tab).appendTo(C.tab.content);
							C.tab.content.appendTo(C.tab);
							C.tab.links = A('<div class="l-tab-links"><ul style="left: 0px; "></ul></div>');
							C.tab.links.prependTo(C.tab);
							C.tab.links.ul = A("ul", C.tab.links);
							var B = A("> div[lselected=true]", C.tab.content);
							var D = B.length > 0;
							C.selectedTabId = B.attr("tabid");
							A("> div", C.tab.content)
									.each(
											function(I, K) {
												var F = A('<li class=""><a></a><div class="l-tab-links-item-left"></div><div class="l-tab-links-item-right"></div></li>');
												var H = A(this);
												if (H.attr("title")) {
													A("> a", F).html(
															H.attr("title"));
													H.attr("title", "")
												}
												var G = H.attr("tabid");
												if (G == undefined) {
													G = C.getNewTabid();
													H.attr("tabid", G);
													if (H.attr("lselected")) {
														C.selectedTabId = G
													}
												}
												F.attr("tabid", G);
												if (!D && I == 0) {
													C.selectedTabId = G
												}
												var M = H.attr("showClose");
												if (M) {
													F
															.append("<div class='l-tab-links-item-close'></div>")
												}
												A("> ul", C.tab.links)
														.append(F);
												if (!H
														.hasClass("l-tab-content-item")) {
													H
															.addClass("l-tab-content-item")
												}
												if (H.find("iframe").length > 0) {
													var J = A("iframe:first", H);
													if (J[0].readyState != "complete") {
														if (H
																.find(".l-tab-loading:first").length == 0) {
															H
																	.prepend("<div class='l-tab-loading' style='display:block;'></div>")
														}
														var L = A(
																".l-tab-loading:first",
																H);
														J.bind("load.tab",
																function() {
																	L.hide()
																})
													}
												}
											});
							C.selectTabItem(C.selectedTabId);
							if (E.height) {
								if (typeof (E.height) == "string"
										&& E.height.indexOf("%") > 0) {
									C.onResize();
									if (E.changeHeightOnResize) {
										A(window).resize(function() {
											C.onResize.call(C)
										})
									}
								} else {
									C.setHeight(E.height)
								}
							}
							if (C.makeFullHeight) {
								C.setContentHeight()
							}
							A("li", C.tab.links).each(function() {
								C._addTabItemEvent(A(this))
							});
							C.tab
									.bind(
											"dblclick.tab",
											function(J) {
												if (!E.dblClickToClose) {
													return
												}
												C.dblclicking = true;
												var I = (J.target || J.srcElement);
												var H = I.tagName.toLowerCase();
												if (H == "a") {
													var G = A(I).parent().attr(
															"tabid");
													var F = A(I)
															.parent()
															.find(
																	"div.l-tab-links-item-close").length ? true
															: false;
													if (F) {
														C.removeTabItem(G)
													}
												}
												C.dblclicking = false
											});
							C.set(E)
						},
						_applyDrag : function(D) {
							var C = this, E = this.options;
							C.droptip = C.droptip
									|| A(
											"<div class='l-tab-drag-droptip' style='display:none'><div class='l-drop-move-up'></div><div class='l-drop-move-down'></div></div>")
											.appendTo("body");
							var B = A(D)
									.ligerDrag(
											{
												revert : true,
												animate : false,
												proxy : function() {
													var F = A(this).find("a")
															.html();
													C.dragproxy = A(
															"<div class='l-tab-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div></div>")
															.appendTo("body");
													C.dragproxy.append(F);
													return C.dragproxy
												},
												onRendered : function() {
													this.set("cursor",
															"pointer")
												},
												onStartDrag : function(H, G) {
													if (!A(D).hasClass(
															"l-selected")) {
														return false
													}
													if (G.button == 2) {
														return false
													}
													var F = G.srcElement
															|| G.target;
													if (A(F)
															.hasClass(
																	"l-tab-links-item-close")) {
														return false
													}
												},
												onDrag : function(H, G) {
													if (C.dropIn == null) {
														C.dropIn = -1
													}
													var I = C.tab.links.ul
															.find(">li");
													var F = I.index(H.target);
													I
															.each(function(M, O) {
																if (F == M) {
																	return
																}
																var J = M > F;
																if (C.dropIn != -1
																		&& C.dropIn != M) {
																	return
																}
																var P = A(this)
																		.offset();
																var K = {
																	top : P.top,
																	bottom : P.top
																			+ A(
																					this)
																					.height(),
																	left : P.left - 10,
																	right : P.left + 10
																};
																if (J) {
																	K.left += A(
																			this)
																			.width();
																	K.right += A(
																			this)
																			.width()
																}
																var N = G.pageX
																		|| G.screenX;
																var L = G.pageY
																		|| G.screenY;
																if (N > K.left
																		&& N < K.right
																		&& L > K.top
																		&& L < K.bottom) {
																	C.droptip
																			.css(
																					{
																						left : K.left + 5,
																						top : K.top - 9
																					})
																			.show();
																	C.dropIn = M;
																	C.dragproxy
																			.find(
																					".l-drop-icon")
																			.removeClass(
																					"l-drop-no")
																			.addClass(
																					"l-drop-yes")
																} else {
																	C.dropIn = -1;
																	C.droptip
																			.hide();
																	C.dragproxy
																			.find(
																					".l-drop-icon")
																			.removeClass(
																					"l-drop-yes")
																			.addClass(
																					"l-drop-no")
																}
															})
												},
												onStopDrag : function(G, F) {
													if (C.dropIn > -1) {
														var I = C.tab.links.ul
																.find(
																		">li:eq("
																				+ C.dropIn
																				+ ")")
																.attr("tabid");
														var H = A(G.target)
																.attr("tabid");
														setTimeout(function() {
															C.moveTabItem(H, I)
														}, 0);
														C.dropIn = -1;
														C.dragproxy.remove()
													}
													C.droptip.hide();
													this.set("cursor",
															"default")
												}
											});
							return B
						},
						_setDragToMove : function(C) {
							if (!A.fn.ligerDrag) {
								return
							}
							var B = this, D = this.options;
							if (C) {
								if (B.drags) {
									return
								}
								B.drags = B.drags || [];
								B.tab.links.ul.find(">li").each(function() {
									B.drags.push(B._applyDrag(this))
								})
							}
						},
						moveTabItem : function(H, C) {
							var B = this;
							var G = B.tab.links.ul.find(">li[tabid=" + H + "]");
							var F = B.tab.links.ul.find(">li[tabid=" + C + "]");
							var E = B.tab.links.ul.find(">li").index(G);
							var D = B.tab.links.ul.find(">li").index(F);
							if (E < D) {
								F.after(G)
							} else {
								F.before(G)
							}
						},
						setTabButton : function() {
							var C = this, D = this.options;
							var E = 0;
							A("li", C.tab.links.ul).each(function() {
								E += A(this).width() + 2
							});
							var B = C.tab.width();
							if (E > B) {
								C.tab.links
										.append('<div class="l-tab-links-left"></div><div class="l-tab-links-right"></div>');
								C.setTabButtonEven();
								return true
							} else {
								C.tab.links.ul.animate({
									left : 0
								});
								A(".l-tab-links-left,.l-tab-links-right",
										C.tab.links).remove();
								return false
							}
						},
						setTabButtonEven : function() {
							var B = this, C = this.options;
							A(".l-tab-links-left", B.tab.links).hover(
									function() {
										A(this).addClass(
												"l-tab-links-left-over")
									},
									function() {
										A(this).removeClass(
												"l-tab-links-left-over")
									}).click(function() {
								B.moveToPrevTabItem()
							});
							A(".l-tab-links-right", B.tab.links).hover(
									function() {
										A(this).addClass(
												"l-tab-links-right-over")
									},
									function() {
										A(this).removeClass(
												"l-tab-links-right-over")
									}).click(function() {
								B.moveToNextTabItem()
							})
						},
						moveToPrevTabItem : function() {
							var E = this, G = this.options;
							var B = A(".l-tab-links-left", E.tab.links).width();
							var F = new Array();
							A("li", E.tab.links).each(
									function(H, I) {
										var J = -1 * B;
										if (H > 0) {
											J = parseInt(F[H - 1])
													+ A(this).prev().width()
													+ 2
										}
										F.push(J)
									});
							var D = -1 * parseInt(E.tab.links.ul.css("left"));
							for ( var C = 0; C < F.length - 1; C++) {
								if (F[C] < D && F[C + 1] >= D) {
									E.tab.links.ul.animate({
										left : -1 * parseInt(F[C])
									});
									return
								}
							}
						},
						moveToNextTabItem : function() {
							var K = this, C = this.options;
							var G = A(".l-tab-links-right", K.tab).width();
							var H = 0;
							var D = A("li", K.tab.links.ul);
							D.each(function() {
								H += A(this).width() + 2
							});
							var J = K.tab.width();
							var I = new Array();
							for ( var F = D.length - 1; F >= 0; F--) {
								var L = H - J + G + 2;
								if (F != D.length - 1) {
									L = parseInt(I[D.length - 2 - F])
											- A(D[F + 1]).width() - 2
								}
								I.push(L)
							}
							var B = -1 * parseInt(K.tab.links.ul.css("left"));
							for ( var E = 1; E < I.length; E++) {
								if (I[E] <= B && I[E - 1] > B) {
									K.tab.links.ul.animate({
										left : -1 * parseInt(I[E - 1])
									});
									return
								}
							}
						},
						getTabItemCount : function() {
							var B = this, C = this.options;
							return A("li", B.tab.links.ul).length
						},
						getSelectedTabItemID : function() {
							var B = this, C = this.options;
							return A("li.l-selected", B.tab.links.ul).attr(
									"tabid")
						},
						removeSelectedTabItem : function() {
							var B = this, C = this.options;
							B.removeTabItem(B.getSelectedTabItemID())
						},
						overrideSelectedTabItem : function(B) {
							var C = this, D = this.options;
							C.overrideTabItem(C.getSelectedTabItemID(), B)
						},
						overrideTabItem : function(K, N) {
							var F = this, D = this.options;
							if (F.trigger("beforeOverrideTabItem", [ K ]) == false) {
								return false
							}
							var B = N.tabid;
							if (B == undefined) {
								B = F.getNewTabid()
							}
							var C = N.url;
							var H = N.content;
							var G = N.target;
							var M = N.text;
							var I = N.showClose;
							var L = N.height;
							if (F.isTabItemExist(B)) {
								return
							}
							var E = A("li[tabid=" + K + "]", F.tab.links.ul);
							var J = A(".l-tab-content-item[tabid=" + K + "]",
									F.tab.content);
							if (!E || !J) {
								return
							}
							E.attr("tabid", B);
							J.attr("tabid", B);
							if (A("iframe", J).length == 0 && C) {
								J.html("<iframe frameborder='0'></iframe>")
							} else {
								if (H) {
									J.html(H)
								}
							}
							A("iframe", J).attr("name", B);
							if (I == undefined) {
								I = true
							}
							if (I == false) {
								A(".l-tab-links-item-close", E).remove()
							} else {
								if (A(".l-tab-links-item-close", E).length == 0) {
									E
											.append("<div class='l-tab-links-item-close'></div>")
								}
							}
							if (M == undefined) {
								M = B
							}
							if (L) {
								J.height(L)
							}
							A("a", E).text(M);
							A("iframe", J).attr("src", C);
							F.trigger("afterOverrideTabItem", [ K ])
						},
						selectTabItem : function(B) {
							var C = this, D = this.options;
							if (C.trigger("beforeSelectTabItem", [ B ]) == false) {
								return false
							}
							C.selectedTabId = B;
							A("> .l-tab-content-item[tabid=" + B + "]",
									C.tab.content).show().siblings().hide();
							A("li[tabid=" + B + "]", C.tab.links.ul).addClass(
									"l-selected").siblings().removeClass(
									"l-selected");
							C.trigger("afterSelectTabItem", [ B ])
						},
						moveToLastTabItem : function() {
							var D = this, E = this.options;
							var F = 0;
							A("li", D.tab.links.ul).each(function() {
								F += A(this).width() + 2
							});
							var C = D.tab.width();
							if (F > C) {
								var B = A(".l-tab-links-right", D.tab.links)
										.width();
								D.tab.links.ul.animate({
									left : -1 * (F - C + B + 2)
								})
							}
						},
						isTabItemExist : function(B) {
							var C = this, D = this.options;
							return A("li[tabid=" + B + "]", C.tab.links.ul).length > 0
						},
						addTabItem : function(O) {
							var G = this, D = this.options;
							if (G.trigger("beforeAddTabItem", [ B ]) == false) {
								return false
							}
							var B = O.tabid;
							if (B == undefined) {
								B = G.getNewTabid()
							}
							var C = O.url;
							var H = O.content;
							var N = O.text;
							var I = O.showClose;
							var M = O.height;
							if (G.isTabItemExist(B)) {
								G.selectTabItem(B);
								return
							}
							var E = A("<li><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div><div class='l-tab-links-item-close'></div></li>");
							var K = A("<div class='l-tab-content-item'><div class='l-tab-loading' style='display:block;'></div><iframe frameborder='0'></iframe></div>");
							var L = A("div:first", K);
							var F = A("iframe:first", K);
							if (G.makeFullHeight) {
								var J = G.tab.height() - G.tab.links.height();
								K.height(J)
							}
							E.attr("tabid", B);
							E.attr("taburl", C);
							E.attr("hasLoad", O.hasLoad);
							if(O.clickReload)
								E.click(function() {G.reload(B);});
							K.attr("tabid", B);
							if (C) {
								F.attr("name", B).attr("id", B).attr("src", C)
										.bind("load.tab", function() {
											L.hide();
											if (O.callback) {
												O.callback()
											}
										})
							} else {
								F.remove();
								L.remove()
							}
							if (H) {
								K.html(H)
							} else {
								if (O.target) {
									K.append(O.target)
								} else {
									if (O.loadUrl) {
										K.load(D.url, function() {
											G.trigger("loaded")
										})
									}
								}
							}
							if (I == undefined) {
								I = true
							}
							if (I == false) {
								A(".l-tab-links-item-close", E).remove()
							}
							if (N == undefined) {
								N = B
							}
							if (M) {
								K.height(M)
							}
							A("a", E).text(N);
							G.tab.links.ul.append(E);
							G.tab.content.append(K);
							G.selectTabItem(B);
							if (G.setTabButton()) {
								G.moveToLastTabItem()
							}
							G._addTabItemEvent(E);
							if (D.dragToMove && A.fn.ligerDrag) {
								G.drags = G.drags || [];
								E.each(function() {
									G.drags.push(G._applyDrag(this))
								})
							}
							G.trigger("afterAddTabItem", [ B ])
						},
						_addTabItemEvent : function(B) {
							var C = this, D = this.options;
							B.click(function() {
								var E = A(this).attr("tabid");
								C.selectTabItem(E)
							});
							C.tab.menu && C._addTabItemContextMenuEven(B);
							A(".l-tab-links-item-close", B).hover(
									function() {
										A(this).addClass(
												"l-tab-links-item-close-over")
									},
									function() {
										A(this).removeClass(
												"l-tab-links-item-close-over")
									}).click(function() {
								var E = A(this).parent().attr("tabid");
								C.removeTabItem(E)
							})
						},
						removeTabItem : function(B) {
							var D = this, E = this.options;
							if (D.trigger("beforeRemoveTabItem", [ B ]) == false) {
								return false
							}
							var C = A("li[tabid=" + B + "]", D.tab.links.ul)
									.hasClass("l-selected");
							if (C) {
								A(".l-tab-content-item[tabid=" + B + "]",
										D.tab.content).prev().show();
								A("li[tabid=" + B + "]", D.tab.links.ul).prev()
										.addClass("l-selected").siblings()
										.removeClass("l-selected")
							}
							A(".l-tab-content-item[tabid=" + B + "]",
									D.tab.content).remove();
							A("li[tabid=" + B + "]", D.tab.links.ul).remove();
							D.setTabButton();
							D.trigger("afterRemoveTabItem", [ B ])
						},
						addHeight : function(E) {
							var C = this, D = this.options;
							var B = C.tab.height() + E;
							C.setHeight(B)
						},
						setHeight : function(B) {
							var C = this, D = this.options;
							C.tab.height(B);
							C.setContentHeight()
						},
						setContentHeight : function() {
							var C = this, D = this.options;
							var B = C.tab.height() - C.tab.links.height();
							C.tab.content.height(B);
							A("> .l-tab-content-item", C.tab.content).height(B)
						},
						getNewTabid : function() {
							var B = this, C = this.options;
							B.getnewidcount = B.getnewidcount || 0;
							return "tabitem" + (++B.getnewidcount)
						},
						getTabidList : function(C, B) {
							var E = this, F = this.options;
							var D = [];
							A("> li", E.tab.links.ul)
									.each(
											function() {
												if (A(this).attr("tabid")
														&& A(this)
																.attr("tabid") != C
														&& (!B || A(
																".l-tab-links-item-close",
																this).length > 0)) {
													D.push(A(this)
															.attr("tabid"))
												}
											});
							return D
						},
						removeOther : function(B, F) {
							var D = this, E = this.options;
							var C = D.getTabidList(B, true);
							A(C).each(function() {
								D.removeTabItem(this)
							})
						},
						reload : function(B) {
							var F = this, H = this.options;
							var D = A(".l-tab-content-item[tabid=" + B + "]");
							var G = A(".l-tab-loading:first", D);
							var E = A("iframe:first", D);
							var C = A(E).attr("src");
							G.show();
							E.attr("src", C).unbind("load.tab").bind(
									"load.tab", function() {
										G.hide()
									})
						},
						removeAll : function(E) {
							var C = this, D = this.options;
							var B = C.getTabidList(null, true);
							A(B).each(function() {
								C.removeTabItem(this)
							})
						},
						onResize : function() {
							var B = this, C = this.options;
							if (!C.height || typeof (C.height) != "string"
									|| C.height.indexOf("%") == -1) {
								return false
							}
							if (B.tab.parent()[0].tagName.toLowerCase() == "body") {
								var D = A(window).height();
								D -= parseInt(B.tab.parent().css("paddingTop"));
								D -= parseInt(B.tab.parent().css(
										"paddingBottom"));
								B.height = C.heightDiff + D
										* parseFloat(B.height) * 0.01
							} else {
								B.height = C.heightDiff
										+ (B.tab.parent().height()
												* parseFloat(C.height) * 0.01)
							}
							B.tab.height(B.height);
							B.setContentHeight()
						},
						_menuItemClick : function(C) {
							var B = this, D = this.options;
							if (!C.id || !B.actionTabid) {
								return
							}
							switch (C.id) {
							case "close":
								B.removeTabItem(B.actionTabid);
								B.actionTabid = null;
								break;
							case "closeother":
								B.removeOther(B.actionTabid);
								break;
							case "closeall":
								B.removeAll();
								B.actionTabid = null;
								break;
							case "reload":
								B.selectTabItem(B.actionTabid);
								B.reload(B.actionTabid);
								break
							}
						},
						_addTabItemContextMenuEven : function(B) {
							var C = this, D = this.options;
							B
									.bind(
											"contextmenu",
											function(E) {
												if (!C.tab.menu) {
													return
												}
												C.actionTabid = B.attr("tabid");
												C.tab.menu.show({
													top : E.pageY,
													left : E.pageX
												});
												if (A(
														".l-tab-links-item-close",
														this).length == 0) {
													C.tab.menu
															.setDisabled("close")
												} else {
													C.tab.menu
															.setEnabled("close")
												}
												return false
											})
						}
					})
})(jQuery);
(function(A) {
	A.ligerTip = function(B) {
		return A.ligerui.run.call(null, "ligerTip", arguments)
	};
	A.fn.ligerTip = function(B) {
		this.each(function() {
			var C = A.extend({}, A.ligerDefaults.ElementTip, B || {});
			C.target = C.target || this;
			if (C.auto || B == undefined) {
				if (!C.content) {
					C.content = this.title;
					if (C.removeTitle) {
						A(this).removeAttr("title")
					}
				}
				C.content = C.content || this.title;
				A(this).bind(
						"mouseover.tip",
						function() {
							C.x = A(this).offset().left + A(this).width()
									+ (C.distanceX || 0);
							C.y = A(this).offset().top + (C.distanceY || 0);
							A.ligerTip(C)
						}).bind("mouseout.tip", function() {
					var D = A.ligerui.managers[this.ligeruitipid];
					if (D) {
						D.remove()
					}
					A(".l-verify-tip").each(function() {
						A(this).remove()
					})
				})
			} else {
				if (C.target.ligeruitipid) {
					return
				}
				C.x = A(this).offset().left + A(this).width()
						+ (C.distanceX || 0);
				C.y = A(this).offset().top + (C.distanceY || 0);
				C.x = C.x || 0;
				C.y = C.y || 0;
				A.ligerTip(C)
			}
		});
		return A.ligerui.get(this, "ligeruitipid")
	};
	A.fn.ligerHideTip = function(B) {
		return this.each(
				function() {
					var F = B || {};
					if (F.isLabel == undefined) {
						F.isLabel = this.tagName.toLowerCase() == "label"
								&& A(this).attr("for") != null
					}
					var E = this;
					if (F.isLabel) {
						var C = A("#" + A(this).attr("for"));
						if (C.length == 0) {
							return
						}
						E = C[0]
					}
					var D = A.ligerui.managers[E.ligeruitipid];
					if (D) {
						D.remove()
					}
				}).unbind("mouseover.tip").unbind("mouseout.tip")
	};
	A.fn.ligerGetTipManager = function() {
		return A.ligerui.get(this)
	};
	A.ligerDefaults = A.ligerDefaults || {};
	A.ligerDefaults.HideTip = {};
	A.ligerDefaults.Tip = {
		content : null,
		callback : null,
		width : 150,
		height : null,
		x : 0,
		y : 0,
		appendIdTo : null,
		target : null,
		auto : null,
		removeTitle : true
	};
	A.ligerDefaults.ElementTip = {
		distanceX : 1,
		distanceY : -3,
		auto : null,
		removeTitle : true
	};
	A.ligerMethos.Tip = {};
	A.ligerui.controls.Tip = function(B) {
		A.ligerui.controls.Tip.base.constructor.call(this, null, B)
	};
	A.ligerui.controls.Tip
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "Tip"
						},
						__idPrev : function() {
							return "Tip"
						},
						_extendMethods : function() {
							return A.ligerMethos.Tip
						},
						_render : function() {
							var B = this, D = this.options;
							var C = A('<div class="l-verify-tip"><div class="l-verify-tip-corner"></div><div class="l-verify-tip-content"></div></div>');
							B.tip = C;
							B.tip.attr("id", B.id);
							if (D.content) {
								A("> .l-verify-tip-content:first", C).html(
										D.content);
								C.appendTo("body")
							} else {
								return
							}
							C.css({
								left : D.x,
								top : D.y
							}).show();
							D.width
									&& A("> .l-verify-tip-content:first", C)
											.width(D.width - 8);
							D.height
									&& A("> .l-verify-tip-content:first", C)
											.width(D.height);
							eee = D.appendIdTo;
							if (D.appendIdTo) {
								D.appendIdTo.attr("ligerTipId", B.id)
							}
							if (D.target) {
								A(D.target).attr("ligerTipId", B.id);
								D.target.ligeruitipid = B.id
							}
							D.callback && D.callback(C);
							B.set(D)
						},
						_setContent : function(B) {
							A("> .l-verify-tip-content:first", this.tip)
									.html(B)
						},
						remove : function() {
							if (this.options.appendIdTo) {
								this.options.appendIdTo
										.removeAttr("ligerTipId")
							}
							if (this.options.target) {
								A(this.options.target).removeAttr("ligerTipId");
								this.options.target.ligeruitipid = null
							}
							this.tip.remove()
						}
					})
})(jQuery);
(function(A) {
	A.ligerMenu = function(B) {
		return A.ligerui.run.call(null, "ligerMenu", arguments)
	};
	A.ligerDefaults.Menu = {
		width : 120,
		top : 0,
		left : 0,
		items : null,
		shadow : true
	};
	A.ligerMethos.Menu = {};
	A.ligerui.controls.Menu = function(B) {
		A.ligerui.controls.Menu.base.constructor.call(this, null, B)
	};
	A.ligerui.controls.Menu
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "Menu"
						},
						__idPrev : function() {
							return "Menu"
						},
						_extendMethods : function() {
							return A.ligerMethos.Menu
						},
						_render : function() {
							var B = this, C = this.options;
							B.menuItemCount = 0;
							B.menus = {};
							B.menu = B.createMenu();
							B.element = B.menu[0];
							B.menu.css({
								top : C.top,
								left : C.left,
								width : C.width
							});
							C.items && A(C.items).each(function(D, E) {
								B.addItem(E)
							});
							A(document).bind("click.menu", function() {
								for ( var D in B.menus) {
									var E = B.menus[D];
									if (!E) {
										return
									}
									E.hide();
									if (E.shadow) {
										E.shadow.hide()
									}
								}
							});
							B.set(C)
						},
						show : function(B, E) {
							var C = this, D = this.options;
							if (E == undefined) {
								E = C.menu
							}
							if (B && B.left != undefined) {
								E.css({
									left : B.left
								})
							}
							if (B && B.top != undefined) {
								E.css({
									top : B.top
								})
							}
							E.show();
							C.updateShadow(E)
						},
						updateShadow : function(D) {
							var B = this, C = this.options;
							if (!C.shadow) {
								return
							}
							D.shadow.css({
								left : D.css("left"),
								top : D.css("top"),
								width : D.outerWidth(),
								height : D.outerHeight()
							});
							if (D.is(":visible")) {
								D.shadow.show()
							} else {
								D.shadow.hide()
							}
						},
						hide : function(D) {
							var B = this, C = this.options;
							if (D == undefined) {
								D = B.menu
							}
							B.hideAllSubMenu(D);
							D.hide();
							B.updateShadow(D)
						},
						toggle : function() {
							var B = this, C = this.options;
							B.menu.toggle();
							B.updateShadow(B.menu)
						},
						removeItem : function(C) {
							var B = this, D = this.options;
							A("> .l-menu-item[menuitemid=" + C + "]",
									B.menu.items).remove()
						},
						setEnabled : function(C) {
							var B = this, D = this.options;
							A("> .l-menu-item[menuitemid=" + C + "]",
									B.menu.items).removeClass(
									"l-menu-item-disable")
						},
						setDisabled : function(C) {
							var B = this, D = this.options;
							A("> .l-menu-item[menuitemid=" + C + "]",
									B.menu.items).addClass(
									"l-menu-item-disable")
						},
						isEnable : function(C) {
							var B = this, D = this.options;
							return !A("> .l-menu-item[menuitemid=" + C + "]",
									B.menu.items).hasClass(
									"l-menu-item-disable")
						},
						getItemCount : function() {
							var B = this, C = this.options;
							return A("> .l-menu-item", B.menu.items).length
						},
						addItem : function(E, G) {
							var D = this, F = this.options;
							if (!E) {
								return
							}
							if (G == undefined) {
								G = D.menu
							}
							if (E.line) {
								G.items
										.append('<div class="l-menu-item-line"></div>');
								return
							}
							var B = A('<div class="l-menu-item"><div class="l-menu-item-text"></div> </div>');
							var C = A("> .l-menu-item", G.items).length;
							G.items.append(B);
							B.attr("ligeruimenutemid", ++D.menuItemCount);
							E.id && B.attr("menuitemid", E.id);
							E.text
									&& A(">.l-menu-item-text:first", B).html(
											E.text);
							E.icon
									&& B
											.prepend('<div class="l-menu-item-icon l-icon-'
													+ E.icon + '"></div>');
							if (E.disable || E.disabled) {
								B.addClass("l-menu-item-disable")
							}
							if (E.children) {
								B
										.append('<div class="l-menu-item-arrow"></div>');
								var I = D
										.createMenu(B.attr("ligeruimenutemid"));
								D.menus[B.attr("ligeruimenutemid")] = I;
								I.width(F.width);
								I.hover(null, function() {
									if (!I.showedSubMenu) {
										D.hide(I)
									}
								});
								A(E.children).each(function() {
									D.addItem(this, I)
								})
							}
							E.click && B.click(function() {
								if (A(this).hasClass("l-menu-item-disable")) {
									return
								}
								E.click(E, C)
							});
							E.dblclick && B.dblclick(function() {
								if (A(this).hasClass("l-menu-item-disable")) {
									return
								}
								E.dblclick(E, C)
							});
							var H = A("> .l-menu-over:first", G);
							B.hover(function() {
								if (A(this).hasClass("l-menu-item-disable")) {
									return
								}
								var K = A(this).offset().top;
								var L = K - G.offset().top;
								H.css({
									top : L
								});
								D.hideAllSubMenu(G);
								if (E.children) {
									var J = A(this).attr("ligeruimenutemid");
									if (!J) {
										return
									}
									if (D.menus[J]) {
										D.show({
											top : K,
											left : A(this).offset().left
													+ A(this).width() - 5
										}, D.menus[J]);
										G.showedSubMenu = true
									}
								}
							}, function() {
								if (A(this).hasClass("l-menu-item-disable")) {
									return
								}
								var J = A(this).attr("ligeruimenutemid");
								if (E.children) {
									var J = A(this).attr("ligeruimenutemid");
									if (!J) {
										return
									}
								}
							})
						},
						hideAllSubMenu : function(D) {
							var B = this, C = this.options;
							if (D == undefined) {
								D = B.menu
							}
							A("> .l-menu-item", D.items)
									.each(
											function() {
												if (A("> .l-menu-item-arrow",
														this).length > 0) {
													var E = A(this).attr(
															"ligeruimenutemid");
													if (!E) {
														return
													}
													B.menus[E]
															&& B
																	.hide(B.menus[E])
												}
											});
							D.showedSubMenu = false
						},
						createMenu : function(C) {
							var B = this, D = this.options;
							var E = A('<div class="l-menu" style="display:none"><div class="l-menu-yline"></div><div class="l-menu-over"><div class="l-menu-over-l"></div> <div class="l-menu-over-r"></div></div><div class="l-menu-inner"></div></div>');
							A(E).css("z-index", "20000");
							C && E.attr("ligeruiparentmenuitemid", C);
							E.items = A("> .l-menu-inner:first", E);
							E.appendTo("body");
							if (D.shadow) {
								E.shadow = A(
										'<div class="l-menu-shadow"></div>')
										.insertAfter(E);
								B.updateShadow(E)
							}
							E.hover(null, function() {
								if (!E.showedSubMenu) {
									A("> .l-menu-over:first", E).css({
										top : -24
									})
								}
							});
							if (C) {
								B.menus[C] = E
							} else {
								B.menus[0] = E
							}
							return E
						}
					});
	A.ligerui.controls.Menu.prototype.setEnable = A.ligerui.controls.Menu.prototype.setEnabled;
	A.ligerui.controls.Menu.prototype.setDisable = A.ligerui.controls.Menu.prototype.setDisabled
})(jQuery);
(function(A) {
	A.fn.ligerMenuBar = function(B) {
		return A.ligerui.run.call(this, "ligerMenuBar", arguments)
	};
	A.fn.ligerGetMenuBarManager = function() {
		return A.ligerui.run.call(this, "ligerGetMenuBarManager", arguments)
	};
	A.ligerDefaults.MenuBar = {};
	A.ligerMethos.MenuBar = {};
	A.ligerui.controls.MenuBar = function(C, B) {
		A.ligerui.controls.MenuBar.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.MenuBar
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "MenuBar"
						},
						__idPrev : function() {
							return "MenuBar"
						},
						_extendMethods : function() {
							return A.ligerMethos.MenuBar
						},
						_render : function() {
							var B = this, C = this.options;
							B.menubar = A(this.element);
							if (!B.menubar.hasClass("l-menubar")) {
								B.menubar.addClass("l-menubar")
							}
							if (C && C.items) {
								A(C.items).each(function(D, E) {
									B.addItem(E)
								})
							}
							A(document).click(
									function() {
										A(".l-panel-btn-selected", B.menubar)
												.removeClass(
														"l-panel-btn-selected")
									});
							B.set(C)
						},
						addItem : function(D) {
							var C = this, E = this.options;
							var B = A('<div class="l-menubar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div><div class="l-menubar-item-down"></div></div>');
							C.menubar.append(B);
							D.id && B.attr("menubarid", D.id);
							D.text && A("span:first", B).html(D.text);
							D.disable && B.addClass("l-menubar-item-disable");
							D.click && B.click(function() {
								D.click(D)
							});
							if (D.menu) {
								var F = A.ligerMenu(D.menu);
								B
										.hover(
												function() {
													C.actionMenu
															&& C.actionMenu
																	.hide();
													var H = A(this).offset().left;
													var G = A(this).offset().top
															+ A(this).height();
													F.show({
														top : G,
														left : H
													});
													C.actionMenu = F;
													A(this)
															.addClass(
																	"l-panel-btn-over l-panel-btn-selected")
															.siblings(
																	".l-menubar-item")
															.removeClass(
																	"l-panel-btn-selected")
												}, function() {
													A(this).removeClass(
															"l-panel-btn-over")
												})
							} else {
								B.hover(function() {
									A(this).addClass("l-panel-btn-over")
								}, function() {
									A(this).removeClass("l-panel-btn-over")
								});
								A(".l-menubar-item-down", B).remove()
							}
						}
					})
})(jQuery);
(function(A) {
	A.fn.ligerRadio = function() {
		return A.ligerui.run.call(this, "ligerRadio", arguments)
	};
	A.fn.ligerGetRadioManager = function() {
		return A.ligerui.run.call(this, "ligerGetRadioManager", arguments)
	};
	A.ligerDefaults.Radio = {
		disabled : false,
		onAfterChange : function() {
			// 值改变后操作
		}
	};
	A.ligerMethos.Radio = {};
	A.ligerui.controls.Radio = function(C, B) {
		A.ligerui.controls.Radio.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Radio.ligerExtend(A.ligerui.controls.Input, {
		__getType : function() {
			return "Radio"
		},
		__idPrev : function() {
			return "Radio"
		},
		_extendMethods : function() {
			return A.ligerMethos.Radio
		},
		_render : function() {
			var B = this, C = this.options;
			B.input = A(this.element);
			B.link = A('<a href="javascript:void(0)" class="l-radio"></a>');
			B.wrapper = B.input.addClass("l-hidden").wrap(
					'<div class="l-radio-wrapper"></div>').parent();
			B.wrapper.prepend(B.link);
			B.input.change(function() {
				var H = this.checked;
				var J = this.value;
				if (this.checked) {
					B.link.addClass("l-radio-checked")
				} else {
					B.link.removeClass("l-radio-checked")
				}
				
				return true
			});
			
			B.link.click(function() {
				B._doclick()
			});
			B.wrapper.hover(function() {
				if (!C.disabled) {
					A(this).addClass("l-over")
				}
			}, function() {
				A(this).removeClass("l-over")
			});
			this.element.checked && B.link.addClass("l-radio-checked");
			if (this.element.id) {
				A("label[for=" + this.element.id + "]").click(function() {
					B._doclick()
				})
			}
			B.set(C)
		},
		setValue : function(C) {
			var B = this, D = this.options;
			if (!C) {
				B.input[0].checked = false;
				B.link.removeClass("l-radio-checked")
			} else {
				B.input[0].checked = true;
				B.link.addClass("l-radio-checked")
			}
		},
		getValue : function() {
			return this.input[0].checked
		},
		setEnabled : function() {
			this.input.attr("disabled", false);
			this.wrapper.removeClass("l-disabled");
			this.options.disabled = false
		},
		setDisabled : function() {
			this.input.attr("disabled", true);
			this.wrapper.addClass("l-disabled");
			this.options.disabled = true
		},
		updateStyle : function() {
			if (this.input.attr("disabled")) {
				this.wrapper.addClass("l-disabled");
				this.options.disabled = true
			}
			if (this.input[0].checked) {
				this.link.addClass("l-checkbox-checked")
			} else {
				this.link.removeClass("l-checkbox-checked")
			}
		},
		_doclick : function() {
			var C = this, D = this.options;
			if (C.input.attr("disabled")) {
				return false
			}
			
			// edit by hllian, Nov 4, 2014 4:09:48 PM, 添加afterChange事件
			C.input.trigger("click").trigger("change");
			var H = C.input[0].checked;
			var J = C.input[0].value;
			
			C.trigger("afterChange", [H, J]);
			
			var B;
			if (C.input[0].form) {
				B = C.input[0].form
			} else {
				B = document
			}
			A("input:radio[name=" + C.input[0].name + "]", B).not(C.input)
					.trigger("change");
			return false
		}
	})
})(jQuery);


(function (A)
{

    A.fn.ligerRadioList = function (options)
    {
        return A.ligerui.run.call(this, "ligerRadioList", arguments);
    }; 

    A.ligerDefaults.RadioList = {  
        rowSize: 3,            // 每行显示元素数
        valueField: 'id',       // 值成员
        textField: 'text',      // 显示成员
        valueFieldID:null,      // 隐藏域
        name : null,            // 表单名
        data: null,             // 数据
        parms: null,            // ajax提交表单
        url: null,              // 数据源URL(需返回JSON)
        onSuccess: null,
        onError: null,  
        css: null,               // 附加css
        value: null,            // 值
        valueFieldCssClass : null,
        labelWidth : 64,			// label宽度
        onAfterChange : function() {
			// 值改变后操作
		}
    };

    // 扩展方法
    A.ligerMethos.RadioList = A.ligerMethos.RadioList || {};


    A.ligerui.controls.RadioList = function (element, options)
    {
        A.ligerui.controls.RadioList.base.constructor.call(this, element, options);
    };
    A.ligerui.controls.RadioList.ligerExtend(A.ligerui.controls.Input, {
        __getType: function ()
        {
            return 'RadioList';
        },
        _extendMethods: function ()
        {
            return A.ligerMethos.RadioList;
        },
        _init: function ()
        {
            A.ligerui.controls.RadioList.base._init.call(this);
        },
        _render: function ()
        {
            var g = this, p = this.options; 
            g.data = p.data;    
            g.valueField = null; // 隐藏域(保存值)
               
            if (p.valueFieldID)
            {
                g.valueField = A("#" + p.valueFieldID + ":input,[name=" + p.valueFieldID + "]:input");
                if (g.valueField.length == 0) g.valueField = A('<input type="hidden"/>');
                g.valueField[0].id = g.valueField[0].name = p.valueFieldID;
            }
            else
            {
                g.valueField = A('<input type="hidden"/>');
                g.valueField[0].id = g.valueField[0].name = g.id + "_val";
            }
            if (g.valueField[0].name == null) g.valueField[0].name = g.valueField[0].id;
            if (p.valueFieldCssClass)
            {
                g.valueField.addClass(p.valueFieldCssClass);
            }
            g.valueField.attr("data-ligerid", g.id);
            g.radioList = A(this.element);
            g.radioList.html('<div class="l-radiolist-inner"><table cellpadding="0" cellspacing="0" border="0" class="l-radiolist-table"></table></div>').addClass("l-radiolist").append(g.valueField);
            g.radioList.table = A("table:first", g.radioList); 
              

            p.value = g.valueField.val() || p.value;

            g.set(p); 

            g._addClickEven();
        },
        destroy: function ()
        { 
            if (this.radioList) this.radioList.remove();
            this.options = null;
            A.ligerui.remove(this);
        },
        clear : function()
        {
            this._changeValue("");
            this.trigger('clear');
        }, 
        _setCss : function(css)
        {
            if (css) {
                this.radioList.addClass(css);
            } 
        }, 
        _setDisabled: function (value)
        {
            // 禁用样式
            if (value)
            {
                this.radioList.addClass('l-radiolist-disabled');
                A("input:radio", this.radioList).attr("disabled", true);
            } else
            {
                this.radioList.removeClass('l-radiolist-disabled');
                A("input:radio", this.radioList).removeAttr("disabled");
            }
        }, 
        _setWidth: function (value)
        {
            this.radioList.width(value);
        },
        _setHeight: function (value)
        {
            this.radioList.height(value);
        },  
        indexOf : function(item)
        {
            var g = this, p = this.options;
            if (!g.data) return -1;
            for (var i = 0, l = g.data.length; i < l; i++)
            {
                if (typeof (item) == "object")
                {
                    if (g.data[i] == item) return i;
                } else
                {
                    if (g.data[i][p.valueField].toString() == item.toString()) return i;
                }
            }
            return -1;
        },
        removeItems : function(items)
        {
            var g = this;
            if (!g.data) return;
            A(items).each(function (i,item)
            {
                var index = g.indexOf(item);
                if (index == -1) return;
                g.data.splice(index, 1);
            });
            g.refresh();
        },
        removeItem: function (item)
        {
            if (!this.data) return;
            var index = this.indexOf(item);
            if (index == -1) return;
            this.data.splice(index, 1);
            this.refresh();
        },
        insertItem: function (item,index)
        {
            var g = this;
            if (!g.data) g.data = []; 
            g.data.splice(index, 0, item);
            g.refresh();
        },
        addItems: function (items)
        {
            var g = this;
            if (!g.data) g.data = [];
            A(items).each(function (i, item)
            {
                g.data.push(item);
            });
            g.refresh();
        },
        addItem: function (item)
        {
            var g = this;
            if (!g.data) g.data = [];
            g.data.push(item);
            g.refresh();
        },  
        _setValue: function (value)
        { 
            var g = this, p = this.options;
            p.value = value;
            this._dataInit(); 
        },
        setValue: function (value)
        {
            this._setValue(value);
        }, 
        _setUrl: function (url) {
            if (!url) return;
            var g = this, p = this.options; 
            A.ajax({
                type: 'post',
                url: url,
                data: p.parms,
                cache: false,
                dataType: 'json',
                success: function (data) { 
                    g.setData(data);
                    g.trigger('success', [data]);
                },
                error: function (XMLHttpRequest, textStatus) {
                    g.trigger('error', [XMLHttpRequest, textStatus]);
                }
            });
        },
        setUrl: function (url) {
            return this._setUrl(url);
        },
        setParm: function (name, value) {
            if (!name) return;
            var g = this;
            var parms = g.get('parms');
            if (!parms) parms = {};
            parms[name] = value;
            g.set('parms', parms); 
        },
        clearContent: function ()
        {
            var g = this, p = this.options;
            A("table", g.radioList).html(""); 
        }, 
        _setData : function(data)
        {
            this.setData(data);
        },
        setData: function (data)
        {
            var g = this, p = this.options; 
            if (!data || !data.length) return;
            g.data = data;
            g.refresh();
            g.updateStyle();
        },
        refresh:function()
        {
            var g = this, p = this.options, data = this.data;
            labelWidth = p.labelWidth || 64; 
            this.clearContent();
            if (!data) return; 
            var out = [], rowSize = p.rowSize, appendRowStart = false, name = p.name || g.id;
            for (var i = 0; i < data.length; i++)
            {
                var val = data[i][p.valueField], txt = data[i][p.textField], id = g.id + "-" + i;
                var newRow = i % rowSize == 0;
                // 0,5,10
                if (newRow)
                {
                    if (appendRowStart) out.push('</tr>'); 
                    out.push("<tr>");
                    appendRowStart = true;
                }
                out.push("<td><input type='radio' name='" + name + "' value='" + val + "' id='" + id + "'/><label style='display:inline-block;padding-left:2px;width:" + labelWidth + "px;' for='" + id + "'>" + txt + "</label></td>");
            }
            if (appendRowStart) out.push('</tr>');
            g.radioList.table.append(out.join(''));
        },
        _getValue: function ()
        { 
            var g = this, p = this.options, name = p.name || g.id;
            return A('input:radio[name="' + name + '"]:checked').val();
        },
        getValue: function ()
        {
            // 获取值
            return this._getValue();
        },  
        updateStyle: function ()
        { 
            this._dataInit();
        },
        _dataInit: function ()
        {
            var g = this, p = this.options;
            var value = g.valueField.val() || g._getValue() || p.value;
            g._changeValue(value);
        },
        // 设置值到 隐藏域
        _changeValue: function (newValue)
        {
            var g = this, p = this.options, name = p.name || g.id;
            A("input:radio[name='" + name + "']", g.radioList).each(function ()
            {
                this.checked = this.value == newValue;
            });
            g.valueField.val(newValue);
            g.selectedValue = newValue;
        },
        _addClickEven: function ()
        {
            var g = this, p = this.options;
            // 选项点击
            g.radioList.click(function (e)
            {  
                var value = g.getValue();
                if (value) g.valueField.val(value);
                
                // 添加选择后事件
    			g.trigger("afterChange", [g, value]);
            });
        } 
    });
})(jQuery);

(function(A) {
	A.fn.ligerAccordion = function(B) {
		return A.ligerui.run.call(this, "ligerAccordion", arguments)
	};
	A.fn.ligerGetAccordionManager = function() {
		return A.ligerui.get(this)
	};
	A.ligerDefaults.Accordion = {
		height : null,
		speed : "normal",
		changeHeightOnResize : false,
		heightDiff : 0
	};
	A.ligerMethos.Accordion = {};
	A.ligerui.controls.Accordion = function(C, B) {
		A.ligerui.controls.Accordion.base.constructor.call(this, C, B)
	};
	A.ligerui.controls.Accordion
			.ligerExtend(
					A.ligerui.core.UIComponent,
					{
						__getType : function() {
							return "Accordion"
						},
						__idPrev : function() {
							return "Accordion"
						},
						_extendMethods : function() {
							return A.ligerMethos.Accordion
						},
						_render : function() {
							var C = this, D = this.options;
							C.accordion = A(C.element);
							if (!C.accordion.hasClass("l-accordion-panel")) {
								C.accordion.addClass("l-accordion-panel")
							}
							var B = 0;
							if (A("> div[lselected=true]", C.accordion).length > 0) {
								B = A("> div", C.accordion)
										.index(
												A("> div[lselected=true]",
														C.accordion))
							}
							A("> div", C.accordion)
									.each(
											function(E, F) {
												var G = A('<div class="l-accordion-header"><div class="l-accordion-toggle"></div><div class="l-accordion-header-inner"></div></div>');
												if (E == B) {
													A(".l-accordion-toggle", G)
															.addClass(
																	"l-accordion-toggle-open")
												}
												if (A(F).attr("title")) {
													A(
															".l-accordion-header-inner",
															G).html(
															A(F).attr("title"));
													A(F).attr("title", "")
												}
												A(F).before(G);
												if (!A(F).hasClass(
														"l-accordion-content")) {
													A(F)
															.addClass(
																	"l-accordion-content")
												}
											});
							A(".l-accordion-toggle", C.accordion)
									.each(
											function() {
												if (!A(this)
														.hasClass(
																"l-accordion-toggle-open")
														&& !A(this)
																.hasClass(
																		"l-accordion-toggle-close")) {
													A(this)
															.addClass(
																	"l-accordion-toggle-close")
												}
												if (A(this)
														.hasClass(
																"l-accordion-toggle-close")) {
													A(this)
															.parent()
															.next(
																	".l-accordion-content:visible")
															.hide()
												}
											});
							A(".l-accordion-header", C.accordion).hover(
									function() {
										A(this).addClass(
												"l-accordion-header-over")
									},
									function() {
										A(this).removeClass(
												"l-accordion-header-over")
									});
							A(".l-accordion-toggle", C.accordion)
									.hover(
											function() {
												if (A(this)
														.hasClass(
																"l-accordion-toggle-open")) {
													A(this)
															.addClass(
																	"l-accordion-toggle-open-over")
												} else {
													if (A(this)
															.hasClass(
																	"l-accordion-toggle-close")) {
														A(this)
																.addClass(
																		"l-accordion-toggle-close-over")
													}
												}
											},
											function() {
												if (A(this)
														.hasClass(
																"l-accordion-toggle-open")) {
													A(this)
															.removeClass(
																	"l-accordion-toggle-open-over")
												} else {
													if (A(this)
															.hasClass(
																	"l-accordion-toggle-close")) {
														A(this)
																.removeClass(
																		"l-accordion-toggle-close-over")
													}
												}
											});
							A(">.l-accordion-header", C.accordion)
									.click(
											function() {
												var E = A(
														".l-accordion-toggle:first",
														this);
												if (E
														.hasClass("l-accordion-toggle-close")) {
													E
															.removeClass(
																	"l-accordion-toggle-close")
															.removeClass(
																	"l-accordion-toggle-close-over l-accordion-toggle-open-over");
													E
															.addClass("l-accordion-toggle-open");
													A(this)
															.next(
																	".l-accordion-content")
															.show(D.speed)
															.siblings(
																	".l-accordion-content:visible")
															.hide(D.speed);
													A(this)
															.siblings(
																	".l-accordion-header")
															.find(
																	".l-accordion-toggle")
															.removeClass(
																	"l-accordion-toggle-open")
															.addClass(
																	"l-accordion-toggle-close")
												} else {
													E
															.removeClass(
																	"l-accordion-toggle-open")
															.removeClass(
																	"l-accordion-toggle-close-over l-accordion-toggle-open-over")
															.addClass(
																	"l-accordion-toggle-close");
													A(this)
															.next(
																	".l-accordion-content")
															.hide(D.speed)
												}
											});
							C.headerHoldHeight = 0;
							A("> .l-accordion-header", C.accordion).each(
									function() {
										C.headerHoldHeight += A(this).height()
									});
							if (D.height && typeof (D.height) == "string"
									&& D.height.indexOf("%") > 0) {
								C.onResize();
								if (D.changeHeightOnResize) {
									A(window).resize(function() {
										C.onResize()
									})
								}
							} else {
								if (D.height) {
									C.height = D.heightDiff + D.height;
									C.accordion.height(C.height);
									C.setHeight(D.height)
								} else {
									C.header = C.accordion.height()
								}
							}
							C.set(D)
						},
						onResize : function() {
							var B = this, C = this.options;
							if (!C.height || typeof (C.height) != "string"
									|| C.height.indexOf("%") == -1) {
								return false
							}
							if (B.accordion.parent()[0].tagName.toLowerCase() == "body") {
								var D = A(window).height();
								D -= parseInt(B.layout.parent().css(
										"paddingTop"));
								D -= parseInt(B.layout.parent().css(
										"paddingBottom"));
								B.height = C.heightDiff + D
										* parseFloat(B.height) * 0.01
							} else {
								B.height = C.heightDiff
										+ (B.accordion.parent().height()
												* parseFloat(C.height) * 0.01)
							}
							B.accordion.height(B.height);
							B.setContentHeight(B.height - B.headerHoldHeight)
						},
						setHeight : function(B) {
							var C = this, D = this.options;
							C.accordion.height(B);
							B -= C.headerHoldHeight;
							A("> .l-accordion-content", C.accordion).height(B)
						}
					})
})(jQuery);