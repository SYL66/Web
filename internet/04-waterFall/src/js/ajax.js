function myAjax(method, url, data, callback, flag, contentType) {
    var ajax = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHttp');
    method = method.toUpperCase();
    if (method == 'GET') {
        var date = new Date(),
            timer = date.getTime();
        ajax.open(method, url + '?' + data + '&timer=' + timer, flag);
        ajax.send();
    } else if (method == 'POST') {
        contentType = contentType || 'application/x-www-form-urlencoded';
        ajax.open(method, url, flag);
        ajax.setRequestHeader('Content-type', contentType);
        ajax.send(data);
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                callback(ajax.responseText);
            }
        }
    }
}