var validatorTooltips = new (function() {

    this.loaded = false;

    this.init = function() {
        var h;
        if (!document.getElementById || !document.getElementsByTagName) return;
        addCss();
        h = document.createElement("span");
        h.id = "vbtc";
        h.setAttribute("id", "vbtc");
        h.style.position = "absolute";
        document.getElementsByTagName("body")[0].appendChild(h);
        this.loaded = true;
    }

    this.prepare = function(element, type, tooltipText) {
        var name = "tooltip" + type;
        if (! element[name]) {
            element[name] = new Object();
        }
        element[name].tooltip = tooltipText;
    }

    this.createTipEl = function(element, type) {
        var name = "tooltip" + type;
        var tooltipText = element[name].tooltip;
        var tooltip, t, c, b;
        tooltip = createEl("span", "tooltip");
        t = createEl("div", "top");
        t.appendChild(document.createTextNode(tooltipText));
        tooltip.appendChild(t);
        b = createEl("div", "bottom");
        tooltip.appendChild(b);
        return  tooltip;
    }

    this.showTooltip = function(e, type) {
        this.hideTooltip();
        locate(e);
        document.getElementById("vbtc").appendChild(this.createTipEl(e, type));
    };

    this.removeChildSafe = function(el) {
        while (el.childNodes.length > 0) {
            this.removeChildSafe(el.childNodes[el.childNodes.length - 1]);
        }
        el.parentNode.removeChild(el);
    }

    this.hideTooltip = function() {
        var d = document.getElementById("vbtc");
        if (d.childNodes.length > 0) this.removeChildSafe(d.firstChild);
    }

    function createEl(t, c) {
        var x = document.createElement(t);
        x.className = c;
        x.style.display = "block";
        return(x);
    }

    function addCss() {
        var l = createEl("link");
        l.setAttribute("type", "text/css");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("href", top.CONFIG.serverpath + "/css/bubbleTooltips.css");
        l.setAttribute("media", "screen");
        document.getElementsByTagName("head")[0].appendChild(l);
    }

    function getLeft(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += getLeft(e.offsetParent);
        return offset;
    }

    function getTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
    }

    function locate(e) {
        var x = (getTop(e) + e.clientHeight + 1);
        var y = (getLeft(e));
        if (y + 200 > document.body.clientWidth) {
            y = document.body.clientWidth - 200;
        }
        document.getElementById("vbtc").style.top = x + "px";
        document.getElementById("vbtc").style.left = y + "px";
    }

})();

