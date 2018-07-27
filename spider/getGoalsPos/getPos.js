/**
 * Created by Williamhiler on 2016/11/22.
 */

var getAllMatch = require("./getAllMatch");

getAllMatch('http://zq.win007.com/cn/League/2017-2018/36.html').then(function (pageData) {

    // 暂不分轮次
    // 目标：解析所有数据，导出到本地json文件,包含联赛平均大小球水位，每个球队的平均大小球水位，以及在此基础上更进一步主客场的水位，4个数据
    // 设计表思路，首先两个数组，一个存储全部球队主场，一个是全部客场，以及单独的一个数组。
    var allData = {};
    allData.fullCourt = [];
    allData.halfCourt = [];
    allData.homeFullCourt = {};
    allData.homeHalfCourt = {};
    allData.guestFullCourt = {};
    allData.guestHalfCourt = {};

    //字典
    var teamDic = {};
    pageData.arrTeam.forEach(function (item) {
        teamDic[item[0]] = item[1];
        allData.homeFullCourt[item[0]] = [];
        allData.homeHalfCourt[item[0]] = [];
        allData.guestFullCourt[item[0]] = [];
        allData.guestHalfCourt[item[0]] = [];
    });

    /**
     * var arrTeam = [ [19, '阿森纳', '阿仙奴','Arsenal', '阿仙奴', 'images/2013121220126.png', 0]];
     * var arrLeague = [36, '英格兰超级联赛'];
     * jh["R_1"] = [[1394661, 36, -1, '2017-08-12 02:45', 19, 59, '4-3', '2-2', '5', '12', 1.25, 0.5, '3', '1/1.5', 1, 1, 1, 1,0, 0, '', '5', '12']];
     * jh数组,依次是比赛代码0，联赛代码1，“”2，时间3，主队4，客队5，全场6，半场7，主队名次8，客队名次9，让球盘口10，半场让球11，全场大小12，半场大小13
     */

    // 循环，对每个模块进行筛选
    Object.keys(pageData.jh).forEach(function (key) {
        var round = pageData.jh[key];
        round.forEach(function (item) {
            var full = getNumberPos(item[12]),
                half = getNumberPos(item[13]);

            allData.fullCourt.push(full);
            allData.halfCourt.push(half);

            allData.homeFullCourt[item[4]].push(full);
            allData.homeHalfCourt[item[4]].push(full);

            allData.guestFullCourt[item[5]].push(full);
            allData.guestHalfCourt[item[5]].push(full);
        })
    });

    console.log("联赛 \n    全场: "+getAve(allData.fullCourt) +"\n    半场: " + getAve(allData.halfCourt));

    Object.keys(teamDic).forEach(function (key) {
        var home = allData.homeFullCourt[key];
        var guest = allData.guestFullCourt[key];

        console.log(teamDic[key]+ "\n    主: " + getAve(home) +"\n    客: " + getAve(guest))
    });

    return allData;
});


/**
 * 分数盘口转小数盘口
 * @param deno 字符串形式的分数盘
 * @returns {number}
 */
function getNumberPos(deno) {
    var pos = 0;
    var arr = deno.split("/");
    arr.forEach(function (item) {
        pos += parseFloat(item);
    });

    return pos/arr.length;
}

function getAve(arr) {
    var len = arr.length;
    var sum = 0;

    arr.forEach(function (item) {
        sum += item;
    });

    return (sum/len).toFixed(2);
}







