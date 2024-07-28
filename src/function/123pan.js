var data = {};

function getApi(Key) {
	const rule0 = /:/;
	const rule1 = /\?(.*):/;
	const rule2 = /:(.*)/;
	const rule3 = /\?(.*)/;
	let Pwd = "";
	if(rule0.test(Key)) {
		data.ShareKey = Key.match(rule1)[1];
		Pwd = Key.match(rule2)[1];
	}else data.ShareKey = Key.match(rule3)[1];
	return "https://www.123pan.com/b/api/share/get?limit=100&next=1&orderBy=share_id&orderDirection=desc&ParentFileId=0&Page=1&shareKey=" + data.ShareKey + "&Sharepwd=" + Pwd;
}

async function getData(Key) {
	const api = getApi(Key);
	let info = await fetch(api);
	info = await info.json();
	data.FileId = info.data.InfoList[0].FileId;
	data.S3KeyFlag = info.data.InfoList[0].S3KeyFlag;
	data.Size = info.data.InfoList[0].Size;
	data.Etag = info.data.InfoList[0].Etag;
	return JSON.stringify(data);
}

function crc32(str) {
	let crc = 0xFFFFFFFF;
	for (let i = 0; i < str.length; i++) {
		crc ^= str[i];
		for (let j = 0; j < 8; j++) {
			if ((crc & 1) !== 0) {
				crc = (crc >>> 1) ^ 0xEDB88320;
			} else {
				crc >>>= 1;
			}
		}
	}
	crc ^= 0xFFFFFFFF;
	return crc >>> 0;
}

async function getSign() {
	let timestamp = await fetch("https://www.123pan.com/b/api/get/server/time");
	timestamp = await timestamp.json();
	timestamp = JSON.stringify(timestamp.data.timestamp);
	const table = ['a', 'd', 'e', 'f', 'g', 'h', 'l', 'm', 'y', 'i', 'j', 'n', 'o', 'p', 'k', 'q', 'r', 's', 't', 'u', 'b', 'c', 'v', 'w', 's', 'z'];
	const random = Math.floor(1e7 * Math.random()).toString();
	const path = "/b/api/share/download/info";
	const os = "web";
	const version = 3;
	const now = new Date(timestamp * 1000);
	const nowStr = now.toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\..*$/, '');
	let charStr = "";
	for (let i = 0; i < nowStr.length; i++) {
		charStr = charStr + table[nowStr[i].charCodeAt(0) - 48];
	}
	const timeSign = crc32(charStr).toString();
	const data = [timestamp, random, path, os, version, timeSign].join('|');
	const dataSign = crc32(data).toString();
	return [timeSign, [timestamp, random, dataSign].join('-')].join('=');
}

export async function getUrl(Key,env) {
	const sign = getSign();
	const aim = "https://www.123pan.com/b/api/share/download/info?"+sign;
	const data = await getData(Key);
	let init = {};
	init.method = "POST";
	init.body = data;
	init.headers = {};
	init.headers["App-Version"] = 3;
	init.headers.platform = "web";
	init.headers.Authorization = env._123;
	let res = await fetch(aim, init);
	res = JSON.stringify(await res.json());
	const rule0 = /params=(.*)&/;
	res = res.match(rule0)[1];
	const rule1 = /(.*)&x-mf-biz-cid/;
	return atob(res).match(rule1)[1];
}