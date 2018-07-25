/**
 * Created by Williamhiler on 2016/11/22.
 */

var phantom = require('phantom');

phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open("http://www.okooo.com/").then(function(status) {
            page.property('viewportSize',{width: 1024, height: 800});

            page.evaluate(function () {
                console.log(90)
            })
            console.log(status);
            if(status === "success"){
                console.log(page);
            }else {
                console.log("Page failed to load.");
            }
            ph.exit(0);
        });
    });
});


// var page = require('webpage').create();
// phantom.outputEncoding="utf-8";
//
// page.viewportSize = { width: 1024, height: 800 };
// page.settings = {
//     userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'
// };
// page.open('http://www.okooo.com/', function (status) {
//
//
//     console.log(status);
//     if(status === "success"){
//         console.log(page.title);
//     }else {
//         console.log("Page failed to load.");
//     }
//     phantom.exit(0);
//
// });


