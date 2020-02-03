var w = cont.offsetWidth,
    h = cont.offsetHeight;
cont.addEventListener('mouseenter', function (e) {
    getDirection(e, cont, 'in')
})
cont.addEventListener('mouseleave', function (e) {
    getDirection(e, cont, 'out')
})

function getDirection(e, ele, state) {
    var x = e.offsetX - w / 2,
        y = e.offsetY - h / 2,
        d = (Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) + 3) % 4,
        direction;
    switch (d) {
        case 0:
            direction = 'top';
            break;
        case 1:
            direction = 'left';
            break;
        case 2:
            direction = 'bottom';
            break;
        case 3:
            direction = 'right';
    }
    ele.className = state + '-' + direction;
}