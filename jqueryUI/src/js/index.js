var imgLength = 13,
	nowIndex,
	imgWidth = ($(window).width() - 24) / 4,
	ratio = $(window).width() / $(window).height();

function render() {
	var str = '';
	for (var i = 0; i < imgLength; i++) {
		str += '<li style="height:' + imgWidth + 'px"><img src="./src/img/' + i + '.png" </li>';
	};
	$(str).appendTo($('.wrapper')).animate({'opacity': '1'}, 300);
}
render();
$('.wrapper').on('tap', 'li', function() {
	nowIndex = $(this).index();
	appear(nowIndex);
})

function appear(index) {
	$('.show').html('').show();
	var oImg = new Image();
	oImg.src = './src/img/' + index + '.png';
	oImg.onload = function() {
		var w = this.width,
			h = this.height;
		if (w / h > ratio) {
			$(this).appendTo($('.show')).css('width', '100%').animate({'opacity': '1'}, 300);
		} else {
			$(this).appendTo($('.show')).css('height', '100%').animate({'opacity': '1'}, 300);
		}

	}
}

$('.show')
	.on('tap', function() {
		$(this).hide();
	})
	.on('swipeLeft', function() {
		if (nowIndex < imgLength - 1) {
			nowIndex++;
			appear(nowIndex);
		};
	})
	.on('swipeRight', function() {
		if (nowIndex > 0) {
			nowIndex--;
			appear(nowIndex);
		};
	})
