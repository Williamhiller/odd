/**
 * Created by Williamhiler on 2016/11/17.
 */

angular.module('global.filter',[])
// 自定义过滤器
    .filter("splitBy", [function () {
        return function (input, type, value) {
            function phone(type) {
                return type = type || " ", input.replace(/\s/g, "").replace(/(\d{3})/, "$1" + type).replace(/(\d{4})/, "$1" + type)
            }
            function bankcard(type) {
                return type = type || " ", input.replace(/\s/g, "").replace(/(\d{4})/g, "$1" + type)
            }
            //手机号码格式处理
            function phoneReplace(type) {
                return type = input.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
            }
            //身份证号格式处理
            function iDcardReplace(type) {
                return type = input.replace(/(\d)(\d+)([\d|x])/i,"$1************$3");
            }
            //姓名格式处理
            function realnameReplace(type){
                return type = input.substr(0,input.length-1).replace(/[\u4E00-\u9FA5]/g,"*") + input.substr(input.length-1,input.length);
            }
            //数字向下取值
            function floor(type) {
                return type = Math.floor(input);
            }
            //中文小括号转换英文过滤
            function parenthesis(type) {
                return type = input.replace(/[\uff08]/g,"(").replace(/[\uff09]/g,")")
            }
            //时间格式处理
            function translateTime(type) {
                var h = parseInt(input/60/60);
                var m = parseInt((input-h*3600)/60);
                var s = parseInt((input-h*3600)%60);
                return type = h +"小时"+ m +"分钟"+ s +"秒"
            };
            function numToCny(type) {
                var num = input;
                var strOutput = "";
                var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
                if(num.toString().length>12){
                    num = num.substring(0,11);
                }
                num += "00";
                var intPos = num.indexOf('.');
                if (intPos >= 0) {
                    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
                }
                strUnit = strUnit.substr(strUnit.length - num.length);
                for (var i=0; i < num.length; i++) {
                    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
                }
                var type = strOutput.replace(/^零角零分$/, '零元').replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
                return type;
            };
            return input = input ? "" + input : "", "phone" == type ? phone(value) : "bankcard" == type ? bankcard(value) : "phoneReplace" == type ? phoneReplace(value) :"realnameReplace" == type ? realnameReplace(value) : "iDcardReplace" == type ? iDcardReplace(value) : "floor" == type ? floor(value) :"parenthesis" == type?parenthesis(value):"numToCny" == type?numToCny(value):"";

        };
    }])
    ;