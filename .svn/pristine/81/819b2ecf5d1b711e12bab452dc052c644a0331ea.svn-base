var createElement = (function() {
    // Detect IE using conditional compilation
    if (/*@cc_on @*//*@if (@_win32)!/*@end @*/false) {
        // Translations for attribute names which IE would otherwise choke on
        var attrTranslations = {
            "class": "className",
            "for": "htmlFor"
        };

        var setAttribute = function(element, attr, value) {

            if (attrTranslations.hasOwnProperty(attr)) {

                element[attrTranslations[attr]] = value;

            } else if (attr == "style") {

                element.style.cssText = value;

            } else {

                element.setAttribute(attr, value);
            }
        };

        return function(tagName, attributes) {

            attributes = attributes || {};

            if (attributes.hasOwnProperty("name") ||
                attributes.hasOwnProperty("checked") ||
                attributes.hasOwnProperty("multiple")) {

                var tagParts = ["<" + tagName];

                if (attributes.hasOwnProperty("name")) {
                    tagParts[tagParts.length] =
                    ' name="' + attributes.name + '"';
                    delete attributes.name;
                }

                if (attributes.hasOwnProperty("checked") &&
                    "" + attributes.checked == "true") {
                    tagParts[tagParts.length] = " checked";
                    delete attributes.checked;
                }

                if (attributes.hasOwnProperty("multiple") &&
                    "" + attributes.multiple == "true") {
                    tagParts[tagParts.length] = " multiple";
                    delete attributes.multiple;
                }

                tagParts[tagParts.length] = ">";

                var element =
                        document.createElement(tagParts.join(""));

            } else {

                var element = document.createElement(tagName);
            }

            for (var attr in attributes) {

                if (attributes.hasOwnProperty(attr)) {

                    setAttribute(element, attr, attributes[attr]);
                }
            }

            return element;
        };

    } else {

        return function(tagName, attributes) {

            attributes = attributes || {};
            var element = document.createElement(tagName);

            for (var attr in attributes) {
                if (attributes.hasOwnProperty(attr)) {

                    element.setAttribute(attr, attributes[attr]);
                }
            }

            return element;
        };
    }

})();

function tag_out() {

    this.data = new classMap();

    this.init = function(records) {
        this.data = records;
    }

    this.add = function(records) {
        for (var i = 0; i < records.map.length; i++) {
            this.data.setAt(records.map[i].key, records.map[i].value);
        }
    }

    this.load = function() {
        var elements;
        if (document.all) {
            elements = document.getElementsByTagName('out');
        }
        else elements = document.getElementsByTagName('t:out');
        for (var i = 0; i < elements.length; i++) {
            try {
                var e = elements[i];
                e.innerHTML = getValue(e.getAttribute("value"), e.getAttribute("type"), e.getAttribute("options"), this.data);
            } catch(ex) {
                var errorMsg = getParameterName(e.getAttribute("value")) + '在bh:out标签中显示出现错误' + '\n';
                if (!this.havaThisKey(getParameterName(e.getAttribute("value"))))errorMsg = errorMsg + '没有传入值';
                alert(errorMsg);
                continue;
            }
        }
    }

    this.havaThisKey = function(key) {
        for (var i = 0; i < this.data.map.length; i++) {
            if (getParameterName(key) == this.data.map[i].key) {
                return true;
            }
        }
        return false;
    }

    function getValue(desc, type, options, record) {
        if (type != null) {
            return eval(type + '(record.lookUp(getParameterName(\'' + desc + '\')),\'' + (options ? options : getParameterName(desc)) + '\')');
        } else {
            var value = record.lookUp(getParameterName(desc));
            if (value == null || value == '')return '--';
            else return value;
        }
    }

    //去掉${ }
    function getParameterName(desc) {
        var star = desc.indexOf("${");
        var end = desc.indexOf("}", star);
        return desc.substring(star + 2, end);
    }

    //将数值四舍五入(保留2位小数)后格式化成金额形式
    function currency(num, type) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        if (num == 0)return '--';
        sign = (num == (num = Math.abs(num)));

        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;

        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;

        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                  num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    }

    //select通过key获得value
    function select(value, type) {
        if (value != '' && value != null && value != '--') {
            return eval('p_' + type + '.lookUp(\'' + value + '\')');
        }
        else {
            return '--';
        }
    }

    function defdividendmethod(value, type) {
        return select(value, '${defdividendmethod}');
    }

    //时间格式化
    function time(str, type) {
        var array = new Array();
        for (var i = 0; i < 6; i += 2) {
            array.push(str.substring(i, i + 2));
        }
        return array.join(":");
    }

    function changedefdividendmethod(str, type) {
        var temp = (str == 0 ? 1 : 0);
        return select(temp + '', type);
    }

    function nav(num, type) {
        return new Number(num).toFixed(4);
    }

    function confusion(acctId, type) {
        var s1 = acctId.substring(0, (acctId.length - 5));
        var s2 = acctId.substring((acctId.length - 3), acctId.length);
        return s1 + '***' + s2;
    }

    function trade_way(str, type) {

        var result = '';
        for (var i = 0; i < str.length; i++) {
            if (i != 0)result = result + ','
            var temp = str.substring(i, i + 1);
            result = result + p_trade_way.lookUp(temp);
        }

        return result;
    }
}

