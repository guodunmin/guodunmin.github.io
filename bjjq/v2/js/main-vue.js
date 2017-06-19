var Utils = {
    isExist: function (eleId) {
        return this.getById(eleId) !== null ? true : false;
    }
    , getById: function(eleId) {
        return document.getElementById(eleId);
    }
    , getUrlParam : function (name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
    , getDataInArray: function(array, value) {
        var filterResult = array.filter(function(item, index, array){
            return item.id == value;
        });
        return filterResult;
    }
    // 不能通用
    , addItemToArray: function(array, the_context) {
        var attr = [];
        array.forEach(function(item, index) {
            //多图标志
            if(typeof item.multiImgFlag == 'undefined'){
                //item.multiImgFlag = false;
                the_context.$set(item, 'multiImgFlag', false);
            }
            if(parseInt(item.images_count) >1) {
                //item.multiImgFlag = true;
                the_context.$set(item, 'multiImgFlag', true);
            }
            //阅读量
            if(typeof item.readNum == 'undefined') {
                the_context.$set(item, 'readNum', parseInt(Math.random()*7000));
            }
            //
        });
    }

}

if(Utils.isExist('vue-page-index')) {
    var vm_index = new Vue({
        el: '#vue-page-index',
        data: {
            title: 'Hello Vue !',
            articleList: [],
            postOffset: 0
        },
        filters: {
            dateFormat: function(dateStr) {
                var dateTemp = new Date();
                dateTemp = dateStr.replace("2017年","");
                if( !isNaN(Date.parse(dateStr)) ) {
                    dateTemp = new Date(dateStr);
                }
                return dateTemp;
            }
        },
        mounted: function () {
            this.$nextTick(function(){
                this.getDataView();
            });
        },
        methods: {
            getDataView: function () {
                var _this = this;
                _this.$http.get('mock/data0.json',{'id':121}).then(function(res){
                    _this.articleList = res.body;

                }).then(function(){
                    Utils.addItemToArray(_this.articleList,_this);
                    /*_this.articleList.forEach(function(item, index) {
                        //多图标志
                        if(typeof item.multiImgFlag == 'undefined'){
                            //item.multiImgFlag = false;
                            _this.$set(item, 'multiImgFlag', false);
                        }
                        if(parseInt(item.images_count) >1) {
                            //item.multiImgFlag = true;
                            _this.$set(item, 'multiImgFlag', true);
                        }
                        //阅读量
                        if(typeof item.readNum == 'undefined') {
                            _this.$set(item, 'readNum', parseInt(Math.random()*7000));
                        }
                    });*/
                });
            }
            // isMultiImg 要在何处调用？ this.articleList 何处可以使用
            , isMultiImg: function(item) {
                if(typeof item.multiImgFlag == 'undefined'){
                    item.multiImgFlag = false;
                    this.$set(item, 'multiImgFlag', false);
                }
                if(parseInt(item.images_count) >1) {
                    this.$set(item, 'multiImgFlag', true);
                }
                return item.multiImgFlag;
            }
            , ajaxLoadPost: function() {
                var _this = this;
                var offset = this.postOffset + 20;
                var arrayTemp = [];
                _this.$http.get('mock/recommend-'+offset+'.json',{offset:""}).then(function(res){
                    if( res.status == '200') {
                        arrayTemp = res.body;
                    }
                    
                }).then(function(){
                    Utils.addItemToArray(arrayTemp, _this);
                    _this.articleList = _this.articleList.concat(arrayTemp);
                    this.postOffset = offset;
                });
            }
        }   //methods
    });
}

if(Utils.isExist('vue-page-details')) {

    var vm_details = new Vue({
        el: '#vue-page-details',
        data: {
            articleList: [],
            articleItem: {}
        },
        filters: {
            articleFormat: function(contents) {
                return "过滤器：" + contents;
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getDataView();
            });
        },
        methods: {
            getDataView: function () {
                var _this = this;
                var aid = Utils.getUrlParam('aid');
                this.$http.get('mock/data0.json').then(function(res){
                    _this.articleList = res.body;
                }).then(function(){
                    Utils.addItemToArray(_this.articleList, _this);
                    _this.articleItem = Utils.getDataInArray(_this.articleList,aid);
                });
            }
            , zoomTextBtn: function(){
                $('#art-content-inner').toggleClass('larger');
                var txt = $('span.text.textSize').text();
                $('span.text.textSize').text((txt == '大') ? '小' : '大');
            }
            , shareBtn: function(){
                $('#art-share-modal').fadeToggle(800);
            }
        }   //methods
    });
}