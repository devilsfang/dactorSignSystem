function removeChildSafe(el) {
    while (el.childNodes.length > 0) {
        removeChildSafe(el.childNodes[el.childNodes.length - 1]);
    }
    el.parentNode.removeChild(el);
}

var calendarUtil = new function() {

    var days = new Array('日', '一', '二', '三', '四', '五', '六');

    var months = new Array("1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月");

    var numDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    var today;

    var currMonth;

    var prevMonth;

    var nextMonth;

    var selectYear;

    this.config = {textid:null, hasToolbar:null, isMonth:null, format:null};

    this.mDivMOver = false;

    this.init = function (m, y, config) {

        if (config != null) {
            this.config = config;
        }

        if (this.config.format == null) {
            this.config.format = 'yyyymmdd';
        }

        today = new Date();

        if (m == null) {
            m = today.getMonth() + 1;
        }

        if (y == null) {
            y = today.getFullYear();
        }

        selectYear = parseInt(y);

        currMonth = new Month(y, m);

        prevMonth = getRelativeMonth(currMonth, -1);

        nextMonth = getRelativeMonth(currMonth, 1);
    }

    function hideCalendar() {
        if (document.getElementById('calendar')) {
            document.getElementById('calendar').style.display = 'none';
        }
    }

    function format(f, y, m, d) {

        var value = f.replace("yyyy", y);
        value = value.replace("yy", y.toString().substr(2));
        value = value.replace("y", y);
        value = value.replace("mmm", months[m - 1]);
        value = value.replace("mm", (100 + m).toString().substr(1));
        value = value.replace("m", m);
        value = value.replace("dd", (100 + d).toString().substr(1));
        value = value.replace("d", d);
        return value;
    }

    function Month(y, m) {

        this.year = y;

        this.month = m;

        this.name = months[m - 1];

        this.length = numDays[m - 1];

        if ((m == 2) && ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)) {

            this.length = 29;
        }

        var d = new Date(this.year, this.month - 1, 1);

        this.firstDay = d.getDay();
    }

    function getRelativeMonth(mth, n) {

        var m = mth.month + n;
        var y = mth.year;

        if (m <= 0) {
            m += 12;
            y--;
        }

        if (m > 12) {
            m -= 12;
            y++;
        }

        return new Month(y, m);
    }

    this.changeYear = function() {

        document.getElementById('calendar').innerHTML = this.createdivInnerHtml(currMonth.month, document.getElementById('year').value);
    }

    this.changeMonth = function() {

        document.getElementById('calendar').innerHTML = this.createdivInnerHtml(document.getElementById('month').value, currMonth.year);
    }

    this.onPrev = function() {

        document.getElementById('calendar').innerHTML = this.createdivInnerHtml(prevMonth.month, prevMonth.year);
    }

    this.onNext = function() {

        document.getElementById('calendar').innerHTML = this.createdivInnerHtml(nextMonth.month, nextMonth.year);
    }

    this.returnDate = function(y, m, d) {

        var input = document.getElementById(this.config.textid);

        input.value = format(this.config.format, y, m, d);

        if (typeof(input["onchange"]) == "function") {

            input["onchange"](input);
        }

        hideCalendar();
    }

    this.createdivInnerHtml = function(m, y, config) {

        this.init(m, y, config);

        var html = "<table border='0' cellspacing='1' width='100%'>";

        if ('false' != this.config.hasToolbar) {


            html = html + "<tr align='center'>";

            if (this.config.isMonth == null || this.config.isMonth == false) {
                html = html + "<td colspan='1' class='tablehead'><a class='tablehead' href='javascript:calendarUtil.onPrev()'>上月</a></td>";
            }

            html = html + "<td colspan='5'>";

            html = html + "<select id='year' name='year' onChange='javascript:calendarUtil.changeYear()'>";

            var begin = selectYear - 10;

            var end = selectYear + 10;

            html = html + "<option value='" + (begin - 10) + "'>" + '更早</option>';

            for (var i = begin; i < end; i++) {

                html = html + "<option value='" + i + "'" + ((i == selectYear) ? " selected" : "") + ">" + i + '</option>';
            }

            html = html + "<option value='" + (end + 10) + "'>" + '更晚</option>';

            html = html + "</select>";

            html = html + "<select id='month' name='month' onChange='javascript:calendarUtil.changeMonth()'>";

            for (var i = 1; i < 13; i++) {

                html = html + "<option value='" + i + "'" + ((i == currMonth.month) ? " selected" : "") + ">" + months[i - 1] + '</option>';
            }

            html = html + "</select>";

            html = html + "</td>";

            if (this.config.isMonth == null || this.config.isMonth == false) {
                html = html + "<td colspan='1' class='tablehead'><a class='tablehead' href='javascript:calendarUtil.onNext()'>下月</a></td>";
            }

            if (this.config.isMonth) {
                html = html + "<td colspan='1' class='tablehead'><a class='tablehead' href='javascript:calendarUtil.returnDate(" + selectYear + ", " + currMonth.month + ", 1)'>确定</a></td>";
            }

            html = html + "</tr>";
        }

        if (this.config.isMonth) {
            return html;
        }

        html = html + "<tr align='center' bgcolor='#EEEEEE'>";

        for (var d = 0; d < 7; d++) {

            html = html + "<td width=14% class='days'><b>&nbsp;" + days[d] + "&nbsp;</b></td>";
        }

        html = html + "</tr>";

        var daycounter = 1;

        var cls = "";

        for (var i = 0; i < 6; i++) {

            if (daycounter <= currMonth.length) {

                html = html + "<tr align=center>";

                for (var j = 0; j < 7; j++) {

                    if ((i == 0 && j < currMonth.firstDay) || daycounter > currMonth.length) {

                        cls = "";

                    } else if (daycounter == today.getDate() && currMonth.month == today.getMonth() + 1 && currMonth.year == today.getFullYear()) {

                        cls = " class='today'";

                    } else if (
                            (daycounter > today.getDate() && currMonth.month == today.getMonth() + 1 && currMonth.year == today.getFullYear())
                                    ||
                            (currMonth.month > today.getMonth() + 1 && currMonth.year == today.getFullYear())
                                    ||
                            currMonth.year > today.getFullYear()
                            )
                    {

                        cls = " class='aftertoday'";

                    } else {

                        cls = " class='beforetoday'";
                    }

                    html = html + "<td" + cls + ">";

                    if (cls != "") {

                        html = html + "<a" + cls + " href='javascript:calendarUtil.returnDate(" + currMonth.year + "," + currMonth.month + "," + daycounter + ")'>" + daycounter + "</a>";
                        daycounter++;
                    }

                    html = html + "</td>";

                    if (daycounter > currMonth.length) {

                        break;
                    }
                }

                html = html + "</tr>";
            }
        }

        html = html + "</table>";

        return html;
    }

    this.showHideCal = function () {

        if (calendarUtil.mDivMOver) {

        } else {

            hideCalendar();
        }
    }

    if (document.all) {

        document.attachEvent('onclick', this.showHideCal);

    } else {

        document.addEventListener('click', this.showHideCal, false);
    }

}

