const Nightmare = require('nightmare');		
const async = require('async');
let nightmare = Nightmare({ show: true });
const shell = require('shelljs');
const fs = require('fs');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tp_hcm');
let userSchema = new mongoose.Schema({
    name:String,
    type:String,                
    address:String,                
    district:String,               
    octime:String,               
    point:Number,                
    price:String,               
    views:String,              
    comment:String,                
    picture:String              

});
let col = mongoose.model('col', userSchema);
let realdata = [];

// function getOption(url,name){
//     name = name.trim();
//     options = {
//         url: url,
//         done: function(err, filename, image) {
//             if (err) {
//                 throw err
//             }
//             console.log('File saved to', filename)
//         }
//     }
//     return options;
// }
function crawl(arr,cb){
  function test(item,cb){
        let night = new Nightmare({ show: true });
        night.goto(item)
             .wait(1000)
             .evaluate(function(){

                function getLongLat(data) { 
                    let metas = document.getElementsByTagName('meta'); //the div
                    let n = metas.length;
                    for (let i=0; i < n; i++) { 
                        if (metas[i].getAttribute("property") == data) { 
                          return metas[i].getAttribute("content"); 
                        } 
                    } 
                      return "";
                  } 
                try{
                    let obj = {};
                    let array = [];
                    let arraycm = [];
                    let name = document.querySelector('.main-info-title > h1').innerText;
                    let type = document.querySelector('.category .category-items > a').innerText;
                    let address = document.querySelectorAll('.res-common-add span')[1].querySelector('a > span').innerText;
                    let district = document.querySelectorAll('.res-common-add span')[3].querySelector('a > span').innerText;
                    let octime = document.querySelectorAll('.micro-timesopen span')[1].getAttribute('title').replace('|','');
                    let views = document.querySelectorAll('.social-share-icons div')[0].getAttribute('title');
                    let point = document.querySelectorAll('.microsite-top-points-block span')[0].innerText; 
                    let price = document.querySelectorAll('.res-common-minmaxprice span')[1].innerText;
                    let comment = document.querySelectorAll('.rd-des span');
                    for(let i= 0; i<comment.length;i++){
                        arraycm.push(comment[i].innerText);
                    }
                    let image = document.querySelector('.main-image .img a > img').getAttribute('src'); 
                    array.push(image);
                    let test = document.querySelectorAll('.microsite-professional-photo-item img');
                    let picturepro = document.querySelectorAll('.microsite-professional-photo-item img');
                    for(let i=0; i<picturepro.length ; i++){
                        array.push(picturepro[i].getAttribute('src'));
                    }
                    let picturepub = document.querySelectorAll('.micro-home-album img');
                    for(let j=0; j<picturepub.length; j++){
                        array.push(picturepub[j].getAttribute('src'));
                    }
                    obj['name'] = name;
                    obj['type'] = type;
                    obj['address'] = address;
                    obj['district'] = district;
                    obj['octime'] = octime;
                    obj['point'] = parseFloat(point);
                    obj['price'] = price;
                    obj['views'] = views;
                    obj['comment'] = arraycm;
                    obj['picture'] = array;

                    return obj;
                }catch(err){
                    console.log('Searching not found');
                    return {};
                }
             })
             .end()
             .then(function(res){
               if(!res){
                  cb(null,{}); 
               }
               try{
                  //update data every crawl time
                realdata.push(res);
                // col.find().exec((err,cols)=>{
                // // console.log(cols);
                //     })                
                console.log(res);
                  cb(null,res);
               }catch(err){
                  console.log('Error File not found');
                  cb(null,{});
               }
             });
    }
    // so luong web truy cap 1 luc
    async.mapLimit(arr,3,test,function(err,res){
        cb(null,res);
    });
}
nightmare
    .goto('https://www.foody.vn/ho-chi-minh/food/an-chay')
    .click('.signin')
    .wait(1000)
    .insert('#Email','nvandi123@gmail.com')
    .type('#Password','123456?a')
    .click('#signin_submit')
    .wait(1000)
    .click('#scrollLoadingPage') 
    .wait(1000)
    .click('#scrollLoadingPage') 
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(2000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)
    .click('#scrollLoadingPage')
    .wait(1000)

    .evaluate(function () {
        let res = document.querySelectorAll('.filter-result-item .result-image');
        let arr = [];
        for(let i = 0; i < res.length;i++){
            let tm = res[i].querySelector('a').href;
            arr.push(tm);
        }
        return arr;
    })
    .end()
    .then(function (result){
        crawl(result,function(err,res){
        console.log('done!');
        col.create(realdata);
        });  
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });
   