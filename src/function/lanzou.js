function getData(Key) {
	const rule0 = /\?(.*)/;
	const rule1 = /:/;
	const rule2 = /\?(.*):/;
	const rule3 = /:(.*)/;
    let data = {};
    data.kind = 0;
    data.key = Key.match(rule0)[1];
    data.pwd = "";
	if(rule1.test(Key)) {
        data.kind = 1;
		data.key = Key.match(rule2)[1];
		data.pwd = Key.match(rule3)[1];
	}
	return data;
}

async function hasPwd(key) {
    const api = "https://lanzout.com/" + key;
    let res = await fetch(api);
    res = await res.text();
    const rule = /skdklds = '(.*)';/;
    return res.match(rule)[1];
}

async function noPwd(key) {
    const api0 = "https://lanzout.com/" + key;
    let res0 = await fetch(api0);
    res0 = await res0.text();
    const rule0 = /<iframe.*src="\/(.*)" frameborder/;
    const api1 = "https://lanzout.com/" + res0.match(rule0)[1];
    let res1 = await fetch(api1);
    res1 = await res1.text();
    const rule1 = /'sign':'(.*)','websign/;
    return res1.match(rule1)[1];
}

export async function getUrl(Key, _env) {
    const data = getData(Key);
    const sign = data.kind ? hasPwd(data.key) : noPwd(data.key);
    const api = "https://lanzout.com/ajaxm.php?action=downprocess";
    let params = new URLSearchParams();
    params.append("sign", await sign);
    params.append("p", data.pwd);
    let init = {};
    init.method = "POST";
    init.body = params.toString();
    init.headers = {};
    init.headers.Referer = "syshub";
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
    let res = await fetch(api, init);
    res = await res.json();
    return "http://develope-oss.lanzouc.com/file/" + res.url;
}