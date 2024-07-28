function getData(Key) {
    const rule0 = /\?(.*)/;
	const rule1 = /:/;
	const rule2 = /\?(.*):/;
	const rule3 = /:(.*)/;
    let data = {};
    data.shareId = Key.match(rule0)[1];
    data.code = "";
	if(rule1.test(Key)) {
		data.shareId = Key.match(rule2)[1];
		data.code = Key.match(rule3)[1];
	}
	return data;
}

function getUUID() {
    const table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let UUID = "";
    for (let i = 0; i < 21; i++) {
        UUID += table.charAt(Math.floor(Math.random() * table.length));
    }
    return UUID;
}

function encrypt2Hex(str) {
    
}

async function getTs() {
    let timestamp = await fetch("https://www.123pan.com/b/api/get/server/time");
	timestamp = await timestamp.json();
	timestamp = JSON.stringify(timestamp.data.timestamp);
    return encrypt2Hex(timestamp);
}

async function getFileId(data) {
    let params = new URLSearchParams();
    params.append("uuid", data.uuid);
    params.append("timestamp", data.ts);
    params.append("shareId", data.shareId);
    params.append("code", data.code);
    const api = "https://api.feijipan.com/ws/recommend/list?devType=6&" + params.toString();
    let res = await fetch(api);
    res = await res.json();
    return res.list[0].fileIds;
}

export function getUrl(Key, _env) {
    let data = getData(Key);
    data.uuid = getUUID();
    data.ts = getTs();
    const fileId = getFileId(data);
    data.downloadId = encrypt2Hex(fileId + null);
    data.auth = encrypt2Hex(fileId + '|' + data.ts);
    let params = new URLSearchParams();
    params.append("downloadId", data.downloadId);
    params.append("uuid", data.uuid);
    params.append("timestamp", data.ts);
    params.append("auth", data.auth);
    params.append("shareId", data.shareId);
    return "https://api.feijipan.com/ws/file/redirect?enable=1&devType=6&" + params.toString();
}