function validator() {

    //校验元素注册数据结构
    function validatorMap() {

        this.map = new Array();

        function struct(id, type, desc) {
            this.id = id;
            this.type = type;
            this.desc = desc;
        }

        this.setAt = function(id, type, desc) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i].id == id && this.map[i].type == type) {
                    this.map[i].desc = desc;
                    return;
                }
            }
            this.map[this.map.length] = new struct(id, type, desc);
        };

        this.getValidList = function(id) {
            var arr = [];
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i].id == id) {
                    arr[arr.length] = this.map[i];
                }
            }
            return arr;
        }

        this.remove = function(id, type) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i].id == id && this.map[i].type == type) {
                    this.map.remove(i);
                    return;
                }
            }
        };

        this.getCount = function() {
            return this.map.length;
        };

        this.getId = function (i) {
            return this.map[i].id;
        };

        this.getType = function (i) {
            return this.map[i].type;
        };

        this.getDesc = function (i) {
            return this.map[i].desc;
        };
    }

    //日期对比元素注册数据结构
    function dataCompareMap() {

        this.map = new Array();

        function struct(fristId, secondId, type, desc) {
            this.fristId = fristId;
            this.secondId = secondId;
            this.type = type;
            this.desc = desc;
        }

        this.setAt = function(fristId, secondId, type, desc) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i].fristId == fristId && this.map[i].secondId == secondId && this.map[i].type == type) {
                    this.map[i].desc = desc;
                    return;
                }
            }
            this.map[this.map.length] = new struct(fristId, secondId, type, desc);
        };

        this.getCount = function() {
            return this.map.length;
        };

        this.getFristId = function(i) {
            return this.map[i].fristId;
        };

        this.getSecondId = function (i) {
            return this.map[i].secondId;
        };

        this.getType = function (i) {
            return this.map[i].type;
        };

        this.getDesc = function(i) {
            return this.map[i].desc;
        };
    }

    var registers = new validatorMap();

    var dataCompares = new dataCompareMap();

    //校验结果信息
    var validatorResult = '';

    var otherMsg = '';

    var fieldCls = new Object();

    this.loaded = false;

    this.init = function() {

        if (this.loaded) {
            return;
        }

        if (! validatorTooltips.loaded) {
            validatorTooltips.init();
        }

        var elements = null;

        if (document.all) {
            elements = document.getElementsByTagName('field');
        } else {
            elements = document.getElementsByTagName('t:field');
        }

        for (var i = 0; i < elements.length; i ++) {
            fieldCls[elements[i]["fieldId"]] = elements[i]["type"];
        }

        this.loaded = true;
    }
    
    //注册需要校验的元素
    this.register = function(id, type, desc) {

        this.init();

        registers.setAt(id, type, desc);

        var element = document.getElementById(id);

        validatorTooltips.prepare(element, type, desc);

        var onBlur = function() {

            var list = registers.getValidList(id);

            for (var i = 0; i < list.length; i ++) {

                var valid = false;

                try {
                    valid = eval(list[i].type + '(document.getElementById(\'' + id + '\').value)');
                } catch(e) {
                }

                if (! valid) {
                    validatorTooltips.showTooltip(element, list[i].type);
                    return;
                }

                validatorTooltips.hideTooltip();
            }
        };

        if (element.addEventListener) {
            element.addEventListener('blur', onBlur, false);
        } else {
            element.attachEvent('onblur', onBlur);
        }

        if (fieldCls[id] == "date" && typeof(element["onchange"]) == "function") {
            var oldOnchange = element["onchange"];
            element["onchange"] = function(input) {
                onBlur();
                oldOnchange(input);
            }
        }

        if (type == "required") {
            this.markRequired(id);
        }
    }

    //标注必填输入框
    this.markRequired = function(id) {

        var star = document.createElement("font");

        star.style.color = "#E20000";
        star.style.fontFamily = 'verdana';
        star.style.fontSize = '9px';
        star.innerHTML = "*";

        var e = document.getElementById(id);

        if (e["markStar"] == true) {
            return;
        }

        if (fieldCls[id] == "date" || fieldCls[id] == "query") {
            star.className = "inptDiv";
            e = e.parentNode;
        }

        if (fieldCls[id] == "radioGroup" || fieldCls[id] == "checkboxGroup") {
            star.style.margin = "2px 0 0 2px";
        }

        var tagName = e.tagName.toLowerCase();
        if (tagName == "input" || tagName == "select" || tagName == "textarea") {
            e.style.styleFloat = "left";
            e.style.cssFloat = "left";
        }

        e.parentNode.appendChild(star);

        e["markStar"] = true;
    }

    //注册需要日期比较的元素
    this.registerCompare = function(fristId, secondId, type, desc) {
        dataCompares.setAt(fristId, secondId, type, desc);
    }

    //增加消息
    this.addMsg = function(msg) {
        otherMsg = otherMsg + msg;
        if (msg != '') {
            otherMsg = otherMsg + '\n';
        }
    }

    //所有元素校验执行
    this.check = function() {

        validatorResult = '';

        if (otherMsg != '') {
            validatorResult = validatorResult + otherMsg;
        }

        for (var i = 0; i < registers.getCount(); i ++) {
            var msg = this.exeCheck(i);
            validatorResult += (msg == '' ? '' : msg + '\n' );
        }

        for (var i = 0; i < dataCompares.getCount(); i ++) {
            var msg = this.exeCheckCompare(i);
            validatorResult += (msg == '' ? '' : msg + '\n' );
        }

        if (validatorResult == '') {
            return true;
        }

        alert(validatorResult);
        validatorResult = '';
        otherMsg = '';
        return false;
    }

    //其中某个元素校验执行
    this.exeCheck = function(i) {

        try {

            var id = registers.getId(i), type = registers.getType(i);

            var value = eval("document.getElementById(registers.getId(i)).value");

            if (fieldCls[id] == "radioGroup" || fieldCls[id] == "checkboxGroup") {
                value = eval("(KUI.$V4Group(registers.getId(i)))")
            }

            if (fieldCls[id] == "editor") {
                value = eval("(KE.html(registers.getId(i)))")
            }

            if (! eval(registers.getType(i) + '(value)')) {
                return registers.getDesc(i);
            }

            return '';

        } catch(e) {

            alert(registers.getId(i) + '校验错误,请检查');
        }
    }

    //两个元素的对比校验
    this.exeCheckCompare = function(i) {
        try {
            if (!eval(dataCompares.getType(i) + '(document.getElementById(dataCompares.getFristId(i)).value,document.getElementById(dataCompares.getSecondId(i)).value)')) {
                return dataCompares.getDesc(i)
            } else {
                return '';
            }
        } catch(e) {
            alert(dataCompares.getFristId(i) + '和' + dataCompares.getSecondId(i) + '比较校验错误,请检查');
        }

        //是不是为空
        function required(text) {
            this.required = /.+/;
            return this.required.test(text);
        }

        //验证日期是否比起始日期小
        function dateCompare(begindate, enddate) {

            if (!required(begindate)) {
                return true;
            }

            if (!required(enddate)) {
                return true;
            }

            var Y = begindate.substring(0, 4);
            var M = begindate.substring(4, 6);
            var D = begindate.substring(6, 8);
            var yy = enddate.substring(0, 4);
            var mm = enddate.substring(4, 6);
            var dd = enddate.substring(6, 8);

            if (Y < yy) {
                return true;
            } else if (Y == yy) {
                if (M < mm) {
                    return true;
                } else if (M == mm) {
                    if (D <= dd) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        //比较两个字符串是否相等
        function equal(str1, str2) {

            if (!required(str1)) {
                return true;
            }

            if (!required(str2)) {
                return true;
            }

            if (str1 != str2) {
                return false;
            }

            return true;
        }

        //比较两个字符串是否不相等
        function notequal(str1, str2) {

            if (!required(str1)) {
                return true;
            }

            if (!required(str2)) {
                return true;
            }

            if (str1 != str2) {
                return true;
            }

            return false;
        }

        function less31d(begindate, enddate) {

            var y = enddate.substr(0, 4);
            var m = enddate.substr(4, 2);
            var d = enddate.substr(6, 2);

            var prevMonth = getRelativeMonth(new Month(y, m), -1);

            if (m <= 1) {
                y = prevMonth.year;
                m = prevMonth.month;
                d = prevMonth.length - (31 - d);
            } else {
                m = prevMonth.month;
                d = prevMonth.length - (31 - d);
                if (d < 1) {
                    m = m - 1;
                    d = 31 + d;
                }
            }

            return format('yyyymmdd', y, m, d) <= begindate;

            function getRelativeMonth(mth, n) {

                var m = mth.month + n;

                var y = mth.year;

                if (m <= 0) {
                    m += 12;
                    y--;
                } else if (m > 12) {
                    m -= 12;
                    y++;
                }

                return new Month(y, m);
            }

            function format(f, y, m, d) {

                var ds = replace(f, "yyyy", y);

                ds = replace(ds, "mm", (100 + m).toString().substr(1));

                ds = replace(ds, "dd", (100 + d).toString().substr(1));

                return ds + '';
            }

            function replace(str, o, n) {

                var pos = str.indexOf(o);

                if (pos == -1) {
                    return str;
                }

                return str.substr(0, pos) + n + str.substr(pos + o.length);
            }

            function Month(y, m) {

                var months = new Array("1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月");

                var numDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

                this.year = y - 0;
                this.month = m - 0;
                this.name = months[m - 1];
                this.length = numDays[m - 1];

                if ((m == 2) && ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)) {
                    this.length = 29;
                }

                var d = new Date(this.year, this.month - 1, 1);

                this.firstDay = d.getDay();
            }
        }
    }

    function idCard(idcard) {
        var Errors = new Array(
                "true",
                "身份证号码位数不对,必须是15位或者18位!",
                "身份证号码出生年月日格式不对!",
                "身份证号码校验位错误!",
                "身份证地区非法!",
                "15位身份证号码由数字组成!",
                "18位身份证号码前17位由数字组成,第18位可以是数字或者大写\"X\"!"
                );
        var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
        var Y,JYM;
        var S,M;
        var ereg;
        var idcard_array = new Array();
        idcard_array = idcard.split("");
        //地区检验
        if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
        //身份号码位数及格式检验
        switch (idcard.length) {
            case 15:
                if (! /^[0-9]{15}$/.test(idcard)) {
                    return Errors[5];
                }
                var year = parseInt(idcard.substr(6, 2)) + 1900;
                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
                    //测试出生日期的合法性
                } else {
                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                    //测试出生日期的合法性
                }
                if (ereg.test(idcard)) return Errors[0];
                else return Errors[2];
                break;
            case 18:
                if (! /^[0-9]{17}([0-9X])$/.test(idcard)) {
                    return Errors[6];
                }
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                var year = parseInt(idcard.substr(6, 4));
                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9X]$/;
                    //闰年出生日期的合法性正则表达式
                } else {
                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9X]$/;
                    //平年出生日期的合法性正则表达式
                }
                if (ereg.test(idcard)) {//测试出生日期的合法性
                    //计算校验位
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                            + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                            + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                            + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                            + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                            + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                            + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                            + parseInt(idcard_array[7]) * 1
                            + parseInt(idcard_array[8]) * 6
                            + parseInt(idcard_array[9]) * 3;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y, 1);
                    //判断校验位
                    if (M == idcard_array[17]) return Errors[0];//检测ID的校验位
                    else return Errors[3];
                }
                else return Errors[2];
                break;
            default:
                return Errors[1];
                break;
        }
    }

    Array.prototype.remove = function(dx) {
        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        for (var i = 0,n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    }


    //必填验证
    function required(text) {
        this.required = /.+/;
        return this.required.test(text);
    }

    //只能为数字
    function number(text) {
        if (!required(text)) {
            return true;
        }
        this.number = /^[+-]?[1-9]?[0-9]+(.[0-9]+)?$/;
        return this.number.test(text);
    }

    //只能为整数
    function integer(text) {
        if (!required(text)) {
            return true;
        }
        this.number = /^[1-9]?[0-9]+$/;
        return this.number.test(text);
    }
    
    //验证日期格式
    //日期格式为：20070103
    //1到4位是年份。只能是1900到2099年，5到6位是月份，只能是1到12月，7到8位是日，只能是1到31
    function date(date) {
        if (!required(date)) {
            return true;
        }

        this.is2Month = /^(?:19|20\d{2})(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9])\b/;
        //2月
        this.otherMonth = /^((19)|(20))([0-9][0-9])(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])\b/;

        if (date.substr(4, 2) == '02') {
            return this.is2Month.test(date);
        } else {
            return this.otherMonth.test(date);
        }
    }

    //验证邮政编码，为6位数
    function postcode(postcode) {
        if (!required(postcode)) {
            return true;
        }
        this.postcode = /^(\d{6})\b/;
        return this.postcode.test(postcode);
    }

    //验证手机号码，以国内的手机号码为示范 ，以13，15开头11位手机号
    function mobile(text) {
        if (!required(text)) {
            return true;
        }
        var reMobileNumber1 = /^13(\d{9})\b/;
        var reMobileNumber2 = /^15(\d{9})\b/;
        var reMobileNumber3 = /^18(\d{9})\b/;
        return (reMobileNumber1.test(text) || reMobileNumber2.test(text) || reMobileNumber3.test(text));
    }

    //验证电子邮件
    //电子邮件格式必须为：有效字符串 + @ + 有效字符串 + 句号（.） + 有效字符串
    function email(email) {
        if (!required(email)) {
            return true;
        }
        var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
        return reEmail.test(email);
    }

    //电话号码
    //格式 000-000000-00 或者 00000000
    function tel(tel) {

        if (!required(tel)) {
            return true;
        }

        var p1 = /^(\d{3,4})?\d{7,8}(\d{2,4})?$/;

        var p2 = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;

        var staye = tel.indexOf("-");

        if (staye > 0) {
            return p2.test(tel);
        }

        return p1.test(tel);
    }

    //字母和数字，符号组成
    function safe(string) {
        var reString = /^[^a-zA-Z0-9_@;:'"=+-`!#$%^&*(,<.>?)]/;
        return reString.test(string);
    }

    function nickname(string) {

        if (!required(string)) {
            return true;
        }

        var number = /^[0-9]+(.[0-9]+)?$/;

        if (number.test(string)) {
            return false;
        }

        var regex = /^\s*[\.A-Za-z0-9_-]{6,20}\s*$/;

        return regex.test(string);
    }


    function chinese(name) {

        if (!required(name)) {
            return true;
        }

        var regex = /[\u4E00-\u9FA5\uF900-\uFA2D]+$/;

        if (! regex.test(name)) {
            return false;
        }

        return true;
    }

    function includeEmpty(value) {

        if (!required(value)) {
            return true;
        }

        return (! /\s/.test(value));
    }

    function password(pwd) {

        if (!required(pwd)) {
            return true;
        }

        //客户密码复杂度限制，0-无限制，1-数字+字母，2-数字+大写字母+小写字母，3-数字+字母+特殊字符，4-数字+大写字母+小写字母+特殊字符
        var complex = 0;
        var regexLength = /^.{6,16}$/;
        var regexSpace = /\s/;
        var regexLetter = /[a-zA-Z]/;
        var regexLower = /[a-z]/;
        var regexUpper = /[A-Z]/ ;
        var regexDigit = /\d/;
        var regexSpecial = /[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]/;

        if (! regexLength.test(pwd)) {
            //            validatorResult = validatorResult + '新密码长度为6-16位!' + '\n';
            return false;
        }

        if (regexSpace.test(pwd)) {
            //            validatorResult = validatorResult + '新密码不能含有空格!' + '\n';
            return false;
        }

        if (! regexDigit.test(pwd)) {
            //            validatorResult = validatorResult + '新密码必须包含数字!' + '\n';
            return false;
        }

        if ((complex == 1 || complex == 3) && ! regexLetter.test(pwd)) {
            //            validatorResult = validatorResult + '新密码必须包含字母!' + '\n';
            return false;
        }

        if (complex == 2 || complex == 4) {
            if (! regexLower.test(pwd)) {
                //                validatorResult = validatorResult + '新密码必须包含小写字母!' + '\n';
                return false;
            }

            if (! regexUpper.test(pwd)) {
                //                validatorResult = validatorResult + '新密码必须包含大写字母!' + '\n';
                return false;
            }
        }

        if (complex == 3 || complex == 4) {
            if (! regexSpecial.test(pwd)) {
                validatorResult = validatorResult + '新密码必须包含特殊字符!' + '\n';
                return false;
            }
        }

        return true;
    }

    function certificateno(idno) {

        if (!required(idno)) {
            return true;
        }

        var msg = idCard(idno)
        if (msg == "true") {
            return true;
        }

        validatorResult = validatorResult + msg + '\n';

        return false;
    }
}


