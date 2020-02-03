(function () {
    var oLi = document.getElementsByTagName('li'),
        num = 1,
        flag = false;
    function getData(){
        if(!flag){
            flag = true;
            myAjax('GET', './src/php/data.txt', 'c-page=' + num, creatDom, true);
            num ++;
        }
    }
    getData();
    function getMinHeightList() {
        var minHeight = oLi[0].offsetHeight,
            i = 1,
            len = oLi.length,
            index = 0;
        for (; i < len; i++) {
            if (oLi[i].offsetHeight < minHeight) {
                minHeight = oLi[i].offsetHeight;
                index = i;
            }
        }
        return index;
    };
    function creatDom(data) {
        var arr = JSON.parse(data);
        arr.forEach(function (ele, index) {
            var minHIndex = getMinHeightList(),
                oBox = document.createElement('div'),
                oCont = document.createElement('div'),
                oImg = new Image(),
                oP = document.createElement('p');
            oBox.className = 'box';
            oCont.className = 'cont';
            oImg.src = ele.preview;
            oP.innerText = ele.title;
            oImg.height = 200 / ele.width * ele.height ;
            oImg.onerror = function(){
                oCont.style.height = this.height + 'px';
                this.style.width = '202px';
                this.style.margin = '-1px';
                this.height = this.height + 2;
            }
            oCont.appendChild(oImg);
            oBox.appendChild(oCont);
            oBox.appendChild(oP);
            oLi[minHIndex].appendChild(oBox);
        })
        flag = false;

    };
    window.onscroll = function(){
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollHeight,
            clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
            pageHeight = oLi[getMinHeightList()].offsetHeight;
        if(scrollHeight + clientHeight > pageHeight){
            getData();
        }
    };
})();