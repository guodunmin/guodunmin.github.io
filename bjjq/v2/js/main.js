/**
 * page: index.html
 */
$('#carousel-example-generic').carousel({
    interval: 1500
})

$('.dropdown-toggle').dropdown();

$('li.dropdown').mouseover(function() {
    if($(document.body).width()>750)
        $(this).addClass('open');
}).mouseout(function() {
    if($(document.body).width()>750)
        $(this).removeClass('open');
});

$('ul.nav>li').mouseover(function() {
    $(this).addClass('active');
}).mouseout(function() {
    $(this).removeClass('active');
});

$(function() {
    var G_DebugFlag = true;
    if(!G_DebugFlag) {
        return;
    }
    $('<div class="view-size"><p>0px x 0px</p></div>').appendTo('body');
    var getViewSize = function(type) {
        var aViewSize = new Array();
        aViewSize['win'] = {
            w: $(window).width(),
            h: $(window).height()
        }
        aViewSize['doc'] = {
            w: $(document.body).width(),
            h: $(document.body).height()
        }
        var viewSize = aViewSize[type].w +'px x '+ aViewSize[type].h +'px';
        console.log('ViewSize: '+ viewSize);
        return viewSize;
    }
    $('.view-size>p').html(getViewSize('doc'));
    $(window).resize(function() {   
        $('.view-size>p').html(getViewSize('doc'));
    }); 
});

$(function() {
    var offset = 220;
    var duration = 850;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.backToTop').fadeIn(duration);
        } else {
            $('.backToTop').fadeOut(duration);
        }
    });
    $('.backToTop').click(function(event) {
        event.preventDefault();
        $(document.body).animate({scrollTop: 0}, duration);
        return false;
    });
});/**page: index.html */

/**
 * page: index-swiper.html
 */
$(function() {
    var duration = 800;
    $('.bjd-toggle').click(function(event) {
        $('.bjd-collapse').toggle();
        $(this).find('.caret').toggleClass('caret-reverse');
    });
    $('.website-copyright>p').click(function(event) {
        event.stopPropagation();
        event.preventDefault();
        $('.website-copyright-disclaimer').fadeToggle(duration);
        $(document.body).animate({
            scrollTop: $(this).offset().top
        }, duration);
    })

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',//3, 'auto', //设置slider容器能够同时显示的slides数量(carousel模式)。
        centeredSlides: false, //设定为true时，活动块会居中，而不是默认状态下的居左。
        spaceBetween: 0, //slide之间的距离（单位px）。
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        grabCursor: true //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
    });
});/**page: index-swiper.html */

/**
 * page: index-swiper-details.html
 */
$(function() {
    
    console.log($('.art-content').css('font'));
    $('.art-textSize.button').click(function() {
        //var $artCont = $('.art-content');
        //var size= parseFloat($artCont.css('font-size'));
        /*size *= 2;
        $artCont.css('font-size', size);*/
        
        var $spanText = $(this).find('span.text');
        var text = $spanText.text();
        $('.art-content').toggleClass('larger');
        $spanText.text((text.indexOf('大')>-1) ? '小':'大');
    });

    /*var $myShareModal = $('#art-share-modal').modal({
        backdrop: true,
        keyboard: true,
        show: false
    });*/
    $('.art-share .button').click(function() {
        //$myShareModal.modal('show');
        $('.art-share-modal').fadeToggle(800);

    });
    $('.modal-backdrop').click(function() {
        console.log('.modal-backdrop click');
    });

    var swiperDetails = new Swiper('.share-header>.swiper-container', {
        slidesPerView: 'auto',//3, 'auto', //设置slider容器能够同时显示的slides数量(carousel模式)。
        centeredSlides: false, //设定为true时，活动块会居中，而不是默认状态下的居左。
        spaceBetween: 0, //slide之间的距离（单位px）。
        grabCursor: true //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
    });

    $('.scroll-wrap, .pannel-mid').click(function(e) {
        //console.log('w/h '+$(window).width()+'/'+$(window).height()+'|'+'pageX:'+e.pageX+', '+'pageY:'+e.pageY);
        /*console.log(
            e.delegateTarget.className +'--'+ e.type+', target:'+e.target+', relatedTarget:'+e.relatedTarget
        );*/
        var e = e || window.event;
        var winW = $(window).width(); //视口宽高
        var winH = $(window).height();
        var mouseX = e.pageX; //鼠标坐标
        var mouseY = e.pageY;
        var moveXa = 0; //鼠标可移动区域
        var moveXb = winW;
        var moveYa = winH*0.3; 
        var moveYb = winH*0.7;
        //console.log('moveYa '+moveYa+'/moveYb'+moveYb);
        if(mouseX >0 && mouseX <winW && mouseY >moveYa && mouseY < moveYb) {
            //console.log('w/h '+$(window).width()+'/'+$(window).height()+'|'+'pageX:'+e.pageX+', '+'pageY:'+e.pageY);

            $('.pannel-top').fadeToggle('3');
            $('.pannel-bottom').fadeToggle('3');
            $('.pannel-mid').fadeToggle('3');
        }
        $('.moveArea').css({
            'height': moveYb-moveYa+'px',
            'top': moveYa
        })
        
    });
    
    

});/**page: index-swiper-details.html */


/**
 * scroll
 */
/*$(function() {
    var viewSizeH = $(window).height();
    $('.container-d13').css({
        height: viewSizeH
    });
    $(window).resize(function() {   
        viewSizeH = $(window).height();
        $('.container-d13').css({
            height: viewSizeH
        });
        console.log('winHeight: ', viewSizeH);
    }); 
});*//**scroll */

/**
 * demo13
 */
$(function() {
    var viewSizeH = $(window).height();
    var $adjustObj = $('.demo13>.swiper-container');
    $adjustObj.height(viewSizeH);
    $(window).resize(function() {   
        viewSizeH = $(window).height();
        $adjustObj.height(viewSizeH);
        console.log('winHeight: ', viewSizeH);
    }); 
});/**demo13 */
