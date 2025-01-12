import { addCache } from "./cache";

async function hasPwd(sharekey) {

    const api = "https://lanzout.com/" + sharekey;
    const responsePromise = await fetch(api);
    const response = await responsePromise.text();
    const rule = /skdklds = '(.*)';/;
    if(!rule.test(response)) return 0;
    const sign = response.match(rule)[1];

    return sign;
}

async function noPwd(key) {

    let api = [];
    api[0] = "https://lanzout.com/" + key;
    let responsePromise = [];
    let response = [];
    responsePromise[0] = await fetch(api[0]);
    response[0] = await responsePromise[0].text();

    let rule = [];
    rule[0] = /<iframe.*src="\/(.*)" frameborder/;
    rule[1] = /'sign':'(.*)','websign/;
    if(!rule[0].test(response[0])) return 0;
    api[1] = "https://lanzout.com/" + response[0].match(rule[0])[1];
    responsePromise[1] = await fetch(api[1]);
    response[1] = await responsePromise[1].text();
    if(!rule[1].test(response[1])) return 0;
    const sign = response[1].match(rule[1])[1];

    return sign;
}

export default async function(key, env) {

    let result = {};
	result.code = 400;
	result.type = "/lzy";
	result.key = {};
	result.key.sharekey = key.sharekey;
	result.key.password = key.password;

    const sign = key.password ? hasPwd(key.sharekey) : noPwd(key.sharekey);
    if(!sign) return result;
    const api = "https://lanzout.com/ajaxm.php?action=downprocess";
    let params = new URLSearchParams();
    params.append("sign", await sign);
    params.append("p", key.password);
    let init = {};
    init.method = "POST";
    init.body = params.toString();
    init.headers = {};
    init.headers.Referer = "api.syshub.top";
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";

    const responsePromise = await fetch(api, init);
    const response = await responsePromise.json();
    if(!response.url) return result;
    result.url = "http://develope-oss.lanzouc.com/file/" + response.url;
    result.code = 0;

    await addCache(result, env);
    return result;
}