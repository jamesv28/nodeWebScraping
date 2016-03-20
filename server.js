var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
app.get('/', function(res,req, next) {
   //res.render('hello');
});

app.get('/scrape', function(req,res,next) {
    // magic goes here
    var url = 'http://www.imdb.com/title/tt1229340/';


    request(url, function(err,res,html) {
        //first, make sure that there is no error

        if(!err) {
            //look at the variables we are wanting to look at
            var $ = cheerio.load(html);
            var title,release, rating;
            var json = {
                title: '',
                description: '',
                rating: ''
            };


        $('.title_wrapper').filter(function() {

            var data = $(this);


            title = data.children().first().text();

            json.title = title;
        });

            $('.summary_text').filter(function() {
                var data = $(this);

                description = data.text();
                json.description = description;
            });//end of description
            $('.ratingValue').filter(function(){
                var data = $(this);

                rating = data.children().first().text();

                json.rating = rating;
            })
        } // end of conditional
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the output.json file');

        });

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.

    }) ;
    res.send('Check your console!')

});


app.listen('8000');

console.log('magic is happening');

module.exports = app;
