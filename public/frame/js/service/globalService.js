/**
 * Created by Williamhiler on 2016/11/4.
 */

angular.module('global.service',[])

    .factory('validateService',['$timeout','$ionicPopup',function($timeout,$ionicPopup){
        var format = {
            has: {
                special: /[。~\+\\\/\?\|:\.<>{}()';="]/,
                number: /[0-9]+/,
                letter: /[a-zA-Z]+/,
                lowerletter: /[a-z]+/,
                userName: /^[\u4E00-\u9FA5]{2,5}$/,
                idcard: /(^\d{15}$)|(^\d{17}([0-9]|x|X)$)/
            }
        };
        var validate={
            mobileNo:{
                formats: ["require", "phoneFormat"],
                messages: ["手机号不能为空", "请输入正确的手机号码"]
            },
            tel : {
                formats: ["telFormat"],
                messages: ["请输入正确的电话号码,区号+电话号码,如:021-4009201239"]
            },
            password: {
                formats: ["require", "passwordFormat"],
                messages: ["密码不能为空", "密码需为6-16位字母和数字的组合"]
            },
            phoneCode: {
                formats: ["require", "phoneCodeFormat"],
                messages: ["验证码不能为空", "验证码必须是6位数字"]
            },
            tradePassword:{
                formats: ["require", "tradePasswordFormat"],
                messages: ["交易密码不能为空", "密码需为6-16位字母和数字的组合"]
            },
            amount:{
                formats: ["require", "amountFormat"],
                messages: ["金额不能为空", "金额格式不正确"]
            },
            merchantLoginId:{
                formats: ["require"],
                messages: ["商户名不能为空"]
            },
            userName:{
                formats: ["require"],
                messages: ["用户名不能为空"]
            },
            realName:{
                formats: ["require"],
                messages: ["姓名不能为空"]
            },
            idcard:{
                formats: ["require", "idcardFormat"],
                messages: ["身份证号不能为空", "请填写正确的身份证号"]
            },
            bankcard:{
                formats: ["require", "bankcardFormat"],
                messages: ["银行卡号不能为空", "请填写正确的银行卡号"]
            },
            bankId:{
                formats: ["require"],
                messages: ["请选择所属银行"]
            },
            email:{
                formats: ["require", "emailFormat"],
                messages: ["邮箱不能为空", "请填写正确的邮箱地址"]
            },
            method:{
                baseCheck:function(checkValue,formats,message){
                    for(var i=0;i<formats.length;i++){
                        //动态调用验证
                        if (typeof this[formats[i]] == "function"){
                            if(!this[formats[i]](checkValue)){
                                return message[i];
                            }
                        }
                    }
                    return null;
                },
                require :function(val){
                    return val!=null&&val!="";
                },
                phoneFormat : function(val){
                    var reg = /^(((12[0-9]{1})|(13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(147))+\d{8})$/;
                    return val.match(reg)!=null
                },
                telFormat : function(val){
                    var reg = /^\d{2,4}-?\d{3,10}$/;
                    return val.match(reg)!=null;
                },
                passwordFormat : function(val){
                    var reg01 = format.has.special ; //特殊字符
                    var reg02 = format.has.number ;  //数字
                    var reg03 = format.has.letter;  //英文字母
                    return (val.length>=6&&val.length<=16)&& (val.match(reg01)!=null||val.match(reg02)!=null)&&(val.match(reg02)!=null||val.match(reg03)!=null)&&(val.match(reg01)!=null||val.match(reg03)!=null);
                },
                phoneCodeFormat : function(val){
                    return val.toString().length === 6;
                },
                tradePasswordFormat :function(val){
                    var reg01 = format.has.special ; //特殊字符
                    var reg02 = format.has.number ;  //数字
                    var reg03 = format.has.letter;  //英文字母
                    return (val.length>=6&&val.length<=16)&& (val.match(reg01)!=null||val.match(reg02)!=null)&&(val.match(reg02)!=null||val.match(reg03)!=null)&&(val.match(reg01)!=null||val.match(reg03)!=null);
                },
                amountFormat : function(val){
                    val = val.toString();
                    var reg = /^-?([1-9]\d*|[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
                    return val.match(reg)!=null
                },
                userNameFormat : function(val){
                    return val.match(format.has.userName)!=null;
                },
                idcardFormat : function(val){
                    return val.match(format.has.idcard)!=null;
                },
                bankcardFormat : function(val){
                    // 只接受空格、数字和破折号
                    if ( /[^0-9 \-]+/.test(val)) {
                        return false;
                    }
                    var nCheck = 0,
                        nDigit = 0,
                        bEven = false,
                        n, cDigit;

                    val = val.replace(/\D/g, "");

                    // 最小和最大长度验证
                    if (val.length < 13 || val.length > 19) {
                        return false;
                    }
                    for (n = val.length - 1; n >= 0; n--) {
                        cDigit = val.charAt(n);
                        nDigit = parseInt(cDigit, 10);
                        if ( bEven ) {
                            if ((nDigit *= 2) > 9) {
                                nDigit -= 9;
                            }
                        }
                        nCheck += nDigit;
                        bEven = !bEven;
                    }

                    return (nCheck % 10) === 0;
                },
                emailFormat : function(val){
                    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    return val.match(reg);
                }
            }
        }
        return {
            check: function (validateForm,validateGroup) {
                for (var i = 0; i < validateGroup.length; i++) {
                    //var _validate = validateGroup[i]
                    var checkName = validateGroup[i];
                    var checkValue = validateForm[checkName];
                    var checkValidate = validate[checkName];
                    var formats = checkValidate.formats;
                    var message = checkValidate.messages
                    var err_message = validate.method.baseCheck(checkValue,formats,message);
                    if(err_message!=null){
                        return err_message;
                    };
                }
            }
        }
    }])
    // 弹出样式
    .factory('popupService',['$ionicPopup','$timeout',function ($ionicPopup,$timeout) {
        return {
            alert : function (content,title,okText) {
                var t = title || "温馨提示";
                var ok = okText || "确定";
                var alertPopup = $ionicPopup.alert({
                    title : t,
                    template : content,
                    okText : ok,
                    okType : 'button-light'
                });
                // $timeout(function() {
                //     // alertPopup.close(); //1秒后关闭弹出
                // }, 5000);
                // $timeout(function() {
                //     document.onclick = function () {
                //         alertPopup.close();
                //         document.onclick = null
                //     }
                // },100);
                return alertPopup;
            },
            confirm : function (content,title,ok,cancel) {
                var title = title || "温馨提示";
                var okText = ok || "确定";
                var cancelText = cancel || "取消";
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: content,
                    okText: okText,
                    okType: 'button-light',
                    cancelText: cancelText,
                    cancelType: 'button-light'
                });
                return confirmPopup;
            },
            show : function () {
                var showPopup = $ionicPopup.show({
                    title : "温馨提示！",
                    subTitle : "",
                    template : '<input type="password" ng-model="data.data" maxlength="20">',
                    buttons : [
                        {text : "取消"},
                        {
                            text : "确定",
                            type : "button-positive",
                            onTap: function(e) {
                                if (!$scope.data.data) {
                                    // 不允许用户关闭，
                                    e.preventDefault();
                                } else {
                                    return $scope.data.data;
                                }
                            }
                        }
                    ]
                });
                return showPopup;
            }
        }
    }])

    //禁止乱使用$apply ，防止报错
    .factory('safeApply', [function() {
        return function(scope, fn) {
            var phase = scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if (fn) {
                    scope.$eval(fn);
                }
            } else {
                if (fn) {
                    scope.$apply(fn);
                } else {
                    scope.$apply();
                }
            }
        }
    }]);