function datetime(id) {
    var dd = document.getElementById(id + '-dd').value;
    var hh = document.getElementById(id + '-hh').value;
    var mm = document.getElementById(id + '-mm').value;
    var ss = document.getElementById(id + '-ss').value;
    if (dd == '' || dd == null) {
        var date = new Date()
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (m < 10) {
            m = "0" + m;
        }
        if (d < 10) {
            d = "0" + d;
        }
        dd = (y + '' + m + '' + d);
        document.getElementById(id + '-dd').value = dd;
    }
    document.getElementById(id).value = dd + ' ' + hh + ':' + mm + ':' + ss
}

function tag_field() {

    var elements = null;

    this.init = function() {

        elements = document.getElementsByTagName('t:field');

        if (document.all) {
            elements = document.getElementsByTagName('field');
        }

        for (var i = 0; i < elements.length; i++) {
            try {
                createNode(elements[i]);
            } catch(ex) {
                continue;
            }
        }
    }

    this.load = function(data) {

        for (var i = 0; i < elements.length; i++) {

            try {

                if (elements[i].type == "radio") {
                    document.getElementById(elements[i]["fieldId"]).checked = (data.lookUp(elements[i].name) == elements[i].value);
                    continue;
                }

                if (elements[i].type == "checkbox") {
                    var check = (',' + data.lookUp(elements[i].name) + ',').indexOf(',' + elements[i].value + ',') != -1
                    document.getElementById(elements[i]["fieldId"]).checked = check;
                    continue;
                }

                if (elements[i].type == "checkboxGroup" || elements[i].type == "radioGroup") {
                    var name = elements[i].name || elements[i].fieldId;
                    var inputs = document.getElementsByTagName("input");
                    for (var j = 0; j < inputs.length; j ++) {
                        if (name == inputs[j].name) {
                            var check = (',' + data.lookUp(name) + ',').indexOf(',' + inputs[j].value + ',') != -1
                            inputs[j].checked = check;
                        }
                    }
                    continue;
                }

                var fieldId = elements[i]["fieldId"];
                var conlum = getParameterName(elements[i].value);

                if (elements[i].type == "datetime") {
                    var dt = data.lookUp(conlum);
                    document.getElementById(fieldId).value = dt;
                    if (dt == '--') dt = '-- 00:00:00'
                    var a = dt.split(' '), b = a[1].split(':');
                    document.getElementById(fieldId + '-dd').value = a[0].replace(/\-/ig, '');
                    document.getElementById(fieldId + '-hh').value = b[0];
                    document.getElementById(fieldId + '-mm').value = b[1];
                    document.getElementById(fieldId + '-ss').value = b[2];
                    continue;
                }

                if (elements[i].type == "editor") {
                    KE.html([fieldId], data.lookUp(conlum));
                    continue;
                }

                if (elements[i].type == "label") {
                    document.getElementById(fieldId).innerHTML = data.lookUp(conlum);
                }

                setValue(document.getElementById(fieldId), data.lookUp(conlum));

            } catch(ex) {
                continue;
            }
        }
    }

    var createNode = function (e) {
        eval(e.type + '(e)');
    }

    var getParameterName = function (desc) {
        var star = desc.indexOf("${");
        var end = desc.indexOf("}", star);
        return desc.substring(star + 2, end);
    }

    var loadJS = function (src) {

        var headObj = document.getElementsByTagName("head")[0];

        var srciptObj = document.createElement("script");

        srciptObj.language = "javascript";

        srciptObj.type = "text/javascript";

        srciptObj.src = src;

        headObj.appendChild(srciptObj);

        return srciptObj;
    }

    var apply = function(o, c, defaults) {
        if (defaults) {
            apply(o, defaults);
        }
        if (o && c && typeof c == 'object') {
            for (var p in c) {
                o[p] = c[p];
            }
        }
        return o;
    };

    var applyFunction = function (object, e, event) {
        if (e[event] == null || e[event] == '') {
            return;
        }
        if (event == "onchange") {
            object.onchange = new Function(e[event]);
            return;
        }
        object.setAttribute(event, e[event]);
    }

    var getNorAttribute = function (e) {
        return {
            id:e["fieldId"],
            accesskey: e["accesskey"] ,
            disabled: e["disabled"] == true,
            readOnly: typeof(e["readonly"]) != 'undefined',
            tabindex: e["tabindex"],
            "class": e["class_"],
            style: e["style_"]
        };
    }

    var applyEvent = function (object, e) {

        applyFunction(object, e, "onclick");
        applyFunction(object, e, "ondblclick");
        applyFunction(object, e, "onmousedown");
        applyFunction(object, e, "onmouseup");
        applyFunction(object, e, "onmouseover");
        applyFunction(object, e, "onmousemove");
        applyFunction(object, e, "onmouseout");
        applyFunction(object, e, "onkeypress");
        applyFunction(object, e, "onkeydown");
        applyFunction(object, e, "onkeyup");

        applyFunction(object, e, "onblur");
        applyFunction(object, e, "onchange");
        applyFunction(object, e, "onfocus");
    }

    var radio = function (e) {

        var div = createElement("div", {style:"float:left"});

        var attributes = getNorAttribute(e);

        apply(attributes, {type: "radio", name:e["name"], value:e["value"],  checked: typeof(e["checked"]) != 'undefined'})

        var rb = createElement("input", attributes);

        applyEvent(rb, e);

        var lable = createElement("lable", {"for":e["fieldId"], style:"font-family:'宋体'; font-size:12px; line-height:12px; margin-right:10px;"});
        var labeltext = document.createTextNode(e["lable"]);

        lable.appendChild(labeltext);

        div.appendChild(rb);

        div.appendChild(lable);

        e.parentNode.appendChild(div);
    }

    var checkbox = function (e) {

        var div = createElement("div", {style:"float:left", id:e["fieldId"]});

        var attributes = getNorAttribute(e);

        apply(attributes, {type: "checkbox", name:e["name"], value:e["value"],  checked: typeof(e["checked"]) != 'undefined'})

        var rb = createElement("input", attributes);

        applyEvent(rb, e);

        var lable = createElement("lable", {"for":e["fieldId"], style:"font-family:'宋体'; font-size:12px; line-height:12px; margin-right:10px;"});
        var labeltext = document.createTextNode(e["lable"]);

        lable.appendChild(labeltext);

        div.appendChild(rb);

        div.appendChild(lable);

        e.parentNode.appendChild(div);
    };

    var checkboxGroup = function(e) {

        var div = createElement("div", {style:"float:left", id:e["fieldId"]});

        var opts = eval('p_' + e.options);

        var attributes = {
            disabled: e["disabled"] == true,
            readOnly: typeof(e["readonly"]) != 'undefined'
        };

        if (opts != null) {

            var table = createElement("table");

            table.style.width = "auto";

            table.setAttribute("cellSpacing", "0");
            table.setAttribute("cellPadding", "0");

            var thead = document.createElement("thead");

            table.appendChild(thead);

            var cols = e["cols"] || "1";

            var tr = null, width = (100 / parseInt(cols) ) + "%";

            for (var i = 0; i < opts.map.length; i++) {

                apply(attributes, {
                    type: "checkbox",
                    name:e["name"] || e["fieldId"],
                    style:"float:left;",
                    value:opts.map[i].key,
                    checked: e["value_"] != null && ("," + e["value_"] + ",").indexOf("," + opts.map[i].key + ",") != -1
                });

                var rb = createElement("input", attributes);

                var style = "font-family:'宋体'; font-size:12px; line-height:20px; float:left; margin-right:4px;";

                if (e["lableWidth"] != null) {
                    style = style + "width:" + e["lableWidth"] + ";"
                }

                var lable = createElement("div", {style:style});

                var labeltext = document.createTextNode(opts.map[i].value);

                lable.appendChild(labeltext);

                if (i % cols == 0) {
                    tr = thead.insertRow(thead.childNodes.length);
                }

                var td = tr.insertCell(tr.childNodes.length);

                td.width = width;

                td.appendChild(rb);

                td.appendChild(lable);
            }

            div.appendChild(table);
        }

        e.parentNode.appendChild(div);
    };

    var radioGroup = function(e) {

        var div = createElement("div", {style:"float:left", id:e["fieldId"]});

        var opts = eval('p_' + e.options);

        var attributes = {
            disabled: e["disabled"] == true,
            readOnly: typeof(e["readonly"]) != 'undefined'
        };

        if (opts != null) {

            var table = createElement("table");

            table.style.width = "auto";

            table.setAttribute("cellSpacing", "0");
            table.setAttribute("cellPadding", "0");

            var thead = document.createElement("thead");

            table.appendChild(thead);

            var cols = e["cols"] || "1";

            var tr = null, width = (100 / parseInt(cols) ) + "%";

            for (var i = 0; i < opts.map.length; i++) {

                apply(attributes, {
                    type: "radio",
                    name:e["name"] || e["fieldId"],
                    style:"float:left;",
                    value:opts.map[i].key,
                    checked: e["value_"] != null && e["value_"] == opts.map[i].key
                });

                var rb = createElement("input", attributes);

                var style = "font-family:'宋体'; font-size:12px; line-height:20px; float:left; margin-right:6px;";

                if (e["lableWidth"] != null) {
                    style = style + "width:" + e["lableWidth"] + ";"
                }

                var lable = createElement("label", {style:style});

                var labeltext = document.createTextNode(opts.map[i].value);

                lable.appendChild(labeltext);

                if (i % cols == 0) {
                    tr = thead.insertRow(thead.childNodes.length);
                }

                var td = tr.insertCell(tr.childNodes.length);

                td.width = width;

                td.appendChild(rb);

                td.appendChild(lable);
            }

            div.appendChild(table);
        }

        e.parentNode.appendChild(div);
    };

    var text = function (e) {

        var attributes = getNorAttribute(e);

        apply(attributes, {type: "text"});

        var inputObj = createElement("input", attributes);

        applyEvent(inputObj, e);

        e.parentNode.appendChild(inputObj);
    };

    var label = function (e) {

        var attributes = getNorAttribute(e);

        apply(attributes);

        var divObj = createElement("div", attributes);

        applyEvent(divObj, e);

        e.parentNode.appendChild(divObj);
    };

    var password = function (e) {

        var attributes = getNorAttribute(e);

        apply(attributes, {type: "password"});

        var inputObj = createElement("input", attributes);

        applyEvent(inputObj, e);

        e.parentNode.appendChild(inputObj);
    };

    var textarea = function(e) {

        var attributes = getNorAttribute(e);

        apply(attributes, {rows: e.rows, cols: e.cols,style:e["style_"] + ";overflow:auto; "});

        var textareaObj = createElement("textarea", attributes);

        applyEvent(textareaObj, e);

        e.parentNode.appendChild(textareaObj);
    };

    var select = function(e) {

        var attributes = getNorAttribute(e);

        apply(attributes, {});

        var selectObj = createElement("select", attributes);

        applyEvent(selectObj, e);

        e.parentNode.appendChild(selectObj);

        var emptyOpt = document.createElement("option");
        emptyOpt.appendChild(document.createTextNode("请选择"));
        emptyOpt.setAttribute("value", '')
        selectObj.appendChild(emptyOpt);

        try {
            eval('p_' + e.options + '.options(selectObj, \'' + e["value_"] + '\');');
        } catch(e) {
        }
    };

    var month = function(e) {

        var div = document.createElement("div");

        var innerHTML = ''
                + '<div class="inptDiv">'
                + '<input id="' + e["fieldId"] + '" style="' + e["style_"] + '" type="text" readonly="readonly" value=""/>'
                + '</div>'
                + '<div class="iconDiv">'
                + '<a href="javascript:showCalendar(\'' + e["fieldId"] + '\',\'yyyymm\',\'' + e["changeMonth"] + '\', true);">'
                + '<img src="' + top.CONFIG.serverpath + '/resources/image/icon_time.gif" border="0" onMouseOver="this.src=\'' + top.CONFIG.serverpath + '/resources/image/icon_time2.gif\'" onMouseOut="this.src=\'' + top.CONFIG.serverpath + '/resources/image/icon_time.gif\'"/></a>'
                + '</div>'
                ;

        div.innerHTML = innerHTML;

        e.parentNode.appendChild(div);

        var inputObj = document.getElementById(e["fieldId"]);
        applyEvent(inputObj, e);
    }

    var date = function(e) {

        var changeMonth = e["changeMonth"];

        var div = document.createElement("div");

        var innerHTML = ''
                + '<div class="inptDiv">'
                + '<input id="' + e["fieldId"] + '" style="' + e["style_"] + '" type="text" readonly="readonly" value=""/>'
                + '</div>'
                + '<div class="iconDiv">'
                + '<a href="javascript:showCalendar(\'' + e["fieldId"] + '\',\'yyyymmdd\',\'' + e["changeMonth"] + '\');">'
                + '<img src="' + top.CONFIG.serverpath + '/resources/image/icon_time.gif" border="0" onMouseOver="this.src=\'' + top.CONFIG.serverpath + '/resources/image/icon_time2.gif\'" onMouseOut="this.src=\'' + top.CONFIG.serverpath + '/resources/image/icon_time.gif\'"/></a>'
                + '</div>';

        div.innerHTML = innerHTML;

        e.parentNode.appendChild(div);

        var inputObj = document.getElementById(e["fieldId"]);
        applyEvent(inputObj, e);
    }

    var datetime = function(e) {

        var div = document.createElement("div");

        var innerHTML = ''
                + '<div class="inptDiv">'
                + '<input id="' + e["fieldId"] + '" type="hidden" value="""/>'
                + '<input id="' + e["fieldId"] + '-dd" style="' + e["style_"] + '" type="text" onchange="datetime(\'' + e["fieldId"] + '\') readonly="readonly" value=""/>'
                + '</div>'
                + '<div class="iconDiv">'
                + '<a href="javascript:showCalendar(\'' + e["fieldId"] + '-dd\',\'yyyymmdd\',\'' + e["changeMonth"] + '\');">'
                + '<img src="' + top.CONFIG.serverpath + '/resources/image/icon_time.gif" border="0" onMouseOver="this.src=\'' + top.CONFIG.serverpath + '/resources/image/icon_time2.gif\'" onMouseOut="this.src=\'' + top.CONFIG.serverpath + '/resources/image/icon_time.gif\'"/></a>'
                + '</div>&nbsp;'
                + '<select id="' + e["fieldId"] + '-hh" style="width:40px" onchange="datetime(\'' + e["fieldId"] + '\')"></select>&nbsp;时&nbsp;'
                + '<select id="' + e["fieldId"] + '-mm" style="width:40px" onchange="datetime(\'' + e["fieldId"] + '\')"></select>&nbsp;分&nbsp;'
                + '<select id="' + e["fieldId"] + '-ss" style="width:40px" onchange="datetime(\'' + e["fieldId"] + '\')"></select>&nbsp;秒&nbsp;'
                ;

        div.innerHTML = innerHTML;

        e.parentNode.appendChild(div);

        var hh = div.childNodes[3], mm = div.childNodes[5], ss = div.childNodes[7];

        for (var i = 0; i < 24; i ++) {
            var opt = document.createElement("option");
            var v = (i < 10) ? '0' + i : '' + i;
            opt.setAttribute('value', v);
            opt.appendChild(document.createTextNode(v));
            hh.appendChild(opt);
        }

        for (var i = 0; i < 60; i ++) {
            var opt = document.createElement("option");
            var v = (i < 10) ? '0' + i : '' + i;
            opt.setAttribute('value', v);
            opt.appendChild(document.createTextNode(v));
            mm.appendChild(opt);
        }

        for (var i = 0; i < 60; i ++) {
            var opt = document.createElement("option");
            var v = (i < 10) ? '0' + i : '' + i;
            opt.setAttribute('value', v);
            opt.appendChild(document.createTextNode(v));
            ss.appendChild(opt);
        }

        var inputObj = document.getElementById(e["fieldId"] + '-dd');
        e["onchange"] = "datetime('" + e["fieldId"] + "')";
        applyEvent(inputObj, e);
    }

    var query = function(e) {

        var div = document.createElement("div");

        var innerHTML = ''
                + '<div class="inptDiv">'
                + '<input name="' + e["fieldId"] + '" id="' + e["fieldId"] + '" style="' + e["style_"] + '" type="text" readonly="readonly" value="""/>'
                + '</div>'
                + '<div class="iconDiv">'
                + '<a href="javascript:' + e["onclick_"] + ';">'
                + '<img src="' + top.CONFIG.serverpath + '/resources/image/magnifier.gif" border="0" onMouseOver="this.src=\'' + top.CONFIG.serverpath + '/resources/image/magnifier.gif\'" onMouseOut="this.src=\'' + top.CONFIG.serverpath + '/resources/image/magnifier.gif\'"/></a>'
                + '</div>'
                ;
        div.innerHTML = innerHTML;

        e.parentNode.appendChild(div);
    }

    var hidden = function (e) {

        var attributes = getNorAttribute(e);

        apply(attributes, {type: "hidden", id:e["fieldId"]});

        var inputObj = createElement("input", attributes);

        e.parentNode.appendChild(inputObj);
    }

    var editor = function(e) {

        var attributes = getNorAttribute(e);

        apply(attributes, {rows: e.rows, cols: e.cols});

        var editorObj = createElement("textarea", attributes);

        applyEvent(editorObj, e);

        e.parentNode.appendChild(editorObj);

        KE.show({
            id : editorObj.id,
            allowUpload : true,
            urlType : 'absolute',
            afterCreate : function(id) {
                KE.event.ctrl(document, 13, function() {
                    if (typeof(editorSubmit) == 'function') {
                        editorSubmit();
                    }
                });
                KE.event.ctrl(KE.g[id].iframeDoc, 13, function() {
                    if (typeof(editorSubmit) == 'function') {
                        editorSubmit();
                    }
                });
            }
        });
    }

    var selectdw = function (e) {
        var url = top.CONFIG.serverpath + '/execSQL.do?serviceid=000990001005';
        var pars = {
            p_org_level:e['level'] ? e['level'] : 4
        };

        var myAjax = new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onSuccess: showResponse
        });

        function showResponse(response) {

            var result = XmlParser(response.responseXML, {record: "result"});

            var attributes = getNorAttribute(e);

            apply(attributes, {});

            var selectObj = createElement("select", attributes);

            applyEvent(selectObj, e);

            selectObj.options[selectObj.options.length] = new Option('请选择', '-1');

            for (var i = 0; i < result.length; i++) {

                var sys_org_id = result[i].lookUp('org_code')

                var sys_org_id_arr = sys_org_id.split(',');

                var spStr = "";

                for (var k = 0; k < sys_org_id_arr.length - 3; k++) {
                    spStr = spStr + "　";
                }

                spStr += "├";

                selectObj.options[selectObj.options.length] = new Option(spStr + result[i].lookUp('org_name'), result[i].lookUp('org_id'));
            }

            e.parentNode.appendChild(selectObj)
        }
    }

    //模板
    var selectmodel = function (e) {

        var url = top.CONFIG.serverpath + '/execSQL.do?serviceid=000300022003';
        var pars = {
            model_type:'1'
        };

        var myAjax = new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onSuccess: showResponse
        });

        function showResponse(response) {

            var result = XmlParser(response.responseXML, {record: "result"});

            var attributes = getNorAttribute(e);

            apply(attributes, {});

            var selectObj = createElement("select", attributes);

            applyEvent(selectObj, e);

            for (var i = 0; i < result.length; i++) {

                var sys_org_id = result[i].lookUp('template_id')

                var sys_org_id_arr = sys_org_id.split(',');

                var spStr = "";

                for (var k = 0; k < sys_org_id_arr.length - 3; k++) {
                    spStr = spStr + "";
                }

                selectObj.options[selectObj.options.length] = new Option(spStr + result[i].lookUp('template_name'),
                        result[i].lookUp('template_id'));
            }

            e.parentNode.appendChild(selectObj);
        }
    }


}

