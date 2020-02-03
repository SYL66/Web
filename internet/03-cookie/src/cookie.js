var oMove = document.getElementsByClassName('move')[0];
var drag = {
    init: function (dom) {
        this.dom = dom;
        this.flag = false;
        this.bindEvent();
    },
    bindEvent: function () {
        this.dom.onmousedown = this.mouseDown.bind(this);
        document.onmouseup = this.mouseUp.bind(this);
        document.onmousemove = this.mouseMove.bind(this);
        window.onload = this.onLoad.bind(this);
        window.onunload = this.unLoad.bind(this);
    },
    mouseDown: function (e) {
        if (!this.flag) {
            this.difX = e.clientX - this.dom.offsetLeft;
            this.difY = e.clientY - this.dom.offsetTop;
            this.flag = true;
        }
    },
    mouseUp: function () {
        this.flag = false;
    },
    mouseMove: function (e) {
        if (this.flag) {
            this.dom.style.left = e.clientX - this.difX + 'px';
            this.dom.style.top = e.clientY - this.difY + 'px';
        }
    },
    onLoad: function () {
        var _this = this;
        cookieManage.getCookie(_this.dom + 'Left', function (data) {
            _this.dom.style.left = data ? data + 'px' : '100px';
        });
       cookieManage.getCookie(_this.dom + 'Top', function (data) {
            _this.dom.style.top = data ? data + 'px' : '100px';
        });
    },
    unLoad: function(){
        var _this = this;
        cookieManage
            .setCookie(_this.dom + 'Left', this.dom.offsetLeft, 10000)
            .setCookie(_this.dom + 'Top', this.dom.offsetTop, 10000);
    }
}
drag.init(oMove);

var cookieManage = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';' + 'max-age=' + time;
        return this;
    },
    deleteCoolie: function (name) {
        this.setCookie(name, '', -1);
        return this;
    },
    getCookie: function (name, callback) {
        var cookieArr = document.cookie.split('; '),
            len = cookieArr.length;
        for (var i = 0; i < len; i++) {
            var arr = cookieArr[i].split('=');
            if (arr[0] == name) {
                if (callback) {
                    callback(arr[1]);
                }
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}