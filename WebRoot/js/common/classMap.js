function classMap() {

    var _this = this;

    this.map = new Array();

    this.data = {};

    this.lookUp = function (key) {
        var value = _this.data[key];
        return value;
    }

    this.setAt = function (key, value) {
        _this.map[this.map.length] = {'key':key, 'value':value};
        _this.data[key] = value;
    }

    this.init = function(o) {

        for (var key in o) {
            _this.map[_this.map.length] = {'key':key, 'value':value};
            _this.data[key] = value;
        }
    }

    this.getCount = function () {
        return _this.map.length;
    }

    this.options = function(selectObj, value) {

        for (var key in _this.data) {

            var optionObj = document.createElement("option");

            optionObj.appendChild(document.createTextNode(_this.data[key]));
            optionObj.setAttribute("value", key);

            if (key == value) {
                optionObj.selected = true;
            }

            selectObj.appendChild(optionObj);
        }
    }
}