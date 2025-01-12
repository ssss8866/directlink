import { addCache } from "./cache";
import * as utils from "./utils"

async function getId(key) {

	let api = {};
	api.fileId = "https://api.cloud.189.cn/open/share/getShareInfoByCodeV2.action?shareCode=" + key.sharekey;
	api.shareId = "https://api.cloud.189.cn/open/share/checkAccessCode.action?shareCode=" + key.sharekey + "&accessCode=" + key.password;
	
	let init = {};
	init.headers = {};
	init.headers.accept = "application/json;charset=UTF-8";

	let id = {};
	const fileIdPromise = await fetch(api.fileId, init);
	const fileId = await fileIdPromise.json();
	if(!fileId.fileId) return 0;
	id.fileId = fileId.fileId;
	const shareIdPromise = await fetch(api.shareId, init);
	const shareId = await shareIdPromise.json();
	if(!shareId.shareId) return 0;
	id.shareId = JSON.stringify(shareId.shareId);

	return id;
}

export default async function(key,env) {

	let result = {};
	result.code = 400;
	result.type = "/189";
	result.key = {};
	result.key.sharekey = key.sharekey;
	result.key.password = key.password;

	let id = await getId(key);
	if(!id) return result;

	let init = {};
	init.headers = {};
	init.headers.accept = "application/json;charset=UTF-8";
	init.headers.cookie = "COOKIE_LOGIN_USER=" + env._189;

	const api = "https://cloud.189.cn/api/open/file/getFileDownloadUrl.action?fileId=" + id.fileId + "&shareId=" + id.shareId;
	const responsePromise = await fetch(api, init);
	const response = await responsePromise.json();
	if(!response.fileDownloadUrl) return result;
	const cdnUrl = response.fileDownloadUrl;
	
	const redirectUrlPromise = await fetch(cdnUrl);
	const redirectUrl = redirectUrlPromise.url;
	result.url = redirectUrl;
	result.code = 0;

	await addCache(result, env);
	return result;
}