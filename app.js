/**
 * Created by Williamhiler on 2016/11/22.
 */

var express = require("express");
var app = express();
var getPostion = require('./spider/getPostion');
app.use(express.static('public'));
app.get("/getData",function (req, res) {

    var id = req.query.id;
    getPostion(id).then(function (data) {
        res.json(data)
    });
});
app.listen(8081);
