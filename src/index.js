import { getCache } from './function/cache';
import _123 from "./function/123pan";
import _189 from "./function/cloud189";
import lzy from "./function/lanzou";
import ckv from "./function/cloudflarekv"

export default {
	async fetch(request, env, _ctx) {

		const url = new URL(request.url);
		let type = url.pathname;
		if(env.PATH_PREFIX) type = type.replace(`\/${env.PATH_PREFIX}`, '');
		const params = url.searchParams;
		const down = params.get("down");
		let cache = 1;
		if(params.get("cache") == "0") cache = 0;
		let key = {};
		key.sharekey = params.get("key");
		if(!(key.password = params.get("pwd"))) key.password = "";

		let result = {};
		result.code = 1;
		if(cache) result = await getCache(type, key, env);
		if(result.code) switch(type) {
			case "/123": result = await _123(key, env);break;
			case "/189": result = await _189(key, env);break;
			case "/lzy": result = await lzy(key, env);break;
			case "/ckv": result = await ckv(key, env);break;
			default: result.code = 400;
		}

		if(!result.code && !down) return Response.redirect(result.url);
		else return Response.json(result);
	}
}