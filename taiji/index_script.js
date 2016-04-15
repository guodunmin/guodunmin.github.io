(function($){
    
    $('#syqf-quanpu .title').hide();
    $('h1.article-title').html($('#syqf-quanpu .title').html());
    $('img[title*="data-href"]').each(function(idx,ele){
        //fancybox 会晚于此时执行，即要等待fancybox处理完页面结构再执行。
        //故选择在 click/hover 事件中执行
    });
    
    /**
     * 扩展 Markdown 的图片引用，来支持用图片制作跳转链接。
     * 行内式的图片语法：![Alt text](/path/to/img.jpg "Optional title")，
     * 选用 Optional title 做数据项，如：
     * ![陈式太极拳实用拳法](http://7xsur8.com1.z0.glb.clouddn.com/taiji_syqf_youku_150x150_2.png "data={'href':'#fn1'}")
     * 这部分 {'href':'#fn1'} 为 JSON字符串（，其规范格式要把单引号替换双引号，详见代码）。
     * 可见其属性字段扩展很方便。
     */
    $('img[title*="data="]').hover(function(event){
        //event.preventDefault();
        var $self = $(this);
        var $parent = $(this.parentNode);
        var $imgdata = imgdata.getData($self.attr('title'));
        //var $imgtitle = $self.attr('alt');
        //var $imglink = $self.attr('title').split('data-href:')[1];
        $self.attr('title', $self.attr('alt'));
        $parent.attr('href', $imgdata.href);
		$parent.attr('target', $imgdata.target);
        if($imgdata.sucess) {
            $self.unbind('mouseenter mouseleave'); //用 off 效果也一样，对应事件名 mouseenter mouseleave，不能用语法糖 hover。
            //$self.off('mouseenter mouseleave');
            //$self.off('hover');
        }
    });

    var imgdata = {
        originalData: "",
        href: "",
        target: "_self",
        sucess: false,
        getData: function(s) {
            this.originalData = s;
            var dataObj = {};
            try {
                dataObj = JSON.parse(this.originalData.replace('data=','').replace(/\'/g,'\"'));
                dataObj.sucess = true;
                //对象间拷贝，合并，扩展。
                imgdata = $.extend({},imgdata,dataObj);
            } catch (error) {
                
            } finally {
                console.log('imgdata.sucess: '+ imgdata.sucess);
            }
            return imgdata;
        }
    };
    
}(jQuery));