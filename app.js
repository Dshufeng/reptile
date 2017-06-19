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

var pageUrls = []; // pageUrl
var contUtls = [];	// contUrl
var names = [];
var count = 0;
var dir = 'image'
var codeUrl = 'http://bbs.flyme.cn/';
var connection = mysql.createConnection(sqlconf.mysql);
for(var i=1;i<=1;i++){
	var pageUrl = 'http://bbs.flyme.cn/forum.php?mod=forumdisplayall&fid=45&page='+i+'';
	pageUrls.push(pageUrl);
}

var paseInfo = function(contUrl,callback){
	var delay = parseInt((Math.random()*10000000)%2000,10);
	superagent.get(contUrl).end(function(err,res){
		var $ = cheerio.load(res.text);
		var avatarUrl = $('.avatar img').attr('src');
		
		var auth_name = $('a.author_name').eq(0).attr('title')?$('a.author_name').eq(1).attr('title'):'默认';
		console.log('正在获取'+contUrl+'作者为::'+auth_name);
		connection.query(sqlconf.insert,[auth_name,contUrl],function(err, res){
			console.log('ok');
		});

		var pre = /([0-9]{6,8})/g;
		var res = pre.exec(contUrl);
		if(res != null & avatarUrl != undefined){
			var avatarNmae = res[1]+'.jpg';
			request(avatarUrl).pipe(fs.createWriteStream(dir+'/'+avatarNmae));
		}
		names.push(auth_name);
	});
	console.log('并发个数为::'+count);
	count++;
	setTimeout(function(){
		callback(null, contUrl+'callback...');
		count--;
	},delay);
}


// console.log(pageUrls);

pageUrls.forEach(function(url,id){
	// console.log(url);
	superagent.get(url).end(function(err,res){
		var $ = cheerio.load(res.text);
		var titles = $('.list .listContent ');
		titles.each(function(ids,item){
			var contUrl = orurl.resolve(codeUrl,($(item).find('a').eq(1).attr('href')));
			ep.emit('pageHtml',contUrl);
		});
		
	});
});
ep.after('pageHtml',pageUrls.length*30,function(contUrls){
	async.mapLimit(contUrls,4,function(contUrl,callback){
		paseInfo(contUrl,callback);
	},function(err,result){
		console.log('final:');
  		console.log(result);
	});
});

