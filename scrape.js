//use the google search casperjs thing that you got from subelsky or whoever (currently in your clinical informatics folder, i think)                                                                            

var casper = require('casper').create({
    //verbose: true,
    logLevel: 'debug',
    pageSettings: {
        //loadImages: false, // The WebPage instance used by Casper will                                                                                                                              
        //loadPlugins: false, // use these settings                                                                                                                                                    
        userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36'
    }
});

var utils = require('utils');

var x = require('casper').selectXPath;

url= casper.cli.args;//.join("/");
console.log(url);

casper.start(String(url));

//var search = casper.cli.args.join(" ");


/**
casper.then(function() {
    this.sendKeys(x("//*[@id='gbqfq']"), search)
});

casper.thenClick(x("//*[@id='gbqfsa']"), function() {
    //console.log("clicking the accept button")
});

//*[@id="gbqfb"]/span

casper.wait(2000, function() {
    //console.log("taking a picture")
    casper.capture('google1.png');
});

casper.wait(1000, function() {
    ////console.log("taking a picture")
    ////casper.capture('google2.png');
    var body = casper.evaluate(function(html) {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        },
        this.getHTML(x("//*[@id='rcnt']")));
    console.log(body); ////*[@id='main-content']
});
**/

/**casper.thenClick(x("//*[@id='rso']/div[2]/li[1]/div/h3/a"), function() {
    //console.log("clicking the accept button")
});

**/
casper.wait(5000, function() {
    //console.log("taking a picture")
    casper.capture('physiobank.png');
    //var body = casper.evaluate(function(html) {
    //        var tmp = document.createElement("DIV");
    //        tmp.innerHTML = html;
    //        return tmp.textContent || tmp.innerText || "";
    //    },
    //    this.getHTML(x("/html/body/pre/text()[1]")));
    //var clean_body = body;
    casper.echo(casper.fetchText("body")); ////*[@id='main-content']
});



/**
casper.evaluate(function(username, password) {
    document.querySelector('#username').value = username;
    document.querySelector('#password').value = password;
    document.querySelector('#submit').click();
}, 'sheldon.cooper', 'b4z1ng4');
**/

/**
casper.thenClick(x("//*[@id='fh-tabs']/li[2]/a/span"), function() {
    //console.log("clicking the accept button")
});

casper.wait(1000, function() {
    //console.log("taking a picture")
    //casper.capture('snomed3.png');
});


casper.then(function()
{
    content = casper.cli.args.join(" ")
    this.sendKeys(x("//*[@id='fh-search_canvas-searchBox']"), content)
})

casper.wait(1000, function() {
        //console.log("taking a picture")
        //casper.capture('snomed4.png');
});

casper.thenClick(x("//*[@id='fh-search_canvas-resultsTable']/tr[1]/td[1]/div/a"), function() {
    //console.log("clicking the first item in search")
});

casper.wait(1000, function() {
        //console.log("taking a picture")
        //casper.capture('snomed5.png');
        console.log(this.getHTML(x("//*[@id='home-attributes-fh-cd1_canvas']/h5")));
});
**/


casper.run();