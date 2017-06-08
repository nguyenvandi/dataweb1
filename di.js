var express = require("express");
var app = express();
const async = require('async');
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/nhahang');
var userSchema = new mongoose.Schema({
    name:String,
    point:Number,
    address:String,
    moreaddress:String,
    price:String,
    timeopen:String,
    views:String,
    comment:String,
    albums:String

})
var user = mongoose.model('user', userSchema);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(8080);
var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");
var rp = require('request-promise');
var array = [];
var data = {};

app.get("/", function(req, res) {
  for(var j = 1; j<=84; j++){
    var loadPage = {
        uri: "https://www.foody.vn/ho-chi-minh/nha-hang?ds=Restaurant&vt=row&st=1&c=1&page="+j+"&provinceId=217&categoryId=1&append=true",
        transform: function(body) {
            return cheerio.load(body);
        }
    };
    rp(loadPage)
        .then(function($) {
       $('.row-item').each(function(i, e) {
               on = $(this).find('.result-address span').text();
                var url = "https://www.foody.vn" + $(this).find('.result-image a').prop('href');
                var location= $(this).find('.result-address span').text();
                var point = $(this).find('.point.highlight-text').text();
                var moread = $(this).find(".branch-btn span").text();
                var name,price,view,time,comment,photo,photos;
                var type = $(".result-status-count h1").text();
                type = type.substring(type.indexOf("\n"),type.lastIndexOf("\n")).trim();
                request(url, function(err, response, body) {
                    if (!err && response.statusCode == 200) {
                        $l = cheerio.load(body);
                        var photo,photos;
                        var array2 = [];
                        $l(".pn-microsite").each(function(){
                            name = $l(this).find(".main-info-title h1").text();
                            price = $l(this).find('.res-common-minmaxprice span').next().text();
                            price = price.substring(price.indexOf("\n")+2, price.lastIndexOf("đ")+1).trim();
                            view = $l(this).find(".total-views").prop("title");
                            time = $l(this).find('.micro-timesopen span').next().next().text();
                            comment = $l(this).find(".rd-des span").text();
                            $l(".prof-photos-items img").each(function() {
                            photo = $l(this).prop("src");
                            array2.push(photo); 
                        });
                            $l(".microsite-box-popular-pic img").each(function() {
                            photos = $l(this).prop("src");
                            array2.push(photos);
                        });
                     });
                  data ={   
                            name:name,
                            type:type,
                            point:parseFloat(point),
                            address:location,
                            moreaddress:moread,
                            price:price,
                            timeopen:time,
                            views:view,
                            comment:comment,
                            albums:array2
                        }
                     user.create(data);
                    // user.find().exec((err,users)=>{
                    //     console.log(users);
                    // })
                    //  console.log(data);
                    //  console.log("====================================================================================================");
                    }
                });
            })
       
        })
        .catch(function(err) {
            // Crawling failed or Cheerio choked...
        });
  }
    // res.render("trangchu", {html:body});
});
