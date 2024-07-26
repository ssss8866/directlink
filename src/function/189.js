function getApi(Key) {
	const rule0 = /\?(.*):/;
	const rule1 = /:(.*)/;
	const ShareKey = Key.match(rule0)[1];
	const Pwd = Key.match(rule1)[1];
	let api = {};
	api.fileId = "https://api.cloud.189.cn/open/share/getShareInfoByCodeV2.action?shareCode=" + ShareKey;
	api.shareId = "https://api.cloud.189.cn/open/share/checkAccessCode.action?shareCode=" + ShareKey + "&accessCode=" + Pwd;
	return api;
}

async function getData(Key) {
	const api = getApi(Key);
	let init = {};
	init.headers = {};
	init.headers.accept = "application/json;charset=UTF-8";
	let data = {};
	data.dt = "1";
	let fileId = await fetch(api.fileId, init);
	fileId = await fileId.json();
	data.fileId = fileId.fileId;
	let shareId = await fetch(api.shareId, init);
	shareId = await shareId.json();
	data.shareId = JSON.stringify(shareId.shareId);
	return data;
}

async function md5(str) {
	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	const hashBuffer = await crypto.subtle.digest('MD5', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getSign(params) {
	let keys = [];
	for (let k in params) {
	  	keys.push(k + "=" + params[k]);
	}
	keys.sort();
	const signStr = keys.join("&");
	return md5(signStr);
}

export async function getUrl(env, Key) {
	let data = await getData(Key);
	let timestamp = await fetch("https://www.123pan.com/b/api/get/server/time");
	timestamp = await timestamp.json();
	data.Timestamp = JSON.stringify(timestamp.data.timestamp);
	data.AccessToken = env._189;
	const sign = await getSign(data);
	const api = "https://api.cloud.189.cn/open/file/getFileDownloadUrl.action?dt=1&fileId=" + data.fileId + "&shareId=" + data.shareId;
	let init = {};
	init.headers = {};
	init.headers.accept = "application/json;charset=UTF-8";
	init.headers.accesstoken = data.AccessToken;
	init.headers["sign-type"] = 1;
	init.headers.signature = sign;
	init.headers.timestamp = data.Timestamp;
	let res = await fetch(api, init);
	res = await res.json();
	return res.fileDownloadUrl;
}