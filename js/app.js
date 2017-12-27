/**
 * Created by WilliamHiller on 2017/12/25 0025.
 */
var normal_odds = [
    1.07,1.08,1.09
    ,1.10,1.11,1.12,1.14,1.17,1.18
    ,1.20,1.22,1.25,1.28
    ,1.30,1.33,1.35,1.36
    ,1.40,1.44,1.50,1.53,1.55,1.57,1.60
    ,1.61,1.62,1.65,1.67,1.73,1.75
    ,1.80,1.83,1.85,1.90,1.91,1.95
    ,2.00,2.05,2.10,2.15,2.20,2.25
    ,2.30,2.37,2.40,2.45,2.50,2.62,2.70,2.75,2.80,2.88,2.9
    ,3.00,3.10,3.20,3.25,3.30,3.40,3.50,3.60,3.75,3.80
    ,4.00,4.10,4.20,4.33,4.50,4.60,4.75,4.80
    ,5.00,5.50
    ,6.00,6.50
    ,7.00,7.50
    ,8.00,8.50
    ,9.00,9.50
    ,10.0,10.50
    ,11,12,13,15,17,19,21,23,26
];
// 匹配最接近的赔率
function getSmartOdd(odd) {
    var _arr = [],
        _val ,
        _index,
        _odd;
    _odd = parseFloat(odd);

    _arr = normal_odds.map(function (item) {
        return Math.abs(item - _odd)
    });
    _val = _arr.reduce(function (preValue,curValue,index,array) {
        return preValue < curValue ? preValue : curValue;
    });
    _index = _arr.indexOf(_val);

    return normal_odds[_index]
}
// 检测合法性
function checkVal(val) {

    if(val !== null && typeof val !== "undefined" && val !== "") {
        return true;
    }else {
    }

    return false;
}

var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope',function(s) {
    var Data = function () {
        return {
            win : '',
            draw : '',
            lose :'',
            kickback : ''
        }
    };
    s.odd = new Data();
    s.odd_c = new Data();
    s.odd_s = new Data();
    s.prob = {
        win : '',
        draw : '',
        lose :''
    };
    // 计算返还率以及概率
    s.oddChange = function () {
        var a = s.odd.win,
            b = s.odd.draw,
            c = s.odd.lose;
        var curve;
        if(checkVal(a) && checkVal(b) && checkVal(c)) {
            curve = a*b*c/(a*b+a*c+b*c);
            s.odd.kickback = curve;

            s.prob.win = curve/a;
            s.prob.draw = curve/b;
            s.prob.lose = curve/c;
        }
    };
    s.oddTransfer = function (val) {
        var _val , a , b , c;
        if(checkVal(val) && checkVal(s.odd.kickback)) {
            _val = parseFloat(val)/100;
        }else {
            return;
        }

        s.odd_c.kickback = val;

        // 计算转换后的赔率
        s.odd_c.win = _val/s.prob.win;
        s.odd_c.draw = _val/s.prob.draw;
        s.odd_c.lose = _val/s.prob.lose;

        // 计算智能转换
        s.odd_s.win = getSmartOdd(s.odd_c.win);
        s.odd_s.draw = getSmartOdd(s.odd_c.draw);
        s.odd_s.lose = getSmartOdd(s.odd_c.lose);

        a = s.odd_s.win;
        b = s.odd_s.draw;
        c = s.odd_s.lose;

        s.odd_s.kickback = a*b*c/(a*b+a*c+b*c);
    };
}]);


