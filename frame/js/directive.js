/**
 * Created by Williamhiler on 2016/11/17.
 */

angular.module('global.directive',[])
    //输入框清空
    .directive('inputClear', ['safeApply','$timeout',function(safeApply,$timeout) {
        return {
            restrict : 'EA',
            replace : true,
            transclude : true,
            scope : {
                text : '='
            },
            template : '<i ng-click="clear()" ng-show="showClear" class="icon icon-clear"></i>',
            link : function(scope, element, attrs) {
                scope.showClear = false;
                var input = element.parent().find("input");
                function isShow() {
                    var text = input.val();
                    if(text !== undefined && text!== ""){
                        scope.showClear = true
                    }else {
                        scope.showClear = false;
                    }
                }
                input.on('input',function () {
                    safeApply(scope,isShow);
                });
                input.on('focus',function () {
                    var target = this;
                    $timeout(function () {
                        target.scrollIntoViewIfNeeded();
                    },100)
                    safeApply(scope,isShow);
                });
                input.on('blur',function () {
                    safeApply(scope,function () {
                        scope.showClear = false;
                    });
                });
                scope.clear = function(){
                    scope.text = "";
                    safeApply(scope,isShow);
                };
            }
        };
    }])
    //创建订单输入金额，只能输入整数
    .directive('intInput',[function() {
        return {
            restrict : 'EA',
            scope : {
                intInput : "=ngModel"
            },
            link : function(scope,element,attr) {
                element.on("blur",function () {
                    var parseVal = Math.abs(parseInt(scope.intInput));
                    if(typeof parseVal === "number" && !isNaN(parseVal)){
                        scope.intInput = parseVal;
                    }else{
                        scope.intInput = "";
                        element[0].value = "";
                    }
                });
            }
        };
    }])
    //密码明文和密文
    .directive('eyeIcon', function() {
        return {
            restrict : 'EA',
            replace : true,
            transclude : true,
            scope : {
            },
            template : '<i ng-click="showPwd()" class="icon" ng-class="{true:\'icon-password-on\',false:\'icon-password-off\'}[pwdShow]"></i>',
            link : function(scope, element, attrs) {
                scope.pwdShow = false; //默认闭眼
                var text = element.parent().find("input");
                scope.showPwd = function(){
                    scope.pwdShow = !scope.pwdShow;
                    text[0].type = scope.pwdShow? "text":"password";
                }
            }
        };
    })

    //时间倒计时
    .directive('countDown',["$interval",function($interval) {
        return {
            restrict : 'EA',
            replace : true,
            scope : {
                time : '='
            },
            template : '<span class="c-orange" ng-bind="time_text"></span>',
            link : function(scope) {
                var time = parseInt(scope.time);
                $interval(function () {
                    time--;
                    scope.time--
                    var h = parseInt(time/60/60);
                    var m = parseInt((time-h*3600)/60);
                    var s = parseInt((time-h*3600)%60);
                    var arr = [h,m,s];
                    var countDown = arr.map(function (n) {
                        n = n.toString();
                        return n[1] ? n : '0' + n
                    }).join(":");
                    scope.time_text = countDown;
                },1000)
            }
        };
    }])
    //图片懒加载
    .directive('imgLazyLoad',["$interval",function($interval) {
        return {
            restrict : 'EA',
            link : function(scope,element,attr) {
                var img = new Image();
                img.src = attr.lazySrc;
                img.onload = function() {
                    element.attr('src',this.src)
                }
            }
        };
    }])
    //图片加载失败显示
    .directive('failLoad',[function() {
        return {
            restrict : 'EA',
            link : function(scope,element,attr) {
                var failedSrc = "frame/images/failed_view.png";
                element.error(function () {
                    element.attr("src",failedSrc);
                })
            }
        };
    }]);