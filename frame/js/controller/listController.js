/**
 * Created by Williamhiler on 2016/11/4.
 */

angular.module('list.controller', [])
    .controller('ListCtrl',['$scope',"$http",function(s,$http){

        $http.get('/getData?id=78654').then(function (res) {
            var data = res.data;
            data = data.filter(function (item) {
                return item.type === "滚" && item.time !== "中场"
            });
            var newArr = [];
            var timeArr = [];
            data.forEach(function (item) {
                if(item.type === "滚" && item.time !== "中场") {
                    if(timeArr[item.time] === undefined) {
                        timeArr.push(item.time);
                        newArr.push(item);
                    }
                }
            });


            console.log(newArr)
        },function (res) {
            console.log(res)
        });

        var doc = document;
        var loadScript = function (url, callback) {
            var gameScript = doc.getElementById("gameScript");
            if(gameScript) {
                doc.body.removeChild(gameScript);
            }

            var script = doc.createElement("script");
            script.type = "text/javascript";
            script.id = "gameScript";
            if (typeof(callback) != "undefined") {
                if (script.readyState) {
                    script.onreadystatechange = function() {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {
                    script.onload = function() {
                        callback();
                    };
                }
            }
            script.src = url;
            doc.body.appendChild(script);
        };

        s.data = {};
        s.data.gameId = "";
        s.data.matchname = "";
        s.data.hometeam = "";
        s.data.guestteam = "";
        s.data.infos = [];

        var hsDetail = {};
        s.getData = function () {
            loadScript("http://1x2d.win007.com/"+s.data.gameId+".js",function () {
                s.data.matchname = matchname_cn;
                s.data.hometeam = hometeam_cn;
                s.data.guestteam = guestteam_cn;

                if (typeof (gameDetail) != "undefined") {
                    for (var i = 0; i < gameDetail.length; i++) {
                        var data = gameDetail[i].split('^');
                        var oddsID = parseInt(data[0]);
                        if (!hsDetail[oddsID]) {
                            hsDetail[oddsID] = data[1];
                        }
                    }
                }

                var len = game.length;
                var infos = [];
                for(var j = 0;j < 30 ; j++) {
                    var info = {};
                    var gameItem = game[j].split("|");
                    var detailItem = hsDetail[gameItem[1]].split(";");
                    info.name = gameItem[21];
                    info.home = gameItem[3];
                    info.draw = gameItem[4];
                    info.guest = gameItem[5];
                    info.date = detailItem[detailItem.length-2].split("|")[3];

                    infos.push(info);
                }
                infos.sort(function (a,b) {
                    var dateA = new Date("2018/" + a.date.replace(/-/g,"/"));
                    var dateB = new Date("2018/" + b.date.replace(/-/g,"/"));
                    return dateA.valueOf() - dateB.valueOf()
                });

                s.$apply(function () {
                    s.data.infos = infos;
                });

            })
        };

    }]);