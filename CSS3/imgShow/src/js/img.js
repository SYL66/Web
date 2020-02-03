var timer = setTimeout(function(){
    $('.wrapper').removeClass('init');
}, 200);
$('.item').click(function(){
    $('.wrapper').addClass('activeWrapper');
    $(this).addClass('active');
})
$('.cancel').click(function(){
    $('.item').removeClass('active');
    $('.wrapper').removeClass('activeWrapper').addClass('cancelWrapper');
    return false;
})