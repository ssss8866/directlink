import * as _123 from "./function/123pan.js";
import * as _189 from "./function/cloud189.js";
import * as lzy from "./function/lanzou.js";
import * as xfj from "./function/feijipan.js";

export default {
	async fetch(request, env, _ctx) {
		const url = new URL(request.url);
		const Type = url.pathname;
		const Key = url.search;

		switch(Type) {
			case "/123": return Response.redirect(await _123.getUrl(Key,env));
			case "/189": return Response.redirect(await _189.getUrl(Key,env));
			case "/lzy": return Response.redirect(await lzy.getUrl(Key,env));
			case "/xfj": return new	Response(await xfj.getUrl(Key,env));
		}
	}
}