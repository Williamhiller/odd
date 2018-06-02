/**
 * Created by Williamhiler on 2016/11/4.
 */

angular.module('list.controller', [])
    .controller('ListCtrl',['$scope',function(s){
        var doc = document;
        var gameScript = doc.getElementById("gameScript");
        if(gameScript) {
            doc.body.removeChild(gameScript);
        }

        var loadScript = function (url, callback) {
            var script = document.createElement("script");
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

        s.gameId = "";
        s.matchname = "";
        s.hometeam = "";
        s.guestteam = "";
        s.game = [];
        s.gameDetail = [];
        s.getData = function () {
            loadScript("http://1x2d.win007.com/"+s.gameId+".js",function () {
                s.matchname = matchname_cn;
                s.hometeam = hometeam_cn;
                s.guestteam = guestteam_cn;
                s.game = game;
                s.gameDetail = gameDetail;
            })
        }

    }]);