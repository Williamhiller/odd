/**
 * Created by WilliamHiller on 2017/12/25 0025.
 */
var normal_odds = [
    1.07,1.08,1.09,
    1.10,1.11,1.12,1.14,1.17,1.18,
    1.20,1.22,1.25,1.28,
    1.30,1.33,1.35,1.36,
    1.40,1.44,1.50,1.53,1.55,1.57,1.60,
    1.61,1.62,1.65,1.67,1.73,1.75,
    1.80,1.83,1.85,1.90,1.91,1.95,
    2.00,2.05,2.10,2.15,2.20,2.25,
    2.30,2.37,2.40,2.45,2.50,2.62,2.70,2.75,2.80,2.88,2.9,
    3.00,3.10,3.20,3.25,3.30,3.40,3.50,3.60,3.75,3.80,
    4.00,4.10,4.20,4.33,4.40,4.50,4.60,4.75,4.80,
    5.00,5.50,6.00,6.50,
    7.00,7.50,8.00,8.50,
    9.00,9.50,10.0,10.50,
    11,12,13,15,17,19,21,23,26
];



// 匹配最接近的赔率
function getSmartOdd(odd) {
    var _arr = [],
        _sort_arr,
        _val ,
        _index,
        _odd;
    _odd = parseFloat(odd);

    _arr = normal_odds.map(function (item) {
        return Math.abs(item - _odd)
    });
    _sort_arr = _arr.concat().sort(function (a,b) {
        return a-b;
    });

    // _val = _arr.reduce(function (preValue,curValue) {
    //     return preValue < curValue ? preValue : curValue;
    // });
    // _index = _arr.indexOf(_val);

    _index = _arr.indexOf(_sort_arr[0]);

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

        // 计算智能转换
        s.odd_s.win = getSmartOdd(s.odd_c.win);
        s.odd_s.draw = getSmartOdd(s.odd_c.draw);
        s.odd_s.lose = getSmartOdd(s.odd_c.lose);

        s.odd_s.kickback = getRepayRate(s.odd_s);
    };

    function getRepayRate(arr) {
        var a = arr.win,
            b = arr.draw,
            c = arr.lose;
        return a*b*c/(a*b+a*c+b*c);
    }

    s.homeIndex = '50';
    s.visitIndex = '50';
    s.historyIndex = 0;
    s.dataHomeIndex = [];
    s.dataVisitIndex = [];
    s.dataHistoryIndex = [];

    // 进球指数
    s.goalIndex = {
        average : 0,
        left : 0,
        right : 0
    };
    s.dataGoalIndex = [];

    for(var i=0;i<6;i++){
        s.dataHomeIndex.push({
            l : '',
            r : ''
        });
        s.dataVisitIndex.push({
            l : '',
            r : ''
        });
        s.dataHistoryIndex.push({
            l : '',
            r : ''
        });
        s.dataGoalIndex.push({
            l : '',
            r : ''
        });
    }

    s.$watch('dataHomeIndex',function (newVal, oldVal) {
        var homeIndex = 0;
        var weigh = 0;
        newVal.map(function (item,index) {
            var val = (item.l !== ''? item.l : item.r !== ''?item.r : 0);
            homeIndex += val * (6-index)
        });
        s.homeIndex = (homeIndex*100/63).toFixed(0);
    },true);
    s.$watch('dataVisitIndex',function (newVal, oldVal) {
        var visitIndex = 0;
        newVal.map(function (item,index) {
            var val = (item.l !== ''? item.l : item.r !== ''?item.r : 0);
            visitIndex += val * (6-index)
        });
        s.visitIndex = (visitIndex*100/63).toFixed(0);
    },true);

    s.$watch('dataHistoryIndex',function (newVal, oldVal) {
        var hitoryIndex = 0;
        newVal.map(function (item,index) {
            var val = (item.l !== ''? item.l : item.r !== ''?item.r : 0);
            hitoryIndex += val * (6-index)
        });
        s.historyIndex = (hitoryIndex*100/21).toFixed(0);
    },true);

    s.$watch('dataGoalIndex',function (newVal, oldVal) {
        var left = [];
        var right = [];
        var ave_l =0 , imp_l =0;
        var ave_r =0 , imp_r =0;
        newVal.map(function (item,index) {
            if(item.l !== '') {
                left.push(item.l)
            }
            if(item.r !== '') {
                right.push(item.r)
            }
        });
        left.map(function (item,index) {
            ave_l += item*(left.length - index);
            imp_l += index+1;
        });
        right.map(function (item,index) {
            ave_r += item*(right.length - index);
            imp_r += index+1;
        });

        s.goalIndex.left = ave_l/imp_l;
        s.goalIndex.right = ave_r/imp_r;


        if(s.goalIndex.left.toString() === 'NaN') {
            s.goalIndex.left = 0;
        }
        if(s.goalIndex.right.toString() === 'NaN') {
            s.goalIndex.right = 0;
        }

        s.goalIndex.average = (s.goalIndex.left + s.goalIndex.right)/2;

    },true);

}]);



