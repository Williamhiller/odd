/**
 * Created by Williamhiler on 2016/11/22.
 */

var phantom = require('phantom');
var _ph, _page, _outObj;

var init = module.exports = function () {

    var url = 'http://zq.win007.com/cn/League/2017-2018/36.html';
    phantom.create().then(function (ph) {
        _ph = ph;
        return _ph.createPage();
    }).then(function (page) {
        _page = page;
        _page.setting('userAgent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36');

        return _page.open(url);
    }).then(function (status) {
        console.log(status);

        _page.evaluate(function () {
            return jh;
        }).then(function (jh) {
            for (var key in jh) {
                console.log(key)
            }

            _page.close();
            _ph.exit(0);
        });

    }).catch(function (e) {
        console.log(e)
    });
};
init();



