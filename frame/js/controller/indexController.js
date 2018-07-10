/**
 * Created by Williamhiler on 2016/11/4.
 */

angular.module('index.controller', [])
    .controller('GoalCtrl',['$scope',"popupService","$state",function(s,popupService,$state){
        s.dataHome = [{},{},{},{},{},{}];
        s.dataVisit = [{},{},{},{},{},{}];
        s.dataHistory = [{},{},{},{},{},{}];

        s.page = {};
        s.page.position = '';

        s.resHome = {};
        s.resVisit = {};
        s.resHistory = {};
        s.resAve = {};
        s.resAsian = {};

        function calc(data,res) {
            var all = 0,all_index = 0,hard = 0,hard_index = 0;

            s[data].forEach(function (item,index) {
                var itemGoals = item.l + item.r;
                var position = parseFloat(s.page.position || 2.5);
                var pos;
                all += itemGoals;

                if(itemGoals - position > 0.5) {
                    pos = 1;
                }else if(itemGoals - position === 0.25){
                    pos = 0.75;
                }else if(itemGoals - position === 0){
                    pos = 0.5;
                }else if(itemGoals - position === -0.25){
                    pos = 0.25;
                }else if(itemGoals - position < -0.5){
                    pos = 0;
                }
                all_index += pos;
                hard += itemGoals * (6-index);
                hard_index += pos*(6-index)
            });

            s[res].easyIndex = all_index / 6;
            s[res].easyGoals = all / 6;

            s[res].hardIndex = hard_index / 21;
            s[res].hardGoals = hard / 21;
        }
        
        function calcPos(level,type) {
            var easyGoals = s.resAve[level];
            var basic = easyGoals*100/25;
            // 基于95返还率

            var up = 95+100*(Math.round(basic) - basic)/2;
            var down = 95-100*(Math.round(basic) - basic)/2;

            s.resAsian[type] = up.toFixed(0)/100 + "&nbsp;&nbsp;" + Math.round(basic)*0.25 + "&nbsp;&nbsp;"+ down.toFixed(0)/100;
        }

        s.calc = function () {
            calc('dataHome','resHome');
            calc('dataVisit','resVisit');
            if(s.dataHistory[0].l) {
                calc('dataHistory','resHistory');
            }

            s.resAve.easyIndex = (s.resHome.easyIndex + s.resVisit.easyIndex)/2;
            s.resAve.easyGoals = (s.resHome.easyGoals + s.resVisit.easyGoals)/2;
            s.resAve.hardIndex = (s.resHome.hardIndex + s.resVisit.hardIndex)/2;
            s.resAve.hardGoals = (s.resHome.hardGoals + s.resVisit.hardGoals)/2;

            calcPos("easyGoals","easy");
            calcPos("hardGoals","hard");
        }
    }])
    .controller('PullCtrl',['$scope',"popupService","$state",function(s,popupService,$state){

        s.homeIndex = '50';
        s.visitIndex = '50';
        s.historyIndex = 0;
        s.dataHomeIndex = [];
        s.dataVisitIndex = [];
        s.dataHistoryIndex = [];

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
        }

        s.$watch('dataHomeIndex',function (newVal) {
            var homeIndex = 0;
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

    }]);