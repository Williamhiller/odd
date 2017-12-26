/**
 * Created by WilliamHill on 2017/12/25 0025.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope',function(s) {
    var Data = function () {
        return {
            win : '',
            draw : '',
            lose :''
        }
    };
    s.odd = {
        win : '',
        draw : '',
        lose :'',
        kickback : ''
    };
    s.odd_c = {
        win : '',
        draw : '',
        lose :'',
        kickback : ''
    };
    s.prob = new Data();

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
        var _val;
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
    };

    function checkVal(val) {

        if(val !== null && typeof val !== "undefined" && val !== "") {
            return true;
        }

        return false;
    }
}]);


