import * as _123 from "./function/123.js";
import * as one from "./function/onedrive.js";

export default {
	async fetch(request, env, _ctx) {
		const url = new URL(request.url);
		const Type=url.pathname;
		const Key=url.search;

		switch(Type){
			case "/123": return Response.redirect(await _123.getUrl(env._123,Key));
			case "/one": return Response.redirect(await one.getUrl(env.ONE,Key));
		}
	}
}