var direct = 'DIRECT';
var httpProxy = 'PROXY 127.0.0.1:7777; DIRECT';

var directList = [
"",
"sinaapp.com",
"ku6.cn",
"tmall.com",
"yupoo.com",
"z4.cnzz.com",
"cmbchina.com",
"sohu.com",
"alipayobjects.com",
"weibo.com",
"51buy.com",
"taobao.com",
"tdimg.com",
"tudouui.com",
"www.google-analytics.com",
"apple.com",
"icbc.com.cn",
"xnimg.cn",
"dpfile.com",
"bdstatic.com",
"ddimg.cn",
"etao.com",
"sinajs.cn",
"paipai.com",
"alipay.com",
"xiaonei.com",
"bdimg.com",
"sogou.com",
"alicdn.com",
"boc.cn",
"dianping.com",
"douban.com",
"settings.crashlytics.com",
"360buyimg.com",
"yihaodian.com",
"xnpic.com",
"95599.cn",
"ccb.com",
"spdb.com.cn",
"macromedia.com",
"fbstatic-a.akamaihd.net",
"amazon.cn",
"95559.com.cn",
"igcdn-photos-e-a.akamaihd.net",
"tbcdn.cn",
"ku6.com",
"163.com",
"icloud.com",
"youdao.com",
"ku6cdn.com",
"kaixin001.com",
"sinaimg.cn",
"bankofchina.com",
"ifanr.cn",
"ifanr.com",
"upaiyun.com",
"baidu.com",
"stats.g.doubleclick.net",
"tudou.com",
"paipaiimg.com",
"rrimg.com",
"icson.com",
"e.crashlytics.com",
"cnzz.mmstat.com",
"youku.com",
"aicdn.com",
"solidot.org",
"bing.com",
"12306.cn",
"bankcomm.com",
"zhihu.com",
"sina.com.cn",
"3qavl2wyewcyenee.igsonar.com",
"xunlei.com",
"yihaodianimg.com",
"upyun.com",
"alimama.cn",
"alimama.com",
"t.cn",
"kankan.com",
"dangdang.com",
"ykimg.com",
"bing.com.cn",
"mmcdn.cn",
"z.cn",
"jd.com",
"apple.com.cn",
"ku6img.com",
"360buy.com",
"taobaocdn.com",
"qq.com",
"renren.com",
"huaban.com",
"soku.com",
"abchina.com",
"hexun.com",
"kanimg.com"
];

var directAcc = {};
for (var i = 0; i < directList.length; i += 1) {
	directAcc[directList[i]] = true;
}

var topLevel = {
	"org": true,
	"ac": true,
	"co": true,
	"com": true,
	"edu": true,
	"gov": true,
	"net": true
};

// hostIsIP determines whether a host address is an IP address and whether
// it is private. Currenly only handles IPv4 addresses.
function hostIsIP(host) {
	var part = host.split('.');
	if (part.length != 4) {
		return [false, false];
	}
	var n;
	for (var i = 3; i >= 0; i--) {
		if (part[i].length === 0 || part[i].length > 3) {
			return [false, false];
		}
		n = Number(part[i]);
		if (isNaN(n) || n < 0 || n > 255) {
			return [false, false];
		}
	}
	if (part[0] == '127' || part[0] == '10' || (part[0] == '192' && part[1] == '168')) {
		return [true, true];
	}
	if (part[0] == '172') {
		n = Number(part[1]);
		if (16 <= n && n <= 31) {
			return [true, true];
		}
	}
	return [true, false];
}

function host2Domain(host) {
	var arr, isIP, isPrivate;
	arr = hostIsIP(host);
	isIP = arr[0];
	isPrivate = arr[1];
	if (isPrivate) {
		return "";
	}
	if (isIP) {
		return host;
	}

	var lastDot = host.lastIndexOf('.');
	if (lastDot === -1) {
		return ""; // simple host name has no domain
	}
	// Find the second last dot
	dot2ndLast = host.lastIndexOf(".", lastDot-1);
	if (dot2ndLast === -1)
		return host;

	var part = host.substring(dot2ndLast+1, lastDot);
	if (topLevel[part]) {
		var dot3rdLast = host.lastIndexOf(".", dot2ndLast-1);
		if (dot3rdLast === -1) {
			return host;
		}
		return host.substring(dot3rdLast+1);
	}
	return host.substring(dot2ndLast+1);
}

function FindProxyForURL(url, host) {
	if (url.substring(0,4) == "ftp:")
		return direct;
	if (host.indexOf(".local", host.length - 6) !== -1) {
		return direct;
	}
	var domain = host2Domain(host);
	if (host.length == domain.length) {
		return directAcc[host] ? direct : httpProxy;
	}
	return (directAcc[host] || directAcc[domain]) ? direct : httpProxy;
}
