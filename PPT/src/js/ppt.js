var pptSlider = {
	$pptWraper: $('.pptWrapper'),
	$titleText: ['TITLE HERE1', 'TITLE HERE2', 'TITLE HERE3'],
	$pText: [
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.Nunc viverra imperdiet enim.',
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.Nunc viverra imperdiet enim.',
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.Nunc viverra imperdiet enim.'
	],

	$imgArr: ["./src/imgs/1.jpg", "./src/imgs/2.jpg", "./src/imgs/3.jpg"],
	$bgImg: ["./src/imgs/1.jpg", "./src/imgs/2.jpg", "./src/imgs/3.jpg"],
	len: function() {
		return this.$titleText.length;
	},
	nowIndex: 0,
	lastIndex: undefined,
	direction: 'right',
	canClick: true,
	timer: null,

	pptInit: function() {
		this.creatDom();
		this.bindEvent();
		this.autoMove();
	},

	creatDom: function() {
		var len = this.len();
		var initStr = '<div class="pptSlider">\
					<div class="sliderText">\
						<h2>',
			ulStr = '<ul class="sliderOrder"><li class="active"></li>',
			str = '';
		for (var i = 0; i < len; i++) {
			str = str + initStr + this.$titleText[i] + '</h2><p>' + this.$pText[i] + '</p></div><div class="images"><img src=' +
				this.$imgArr[i] + '></div></div>';
			if (i > 0) {
				ulStr += '<li></li>';
			}
		}
		if (len > 1) {
			str +=
				'<div class="sliderBtn">\
					<div class="leftBtn">&lt;</div>\
					<div class="rightBtn">&gt;</div>\
				</div>';
			ulStr += '</ul>';
			str += ulStr;
		}
		this.$pptWraper.html('').html(str);
		$('.pptWrapper .pptSlider:not(:eq(0))').css('display', 'none');
		for (var i = 0; i < len; i++) {
			$('.pptWrapper .pptSlider').eq(i).css('backgroundImage', 'url(' + this.$bgImg[i] + ')')
		}
	},

	bindEvent: function() {
		var _this = this;
		$('.leftBtn').add($('.rightBtn')).add($('.sliderOrder li')).on('click', function() {
			if (_this.canClick) {
				_this.canClick = false;
				clearInterval(_this.timer);
				if ($(this).attr('class') == 'leftBtn') {
					_this.direction = 'left';
				} else if ($(this).attr('class') == 'rightBtn') {
					_this.direction = 'right';
				} else {
					_this.direction = $(this).index();
				}
				_this.getIndex(_this.direction);
				_this.changeOrder();
				if (_this.lastIndex != _this.nowIndex) {
					$('.pptSlider').eq(_this.lastIndex).fadeOut(300);
					$('.pptSlider').eq(_this.nowIndex).delay(300).fadeIn(300, function() {
						_this.canClick = true;
						_this.autoMove();
					});
				} else {
					_this.canClick = true;
				}
			}
		});
	},

	getIndex: function(value) {
		var len = this.len();
		this.lastIndex = this.nowIndex;
		if (value == 'left') {
			this.nowIndex = this.nowIndex == 0 ? len - 1 : this.nowIndex - 1;
		} else if (value == 'right') {
			this.nowIndex = this.nowIndex == len - 1 ? 0 : this.nowIndex + 1;
		} else {
			this.nowIndex = value;
		}
	},

	changeOrder: function() {
		$('.active').removeClass('active');
		$('.sliderOrder li').eq(this.nowIndex).addClass('active');
	},

	autoMove: function() {
		var _this = this;
		clearInterval(_this.timer);
		_this.timer = setInterval(function() {
			_this.getIndex('right');
			_this.changeOrder();
			$('.pptSlider').eq(_this.lastIndex).fadeOut(300);
			$('.pptSlider').eq(_this.nowIndex).delay(300).fadeIn(300);
		}, 3000);
	}

}
pptSlider.pptInit();
