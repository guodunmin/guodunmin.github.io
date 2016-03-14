(function($){
    var toTop = $('#toTop').length ? $('#toTop').offset().top - $(window).height() + 20 : 0;

    // Caption
    $('.article-entry').each(function(i){
        $(this).find('img').each(function(){
            if ($(this).parent().hasClass('fancybox')) {
                return;
            }
            var alt = this.alt;
            if (alt) {
                $(this).after('<span class="caption">' + alt + '</span>');
            }

            $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
        });

        $(this).find('.fancybox').each(function(){
            $(this).attr('rel', 'article' + i);
        });
    });
    if ($.fancybox){
        $('.fancybox').fancybox();
    }

    // Profile card
    $(document).on('click', function () {
        $('#profile').removeClass('card');
    }).on('click', '#profile-anchor', function (e) {
        e.stopPropagation();
        $('#profile').toggleClass('card');
    }).on('click', '.profile-inner', function (e) {
        e.stopPropagation();
    });

    // To Top
    $(document).on('scroll', function () {
        if ($(document).width() >= 800) {
            if($(this).scrollTop() > toTop) {
                $('#toTop').addClass('fix');
                $('#toTop').css('left', $('#sidebar').offset().left);
            } else {
                $('#toTop').removeClass('fix');
            }
        } else {
            $('#toTop').addClass('fix');
            $('#toTop').css('right', 20);
        }
    }).on('click', '#toTop', function () {
        $('body, html').animate({ scrollTop: 0 }, 600);
    });

    //:gdm 20160314
    //把 http 跳转到 https
    var winLoc = window.location;
    var url = winLoc.href;
    if (winLoc.hostname == 'localhost' || winLoc.port == '4000'){
        
    }
    else if (url.indexOf('http://')===0) { //排除参数中包含'http://'的情况
        url = url.replace('http://','https://');
        window.location.replace(url); //直接替换不记录历史
    }
    else{
        
    }
    //.gdm 20160314

	//:gdm 2016-03-07
    var disqus_conf = {
    };
    var disqusShortName = "guodunmin";
    var commentBtn = document.querySelector('.show-comments');
    var showComments = function(){
        var disqus_shortname = disqusShortName;
        var proto = 'https://';
        var dsq = document.createElement('script');
        dsq.id = 'dsq-count-scr';
        dsq.type = 'text/javascript';
        dsq.async = false;
        dsq.src = proto + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        commentBtn.parentNode.removeChild(commentBtn);
    };
    var disqusCount = function(){
        //disqus_thread
        console.log('disqusCount');
    };
    if (commentBtn) {
        if (document.addEventListener) {
            commentBtn.addEventListener('click', showComments, false);
        } else {
            commentBtn.attachEvent('onclick', showComments);
        }
    }
    $(document).on('ready', function () {
        var commentsCount = document.querySelectorAll('.disqus-comment-count');
        if (/^#disqus|^#comment/.test(location.hash)){
            showComments();
        //}else if (commentsCount.length && location.hostname === 'guodunmin.com'){
        } else if (commentsCount.length){
            disqusCount();
            // 默认显示评论数 \themes\icarus\layout\comment\index.ejs
        }
    });
	//.gdm 2016-03-07
    
})(jQuery);