/**
 * Created by Williamhiler on 2016/11/4.
 */

angular.module('index.controller', [])
    .controller('IndexCtrl',['$scope',"popupService","$state",function(s,popupService,$state){

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