
$(function() {
    $('<div class="view-size"><p>0px x 0px</p></div>').appendTo('body');
    var view = $(document.body).width()+", "+$(document.body).height();  
    var viewSize = $(window).width()+"px x "+$(window).height()+"px";
    console.log(viewSize);
    $('.view-size>p').html(viewSize);
    $(window).resize(function() {   
        viewSize = $(window).width()+"px x "+$(window).height()+"px";
        console.log(viewSize);
        $('.view-size>p').html(viewSize);
    }); 
});

/**
 * page: index.html
 */
$('.dropdown-toggle').dropdown();

$('li.dropdown').mouseover(function() {
    if($(document.body).width()>750)
        $(this).addClass('open');
}).mouseout(function() {
    if($(document.body).width()>750)
        $(this).removeClass('open');
})

$('.main-h1').click(function(){
    $(this).toggleClass('main-h1-toggle');
})

$('.carousel').carousel({
    interval: 10000 //10s
});


 
//$.support.transition = false //禁用过度效果
//$('.carousel').one('bsTransitionEnd', function() {}).emulateTransitionEnd(200);
//
/**
 * page: index.html 
 * */
$('.list-wrap .list-item').each(function(){
    var url = $(this).attr('data-href');
    url = (url) ? url : '#';
    $(this).click(function() {
        window.location.href = url;
    });
});