function showCalendar(id, format, hasToolbar, isMonth) {

    var calendarDiv = document.getElementById('calendar');

    if (calendarDiv == null) {

        calendarDiv = document.createElement('div');

        calendarDiv.setAttribute("id", "calendar");

        calendarDiv.className = "cal";

        calendarDiv.style.zIndex = 1000;
        calendarDiv.style.position = "absolute";
        calendarDiv.style.borderWidth = "1px";
        calendarDiv.style.borderStyle = "solid";
        calendarDiv.style.borderColor = "#666";
        calendarDiv.style.backgroundColor = "#FFFFFF";
        calendarDiv.style.display = 'none';

        document.body.appendChild(calendarDiv);
    }

    removeAllChilds(calendarDiv);

    calendarDiv.innerHTML = calendarUtil.createdivInnerHtml(null, null, {textid:id, format:format, hasToolbar:hasToolbar, isMonth:isMonth});

    calendarDiv.style.left = (getLeft(document.getElementById(id)) + 2) + 'px';
    calendarDiv.style.top = (getTop(document.getElementById(id)) + 20) + 'px';

    calendarDiv.style.width = "230px";
    calendarDiv.style.height = "171px";

    calendarDiv.style.display = 'block';

    if (isMonth) {
        calendarDiv.style.width = "190px";
        calendarDiv.style.height = "23px";
    }

    calendarDiv.onmouseover = function() {

        calendarUtil.mDivMOver = true;
    };

    calendarDiv.onmouseout = function() {

        calendarUtil.mDivMOver = false;
    };

    function getTop(e) {

        var offset = e.offsetTop;

        if (e.offsetParent != null) {
            offset += getTop(e.offsetParent);
        }

        return offset;
    }

    function getLeft(e) {

        var offset = e.offsetLeft;

        if (e.offsetParent != null) {
            offset += getLeft(e.offsetParent);
        }

        return offset;
    }
}




