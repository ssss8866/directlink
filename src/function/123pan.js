import { addCache } from './cache';
import * as utils from './utils';

async function getSign() {

	const timestamp = utils.getTimestamp();
	const random = Math.floor(1e7 * Math.random()).toString();
	const path_os_version = "/b/api/share/download/info|web|3";

	const now = new Date(timestamp * 1000);
	const nowStr = now.toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\..*$/, '');
	const table = ['a', 'd', 'e', 'f', 'g', 'h', 'l', 'm', 'y', 'i', 'j', 'n', 'o', 'p', 'k', 'q', 'r', 's', 't', 'u', 'b', 'c', 'v', 'w', 's', 'z'];
	let charStr = "";
	for (let i = 0; i < nowStr.length; i++) charStr += table[nowStr[i].charCodeAt(0) - 48];
	const timeSign = utils.crc32(charStr).toString();

	const data = [timestamp, random, path_os_version, timeSign].join('|');
	const dataSign = utils.crc32(data).toString();
	const sign = [timeSign, [timestamp, random, dataSign].join('-')].join('=');

	return sign;
}

async function getData(key) {

	const api = "https://www.123pan.com/b/api/share/get?limit=100&next=1&orderBy=share_id&orderDirection=desc&ParentFileId=0&Page=1&shareKey=" + key.sharekey + "&Sharepwd=" + key.password;
	const infoPromise = await fetch(api);
	const info = await infoPromise.json();

	if(!info.code) {

		let data = {};
		data.ShareKey = key.sharekey;
		data.FileId = info.data.InfoList[0].FileId;
		data.S3KeyFlag = info.data.InfoList[0].S3KeyFlag;
		data.Size = info.data.InfoList[0].Size;
		data.Etag = info.data.InfoList[0].Etag;
		return JSON.stringify(data);
	}else return 0;
}

export default async function(key, env) {

	let result = {};
	result.code = 400;
	result.type = "/123";
	result.key = {};
	result.key.sharekey = key.sharekey;
	result.key.password = key.password;

	const sign = getSign();
	const aim = "https://www.123pan.com/b/api/share/download/info?" + sign;

	let init = {};
	init.method = "POST";
	const data = await getData(key);
	if(!data) return result;
	init.body = data;
	init.headers = {};
	init.headers["App-Version"] = 3;
	init.headers.platform = "web";
	init.headers.Authorization = env._123;

	const responsePromise = await fetch(aim, init);
	const response = await responsePromise.json();
	const cdnUrl = new URL(response.data.DownloadURL);
	const params = cdnUrl.searchParams.get("params");
	const redirectUrl = new URL(atob(params));

	const urlPromise = await fetch(redirectUrl);
	const urlJSON = await urlPromise.json();
	result.url = urlJSON.data.redirect_url;
	result.code = 0;

	await addCache(result, env);
	return result;
}