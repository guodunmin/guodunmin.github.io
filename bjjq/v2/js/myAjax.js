$(function() {
    var testDelayTime = 500; //测试延迟时间
    var testFadeTime = 500;
    var $loadMore = $('#load-more'); //jQuery 对象扩展两个属性 Icon Text 
    var $loadMoreIcon = $loadMore.find('span.icon');
    var $loadMoreText = $loadMore.find('span.text');
    //var $loading = $('<div id="loading"><img src="img/loading.gif" />下载中 . . .</div>').insertBefore('#load-more');
    $(document).ajaxStart(function() {
        
    }).ajaxStop(function() {
        //$loading.hide();
    });

    $('#load-more').click(function(event) {
        event.preventDefault();
        loadMoreObj.loading();
        delayTimeout(testDelayTime, function(){
            $.ajax({
                url: 'js/myAjax-data.json',
                dataType: 'json',
                data: {
                    s: Math.random()
                },
                timeout: 2000
            })
            .done(function(data) {
                displayAjaxLoading(data);
                loadMoreObj.default();
            })
            .fail(function() {
                loadMoreObj.repeat();
            })
            .always(function() {
            });
        });
        
/*
        $.getJSON('js/data.json', displayAjaxLoading(data));
        */
    });
    var loadMoreObj = {
        $self: $('#load-more'),
        $children: $('#load-more').children(),
        $icon: $('#load-more').find('span.icon'),
        $text: $('#load-more').find('span.text'),
        show: function(className, text) {
            this.$children.hide();
            this.$icon.attr('class', 'icon glyphicon '+ className);
            this.$text.text(text);
            this.$children.fadeIn(testFadeTime);
        },
        default: function() {
            this.show('glyphicon-cloud-download', '更多资讯')
        },
        loading: function() {
            this.show('glyphicon-hourglass', '正在下载')
        },
        repeat: function() {
            this.show('glyphicon-repeat', '重新下载')
        }
    }

    var delayTimeout = function(delayTime, func) {
        var timeout = null;
        var time = delayTime;
        timeout = setTimeout(function() {
            func();
            clearTimeout(timeout);
            timeout = null;
        }, time);
    }

    var displayAjaxLoading = function(data) {
            var html = '';
            $.each(data, function(entryIdx, entry) {
html += '        ';
html += '        <article class="clearfix">';
html += '            <div class="news-imgtxt-wrapper">';
html += '                <div class="news-imgtxt-txt">';
html += '                    <div class="title">';
html += '                        <a href="'+ entry.category +'/'+ entry.id +'" title="'+ entry.title +'">'+ entry.title +'</a>';
html += '                    </div>';
html += '                    <div class="date">';
html += '                        '+ entry.created +'';
html += '                    </div>';
html += '                </div>';
html += '                <div class="news-imgtxt-pic">';
html += '                    <div class="pic">';
html += '                        <a href="#"><img src="'+ entry.images +'" title="'+ entry.title +'" /></a>';
html += '                    </div>';
html += '                </div>';
html += '            </div>';
html += '        </article>';
            });

            var duration = 800;
            $(html).insertBefore('#load-more').hide().fadeIn(duration);
    }
    
});