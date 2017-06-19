var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var orurl = require('url');
var async = require('async');
var mysql = require('mysql');
var request = require('request');
var fs = require('fs');
var sqlconf = require('./sqlconf');
var ep = new eventproxy();

var url = 'http://bbs.flyme.cn/thread-1819274-1-1.html';
superagent.get(url).end(function(err,res){
	var $ = cheerio.load(res.text);
	console.log($('a.author_name').eq(0).attr('title'));
});

// var num = Math.random()*10000000;
// var num = parseInt((Math.random() * 30));
// console.log(num);