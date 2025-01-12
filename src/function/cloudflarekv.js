export default async function(key, env) {

    let result = {};
	result.code = 400;
	result.type = "/ckv";
	result.key = {};
	result.key.sharekey = key.sharekey;
	result.key.password = key.password;

    url = await env.KV.get(key);
    if(url) {
        result.code = 0;
        result.url = url;
    }

    return result;
}