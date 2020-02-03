(function () {
    var $input = $('.search input:eq(0)');
    $input.on('input', function () {
        $('.same').css('display', 'block');
        var value = $input.val();
        if(value.length == 0){
            $('.same').css('display', 'none');
        }

        $.ajax({
            type: 'Get',
            url: 'https://api.douban.com/v2/music/search',
            dataType: 'jsonp',
            data: 'q=' + value + '&count=7',
            success: getData
        })
    })

    function getData(data) {
        console.log(data);
        var list = data.musics,
            str = '';
        list.forEach(function (ele, index) {
            str += '<li class="clearfix"><img class="images" src="' + ele.image + '" alt="' + ele.alt + '">' +
            '<div class="description"><p class="author">' + ele.author[0].name + '</p></div></li>';
        })
        $('.same').html($(str));
    }









})()