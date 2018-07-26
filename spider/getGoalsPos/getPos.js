/**
 * Created by Williamhiler on 2016/11/22.
 */

var getAllMatch = require("./getAllMatch");

getAllMatch('http://zq.win007.com/cn/League/2017-2018/36.html').then(function (dataAll) {
    console.log(dataAll.jh)
});

/**
 * var arrTeam = [ [19, '阿森纳', '阿仙奴','Arsenal', '阿仙奴', 'images/2013121220126.png', 0]];
 * var arrLeague = [36, '英格兰超级联赛'];
 * jh["R_1"] = [[1394661, 36, -1, '2017-08-12 02:45', 19, 59, '4-3', '2-2', '5', '12', 1.25, 0.5, '3', '1/1.5', 1, 1, 1, 1,0, 0, '', '5', '12']];
 * jh数组,依次是比赛代码0，联赛代码1，“”2，时间3，主队4，客队5，全场6，半场7，主队名次8，客队名次9，让球盘口10，半场让球11，全场大小12，半场大小13
 */






