/**
 * Created by Administrator on 2017/6/21.
 */
;(function ( win, doc, undefined) {
    var null_obj = {};
    function UrlParams ( opt ) {
        this.options = opt || null_obj;
        this.init();
    }
    UrlParams.prototype = {
        constructor: UrlParams,
        /**
         * 初始化，获取参数
         * */
        init: function () {
            var str = win.location.search, arr, _this = this;
            if(!str) return this;
            this.query = this.options.query || null_obj;
            arr = str.substr(1).split('&');
            arr.forEach( function ( item ) {
                var sub_arr = item.split('=');
                _this.query[sub_arr[0]] = sub_arr[1];
            });
            return this;
        },
        /**
         * 添加参数
         * */
        add: function ( param_key, param_value) {
            if ( !param_value ) return this;
            this.query[param_key] = param_value;
            win.location.search = _jointStrByQuery(this);
            return this;
        }
    };
    /**拼接参数字符串*/
    function _jointStrByQuery( _this ) {
        var str = '?';
        for ( var key in _this.query) {
            str += key + '=' + _this.query[key] + '&'
        }
        return str;
    }
    win.UrlParams = function ( options ) {
        return new UrlParams( options );
    }
})( this, document );