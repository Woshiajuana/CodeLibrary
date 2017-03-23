/**
 * Created by Administrator on 2017/3/23.
 */
;(function (win,doc,undefiend) {
    var touchStartEvent = '';
    var touchMoveEvent = '';
    function DragMove (touchEle,targetEle){
        if(!touchEle) return this;
        if(!targetEle) targetEle = touchEle;
        this.touchEle = touchEle;
        this.targetEle = targetEle;
        this.WIDTH = document.documentElement.clientWidth;
        this.HEIGHT = document.documentElement.clientHeight;
        this.init();
    }
    DragMove.prototype = {
        //初始化
        init: function () {
            _addTouchEvent(this);
        }
    };
    var _addTouchEvent = function (_this) {
        touchMoveEvent = function (event) {
            event.preventDefault();
            // 如果这个元素的位置内只有一个手指的话
            if(event.targetTouches.length != 1) return;
            var touch = event.targetTouches[0]; // 把元素放在手指所在的位置
            var max_width = _this.WIDTH - _this.targetEle.offsetWidth;
            var max_height = _this.HEIGHT - _this.targetEle.offsetWidth;
            var drag_width = touch.pageX - _this.offLeft;
            var drag_height = touch.pageY - _this.offTop;
            if (drag_width <= 0) {
                drag_width = 0;
            } else if (drag_width >= max_width) {
                drag_width = _this.WIDTH - _this.targetEle.offsetWidth;
            }
            if (drag_height <= 0) {
                drag_height = 0;
            } else if (drag_height >= max_height) {
                drag_height = _this.HEIGHT - _this.targetEle.offsetWidth;
            }
            _this.targetEle.style.left = drag_width + 'px';
            _this.targetEle.style.top = drag_height + 'px';
        };
        touchStartEvent = function (event) {
            event.preventDefault();
            //元素距离原点中心的距离
            var touch = event.targetTouches[0];
            _this.offLeft = touch.pageX - _this.targetEle.offsetLeft;
            _this.offTop = touch.pageY - _this.targetEle.offsetTop;
        };
        _this.touchEle.addEventListener('touchstart',touchStartEvent,false);
        _this.touchEle.addEventListener('touchmove',touchMoveEvent,false);
    };
    win.DragMove = function (touchEle,targetEle) {
        return new DragMove(touchEle,targetEle);
    }
})(this,document);