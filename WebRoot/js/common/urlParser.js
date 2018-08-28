function urlReader() {
    var url = location.search;
    var result = new classMap();
    if (url.indexOf("?") != -1)
    {
        var parameters = ( url.substr(1)).split("&");
        for (var i = 0; i < parameters.length; i++) {
            result.setAt(parameters[i].split("=")[0], unescape(parameters[i].split("=")[1]));
        }
    }
    return result;
}