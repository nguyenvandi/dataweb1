var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(8080);

var request = require("request");
var cheerio = require("cheerio");
var array = [];
var data={};
app.get("/",function(req,res){
    var i =1;
    for(i=1; i<15; i++){
    var link = "https://www.foody.vn/ho-chi-minh/nha-hang?ds=Restaurant&vt=row&st=1&c=1&page="+i+"&provinceId=217&categoryId=1&append=true";
        // console.log(link);
        request(link, function(error,response,body){
        if(error){
            console.log(error);
            res.render("trangchu", {html:"co loi xay ra"});
        }else{
            $ = cheerio.load(body);        
            var d = $('.row-item').length;
           $('.row-item').each(function(i,e){
                var urlpic= $(this).find('.result-image img').prop('src');
                var nae= $(this).find('.result-image img').prop('alt');
                var location= $(this).find('.result-address span').text();
                var url ="https://www.foody.vn" + $(this).find('.result-image a').prop('href');
                var point = $(this).find('.point.highlight-text').text();
                var com= $(this).find('.content span').text(); 
                data = {
                    name:nae,
                    point:parseFloat(point),
                    address:location,
                    linkpicture:urlpic,
                    linktopic:url,
                    comment:com
                };
                // console.log(data.name);
               array.push(data);
                
            });
          }
              console.log(array);
                console.log("------------------------");
            });
               } 
                
            // res.render("trangchu", {html:body});
});
